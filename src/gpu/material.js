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

import { Color } from 'three';
import { MeshStandardNodeMaterial } from 'three/webgpu';
import {
  Fn, float, vec3, vec4, attribute, positionWorld, normalWorld, cameraPosition,
  cameraViewMatrix, length, floor, mix, clamp, uniform, vertexColor, max,
} from 'three/tsl';

import {
  srfH, triplanarUV, reliefNormal, reliefNormalStaged, reliefNormalWorld,
} from './surface.js';
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

  /* These are factories, not variables, and that distinction is the whole
     bug this file had. A TSL `.toVar()` belongs to the node function that
     consumes it — hoisting one to function scope and feeding it into several
     independent graphs is not a GLSL local, and every graph that touched a
     shared one collapsed to black. Each graph below now builds its own.

     The class travels per-vertex; floor() drops the walk-cycle limb tag that
     shares the same attribute. */
  const clsOf = () => (opts.fixedClass ? float(4) : floor(attribute('aSurf', 'float')));
  const uvOf = () => triplanarUV(positionWorld, normalWorld);
  const distOf = () => length(positionWorld.sub(cameraPosition));

  /* ---- normal ---------------------------------------------------------- */
  // world-space, framed by the triplanar tangent basis — see surface.js
  if (!opts.noNormal) {
    /* normalMap() is the wrong door for this. three.webgpu.js:16626 opens with
         let normalMap = this.node.mul( 2.0 ).sub( 1.0 );
       — it expects a PACKED 0..1 texel and unpacks it — and then puts the
       result through TBNViewMatrix, which wants a geometry tangent attribute
       the instanced city meshes do not carry.

       `normalNode` itself (21712, `setupNormal`) is consumed in place of
       `materialNormal`, whose default is `normalView`: a plain VIEW-space
       normal, signed, no unpacking, no tangent frame. That is the door. The
       WebGL2 build already built its own world-space triplanar frame, so the
       only thing the port adds is the world -> view rotation, and
       `cameraViewMatrix` is exactly the matrix three itself uses for the round
       trip (15379: normalWorld = normalView transformed by its inverse). */
    const stage = opts.normalStage || 0;
    const wn = opts.normalConst
      ? normalWorld
      : (stage
        ? reliefNormalStaged(uvOf(), clsOf(), distOf(), uAmp, float(stage), normalWorld)
        : reliefNormalWorld(uvOf(), clsOf(), distOf(), uAmp, normalWorld));
    mat.normalNode = wn.transformDirection(cameraViewMatrix).normalize();
  }

  /* ---- albedo ----------------------------------------------------------
     Two terms, both from the height field: the recesses go darker because
     less light reaches them, and each block carries its own tone so a wall
     is coursed stone rather than one colour behind a joint pattern. */
  if (!opts.noColor) {
    mat.colorNode = Fn(() => {
      const h = srfH(uvOf(), clsOf()).toVar();     // (height, cavity, grain)
      const base = (opts.flatColor ? vec3(0.78) : vertexColor()).toVar();
      const shaded = base.mul(mix(float(0.62), float(1.0), h.y)).toVar();
      return shaded.mul(mix(float(0.90), float(1.10), h.z));
    })();
  }

  /* ---- roughness -------------------------------------------------------
     Up in the recesses. Without this the joints read wet, which is the
     single most common tell of relief faked with a normal map alone. */
  if (!opts.noRough) {
    mat.roughnessNode = Fn(() => {
      const h = srfH(uvOf(), clsOf()).toVar();
      return clamp(float(0.86).add(float(1).sub(h.y).mul(0.12))
        .sub(h.z.mul(0.06)), 0.25, 1.0);
    })();
  }

  /* ---- indirect: the probe field, and the shop ceilings ------------------

     Both of these are IRRADIANCE — light arriving at the surface — and the
     WebGL2 build added them into indirect diffuse, where the lighting model
     multiplies by the albedo and by the Lambert 1/pi before anything sees
     them. `emissiveNode` has neither factor: it is added straight to the
     outgoing radiance. Porting the same numbers across unchanged made every
     shopfront a white slab an order of magnitude past the sun, and it looked
     like a bloom problem for a while because bloom is what spread it.

     So the numbers stay (they are measured, and the two builds have to agree)
     and the conversion is done here: irradiance x albedo / pi is the outgoing
     radiance of a Lambertian surface under it, which is exactly what the
     WebGL2 path computed and what `emissiveNode` has to be handed. */
  const INV_PI = 1 / Math.PI;
  const albedoOf = () => Fn(() => {
    const h = srfH(uvOf(), clsOf()).toVar();
    const base = (opts.flatColor ? vec3(0.78) : vertexColor()).toVar();
    return base.mul(mix(float(0.62), float(1.0), h.y))
      .mul(mix(float(0.90), float(1.10), h.z));
  })();

  let irradiance = null;
  if (opts.probes) {
    const p = opts.probes;
    irradiance = probeIrradiance(p.skyTex, p.gndTex, p.P)
      .mul(ATMOS.environmentIntensity);
    mat.aoNode = null;
  }
  /* a shop interior is lit by its own ceiling, not by the sky: one added
     term, and the reason the fitted rooms read through the glass at dusk */
  if (opts.roomAdd) {
    const add = uniform(new Color(...opts.roomAdd));
    irradiance = irradiance ? irradiance.add(add) : add;
  }
  if (irradiance) {
    mat.emissiveNode = irradiance.mul(albedoOf()).mul(INV_PI);
  }

  /* ---- fog -------------------------------------------------------------
     Applied on the material's own output rather than through scene.fogNode,
     for the same reason the WebGL2 build injected at `fog_fragment`: it has
     to sit after everything else and it has to be skippable per material
     (the sky dome must not be fogged into itself). */
  /* Fog does NOT go here. three.webgpu.js sets
       const isCustomOutput = this.outputNode !== null;
       if ( isCustomOutput ) resultNode = this.outputNode;
     — `outputNode` REPLACES the whole result rather than receiving the lit
     fragment, so mixing fog into it discarded every bit of shading. It belongs
     on the scene: `scene.fogNode = cityFogNode()`. */

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


/* The fog, as a scene-level node. Applied here rather than on the material for
   the reason recorded above: a material's outputNode replaces its result. */
export function cityFogNode() {
  return directionalFog({
    cool: ATMOS.fogCool, warm: ATMOS.fogWarm, sun: ATMOS.sun,
    density: ATMOS.fogDensity, scaleH: ATMOS.fogScaleH,
  });
}
