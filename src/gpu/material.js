/* ==========================================================================
   THE CITY MATERIAL, in TSL.

   Step 3, and the first step that renders a pixel — everything before it was
   reasoning. This is the node material that consumes the surface law and the
   atmosphere and stands in for `makeCityMaterial`'s onBeforeCompile chunk.

   What it has to reproduce, in the order the GLSL did it:

     1. the triplanar frame from the world normal
     2. three height samples, and the shading normal bent by their gradient
     3. albedo darkened in the recesses (`cavity`) and varied per block
        (`grain`)
     4. roughness raised in the recesses — this is what stops wet-looking
        stone
     5. directional, altitude-falloff fog over the top

   The surface class travels per-vertex on `aSurf`, as it always has. Its
   integer part is the class; its fractional part is the walk-cycle limb tag,
   which is why every read of it here is `floor`ed. That trick is the reason
   the figures animate without a skeleton, and it survives the port intact.
   ========================================================================== */

import { MeshStandardNodeMaterial } from 'three/webgpu';
import {
  Fn, float, vec3, vec4, attribute, positionWorld, normalWorld, cameraPosition,
  length, floor, mix, clamp, uniform, output, vertexColor, max,
} from 'three/tsl';

import { srfH, triplanarUV, reliefNormal } from './surface.js';
import { directionalFog, probeIrradiance, ATMOS } from './atmosphere.js';

/**
 * @param opts.probes   { skyTex, gndTex, P } or null
 * @param opts.roomAdd  vec3 added to indirect for shop interiors, or null
 * @param opts.reliefAmp normal-perturbation amplitude (0.055 in the WebGL2 build)
 */
export function makeCityMaterial(opts = {}) {
  /* `plain` returns a stock node material with nothing of ours attached. If
     the panels are still black under it, the fault is in the probe scene —
     lights, geometry, winding — and not in this file at all. That distinction
     is worth one flag: three rounds were spent on the wrong half of it. */
  if (opts.plain) {
    return new MeshStandardNodeMaterial({ vertexColors: true, roughness: 0.8 });
  }
  const mat = new MeshStandardNodeMaterial({
    vertexColors: true, roughness: 0.86, metalness: 0.02,
  });

  const uAmp = uniform(float(opts.reliefAmp === undefined ? 0.055 : opts.reliefAmp));

  /* the class travels per-vertex; floor() drops the walk-cycle limb tag that
     shares the same attribute */
  const surfClass = (opts.fixedClass ? float(4)
    : floor(attribute('aSurf', 'float'))).toVar();
  const uv = triplanarUV(positionWorld, normalWorld).toVar();
  const dist = length(positionWorld.sub(cameraPosition)).toVar();
  const h = srfH(uv, surfClass).toVar();      // (height, cavity, grain)

  /* ---- normal ---------------------------------------------------------- */
  // world-space, framed by the triplanar tangent basis — see surface.js
  if (!opts.noNormal) mat.normalNode = reliefNormal(uv, surfClass, dist, uAmp, normalWorld);

  /* ---- albedo ----------------------------------------------------------
     Two terms, both from the height field: the recesses go darker because
     less light reaches them, and each block carries its own tone so a wall
     is coursed stone rather than one colour behind a joint pattern. */
  mat.colorNode = Fn(() => {
    const base = (opts.flatColor ? vec3(0.78) : vertexColor()).toVar();
    const cav = h.y.toVar();
    const grain = h.z.toVar();
    const shaded = base.mul(mix(float(0.62), float(1.0), cav)).toVar();
    return shaded.mul(mix(float(0.90), float(1.10), grain));
  })();

  /* ---- roughness -------------------------------------------------------
     Up in the recesses. Without this the joints read wet, which is the
     single most common tell of relief faked with a normal map alone. */
  if (!opts.noRough) mat.roughnessNode = Fn(() =>
    clamp(float(0.86).add(float(1).sub(h.y).mul(0.12))
      .sub(h.z.mul(0.06)), 0.25, 1.0))();

  /* ---- indirect: the probe field --------------------------------------- */
  if (opts.probes) {
    const p = opts.probes;
    const probe = probeIrradiance(p.skyTex, p.gndTex, p.P);
    mat.aoNode = null;
    mat.emissiveNode = probe.mul(ATMOS.environmentIntensity);
  }
  /* a shop interior is lit by its own ceiling, not by the sky: one added
     term, and the reason the fitted rooms read through the glass at dusk */
  if (opts.roomAdd) {
    const add = uniform(vec3(...opts.roomAdd));
    const prev = mat.emissiveNode;
    mat.emissiveNode = prev ? prev.add(add) : add;
  }

  /* ---- fog -------------------------------------------------------------
     Applied on the material's own output rather than through scene.fogNode,
     for the same reason the WebGL2 build injected at `fog_fragment`: it has
     to sit after everything else and it has to be skippable per material
     (the sky dome must not be fogged into itself). */
  const fog = directionalFog({
    cool: ATMOS.fogCool, warm: ATMOS.fogWarm, sun: ATMOS.sun,
    density: ATMOS.fogDensity, scaleH: ATMOS.fogScaleH,
  });
  if (!opts.noOutput) {
    mat.outputNode = Fn(() => {
      const c = output.toVar();
      return vec4(mix(c.rgb, fog.rgb, fog.a), c.a);
    })();
  }

  mat.userData.u = { uAmp };
  return mat;
}

/* The same law with the ceiling switched on. In the WebGL2 build this needed
   a distinct `customProgramCacheKey`, or three shared one compiled program
   between the two materials and the interior's added term was never bound —
   three rounds of invisible shop interiors came from that. Node materials
   build their own program from the node graph, so the hazard does not exist
   here; noted because the bug was expensive and the absence is worth knowing. */
export function makeInteriorMaterial(opts = {}) {
  const mat = makeCityMaterial({ ...opts, roomAdd: opts.roomAdd || [1.05, 0.86, 0.62] });
  mat.side = 2;   // DoubleSide
  return mat;
}
