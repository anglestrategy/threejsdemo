/* ==========================================================================
   THE WATER, in TSL.

   The third of the district's four raw `ShaderMaterial`s, and the one that
   carries the most weight per square metre: the channel threads 630 m through
   the plan and the lagoon and pool sit at the centre of two of the four SDC
   renders. A stand-in flat teal reads as a swimming pool in a plan drawing.

   The shape of it, transcribed rather than reinvented:

   - **Three crossed ripple trains** at 1.7, 3.6 and 8.1 per metre, drifting at
     different rates and along different axes. The `aFlow` attribute is per
     vertex and says how fast the water at that point is moving — 0 in a still
     tank, 1 in the channel — and it scales both the drift and the colour.

   - **A still tank is dark.** Its colour is its reflection, not its water.
     Only the moving channel carries the shallow turquoise; `col *= mix(0.42,
     1.0, flow)` is what stops every pool in the district glowing like a lit
     aquarium.

   - **The mirror displaced by the ripple normal, scaled down with distance.**
     A metre of displacement is a whole reflected tower at fifty metres and
     invisible at two, so the wobble is `0.034 / (1 + dist * 0.16)`. Without
     that falloff the far end of the channel smears.

   - **Off-target fragments fall back to sky rather than clamping.** A planar
     reflection only covers what the mirrored frustum saw; clamping the lookup
     smears the edge texel across everything outside it, which is the single
     most recognisable planar-reflection artefact.

   Reflection wiring: `uReflOn` stays 0 until `district.js` hands over a target,
   and at 0 the sky term is the whole specular. That is a real degradation and
   it is a legible one — it looks like water on an overcast day — rather than a
   black hole where the mirror should be.
   ========================================================================== */

import {
  Color, Vector3, Matrix4, DoubleSide, DataTexture, RGBAFormat,
  UnsignedByteType, LinearFilter, ClampToEdgeWrapping,
} from 'three';
import { MeshBasicNodeMaterial } from 'three/webgpu';
import {
  Fn, float, vec2, vec3, vec4, uniform, texture, attribute, positionWorld,
  cameraPosition, normalize, dot, max, min, pow, mix, clamp, smoothstep, floor,
  fract, length, exp, If,
} from 'three/tsl';
import { ATMOS } from './atmosphere.js';

export const WATER = {
  deep: 0x10565f, shal: 0x3fb9ae, sky: 0x7c8fc4, warm: 0xffc98a,
  fogColor: 0x62789f, fogWarm: 0xe6bd92,
};

const h21 = Fn(([p]) => {
  const q = fract(vec3(p.x, p.y, p.x).mul(0.1031)).toVar();
  q.assign(q.add(dot(q, q.yzx.add(33.33))));
  return fract(q.x.add(q.y).mul(q.z));
});
const vn = Fn(([p]) => {
  const i = floor(p).toVar();
  const f = fract(p).toVar();
  f.assign(f.mul(f).mul(float(3).sub(f.mul(2))));
  return mix(
    mix(h21(i), h21(i.add(vec2(1, 0))), f.x),
    mix(h21(i.add(vec2(0, 1))), h21(i.add(vec2(1, 1))), f.x),
    f.y);
});

/**
 * @param opts.pool  true for the still tanks — no flow attribute, so the
 *                   material supplies a constant 0 rather than reading one
 */
export function makeWaterMaterial(opts = {}) {
  const u = {
    uTime: uniform(float(0)),
    uSun: uniform(new Vector3(...ATMOS.sun).normalize()),
    uDeep: uniform(new Color(WATER.deep)),
    uShal: uniform(new Color(WATER.shal)),
    uSky: uniform(new Color(WATER.sky)),
    uWarm: uniform(new Color(WATER.warm)),
    uFogColor: uniform(new Color(WATER.fogColor)),
    uFogWarm: uniform(new Color(WATER.fogWarm)),
    uFogD: uniform(float(ATMOS.fogDensity)),
    uReflOn: uniform(float(0)),
    uReflY: uniform(float(0)),
    uReflMtx: uniform(new Matrix4()),
    /* A TextureNode around a 1x1 placeholder, so the graph binds something
       from the moment it is built and the district can drop the real target in
       later through `.value` — the same trick the probe field uses, and for
       the same reason: rebuilding the node when the target arrives means
       rebuilding the graph and losing the compiled pipeline. */
    uRefl: texture(placeholder2D()),
  };

  /* Basic, not Standard. The water computes its own specular, its own
     reflection and its own fog — running it through the physical model as
     well would light it twice and put a second sun on it. */
  /* Exactly the flags the WebGL2 material carries and no more: `transparent`,
     and everything else left at three's defaults. Adding `depthWrite: false`
     and `DoubleSide` — which seemed harmless — put the souq's water sheet over
     the paving it is supposed to sit below, and the whole spine rendered as a
     canal. A transparent surface that does not write depth is drawn over
     anything that has not already written depth in front of it, which in a
     district where the water is authored as full-width sheets clipped by the
     ground is most of the street. */
  const mat = new MeshBasicNodeMaterial({ transparent: true, fog: false });

  mat.colorNode = Fn(() => {
    const wp = positionWorld.toVar();
    const p = wp.xz.toVar();
    const t = u.uTime.toVar();
    /* `aFlow` per vertex: 0 in a still tank, 1 in the channel. The pool
       variant has no such attribute, so it supplies the constant instead of
       reading a buffer that is not there — an attribute() on a missing
       attribute is zeros on one backend and garbage on another. */
    const vD = (opts.pool ? float(0) : attribute('aFlow', 'float')).toVar();

    const a = vn(p.mul(1.7).add(vec2(t.mul(0.30).mul(vD), t.mul(0.11)))).toVar();
    const b = vn(p.mul(3.6).sub(vec2(t.mul(0.18), t.mul(0.42).mul(vD)))).toVar();
    const c = vn(p.mul(8.1).add(vec2(t.mul(-0.55), t.mul(0.33)))).toVar();
    const hgt = a.mul(0.5).add(b.mul(0.32)).add(c.mul(0.18)).toVar();
    const N = normalize(vec3(a.sub(b).mul(0.9), 1.0, b.sub(c).mul(0.9))).toVar();
    const Vd = normalize(cameraPosition.sub(wp)).toVar();
    const fres = pow(float(1).sub(clamp(dot(N, Vd), 0.0, 1.0)), 3.2).toVar();

    const col = mix(u.uDeep, u.uShal,
      float(0.30).add(hgt.mul(0.55)).mul(float(0.24).add(vD.mul(0.76)))).toVar();
    col.mulAssign(mix(float(0.42), float(1.0), vD));

    /* The mirror. Left as the sky fallback until a reflection target is bound
       — see the header. Both halves are always compiled; `uReflOn` chooses,
       and a uniform branch is free on every GPU this ships to. */
    const skyish = mix(u.uSky, u.uFogColor, 0.25).toVar();
    If(u.uReflOn.greaterThan(0.5), () => {
      const rp = u.uReflMtx.mul(vec4(wp, 1.0)).toVar();
      const dist = length(cameraPosition.sub(wp)).toVar();
      const wob = float(0.034).div(float(1).add(dist.mul(0.16))).toVar();
      const ruv = rp.xy.div(max(rp.w, 0.0001)).add(vec2(N.x, N.z).mul(wob)).toVar();
      const mirror = u.uRefl.sample(clamp(ruv, 0.002, 0.998)).rgb.toVar();
      // off-target fragments fall back rather than clamp-smearing an edge
      const edge = smoothstep(vec2(0.0), vec2(0.03), ruv)
        .mul(vec2(1.0).sub(smoothstep(vec2(0.97), vec2(1.0), ruv))).toVar();
      const ok = edge.x.mul(edge.y).mul(smoothstep(0.0, 0.0001, rp.w)).toVar();
      /* grazing angles reflect nearly everything, steep ones almost nothing.
         A real water surface at a walking eye height is mostly mirror: the
         transmitted half is a dark tank, so what you see is the reflection. */
      const m1 = clamp(fres.mul(1.9).add(0.20).add(float(1).sub(vD).mul(0.30)),
        0.0, 0.965).mul(ok).toVar();
      col.assign(mix(col, mirror, m1));
      col.assign(mix(col, skyish, fres.mul(0.66).mul(float(1).sub(ok))));
    }).Else(() => {
      col.assign(mix(col, u.uSky, fres.mul(0.66)));
    });

    const H = normalize(normalize(u.uSun).add(Vd)).toVar();
    const nh = max(dot(N, H), 0.0).toVar();
    col.addAssign(u.uWarm.mul(pow(nh, 90.0)).mul(1.5));
    col.addAssign(u.uWarm.mul(pow(nh, 12.0)).mul(0.16));
    // caustic glitter
    col.addAssign(vec3(0.9, 0.98, 1.0).mul(pow(max(c.sub(0.62), 0.0), 2.0)).mul(1.1));

    /* Its own fog, because this material is not in the physical lighting model
       and `scene.fogNode` replaces the fragment rather than modifying it. */
    const d = length(cameraPosition.sub(wp)).toVar();
    const fg = float(1).sub(exp(u.uFogD.mul(u.uFogD).mul(d).mul(d).negate())).toVar();
    const fd = normalize(wp.sub(cameraPosition)).toVar();
    col.assign(mix(col, mix(u.uFogColor, u.uFogWarm,
      pow(max(dot(fd, normalize(u.uSun)), 0.0), 1.8)), clamp(fg, 0.0, 1.0)));

    return vec4(col, float(0.90).add(fres.mul(0.10)));
  })();

  mat.userData.u = u;
  return mat;
}

let _ph2 = null;
function placeholder2D() {
  if (!_ph2) {
    _ph2 = new DataTexture(new Uint8Array([90, 110, 140, 255]), 1, 1);
    _ph2.format = RGBAFormat;
    _ph2.type = UnsignedByteType;
    _ph2.minFilter = _ph2.magFilter = LinearFilter;
    _ph2.wrapS = _ph2.wrapT = ClampToEdgeWrapping;
    _ph2.needsUpdate = true;
  }
  return _ph2;
}
