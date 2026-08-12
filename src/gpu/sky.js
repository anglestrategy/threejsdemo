/* ==========================================================================
   THE SKY DOME, in TSL.

   A direct transcription of the district's `citySkyMat`, which is one of the
   four raw `ShaderMaterial`s in `district.js` and the only one that is in
   every single frame. WebGPURenderer builds its programs from a node graph and
   cannot compile raw GLSL, so this is not optional — without it the dome is a
   flat stand-in colour and the fog, which is matched to the dome's own horizon
   by measurement, no longer matches anything.

   It also feeds `buildEnvironment()`: the district bakes a PMREM off this same
   material plus a warm sand hemisphere, and that IBL is why a gold canopy
   reads as gold and a shadowed travertine pier reads violet-above /
   warm-below rather than grey. A stand-in sky bakes a stand-in world and every
   surface in the district inherits it.

   The parts, in the order they stack:

     1. zenith to mid-sky, by a 0.62 power of altitude
     2. the horizon band, warm where the sun went down and blue elsewhere.
        One horizon colour makes a flat ring all the way round and is most of
        what reads as haze rather than as evening.
     3. two sun glows — a wide one at pow 5 and a tight disc at pow 24
     4. high cirrus, in a projected plane so the bands converge at the horizon
     5. stars, only where the dome is already dark and only outside the cloud
   ========================================================================== */

import { Color, Vector3, BackSide } from 'three';
import { MeshBasicNodeMaterial } from 'three/webgpu';
import {
  Fn, float, vec2, vec3, vec4, uniform, positionLocal, normalize, dot, max, abs,
  pow, mix, clamp, smoothstep, floor, fract, sin,
} from 'three/tsl';
import { ATMOS } from './atmosphere.js';

export const SKY = {
  zen: 0x091a44, mid: 0x1e3c74, horizon: 0x7286a8,
  glow: 0xffc98a, warmHz: 0xd9a878,
};

/* the hashes the GLSL used, transcribed so the cirrus lands in the same places
   in both builds — the cloud field is part of the composition of the six
   bookmarks, not decoration */
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
const fb = Fn(([p0]) => {
  const p = p0.toVar();
  const s = float(0).toVar();
  const a = float(0.5).toVar();
  for (let i = 0; i < 5; i++) {
    s.addAssign(a.mul(vn(p)));
    p.assign(p.mul(2.09));
    a.assign(a.mul(0.52));
  }
  return s;
});

export function makeSkyMaterial(opts = {}) {
  const u = {
    uSun: uniform(new Vector3(...ATMOS.sun).normalize()),
    uTime: uniform(float(0)),
    uZen: uniform(new Color(opts.zen || SKY.zen)),
    uMid: uniform(new Color(opts.mid || SKY.mid)),
    uHorizon: uniform(new Color(opts.horizon || SKY.horizon)),
    uGlow: uniform(new Color(opts.glow || SKY.glow)),
    uWarmHz: uniform(new Color(opts.warmHz || SKY.warmHz)),
  };

  /* MeshBasicNodeMaterial, not Standard: the dome emits, it is not lit. Putting
     it through the physical model would have it shadowed by its own scene and
     graded twice. */
  const mat = new MeshBasicNodeMaterial({
    side: BackSide, depthWrite: false, fog: false, toneMapped: true,
  });

  mat.colorNode = Fn(() => {
    /* the direction is the dome vertex's own local position. `positionLocal`
       rather than `positionWorld`, because the dome is re-centred on the
       camera every frame and its world position therefore carries the walk. */
    const d = normalize(positionLocal).toVar();
    const upC = clamp(d.y, 0.0, 1.0).toVar();
    const c = mix(u.uMid, u.uZen, pow(upC, 0.62)).toVar();
    const hz = pow(float(1).sub(upC), 5.0).toVar();
    const sd = max(dot(d, normalize(u.uSun)), 0.0).toVar();

    // warm where the sun went down, blue everywhere else
    c.assign(mix(c, mix(u.uHorizon, u.uWarmHz, pow(sd, 1.15)), hz.mul(0.94)));
    c.addAssign(u.uGlow.mul(pow(sd, 5.0)).mul(0.55).mul(float(0.35).add(hz.mul(0.65))));
    c.addAssign(u.uGlow.mul(pow(sd, 24.0)).mul(0.7));

    /* cirrus, in a plane projected from the eye: dividing by altitude is what
       makes the bands converge toward the horizon instead of tiling flat */
    const sp = d.xz.div(max(d.y.add(0.16), 0.05)).toVar();
    const cl = fb(sp.mul(0.52).add(vec2(u.uTime.mul(0.0035), 0.0))).toVar();
    const band = smoothstep(0.52, 0.86, cl)
      .mul(smoothstep(-0.02, 0.22, d.y))
      .mul(float(1).sub(hz.mul(0.5))).toVar();
    c.assign(mix(c, mix(vec3(0.42, 0.40, 0.50), u.uGlow.mul(1.05),
      pow(sd, 1.6).mul(0.8).add(0.12)), band.mul(0.55)));

    // stars, only where the dome is already dark and only outside the cloud
    const st = h21(floor(d.xz.mul(340.0).div(max(abs(d.y), 0.15)))).toVar();
    const sv = smoothstep(0.9975, 1.0, st)
      .mul(smoothstep(0.10, 0.62, d.y))
      .mul(float(1).sub(band)).toVar();
    c.addAssign(vec3(0.85, 0.90, 1.0).mul(sv)
      .mul(float(0.5).add(sin(u.uTime.mul(2.2).add(st.mul(90.0))).mul(0.5))));

    return vec4(c, 1.0);
  })();

  mat.userData.u = u;
  return mat;
}

/* The ground half of the environment bake: warm sand bounce, brighter toward
   the sun. Small, and the reason a soffit reads warm from below. */
export function makeGroundBounceMaterial() {
  const uSun = uniform(new Vector3(...ATMOS.sun).normalize());
  const mat = new MeshBasicNodeMaterial({
    side: BackSide, depthWrite: false, fog: false,
  });
  mat.colorNode = Fn(() => {
    const d = normalize(positionLocal).toVar();
    const down = clamp(d.y.negate(), 0.0, 1.0).toVar();
    const sd = max(dot(vec3(d.x, 0.0, d.z), normalize(vec3(uSun.x, 0.0, uSun.z))), 0.0).toVar();
    const base = mix(vec3(0.30, 0.25, 0.19), vec3(0.52, 0.42, 0.30), pow(sd, 1.4)).toVar();
    return vec4(base.mul(float(0.35).add(down.mul(0.65))), 1.0);
  })();
  mat.userData.u = { uSun };
  return mat;
}
