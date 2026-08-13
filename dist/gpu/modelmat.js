/* ==========================================================================
   THE SCANNED-ASSET MATERIAL, in TSL.

   The other half of the material seam. `makeCityMaterial` shades everything
   the district generates; this shades everything it *loads* — the 42 GLBs,
   the mashrabiya imposters, the people.

   None of the triplanar surface law applies here: a scanned bench already
   carries its own albedo, normal and roughness at 2k, and running a
   procedural stone law over the top of a photograph of stone is how you get
   something that looks like neither. What these do share with the generated
   geometry is the *light*: the same probe field, the same directional
   height-falloff fog, the same sun. A prop lit differently from the wall
   behind it is the single most legible way for a district to look assembled
   rather than built, and it is why this file exists at all rather than the
   props just using a stock material.

   Two things beyond that:

   - **Foliage sways.** The wind term is a vertex displacement that rises with
     height above the instance's own base and with distance from its trunk, so
     the bole stays put and the outer crown moves. That is what a tree does;
     swaying the whole object rigidly is what a cardboard cutout does.

   - **Leaves are masked, not blended.** An alpha-blended leaf card has to be
     depth-sorted, and a depth-sorted leaf card flickers as you walk past it.
     `alphaTest` at 0.42, and the LOD chain keeps the silhouette.
   ========================================================================== */

import { Color, Vector2, Vector3, DoubleSide } from 'three';
import { MeshStandardNodeMaterial } from 'three/webgpu';
import {
  Fn, float, vec2, vec3, vec4, uniform, texture, positionLocal, positionWorld,
  instanceIndex, sin, cos, abs, max, length, fract, dot, floor, mix, If,
  cameraPosition, attribute, smoothstep,
} from 'three/tsl';
import { probeField, ATMOS } from './atmosphere.js';

/**
 * @param src      the source material off the GLB: map, normalMap, roughnessMap,
 *                 aoMap, alphaTest, name
 * @param foliage  true for anything with leaves — enables sway, drops the
 *                 normal/roughness/ao maps (scanned foliage carries baked
 *                 lighting in them that fights the probe field)
 * @param walk     true for a scanned figure that `tagWalker()` has labelled
 *                 limb by limb — enables the walk cycle below
 */
export function makeModelMaterial(src = {}, foliage = false, walk = false) {
  const mat = new MeshStandardNodeMaterial({
    color: 0xffffff,
    roughness: foliage ? 0.88 : 0.94,
    metalness: 0.0,
    side: DoubleSide,
    transparent: false,
    alphaTest: src.alphaTest > 0 ? src.alphaTest : (foliage && src.map ? 0.42 : 0),
  });

  if (src.map) {
    /* 16, flat. This is the WebGPU path and `renderer.capabilities` does not
       exist on it — WebGPU has no per-device anisotropy cap to query, the
       spec fixes maxAnisotropy at 16, and three clamps to it. The WebGL2
       build queries because WebGL2 genuinely varies. */
    src.map.anisotropy = 16;
    mat.map = src.map;                       // keeps alphaTest reading the right alpha
  }
  if (!foliage) {
    if (src.normalMap) mat.normalMap = src.normalMap;
    if (src.roughnessMap) mat.roughnessMap = src.roughnessMap;
    if (src.aoMap) mat.aoMap = src.aoMap;
  }

  const uTime = uniform(float(0));
  const uWind = uniform(new Vector2(0.85, 0.32));
  const uSway = uniform(float(foliage ? 1 : 0));

  /* ---- the scanned crowd walks ------------------------------------------
     No rigger was available to this project, so the ten scanned figures are
     labelled rather than rigged: `tagWalker()` in district_content_1.js writes
     a limb tag into the fractional part of a per-vertex `aSurf`, exactly as
     the procedural figures carry one, and this swings it.

     Two ramps that the procedural walk cycle does not have and must not get.
     A scan is ONE continuous mesh: rotating a leg rigidly about the hip rips
     it across the pelvis, and two legs turning opposite ways split a robe up
     the middle. Both ramps take the swing smoothly to zero at the seam — over
     the 180 mm below the pivot, and over the 60 mm either side of the centre
     line — so a thobe's hem opens and closes about a seam that stays whole.

     tagWalker() guarantees the frame this assumes: feet at y = 0, facing +Z,
     lateral on X. */
  if (walk) {
    mat.positionNode = Fn(() => {
      const p = positionLocal.toVar();
      const aS = attribute('aSurf', 'float').toVar();
      const ph = hash1(float(instanceIndex).mul(0.6180339887)).toVar();
      const limbTag = fract(aS.add(0.001)).toVar();
      If(limbTag.greaterThan(0.05), () => {
        const sw = sin(uTime.mul(4.15).add(ph.mul(6.2831853))).toVar();
        const swang = float(0).toVar();
        const piv = float(0).toVar();
        If(limbTag.lessThan(0.15), () => {
          swang.assign(sw.mul(0.52)); piv.assign(0.92);
        }).ElseIf(limbTag.lessThan(0.25), () => {
          swang.assign(sw.mul(-0.52)); piv.assign(0.92);
        }).ElseIf(limbTag.lessThan(0.35), () => {
          swang.assign(sw.mul(-0.40)); piv.assign(1.40);
        }).Else(() => {
          swang.assign(sw.mul(0.40)); piv.assign(1.40);
        });
        const rv = smoothstep(0.0, 0.18, piv.sub(p.y)).toVar();
        const rl = smoothstep(0.0, 0.06, abs(p.x)).toVar();
        swang.assign(swang.mul(rv).mul(rl));
        const cw = cos(swang).toVar();
        const s2 = sin(swang).toVar();
        const q = vec3(p.x, p.y.sub(piv), p.z).toVar();
        p.z.assign(q.z.mul(cw).sub(q.y.mul(s2)));
        p.y.assign(q.z.mul(s2).add(q.y.mul(cw)).add(piv));
      });
      return p;
    })();
  } else if (foliage) {
    /* ---- the wind ---------------------------------------------------------
       Vertex displacement, in the object's own local frame, phased off the
       instance's world position so a row of palms does not move as one object.

       The GLSL seeded the phase from `instanceMatrix[3].xyz` — the instance's own
       translation. TSL has no `instanceMatrix` accessor, and reaching for
       `modelWorldMatrix` would be wrong: on an InstancedMesh that is the mesh's
       matrix, shared by every instance, so a whole avenue of palms would sway as
       one object. `instanceIndex` is per-instance, stable across frames and
       already in the vertex stage, which is all the seed ever had to be. The
       phase pattern differs from the WebGL2 build's; the motion does not. */
    mat.positionNode = Fn(() => {
      const p = positionLocal.toVar();
      const ph = hash1(float(instanceIndex).mul(0.6180339887)).toVar();
      const lift = max(p.y, 0.0).toVar();          // height above its own base
      const out2 = length(p.xz).toVar();           // reach from its own trunk
      const amp = lift.mul(0.020).add(out2.mul(0.014)).toVar();
      const g = sin(uTime.mul(1.15).add(ph.mul(62.8))).mul(0.6)
        .add(sin(uTime.mul(2.4).add(ph.mul(31.4))).mul(0.4)).toVar();
      const gust = float(0.62).add(sin(uTime.mul(0.29).add(ph.mul(12.0))).mul(0.38)).toVar();
      const k = g.mul(gust).toVar();
      p.x.addAssign(uWind.x.mul(amp).mul(k));
      p.z.addAssign(uWind.y.mul(amp).mul(k));
      // a leaf pushed sideways is also pulled down — the arc, not a shear
      p.y.subAssign(abs(g).mul(amp).mul(0.20));
      return p;
    })();
  }

  /* ---- the same light as everything else -------------------------------
     Irradiance -> radiance, for the reason recorded in material.js: the
     WebGL2 build added this into `irradiance` where the lighting model
     applies albedo and 1/pi, and `emissiveNode` has neither. A scanned
     asset's albedo is its map, so that is what multiplies here. */
  const f = probeField();
  const albedo = src.map ? texture(src.map).rgb : vec3(0.72);
  mat.emissiveNode = f.node.mul(ATMOS.probeIntensity).mul(albedo).mul(1 / Math.PI);

  mat.userData.u = {
    uTime, uWind, uSway,
    uProbeInt: uniform(float(ATMOS.probeIntensity)),
    ...f.u,
  };
  mat.userData.gpuName = src.name || (walk ? 'walker' : foliage ? 'foliage' : 'model');
  return mat;
}

/* the same one-liner hash the GLSL used, over the instance index rather than
   over the instance's translation — see the note on the wind above */
const hash1 = Fn(([p]) => fract(sin(p.mul(12.9898)).mul(43758.5453)));
