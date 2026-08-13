/* ==========================================================================
   THE SUN, AND ITS SHADOWS.

   One directional light at 20 degrees WSW — the hour the four SDC renders are
   drawn at, and the same vector the fog and the probe bake already use, so
   the three agree by construction rather than by eye.

   ---- why cascades --------------------------------------------------------
   The district is a 400 m grid that the camera walks at 1.65 m eye height and
   also flies at 300 m. A single shadow camera has to choose: fit it to the
   walk and the far end of the street has no shadow at all; fit it to the fly
   and a 2048 map spread over 400 m gives 20 cm texels, which turns a mashrabiya
   screen's shadow into a grey smudge and a kerb's into nothing.

   Cascades solve exactly that and nothing else. Three splits, practical
   distribution: the near cascade covers the first ~12 m at roughly 6 mm per
   texel, which resolves the 18 mm members of a screen; the far one covers the
   rest of the view.

   `CSMShadowNode` is WebGPU-only by construction — it builds one `shadow()`
   node per cascade and blends them in TSL, which has no WebGL equivalent. On
   the WebGL2 fallback this file fits a single shadow camera to the near field
   instead, which is worse and is *supposed* to look worse: the fallback exists
   so the headless gates still produce a frame, not so the two are equivalent.
   ========================================================================== */

import { DirectionalLight, HemisphereLight, Vector3, Color } from 'three';
import { ATMOS } from './atmosphere.js';

export const SUN = {
  dir: new Vector3(...ATMOS.sun).normalize(),
  color: 0xffd9a8,
  intensity: 3.1,
  skyColor: 0x8fb4e8,
  groundColor: 0x6b5136,
  hemiIntensity: 0.55,
  distance: 260,          // where the light object sits, for the fallback fit
};

/**
 * Attach cascades to a light that already exists.
 *
 * This is the entry point the district uses, and the distinction matters: the
 * district builds its own rig — a 2.35-intensity sun at 20 degrees WSW, a cool
 * counter-fill from the east sky so shadowed stone reads blue-violet rather
 * than black, a warm bounce aimed up off the paving, and a hemisphere at 0.06.
 * Those four are measured against the SDC renders and they are most of why the
 * district reads the way it does. Adding a second sun beside them, which is
 * what `buildSun` would do, is not "lighting the scene" — it is double
 * lighting it, and it flattens every shadow the rig was built to place.
 *
 * So on the district this replaces only the SHADOW, and leaves the rig alone.
 *
 * @param light   the existing DirectionalLight to attach cascades to
 * @param camera  the camera the cascades are fitted to
 * @param opts.webgpu   true when the real backend came up
 * @param opts.cascades number of cascades (WebGPU only)
 * @param opts.maxFar   how far the cascades reach, in metres
 */
export async function attachCSM(light, camera, opts = {}) {
  if (!opts.webgpu) {
    /* Nothing to do: the district's own `fitShadow` refits a single shadow
       camera every frame against the walker's height and view direction, with
       texel- and grazing-angle-scaled bias. That is a good single-camera fit
       and it stays. Cascades beat it, but only on the backend that can run
       them. */
    return null;
  }
  const { CSMShadowNode } = await import('three/addons/csm/CSMShadowNode.js');
  const csm = new CSMShadowNode(light, {
    cascades: opts.cascades || 3,
    maxFar: opts.maxFar || 340,
    mode: 'practical',
    lightMargin: 220,
  });
  csm.camera = camera;
  csm.fade = true;               // no visible seam where a cascade hands over
  light.shadow.shadowNode = csm;
  return csm;
}

/**
 * Build a whole rig from scratch. Used by the standalone testbed only — the
 * district has its own and `attachCSM` is the door for it.
 *
 * @param scene   Scene
 * @param camera  the camera the cascades are fitted to
 * @param opts.webgpu   true when the real backend came up
 * @param opts.cascades number of cascades (WebGPU only)
 * @param opts.mapSize  shadow map edge, per cascade
 * @param opts.maxFar   how far the cascades reach, in metres
 */
export async function buildSun(scene, camera, opts = {}) {
  const sun = new DirectionalLight(new Color(SUN.color), SUN.intensity);
  sun.position.copy(SUN.dir).multiplyScalar(SUN.distance);
  sun.target.position.set(0, 0, 0);
  sun.castShadow = true;

  const mapSize = opts.mapSize || 2048;
  sun.shadow.mapSize.set(mapSize, mapSize);
  sun.shadow.bias = -0.0004;
  sun.shadow.normalBias = 0.022;      // in metres; sized to the 225 mm ashlar course
  scene.add(sun, sun.target);

  const hemi = new HemisphereLight(new Color(SUN.skyColor), new Color(SUN.groundColor),
    SUN.hemiIntensity);
  scene.add(hemi);

  let csm = null;
  if (opts.webgpu) {
    /* imported lazily: the module reaches into WebGPU-only base classes, and
       on the fallback path there is no reason to pay for parsing it */
    const { CSMShadowNode } = await import('three/addons/csm/CSMShadowNode.js');
    csm = new CSMShadowNode(sun, {
      cascades: opts.cascades || 3,
      maxFar: opts.maxFar || 320,
      mode: 'practical',
      lightMargin: 220,
    });
    csm.camera = camera;
    csm.fade = true;              // no visible seam where a cascade hands over
    sun.shadow.shadowNode = csm;
  } else {
    /* Fallback: fit the single camera to the near field rather than the whole
       district. A 2048 map over 70 m is 34 mm per texel — coarse, but it still
       reads as a shadow at walking distance, which is what the gates look at.
       Fitting it to `maxFar` instead would give 160 mm texels and the
       screenshots would show no small-scale shadow at all, which would make
       the WebGL2 gate quietly stop testing the thing it is there to test. */
    const r = 35;
    Object.assign(sun.shadow.camera, {
      left: -r, right: r, top: r, bottom: -r, near: 1, far: SUN.distance * 2,
    });
    sun.shadow.camera.updateProjectionMatrix();
  }

  return { sun, hemi, csm, update: () => { if (csm) csm.updateFrustums(); } };
}
