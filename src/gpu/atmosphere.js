/* ==========================================================================
   PROBE FIELD AND FOG, in TSL.

   Step 2 of WEBGPU_PLAN.md. Both of these change what light a surface
   receives rather than what the surface is, which is why they live together
   and away from the surface law.

   ---- the probe field ----------------------------------------------------
   The difference between "lit by three lights" and "rendered" is that in a
   real place the ambient light is not a constant — it is a field. Under an
   arcade it is dim and warm; in the middle of the plaza it is bright and
   blue; a metre from a sunlit wall it carries that wall's colour.

   The WebGL2 build bakes a coarse 3D grid of probes at build time, each
   holding the sky-side and ground-side irradiance it can actually see, and
   samples them trilinearly into the material's indirect term. That bake is
   plain JavaScript against the occluder boxes and is renderer-agnostic — it
   carries over untouched. Only the sampling moves here.

   Two Data3DTextures, sampled once each, added into indirect diffuse. It
   costs two texture fetches and is the single largest step this scene takes
   toward looking rendered rather than lit.

   ---- the fog ------------------------------------------------------------
   Two things the stock fog cannot do, both of which this scene needs:

   1. It is directional. Distance is not one colour: looking west into the
      last of the sun it is warm, looking anywhere else at this hour it is
      deep blue. `mix(cool, warm, pow(dot(viewDir, sun), 1.8))`.

   2. Its density falls off with altitude. Dust and humidity sit in the
      bottom couple of hundred metres. A single density has to be either too
      weak to dissolve the desert at eye level or strong enough to grey out
      the whole district seen from three hundred metres up — an exponential
      atmosphere of 150 m scale height, sampled at both ends of the ray,
      lets it do both.
   ========================================================================== */

import { Color, Vector3 } from 'three';
import {
  Fn, float, vec3, vec4, texture3D, positionWorld, cameraPosition, normalWorld,
  dot, max, pow, mix, exp, length, normalize, uniform, clamp, fog,
} from 'three/tsl';

/* -------------------------------------------------------------- the probes */
/**
 * @param skyTex  Data3DTexture of sky-side irradiance (RGBA, A unused)
 * @param gndTex  Data3DTexture of ground-side irradiance
 * @param P       { step, ystep, ny, y0, nx, nz, x0, z0 } — the bake's own grid
 */
export function probeIrradiance(skyTex, gndTex, P) {
  const org = uniform(vec3(P.x0, P.y0, P.z0));
  const inv = uniform(vec3(
    1 / (P.step * (P.nx - 1)),
    1 / (P.ystep * (P.ny - 1)),
    1 / (P.step * (P.nz - 1)),
  ));

  return Fn(() => {
    /* the grid is in world metres; the texture is 0..1 on each axis, and the
       clamp is what stops a walker leaning out past the last probe and
       reading the wrap */
    const p = clamp(positionWorld.sub(org).mul(inv), 0.0, 1.0).toVar();
    const sky = texture3D(skyTex, p).toVar();
    const gnd = texture3D(gndTex, p).toVar();
    /* a surface facing up sees the sky half of its probe, one facing down
       sees the ground half, and the horizon is the blend — the same
       hemisphere split the bake stored them under */
    const up = normalWorld.y.mul(0.5).add(0.5).toVar();
    return mix(gnd.rgb, sky.rgb, up);
  })();
}

/* ----------------------------------------------------------------- the fog */
/**
 * @param opts.cool     Color for the away-from-sun half of the horizon
 * @param opts.warm     Color for the sunward half
 * @param opts.sun      Vector3, the sun direction the district is lit by
 * @param opts.density  Base extinction (per metre)
 * @param opts.scaleH   Aerosol scale height in metres
 */
export function directionalFog(opts) {
  /* uniform() infers its type from the JS value it is handed. A raw 0x7286a8
     is a Number, which it reads as a float and then fails on with
     `Uniform "null" not implemented`; the hex has to arrive as a Color and the
     direction as a Vector3 for the vec3 uniforms to be declared at all. */
  const uCool = uniform(new Color(opts.cool));
  const uWarm = uniform(new Color(opts.warm));
  const uSun = uniform(new Vector3(...opts.sun).normalize());
  const uDensity = uniform(float(opts.density));
  const uScaleH = uniform(float(opts.scaleH));

  /* `scene.fogNode` is not a (colour, factor) pair and it is not a modifier —
     it IS the final fragment. three.webgpu.js:21903:

         output.assign( outputNode );          // the lit result goes in here
         outputNode = vec4( fogNode.toVar() ); // and the fog node replaces it

     so a fog node has to read the lit fragment back off the `output` accessor
     and return the whole mixed vec4. Returning vec4(colour, factor) painted
     flat fog over the entire frame — the panels read 17 with everything else
     already working. `fog(colour, factor)` is three's own helper for exactly
     this and it is what does the mix; this function supplies its two halves. */
  const colorAndFactor = Fn(() => {
    const toFrag = positionWorld.sub(cameraPosition).toVar();
    const dist = length(toFrag).toVar();
    const dir = normalize(toFrag).toVar();

    // warm only where the sun went down; blue everywhere else
    const fsun = pow(max(dot(dir, normalize(uSun)), 0.0), 1.8).toVar();
    const col = mix(uCool, uWarm, fsun).toVar();

    /* mean aerosol density along the ray, from an exponential atmosphere
       sampled at both ends. This is the term that lets one density serve a
       walker at eye level and a camera three hundred metres up. */
    const hAvg = cameraPosition.y.add(positionWorld.y).mul(0.5).toVar();
    const hFall = exp(max(hAvg, 0.0).div(uScaleH).negate()).toVar();

    const d = uDensity.mul(dist).toVar();
    const f = float(1).sub(exp(d.mul(d).mul(hFall).negate())).toVar();
    return vec4(col, clamp(f, 0.0, 1.0));
  })();

  return fog(colorAndFactor.rgb, colorAndFactor.a);
}

/* The values the WebGL2 build arrived at by measurement, kept here so the two
   builds start from the same place and any difference in the side-by-side is
   the renderer rather than the grade. */
export const ATMOS = {
  fogCool: 0x7286a8,      // matched to the sky dome's own horizon
  fogWarm: 0xd9a878,      // and to its warm half, so distance dissolves into it
  fogDensity: 0.00145,
  fogScaleH: 150,
  sun: [-0.9232, 0.3420, -0.1754],   // 20 degrees, WSW
  environmentIntensity: 0.42,
};
