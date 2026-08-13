/* ==========================================================================
   THE DISTRICT, ON THE WebGPU RENDERER.

   `gpuscene.html` proved the post stack on a street I wrote by hand. This is
   the real thing: `district.js` and its five content files, unmodified, built
   by the same seeded generators that build the WebGL2 deliverable, shaded by
   `src/gpu/*.js` instead of by `onBeforeCompile`.

   The district is not a module and never was — it is a text include assembled
   by `build.py`, an IIFE that closes over a handful of names the map layer
   owns. So the job of this file is to be a *smaller* map layer: define those
   names, hand the district a material factory, and drive it.

   What it deliberately does not do: the Saudi relief map, the dive, the
   panels, the legend, the bilingual UI. Those live in `src/main.js`, they are
   thousands of lines of `ShaderMaterial`, and none of them is what the four
   SDC renders are of. The WebGL2 build keeps all of it and stays the
   deliverable until the side-by-side says otherwise — which is the whole
   premise of WEBGPU_PLAN.md.

   Query grammar:
     ?view=plaza|souq|court|arcade|water|aerial   the district bookmarks
     ?seed=N          same world every reload, same as the WebGL2 build
     ?post=0 ?ao=0 ?ssgi=1 ?traa=0 ?bloom=0       per-node post switches
     ?tod=19          time of day, drives the colour script
     ?forcegl=1       force the WebGL2 backend of WebGPURenderer
     ?frames=N        how many frames before the gate calls it ready
   ========================================================================== */
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/addons/libs/meshopt_decoder.module.js';
import { makeCityMaterial as gpuCityMaterial, cityFogNode } from './gpu/material.js';
import { makeGlassMaterial as gpuGlassMaterial } from './gpu/glass.js';
import { makeModelMaterial as gpuModelMaterial } from './gpu/modelmat.js';
import { makeSkyMaterial, makeGroundBounceMaterial } from './gpu/sky.js';
import { makeWaterMaterial } from './gpu/water.js';
import { attachCSM } from './gpu/lighting.js';
import { buildPost } from './gpu/post.js';

/* ---------------------------------------------------------------- the shims
   Everything `district.js` reaches out of its IIFE for. The list is short
   because the district owns almost all of its own state: TEX, PANELS, PROPS,
   MODELS, cityScene, cityCam and the whole plan are declared inside it. */

function mulberry32(a) {
  return function () {
    a |= 0; a = a + 0x6D2B79F5 | 0;
    let t = Math.imul(a ^ a >>> 15, 1 | a);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

/* QA is copied from `src/main.js` rather than reinvented, defaults included.
   The seed default in particular: the district is fully determined by it, and
   a different default here would build a different city — which would make
   every side-by-side against the WebGL2 build compare two different places
   and look like a rendering difference. */
const _q = new URLSearchParams(location.search);
const QA = {
  seed: _q.has('seed') ? (parseInt(_q.get('seed'), 10) || 0) : 20260811,
  scene: 'city',
  shot: _q.has('shot') ? parseInt(_q.get('shot'), 10) : 0,
  cam: _q.has('cam') ? _q.get('cam').split(',').map(Number) : null,
  hud: _q.get('hud') === '1',
  noveil: true,                       // there is no dive on this renderer
  nolife: _q.get('nolife') === '1',
  walk: _q.get('walk') === '1',
  flat: _q.get('flat') === '1',
  grade: _q.get('grade') !== '0',
  norefl: _q.get('norefl') === '1',
  noshadow: _q.get('noshadow') === '1',
  nodof: _q.get('nodof') === '1',
  ruler: _q.get('ruler') === '1',
  ss: 0,
  tone: _q.get('tone') || '',
  shadowType: _q.get('shadow') || '',
  shop: _q.has('shop') ? parseInt(_q.get('shop'), 10) : -1,
  shopd: _q.has('shopd') ? parseFloat(_q.get('shopd')) : 3.6,
  view: _q.get('view') || 'plaza',
};
const SEED = QA.seed;
const T0 = performance.now(); const TM = {}; const mark = (k) => { TM[k] = Math.round(performance.now() - T0); };
const flag = (k, d = true) => (_q.get(k) === null ? d : _q.get(k) !== '0');

const log = [];
const say = (s) => {
  log.push(s);
  const el = document.getElementById('l');
  if (el) el.innerHTML = log.slice(-9).join('<br>');
};
window.__gpuapp = { log };
window.__frames = 0;

const renderer = new THREE.WebGPURenderer({
  antialias: false, forceWebGL: _q.get('forcegl') === '1',
});
await renderer.init();
const IS_GPU = !!(renderer.backend && renderer.backend.isWebGPUBackend);
say('renderer: ' + (IS_GPU ? 'WebGPU' : 'WebGL2 fallback'));
renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(1);
/* ---- tone mapping ------------------------------------------------------
   AgX by default, not ACES, and the reason is this scene specifically.

   The district is lit at 19:00 by a narrow-band source 20 degrees above the
   horizon. ACES rolls a saturated orange highlight toward yellow and then to
   white as it clips — which is the correct film look for a broad daylight
   key and the wrong answer for a low warm sun, because the thing that makes
   golden hour read as golden is exactly the hue ACES throws away first. AgX
   holds hue into the clip. (Same finding, same reason, in StarKnightt/
   night-street, whose street is lit the same way.)

   `?tone=aces` switches back for an A/B, and the exposure follows the curve
   rather than staying put: the two curves do not agree about what a given
   radiance is worth, so comparing them at one exposure compares exposures.
   The WebGL2 build already carried `?tone=agx` as an option — this makes the
   two builds agree on the default instead of disagreeing silently. */
const TONE = (_q.get('tone') || 'agx').toLowerCase();
if (TONE === 'aces' || !THREE.AgXToneMapping) {
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.88;
} else {
  renderer.toneMapping = THREE.AgXToneMapping;
  /* AgX has a longer toe and a gentler shoulder than ACES, so the same
     radiance reads darker through it; the district's measured 0.88 under ACES
     lands near 1.05 here. Tuned by the side-by-side, not by taste — ?exp=N
     overrides so the number can be re-derived rather than trusted. */
  renderer.toneMappingExposure = parseFloat(_q.get('exp') || '1.05');
}
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

// the map layer's camera, which the district only reads to restore on exit
const camera = new THREE.PerspectiveCamera(40, innerWidth / innerHeight, 1.2, 4400);
const clock = new THREE.Clock();
const SCENES = { map: { name: 'map' } };
/* the district writes through this to retarget the composer's render pass; on
   this renderer the post stack owns its own pass, so it is a sink */
const renderPass = { scene: null, camera: null };

/* ------------------------------------------------------------ the factory
   The seam `district.js` checks for. Defined here and nowhere else: the
   WebGL2 build never sees this name, so `MATERIALS` is null there and the
   district builds exactly what it always built. */
const GPU_MATS = [];
const CITY_MATERIALS = {
  city: (cacheKey) => {
    const m = gpuCityMaterial({
      roomAdd: cacheKey === 'room' ? [1.05, 0.86, 0.62] : null,
      // ?nobl=1 point-samples the surface law again, which is the A/B for the
      // band-limiting: the difference is a street that shimmers and one that
      // does not, and it has to be seen side by side to be judged
      noBandLimit: _q.get('nobl') === '1',
    });
    if (cacheKey === 'room') m.side = THREE.DoubleSide;
    GPU_MATS.push(m);
    return m;
  },
  model: (src, foliage, walk) => { const m = gpuModelMaterial(src, foliage, walk); GPU_MATS.push(m); return m; },
  water: (o) => { const m = makeWaterMaterial(o); GPU_MATS.push(m); return m; },
  glass: (kind) => { const m = gpuGlassMaterial(kind); GPU_MATS.push(m); return m; },
  sky: () => makeSkyMaterial(),
  groundBounce: () => makeGroundBounceMaterial(),
};

/* the loaders district.js expects to find in scope */
const gltfLoader = new GLTFLoader().setMeshoptDecoder(MeshoptDecoder);
window.__gltfLoader = gltfLoader;


/* The rest of what `enter()` touches on its way through. Each of these is a
   real object in `src/main.js` — the orbit controls, the city beacons, the
   WebGL2 bloom pass, the map's grade uniform — and none of them exists on this
   renderer. They are stubbed rather than removed from the district because the
   district is shared source: deleting the calls would fork it, and a fork of
   350 KB of placement decisions starts diverging on the first bug fixed in one
   copy and not the other. */
/* nz / fbm / ridged / clamp / sstep / mix, lifted verbatim out of main.js at
   build time rather than copied. The noise generator is SEEDED: a second copy
   that drifts by one constant builds a different city, and the difference
   would show up in a side-by-side looking exactly like a rendering
   difference. One source, two builds. */
/*@SHARED_HELPERS@*/
const easeIO = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const C = (h) => new THREE.Color(h);
const controls = { enabled: true, target: new THREE.Vector3() };
const CITIES = [{
  name: 'Al Khobar', wpos: new THREE.Vector3(), labelObj: { visible: false },
}];
const ui = { panel: null };
const BLOOM_MAP = { s: 0.40, r: 0.62, t: 1.02 };
const bloom = { strength: BLOOM_MAP.s, radius: BLOOM_MAP.r, threshold: BLOOM_MAP.t };
/* the map's grade pass: `uCity` crossfades the district grade in during the
   dive, `uVeil` is the dive's white-out. Neither exists on this renderer —
   the colour script in src/gpu/grade.js does the grading and there is no
   dive — but district.js writes both every frame. */
const grade = { uniforms: { uCity: { value: 1 }, uVeil: { value: 0 } } };
const markIdle = () => {};
let dimTarget = 0;
let sceneState = 'map';
const scene = new THREE.Scene();      // the map scene the district restores to

/*@DISTRICT@*/

/* ------------------------------------------------------------------- drive */
const cityScene3 = CITY.scene;
const cam = CITY.cam;

say('building the district…');
const t0 = performance.now();
/* Fog goes on BEFORE anything renders, and the ordering is the whole point.
   A material's compiled program depends on the scene's fog and environment, so
   attaching either one after the first draw makes every material in the
   district compile TWICE — once without and once with. night-street measured
   that exact mistake at 99 programs down to 76 and 11-13 seconds of load
   recovered, and shader compilation is the dominant cost of starting a scene
   this size. Nothing has rendered at this line; `enter()` builds geometry and
   the PMREM bake below only ever sees the sky material. */
cityScene3.fogNode = cityFogNode();

/* `enter({instant:true})` drains the whole step generator itself — the chunking
   exists so the WebGL2 dive can animate over it, and there is no dive here. */
await CITY.enter({ instant: true });
say('built in ' + Math.round(performance.now() - t0) + ' ms');

/* ---- the four ShaderMaterials -----------------------------------------
   The district owns exactly four raw `ShaderMaterial`s: the sky dome, the
   ground mist, the water and the pool. WebGPURenderer cannot compile a raw
   GLSL ShaderMaterial — it builds its programs from a node graph — so each one
   has to become a node material or the frame dies on it.

   Substituted here rather than in `district.js` for the same reason the rest is
   stubbed: the WebGL2 build's versions are correct and shipping, and this is
   the renderer that cannot take them. The water and pool get a proper TSL port
   next; these are honest stand-ins and they are labelled as such in the HUD so
   a side-by-side is never read as if they were finished. */
let swapped = 0;
cityScene3.traverse((o) => {
  if (!o.isMesh || !o.material || !o.material.isShaderMaterial) return;
  const old = o.material;
  const nm = new THREE.MeshStandardNodeMaterial({
    color: new THREE.Color(0x1b6a72), roughness: 0.18, metalness: 0.0,
    side: old.side, transparent: old.transparent, depthWrite: old.depthWrite,
  });
  o.material = nm;
  swapped++;
});
if (swapped) say('substituted ' + swapped + ' ShaderMaterial(s) — stand-ins, not ports');

/* The district's own sun, not a new one. Its rig — sun, cool counter-fill,
   warm up-bounce, hemisphere — is measured against the SDC renders and is most
   of why the district reads the way it does; adding a second directional light
   beside it would flatten every shadow the rig exists to place. Only the
   shadow is replaced, and only on the backend that can take cascades. */
let citySunLight = null;
CITY.scene.traverse((o) => {
  if (o.isDirectionalLight && o.castShadow && !citySunLight) citySunLight = o;
});
const csm = citySunLight
  ? await attachCSM(citySunLight, cam, { webgpu: IS_GPU, cascades: 3, maxFar: 340 })
  : null;
const lit = { csm, update: () => { if (csm) csm.updateFrustums(); } };
say('sun: ' + (csm
  ? '3-cascade CSM on the district rig'
  : "the district's own fitted shadow camera (WebGL2 path)"));

let post = null, setTime = null;
if (flag('post')) {
  const built = buildPost(renderer, cityScene3, cam, {
    ao: flag('ao'),
    ssgi: _q.get('ssgi') === null ? undefined : _q.get('ssgi') === '1',
    traa: flag('traa'), bloom: flag('bloom'), webgpu: IS_GPU,
  });
  post = built.post; setTime = built.setTime;
  setTime(parseFloat(_q.get('tod') || '19'));
  say('post: ' + Object.keys(built.nodes).join(' → '));
}

/* THE BOOKMARKS, copied from `SHOTS` in src/main.js — same ids, same poses.
   Not approximated: the whole judgement criterion is a side-by-side against
   these exact frames, and a camera two metres off makes a rendering comparison
   into a composition comparison. Shot 1 is the map poster, which this renderer
   does not carry; 2 through 6 are the district. */
const SHOTS = [
  { id: 2, name: 'canopy hero',       pos: [21, 5.4, -44],    yaw: 4,   pitch: 7.5, mode: 'fly' },
  { id: 3, name: 'souq eye-level',    pos: [4, 1.68, 178],    yaw: 0,   pitch: 3,   mode: 'walk' },
  { id: 4, name: 'majlis terrace',    pos: [150, 14.3, 235],  yaw: 28,  pitch: -1,  mode: 'walk' },
  { id: 5, name: 'courtyard pool',    pos: [-224, 1.68, 198], yaw: -14, pitch: 5,   mode: 'walk' },
  { id: 6, name: 'aerial masterplan', pos: [258, 168, -228],  yaw: -44, pitch: -25, mode: 'fly' },
];
const shotId = QA.shot || ({ canopy: 2, souq: 3, majlis: 4, court: 5, aerial: 6 }[QA.view]) || 2;
const shot = SHOTS.find(x => x.id === shotId) || SHOTS[0];
await CITY.goShot(shot, true);
say('shot ' + shot.id + ': ' + shot.name);

/* No `aFlow` fix-up any more, and its removal is the point: adding a
   zero-filled attribute to each water geometry was the only thing this build
   did to that geometry that the shipping build does not, and the souq rendered
   as a canal because of it. The district never authors flow that survives the
   merge — see the note in src/gpu/water.js — so the material reads a constant
   and the geometry is left exactly as the generator produced it. */

/* ?nowater=1 hides every water body. One flag, and it separates "the water is
   wrong" from "something else is teal" — which is not the same question and
   was about to cost a third guess. */
if (_q.get('nowater') === '1') {
  let hid = 0;
  CITY.scene.traverse((o) => {
    const u = o.isMesh && o.material && o.material.userData && o.material.userData.u;
    if (u && u.uReflOn) { o.visible = false; hid++; }
  });
  say('hid ' + hid + ' water body(ies)');
}

const READY_AT = Math.max(1, +(_q.get('frames') || 14));
const REFL_ALWAYS = _q.get('refl') === '1';
let f = 0;
renderer.setAnimationLoop(() => {
  const dt = Math.min(0.05, clock.getDelta());
  const t = clock.elapsedTime;
  /* The district's own frame: practicals recycled onto the nearest lantern,
     the life system, the water and sky clocks, the shadow refit, the focus
     probe. Running the port without this leaves a district that is correct and
     completely still, which is not what any of the four renders show. */
  CITY.update(dt, t);
  for (const m of GPU_MATS) m.userData.u.uTime.value = t;
  lit.update();
  /* The planar reflection, run before the post stack's own scene pass so the
     water samples this frame's mirror rather than last frame's. The district's
     `renderReflection` is renderer-agnostic — a mirrored camera, Lengyel's
     oblique near plane folded into the projection so the near plane IS the
     water surface, and a half-resolution target — and every call it makes
     (getRenderTarget / setRenderTarget / clear / render / shadowMap
     .autoUpdate) exists on WebGPURenderer. `WebGLRenderTarget` is re-exported
     by three.webgpu.js and extends RenderTarget, so even the target class
     carries over. Nothing to port; only to call.

     Once, on the first frame, unless `?refl=1`. A frame here is already three
     full passes over 87 M triangles — the eye pass, the shadow refit and this —
     and a software rasteriser does not survive that repeated. On a moving
     camera the mirror must be re-rendered every frame and `?refl=1` does that,
     which is what real hardware runs; on the fixed camera of a still gate the
     mirror is identical every frame, so rendering it once is not an
     approximation, it is the same image for a third of the cost. */
  if (!QA.norefl && (REFL_ALWAYS || f === 0)) CITY.reflect();
  if (post) post.render(); else renderer.render(cityScene3, cam);
  window.__frames++;
  if (++f === READY_AT) window.__ready = true;
});

/* Water diagnostics, because the souq read as a canal and the arithmetic said
   the flow attribute had to be the cause — and a guess at that costs a ten
   minute render here, where a fact costs nothing. */
window.__water = () => {
  const out = [];
  CITY.scene.traverse((o) => {
    if (!o.isMesh || !o.material || !o.material.userData || !o.material.userData.u) return;
    const u = o.material.userData.u;
    if (!u.uReflOn) return;
    const a = o.geometry.getAttribute('aFlow');
    o.geometry.computeBoundingBox();
    const bb = o.geometry.boundingBox;
    out.push({
      name: o.name || '?', visible: o.visible, renderOrder: o.renderOrder,
      aFlow: a ? { n: a.count, min: +Math.min(...a.array).toFixed(3), max: +Math.max(...a.array).toFixed(3) } : null,
      y: +((bb.min.y + bb.max.y) / 2).toFixed(2),
      span: [+(bb.max.x - bb.min.x).toFixed(1), +(bb.max.z - bb.min.z).toFixed(1)],
      cx: +((bb.min.x + bb.max.x) / 2).toFixed(1), cz: +((bb.min.z + bb.max.z) / 2).toFixed(1),
      reflOn: u.uReflOn.value, depthWrite: o.material.depthWrite,
      transparent: o.material.transparent,
      /* Does this mesh have geometry AT the souq, or does its bounding box
         merely reach there? The merged channel spans 390 x 644 m and the souq
         sits inside that box, which is not the same as water being there — and
         the shipping build, measured the same way, has no vertices there at
         all while this build draws a water surface across the street. */
      nearSouq: (() => {
        const pos = o.geometry.getAttribute('position');
        let n = 0, ylo = 1e9, yhi = -1e9;
        for (let i = 0; i < pos.count; i++) {
          const x = pos.getX(i), z = pos.getZ(i);
          if (Math.abs(x - 4) < 10 && Math.abs(z - 178) < 40) {
            n++; const y = pos.getY(i); if (y < ylo) ylo = y; if (y > yhi) yhi = y;
          }
        }
        return n ? { verts: n, y: [+ylo.toFixed(3), +yhi.toFixed(3)] } : null;
      })(),
      verts: o.geometry.getAttribute('position').count,
      indexed: !!o.geometry.index,
    });
  });
  return out;
};

window.__stats = () => ({
  backend: IS_GPU ? 'webgpu' : 'webgl2',
  /* how many shader programs the backend built. The number is the check on the
     fog/environment ordering above: attach either late and this roughly
     doubles. Reported rather than asserted because the backend's own shape
     differs between the WebGPU and WebGL2 paths. */
  programs: (() => {
    try {
      const b = renderer.backend;
      if (b && b.programs) return b.programs.size !== undefined ? b.programs.size : b.programs.length;
      if (renderer.info && renderer.info.programs) return renderer.info.programs.length;
      const nb = renderer._nodes && renderer._nodes.nodeBuilderCache;
      if (nb && nb.size !== undefined) return nb.size;
    } catch (e) { /* not fatal, it is a diagnostic */ }
    return null;
  })(),
  calls: renderer.info.render.drawCalls,
  tris: renderer.info.render.triangles,
  csm: !!lit.csm,
  built: CITY.built,
  shaderMaterialsSwapped: swapped,
});
say('rendering');
