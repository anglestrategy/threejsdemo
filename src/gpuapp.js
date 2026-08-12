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
import { makeModelMaterial as gpuModelMaterial } from './gpu/modelmat.js';
import { buildSun } from './gpu/lighting.js';
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
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.0;
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
    });
    if (cacheKey === 'room') m.side = THREE.DoubleSide;
    GPU_MATS.push(m);
    return m;
  },
  model: (src, foliage) => { const m = gpuModelMaterial(src, foliage); GPU_MATS.push(m); return m; },
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
const grade = { uniforms: { uCity: { value: 1 } } };
const markIdle = () => {};
let dimTarget = 0;
let sceneState = 'map';
const scene = new THREE.Scene();      // the map scene the district restores to

/*@DISTRICT@*/

/* ------------------------------------------------------------------- drive */
const cityScene3 = CITY.scene;
const cam = CITY.cam;
cityScene3.fogNode = cityFogNode();

say('building the district…');
const t0 = performance.now();
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

const lit = await buildSun(cityScene3, cam, {
  webgpu: IS_GPU, cascades: 3, maxFar: 340, mapSize: 2048,
});
say('sun: ' + (lit.csm ? '3-cascade CSM' : 'single shadow camera (WebGL2 path)'));

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

/* the six bookmarks, in the district's own frame: metres, origin at the centre
   of the canopy plaza, +Z north */
const VIEWS = {
  plaza:  [[6, 1.68, -46], [0, 6, 40]],
  souq:   [[4, 1.68, 150], [4, 3.2, 300]],
  court:  [[-224, 1.68, 200], [-224, 3.0, 270]],
  arcade: [[-96, 1.68, 30], [-40, 3.6, 60]],
  water:  [[-34, 1.68, 90], [-34, 2.4, 210]],
  aerial: [[210, 190, -240], [-20, 8, 150]],
};
const v = VIEWS[QA.view] || VIEWS.plaza;
say('view: ' + QA.view);

const READY_AT = Math.max(1, +(_q.get('frames') || 14));
let f = 0;
renderer.setAnimationLoop(() => {
  const t = clock.getElapsedTime();
  // the clock the wind and the practicals run on, exactly as the WebGL2 build
  for (const m of GPU_MATS) m.userData.u.uTime.value = t;
  cam.position.set(...v[0]);
  cam.lookAt(...v[1]);
  cam.updateMatrixWorld(true);
  lit.update();
  if (post) post.render(); else renderer.render(cityScene3, cam);
  window.__frames++;
  if (++f === READY_AT) window.__ready = true;
});

window.__stats = () => ({
  backend: IS_GPU ? 'webgpu' : 'webgl2',
  calls: renderer.info.render.drawCalls,
  tris: renderer.info.render.triangles,
  csm: !!lit.csm,
  built: CITY.built,
  shaderMaterialsSwapped: swapped,
});
say('rendering');
