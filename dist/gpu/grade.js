/* ==========================================================================
   THE COLOUR SCRIPT, in TSL.

   The four SDC renders are not neutral photographs and were never going to be
   matched by a neutral pipeline. They are graded: warm lit stone against cool
   shadow, the split widest at golden hour and nearly closed at noon. Without
   this the district can be geometrically and materially correct and still look
   like a game, because every architectural render the client has ever approved
   went through a grade and this one did not.

   Four keyframed terms, lerped by time of day on the CPU and pushed as
   uniforms so the node graph is built once:

     white balance   the overall cast
     split toning    shadowTint / highlightTint, weighted by luminance
     saturation      about the Rec.709 luma
     contrast        a pivot at 0.5 in the tone-mapped range

   Order matters and it is the photographic one: balance, then tone, then
   saturation, then contrast. Doing contrast first crushes the split into the
   ends of the curve and the teal-orange separation disappears.
   ========================================================================== */

import { Vector3 } from 'three';
import {
  Fn, float, vec3, vec4, dot, mix, clamp, smoothstep, uniform, pow, max,
} from 'three/tsl';

/* The keyframes. Times are the district's own clock, and the golden-hour entry
   is the one the four renders are drawn from — 19:00, sun at 20 degrees WSW,
   which is also the sun vector the fog and the probe bake use. */
const KEYS = [
  // t     whiteBalance          shadowTint            sAmt  highlightTint         hAmt  sat   con
  [0.0, [0.82, 0.90, 1.12], [0.85, 0.92, 1.15], 0.45, [0.95, 0.98, 1.10], 0.20, 0.80, 1.06],
  [6.2, [1.05, 0.97, 0.95], [0.85, 0.95, 1.12], 0.40, [1.12, 1.00, 0.88], 0.32, 1.10, 1.05],
  [11.0, [1.00, 1.00, 1.00], [0.92, 0.98, 1.06], 0.28, [1.04, 1.01, 0.96], 0.16, 1.13, 1.07],
  [15.5, [1.01, 1.00, 0.99], [0.92, 0.98, 1.06], 0.28, [1.05, 1.01, 0.95], 0.18, 1.13, 1.07],
  [19.0, [1.09, 1.00, 0.90], [0.72, 0.91, 1.20], 0.58, [1.22, 1.03, 0.80], 0.50, 1.15, 1.10],
  [20.6, [0.95, 0.95, 1.06], [0.82, 0.92, 1.16], 0.50, [1.08, 0.98, 0.90], 0.30, 0.95, 1.05],
  [24.0, [0.82, 0.90, 1.12], [0.85, 0.92, 1.15], 0.45, [0.95, 0.98, 1.10], 0.20, 0.80, 1.06],
];

const lerp = (a, b, t) => a + (b - a) * t;
const lerp3 = (a, b, t) => [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)];

/** the graded parameters at a time of day, in hours */
export function gradeAt(tod) {
  const t = ((tod % 24) + 24) % 24;
  let i = 0;
  while (i < KEYS.length - 2 && KEYS[i + 1][0] < t) i++;
  const a = KEYS[i], b = KEYS[i + 1];
  const k = b[0] === a[0] ? 0 : Math.min(Math.max((t - a[0]) / (b[0] - a[0]), 0), 1);
  return {
    whiteBalance: lerp3(a[1], b[1], k),
    shadowTint: lerp3(a[2], b[2], k),
    shadowAmt: lerp(a[3], b[3], k),
    highlightTint: lerp3(a[4], b[4], k),
    highlightAmt: lerp(a[5], b[5], k),
    saturation: lerp(a[6], b[6], k),
    contrast: lerp(a[7], b[7], k),
  };
}

/**
 * Builds the grade node and the uniform handles that drive it.
 * @param {Node<vec4>} src the node to grade — the end of the post chain
 * @returns {{node: Node<vec4>, setTime: (tod:number)=>void}}
 */
export function colorScript(src) {
  const u = {
    wb: uniform(new Vector3(1, 1, 1)),
    st: uniform(new Vector3(1, 1, 1)),
    ht: uniform(new Vector3(1, 1, 1)),
    sAmt: uniform(float(0.3)),
    hAmt: uniform(float(0.2)),
    sat: uniform(float(1)),
    con: uniform(float(1.03)),
  };

  const node = Fn(() => {
    const c = src.toVar();
    const rgb = c.rgb.mul(u.wb).toVar();

    /* luminance drives the split, and it is Rec.709 rather than an average:
       an average makes blue shadows read as highlights and puts the warm tint
       on exactly the wrong half of the frame */
    const l = dot(rgb, vec3(0.2126, 0.7152, 0.0722)).toVar();
    const shadowW = smoothstep(0.5, 0.0, l).mul(u.sAmt).toVar();
    const highW = smoothstep(0.42, 1.0, l).mul(u.hAmt).toVar();
    rgb.assign(mix(rgb, rgb.mul(u.st), shadowW));
    rgb.assign(mix(rgb, rgb.mul(u.ht), highW));

    // saturation about the same luma, so the grade cannot shift exposure
    const l2 = dot(rgb, vec3(0.2126, 0.7152, 0.0722)).toVar();
    rgb.assign(mix(vec3(l2), rgb, u.sat));

    // contrast on a 0.5 pivot, clamped off zero so the pow cannot go imaginary
    rgb.assign(max(rgb, vec3(0.0)));
    rgb.assign(pow(rgb.div(0.5), u.con).mul(0.5));

    return vec4(clamp(rgb, 0.0, 1.0), c.a);
  })();

  const setTime = (tod) => {
    const g = gradeAt(tod);
    u.wb.value.set(...g.whiteBalance);
    u.st.value.set(...g.shadowTint);
    u.ht.value.set(...g.highlightTint);
    u.sAmt.value = g.shadowAmt;
    u.hAmt.value = g.highlightAmt;
    u.sat.value = g.saturation;
    u.con.value = g.contrast;
  };
  setTime(19.0);        // the hour the four renders are drawn at

  return { node, setTime, uniforms: u };
}
