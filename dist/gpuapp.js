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
/*@SHARED_HELPERS_BEGIN@*/
/* ------------------------------------------------------- simplex noise (2D) */
const NoiseGen = (function () {
  const r = mulberry32(SEED ^ 0x9e3779b9);
  const perm = new Uint8Array(512), p = new Uint8Array(256);
  for (let i = 0; i < 256; i++) p[i] = i;
  for (let i = 255; i > 0; i--) { const j = (r() * (i + 1)) | 0; const t = p[i]; p[i] = p[j]; p[j] = t; }
  for (let i = 0; i < 512; i++) perm[i] = p[i & 255];
  const grad = [[1,1],[-1,1],[1,-1],[-1,-1],[1,0],[-1,0],[0,1],[0,-1]];
  const F2 = 0.5 * (Math.sqrt(3) - 1), G2 = (3 - Math.sqrt(3)) / 6;
  function noise(xin, yin) {
    const s = (xin + yin) * F2;
    let i = Math.floor(xin + s), j = Math.floor(yin + s);
    const t = (i + j) * G2;
    const X0 = i - t, Y0 = j - t;
    const x0 = xin - X0, y0 = yin - Y0;
    let i1, j1;
    if (x0 > y0) { i1 = 1; j1 = 0; } else { i1 = 0; j1 = 1; }
    const x1 = x0 - i1 + G2, y1 = y0 - j1 + G2;
    const x2 = x0 - 1 + 2 * G2, y2 = y0 - 1 + 2 * G2;
    i &= 255; j &= 255;
    let n = 0;
    let t0 = 0.5 - x0 * x0 - y0 * y0;
    if (t0 > 0) { const g = grad[perm[i + perm[j]] & 7]; t0 *= t0; n += t0 * t0 * (g[0] * x0 + g[1] * y0); }
    let t1 = 0.5 - x1 * x1 - y1 * y1;
    if (t1 > 0) { const g = grad[perm[i + i1 + perm[j + j1]] & 7]; t1 *= t1; n += t1 * t1 * (g[0] * x1 + g[1] * y1); }
    let t2 = 0.5 - x2 * x2 - y2 * y2;
    if (t2 > 0) { const g = grad[perm[i + 1 + perm[j + 1]] & 7]; t2 *= t2; n += t2 * t2 * (g[0] * x2 + g[1] * y2); }
    return 70 * n;
  }
  return noise;
})();
const nz = NoiseGen;
function fbm(x, y, oct, gain = 0.5, lac = 2.02) {
  let a = 1, f = 1, s = 0, na = 0;
  for (let i = 0; i < oct; i++) { s += a * nz(x * f, y * f); na += a; a *= gain; f *= lac; }
  return s / na;
}
function ridged(x, y, oct) {
  let a = 1, f = 1, s = 0, na = 0;
  for (let i = 0; i < oct; i++) { s += a * (1 - Math.abs(nz(x * f, y * f))); na += a; a *= 0.5; f *= 2.03; }
  return s / na;
}
const clamp = (v, a, b) => v < a ? a : v > b ? b : v;
function sstep(a, b, x) { const t = clamp((x - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); }
const mix = (a, b, t) => a + (b - a) * t;

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

/* ==========================================================================
   16.  DOWNTOWN AL KHOBAR
   A complete district you fly and walk. Built lazily on first entry, lives in
   its own scene so the map is never paying for it, and torn back down to the
   map with the whole map state intact.

   Local frame: metres, origin at the centre of the canopy plaza, +Z north,
   +X east. The sun is low in the west-south-west, the hour is gold-into-blue.
   ========================================================================== */
const CITY = await (async function buildDowntownModule() {

/* ------------------------------------------------------------------ seeds */
const DRNG = mulberry32(SEED ^ 0x5d0c17);
const rnd = () => DRNG();
const rr = (a, b) => a + (b - a) * DRNG();
const ri = (a, b) => Math.floor(a + (b - a + 1) * DRNG());
const pick = (arr) => arr[Math.floor(DRNG() * arr.length) % arr.length];
const chance = (p) => DRNG() < p;

/* --------------------------------------------------------------- palette */
const K = {
  sand:      0xa89678, sandDk:   0x7b6b53, sandLt:  0xc6b596,
  travert:   0xc4b79e, travDk:   0x9d9179,
  brick:     0x9d7150, brickDk:  0x7a5c44, brickLt: 0xb8977a,
  timber:    0x71482a, timberDk: 0x462c17, timberLt: 0x8f6234,
  plaster:   0xcdbfa2, plasterDk: 0xa89878,
  white:     0xe6e1d4, whiteDk:  0xc3bdae,
  leaf:      0x40603a, leafDk:   0x2c4527, leafLt: 0x678c4a,
  palm:      0x3f5a2c, trunk:    0x6b5a42,
  water:     0x1b6a72, waterDk:  0x0d3f4a,
  gold:      0xc9962f, goldLt:   0xe6bf5c, goldDk: 0x8f6a20,
  charcoal:  0x3b3730, steelDk:  0x2c2f33,
  neon:      0xff9ec4, lamp:     0xffcf8e, lampCool: 0xcfe0ff,
  sadu:      0x9d2b2b, saduDk:   0x2a1d1a,
};

/* surface laws — the fragment shader picks a meso/micro band per class */
const S = {
  ASHLAR: 0, RENDER: 1, BRICK: 2, TIMBER: 3, TRAVERTINE: 4,
  CONCRETE: 5, METAL: 6, PAVING: 7, SAND: 8, ASPHALT: 9, FABRIC: 10, FOLIAGE: 11,
};

/* --------------------------------------------------- geometry accumulator *
   No BufferGeometryUtils in the embedded addon set, so everything merges by
   hand. Each pushed part carries a surface class and a baked shade so one
   draw call can hold a whole quarter of the city.                          */
function Acc() {
  this.pos = []; this.nrm = []; this.uv = []; this.col = []; this.srf = [];
  this.idx = []; this.n = 0;
  /* CUSTOM ATTRIBUTES TRAVEL WITH THE GEOMETRY.
     They did not, and the bug that came of it took a long time to find and was
     invisible the whole way: every water mesh in the district built an `aFlow`
     attribute, every water mesh went through this accumulator, and this
     accumulator copied position, normal, uv, colour and aSurf and dropped
     everything else on the floor. So `aFlow` reached the shader as 0 on all
     four bodies, the flow term was multiplied by it, and the district has had
     dead still water everywhere since the day the channel was written.

     Nothing pointed at it. The water animated (the time-varying terms are not
     gated on flow), it just animated as a stagnant tank would, and "the water
     does not look like water" is not a sentence that leads you to a missing
     attribute copy. Auto-forwarding anything the source geometry carries is
     the fix that cannot rot: a call site that adds an attribute gets it, with
     no second place to remember. */
  this.ext = {};
}
const ACC_BUILTIN = { position: 1, normal: 1, uv: 1, color: 1, aSurf: 1 };
const _m3 = new THREE.Matrix3();
const _v3 = new THREE.Vector3();
const _c3 = new THREE.Color();

Acc.prototype.add = function (geo, mtx, colour, surf, shade) {
  const p = geo.attributes.position, nAttr = geo.attributes.normal, uvA = geo.attributes.uv;
  const base = this.n, cnt = p.count;
  _m3.getNormalMatrix(mtx);
  _c3.set(colour);
  const sh = shade === undefined ? 1 : shade;
  const r = _c3.r * sh, g = _c3.g * sh, b = _c3.b * sh;
  for (let i = 0; i < cnt; i++) {
    _v3.fromBufferAttribute(p, i).applyMatrix4(mtx);
    this.pos.push(_v3.x, _v3.y, _v3.z);
    if (nAttr) { _v3.fromBufferAttribute(nAttr, i).applyMatrix3(_m3).normalize(); this.nrm.push(_v3.x, _v3.y, _v3.z); }
    else this.nrm.push(0, 1, 0);
    if (uvA) this.uv.push(uvA.getX(i), uvA.getY(i)); else this.uv.push(0, 0);
    this.col.push(r, g, b);
    this.srf.push(surf);
  }
  this._ext(geo.attributes, base, cnt);
  const gi = geo.index;
  if (gi) { for (let i = 0; i < gi.count; i++) this.idx.push(base + gi.getX(i)); }
  else { for (let i = 0; i < cnt; i++) this.idx.push(base + i); }
  this.n += cnt;
  return this;
};

/* copy every non-builtin attribute across, back-filling zeros for the runs
   added before it first appeared and for the runs that do not carry it */
Acc.prototype._ext = function (attrs, base, cnt) {
  for (const nm in attrs) {
    if (ACC_BUILTIN[nm] || this.ext[nm]) continue;
    const a = attrs[nm];
    this.ext[nm] = { size: a.itemSize, data: new Array(base * a.itemSize).fill(0) };
  }
  for (const nm in this.ext) {
    const e = this.ext[nm];
    const a = attrs && attrs[nm];
    if (!a) { for (let k = 0; k < cnt * e.size; k++) e.data.push(0); continue; }
    for (let i = 0; i < cnt; i++) {
      for (let c = 0; c < e.size; c++) {
        e.data.push(c < a.itemSize ? a.array[i * a.itemSize + c] : 0);
      }
    }
  }
};

/* push raw triangles with explicit per-vertex shade — used by the hand-built
   pieces (canopy facets, tensile sails, catenaries) */
Acc.prototype.tri = function (a, b, c, colour, surf, shade) {
  const nx = (b.y - a.y) * (c.z - a.z) - (b.z - a.z) * (c.y - a.y);
  const ny = (b.z - a.z) * (c.x - a.x) - (b.x - a.x) * (c.z - a.z);
  const nz = (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);
  const l = Math.hypot(nx, ny, nz) || 1;
  _c3.set(colour);
  const sh = shade === undefined ? 1 : shade;
  const base = this.n;
  for (const v of [a, b, c]) {
    this.pos.push(v.x, v.y, v.z);
    this.nrm.push(nx / l, ny / l, nz / l);
    this.uv.push(0, 0);
    this.col.push(_c3.r * sh, _c3.g * sh, _c3.b * sh);
    this.srf.push(surf);
  }
  this._ext(null, base, 3);
  this.idx.push(base, base + 1, base + 2);
  this.n += 3;
  return this;
};
Acc.prototype.quad = function (a, b, c, d, colour, surf, shade) {
  this.tri(a, b, c, colour, surf, shade); this.tri(a, c, d, colour, surf, shade); return this;
};
Acc.prototype.geometry = function () {
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(this.pos, 3));
  g.setAttribute('normal', new THREE.Float32BufferAttribute(this.nrm, 3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute(this.uv, 2));
  g.setAttribute('color', new THREE.Float32BufferAttribute(this.col, 3));
  g.setAttribute('aSurf', new THREE.Float32BufferAttribute(this.srf, 1));
  for (const nm in this.ext) {
    const e = this.ext[nm];
    g.setAttribute(nm, new THREE.Float32BufferAttribute(e.data, e.size));
  }
  g.setIndex(this.idx.length > 65535 ? new THREE.Uint32BufferAttribute(this.idx, 1)
    : new THREE.Uint16BufferAttribute(this.idx, 1));
  g.computeBoundingSphere();
  return g;
};
Acc.prototype.tris = function () { return this.idx.length / 3; };

/* ------------------------------------------------------- matrix shorthand */
const M = new THREE.Matrix4();
const Q = new THREE.Quaternion();
const E = new THREE.Euler();
const V = new THREE.Vector3();
const V2 = new THREE.Vector3();
function xf(x, y, z, ry, sx, sy, sz) {
  E.set(0, ry || 0, 0);
  return new THREE.Matrix4().compose(V.set(x, y, z), Q.setFromEuler(E),
    V2.set(sx === undefined ? 1 : sx, sy === undefined ? 1 : sy, sz === undefined ? 1 : sz));
}
function xf3(x, y, z, rx, ry, rz, sx, sy, sz) {
  E.set(rx || 0, ry || 0, rz || 0);
  return new THREE.Matrix4().compose(V.set(x, y, z), Q.setFromEuler(E),
    V2.set(sx === undefined ? 1 : sx, sy === undefined ? 1 : sy, sz === undefined ? 1 : sz));
}
/* unit primitives, reused for every merge */
const G_BOX = new THREE.BoxGeometry(1, 1, 1);
const G_BOXT = (function () { const g = new THREE.BoxGeometry(1, 1, 1); g.translate(0, 0.5, 0); return g; })();
const G_CYL = new THREE.CylinderGeometry(0.5, 0.5, 1, 12, 1);
const G_CYLT = (function () { const g = new THREE.CylinderGeometry(0.5, 0.5, 1, 12, 1); g.translate(0, 0.5, 0); return g; })();
const G_CYL6 = (function () { const g = new THREE.CylinderGeometry(0.5, 0.5, 1, 6, 1); g.translate(0, 0.5, 0); return g; })();
const G_PLANE = (function () { const g = new THREE.PlaneGeometry(1, 1); g.rotateX(-Math.PI / 2); return g; })();
const G_SPH = new THREE.SphereGeometry(0.5, 8, 5);
/* the roof planting is four thousand instances of scenery seen from an aerial
   shot and never from closer. At 64 triangles a blob it was the single largest
   triangle bill in the district — larger than every tree put together. */
const G_SPHL = new THREE.SphereGeometry(0.5, 5, 3);
// a unit plane standing up in XY, facing -Z, for alpha-cutout panels
const G_PANEL = (function () { const g = new THREE.PlaneGeometry(1, 1); g.rotateY(Math.PI); return g; })();
const G_CONE = (function () { const g = new THREE.ConeGeometry(0.5, 1, 10); g.translate(0, 0.5, 0); return g; })();

/* A chamfered box, built at its real size.

   This is most of what reads as "low poly" in a scene like this. Nothing here
   is actually low poly — the district submits eight million triangles — but
   every mass met the next one at a hard ninety-degree edge, and a hard edge
   catches no highlight. Real stonework has an arris: two or three centimetres
   of cut that picks up the sky along every corner and separates one plane from
   the next. Without it a building is a shape; with it, it is a solid.

   The chamfer has to be in world units, so the geometry is built per box
   rather than scaled from a unit cube — which is free here, because every one
   of these is merged into a chunk immediately afterwards. Forty-four triangles
   against twelve, on the masses that carry the district's silhouette. */
const _cbCache = new Map();
function chamferBox(w, h, d, c) {
  c = Math.min(c, w * 0.4, h * 0.4, d * 0.4);
  const key = w.toFixed(2) + '_' + h.toFixed(2) + '_' + d.toFixed(2) + '_' + c.toFixed(3);
  const hit = _cbCache.get(key);
  if (hit) return hit;
  const hw = w / 2, hd = d / 2;
  const P = [], N = [], I = [];
  const push = (x, y, z, nx, ny, nz) => { P.push(x, y, z); N.push(nx, ny, nz); return P.length / 3 - 1; };
  const quad = (a, b, c2, d2) => { I.push(a, b, c2, a, c2, d2); };
  // the four side faces, each inset by the chamfer at both ends
  const sides = [
    [0, 0, -1, [-hw + c, hw - c], -hd],
    [1, 0, 0, [-hd + c, hd - c], hw],
    [0, 0, 1, [hw - c, -hw + c], hd],
    [-1, 0, 0, [hd - c, -hd + c], hw],
  ];
  const ring = (y, inset) => {
    // one ring of eight points around the box at height y, corners cut
    const a = hw - inset, b = hd - inset;
    return [
      [-a + c, y, -b], [a - c, y, -b], [a, y, -b + c], [a, y, b - c],
      [a - c, y, b], [-a + c, y, b], [-a, y, b - c], [-a, y, -b + c],
    ];
  };
  const rings = [ring(c, c), ring(c, 0), ring(h - c, 0), ring(h - c, c)];
  const idx = rings.map((r) => r.map((p2) => push(p2[0], p2[1], p2[2], 0, 0, 0)));
  for (let lvl = 0; lvl < 3; lvl++) {
    for (let i = 0; i < 8; i++) {
      const j = (i + 1) % 8;
      quad(idx[lvl][i], idx[lvl][j], idx[lvl + 1][j], idx[lvl + 1][i]);
    }
  }
  // caps
  const top = idx[3], bot = idx[0];
  for (let i = 1; i < 7; i++) { I.push(top[0], top[i], top[i + 1]); }
  for (let i = 1; i < 7; i++) { I.push(bot[0], bot[i + 1], bot[i]); }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(P, 3));
  g.setIndex(I);
  g.computeVertexNormals();
  g.setAttribute('uv', new THREE.Float32BufferAttribute(new Float32Array((P.length / 3) * 2), 2));
  if (_cbCache.size < 4000) _cbCache.set(key, g);
  return g;
}

/* add a chamfered mass to an accumulator, in place of a scaled unit box */
function addMass(acc, x, y, z, ry, w, h, d, col, surf, shade, cham) {
  acc.add(chamferBox(w, h, d, cham === undefined ? 0.055 : cham),
    xf(x, y, z, ry, 1, 1, 1), col, surf, shade);
}

// tapered box (battered walls, watchtowers): top scale relative to bottom
function taper(topScale, h) {
  const g = new THREE.BoxGeometry(1, 1, 1, 1, 1, 1);
  const p = g.attributes.position;
  for (let i = 0; i < p.count; i++) {
    const y = p.getY(i);
    if (y > 0) { p.setX(i, p.getX(i) * topScale); p.setZ(i, p.getZ(i) * topScale); }
  }
  g.translate(0, 0.5, 0);
  g.computeVertexNormals();
  return g;
}

/* ------------------------------------------------------- detail textures *
   CC0 photographic detail from Poly Haven (polyhaven.com) — `clay_plaster`
   and `dark_wooden_planks`, both CC0 / public domain, no attribution
   required and none of it is anyone's trademark. Packed to 512: a weathered plaster
   for every mineral surface and a plank set for timber, each as a diffuse and
   a second map carrying the normal in RG and roughness in B. Four samplers.

   These do not replace the procedural surface law — that still owns the meso
   band, because coursing has to line up with the architecture that generated
   it. They carry the band below it: pores, hairline cracks, staining, grain.
   That band is the one thing noise cannot fake, and its absence is most of
   what reads as "computer graphics" at two metres.                        */
const TEXPACK = await (await fetch('assets/textures.json')).json();
const TEX = {};
(function loadDetail() {
  const ld = new THREE.TextureLoader();
  for (const k in TEXPACK) {
    const d = ld.load(TEXPACK[k].diff);
    d.wrapS = d.wrapT = THREE.RepeatWrapping;
    d.colorSpace = THREE.SRGBColorSpace;
    d.anisotropy = MAX_ANISO_();
    const n = ld.load(TEXPACK[k].nrm);
    n.wrapS = n.wrapT = THREE.RepeatWrapping;
    n.anisotropy = MAX_ANISO_();
    TEX[k] = { diff: d, nrm: n, mean: TEXPACK[k].mean };
  }
})();

/* ================================================ PHOTOGRAMMETRY KIT ==
   Four CC0 scans from Poly Haven, reduced offline by `gen_models.py` and
   carried inline as GLB. Nothing procedural gets a tree right: bark is not a
   noise function and a canopy is not a set of tilted planes, and at three
   metres the difference is the whole illusion.

   Each asset ships one or two levels of detail as separate meshes in the same
   GLB, sharing the same textures. Which one an instance gets is decided when
   the district is built, from its distance to the nearest composed viewpoint,
   so nothing ever pops.                                                    */
/* every material that wants the irradiance field registers here, so the bake
   binds one set of textures to all of them */
/* Anisotropic filtering, asked of the renderer rather than typed.

   This was a hard 8 in five places. 16 is the usual hardware maximum and the
   difference lands exactly where this district is weakest: a paving or asphalt
   texture seen down a 200 m street is compressed far harder along the view than
   across it, and an isotropic sample of it is the mush that reads as "low
   quality" before anything else does.

   `getMaxAnisotropy()` is the honest source — a typed 16 is a guess about
   hardware, and on a device that caps at 4 three silently clamps it anyway. The
   fallback covers the WebGPU path, where the query does not exist.

   NOTE, because it is the more important half: the surfaces that shimmer worst
   in this scene — paving, asphalt, travertine, brick — are NOT textures. They
   are the procedural law evaluated per pixel, so there is nothing for any
   filter to filter. That half is fixed by band-limiting the law analytically;
   see the note above SURF_GLSL.

   A LAZY getter, not a const. It was a const, and the const sat below
   `loadDetail`, which reads it — so the module threw
   `Cannot access 'MAX_ANISO' before initialization` on every load and the
   district never built. A temporal-dead-zone error reads like a missing
   import and is neither; the fix is to stop caring about declaration order,
   not to shuffle the file. */
/* `var`, deliberately. `let` and `const` both have a temporal dead zone, and
   this module's own top-level code calls loadDetail() -> MAX_ANISO_() from
   ABOVE this line, so either of them throws "Cannot access before
   initialization" and the district never builds. `var` hoists as undefined,
   which the falsy check below already handles. Two full render cycles were
   spent proving this twice. */
var _maxAniso = 0;
function MAX_ANISO_() {
  if (_maxAniso) return _maxAniso;
  _maxAniso = 16;
  try {
    const c = renderer.capabilities;
    if (c && typeof c.getMaxAnisotropy === 'function') {
      _maxAniso = Math.max(1, Math.min(16, c.getMaxAnisotropy()));
    }
  } catch (e) { /* WebGPU path has no capabilities object */ }
  return _maxAniso;
}

const PROBE_MATS = [];
/* Panels generated from the renders and baked to alpha-cutout imposters by
   `gen_imposter.py`. A mashrabiya is 22,000 triangles of real lattice and this
   district wants two hundred and sixty of them — but it is a flat thing, and
   from more than a couple of metres a quad carrying its own colour with its own
   holes punched out of the alpha is the same picture for two triangles. */
const PANELPACK = await (await fetch('assets/panels.json')).json();
const PANELS = {};
{
  const ld = new THREE.TextureLoader();
  for (const k in PANELPACK) {
    const t = ld.load(PANELPACK[k].tex);
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = MAX_ANISO_();
    t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping;
    PANELS[k] = Object.assign({}, PANELPACK[k], { map: t });
  }
}
/* ================================================ THE GENERATED PROPS ==
   Assets generated from the project's own renders, reduced by `gen_props.py`
   and served as real files. They arrive as one mesh with one PBR material and
   a bounding box normalised to 1.9 m, so every one of them is given its true
   size here — a bicycle is 1.8 m long, a bin is 0.9 m tall, a mosque is not
   1.9 m of anything.

   They are fetched in parallel and the district does not wait on them: if one
   is slow or missing the kit falls back to what it had, because a demo that
   will not start because a bench is late is worse than a demo without that
   bench. */
const PROPS = {};
const PROP_URL = 'assets/props.json';
async function loadProps() {
  let index = null;
  try {
    const r = await fetch(PROP_URL);
    if (!r.ok) return;
    index = await r.json();
  } catch (e) { return; }
  const gl = new GLTFLoader().setMeshoptDecoder(MeshoptDecoder);
  await Promise.all(Object.keys(index).map(async (key) => {
    try {
      const g = await gl.loadAsync(index[key].file);
      const parts = [];
      /* Bake the node transform into the geometry. Meshopt's high level
         applies KHR_mesh_quantization, which leaves POSITION as integers and
         moves the real scale into the node's TRS — so a router that takes
         `o.geometry` and drops `o.matrixWorld` gets a tram sixty-five
         thousand units wide. It is also simply correct for any authored
         asset whose parts are not at the origin. */
      g.scene.updateMatrixWorld(true);
      g.scene.traverse((o) => {
        if (!o.isMesh) return;
        const geo = o.geometry.clone();
        geo.applyMatrix4(o.matrixWorld);
        /* the useful name is the parent's: a glTF converted out of Blender
           names its meshes Object_N and puts FLOOR / WALL / ROOF on the node
           above, which is the only way to tell a room's shell from what is
           standing in it */
        parts.push({ geo, src: o.material,
          name: ((o.parent && o.parent.name) || o.name || ''),
          mat: (o.material && o.material.name) || '' });
      });
      if (!parts.length) return;
      const rec = Object.assign({ parts }, index[key]);
      /* The far level, wherever the intake produced one. This was switched off
         when the plan halved, on the reasoning that every point was inside
         LOD_FULL of a viewpoint so the far level would never be selected.
         That reasoning was correct about the build-time selector and wrong
         about the cost: with no far level the district drew 275 M triangles
         from the air and 108 M standing in the plaza. Level of detail is a
         runtime decision — see lodUpdate — so the geometry has to be here. */
      if (index[key].lod1) {
        try {
          const g1 = await gl.loadAsync(index[key].lod1.file);
          const p1 = [];
          g1.scene.updateMatrixWorld(true);
          g1.scene.traverse((o) => {
            if (!o.isMesh) return;
            const geo = o.geometry.clone();
            geo.applyMatrix4(o.matrixWorld);
            p1.push({ geo, src: o.material });
          });
          if (p1.length) rec.parts1 = p1;
        } catch (e) { console.warn('prop lod1 ' + key + ' failed', e); }
      }
      PROPS[key] = rec;
    } catch (e) { console.warn('prop ' + key + ' failed', e); }
  }));
  INSTCOUNT.props = Object.keys(PROPS).length;
  /* The rigged crowd, loaded in the same async phase and NOT through the prop
     index: these keep their skeletons and go nowhere near the reducer. The
     dressing pass runs after this resolves, so RIGGED is populated by the time
     buildLife() reaches for it. */
  try {
    await loadRiggedPeople(1.72);
    INSTCOUNT.rigged_kinds = RIGGED.length;
  } catch (e) { console.warn('rigged people failed', e); }
}

const MODELPACK = await (await fetch('assets/models.json')).json();
const MODELS = {};
{
  const gl = new GLTFLoader().setMeshoptDecoder(MeshoptDecoder);
  for (const key in MODELPACK) {
    const rec = MODELPACK[key];
    const bin = atob(rec.glb);
    const u8 = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) u8[i] = bin.charCodeAt(i);
    let gltf = null;
    try {
      gltf = await gl.parseAsync(u8.buffer, '');
    } catch (e) { console.warn('model ' + key + ' failed', e); continue; }
    const lods = [];
    for (const node of gltf.scene.children) {
      if (!/^LOD/.test(node.name)) continue;
      const parts = [];
      node.traverse((o) => { if (o.isMesh) parts.push({ geo: o.geometry, src: o.material }); });
      lods[+node.name.slice(3)] = parts;
    }
    MODELS[key] = {
      lods: lods.filter(Boolean), height: rec.height, base: rec.base,
      radius: rec.radius, credit: rec.credit,
    };
  }
}

/* The props are files on the wire, so the fetch starts here and is collected
   at the bottom of this module — everything between is decode and setup that
   would otherwise be waiting on the network for no reason. */
let PROPS_DONE = false;
const PROPS_READY = loadProps().then(() => { PROPS_DONE = true; });

/* ================================================= IRRADIANCE PROBES ==
   The difference between "lit by three lights" and "rendered" is that in a
   real place the ambient light is not a constant — it is a field. Under an
   arcade it is dim and warm; in the middle of the plaza it is bright and
   blue; a metre from a sunlit wall it carries that wall's colour.

   So the district bakes one: a coarse 3D grid of probes, each holding the
   sky-side and ground-side irradiance it can actually see. Every probe casts
   a small hemisphere of rays against the same occluder boxes the AO bake
   uses; rays that escape collect the sky in their direction, rays that hit
   collect one bounce off what they hit. Two RGBA 3D textures, sampled
   trilinearly, added straight into the material's irradiance.

   It costs about a second at build time, two samplers, and nothing per pixel
   beyond two texture fetches — and it is the single largest step this scene
   takes toward looking rendered rather than lit.                          */
const PROBE = { step: 15, ystep: 7.5, ny: 5, y0: 1.6, nx: 0, nz: 0, x0: 0, z0: 0, sky: null, gnd: null };

// the sky dome's own colour, in JS, so the bake and the shader agree
function skyColourAt(dx, dy, dz) {
  const up = clamp(dy, 0, 1);
  const zen = [0.055, 0.089, 0.202], mid = [0.231, 0.262, 0.423], hor = [0.774, 0.652, 0.592];
  const p = Math.pow(up, 0.62);
  let r = mid[0] + (zen[0] - mid[0]) * p;
  let g = mid[1] + (zen[1] - mid[1]) * p;
  let b = mid[2] + (zen[2] - mid[2]) * p;
  const hz = Math.pow(1 - up, 5.0);
  r = r + (hor[0] - r) * hz * 0.92; g = g + (hor[1] - g) * hz * 0.92; b = b + (hor[2] - b) * hz * 0.92;
  const sd = Math.max(dx * CSUN.x + dy * CSUN.y + dz * CSUN.z, 0);
  const glow = Math.pow(sd, 5.0) * 0.60 * (0.35 + 0.65 * hz) + Math.pow(sd, 24.0) * 0.75;
  return [r + 1.00 * glow, g + 0.83 * glow, b + 0.65 * glow];
}

function bakeProbes() {
  const B = PLAN.bounds;
  PROBE.x0 = B.x0 - 30; PROBE.z0 = B.z0 - 30;
  PROBE.nx = Math.ceil((B.x1 - B.x0 + 60) / PROBE.step) + 1;
  PROBE.nz = Math.ceil((B.z1 - B.z0 + 60) / PROBE.step) + 1;
  const { nx, nz, ny } = PROBE;
  const skyData = new Uint8Array(nx * nz * ny * 4);
  const gndData = new Uint8Array(nx * nz * ny * 4);

  // a fixed hemisphere of directions, golden-angle so it never bands
  const DIRS = [];
  const ND = 26;
  for (let i = 0; i < ND; i++) {
    const t = (i + 0.5) / ND;
    const y = Math.sqrt(1 - t);            // cosine-weighted toward the horizon
    const r = Math.sqrt(1 - y * y);
    const a = i * 2.39996323;
    DIRS.push([Math.cos(a) * r, y, Math.sin(a) * r]);
  }
  // one bounce off whatever a ray hits: warm stone under a dusk sky
  const BOUNCE = [0.40, 0.335, 0.255];
  const GROUND = [0.46, 0.395, 0.30];

  const hitDist = (ox, oy, oz, dx, dy, dz) => {
    const list = OGRID.get(Math.floor(ox / OCELL) + ',' + Math.floor(oz / OCELL));
    let best = 1e9;
    // march the occluder grid coarsely: three cells is plenty at this spacing
    for (let s = 0; s < 4; s++) {
      const px = ox + dx * s * OCELL, pz = oz + dz * s * OCELL;
      const arr = OGRID.get(Math.floor(px / OCELL) + ',' + Math.floor(pz / OCELL));
      if (!arr) continue;
      for (let i = 0; i < arr.length; i++) {
        const b = arr[i];
        // slab test against the box, which spans y 0..b.h
        let t0 = -1e9, t1 = 1e9;
        for (let ax = 0; ax < 3; ax++) {
          const o = ax === 0 ? ox : ax === 1 ? oy : oz;
          const d = ax === 0 ? dx : ax === 1 ? dy : dz;
          const lo = ax === 0 ? b.x - b.hw : ax === 1 ? 0 : b.z - b.hd;
          const hi = ax === 0 ? b.x + b.hw : ax === 1 ? b.h : b.z + b.hd;
          if (Math.abs(d) < 1e-6) { if (o < lo || o > hi) { t0 = 1e9; break; } continue; }
          let a1 = (lo - o) / d, a2 = (hi - o) / d;
          if (a1 > a2) { const tt = a1; a1 = a2; a2 = tt; }
          if (a1 > t0) t0 = a1;
          if (a2 < t1) t1 = a2;
        }
        if (t0 < t1 && t0 > 0.25 && t0 < best) best = t0;
      }
    }
    return best;
  };

  let i4 = 0;
  for (let ly = 0; ly < ny; ly++) {
    const py = PROBE.y0 + ly * PROBE.ystep;
    for (let lz = 0; lz < nz; lz++) {
      const pz = PROBE.z0 + lz * PROBE.step;
      for (let lx = 0; lx < nx; lx++) {
        const px = PROBE.x0 + lx * PROBE.step;
        let sr = 0, sg = 0, sb = 0, open = 0;
        for (let d = 0; d < ND; d++) {
          const dv = DIRS[d];
          const dist = hitDist(px, py, pz, dv[0], dv[1], dv[2]);
          if (dist > 55) {
            const c = skyColourAt(dv[0], dv[1], dv[2]);
            sr += c[0]; sg += c[1]; sb += c[2];
            open++;
          } else {
            // one bounce: what it hits is lit by the sky above it
            const k = 0.34 * (1 - Math.min(1, dist / 55));
            sr += BOUNCE[0] * k; sg += BOUNCE[1] * k; sb += BOUNCE[2] * k;
          }
        }
        const inv = 1 / ND;
        sr *= inv; sg *= inv; sb *= inv;
        const vis = open / ND;
        // the ground half: bounced sun and sky off paving, occluded the same way
        const gk = 0.35 + 0.65 * vis;
        const o = i4 * 4;
        const enc = (v) => Math.max(0, Math.min(255, Math.round(Math.pow(v, 1 / 2.2) * 255)));
        skyData[o] = enc(sr); skyData[o + 1] = enc(sg); skyData[o + 2] = enc(sb);
        skyData[o + 3] = Math.round(vis * 255);
        gndData[o] = enc(GROUND[0] * gk); gndData[o + 1] = enc(GROUND[1] * gk); gndData[o + 2] = enc(GROUND[2] * gk);
        gndData[o + 3] = 255;
        i4++;
      }
    }
  }
  const mk = (data) => {
    const t = new THREE.Data3DTexture(data, nx, nz, ny);
    t.format = THREE.RGBAFormat;
    t.type = THREE.UnsignedByteType;
    t.minFilter = t.magFilter = THREE.LinearFilter;
    t.wrapS = t.wrapT = t.wrapR = THREE.ClampToEdgeWrapping;
    t.needsUpdate = true;
    return t;
  };
  PROBE.sky = mk(skyData);
  PROBE.gnd = mk(gndData);
  INSTCOUNT.probes = nx * nz * ny;
  for (const m of PROBE_MATS) {
    const u = m.userData.u;
    u.uProbeSky.value = PROBE.sky;
    u.uProbeGnd.value = PROBE.gnd;
    u.uProbeOrg.value.set(PROBE.x0, PROBE.y0, PROBE.z0);
    u.uProbeStp.value.set(PROBE.step, PROBE.ystep, PROBE.step);
    u.uProbeDim.value.set(nx, nz, ny);
    u.uProbeOn.value = 1;
  }
}

/* ========================================================== MASTERPLAN ==
   The plan is authored, not scattered: five SDC asset zones flowing into one
   another around a public core, on a walkable grid with a water course
   threading through it. Everything else in the file places itself against
   these rectangles.                                                        */
/* Halved, deliberately. This was 940 x 950 m — a small city, most of it
   residential filler nobody walks through, and every triangle spent out
   there is a triangle not spent on the street you are standing in. It is a
   DOWNTOWN district: the core is the product. 760 x 610 m keeps every set
   piece — plaza, canopy, souq, entertainment quarter, commercial edge,
   colonnade court, water court, both towers and the jamaa — and drops the
   outer housing estates to a framing band. */
const PLAN = {
  bounds: { x0: -380, x1: 380, z0: -140, z1: 470 },
  ring: 310,                       // perimeter road half-extent
  plaza: { x0: -112, x1: 112, z0: -78, z1: 122 },
  canopy: { x0: -104, x1: 104, z0: -66, z1: 112, h: 15.4 },
  water:  { x: -34, w: 5.4 },      // the main north-south channel
  souq:   { x0: -74, x1: 74, z0: 132, z1: 348 },
  spineX: 4,                       // the souq's walking centreline
  enter:  { x0: 96, x1: 322, z0: 118, z1: 366 },
  /* The downtown plaza: the one composed view in the district. The cinema and
     the corner hotel used to stand 129 m apart with whatever the scan fabric
     happened to drop between them; here they face each other across open
     paving, with a colonnade block closing the north side and public art in
     the middle, which is the arrangement in every one of the reference
     renders. Nothing else is allowed to build inside it. */
  /* 100 × 96 m, measured off the reference aerials (the rotunda is ~20 m
     across and the square is four to five rotundas wide). The first cut was
     136 × 116 and read as an empty lot from every angle. */
  dtplaza: { x0: 162, x1: 262, z0: 186, z1: 282 },
  comm:   { x0: -336, x1: -104, z0: 118, z1: 366 },
  court:  { x0: -282, x1: -166, z0: 178, z1: 282 },   // colonnade courtyard
  tensile:{ x0: -296, x1: -132, z0: -74, z1: 88 },    // shade-sail water court
  /* framing bands rather than estates: enough fabric to close the view down
     every street out of the core, and no more */
  resN:   { x0: -300, x1: 300, z0: 392, z1: 452 },
  resS:   { x0: 150, x1: 348, z0: -128, z1: 96 },
  resW:   { x0: -378, x1: -342, z0: -100, z1: 340 },
  towerSouq: { x: 4, z: 356, h: 27.5 },       // Najdi watchtower closing the souq
  towerBrick: { x: 258, z: 374, h: 43 },      // striped tower on the skyline
  majlis: { x: 158, z: 246 },                 // the rooftop terrace block
  courtPool: { x0: -238, x1: -206, z0: 214, z1: 236 },
  sailPool:  { x0: -228, x1: -200, z0: -21, z1: 35 },
  // the jamaa closing the north head of the water court, and the radius
  // everything else keeps clear of it
  jamaa: { x: -214, z: 62, r: 40, h: 38 },
};
const ROAD_W = 17;

/* --- axes of the street grid ------------------------------------------- */
const ROADS = [
  // [x0,z0,x1,z1,width,kind]  kind 0 = vehicular, 1 = pedestrian, 2 = service
  [-380, 104, 380, 104, 21, 0],        // Canopy Boulevard, east-west
  [-380, 378, 380, 378, 19, 0],        // North Boulevard
  [-380, -96, 380, -96, 18, 0],        // South Boulevard
  [-88, -140, -88, 470, 18, 0],        // West Avenue
  [88, -140, 88, 470, 18, 0],          // East Avenue
  [-352, -140, -352, 470, 15, 0],      // Commercial edge street
  /* The Entertainment edge street used to run straight through the downtown
     plaza — kerbs above the plaza slab, gullies buried in it, cars parked in
     the middle of the paving. It now stops either side; the downtown streets
     that the reference renders put along the plaza's own edges are the two
     local segments below. */
  [212, -140, 212, 140, 15, 0],        // Entertainment edge street, south leg
  [212, 306, 212, 470, 15, 0],         // Entertainment edge street, north leg
  [-380, 250, 148, 250, 12, 2],        // mid service street, west of the plaza
  [308, 250, 380, 250, 12, 2],         // mid service street, east stub
  /* the plaza's own frame, as drawn in every downtown aerial: a street along
     its south edge and one past the rotunda on the east, both palm-lined and
     carrying traffic, hugging the square rather than a block away */
  [134, 300, 380, 300, 13, 0],         // Plaza South street
  [300, 104, 300, 300, 13, 0],         // Rotunda street, east of the hotel
];

/* ------------------------------------------------------- ground platforms *
   Walkable levels. groundAt() returns the highest platform whose top is
   within a step of the walker, so arcades, bridges, terraces and the majlis
   roof all work without a physics engine.                                  */
const PLATFORMS = [];
function platform(x0, z0, x1, z1, y, kind) {
  PLATFORMS.push({ x0: Math.min(x0, x1), x1: Math.max(x0, x1), z0: Math.min(z0, z1), z1: Math.max(z0, z1), y, kind: kind || 0 });
}
const RAMPS = [];
function ramp(x0, z0, x1, z1, y0, y1, halfW) {
  RAMPS.push({ x0, z0, x1, z1, y0, y1, hw: halfW });
}

/* the ground is nearly flat sabkha — a metre of fall across the whole plan,
   plus the sunken plaza and the water terraces */
function terrainY(x, z) {
  return -0.9 * sstep(-250, 700, z) * 0.0
    + 0.35 * Math.sin(x * 0.0032 + 1.1) + 0.28 * Math.sin(z * 0.0027 - 0.4)
    + 0.22 * fbm(x * 0.0045 + 71, z * 0.0045 - 22, 2);
}

function groundAt(x, z, fromY) {
  let best = terrainY(x, z), bestKind = 0;
  const reach = fromY === undefined ? 1e9 : fromY + 1.35;
  for (let i = 0; i < PLATFORMS.length; i++) {
    const p = PLATFORMS[i];
    if (x < p.x0 || x > p.x1 || z < p.z0 || z > p.z1) continue;
    if (p.y > best && p.y <= reach) { best = p.y; bestKind = p.kind; }
  }
  for (let i = 0; i < RAMPS.length; i++) {
    const r = RAMPS[i];
    const dx = r.x1 - r.x0, dz = r.z1 - r.z0;
    const l2 = dx * dx + dz * dz;
    const t = clamp(((x - r.x0) * dx + (z - r.z0) * dz) / l2, 0, 1);
    const px = r.x0 + t * dx, pz = r.z0 + t * dz;
    if (Math.hypot(x - px, z - pz) > r.hw) continue;
    const y = mix(r.y0, r.y1, t);
    if (y > best && y <= reach) { best = y; bestKind = 1; }
  }
  return best;
}

/* -------------------------------------------------------------- colliders *
   Oriented boxes on a 32 m bucket grid. Arcades, gateways and the majlis
   stair are simply not given one.                                          */
const COLLIDERS = [];
const CGRID = new Map();
const CCELL = 32;
function collider(x, z, hw, hd, rot, top) {
  const c = { x, z, hw, hd, rot: rot || 0, ca: Math.cos(rot || 0), sa: Math.sin(rot || 0), top: top === undefined ? 1e9 : top };
  const rad = Math.hypot(hw, hd);
  COLLIDERS.push(c);
  const i0 = Math.floor((x - rad) / CCELL), i1 = Math.floor((x + rad) / CCELL);
  const j0 = Math.floor((z - rad) / CCELL), j1 = Math.floor((z + rad) / CCELL);
  for (let i = i0; i <= i1; i++) for (let j = j0; j <= j1; j++) {
    const key = i + ',' + j;
    let a = CGRID.get(key); if (!a) { a = []; CGRID.set(key, a); }
    a.push(c);
  }
  return c;
}
/* push a point out of every box it is inside; two relaxation rounds so
   corners resolve cleanly */
function resolve(px, pz, radius, feetY) {
  let x = px, z = pz;
  const fy = feetY === undefined ? -1e9 : feetY;
  // three relaxation rounds: two leave a handful of leaks where overlapping
  // footprints meet at a corner, three clear the whole plan
  for (let pass = 0; pass < 3; pass++) {
    const gi = Math.floor(x / CCELL), gj = Math.floor(z / CCELL);
    const near = [];
    for (let di = -1; di <= 1; di++) for (let dj = -1; dj <= 1; dj++) {
      const a = CGRID.get((gi + di) + ',' + (gj + dj));
      if (a) for (const c of a) if (c.top > fy + 0.4 && near.indexOf(c) < 0) near.push(c);
    }
    for (const c of near) {
      const dx = x - c.x, dz = z - c.z;
      const lx = dx * c.ca + dz * c.sa;
      const lz = -dx * c.sa + dz * c.ca;
      const ex = c.hw + radius, ez = c.hd + radius;
      if (lx > -ex && lx < ex && lz > -ez && lz < ez) {
        const ox = ex - Math.abs(lx), oz = ez - Math.abs(lz);
        let nlx = lx, nlz = lz;
        if (ox < oz) nlx = lx > 0 ? ex : -ex; else nlz = lz > 0 ? ez : -ez;
        x = c.x + nlx * c.ca - nlz * c.sa;
        z = c.z + nlx * c.sa + nlz * c.ca;
      }
    }
  }
  return [x, z];
}

/* ================================================== SURFACE-LAW MATERIAL ==
   One standard material carries the whole opaque city. The injected chunk
   gives every surface three frequency bands: the silhouette is geometry, the
   meso band is coursing / louvre rhythm / perforation driven by triplanar
   world position, and the micro band is roughness and hue variance. A 2-50 m
   macro layer sits over all of it so nothing tiles visibly.               */
/* `?nobl=1` zeroes the footprint, which point-samples the law exactly as it
   did before it was filtered. That is the A/B for judging the band-limiting:
   the difference is a street that shimmers as the camera moves and one that
   does not, and it has to be seen side by side rather than argued about.
   Baked in as a literal rather than carried as a uniform — it is a debug
   switch, and a uniform would put a multiply in every fragment forever. */
const BAND_LIMIT = (typeof location !== 'undefined'
  && new URLSearchParams(location.search).get('nobl') === '1') ? '0.0' : '1.0';

const SURF_GLSL = `
  /* ================================================== BAND-LIMITING ========
     The surface law is procedural, and a procedural surface has nothing to
     mipmap. A texture gets mipmaps and anisotropic filtering for free, and
     both exist for exactly one reason: a pixel covers an AREA of the surface,
     and what it should show is the AVERAGE over that area. Point-sampling a
     225 mm ashlar course down a 200 m street asks a half-metre-wide pixel for
     the value at one infinitesimal point of a pattern that changes eight
     times across it. The answer is a random draw, and a random draw that
     changes as the camera moves is a shimmer.

     That is most of what read as "low quality" in a street-level frame. It is
     not a tuning problem in the law; the law is fine. It is that the law was
     never filtered.

     So it is filtered here, analytically, which is the one method that costs
     nothing per pixel and never repeats:

       * every noise octave finer than the pixel is faded to its own mean
         (0.5 for value noise), so it contributes its DC and none of its
         aliasing;
       * every hard feature — a joint, a mortar line, a groove, a flag edge —
         is faded to its own SPATIAL MEAN over the cell it divides, computed
         in closed form, so a wall of brick at 80 m goes to the true average
         colour of brick-and-mortar rather than to random brick or random
         mortar;
       * every per-cell constant — this block's tone, this flag's wear — is
         faded to 0.5 once its cell is under about two pixels.

     Two footprints, and the difference between them matters:

       gFPa  the MAJOR axis of the pixel's footprint, in metres. Conservative.
             Used for the hard features and the per-cell constants, which have
             discontinuities and alias violently, and where over-blurring is a
             far cheaper mistake than sparkle.
       gFPg  the GEOMETRIC MEAN of the two axes — the width of the square with
             the same area. Used for the smooth noise octaves, which alias
             gently, and where using the major axis at a grazing angle throws
             away detail the eye can genuinely resolve along the other one.

     Both come from dFdx/dFdy of the WORLD POSITION, not of the triplanar uv.
     The triplanar uv jumps where the dominant axis changes, and a derivative
     of a jump is a spike, which would punch a blurred line down every convex
     edge in the district. The world position is continuous everywhere and
     already carries the grazing-angle stretch that makes the footprint long.
   * ======================================================================== */
  float gFPa, gFPg;

  float h11(float p){ p=fract(p*0.1031); p*=p+33.33; p*=p+p; return fract(p); }
  float h21(vec2 p){ vec3 q=fract(vec3(p.xyx)*0.1031); q+=dot(q,q.yzx+33.33); return fract((q.x+q.y)*q.z); }
  float vn2(vec2 p){ vec2 i=floor(p),f=fract(p); f=f*f*(3.0-2.0*f);
    return mix(mix(h21(i),h21(i+vec2(1,0)),f.x),mix(h21(i+vec2(0,1)),h21(i+vec2(1,1)),f.x),f.y); }

  /* fb2/fb3 take the footprint IN THEIR OWN p-space, so a caller that wrote
     fb2(q * 22.0) writes fb2(q * 22.0, gFPg * 22.0) and the octave weights
     come out right without either side knowing the other's scale.

     Nyquist: one lattice cell of octave i is 1 unit of p, so the octave holds
     no information a pixel can carry once wp >= 0.5. It is faded out between
     0.35 and 0.90 rather than cut at 0.5, because a hard cut is itself a
     visible edge travelling across the ground as the camera moves.

     A faded octave is replaced by its mean, not by zero: value noise averages
     0.5, and dropping it to 0 would darken every distant surface. */
  float fb2(vec2 p, float wp){ float s=0.0,a=0.5;
    for(int i=0;i<4;i++){
      float k = 1.0 - smoothstep(0.35, 0.90, wp);
      s += a * (k > 0.002 ? mix(0.5, vn2(p), k) : 0.5);
      p*=2.03; a*=0.52; wp*=2.03; }
    return s; }
  float fb3(vec2 p, float wp){ float s=0.0,a=0.5;
    for(int i=0;i<3;i++){
      float k = 1.0 - smoothstep(0.35, 0.90, wp);
      s += a * (k > 0.002 ? mix(0.5, vn2(p), k) : 0.5);
      p*=2.11; a*=0.5; wp*=2.11; }
    return s; }

  /* A hard feature fades to its own spatial mean once a pixel is wider than
     the feature itself. \`mean\` is the closed-form average of the sharp
     expression over one cell — for smoothstep(0, w, e) with e the distance to
     the nearest cell edge, that average is exactly 1 - w/cell per axis. Using
     the true mean rather than widening the smoothstep is the whole trick:
     widening makes the joint spread until the wall is half joint and reads
     two stops too dark, which is the usual way this gets done wrong. */
  float blFeat(float sharp, float mean, float feat, float cell){
    return mix(sharp, mean, smoothstep(feat, max(feat*2.0, cell*0.5), gFPa)); }

  /* A per-cell constant fades to the mean of its own distribution — h21 is
     uniform on 0..1, so 0.5 — once the cell is under about two pixels. This
     is the term that puts salt and pepper on a distant brick wall. */
  float blCell(float v, float cell){
    return mix(v, 0.5, smoothstep(cell*0.30, cell*0.75, gFPa)); }

  /* --------------------------------------------------------------------- *
     THE HEIGHT FIELD.  One function, branched by surface class, returning a
     0..1 relief height for a triplanar coordinate. Everything else is
     derived from it: the albedo darkens in the recesses, the roughness
     rises there, and — the thing that actually makes stone look like stone —
     the shading normal is bent by its gradient. Without this every wall in
     the district is a painted plane, which is exactly what it looked like.
   * --------------------------------------------------------------------- */
  float srfH(vec2 q, float s, out float cav, out float grain) {
    cav = 1.0; grain = 0.5;
    if (s < 0.5) {                                   // ASHLAR
      float course = 0.225;
      float row = floor(q.y / course);
      float off = h11(row * 7.13) * 0.9;
      float bl = 0.42 + h11(row * 3.7 + 11.0) * 0.42;
      float jx = fract((q.x + off) / bl), jy = fract(q.y / course);
      float e = min(min(jx, 1.0 - jx) * bl, min(jy, 1.0 - jy) * course);
      float jw = 0.016;                               // 16 mm recessed joint
      float joint = blFeat(smoothstep(0.0, jw, e),
        (1.0 - jw / bl) * (1.0 - jw / course), jw, min(bl, course));
      float stone = blCell(h21(vec2(floor((q.x + off) / bl), row) * 1.37), min(bl, course));
      grain = stone;
      cav = joint;
      // each block sits a little proud or shy of its neighbours, and its face
      // is not flat: that is what separates coursed stone from a grid
      float face = 0.55 + 0.45 * fb2(q * 22.0 + stone * 30.0, gFPg * 22.0);
      return joint * (0.55 + 0.45 * stone) * 0.55 + face * 0.30 * joint;
    } else if (s < 1.5) {                            // RENDER, mud plaster
      float t = fb2(q * 3.2, gFPg * 3.2) * 0.55 + fb2(q * 14.0, gFPg * 14.0) * 0.30
              + fb2(q * 46.0, gFPg * 46.0) * 0.15;
      grain = t; cav = 0.55 + 0.45 * t;
      return t;
    } else if (s < 2.5) {                            // BRICK
      float ch = 0.082, cw = 0.235;
      float row = floor(q.y / ch);
      float sft = mod(row, 2.0) * 0.5 * cw;
      float jx = fract((q.x + sft) / cw), jy = fract(q.y / ch);
      float e = min(min(jx, 1.0 - jx) * cw, min(jy, 1.0 - jy) * ch);
      float mw = 0.011;
      float mortar = blFeat(smoothstep(0.0, mw, e),
        (1.0 - mw / cw) * (1.0 - mw / ch), mw, min(cw, ch));
      float bk = blCell(h21(vec2(floor((q.x + sft) / cw), row) * 1.91), min(cw, ch));
      grain = bk; cav = mortar;
      return mortar * (0.62 + 0.38 * bk) * 0.72 + 0.16 * fb2(q * 40.0, gFPg * 40.0) * mortar;
    } else if (s < 3.5) {                            // TIMBER
      /* the groove threshold is in BOARD units, not metres — 0.06 of a
         192 mm board is 11.5 mm — so both it and the edge distance are put
         back into metres before the footprint is allowed to judge them */
      float bwm = 1.0 / 5.2;
      float board = floor(q.y * 5.2);
      float bj = fract(q.y * 5.2);
      float gwm = 0.06 * bwm;
      float groove = blFeat(smoothstep(0.0, gwm, min(bj, 1.0 - bj) * bwm),
        1.0 - gwm / bwm, gwm, bwm);
      float gr = fb2(vec2(q.x * 2.2, q.y * 60.0), gFPg * 60.0);
      grain = gr; cav = groove;
      return groove * (0.6 + 0.4 * gr) * 0.5
           + blCell(h11(board * 5.1), bwm) * 0.12 * groove;
    } else if (s < 4.5) {                            // TRAVERTINE
      /* Cladding panels, not megaliths. These were 2.3 x 1.15 m — bigger
         than a door, laid in a hard grid over every travertine and office
         elevation in the district, which is exactly and entirely why the
         fabric read as stacked blocks. A large-format travertine panel is
         900 x 450, and the course breaks every other row so the joints do
         not line up into a lattice. */
      float sh = 0.45;
      float row = floor(q.y / sh);
      float sw = 0.90;
      float sft = mod(row, 2.0) * 0.5 * sw + h11(row * 4.7) * 0.18;
      float jx = fract((q.x + sft) / sw), jy = fract(q.y / sh);
      float e = min(min(jx, 1.0 - jx) * sw, min(jy, 1.0 - jy) * sh);
      float jw = 0.006;
      float joint = blFeat(smoothstep(0.0, jw, e),
        (1.0 - jw / sw) * (1.0 - jw / sh), jw, min(sw, sh));
      float band = fb2(vec2(q.x * 2.2, q.y * 16.0), gFPg * 16.0);
      float slab = blCell(h21(vec2(floor((q.x + sft) / sw), row) * 1.61), min(sw, sh));
      float pit = smoothstep(0.62, 0.92, fb2(q * 26.0, gFPg * 26.0));   // the travertine pores
      grain = 0.35 * band + 0.65 * slab; cav = joint * (1.0 - pit * 0.7);
      return joint * (0.62 + 0.38 * slab) * 0.40 - pit * 0.22;
    } else if (s < 5.5) {                            // CONCRETE / white render
      float t = fb2(q * 4.2, gFPg * 4.2) * 0.6 + fb2(q * 19.0, gFPg * 19.0) * 0.4;
      grain = t; cav = 0.7 + 0.3 * t;
      return t * 0.6;
    } else if (s < 6.5) {                            // METAL, brushed
      float t = fb2(vec2(q.x * 90.0, q.y * 4.0), gFPg * 90.0);
      grain = t; cav = 1.0;
      return t * 0.25;
    } else if (s < 7.5) {                            // PAVING, irregular flags
      /* A Worley cell is 1 unit of p2, which is 247 mm of ground. Once a pixel
         is wider than that the nine hashes below are nine random numbers per
         pixel and the whole loop is a sparkle generator — so past that width
         it is skipped entirely and the flags go straight to their mean. That
         is the correct filtered answer AND it is the single biggest cost in
         this shader gone from every distant square metre of pavement. */
      float cellm = 1.0 / 4.05;
      float ewm = 0.038 * cellm;
      float edge, slab;
      if (gFPa > cellm * 0.85) {
        edge = 1.0 - ewm / cellm; slab = 0.5;
      } else {
        vec2 warp = vec2(fb3(q * 0.28, gFPg * 0.28), fb3(q * 0.28 + 19.0, gFPg * 0.28)) - 0.5;
        vec2 p2 = q * 4.05 + warp * 0.85;
        vec2 ci = floor(p2), cf = fract(p2);
        float best = 9.0, second = 9.0; vec2 bid = vec2(0.0);
        for (int j = -1; j <= 1; j++) for (int i = -1; i <= 1; i++) {
          vec2 g = vec2(float(i), float(j));
          vec2 o = vec2(h21(ci + g), h21(ci + g + 41.7));
          float d = length(g + o - cf);
          if (d < best) { second = best; best = d; bid = ci + g; }
          else if (d < second) second = d;
        }
        edge = blFeat(smoothstep(0.0, ewm, (second - best) * cellm),
          1.0 - ewm / cellm, ewm, cellm);
        slab = blCell(h21(bid * 1.13), cellm);
      }
      grain = slab; cav = edge;
      // every flag is laid a little high or low, and its face is worn
      return edge * (0.5 + 0.5 * slab) * 0.5 + edge * 0.22 * fb2(q * 9.0, gFPg * 9.0);
    } else if (s < 8.5) {                            // SAND
      float d = fb2(q * 0.9, gFPg * 0.9) * 0.6 + fb2(q * 6.0, gFPg * 6.0) * 0.4;
      grain = d; cav = 1.0;
      return d;
    } else if (s < 9.5) {                            // ASPHALT
      float g2 = fb2(q * 26.0, gFPg * 26.0) * 0.6 + fb2(q * 90.0, gFPg * 90.0) * 0.4;
      grain = g2; cav = 0.8 + 0.2 * g2;
      return g2 * 0.5;
    } else if (s < 10.5) {                           // FABRIC
      /* A woven cloth at two metres is smooth. The weave of a thobe is
         sub-millimetre; what you actually see at conversational distance is
         the drape. This was a 3 cm chequer at full amplitude, which put
         gingham on every figure, every awning and every cushion in the
         district — the single loudest wrong note in the near field. */
      float fold = fb2(q * 5.5, gFPg * 5.5) * 0.62 + fb2(q * 17.0, gFPg * 17.0) * 0.38;
      /* the weave is 4.8 mm — under a pixel from about a metre and a half
         away, and a sin() aliases into wide moiré bands rather than into
         noise, which is far more visible. It goes to its own mean early. */
      float wk = 1.0 - smoothstep(0.0012, 0.0034, gFPa);
      float w = 0.5 + 0.5 * sin(q.x * 1300.0) * sin(q.y * 1300.0) * wk;
      grain = 0.34 + 0.66 * fold; cav = 1.0;
      return fold * 0.52 + w * 0.055;
    }
    grain = fb2(q * 4.0, gFPg * 4.0); cav = 1.0;     // FOLIAGE
    return grain;
  }
`;

/* ---------------------------------------------------------- the material seam
   Everything below this line builds geometry, and geometry is renderer-
   agnostic: the road grid, the reservations, the scan fabric, the LOD radii
   and every instance matrix are the same whether a WebGL2 program or a TSL
   node graph shades them. The only renderer-specific thing in the district is
   these two factories.

   `MATERIALS` is the seam. Undefined — which is the case for the WebGL2 build
   and will stay that way — the district builds exactly what it always built,
   byte for byte. Defined, by the WebGPU shell in `src/gpuapp.js`, the same
   generation code is shaded by `src/gpu/material.js` instead.

   Doing it this way rather than forking the district was not a close call: the
   district is 350 KB of placement decisions that took the whole project to
   get right, and a fork of it would start diverging on the first bug fixed in
   one copy and not the other. */
const MATERIALS = (typeof CITY_MATERIALS !== 'undefined') ? CITY_MATERIALS : null;

/* `.uniforms` on a ShaderMaterial, `.userData.u` on the node material the
   seam substitutes. One accessor, so the reflection and the clock wire
   themselves under either renderer without a branch at every call site. */
const _wu = (m) => m.uniforms || m.userData.u;


function makeCityMaterial(cacheKey) {
  /* Still pushed to PROBE_MATS, and the alternative shape of the seam is worse:
     the probe bake and the clock both write through `userData.u.<name>.value`,
     and a TSL `uniform()` node has exactly that shape. So the WebGPU material
     presents the same seven handles and the bake wires itself up with no
     renderer-specific code on either side of the seam. */
  if (MATERIALS) { const m = MATERIALS.city(cacheKey); PROBE_MATS.push(m); return m; }
  const mat = new THREE.MeshStandardMaterial({
    vertexColors: true, roughness: 0.86, metalness: 0.0, envMapIntensity: 1.0,
  });
  mat.userData.u = {
    uTime: { value: 0 }, uWind: { value: new THREE.Vector2(0.85, 0.32) },
    uDetD: { value: TEX.stone.diff }, uDetN: { value: TEX.stone.nrm },
    uWoodD: { value: TEX.timber.diff }, uWoodN: { value: TEX.timber.nrm },
    uDetK: { value: new THREE.Vector2(1 / Math.max(0.08, TEX.stone.mean), 1 / Math.max(0.08, TEX.timber.mean)) },
    uProbeSky: { value: null }, uProbeGnd: { value: null },
    uProbeOrg: { value: new THREE.Vector3() }, uProbeStp: { value: new THREE.Vector3(1, 1, 1) },
    uProbeDim: { value: new THREE.Vector3(1, 1, 1) }, uProbeOn: { value: 0 },
    uProbeInt: { value: 1.12 },
    uFogWarm: { value: new THREE.Color(0xe0a572) }, uFogCool: { value: new THREE.Color(0x6882b0) },
    uFogScaleH: { value: 150 },
    uSunW: { value: CSUN.clone() },
    /* A room the sun never enters is lit by its own ceiling, and no pooled
       point light can do that for two hundred shops at once. So an interior
       variant of this material carries a constant warm irradiance — the
       ceiling cove and the downlights, as a number rather than as lights. */
    uRoomAdd: { value: new THREE.Color(0, 0, 0) },
  };
  mat.onBeforeCompile = (sh) => {
    sh.uniforms.uRoomAdd = mat.userData.u.uRoomAdd;
    sh.uniforms.uTime = mat.userData.u.uTime;
    sh.uniforms.uWind = mat.userData.u.uWind;
    sh.uniforms.uDetD = mat.userData.u.uDetD;
    sh.uniforms.uDetN = mat.userData.u.uDetN;
    sh.uniforms.uWoodD = mat.userData.u.uWoodD;
    sh.uniforms.uWoodN = mat.userData.u.uWoodN;
    sh.uniforms.uDetK = mat.userData.u.uDetK;
    sh.uniforms.uProbeSky = mat.userData.u.uProbeSky;
    sh.uniforms.uProbeGnd = mat.userData.u.uProbeGnd;
    sh.uniforms.uProbeOrg = mat.userData.u.uProbeOrg;
    sh.uniforms.uProbeStp = mat.userData.u.uProbeStp;
    sh.uniforms.uProbeDim = mat.userData.u.uProbeDim;
    sh.uniforms.uProbeOn = mat.userData.u.uProbeOn;
    sh.uniforms.uProbeInt = mat.userData.u.uProbeInt;
    sh.vertexShader = `attribute float aSurf; varying float vSurf; varying vec3 vWP; varying vec3 vONrm; varying vec3 vWNrm;
      uniform float uTime; uniform vec2 uWind;
      float wh(vec3 p){ return fract(sin(dot(p,vec3(12.99,78.23,37.71)))*43758.5453); }\n` +
      sh.vertexShader
        .replace('#include <begin_vertex>', `#include <begin_vertex>
          vSurf = floor(aSurf + 0.001); vONrm = normalize(normal);
          /* THE WORLD MOVES, part two: a limb tag rides in the fractional part
             of the surface class — .1 and .2 are the legs, .3 and .4 the arms.
             Each swings about its own pivot in the instance's local frame, so
             a hundred people walk without a skeleton, a bone matrix or a second
             attribute. The phase comes from the instance's own position, which
             the walker moves every frame, so no two are ever in step. */
          float limbTag = fract(aSurf + 0.001);
          if (limbTag > 0.05) {
            vec3 anch = vec3(0.0);
            #ifdef USE_INSTANCING
              anch = instanceMatrix[3].xyz;
            #endif
            float wph = wh(floor(anch * 0.35) + vec3(7.3)) * 6.2831853;
            float sw = sin(uTime * 4.15 + wph);
            float swang, piv;
            if (limbTag < 0.15)      { swang =  sw * 0.52; piv = 0.92; }
            else if (limbTag < 0.25) { swang = -sw * 0.52; piv = 0.92; }
            else if (limbTag < 0.35) { swang = -sw * 0.40; piv = 1.40; }
            else                     { swang =  sw * 0.40; piv = 1.40; }
            float cw = cos(swang), sw2 = sin(swang);
            vec3 q = transformed; q.y -= piv;
            transformed.z = q.z * cw - q.y * sw2;
            transformed.y = q.z * sw2 + q.y * cw + piv;
          }
          /* THE WORLD MOVES: anything tagged foliage or fabric leans with the
             wind, amplitude rising with its height above its own origin, so a
             palm crown swings and its trunk does not. */
          if (aSurf > 9.5) {
            vec3 anchor = vec3(0.0);
            #ifdef USE_INSTANCING
              anchor = instanceMatrix[3].xyz;
            #endif
            float lift = max(position.y, 0.0);
            float ph = wh(floor(anchor*0.7) + vec3(3.1));
            float amp = (aSurf > 10.5 ? 0.055 : 0.020) * lift;
            float g = sin(uTime*1.35 + ph*62.8) * 0.6 + sin(uTime*2.9 + ph*31.4) * 0.4;
            float gust = 0.65 + 0.35*sin(uTime*0.31 + ph*12.0);
            transformed.x += uWind.x * amp * g * gust;
            transformed.z += uWind.y * amp * g * gust;
            transformed.y -= abs(g) * amp * 0.22;
          }
          vWP = (modelMatrix * vec4(transformed,1.0)).xyz;
          #ifdef USE_INSTANCING
            vWNrm = normalize(mat3(modelMatrix) * (mat3(instanceMatrix) * normal));
          #else
            vWNrm = normalize(mat3(modelMatrix) * normal);
          #endif`);
    sh.fragmentShader = `varying float vSurf; varying vec3 vWP; varying vec3 vONrm; varying vec3 vWNrm;
      float gRough; float gMetal; vec3 gNrmW;
      uniform sampler2D uDetD, uDetN, uWoodD, uWoodN; uniform vec2 uDetK;
      uniform sampler3D uProbeSky, uProbeGnd;
      uniform vec3 uProbeOrg, uProbeStp, uProbeDim;
      uniform float uProbeOn, uProbeInt;
      uniform vec3 uRoomAdd, uFogWarm, uFogCool, uSunW;
      uniform float uFogScaleH;
      float FOG_H(float wy) {
        float hAvg = 0.5 * (cameraPosition.y + wy);
        return exp(-max(hAvg, 0.0) / uFogScaleH);
      }
      vec3 gProbeSky, gProbeGnd;\n` + SURF_GLSL +
      sh.fragmentShader
        .replace('void main() {', 'void main() {\n gRough = roughness; gMetal = metalness;')
        .replace('#include <roughnessmap_fragment>', '#include <roughnessmap_fragment>\n roughnessFactor = gRough;')
        .replace('#include <metalnessmap_fragment>', '#include <metalnessmap_fragment>\n metalnessFactor = gMetal;')
        .replace('#include <normal_fragment_maps>',
          '#include <normal_fragment_maps>\n normal = normalize((viewMatrix * vec4(gNrmW, 0.0)).xyz);')
        .replace('#include <color_fragment>', `#include <color_fragment>
      {
        /* THE PIXEL FOOTPRINT — set once, before anything reads the law.
           dFdx/dFdy of the world position give the two edges of the quad this
           fragment's pixel projects onto the surface, in metres. Their lengths
           are the two axes of the footprint; the major one is what a
           conservative filter must respect and their geometric mean is the
           width of the equal-area square. See the note above SURF_GLSL for
           why these come off the world position and not off the triplanar uv. */
        vec3 fdx = dFdx(vWP), fdy = dFdy(vWP);
        float fla = length(fdx), flb = length(fdy);
        gFPa = max(fla, flb) * ${BAND_LIMIT};
        gFPg = sqrt(max(fla * flb, 1e-12)) * ${BAND_LIMIT};

        vec3 Nw = normalize(vWNrm);
        vec3 aN = abs(Nw);
        /* triplanar frame in world space: the dominant axis picks the plane,
           and its two companions are the tangent and bitangent the relief is
           bent along. Working in world space means the perturbed normal comes
           out ready to use, with no model matrix in the fragment shader. */
        vec2 uvw; vec3 Tw, Bw;
        if (aN.y > max(aN.x, aN.z)) { uvw = vWP.xz; Tw = vec3(1,0,0); Bw = vec3(0,0,1); }
        else if (aN.x > aN.z)       { uvw = vec2(vWP.z, vWP.y); Tw = vec3(0,0,1); Bw = vec3(0,1,0); }
        else                        { uvw = vec2(vWP.x, vWP.y); Tw = vec3(1,0,0); Bw = vec3(0,1,0); }
        Tw = normalize(Tw - Nw * dot(Nw, Tw));
        Bw = normalize(cross(Nw, Tw));
        float s = vSurf;
        float rough = gRough;
        vec3 alb = diffuseColor.rgb;

        // ---- relief: sample the height field three times and bend the normal
        float cav, grain, cavx, gx, cavy, gy;
        float dist = length(cameraPosition - vWP);
        /* the central difference must never be finer than a pixel. Sampling
           the height field at 6 mm through a pixel that covers 300 mm asks
           for the slope between two arbitrary points of a field that has
           twenty features between them — which is a random direction, and a
           random normal direction is the sparkle on a distant wall. */
        float e = max(0.006 + dist * 0.00035, gFPa);
        float h0 = srfH(uvw, s, cav, grain);
        float hx = srfH(uvw + vec2(e, 0.0), s, cavx, gx);
        float hy = srfH(uvw + vec2(0.0, e), s, cavy, gy);
        // relief fades with distance so it never aliases into noise
        float rel = (1.0 - smoothstep(70.0, 300.0, dist)) * (s > 10.5 ? 0.0 : 1.0);
        float amp = 0.055 * rel;
        vec3 pn = normalize(vec3(-(hx - h0) / e * amp, -(hy - h0) / e * amp, 1.0));

        /* ---- the photographic band. Two scales of the same map: 0.85 m for
           grain and hairline cracks, 7 m for the staining and patch repair
           that stops any surface looking new. Timber gets its own set. */
        bool wood = (s > 2.5 && s < 3.5);
        vec2 fine = uvw * (wood ? 0.62 : 1.18);
        vec2 broad = uvw * (wood ? 0.11 : 0.145);
        vec3 dA = wood ? texture2D(uWoodD, fine).rgb : texture2D(uDetD, fine).rgb;
        vec3 dB = wood ? texture2D(uWoodD, broad).rgb : texture2D(uDetD, broad).rgb;
        float kk = wood ? uDetK.y : uDetK.x;
        float detFade = 1.0 - smoothstep(34.0, 120.0, dist);
        float foliaged = step(10.5, s);
        float dw = detFade * (1.0 - foliaged);
        /* Take the detail's VALUE, not its colour: a photograph of clay
           plaster would otherwise repaint the whole district its own orange.
           A quarter of the hue comes through, which is enough for the stains
           to feel like stains rather than dirt-coloured noise. */
        const vec3 LUM = vec3(0.2126, 0.7152, 0.0722);
        vec3 gA = mix(vec3(dot(dA, LUM)), dA, 0.26) * kk;
        vec3 gB = mix(vec3(dot(dB, LUM)), dB, 0.18) * kk;
        alb *= mix(vec3(1.0), gA, 0.64 * dw) * mix(vec3(1.0), gB, 0.40 * dw);

        vec4 nT = wood ? texture2D(uWoodN, fine) : texture2D(uDetN, fine);
        vec4 nB = wood ? texture2D(uWoodN, broad) : texture2D(uDetN, broad);
        // whiteout blend: the photographic normal rides on the procedural one
        vec2 dxy = ((nT.xy - 0.5) * 2.0 * 1.25 + (nB.xy - 0.5) * 2.0 * 0.55) * dw;
        vec3 nc = normalize(vec3(pn.xy + dxy, pn.z));
        gNrmW = normalize(Tw * nc.x + Bw * nc.y + Nw * nc.z);
        // roughness comes off the same map, so the wet-looking patches are
        // where the surface is actually smooth
        rough = clamp(mix(rough, rough * (0.55 + 0.95 * nT.z), 0.60 * dw), 0.04, 1.0);

        // ---- macro band: 2-50 m drift so no material ever tiles
        float macro = fb2(vWP.xz * 0.045, gFPg * 0.045) * 0.62
                    + fb3(vWP.xz * 0.011, gFPg * 0.011) * 0.38;
        alb *= 0.82 + 0.38 * macro;

        // ---- albedo and roughness follow the same height field, so the
        //      recesses are dark and matt exactly where they are recessed
        float foli = step(10.5, s);
        float dk = mix(1.0, cav, 0.72 * (0.35 + 0.65 * rel) * (1.0 - foli));
        alb *= mix(0.62 + 0.55 * dk, 1.0, foli);
        alb *= mix(0.80 + 0.42 * grain, 0.90 + 0.26 * grain, foli);
        // leaves are thin: they pass light, so a canopy never goes to black
        alb += foli * vec3(0.078, 0.120, 0.042) * (0.45 + 0.55 * grain);
        rough = clamp(rough * (1.10 - 0.28 * grain) + (1.0 - cav) * 0.20, 0.05, 1.0);

        if (s > 1.5 && s < 2.5) alb = mix(alb, alb * vec3(1.16, 0.91, 0.82), grain);
        if (s > 3.5 && s < 4.5) alb *= vec3(0.94 + 0.16 * grain, 0.92 + 0.14 * grain, 0.89 + 0.12 * grain);
        if (s > 5.5 && s < 6.5) { gMetal = 0.48; rough = 0.24 + 0.32 * grain; }
        if (s > 6.5 && s < 7.5) alb *= vec3(1.05, 1.01, 0.94);
        if (s > 4.5 && s < 5.5) alb *= vec3(1.03, 1.01, 0.96);
        if (s > 7.5 && s < 8.5) alb *= vec3(1.08, 1.03, 0.91);
        if (s > 8.5 && s < 9.5) alb *= vec3(0.96, 0.96, 1.02);

        // ---- micro band: hue and value jitter, everywhere, at 6-40 cm
        float micro = fb3(vWP.xz * 3.7 + vWP.y * 2.1, gFPg * 3.7);
        alb *= 0.945 + 0.11 * micro;
        /* ground-contact weathering: every vertical surface darkens and
           desaturates in the first 900 mm, warmer where the ground bounces,
           and the splash line is uneven because rain is uneven */
        float splash = 0.55 + 0.45 * fb2(vec2(vWP.x, vWP.z) * 1.7, gFPg * 1.7);
        float lowT = smoothstep(1.05 * splash, 0.02, vWP.y) * (1.0 - aN.y);
        alb = mix(alb, alb * vec3(0.68, 0.65, 0.58), lowT * 0.62);

        /* vertical drip staining: rain collects at ledges and runs down
           in narrow tracks, darkening and slightly glossing the surface.
           The tracks are fixed in world space — permanent water damage. */
        float dripSeed = fb2(vec2(vWP.x * 6.8, vWP.z * 6.8), gFPg * 6.8);
        float dripStrk = smoothstep(0.56, 0.80, dripSeed);
        float dripV = (1.0 - abs(aN.y));
        float dripZ = smoothstep(0.6, 3.0, vWP.y);
        float drpT = dripStrk * dripV * dripZ * 0.40;
        alb = mix(alb, alb * vec3(0.72, 0.70, 0.66), drpT);
        rough = mix(rough, min(rough * 0.78, 0.64), drpT * 0.45);

        /* building-scale warm/cool hue drift: no two facades should read
           the same colour even if they are the same material, because
           real stone weathers differently on each face */
        float hueDrift = fb2(vWP.xz * 0.018, gFPg * 0.018);
        alb *= mix(vec3(0.955, 0.975, 1.035), vec3(1.045, 1.015, 0.960), hueDrift);

        diffuseColor.rgb = alb;
        gRough = rough;

        /* the probe field, sampled where this fragment actually stands. The
           half-texel inset keeps the trilinear filter off the clamped edge. */
        if (uProbeOn > 0.5) {
          vec3 pc = (vWP - uProbeOrg) / uProbeStp;
          pc = vec3(pc.x, pc.z, pc.y);
          vec3 uvw3 = (pc + 0.5) / uProbeDim;
          uvw3 = clamp(uvw3, 0.5 / uProbeDim, 1.0 - 0.5 / uProbeDim);
          vec4 sky = texture(uProbeSky, uvw3);
          vec4 gnd = texture(uProbeGnd, uvw3);
          gProbeSky = pow(sky.rgb, vec3(2.2));
          gProbeGnd = pow(gnd.rgb, vec3(2.2));
        } else { gProbeSky = vec3(0.0); gProbeGnd = vec3(0.0); }
      }`)
        .replace('#include <lights_fragment_begin>', `#include <lights_fragment_begin>
      if (uProbeOn > 0.5) {
        // a hemisphere weighting, but a spatially varying one: this is the
        // whole point of the field
        float up = normal.y * 0.5 + 0.5;
        vec3 wN = normalize(vec3(viewMatrix[0][1], viewMatrix[1][1], viewMatrix[2][1]));
        float upW = clamp(dot(normal, wN) * 0.5 + 0.5, 0.0, 1.0);
        irradiance += mix(gProbeGnd, gProbeSky, upW) * uProbeInt;
      }
      irradiance += uRoomAdd;`)
        .replace('#include <fog_fragment>', `
      #ifdef USE_FOG
        /* Distance is not one colour. Looking west into the last of the sun it
           is warm; looking anywhere else at this hour it is deep blue. A single
           fog colour paints the whole horizon the same beige, which is most of
           what made the aerial read as haze instead of as evening. */
        vec3 fdir = normalize(vWP - cameraPosition);
        float fsun = pow(max(dot(fdir, normalize(uSunW)), 0.0), 1.8);
        vec3 fcol = mix(uFogCool, uFogWarm, fsun);
        /* Haze is not uniform: dust and humidity sit in the bottom couple of
           hundred metres and thin out exponentially above it. A single density
           has to be either too weak to dissolve the desert at eye level or
           strong enough to grey out the whole district seen from three hundred
           metres up — this is the one change that lets it do both. */
        float fogF = 1.0 - exp(-fogDensity * fogDensity * FOG_H(vWP.y) * vFogDepth * vFogDepth);
        gl_FragColor.rgb = mix(gl_FragColor.rgb, fcol, clamp(fogF, 0.0, 1.0));
      #endif`);
  };
  /* The cache key has to differ per variant. Two materials with the same key
     and the same parameter profile share one compiled program, and a shared
     program means the second material's `onBeforeCompile` never runs — so its
     uniform objects are never bound and it silently uses the first material's.
     That is how the interior room light spent three rounds switched off. */
  mat.customProgramCacheKey = () => 'citysurf' + (cacheKey || '');
  // keep the compiled source so the walk-cycle gate can assert on it
  const _obc = mat.onBeforeCompile;
  mat.onBeforeCompile = (sh, rn) => { _obc(sh, rn); mat.userData.__vs = sh.vertexShader; };
  PROBE_MATS.push(mat);
  return mat;
}

/* Materials for the scanned assets. They already carry their own albedo,
   normal and roughness, so none of the triplanar law applies — but they still
   have to stand in the same light as everything else, which means the probe
   field, and foliage still has to move, which means the wind term. Leaves are
   masked rather than blended: an alpha-sorted leaf card is a leaf card that
   flickers as you walk past it.

   BAKED-ALBEDO MODELS: models from Tripo/image-to-3D carry lighting baked
   into their albedo with no normal or roughness maps. Applying full scene
   lighting on top doubles every shadow. For these, we raise roughness to 1
   (no specular), cut environment reflections, and blend the final lit result
   back toward the original albedo so the baked detail shows through. */
function makeModelMaterial(src, foliage, walk) {
  if (MATERIALS) { const m = MATERIALS.model(src, foliage, walk); PROBE_MATS.push(m); return m; }
  const baked = !foliage && !src.normalMap && !src.roughnessMap;
  const mat = new THREE.MeshStandardMaterial({
    map: src.map || null, normalMap: foliage ? null : (src.normalMap || null),
    roughnessMap: foliage ? null : (src.roughnessMap || null),
    aoMap: foliage ? null : (src.aoMap || null),
    color: 0xffffff,
    roughness: baked ? 0.92 : (foliage ? 0.88 : 0.82),
    metalness: 0.0,
    side: THREE.DoubleSide,
    envMapIntensity: baked ? 0.15 : 1.0,
    fog: true,
    transparent: false,
    alphaTest: src.alphaTest > 0 ? src.alphaTest : (foliage && src.map ? 0.42 : 0),
  });
  if (mat.map) mat.map.anisotropy = MAX_ANISO_();
  mat.userData.u = {
    uTime: { value: 0 }, uWind: { value: new THREE.Vector2(0.85, 0.32) },
    uSway: { value: foliage ? 1 : 0 },
    uBaked: { value: baked ? 1.0 : 0.0 },
    uProbeSky: { value: null }, uProbeGnd: { value: null },
    uProbeOrg: { value: new THREE.Vector3() }, uProbeStp: { value: new THREE.Vector3(1, 1, 1) },
    uProbeDim: { value: new THREE.Vector3(1, 1, 1) }, uProbeOn: { value: 0 },
    uProbeInt: { value: 1.12 },
    uFogWarm: { value: new THREE.Color(0xe0a572) }, uFogCool: { value: new THREE.Color(0x6882b0) },
    uFogScaleH: { value: 150 },
    uSunW: { value: CSUN.clone() },
  };
  mat.onBeforeCompile = (sh) => {
    for (const k in mat.userData.u) sh.uniforms[k] = mat.userData.u[k];
    sh.vertexShader = `uniform float uTime, uSway; uniform vec2 uWind; varying vec3 vMWP;
      ${walk ? 'attribute float aSurf;' : ''}
      float mwh(vec3 p){ return fract(sin(dot(p,vec3(12.99,78.23,37.71)))*43758.5453); }\n` +
      sh.vertexShader.replace('#include <begin_vertex>', `#include <begin_vertex>
        ${walk ? `
        /* THE SCANNED CROWD WALKS.
           The same limb tag and the same swing as the procedural figures, with
           two ramps the procedural ones do not need and must not get. A scan
           is ONE continuous mesh: a rigid rotation about the hip rips it
           across the pelvis, and two legs turning opposite ways split a robe
           up the middle. Both ramps take the swing smoothly to zero at the
           seam instead — over 180 mm below the pivot, and over 60 mm either
           side of the centre line. The result is a thobe whose hem opens and
           closes about a whole seam, which is what a thobe does.

           tagWalker() guarantees the frame this assumes: feet at y = 0,
           facing +Z, lateral on X. */
        float limbTag = fract(aSurf + 0.001);
        if (limbTag > 0.05) {
          vec3 anch = vec3(0.0);
          #ifdef USE_INSTANCING
            anch = instanceMatrix[3].xyz;
          #endif
          float wph = mwh(floor(anch * 0.35) + vec3(7.3)) * 6.2831853;
          float sw = sin(uTime * 4.15 + wph);
          float swang, piv;
          if (limbTag < 0.15)      { swang =  sw * 0.52; piv = 0.92; }
          else if (limbTag < 0.25) { swang = -sw * 0.52; piv = 0.92; }
          else if (limbTag < 0.35) { swang = -sw * 0.40; piv = 1.40; }
          else                     { swang =  sw * 0.40; piv = 1.40; }
          float rv = smoothstep(0.0, 0.18, piv - position.y);
          float rl = smoothstep(0.0, 0.06, abs(position.x));
          swang *= rv * rl;
          float cw = cos(swang), sw2 = sin(swang);
          vec3 lq = transformed; lq.y -= piv;
          transformed.z = lq.z * cw - lq.y * sw2;
          transformed.y = lq.z * sw2 + lq.y * cw + piv;
        }` : ''}
        if (uSway > 0.5) {
          vec3 anchor = vec3(0.0);
          #ifdef USE_INSTANCING
            anchor = instanceMatrix[3].xyz;
          #endif
          /* the sway rises with height above the instance's own base and with
             distance from its trunk, so the bole stays put and the outer crown
             is what moves — which is what a tree actually does */
          float lift = max(position.y, 0.0);
          float out2 = length(position.xz);
          float ph = mwh(floor(anchor * 0.7) + vec3(3.1));
          float amp = 0.020 * lift + 0.014 * out2;
          float g = sin(uTime * 1.15 + ph * 62.8) * 0.6 + sin(uTime * 2.4 + ph * 31.4) * 0.4;
          float gust = 0.62 + 0.38 * sin(uTime * 0.29 + ph * 12.0);
          transformed.x += uWind.x * amp * g * gust;
          transformed.z += uWind.y * amp * g * gust;
          transformed.y -= abs(g) * amp * 0.20;
        }
        vMWP = (modelMatrix * vec4(transformed, 1.0)).xyz;`);
    sh.fragmentShader = `varying vec3 vMWP;
      uniform sampler3D uProbeSky, uProbeGnd;
      uniform vec3 uProbeOrg, uProbeStp, uProbeDim;
      uniform vec3 uFogWarm, uFogCool, uSunW;
      uniform float uFogScaleH, uBaked;
      float FOG_H(float wy) {
        float hAvg = 0.5 * (cameraPosition.y + wy);
        return exp(-max(hAvg, 0.0) / uFogScaleH);
      }
      uniform float uProbeOn, uProbeInt;\n` +
      sh.fragmentShader
        .replace('#include <fog_fragment>', `
      #ifdef USE_MAP
      if (uBaked > 0.5) {
        vec3 bAlb = pow(texture2D(map, vMapUv).rgb, vec3(2.2));
        gl_FragColor.rgb = mix(bAlb, gl_FragColor.rgb, 0.35);
      }
      #endif
      #ifdef USE_FOG
        vec3 fdir = normalize(vMWP - cameraPosition);
        float fsun = pow(max(dot(fdir, normalize(uSunW)), 0.0), 1.8);
        float fogF = 1.0 - exp(-fogDensity * fogDensity * FOG_H(vMWP.y) * vFogDepth * vFogDepth);
        gl_FragColor.rgb = mix(gl_FragColor.rgb, mix(uFogCool, uFogWarm, fsun), clamp(fogF, 0.0, 1.0));
      #endif`)
        .replace('#include <lights_fragment_begin>', `#include <lights_fragment_begin>
      if (uProbeOn > 0.5) {
        vec3 pc = (vMWP - uProbeOrg) / uProbeStp;
        pc = vec3(pc.x, pc.z, pc.y);
        vec3 uvw3 = clamp((pc + 0.5) / uProbeDim, 0.5 / uProbeDim, 1.0 - 0.5 / uProbeDim);
        vec3 psky = pow(texture(uProbeSky, uvw3).rgb, vec3(2.2));
        vec3 pgnd = pow(texture(uProbeGnd, uvw3).rgb, vec3(2.2));
        vec3 wN = normalize(vec3(viewMatrix[0][1], viewMatrix[1][1], viewMatrix[2][1]));
        float upW = clamp(dot(normal, wN) * 0.5 + 0.5, 0.0, 1.0);
        irradiance += mix(pgnd, psky, upW) * uProbeInt;
      }`);
  };
  /* the walking variant compiles a different vertex shader, so it must not
     share a program with the static one — the same fault that kept the shop
     interiors dark for three rounds */
  mat.customProgramCacheKey = () => 'citymodel' + (foliage ? 'f' : 's') + (walk ? 'w' : '') + (baked ? 'b' : '');
  PROBE_MATS.push(mat);
  return mat;
}

/* ======================================================== SCENE & LIGHTS == */
const cityScene = new THREE.Scene();
cityScene.background = null;
/* Aerial perspective was the single biggest thing missing from the wide shot.
   At 0.00034 the desert apron kept its full contrast right out to its own
   geometric edge, so the world ended in a hard brown line against the sky and
   the skyline towers read as grey cardboard standing on it. At 0.00080 the
   apron is 90% dissolved by the time it reaches that edge — the horizon
   becomes a gradient instead of a cut — the towers gain the depth cue that
   tells you they are two kilometres away, and the district itself is still
   only 4% hazed at 300 m, so nothing you can walk to loses a thing. */
const CITY_FOG = 0.00145;
cityScene.fog = new THREE.FogExp2(0x7286a8, CITY_FOG);

const cityCam = new THREE.PerspectiveCamera(52, innerWidth / innerHeight, 0.11, 1900);

/* 20 degrees WSW, not 12. With shadows finally switched on, a twelve-degree
   sun puts three hundred metres of building between the light and every point
   at ground level — the whole district reads as one flat blue shadow, which is
   physically right and looks dead. At twenty the streets take long raking
   shadows and the west faces still carry the gold. */
const CSUN = new THREE.Vector3(-0.9232, 0.3420, -0.1754).normalize();
const cityHemi = new THREE.HemisphereLight(0x6f8ec6, 0x7d5730, 0.10);
cityScene.add(cityHemi);
const citySun = new THREE.DirectionalLight(0xffbe88, 2.85);
citySun.position.copy(CSUN).multiplyScalar(300);
citySun.castShadow = true;
/* not quite to zero. A real shadow at this hour is filled by a whole sky, and
   the pillar is that nothing in this district ever goes to a grey void. */
citySun.shadow.intensity = 0.85;
const SHADOW_MAP = 4096;
citySun.shadow.mapSize.set(SHADOW_MAP, SHADOW_MAP);
cityScene.add(citySun);
cityScene.add(citySun.target);
/* a cool counter-fill from the east sky so shadowed stone never goes grey —
   the shadow side reads blue-violet from the dusk dome, not black */
const cityFill = new THREE.DirectionalLight(0x809ee8, 0.75);
cityFill.position.set(240, 130, 200);
cityScene.add(cityFill);
/* and a warm bounce from the paving, aimed up */
const cityBounce = new THREE.DirectionalLight(0xff9248, 0.94);
cityBounce.position.set(40, -100, -30);
cityScene.add(cityBounce);

/* ------------------------------------------------------------ practicals *
   Eight point lights, recycled every frame onto the nearest registered
   practical. Lanterns, shopfronts, uplights and street lamps all register;
   the viewer always stands inside a correctly lit pool without the scene
   ever carrying more than eight dynamic lights.                           */
const PRACTICALS = [];
const POOL = [];
for (let i = 0; i < 12; i++) {
  const l = new THREE.PointLight(0xffc580, 0, 32, 1.6);
  l.castShadow = false;
  cityScene.add(l);
  POOL.push(l);
}
const _pd = [];
function updatePracticals(cam) {
  if (!PRACTICALS.length) return;
  _pd.length = 0;
  for (let i = 0; i < PRACTICALS.length; i++) {
    const p = PRACTICALS[i];
    const d = (p.x - cam.x) * (p.x - cam.x) + (p.y - cam.y) * (p.y - cam.y) + (p.z - cam.z) * (p.z - cam.z);
    if (d < 4900) _pd.push([d, p]);
  }
  _pd.sort((a, b) => a[0] - b[0]);
  for (let i = 0; i < POOL.length; i++) {
    const e = _pd[i];
    if (!e) { POOL[i].intensity = 0; continue; }
    const p = e[1];
    POOL[i].position.set(p.x, p.y, p.z);
    POOL[i].color.setHex(p.c);
    POOL[i].distance = p.r;
    POOL[i].intensity = p.i * (1 - sstep(2800, 4900, e[0]));
  }
}

/* the shadow camera follows the viewer: a 108 m box at 2048 gives 5 cm per
   texel, which is what makes a parapet cast a readable edge on paving, and it
   keeps the shadow pass to the handful of tiles actually around the viewer */
/* One cascade, sized to what the camera can actually see. Walking, that is a
   34 m box at 4096 — 1.7 cm a texel, which resolves the shadow of a chair leg;
   from 168 m up it opens to 300 m at 14.6 cm a texel, which at that altitude is
   a third of a pixel. A second cascade would buy nothing here and would cost a
   third full pass over the district on top of the mirror pass.

   The box is aimed where the camera is looking, not where it stands, because
   from the air the district you can see is ahead of you. Bias and penumbra
   both follow the texel size: a bias tuned at 1.7 cm acnes at 14.6, and a
   penumbra fixed in texels would grow ninefold as the box opens. */
const _shDir = new THREE.Vector3();
const _shUp = new THREE.Vector3();
const _shX = new THREE.Vector3();
function fitShadow(target) {
  const c = citySun.shadow.camera;
  const h = Math.max(1.6, target.y);
  const half = Math.min(420, Math.max(34, 26 + h * 1.9));
  cityCam.getWorldDirection(_shDir);
  let ahead = half * 0.5;
  if (_shDir.y < -0.06) {
    // looking down: put the box where the view meets the ground
    ahead = Math.min(ahead, (h / -_shDir.y) * Math.hypot(_shDir.x, _shDir.z));
  }
  const fl = Math.hypot(_shDir.x, _shDir.z) || 1;
  const cx = target.x + (_shDir.x / fl) * ahead;
  const cz = target.z + (_shDir.z / fl) * ahead;
  /* ---- fit the box to the view, per axis -------------------------------
     A square box was covering wildly different distances on different
     headings, and the difference is the sun rather than the code. The shadow
     camera's two axes are `x` (horizontal, perpendicular to the sun's bearing)
     and `y` (tilted with the sun). A ground direction that lies along `x` is
     covered one-for-one; one that lies along the sun's bearing is covered
     `1 / sin(elevation)` — 2.9x at this sun's 20 degrees.

     MEASURED for this district, sun (-0.923, 0.342, -0.175), half = 34 m:

         ground reach east-west   101.2 m
         ground reach north-south  34.6 m

     The souq spine is 216 m of north-south street and bookmark 3 looks
     straight down it, so everything past 34 m had NO cast shadow — and three
     reports receivers outside the frustum as LIT, which is why it read as a
     flat street rather than as a broken one.

     Rolling the box was tried first and the arithmetic says it cannot fix
     this: swept over 180 degrees the best roll takes north-south from 34.6 m
     to 48.6 m, because the un-compressed axis has to point somewhere and the
     souq is nearly perpendicular to the sun. It also drags the sampling
     lattice across every surface as the camera turns.

     So the box is sized per axis from what the view actually needs: REACH
     metres down the view, WIDTH either side of it, projected onto each axis
     and taken as the extent. On an east-west street this changes nothing (the
     sun already pays for it); on the souq it widens one axis and leaves the
     other alone. No rotation, so the lattice never moves. */
  const REACH = half * 3.0;             // how far down the street to shadow
  const WIDTH = half;                   // how far either side of it
  const vx = _shDir.x / fl, vz = _shDir.z / fl;
  const px = -vz, pz = vx;              // across the view, on the ground
  /* the two axes as three will build them: x = cross(up, z), y = cross(z, x),
     with z = CSUN. Recomputed rather than transcribed — see CLAUDE.md. */
  _shX.set(0, 1, 0).cross(CSUN).normalize();
  _shUp.copy(CSUN).cross(_shX);
  const need = (ax, az) => Math.max(
    Math.abs(REACH * vx * ax + REACH * vz * az),
    Math.abs(WIDTH * px * ax + WIDTH * pz * az));
  const halfU = Math.min(430, Math.max(half, need(_shX.x, _shX.z)));
  const halfW = Math.min(430, Math.max(half, need(_shUp.x, _shUp.z)));
  c.left = -halfU; c.right = halfU; c.top = halfW; c.bottom = -halfW;
  const D = 260 + half * 1.6;
  c.near = 1; c.far = D + half * 2.4 + 90;
  c.updateProjectionMatrix();
  citySun.target.position.set(cx, 0, cz);
  citySun.position.set(cx + CSUN.x * D, CSUN.y * D, cz + CSUN.z * D);
  citySun.target.updateMatrixWorld();
  /* Bias has to follow the texel *and* the sun's grazing angle. A twenty-degree
     sun on a flat roof has a depth slope of 1/tan(20) — nearly three depth
     units per texel — so a bias tuned for the 1.7 cm walking texel acnes badly
     at the 17 cm aerial one, and the acne reads as a whole quarter losing the
     sun rather than as speckle. */
  /* the box is no longer square, so the texel that matters for bias is the
     COARSER of the two — a bias tuned to the fine axis acnes on the other */
  const texel = 2 * Math.max(halfU, halfW) / SHADOW_MAP;
  citySun.shadow.bias = -(0.30 + texel * 3.6) / (c.far - c.near);
  citySun.shadow.normalBias = Math.max(0.05, texel * 3.6);
  citySun.shadow.radius = Math.min(9, Math.max(1, 0.14 / texel));
}

/* ------------------------------------------------------------- city sky */
/* The sky is behind the same seam as the two surface materials, and for a
   sharper reason than they are: `buildEnvironment()` bakes a PMREM off this
   material, so on a renderer that cannot compile it the failure is not a flat
   dome — it is a flat WORLD, and every surface in the district inherits the
   wrong indirect light from it. Substituting after the fact would be too late;
   the bake has already run. */
const citySkyMat = MATERIALS && MATERIALS.sky ? MATERIALS.sky() : new THREE.ShaderMaterial({
  side: THREE.BackSide, depthWrite: false, fog: false,
  uniforms: {
    uSun: { value: CSUN.clone() }, uTime: { value: 0 },
    /* The eight downtown references are all the same luminous blue hour —
       the dome is a light source, not a black backdrop. The old zenith
       0x06122e read as night from any camera that saw sky. */
    /* pushed to the reference renders' actual pixel values — ACES and the
       grade darken from here, so authoring the dome at the target reading
       was always going to be too dark by half. Measured off dt_11_16_32_2:
       zenith band #2e5490, mid band #4a6ea8. */
    uZen: { value: C(0x2e5490) }, uMid: { value: C(0x4a6ea8) },
    uHorizon: { value: C(0xafc2dc) }, uGlow: { value: C(0xffc888) },
    uWarmHz: { value: C(0xe8b184) },
  },
  vertexShader: `varying vec3 vD; void main(){ vD=normalize(position); gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,
  fragmentShader: `
    varying vec3 vD; uniform vec3 uSun,uZen,uMid,uHorizon,uGlow,uWarmHz; uniform float uTime;
    float h21(vec2 p){ vec3 q=fract(vec3(p.xyx)*0.1031); q+=dot(q,q.yzx+33.33); return fract((q.x+q.y)*q.z); }
    float vn(vec2 p){ vec2 i=floor(p),f=fract(p); f=f*f*(3.0-2.0*f);
      return mix(mix(h21(i),h21(i+vec2(1,0)),f.x),mix(h21(i+vec2(0,1)),h21(i+vec2(1,1)),f.x),f.y); }
    float fb(vec2 p){ float s=0.0,a=0.5; for(int i=0;i<5;i++){ s+=a*vn(p); p*=2.09; a*=0.52; } return s; }
    void main(){
      vec3 d = normalize(vD);
      float up = clamp(d.y, -0.2, 1.0);
      vec3 c = mix(uMid, uZen, pow(clamp(up,0.0,1.0), 0.62));
      float hz = pow(1.0 - clamp(up,0.0,1.0), 5.0);
      float sd = max(dot(d, normalize(uSun)), 0.0);
      /* the horizon is warm where the sun went down and blue everywhere else.
         One horizon colour makes a flat band all the way round and is most of
         what reads as haze rather than as evening. */
      c = mix(c, mix(uHorizon, uWarmHz, pow(sd, 1.15)), hz * 0.94);
      c += uGlow * pow(sd, 5.0) * 0.68 * (0.35 + 0.65 * hz);
      c += uGlow * pow(sd, 24.0) * 0.85;
      // high cirrus taking the last of the sun
      vec2 sp = d.xz / max(d.y + 0.16, 0.05);
      float cl = fb(sp * 0.52 + vec2(uTime * 0.0035, 0.0));
      float band = smoothstep(0.52, 0.86, cl) * smoothstep(-0.02, 0.22, d.y) * (1.0 - hz * 0.5);
      c = mix(c, mix(vec3(0.42,0.40,0.50), uGlow * 1.05, pow(sd, 1.6) * 0.8 + 0.12), band * 0.55);
      // stars, only where the dome is already dark
      float st = h21(floor(d.xz * 340.0 / max(abs(d.y),0.15)));
      float sv = smoothstep(0.9975, 1.0, st) * smoothstep(0.10, 0.62, d.y) * (1.0 - band);
      c += vec3(0.85,0.90,1.0) * sv * (0.5 + 0.5 * sin(uTime * 2.2 + st * 90.0));
      gl_FragColor = vec4(c, 1.0);
    }`,
});
const citySky = new THREE.Mesh(new THREE.SphereGeometry(3300, 40, 26), citySkyMat);
citySky.frustumCulled = false;
cityScene.add(citySky);

/* ------------------------------------------------------------- the dome *
   An image-based environment baked once from the dusk sky plus a warm sand
   hemisphere below it. This is the whole reason a gold canopy reads as gold
   and a shadowed travertine pier reads violet-above / warm-below instead of
   grey: every surface gets light from a coloured world, not from an ambient
   constant.                                                               */
let cityEnv = null;
function buildEnvironment() {
  const pmrem = new THREE.PMREMGenerator(renderer);
  const s = new THREE.Scene();
  const sky = new THREE.Mesh(new THREE.SphereGeometry(60, 32, 20), citySkyMat);
  sky.material.side = THREE.BackSide;
  s.add(sky);
  // the ground half: warm sand bounce, brighter toward the sun
  const gm = MATERIALS && MATERIALS.groundBounce ? MATERIALS.groundBounce() : new THREE.ShaderMaterial({
    side: THREE.BackSide, depthWrite: false, fog: false,
    uniforms: { uSun: { value: CSUN.clone() } },
    vertexShader: `varying vec3 vD; void main(){ vD=normalize(position); gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,
    fragmentShader: `varying vec3 vD; uniform vec3 uSun;
      void main(){
        vec3 d = normalize(vD);
        float down = clamp(-d.y, 0.0, 1.0);
        vec3 c = mix(vec3(0.46,0.36,0.27), vec3(0.68,0.50,0.34), down);
        c += vec3(0.52,0.34,0.16) * pow(max(dot(normalize(vec3(uSun.x,-uSun.y,uSun.z)), d),0.0), 2.6);
        gl_FragColor = vec4(c * (0.38 + 0.62*down), 1.0);
      }`,
  });
  const ground = new THREE.Mesh(new THREE.SphereGeometry(58, 24, 16, 0, Math.PI * 2, Math.PI * 0.5, Math.PI * 0.5), gm);
  s.add(ground);
  const rt = pmrem.fromScene(s, 0.04);
  cityEnv = rt.texture;
  cityScene.environment = cityEnv;
  cityScene.environmentIntensity = 0.58;
  gm.dispose();
  ground.geometry.dispose();
  sky.geometry.dispose();
  pmrem.dispose();
}

/* ============================================================ CONTENT ==
   Built in steps so the dive's veil can stay animating while the district
   comes into being. Each step returns a short label for the HUD.          */
let BUILT = false;
const cityRoot = new THREE.Group();
cityScene.add(cityRoot);
const INSTCOUNT = {};
const cityMat = makeCityMaterial();
/* the same law, with the ceiling switched on. Everything inside a shop uses
   this: the shell, the fittings, the stock and the shopkeeper. */
const cityIntMat = makeCityMaterial('room');
cityIntMat.userData.u.uRoomAdd.value.setRGB(1.35, 1.02, 0.72);
cityIntMat.side = THREE.DoubleSide;
const DISPOSE = [];

function addMesh(geo, mat, shadow) {
  const m = new THREE.Mesh(geo, mat);
  m.castShadow = shadow !== false;
  m.receiveShadow = true;
  cityRoot.add(m);
  DISPOSE.push(geo);
  return m;
}

/* ===================================================== CONTENT: FOUNDATION */

/* Merge buckets. One opaque draw call per family keeps the district under a
   hundred-odd calls even with a quarter of a million triangles in it.      */
const CHUNKS = {};
function chunkAcc(kind) {
  const key = kind + ':' + CURCHUNK;
  let a = CHUNKS[key];
  if (!a) a = CHUNKS[key] = new Acc();
  return a;
}
let CURCHUNK = 'core';
const ACC = {
  ground: new Acc(),                            // sabkha, paving, roads, kerbs
  get arch() { return chunkAcc('arch'); },      // building fabric, per spatial chunk
  get fine() { return chunkAcc('fine'); },      // trim, railings, frames
  water: new Acc(),
};
const INTERIOR = new Acc();   // the shell of every shop, lit by its own ceiling
const GLASS = new Acc();
const SHOPGLASS = new Acc();
/* reeded glass — the vertical-fluted screen that is on half the shopfronts in
   a Gulf street. It takes the transom over every shop window: a clear light up
   there would show the ceiling void and the back of the fascia, and a solid
   one would kill the light; reeded is what the detail is actually for. */
const REEDGLASS = new Acc();
const EMIS = new Acc();   // signage, lamp lenses, slit windows
const SHOPEMIS = new Acc();   // the lit rooms behind the shopfronts

/* ------------------------------------------------------- instancing pool */
const INST = {};
const INST_DEF = {};
function defInst(name, geo, opts) { INST_DEF[name] = Object.assign({ geo }, opts || {}); }

/* ------------------------------------------------- scanned-asset routing *
   A kit name can be handed over to one of the photogrammetry models. The call
   sites do not change: they still ask for a `tree` at a matrix, and the router
   substitutes the scan, fits it to the height the procedural part assumed, and
   picks a level of detail from how close the instance stands to a composed
   viewpoint. Everything the district plants is therefore either near enough to
   deserve nine thousand triangles or far enough not to.                     */
const MODEL_ROUTE = {};
/* the near field is not the five bookmarks — it is everywhere you can stand:
   the canopy plaza, the souq spine end to end, the colonnade court and the
   majlis terrace. Anything planted along those gets the full scan. */
const NEARFIELD = (function () {
  const p = [[0, 0], [21, -44], [-40, -30], [40, -20], [150, 235], [-224, 198],
  [-200, 150], [-250, 230], [258, 374], [-120, -60],
  [292, 144], [178, 196], [132, 306], [250, 200], [300, 200]];
  for (let z = 80; z <= 370; z += 34) p.push([4 + (z > 250 ? 26 : 0), z]);
  return p;
})();
const _fitM = new THREE.Matrix4(), _routeM = new THREE.Matrix4(), _routeP = new THREE.Vector3();

function routeModel(kit, model, targetH, opts) {
  const M = MODELS[model];
  if (!M || !M.lods.length) return false;
  opts = opts || {};
  const parts = [];
  for (let li = 0; li < M.lods.length; li++) {
    const k = targetH / Math.max(0.01, M.height);
    const fit = new THREE.Matrix4()
      .makeScale(k, k, k)
      .multiply(new THREE.Matrix4().makeTranslation(0, -(M.base || 0), 0));
    const names = [];
    M.lods[li].forEach((p, pi) => {
      const nm = 'm:' + model + ':' + li + ':' + pi;
      if (!INST_DEF[nm]) {
        const leafy = p.src.alphaTest > 0 || /leaf|leaves|shrub|foliage|plant/i.test(p.src.name || '');
        defInst(nm, p.geo, {
          mat: makeModelMaterial(p.src, leafy),
          shadow: opts.shadow !== false, receive: true,
        });
      }
      names.push(nm);
    });
    parts.push({ fit, names });
  }
  MODEL_ROUTE[kit] = { parts, near: opts.near === undefined ? 62 : opts.near, jitter: opts.jitter !== false };
  return true;
}

/* ------------------------------------------------------------- VARIANTS --
   One kit name, several props, chosen per instance.

   This is the fix for the failure the whole asset programme keeps running
   into: a scan is one object, and one object placed four hundred times is a
   photocopy. It showed on the palms first, then on the benches, and it would
   have shown worst of all on the buildings — a boulevard of the same corner
   block eleven times is not a street, it is a texture.

   `routePropSet` registers N props under one kit name. Every call site stays
   exactly as it was; `inst()` picks a variant from the instance's own world
   position, so the choice is stable across frames and across reloads (the
   whole district is one seeded world and this must not break that), and
   neighbouring instances land on different variants because the hash is on
   position rather than on an incrementing counter. */
function routePropSet(kit, keys, targetH, opts) {
  const vs = [];
  for (const key of keys) {
    const tmp = '__v:' + kit + ':' + key;
    if (routeProp(tmp, key, targetH, opts)) {
      vs.push(MODEL_ROUTE[tmp]);
      delete MODEL_ROUTE[tmp];
    }
  }
  if (!vs.length) return false;
  MODEL_ROUTE[kit] = vs.length === 1 ? vs[0]
    : { variants: vs, near: vs[0].near, jitter: vs[0].jitter };
  return true;
}

/* Register a generated prop under a kit name, sized to what it actually is.
   Meshy normalises every asset to the same bounding box, so `targetH` is the
   real height in metres and everything else follows from it. */
function routeProp(kit, key, targetH, opts) {
  const P = PROPS[key];
  if (!P || !P.parts.length) return false;
  opts = opts || {};
  /* Measured from the geometry that actually loaded, not from the index.
     The index records accessor min/max, which ignores node transforms — and
     an FBX conversion puts all of its scale there, so the golden-hour interior
     was recorded as 0.2 m across. The loader bakes matrixWorld in, so the
     geometry in hand is always right; ask it. */
  const bb = new THREE.Box3();
  const _b1 = new THREE.Box3();
  for (const p of P.parts) {
    p.geo.computeBoundingBox();
    bb.union(_b1.copy(p.geo.boundingBox));
  }
  const gh = Math.max(0.001, bb.max.y - bb.min.y);
  const k = targetH / gh;
  const fit = new THREE.Matrix4().makeScale(k, k, k)
    .multiply(new THREE.Matrix4().makeTranslation(
      -(bb.min.x + bb.max.x) / 2, -bb.min.y, -(bb.min.z + bb.max.z) / 2));
  const level = (list, sfx) => {
    const names = [];
    list.forEach((p, pi) => {
      const nm = 'p:' + key + sfx + ':' + pi;
      if (!INST_DEF[nm]) {
        defInst(nm, p.geo, {
          mat: makeModelMaterial(p.src, !!opts.foliage),
          shadow: opts.shadow !== false, receive: true, cull: opts.cull !== false,
        });
      }
      names.push(nm);
    });
    return { fit, names };
  };
  /* Two levels where the intake produced one. `near` is the radius round the
     walkable core inside which the full asset is used; outside it the far
     level takes over, which is what lets a 240 k-triangle tram and a 40 k
     shrub both exist in the same scene without either compromising. */
  const parts = [level(P.parts, '')];
  if (P.parts1 && P.parts1.length) parts.push(level(P.parts1, '_l1'));
  MODEL_ROUTE[kit] = {
    parts,
    near: opts.near === undefined ? (parts.length > 1 ? 70 : 1e9) : opts.near,
    jitter: opts.jitter !== false,
  };
  return true;
}

/* Split a multi-figure scan into individually placeable people.

   The two people assets are FBX conversions: ten (and five) separate figures,
   each on its own node, Z-up, scattered over hundreds of units of the
   original scene. Routed whole they would place all ten together in the
   arrangement someone happened to leave them in. So each part is taken on its
   own, stood on end if its long axis is Z, re-centred with its feet at the
   origin, and scaled to a real height — after which it is an ordinary kit
   name the dressing pass can place one at a time.

   These are static, so they take the standing and seated roles and the
   procedural figures keep the walking ones, which is the division the work
   was already set up for.                                                  */
function routePersonParts(key, prefix, targetH) {
  const P = PROPS[key];
  if (!P || !P.parts.length) return [];
  const kits = [];
  P.parts.forEach((p, pi) => {
    const g = p.geo.clone();
    g.computeBoundingBox();
    let bb = g.boundingBox;
    if ((bb.max.z - bb.min.z) > (bb.max.y - bb.min.y) * 1.3) {
      g.rotateX(-Math.PI / 2);
      g.computeBoundingBox();
      bb = g.boundingBox;
    }
    const h = bb.max.y - bb.min.y;
    if (h < 1e-4) return;
    g.translate(-(bb.min.x + bb.max.x) / 2, -bb.min.y, -(bb.min.z + bb.max.z) / 2);
    const k = targetH / h;
    g.scale(k, k, k);
    const nm = 'g:' + prefix + pi;
    if (!INST_DEF[nm]) {
      defInst(nm, g, { mat: makeModelMaterial(p.src, false), shadow: true, receive: true });
    }
    MODEL_ROUTE[prefix + pi] = {
      parts: [{ fit: new THREE.Matrix4(), names: [nm] }], near: 1e9, jitter: true,
    };
    kits.push(prefix + pi);
  });
  return kits;
}

/* ------------------------------------------------------ THE SCANNED CROWD *
   The walkers were the last hand-built thing in the near field: tapered drums
   with 7-segment spheres for heads, and at street level a hundred of them read
   as exactly what they are. The scans are real people — 18 k triangles, cloth,
   faces, folds — but they arrived as ten STATIC figures, and a static person
   standing in the middle of a street is a worse error than a crude one
   walking.

   There is no rigging tool available in this project. What there IS, already
   built and already shipping, is a vertex walk cycle driven by a limb tag in
   the fractional part of a per-vertex float:

       .10 left leg   .20 right leg   .30 left arm   .40 right arm

   So the scans get labelled instead of rigged: every vertex is assigned to a
   limb by WHERE IT IS on the body, and the shader that already swings the
   procedural figures' limbs swings these. That is a skin with binary weights,
   which is the crudest possible skin — and the two things that make a binary
   skin tear are handled in the shader rather than here:

     * a vertex AT the hip must not move, or the mesh rips across the pelvis.
       The swing ramps in over the 180 mm below the pivot.
     * a robe is continuous across the centre line, and two legs rotating
       opposite ways would split it up the middle. The swing ramps in over the
       60 mm either side of the centre line, so a thobe's skirt opens and
       closes about a hem that stays whole.

   Neither ramp touches the procedural figures: their limbs are separate drums
   whose tops already sit 260 mm below the pivot, and they use a different
   material. This is additive.

   Three measurements have to be made off the mesh first, because a scan
   arrives in whatever pose and orientation the scanner left it in:

     1. WHICH HORIZONTAL AXIS IS LATERAL. A person is wider across the
        shoulders than they are deep, so the wider extent of the shoulder band
        is the left-right axis. The figure is then rotated so lateral is +X,
        which is what the shader assumes.
     2. WHICH WAY THEY FACE. Toes stick out forward of the ankle and heels do
        not, so the feet's centroid sits forward of the body's. Where it sits
        behind, the figure is turned around. This is the one measurement with
        a real failure mode — a figure standing with its weight back could
        read either way — so it is asserted in `tests/walkcycle_test.mjs`
        rather than trusted.
     3. WHERE THE SHOULDERS ARE. The arm band runs from the hip to the
        shoulder, and an arm is anything in it further out than 55% of the
        widest point. A figure with its arms held tight to its body gets few
        arm vertices and swings its arms less, which is a deliberate failure
        direction: an unswung arm reads as someone carrying something, and a
        wrongly-swung torso reads as a rendering bug.                        */
function tagWalker(g0, targetH) {
  const g = g0.index ? g0.toNonIndexed() : g0.clone();
  g.computeBoundingBox();
  let bb = g.boundingBox;
  // stand it up if the scan is Z-up, as routePersonParts does
  if ((bb.max.z - bb.min.z) > (bb.max.y - bb.min.y) * 1.3) {
    g.rotateX(-Math.PI / 2);
    g.computeBoundingBox();
    bb = g.boundingBox;
  }
  const h0 = bb.max.y - bb.min.y;
  if (h0 < 1e-4) return null;
  g.translate(-(bb.min.x + bb.max.x) / 2, -bb.min.y, -(bb.min.z + bb.max.z) / 2);
  const k = targetH / h0;
  g.scale(k, k, k);

  const p = g.attributes.position;
  const n = p.count;
  const H = targetH;

  /* 1. the lateral axis: the wider extent across the shoulder band */
  let sx0 = 1e9, sx1 = -1e9, sz0 = 1e9, sz1 = -1e9;
  for (let i = 0; i < n; i++) {
    const y = p.getY(i);
    if (y < H * 0.72 || y > H * 0.90) continue;
    const x = p.getX(i), z = p.getZ(i);
    if (x < sx0) sx0 = x; if (x > sx1) sx1 = x;
    if (z < sz0) sz0 = z; if (z > sz1) sz1 = z;
  }
  if (sx1 < sx0) { sx0 = bb.min.x; sx1 = bb.max.x; sz0 = bb.min.z; sz1 = bb.max.z; }
  if ((sz1 - sz0) > (sx1 - sx0)) g.rotateY(Math.PI / 2);   // put lateral on X

  /* 2. facing: the feet's centroid sits forward of the body's */
  let fz = 0, fn = 0, bz = 0;
  for (let i = 0; i < n; i++) {
    const y = p.getY(i);
    bz += p.getZ(i);
    if (y > H * 0.055) continue;
    fz += p.getZ(i); fn++;
  }
  const toe = fn ? (fz / fn) - (bz / n) : 0;
  const flipped = toe < 0;
  if (flipped) g.rotateY(Math.PI);

  /* 3. the bands, and the widest point of the upper body */
  const HIP = 0.92 * (H / 1.72);
  const SHO = 1.40 * (H / 1.72);
  let latMax = 1e-4;
  for (let i = 0; i < n; i++) {
    const y = p.getY(i);
    if (y < H * 0.50 || y > H * 0.92) continue;
    const a = Math.abs(p.getX(i));
    if (a > latMax) latMax = a;
  }
  const ARM_OUT = latMax * 0.55;

  const sa = new Float32Array(n);
  const tally = [0, 0, 0, 0, 0];
  for (let i = 0; i < n; i++) {
    const x = p.getX(i), y = p.getY(i);
    let tag = 0;
    if (y < HIP) {
      // a hanging forearm reaches below the hip; anything that far out is
      // not a leg, and leaving it untagged is better than swinging it wrong
      if (Math.abs(x) < ARM_OUT) tag = x < 0 ? 0.10 : 0.20;
    } else if (y <= SHO && Math.abs(x) > ARM_OUT) {
      tag = x < 0 ? 0.30 : 0.40;
    }
    sa[i] = tag;
    tally[tag === 0 ? 4 : Math.round(tag * 10) - 1]++;
  }
  g.setAttribute('aSurf', new THREE.BufferAttribute(sa, 1));
  if (!g.attributes.uv) g.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(n * 2), 2));
  g.userData.walkTally = tally;      // read by tests/walkcycle_test.mjs
  /* the SIGNED measurement, kept as measured rather than as corrected. The
     gate asserts on its MAGNITUDE: a figure whose feet sit 2 mm forward of its
     body centroid has not told us which way it faces, and a coin toss on that
     is a walker moonwalking down the souq. */
  g.userData.toe = toe;
  g.userData.flipped = flipped;
  return g;
}

/* The same ten scans again, tagged and given the walking material. They are a
   second set of kit names rather than a replacement for the standers: a
   district needs both, and the geometry is the cheap half of a scan. */
function routeWalkerParts(key, prefix, targetH) {
  const P = PROPS[key];
  if (!P || !P.parts.length) return [];
  const kits = [];
  P.parts.forEach((part, pi) => {
    const g = tagWalker(part.geo, targetH);
    if (!g) return;
    const nm = 'w:' + prefix + pi;
    if (!INST_DEF[nm]) {
      defInst(nm, g, {
        mat: makeModelMaterial(part.src, false, true), shadow: true, receive: true,
        cull: false,
      });
    }
    /* deliberately NOT registered in MODEL_ROUTE. A routed kit resolves to a
       different instanced mesh each frame depending on the camera, and the
       walkers are driven by writing a matrix into one known mesh every frame —
       so these are ordinary instance names the life pass can address
       directly. */
    kits.push(nm);
  });
  return kits;
}


/* ====================================================== THE RIGGED CROWD ==
   This replaces the limb-tagging above, and the reason is worth recording
   because it is the second time on this project that the answer was to look
   at what the tool actually returned rather than at what I assumed it did.

   `tagWalker()` exists because there was no rigger. There still is no rigging
   TOOL — `models3d_rig` is named in another tool's description and is not
   exposed, which I checked twice. But the image-to-3D generator returns a
   figure ALREADY RIGGED: every one of these comes back as `model-rigged.glb`
   with a 41-63 joint skeleton, JOINTS_0 and WEIGHTS_0, and smooth weights.

   So the crowd is skinned rather than labelled. What that buys, concretely:

     * no tear. A binary skin rips at the hip and splits a robe up the middle,
       and the two ramps in `tagWalker` are damage control for exactly that.
       A weighted skin deforms, which is what cloth does.
     * knees. A limb tag can rotate a leg about the hip and nothing else; a
       chain can bend the knee, roll the ankle and swing the arm from the
       shoulder AND the elbow. A straight-legged walk is uncanny in a way that
       is hard to name and impossible to miss.
     * the figures keep their own proportions. No pivot heights assumed.

   `tagWalker` stays for the ten-figure people10 scan, which has no skeleton.
   Both crowds walk; only this one bends.

   ---- what has to be worked out, and how -------------------------------

   The joints are named `tripo::Root`, `tripo::0_Left_Limb_0`, `Head_0` and
   then `bone_5` ... `bone_62`. So the names carry almost nothing and the
   skeleton has to be read from its own REST POSE, which is more reliable
   anyway: a bone's rest position on the body says what it is far better than
   a name a generator picked.

     lateral axis   the figure is widest across the shoulders, so the wider
                    horizontal extent of the 0.72-0.90 H band is left-right
     hip / shoulder measured from the bone cloud rather than assumed: the hip
                    line is where the leg chains start and the shoulder line
                    is where the arm chains do
     limbs          a bone below the hip and inboard of the arm line is a leg;
                    one between hip and shoulder and outboard of it is an arm.
                    Sign of the lateral coordinate splits left from right.
     chain order    sort each limb's bones by height, descending. That is
                    hip, knee, ankle, toe — and shoulder, elbow, wrist —
                    without needing the parent hierarchy to be sane.
   ========================================================================== */
const RIGGED = [];        // { name, mesh, height, limbs }
const RIG_INSTANCES = []; // { obj, bones, rest, phase, speed, path, t, lane }

/* Clone a SkinnedMesh so each walker has its own pose.

   three ships SkeletonUtils for this and it is not vendored here; it is also
   thirty lines, and the thirty lines are worth having in the open because the
   subtle part is not the cloning — Object3D.clone() does that — it is that
   the clone's SkinnedMesh still points at the ORIGINAL skeleton's bones. Miss
   the rebind and all 108 walkers share one skeleton and move as one body,
   which looks like a bug in the walk cycle and is not. */
function cloneSkinned(src) {
  const out = src.clone(true);
  const map = new Map();
  const walk = (a, b) => {
    map.set(a.name, b);
    for (let i = 0; i < a.children.length; i++) walk(a.children[i], b.children[i]);
  };
  walk(src, out);
  out.traverse((o) => {
    if (!o.isSkinnedMesh) return;
    const s = o.skeleton;
    const bones = s.bones.map((b) => map.get(b.name) || b);
    o.bind(new THREE.Skeleton(bones, s.boneInverses), o.bindMatrix.clone());
  });
  return out;
}

/* Read a skeleton's rest pose and work out which bones are which. */
function classifyRig(mesh, H) {
  const sk = mesh.skeleton;
  const P = [];
  mesh.updateMatrixWorld(true);
  for (const b of sk.bones) {
    b.updateMatrixWorld(true);
    const v = new THREE.Vector3().setFromMatrixPosition(b.matrixWorld);
    P.push(v);
  }
  /* the lateral axis: the wider horizontal spread of the shoulder band */
  let sx = 0, sz = 0, n = 0;
  for (const v of P) {
    if (v.y < H * 0.66 || v.y > H * 0.92) continue;
    sx = Math.max(sx, Math.abs(v.x)); sz = Math.max(sz, Math.abs(v.z)); n++;
  }
  const lat = (n && sz > sx) ? 'z' : 'x';       // which component is left-right
  const sag = lat === 'x' ? 'z' : 'x';          // and which is front-back
  let latMax = 1e-4;
  for (const v of P) if (v.y > H * 0.45 && v.y < H * 0.92) latMax = Math.max(latMax, Math.abs(v[lat]));

  const HIP = H * 0.55, SHO = H * 0.80, ARM = latMax * 0.42;
  const L = { ll: [], rl: [], la: [], ra: [], spine: [] };
  for (let i = 0; i < P.length; i++) {
    const v = P[i], a = v[lat];
    if (v.y < HIP && Math.abs(a) < latMax * 0.55) (a < 0 ? L.ll : L.rl).push(i);
    else if (v.y >= HIP && v.y <= SHO * 1.06 && Math.abs(a) > ARM) (a < 0 ? L.la : L.ra).push(i);
    else L.spine.push(i);
  }
  // top of each chain first: hip, knee, ankle — shoulder, elbow, wrist
  for (const k of ['ll', 'rl', 'la', 'ra']) L[k].sort((i, j) => P[j].y - P[i].y);
  L.lat = lat; L.sag = sag;
  return L;
}

/* Load every rigged figure once. Called from the district's async build. */
async function loadRiggedPeople(targetH) {
  let names = [];
  try {
    names = await (await fetch('assets/people.json')).json();
  } catch (e) { return []; }
  /* THREE.GLTFLoader does not exist — the loader is the addon import that the
     concatenated module already has in scope, same as the prop loader. The
     old `window.__gltfLoader` fallback was only ever set by the WebGPU app,
     so the WebGL2 build has never loaded a rigged figure. */
  const loader = window.__gltfLoader
    || new GLTFLoader().setMeshoptDecoder(MeshoptDecoder);
  for (const nm of names) {
    try {
      const g = await loader.loadAsync('assets/people/' + nm + '.glb');
      let mesh = null;
      g.scene.traverse((o) => { if (o.isSkinnedMesh && !mesh) mesh = o; });
      if (!mesh) continue;
      g.scene.updateMatrixWorld(true);
      const bb = new THREE.Box3().setFromObject(g.scene);
      const h0 = Math.max(0.001, bb.max.y - bb.min.y);
      const k = targetH / h0;
      /* Scale and re-seat on the ROOT, not on the mesh: a SkinnedMesh ignores
         its own transform for skinning (the bind matrix owns that), so scaling
         the mesh moves the silhouette and not the skin, which produces a
         figure standing in a puddle of its own geometry. */
      g.scene.scale.setScalar(k);
      g.scene.position.y = -bb.min.y * k;
      g.scene.position.x = -(bb.min.x + bb.max.x) / 2 * k;
      g.scene.position.z = -(bb.min.z + bb.max.z) / 2 * k;
      const holder = new THREE.Group();
      holder.add(g.scene);
      holder.updateMatrixWorld(true);
      const limbs = classifyRig(mesh, targetH);
      /* Fold a T-pose down at load. These conversions rest with the arms
         straight out, and the walk cycle only swings about the sagittal
         axis — so a T-pose walks the whole district as a glider. Detected
         off the wrist: in a T it sits at shoulder height, far out on the
         lateral axis. The shoulder is rotated whichever way brings the
         wrist DOWN, and the folded pose becomes the rest pose. */
      for (const chain of [limbs.la, limbs.ra]) {
        if (!chain.length) continue;
        const B2 = mesh.skeleton.bones;
        const tip = B2[chain[chain.length - 1]], sh = B2[chain[0]];
        if (!tip || !sh) continue;
        const tp = new THREE.Vector3().setFromMatrixPosition(tip.matrixWorld);
        const sp = new THREE.Vector3().setFromMatrixPosition(sh.matrixWorld);
        if (tp.y - sp.y < -targetH * 0.14) continue;    // already hangs down
        const ax = new THREE.Vector3(limbs.sag === 'x' ? 1 : 0, 0, limbs.sag === 'z' ? 1 : 0);
        if (sh.parent) {
          const inv = new THREE.Matrix4().copy(sh.parent.matrixWorld).invert();
          ax.transformDirection(inv).normalize();
        }
        const q0 = sh.quaternion.clone();
        let bestY = tp.y, bestQ = q0.clone();
        for (const sgn of [1, -1]) {
          sh.quaternion.copy(q0).multiply(new THREE.Quaternion().setFromAxisAngle(ax, sgn * 1.25));
          holder.updateMatrixWorld(true);
          const y = new THREE.Vector3().setFromMatrixPosition(tip.matrixWorld).y;
          if (y < bestY) { bestY = y; bestQ = sh.quaternion.clone(); }
        }
        sh.quaternion.copy(bestQ);
        holder.updateMatrixWorld(true);
      }
      mesh.frustumCulled = false;
      mesh.castShadow = true; mesh.receiveShadow = true;
      RIGGED.push({ name: nm, obj: holder, mesh, height: targetH, limbs });
    } catch (e) { /* a figure that fails to load simply is not in the crowd */ }
  }
  return RIGGED;
}

/* ---- the walk ---------------------------------------------------------
   Angles in radians, at the phase of the stride. These are read off a human
   gait rather than invented: the hip swings about 25 degrees peak to peak, the
   knee bends only ONE WAY and only in the swing half — a knee that bends
   backwards is the single most common tell in a hand-written walk cycle — the
   ankle rolls a little late, and the arms swing opposed at about two thirds of
   the leg amplitude, from the shoulder AND the elbow. */
const _rq = new THREE.Quaternion();
const _rax = new THREE.Vector3();
const _rm3 = new THREE.Matrix4();

function poseChain(chain, bones, rest, ang, sagAxis) {
  for (let i = 0; i < chain.length && i < ang.length; i++) {
    const b = bones[chain[i]];
    const r = rest[chain[i]];
    if (!b || !ang[i]) { if (b && r) b.quaternion.copy(r); continue; }
    /* rotate about the FIGURE's sagittal axis, expressed in this bone's own
       parent space — the generator's bone frames are arbitrary, so rotating
       about the bone's local X would swing a leg sideways on half of them */
    _rax.set(sagAxis === 'x' ? 1 : 0, 0, sagAxis === 'z' ? 1 : 0);
    if (b.parent) {
      _rm3.copy(b.parent.matrixWorld).invert();
      _rax.transformDirection(_rm3).normalize();
    }
    b.quaternion.copy(r).multiply(_rq.setFromAxisAngle(_rax, ang[i]));
  }
}

function poseWalker(r, ph, stride) {
  const s = Math.sin(ph), c = Math.cos(ph);
  const k = stride;
  const L = r.limbs, B = r.mesh.skeleton.bones, R = r.rest;
  // hip, knee (one way only), ankle
  const kneeL = Math.max(0, -Math.sin(ph + 0.55)) * 0.62 * k;
  const kneeR = Math.max(0, -Math.sin(ph + 0.55 + Math.PI)) * 0.62 * k;
  poseChain(L.ll, B, R, [0.44 * s * k, -kneeL, 0.18 * Math.sin(ph + 1.1) * k], L.sag);
  poseChain(L.rl, B, R, [-0.44 * s * k, -kneeR, -0.18 * Math.sin(ph + 1.1) * k], L.sag);
  // arms, opposed to their own leg, from shoulder and elbow
  poseChain(L.la, B, R, [-0.30 * s * k, -0.26 * (0.55 + 0.45 * c) * k], L.sag);
  poseChain(L.ra, B, R, [0.30 * s * k, -0.26 * (0.55 - 0.45 * c) * k], L.sag);
}

/* Split a furnished scene into individually placeable pieces.

   `ghscene` is a complete residential interior: fifty-four meshes across
   thirty materials — leather and beige-cushioned sofas, marble, a rug,
   curtains, lamps, two indoor trees — inside a shell of FLOOR, ROOF and three
   WALLs. The shell is the one part that is no use: the district already has
   rooms, and what it has never had is furniture in them.

   So the shell is dropped by name and everything else is taken on its own,
   re-centred on its own footprint with its base at zero, and registered under
   its own kit name at whatever real size it already is — this scene is
   modelled to scale, so nothing is resized.                                */
const SHELL = /FLOOR|ROOF|WALL|ROOM|Particles|BezierCurve/i;

function routeSceneParts(key, prefix, opts) {
  const P = PROPS[key];
  if (!P || !P.parts.length) return [];
  opts = opts || {};
  const kits = [];
  const bb = new THREE.Box3();
  P.parts.forEach((p, pi) => {
    if (SHELL.test(p.name || '') || /Window|Curtains|IMAGE|FILL/i.test(p.mat || '')) return;
    const g = p.geo.clone();
    g.computeBoundingBox();
    bb.copy(g.boundingBox);
    const h = bb.max.y - bb.min.y, w = bb.max.x - bb.min.x, d = bb.max.z - bb.min.z;
    // skip the slivers: two-triangle planes and anything the size of a coin
    if (h < 0.05 || Math.max(w, d) < 0.12 || g.index === null) return;
    if (opts.maxH && h > opts.maxH) return;
    g.translate(-(bb.min.x + bb.max.x) / 2, -bb.min.y, -(bb.min.z + bb.max.z) / 2);
    const nm = 'f:' + prefix + pi;
    if (!INST_DEF[nm]) {
      defInst(nm, g, { mat: makeModelMaterial(p.src, false), shadow: true, receive: true });
    }
    MODEL_ROUTE[prefix + pi] = {
      parts: [{ fit: new THREE.Matrix4(), names: [nm] }], near: 1e9, jitter: true,
    };
    kits.push({ kit: prefix + pi, h, w, d });
  });
  return kits;
}


/* a stable per-instance hash off the world position — see routePropSet */
function posHash(x, z) {
  const v = Math.sin(x * 12.9898 + z * 78.233) * 43758.5453;
  return v - Math.floor(v);
}

function inst(name, mtx, colour) {
  let r = MODEL_ROUTE[name];
  if (r && r.variants) {
    _routeP.setFromMatrixPosition(mtx);
    r = r.variants[Math.min(r.variants.length - 1,
      (posHash(_routeP.x, _routeP.z) * r.variants.length) | 0)];
  }
  if (r) {
    _routeP.setFromMatrixPosition(mtx);
    // the scans are one plant each; without a per-instance tint an avenue of
    // them reads as a photocopy. A few percent of warmth either way is enough.
    let c = 0xffffff;
    if (r.jitter) {
      const j = 0.90 + 0.16 * DRNG();
      c = (Math.min(255, (255 * j) | 0) << 16) | (Math.min(255, (255 * (j * 0.99 + 0.01)) | 0) << 8)
        | Math.min(255, (255 * (j * 0.94 + 0.05)) | 0);
    }
    /* BOTH levels are emitted, at the same matrix, and the renderer picks
       between them per tile per frame by distance (see lodUpdate).
       Choosing one at build time — which is what modelLOD did — cannot work:
       a building is near when you stand beside it and far when you do not,
       and the build has no idea where you will be standing. That is why the
       far level had to be switched off entirely when the plan halved, and why
       switching it off cost 275 M triangles in the aerial view. */
    for (let li = 0; li < r.parts.length; li++) {
      const lv = r.parts[li];
      _fitM.multiplyMatrices(mtx, lv.fit);
      const m = _fitM.clone();
      for (const nm of lv.names) inst(nm, m, c);
    }
    return;
  }
  let e = INST[name];
  if (!e) e = INST[name] = { m: [], c: [] };
  e.m.push(mtx);
  e.c.push(colour === undefined ? 0xffffff : colour);
}
/* Instanced props are chunked spatially, and this is the single most
   expensive thing in the renderer if it is not.

   Every prop used to become ONE InstancedMesh holding every copy of itself in
   the district — all 288 street trees in one object, all 1051 cafe chairs in
   another. An InstancedMesh is culled as a unit, and the bounds of a cloud
   spread over 760 x 610 m contain the camera from anywhere inside the plan,
   so nothing was ever rejected: the gate measured 457 M triangles submitted
   every frame, from any viewpoint, most of it behind the viewer.

   Splitting each prop's instances onto a 130 m grid means standing in the
   souq submits the souq's trees and not the ones half a kilometre north. It
   costs draw calls — a few hundred more — which is the cheap side of that
   trade by two orders of magnitude.

   Dynamic kinds are left whole: walkers, birds and jets are rewritten every
   frame through `def.mesh` and move between tiles, so they carry cull=false
   and must stay in one object. */
const INST_TILE = 130;
function flushInstances() {
  const _p = new THREE.Vector3();
  for (const name in INST) {
    const e = INST[name], def = INST_DEF[name];
    if (!def || !e.m.length) continue;
    const mat = def.mat || cityMat;
    const chunked = def.cull !== false;

    // group instance indices by tile, or all into one bucket when dynamic
    const buckets = new Map();
    for (let i = 0; i < e.m.length; i++) {
      let key = 0;
      if (chunked) {
        _p.setFromMatrixPosition(e.m[i]);
        key = (Math.floor(_p.x / INST_TILE) + 512) * 1024 + (Math.floor(_p.z / INST_TILE) + 512);
      }
      let b = buckets.get(key);
      if (!b) buckets.set(key, b = []);
      b.push(i);
    }

    /* '_l1' in a kit name marks the far level. Both levels carry the same
       instances at the same matrices, so a tile's near and far meshes are a
       pair and exactly one of them is visible at a time. */
    const far = name.indexOf('_l1:') >= 0;
    const pairKey = far ? name.replace('_l1:', ':') : name;

    let first = null;
    for (const [key, idx] of buckets) {
      const im = new THREE.InstancedMesh(def.geo, mat, idx.length);
      im.name = buckets.size > 1 ? name + '#' + key : name;
      for (let j = 0; j < idx.length; j++) {
        im.setMatrixAt(j, e.m[idx[j]]);
        _c3.set(e.c[idx[j]]); im.setColorAt(j, _c3);
      }
      im.instanceMatrix.needsUpdate = true;
      if (im.instanceColor) im.instanceColor.needsUpdate = true;
      im.castShadow = def.shadow !== false;
      im.receiveShadow = def.receive !== false;
      im.frustumCulled = chunked;
      if (def.order !== undefined) im.renderOrder = def.order;
      /* the cloud's bounds, not the single prop's. computeBoundingSphere on
         the GEOMETRY describes one chair; the culler needs the extent of the
         chairs actually in this tile, which is what InstancedMesh's own
         version measures. */
      im.geometry.computeBoundingSphere();
      im.computeBoundingSphere();
      cityRoot.add(im);
      if (!first) first = im;

      if (chunked) {
        const pk = pairKey + '#' + key;
        let slot = LOD_PAIRS.get(pk);
        if (!slot) LOD_PAIRS.set(pk, slot = { near: null, far: null, x: 0, z: 0 });
        slot[far ? 'far' : 'near'] = im;
        if (im.boundingSphere) { slot.x = im.boundingSphere.center.x; slot.z = im.boundingSphere.center.z; }
      }
    }
    INSTCOUNT[name] = e.m.length;
    // dynamic kinds are single-bucket, so this is the object they rewrite
    def.mesh = first;
  }
  /* a tile with no far level keeps its near one on for good; everything else
     is decided per frame */
  for (const s of LOD_PAIRS.values()) if (s.far) s.far.visible = false;
  LOD_LIST = [...LOD_PAIRS.values()].filter((s) => s.near && s.far);
}

/* ------------------------------------------------------------ runtime LOD *
   Level of detail is a runtime decision, because a building is near when you
   stand beside it and far when you do not. Choosing at build time — which is
   what modelLOD did — is why the far level had to be abandoned when the plan
   halved, and abandoning it is why the district drew 275 M triangles from the
   air. Both levels of every tile now exist; this picks between them.        */
const LOD_PAIRS = new Map();
let LOD_LIST = [];
const LOD_NEAR = 175;          // metres; beyond this a tile drops to 1/8 detail
function lodUpdate(camPos) {
  const r2 = LOD_NEAR * LOD_NEAR;
  for (let i = 0; i < LOD_LIST.length; i++) {
    const s = LOD_LIST[i];
    const dx = s.x - camPos.x, dz = s.z - camPos.z;
    const near = dx * dx + dz * dz < r2;
    if (s.near.visible !== near) { s.near.visible = near; s.far.visible = !near; }
  }
}

/* helper: give a hand-built geometry the aSurf attribute the city material
   expects, plus a baked vertex shade                                       */
function surfaced(geo, surf, colour, shadeFn) {
  const g = geo.index ? geo.toNonIndexed() : geo;
  const p = g.attributes.position;
  const n = p.count;
  const sa = new Float32Array(n);
  const ca = new Float32Array(n * 3);
  _c3.set(colour === undefined ? 0xffffff : colour);
  for (let i = 0; i < n; i++) {
    sa[i] = surf;
    const s = shadeFn ? shadeFn(p.getX(i), p.getY(i), p.getZ(i)) : 1;
    ca[i * 3] = _c3.r * s; ca[i * 3 + 1] = _c3.g * s; ca[i * 3 + 2] = _c3.b * s;
  }
  g.setAttribute('aSurf', new THREE.BufferAttribute(sa, 1));
  g.setAttribute('color', new THREE.BufferAttribute(ca, 3));
  if (!g.attributes.uv) {
    g.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(n * 2), 2));
  }
  return g;
}

/* combine several geometries into one (for instanced kit-of-parts) */
function combine(list) {
  const a = new Acc();
  for (const it of list) a.add(it.geo, it.mtx || xf(0, 0, 0), it.col, it.surf, it.shade);
  return a.geometry();
}

/* ------------------------------------------------------------ shade bakes *
   Vertex AO. Two cheap analytic terms carry almost all of it: how deep a
   point sits inside a courtyard or street canyon (horizontal occlusion) and
   how close it is to the ground under an overhang (vertical). Shadowed stone
   then reads warm from the ground bounce instead of grey.                  */
const OCC = [];               // occluder boxes used only by the AO bake
const OGRID = new Map();
const OCELL = 32;
function occluder(x, z, hw, hd, h) {
  const b = { x, z, hw, hd, h };
  OCC.push(b);
  const i0 = Math.floor((x - hw - 26) / OCELL), i1 = Math.floor((x + hw + 26) / OCELL);
  const j0 = Math.floor((z - hd - 26) / OCELL), j1 = Math.floor((z + hd + 26) / OCELL);
  for (let i = i0; i <= i1; i++) for (let j = j0; j <= j1; j++) {
    const k = i + ',' + j;
    let a = OGRID.get(k); if (!a) { a = []; OGRID.set(k, a); }
    a.push(b);
  }
}
function skyOcc(x, y, z) {
  const list = OGRID.get(Math.floor(x / OCELL) + ',' + Math.floor(z / OCELL));
  if (!list) return 1;
  let o = 0;
  for (let i = 0; i < list.length; i++) {
    const b = list[i];
    if (b.h <= y + 0.3) continue;
    const dx = Math.max(Math.abs(x - b.x) - b.hw, 0);
    const dz = Math.max(Math.abs(z - b.z) - b.hd, 0);
    const d = Math.hypot(dx, dz);
    if (d > 26) continue;
    const rise = b.h - y;
    o += clamp(rise / (rise + d * 1.4 + 1), 0, 1) * Math.exp(-d / 13);
  }
  return clamp(1 - o * 0.30, 0.50, 1);
}
// ground-contact darkening for anything standing on paving
const contact = (y) => 0.62 + 0.38 * sstep(0, 2.4, y);

/* ============================================================== GROUND ==
   A designed edge, not a fogged one: district paving inside the ring road,
   a graded desert apron beyond it, and a low outlying fabric of existing
   town that thins into the haze exactly as it does in the aerial render.  */
function buildGround() {
  const B = PLAN.bounds;
  const a = ACC.ground;
  /* The desert apron. It used to be a 3.8 km plane at 63 m per quad carrying
     one sine wave, which from the air is a sheet of mud: no landform, no
     colour, and a hard edge where it stopped. It is now 5.2 km at 26 m per
     quad, and its height is three things at three scales —

       barchan   wind-aligned crescent dunes, the shape that actually forms
                 on this coast, ridged along the prevailing WSW and asymmetric
                 across it, so the light catches a bright windward face and
                 leaves a long slip-face shadow;
       swell     a slow two-kilometre rise and fall that keeps the horizon
                 from being a ruled line;
       grain     fine fbm, only where the dunes already are.

     Everything is faded out toward the district by the same distance ramp, so
     the ground the walker stands on stays the flat sabkha it has to be. */
  const AP = 5200, SEG = 200;
  const gp = new THREE.PlaneGeometry(AP, AP, SEG, SEG);
  gp.rotateX(-Math.PI / 2);
  const pos = gp.attributes.position;
  // the prevailing wind, WSW: dune crests run across it
  const WX = 0.9239, WZ = 0.3827;
  const duneAt = (x, z) => {
    const along = x * WX + z * WZ;      // downwind
    const across = -x * WZ + z * WX;    // along the crest line
    // crest lines meander instead of running dead straight
    const wander = 62 * fbm(across * 0.00085 + 13, along * 0.00042 - 7, 3);
    const u = (along + wander) / 210;
    const ph = u - Math.floor(u);
    /* a barchan section: a long windward ramp to the crest at 0.72, then a
       short steep slip face. Squaring the ramp keeps the toe flat. */
    const prof = ph < 0.72 ? Math.pow(ph / 0.72, 1.7) : 1 - Math.pow((ph - 0.72) / 0.28, 0.85);
    // dune fields are patchy: some corridors are bare sabkha
    const field = sstep(0.34, 0.66, fbm(x * 0.00046 - 31, z * 0.00046 + 19, 3));
    return prof * field;
  };
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i), z = pos.getZ(i) + 220;
    pos.setZ(i, z);
    const d = Math.max(Math.abs(x) - 430, Math.abs(z - 220) - 460);
    const out = sstep(20, 700, d);          // how far into the open desert
    const far = sstep(300, 1900, d);        // the big dunes are only far out
    const dune = (3.0 + 6.0 * far) * duneAt(x, z) * out;
    const swell = 2.6 * fbm(x * 0.00052 + 5, z * 0.00052, 3) * far;
    const grain = 1.1 * fbm(x * 0.0075 + 41, z * 0.0075 - 12, 3) * out;
    pos.setY(i, terrainY(x, z) - 0.06 + dune + swell + grain);
  }
  {
    const ix = [], SN = SEG + 1;
    for (let j = 0; j < SEG; j++) for (let i = 0; i < SEG; i++) {
      const k = j * SN + i;
      const cxp = (pos.getX(k) + pos.getX(k + SN + 1)) / 2;
      const czp = (pos.getZ(k) + pos.getZ(k + SN + 1)) / 2;
      if (inHole(cxp, czp)) continue;
      ix.push(k, k + SN, k + 1, k + 1, k + SN, k + SN + 1);
    }
    gp.setIndex(ix);
  }
  gp.computeVertexNormals();
  const gpp = gp.attributes.position;
  const sand = new Acc();
  {
    const g2 = gp;
    const cnt = gpp.count;
    const sa = new Float32Array(cnt), ca = new Float32Array(cnt * 3);
    /* Three ground types, not one. Eastern Province desert is a mosaic: pale
       salt sabkha where the water table is near, warm aeolian sand where it
       has drifted, and dark gravel serir scoured between them. One tone over
       five kilometres is what made the aerial read as mud. */
    const SABKHA = [0.86, 0.83, 0.75], SANDC = [0.76, 0.62, 0.40], SERIR = [0.48, 0.42, 0.33];
    for (let i = 0; i < cnt; i++) {
      sa[i] = S.SAND;
      const x = gpp.getX(i), y = gpp.getY(i), z = gpp.getZ(i);
      const d = Math.max(Math.abs(x) - 430, Math.abs(z - 220) - 460);
      // which of the three, chosen by a slow field and reinforced by height:
      // sand piles up, sabkha sits in the hollows, gravel is the flat between
      const t = fbm(x * 0.00062 + 88, z * 0.00062 - 41, 4);
      const lift = clamp((y - terrainY(x, z)) / 14, 0, 1);
      const wSand = clamp(sstep(0.48, 0.66, t) + lift * 0.8, 0, 1);
      const wSab = clamp(sstep(0.46, 0.22, t) * (1 - lift), 0, 1);
      let r = mix(mix(SERIR[0], SABKHA[0], wSab), SANDC[0], wSand);
      let g = mix(mix(SERIR[1], SABKHA[1], wSab), SANDC[1], wSand);
      let b = mix(mix(SERIR[2], SABKHA[2], wSab), SANDC[2], wSand);
      // scrub stipple: sparse grey-green in the gravel corridors only
      const scrub = sstep(0.63, 0.80, fbm(x * 0.011 - 5, z * 0.011 + 3, 3)) * (1 - wSand) * 0.5;
      r = mix(r, 0.30, scrub); g = mix(g, 0.32, scrub); b = mix(b, 0.22, scrub);
      // fine tonal break-up, and a slow darkening in toward the district so
      // the paved slab does not sit on a lighter ring
      const s = 0.90 + 0.16 * fbm(x * 0.019, z * 0.019, 2) - 0.09 * sstep(600, 0, d);
      ca[i * 3] = r * s; ca[i * 3 + 1] = g * s; ca[i * 3 + 2] = b * s;
    }
    g2.setAttribute('aSurf', new THREE.BufferAttribute(sa, 1));
    g2.setAttribute('color', new THREE.BufferAttribute(ca, 3));
    const m = addMesh(g2, cityMat, false);
    m.receiveShadow = true;
  }

  // district ground slab: paved, slightly proud of the sand
  paved(a, B.x0 + 30, B.z0 + 30, B.x1 - 30, B.z1 - 30, 0.06, K.travDk, 0.86);
}

/* Water bodies are registered before any paving is laid, and the paver skips
   every cell that falls inside one. That is what makes a channel a channel
   and not a blue rectangle buried under the pavement.                     */
const HOLES = [];
function hole(x0, z0, x1, z1) {
  HOLES.push({ x0: Math.min(x0, x1) - 0.2, x1: Math.max(x0, x1) + 0.2,
    z0: Math.min(z0, z1) - 0.2, z1: Math.max(z0, z1) + 0.2 });
}
function inHole(x, z) {
  for (let i = 0; i < HOLES.length; i++) {
    const h = HOLES[i];
    if (x > h.x0 && x < h.x1 && z > h.z0 && z < h.z1) return true;
  }
  return false;
}

/* a paved rectangle that follows the terrain, subdivided so it can take a
   baked gradient rather than one flat tone */
function paved(a, x0, z0, x1, z1, y, colour, shade, surf) {
  const nx = Math.max(2, Math.round((x1 - x0) / 6)) + 1;
  const nz = Math.max(2, Math.round((z1 - z0) / 6)) + 1;
  const pts = [];
  for (let j = 0; j < nz; j++) {
    for (let i = 0; i < nx; i++) {
      const X = mix(x0, x1, i / (nx - 1)), Z = mix(z0, z1, j / (nz - 1));
      pts.push([X, terrainY(X, Z) + y, Z]);
    }
  }
  /* A cell that straddles a channel edge is subdivided rather than dropped:
     without this the 6 m paving grid cuts a 6 m trench for a 5 m channel and
     leaves a raw hole beside every pool. */
  const idx = [];
  const extra = [];
  const cellW = (x1 - x0) / (nx - 1), cellD = (z1 - z0) / (nz - 1);
  for (let j = 0; j < nz - 1; j++) {
    for (let i = 0; i < nx - 1; i++) {
      const ax = mix(x0, x1, i / (nx - 1)), az = mix(z0, z1, j / (nz - 1));
      let inside = 0;
      for (let cy = 0; cy <= 1; cy++) for (let cxi = 0; cxi <= 1; cxi++) {
        if (inHole(ax + cxi * cellW, az + cy * cellD)) inside++;
      }
      if (inside === 4) continue;
      if (inside === 0) {
        const k = j * nx + i;
        idx.push(k, k + nx, k + 1, k + 1, k + nx, k + nx + 1);
        continue;
      }
      // partial: lay a 6x6 sub-grid over this cell and keep what survives
      const SUB = 6;
      const base = pts.length;
      for (let sj = 0; sj <= SUB; sj++) for (let si = 0; si <= SUB; si++) {
        const X = ax + cellW * si / SUB, Z = az + cellD * sj / SUB;
        pts.push([X, terrainY(X, Z) + y, Z]);
      }
      for (let sj = 0; sj < SUB; sj++) for (let si = 0; si < SUB; si++) {
        const mx = ax + cellW * (si + 0.5) / SUB, mz = az + cellD * (sj + 0.5) / SUB;
        if (inHole(mx, mz)) continue;
        const k = base + sj * (SUB + 1) + si;
        extra.push(k, k + SUB + 1, k + 1, k + 1, k + SUB + 1, k + SUB + 2);
      }
    }
  }
  for (const e of extra) idx.push(e);
  if (!idx.length) return null;
  const gg = new THREE.BufferGeometry();
  const arr = new Float32Array(pts.length * 3);
  const uvs = new Float32Array(pts.length * 2);
  for (let i = 0; i < pts.length; i++) {
    arr[i * 3] = pts[i][0]; arr[i * 3 + 1] = pts[i][1]; arr[i * 3 + 2] = pts[i][2];
    uvs[i * 2] = pts[i][0] * 0.1; uvs[i * 2 + 1] = pts[i][2] * 0.1;
  }
  gg.setAttribute('position', new THREE.BufferAttribute(arr, 3));
  gg.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
  gg.setIndex(idx);
  gg.computeVertexNormals();
  const base = a.n;
  a.add(gg, xf(0, 0, 0), colour, surf === undefined ? S.PAVING : surf, 1);
  for (let i = 0; i < pts.length; i++) {
    const k = (base + i) * 3;
    const s = (shade === undefined ? 1 : shade) * skyOcc(pts[i][0], pts[i][1], pts[i][2]);
    a.col[k] *= s; a.col[k + 1] *= s; a.col[k + 2] *= s;
  }
  return gg;
}

/* ============================================================== STREETS == */
function buildRoads() {
  const a = ACC.ground;
  for (const r of ROADS) {
    const [x0, z0, x1, z1, w, kind] = r;
    const dx = x1 - x0, dz = z1 - z0;
    const len = Math.hypot(dx, dz);
    const ang = Math.atan2(dx, dz);
    const col = kind === 0 ? 0x4a463f : kind === 2 ? 0x565049 : K.travDk;
    const srf = kind === 1 ? S.PAVING : S.ASPHALT;
    // carriageway
    stripe(a, x0, z0, x1, z1, w, 0.10, col, srf, 0.80);
    if (kind === 0) {
      // kerbs and footways either side
      const nx = dz / len, nz = -dx / len;
      for (const s of [-1, 1]) {
        const ox = nx * (w / 2 + 3.4) * s, oz = nz * (w / 2 + 3.4) * s;
        stripe(a, x0 + ox, z0 + oz, x1 + ox, z1 + oz, 6.6, 0.30, K.travert, S.PAVING, 0.94);
        const kx = nx * (w / 2 + 0.16) * s, kz = nz * (w / 2 + 0.16) * s;
        stripe(a, x0 + kx, z0 + kz, x1 + kx, z1 + kz, 0.34, 0.32, K.whiteDk, S.CONCRETE, 0.92);
      }
      // centre line, dashed
      const n = Math.floor(len / 11);
      for (let i = 0; i < n; i++) {
        const t0 = (i + 0.28) / n, t1 = (i + 0.72) / n;
        stripe(a, x0 + dx * t0, z0 + dz * t0, x0 + dx * t1, z0 + dz * t1, 0.24, 0.115, 0xd6cdb4, S.CONCRETE, 0.9);
      }
      // drainage gullies at intervals
      for (let i = 0; i < n; i += 3) {
        const t = (i + 0.5) / n;
        for (const s of [-1, 1]) {
          const px = x0 + dx * t + nx * (w / 2 - 0.3) * s, pz = z0 + dz * t + nz * (w / 2 - 0.3) * s;
          inst('gully', xf(px, terrainY(px, pz) + 0.11, pz, ang), 0x2a2a28);
        }
      }
    }
  }
  // the pedestrian souq spine — laid as flags, not asphalt
  stripe(a, PLAN.spineX, PLAN.souq.z0 - 16, PLAN.spineX, PLAN.souq.z1 + 26, 15, 0.14, K.travert, S.PAVING, 1.0);
  // plaza deck
  paved(a, PLAN.plaza.x0, PLAN.plaza.z0, PLAN.plaza.x1, PLAN.plaza.z1, 0.16, K.travert, 1.0);
  platform(PLAN.plaza.x0, PLAN.plaza.z0, PLAN.plaza.x1, PLAN.plaza.z1, 0.16);
}

function stripe(a, x0, z0, x1, z1, w, y, colour, surf, shade) {
  const dx = x1 - x0, dz = z1 - z0;
  const len = Math.hypot(dx, dz);
  const ang = Math.atan2(dx, dz);
  const seg = Math.max(1, Math.round(len / 14));
  const g = new THREE.PlaneGeometry(w, len, 1, seg);
  g.rotateX(-Math.PI / 2);
  const p = g.attributes.position;
  const ca = (x0 + x1) / 2, cz = (z0 + z1) / 2;
  const cs = Math.cos(ang), sn = Math.sin(ang);
  const arr = [];
  for (let i = 0; i < p.count; i++) {
    const lx = p.getX(i), lz = p.getZ(i);
    const X = ca + lx * cs + lz * sn;
    const Z = cz - lx * sn + lz * cs;
    arr.push([X, terrainY(X, Z) + y, Z]);
  }
  const gg = new THREE.BufferGeometry();
  const fa = new Float32Array(arr.length * 3);
  for (let i = 0; i < arr.length; i++) { fa[i * 3] = arr[i][0]; fa[i * 3 + 1] = arr[i][1]; fa[i * 3 + 2] = arr[i][2]; }
  gg.setAttribute('position', new THREE.BufferAttribute(fa, 3));
  gg.setAttribute('uv', g.attributes.uv);
  gg.setIndex(g.index);
  gg.computeVertexNormals();
  const base = a.n;
  a.add(gg, xf(0, 0, 0), colour, surf, 1);
  for (let i = 0; i < arr.length; i++) {
    const k = (base + i) * 3;
    const s = (shade === undefined ? 1 : shade) * skyOcc(arr[i][0], arr[i][1], arr[i][2]);
    a.col[k] *= s; a.col[k + 1] *= s; a.col[k + 2] *= s;
  }
}

/* ================================================================ WATER ==
   A teal channel threading the whole plan with bridges where the streets
   cross it, plus the courtyard pool and the sail-court basin. One animated
   shader for all of them.                                                 */
const WATERBODIES = [];
/* every water surface, so the mirror pass can hide them: water sampling the
   target it is being drawn into is a feedback loop */
const WATERMESHES = [];
function water(x0, z0, x1, z1, y, depth, flow) {
  WATERBODIES.push({ x0: Math.min(x0, x1), x1: Math.max(x0, x1), z0: Math.min(z0, z1), z1: Math.max(z0, z1), y, depth: depth || 0.5, flow: flow || 0 });
}

/* ============================================================== THE WATER ==
   Rebuilt. The old shader was a tinted plane with a mirror on it: three
   isotropic noise fields, a normal that was the difference of two of them
   rather than the gradient of any of them, no depth, no refraction, no foam,
   and ripples at 0.6 / 0.28 / 0.12 m — swells, in a three-metre rill. It read
   as coloured glass, which is what the client saw and said.

   What actually makes water read as water, in the order the eye notices:

   1. YOU CAN SEE THE BOTTOM, AND IT IS IN THE WRONG PLACE. Refraction at the
      surface bends the view ray by about 30 degrees at a walking eye height,
      so the tank floor is visibly displaced and it MOVES with the ripples.
      This is the single strongest cue and the old shader had none of it.
   2. THE COLOUR IS PATH LENGTH, NOT PAINT. Water absorbs red about ten times
      faster than blue, so the tint deepens with the distance the light travels
      through it — pale at the coping, saturated across the middle, and darker
      again where the ray runs the long way along the channel. Beer-Lambert,
      one exponential, and it is what makes a pool look wet rather than teal.
   3. CAUSTICS. The floor is lit through a lens that is moving. This is not
      decoration — a pool without caustics reads as a photograph of a pool.
   4. FRESNEL, DONE PROPERLY. Schlick with F0 = 0.02: near-total reflection at
      grazing, near-total transmission looking down. The old one was
      `fres*1.9 + 0.20 + 0.30*(1-flow)`, a fudge that made every pool a mirror
      from every angle.
   5. FOAM at the edge, because water wets a wall and holds a meniscus there.

   ---- the model ------------------------------------------------------------

   Six directional waves at REAL sizes and REAL speeds. Deep-water dispersion
   is c = sqrt(g*L/2pi), so the long waves outrun the short ones and the
   pattern never repeats — using one speed for all of them is the other thing
   that makes procedural water read as a texture sliding under a plane.

     1.10 m at 1.31 m/s      the wind swell, open pools only
     0.62 m at 0.98
     0.42 m at 0.81          the chop you actually see in a channel
     0.235 m at 0.61
     0.155 m at 0.49
     0.052 m at 0.29         the capillary glitter that catches the sun

   Because they are sines, the height, the SLOPE and the CURVATURE are all
   available in closed form from the same six evaluations. The slope gives the
   normal exactly — no central difference, no epsilon to tune — and the
   curvature gives the caustics, because focusing IS curvature. Getting both
   for free is the whole reason this is sines and not noise.

   Every train is band-limited by the pixel footprint on the same principle as
   the surface law: a 52 mm ripple seen from forty metres is under a pixel, and
   point-sampling it is the sparkle that makes distant water look like tinfoil.

   ---- opaque, and why ------------------------------------------------------

   The water writes depth and does not blend. That is the decided transparency
   rule and it falls out of the model rather than being imposed on it: the
   surface computes what is underneath it analytically — the tank floor, the
   tank walls, their tile, their caustics, their extinction — so there is
   nothing left for the framebuffer to contribute. One less sorted surface, no
   ordering against the glass, and refraction that a blended pass cannot do at
   all without a second full-scene target.

   What it costs: real geometry below the surface is replaced by the analytic
   tank. In this district that is four flat tank boxes and the submerged 750 mm
   of the fountain plinth, which is not visible through moving water anyway.
   ========================================================================== */
const waterMat = MATERIALS && MATERIALS.water ? MATERIALS.water({}) : new THREE.ShaderMaterial({
  transparent: false,
  uniforms: {
    uTime: { value: 0 }, uSun: { value: CSUN.clone() },
    /* absorption per metre, linear RGB. Clean water: red goes first, which is
       why a metre of it is blue-green and ten metres of it is blue. */
    uAbsorb: { value: new THREE.Vector3(0.72, 0.10, 0.07) },
    /* the light the body scatters back out of itself, which is what makes a
       shallow pool glow rather than just darken */
    uScatter: { value: C(0x38a89e) },
    uTank: { value: C(0x2c4e48) }, uGrout: { value: C(0x162c2c) },
    uFoam: { value: C(0xe8f2f2) },
    uSky: { value: C(0x7c8fc4) }, uWarm: { value: C(0xffc98a) },
    uFogColor: { value: C(0x62789f) }, uFogWarm: { value: C(0xe6bd92) }, uFogD: { value: CITY_FOG },
    uRefl: { value: null }, uReflMtx: { value: new THREE.Matrix4() },
    uReflOn: { value: 0 }, uReflY: { value: 0 },
  },
  vertexShader: `
    varying vec3 vW; varying vec4 vRP; varying float vFlow;
    varying vec4 vTank; varying vec2 vShape;
    attribute float aFlow;
    attribute vec4 aTank;      // cx, cz, halfX, halfZ  (halfX == halfZ for a disc)
    attribute vec2 aShape;     // shape (0 box, 1 disc), depth in metres
    uniform mat4 uReflMtx;
    void main(){
      vec4 wp = modelMatrix*vec4(position,1.0);
      vW = wp.xyz; vFlow = aFlow; vTank = aTank; vShape = aShape;
      vRP = uReflMtx * wp;
      gl_Position = projectionMatrix*viewMatrix*wp;
    }`,
  fragmentShader: `
    precision highp float;
    varying vec3 vW; varying vec4 vRP; varying float vFlow;
    varying vec4 vTank; varying vec2 vShape;
    uniform float uTime,uFogD,uReflOn,uReflY;
    uniform vec3 uSun,uAbsorb,uScatter,uTank,uGrout,uFoam,uSky,uWarm,uFogColor,uFogWarm;
    uniform sampler2D uRefl;

    float h21(vec2 p){ vec3 q=fract(vec3(p.xyx)*0.1031); q+=dot(q,q.yzx+33.33); return fract((q.x+q.y)*q.z); }
    float vn(vec2 p){ vec2 i=floor(p),f=fract(p); f=f*f*(3.0-2.0*f);
      return mix(mix(h21(i),h21(i+vec2(1,0)),f.x),mix(h21(i+vec2(0,1)),h21(i+vec2(1,1)),f.x),f.y); }

    /* wavelength, amplitude, direction, and the deep-water speed that follows
       from the wavelength — c = sqrt(g L / 2pi). The last column is how much
       of the train survives on a still tank versus a moving channel. */
    const int NW = 6;
    const vec4 WD[NW] = vec4[NW](            // dir.xy, wavelength, amplitude
      vec4( 0.92,  0.39, 1.100, 0.0180),
      vec4( 0.55, -0.84, 0.620, 0.0100),
      vec4(-0.79,  0.61, 0.420, 0.0072),
      vec4( 0.33,  0.94, 0.235, 0.0034),
      vec4(-0.97, -0.24, 0.155, 0.0021),
      vec4( 0.71, -0.70, 0.052, 0.00055));

    /* height, slope and curvature of the surface at p, all from the same six
       evaluations. fp is the pixel footprint in metres: a train shorter than
       the pixel is faded to nothing, which is the difference between distant
       water and distant tinfoil. */
    void waves(vec2 p, float fp, float flow, float t, out float h, out vec2 grad, out float lap) {
      h = 0.0; grad = vec2(0.0); lap = 0.0;
      /* a channel drifts; a tank does not. The drift is a translation of the
         whole field, so it does not change the wave shapes, only where they
         are — which is what a current does. */
      vec2 drift = vec2(0.0, -t * 0.42 * flow);
      for (int i = 0; i < NW; i++) {
        vec2 d = WD[i].xy;
        float L = WD[i].z;
        float k = 6.2831853 / L;
        float c = sqrt(9.81 * L * 0.159155);          // deep-water phase speed
        // the long swells are wind-driven and a sheltered tank has less of them
        float still = mix(mix(0.42, 1.0, flow), 1.0, clamp(0.30 / L, 0.0, 1.0));
        float a = WD[i].w * still * (1.0 - smoothstep(L * 0.30, L * 0.85, fp));
        if (a < 1e-5) continue;
        float ph = dot(p + drift, d) * k - t * c * k;
        /* the irregular part: without it six sines are a corrugated sheet.
           One slow noise field warps the phase, which is cheap and is what
           breaks the lattice. */
        ph += vn(p * (0.7 / L) + t * 0.05) * 2.4;
        float s = sin(ph), co = cos(ph);
        h    += a * s;
        grad += a * k * co * d;
        lap  -= a * k * k * s;
      }
    }

    /* the tank floor: dark glazed tile, 550 mm, with grout and a wash of dirt */
    vec3 tankFloor(vec2 p) {
      vec2 f = abs(fract(p / 0.55) - 0.5);
      float grout = smoothstep(0.44, 0.48, max(f.x, f.y));
      vec3 c = mix(uTank, uGrout, grout);
      c *= 0.80 + 0.30 * vn(p * 2.1);
      c *= 0.86 + 0.22 * vn(p * 0.37);          // the uneven staining of a tank
      return c;
    }

    void main(){
      vec2 p = vW.xz;
      float t = uTime;
      vec3 Vd = normalize(cameraPosition - vW);
      float dist = length(cameraPosition - vW);

      /* the pixel footprint on the surface, in metres — the same measurement
         the surface law uses, and needed here for the same reason */
      vec3 fdx = dFdx(vW), fdy = dFdy(vW);
      float fp = max(length(fdx), length(fdy));

      float h; vec2 grad; float lap;
      waves(p, fp, vFlow, t, h, grad, lap);
      vec3 N = normalize(vec3(-grad.x, 1.0, -grad.y));

      // ---- the tank, and where the refracted ray meets it -----------------
      float depth = max(vShape.y, 0.05);
      float yFloor = vW.y - depth;
      vec3 R = refract(-Vd, N, 1.0 / 1.333);
      // total internal reflection cannot happen entering a denser medium, but
      // a degenerate normal can still produce a zero vector
      if (dot(R, R) < 0.5) R = vec3(0.0, -1.0, 0.0);
      R = normalize(R);
      float tF = R.y < -1e-4 ? (yFloor - vW.y) / R.y : 1e9;
      // the tank walls, so a ray running down the channel stops at the end
      vec2 c2 = vTank.xy, hx = vTank.zw;
      float tS = 1e9;
      if (vShape.x > 0.5) {
        vec2 o = p - c2;
        float A = dot(R.xz, R.xz), B = dot(o, R.xz), Cq = dot(o, o) - hx.x * hx.x;
        float disc = B * B - A * Cq;
        if (A > 1e-6 && disc > 0.0) tS = (-B + sqrt(disc)) / A;
      } else {
        if (abs(R.x) > 1e-4) {
          float d = ((R.x > 0.0 ? c2.x + hx.x : c2.x - hx.x) - p.x) / R.x;
          if (d > 0.0) tS = min(tS, d);
        }
        if (abs(R.z) > 1e-4) {
          float d = ((R.z > 0.0 ? c2.y + hx.y : c2.y - hx.y) - p.y) / R.z;
          if (d > 0.0) tS = min(tS, d);
        }
      }
      float tHit = max(0.02, min(tF, tS));
      vec3 Pb = vW + R * tHit;
      bool onFloor = tF <= tS;

      /* caustics: focusing is curvature, and the curvature is already in hand.
         Sampled where the SUN's refracted ray would have crossed the surface,
         not under the fragment, which is what makes the pattern lie along the
         light rather than under the eye. */
      float caust = 0.0;
      if (onFloor) {
        vec3 Sd = normalize(uSun);
        vec2 back = Pb.xz - Sd.xz / max(Sd.y, 0.25) * depth * 0.75;
        float hb; vec2 gb; float lb;
        waves(back, fp, vFlow, t, hb, gb, lb);
        caust = pow(max(lb * 0.020, 0.0), 1.6) * 2.6;
      }

      /* Beer-Lambert over the real path: down through the water and back out.
         The the + depth is the sun's own leg, which is why a deep tank is dark
         even where you are looking straight down into it. */
      float path = tHit + depth * 0.9;
      vec3 trans = exp(-uAbsorb * path);
      vec3 below = (onFloor ? tankFloor(Pb.xz) * (1.0 + caust * 1.8)
                            : mix(uTank, vec3(0.42, 0.40, 0.35), 0.5) * 0.9);
      vec3 through = below * trans + uScatter * (1.0 - trans) * 0.55;

      // ---- the surface ----------------------------------------------------
      float cosT = clamp(dot(N, Vd), 0.0, 1.0);
      float F = 0.02 + 0.98 * pow(1.0 - cosT, 5.0);      // Schlick, water F0

      vec3 skyish = mix(uSky, uFogColor, 0.25);
      vec3 mirror = skyish;
      float ok = 0.0;
      if (uReflOn > 0.5 && vRP.w > 0.0) {
        /* the ripple displaces the projected lookup, scaled down with distance
           so the far end of a 630 m channel does not smear — a metre of
           displacement is a whole reflected tower at fifty metres and
           invisible at two */
        float wob = 0.030 / (1.0 + dist * 0.16);
        vec2 ruv = (vRP.xy / vRP.w) + vec2(N.x, N.z) * wob;
        vec2 edge = smoothstep(vec2(0.0), vec2(0.03), ruv)
                  * (1.0 - smoothstep(vec2(0.97), vec2(1.0), ruv));
        ok = edge.x * edge.y;
        mirror = mix(skyish, texture2D(uRefl, clamp(ruv, 0.002, 0.998)).rgb, ok);
      }
      vec3 col = mix(through, mirror, F);

      // ---- foam at the wall ------------------------------------------------
      float d2e = vShape.x > 0.5 ? hx.x - length(p - c2)
                                 : min(hx.x - abs(p.x - c2.x), hx.y - abs(p.y - c2.y));
      float fw = 0.11 + 0.05 * vn(p * 6.5 + vec2(0.0, t * 0.25));
      float foam = smoothstep(fw, 0.0, d2e) * (0.45 + 0.55 * vn(p * 11.0 - vec2(t * 0.4, 0.0)));
      foam *= 1.0 - smoothstep(0.0, 0.9, fp);      // it is not visible at range
      col = mix(col, uFoam, clamp(foam, 0.0, 0.72));

      // ---- the sun on it ---------------------------------------------------
      vec3 H = normalize(normalize(uSun) + Vd);
      float ndh = max(dot(N, H), 0.0);
      col += uWarm * pow(ndh, 380.0) * 3.4;        // the glint
      col += uWarm * pow(ndh, 22.0) * 0.10;        // the sheen around it

      float fog = 1.0 - exp(-uFogD*uFogD*dist*dist);
      vec3 fd = normalize(vW - cameraPosition);
      col = mix(col, mix(uFogColor, uFogWarm, pow(max(dot(fd, normalize(uSun)), 0.0), 1.8)), fog);
      gl_FragColor = vec4(col, 1.0);
    }`,
});

/* Describe a water plane's own tank to the shader. Every body needs the same
   four things and they used to be either absent or hard-coded: which way it
   flows, how deep it is, whether it is a box or a disc, and where its walls
   are. They ride as vertex attributes rather than uniforms because all four
   bodies share one material and one draw call each — a uniform would mean four
   materials, four programs and four reflection wirings. */
function waterAttrs(g, flow, depth, shape, cx, cz, hx, hz) {
  const n = g.attributes.position.count;
  const fl = new Float32Array(n); fl.fill(flow);
  const tk = new Float32Array(n * 4);
  const sh = new Float32Array(n * 2);
  for (let i = 0; i < n; i++) {
    tk[i * 4] = cx; tk[i * 4 + 1] = cz; tk[i * 4 + 2] = hx; tk[i * 4 + 3] = hz;
    sh[i * 2] = shape; sh[i * 2 + 1] = depth;
  }
  g.setAttribute('aFlow', new THREE.BufferAttribute(fl, 1));
  g.setAttribute('aTank', new THREE.BufferAttribute(tk, 4));
  g.setAttribute('aShape', new THREE.BufferAttribute(sh, 2));
  return g;
}

const WATER_RUNS = (function () {
  const R = [
    [PLAN.water.x, -70, PLAN.water.x, 560, PLAN.water.w, 1],   // the main channel
    [PLAN.water.x, 250, 268, 250, 4.6, 1],                     // the eastern branch
  ];
  /* The signature of the reference aerials is not one channel down the middle
     — it is a turquoise rill tracing every public edge, in runs that stop short
     of each other so you can always walk between them. Four of them frame the
     canopy plaza, broken either side of the souq's own axis. */
  const P = PLAN.plaza, sp = PLAN.spineX;
  for (const sx of [-1, 1]) R.push([sx * 118, P.z0 - 6, sx * 118, P.z1 + 6, 3.0, 1]);
  for (const z of [P.z0 - 2, P.z1 + 6]) {
    R.push([-96, z, sp - 11, z, 3.0, 1]);
    R.push([sp + 11, z, 96, z, 3.0, 1]);
  }
  return R;
})();
/* registered first, so every paver and the desert apron cut round them */
function planWater() {
  for (const r of WATER_RUNS) {
    const hw = r[4] / 2;
    hole(Math.min(r[0], r[2]) - hw, Math.min(r[1], r[3]) - (r[0] === r[2] ? 0 : hw),
      Math.max(r[0], r[2]) + hw, Math.max(r[1], r[3]) + (r[0] === r[2] ? 0 : hw));
  }
  hole(PLAN.courtPool.x0, PLAN.courtPool.z0, PLAN.courtPool.x1, PLAN.courtPool.z1);
  hole(PLAN.sailPool.x0, PLAN.sailPool.z0, PLAN.sailPool.x1, PLAN.sailPool.z1);
}

function buildWater() {
  CURCHUNK = 'water';
  const acc = new Acc();
  for (let i = 0; i < WATER_RUNS.length; i++) {
    const r = WATER_RUNS[i];
    const x0 = Math.min(r[0], r[2]) - r[4] / 2, x1 = Math.max(r[0], r[2]) + r[4] / 2;
    const z0 = Math.min(r[1], r[3]) - (r[0] === r[2] ? 0 : r[4] / 2);
    const z1 = Math.max(r[1], r[3]) + (r[0] === r[2] ? 0 : r[4] / 2);
    water(x0, z0, x1, z1, terrainY((x0 + x1) / 2, (z0 + z1) / 2) - 0.34, 0.5, r[5]);
    // channel walls and coping
    const g = new THREE.PlaneGeometry(x1 - x0, z1 - z0, Math.max(1, Math.round((x1 - x0) / 6)), Math.max(1, Math.round((z1 - z0) / 6)));
    g.rotateX(-Math.PI / 2);
    g.translate((x0 + x1) / 2, 0, (z0 + z1) / 2);
    {
      const pp = g.attributes.position;
      for (let k = 0; k < pp.count; k++) pp.setY(k, terrainY(pp.getX(k), pp.getZ(k)) - 0.34);
    }
    /* the tank box under a run is 900 mm tall with its top 560 mm below the
       water line — see the ACC.arch box a few lines down, which is the same
       number read off the same place */
    waterAttrs(g, r[5] ? 1 : 0.14, 0.56, 0,
      (x0 + x1) / 2, (z0 + z1) / 2, (x1 - x0) / 2, (z1 - z0) / 2);
    acc.add(g, xf(0, 0, 0), 0xffffff, 0, 1);
    // the stone tank the water sits in, and its coping kerbs
    const cy = (z0 + z1) / 2, cxm = (x0 + x1) / 2;
    const gy0 = terrainY(cxm, cy);
    ACC.arch.add(G_BOXT, xf(cxm, gy0 - 1.80, cy, 0, x1 - x0 + 1.0, 0.90, z1 - z0 + 1.0), 0x33443f, S.CONCRETE, 0.42);
    if (r[0] === r[2]) {
      for (const s of [-1, 1]) {
        const bx = r[0] + s * (r[4] / 2 + 0.32);
        ACC.arch.add(G_BOXT, xf(bx, gy0 - 1.05, cy, 0, 0.66, 1.15, z1 - z0 + 1.0), K.travDk, S.TRAVERTINE, 0.60);
        ACC.arch.add(G_BOXT, xf(bx + s * 0.30, gy0 + 0.10, cy, 0, 1.10, 0.30, z1 - z0 + 1.0),
          K.travert, S.TRAVERTINE, 0.98);
      }
    } else {
      for (const s of [-1, 1]) {
        const bz = r[1] + s * (r[4] / 2 + 0.32);
        ACC.arch.add(G_BOXT, xf(cxm, gy0 - 1.05, bz, 0, x1 - x0 + 1.0, 1.15, 0.66), K.travDk, S.TRAVERTINE, 0.60);
        ACC.arch.add(G_BOXT, xf(cxm, gy0 + 0.10, bz + s * 0.30, 0, x1 - x0 + 1.0, 0.30, 1.10),
          K.travert, S.TRAVERTINE, 0.98);
      }
    }
  }
  const g = acc.geometry();
  const wm = new THREE.Mesh(g, waterMat);
  WATERMESHES.push(wm);
  wm.renderOrder = 2;
  wm.receiveShadow = false; wm.castShadow = false;
  cityRoot.add(wm);
  DISPOSE.push(g);

  // bridges wherever a street crosses the channel
  for (const zc of [104, 250, 378, 520, -96]) {
    bridge(PLAN.water.x, zc, 26, 11);
  }
  // small pedestrian footbridges
  for (const zc of [46, 160, 200, 300, 440]) bridge(PLAN.water.x, zc, 9.5, 3.4);
}

function bridge(cx, cz, w, len) {
  const a = ACC.arch, f = ACC.fine;
  const y = terrainY(cx, cz);
  a.add(G_BOXT, xf(cx, y + 0.02, cz, 0, w, 0.34, len), K.travert, S.TRAVERTINE, 0.97);
  platform(cx - w / 2, cz - len / 2, cx + w / 2, cz + len / 2, y + 0.36);
  // soffit arch
  a.add(G_BOXT, xf(cx, y - 0.5, cz, 0, w * 0.94, 0.5, len * 0.6), K.travDk, S.TRAVERTINE, 0.55);
  // balustrade both sides: slender posts + rail
  for (const s of [-1, 1]) {
    const z = cz + s * (len / 2 - 0.22);
    const n = Math.max(3, Math.round(w / 1.15));
    for (let i = 0; i <= n; i++) {
      const x = cx - w / 2 + (w * i) / n;
      f.add(G_BOXT, xf(x, y + 0.36, z, 0, 0.07, 0.92, 0.07), K.steelDk, S.METAL, 0.85);
    }
    f.add(G_BOXT, xf(cx, y + 1.26, z, 0, w, 0.09, 0.11), K.steelDk, S.METAL, 0.95);
    f.add(G_BOXT, xf(cx, y + 0.80, z, 0, w, 0.05, 0.07), K.steelDk, S.METAL, 0.9);
  }
}

/* ========================================================= BUILDING KIT ==
   Facade grammar. Every elevation is walked bay by bay; the bay decides what
   it is (shopfront, arch, window, louvre run, balcony, solid) and emits real
   geometry for it. Nothing is painted on.                                 */

// a straight wall segment with thickness, running from (x0,z0) to (x1,z1)
function wallSeg(a, x0, z0, x1, z1, y0, y1, th, colour, surf, shade) {
  const dx = x1 - x0, dz = z1 - z0;
  const len = Math.hypot(dx, dz);
  if (len < 0.001) return;
  const ang = Math.atan2(dx, dz);
  a.add(G_BOXT, xf((x0 + x1) / 2, y0, (z0 + z1) / 2, ang, th, y1 - y0, len), colour, surf, shade);
}

/* pointed Najdi arch head built from voussoir boxes — real silhouette */
/* A corbelled Najdi head: the opening is closed by a stepped profile cut out
   of the wall itself, so the arch is a silhouette in the masonry rather than
   a ring of props stuck on the front of it.                               */
function archHead(a, cx, y, cz, ang, w, rise, th, colour, surf, shade) {
  const N = 11;
  const ux = Math.sin(ang), uz = Math.cos(ang);       // along the wall
  const cw = w / N;
  for (let i = 0; i < N; i++) {
    const t = (i + 0.5) / N;
    const u = 1 - Math.abs(t - 0.5) * 2;             // 0 at the springing, 1 at the apex
    // a pointed profile: fast rise at the haunch, a point at the crown
    const prof = Math.pow(1 - u, 1.55);
    const hh = rise * prof + 0.02;
    if (hh < 0.03) continue;
    const off = (t - 0.5) * w;
    a.add(G_BOXT, xf(cx + ux * off, y + rise - hh, cz + uz * off, ang, th, hh + 0.04, cw * 1.06),
      colour, surf, shade * (0.94 + 0.10 * ((i * 7) % 3)));
  }
  // the impost course the arch springs from
  for (const s of [-1, 1]) {
    a.add(G_BOXT, xf(cx + ux * s * (w / 2 + 0.06), y - 0.12, cz + uz * s * (w / 2 + 0.06), ang,
      th + 0.12, 0.20, 0.42), colour, surf, shade * 1.08);
  }
}

/* a lit shop interior seen through glass: a glazed plane, a warm emissive
   back wall set back, and a couple of fittings so the room has depth      */
/* ==================================================== SHOP INTERIORS ==
   The souq is 216 metres of shopfront and you walk it at two metres from the
   glass, so what is behind the glass is not set dressing — it is half the
   experience. A lit box with a counter in it is the thing that gives a demo
   away, because a real shop is a floor, a ceiling with a light in it, a back
   wall doing something, and three or four pieces of furniture arranged by
   somebody who wanted to sell you something.

   So every bay is given a trade, and the trade lays itself out. The composer
   works in the room's own frame — `at(across, into, up)` — so a programme can
   say "counter along the left wall, machine on it, two tables in the window"
   without knowing which way the street runs. Everything it places is an
   instanced kit part, because there are two hundred of these rooms.

   Interior light is baked, not lit: eight pooled point lights cannot light two
   hundred rooms, so each room carries a ceiling cove, its pendants' own glow,
   and whatever its trade lights — a pastry case, a gold cabinet, an oven — as
   emissive geometry, plus one practical registered at the opening so the room
   still throws light onto the pavement.                                     */
const SHOP_DEPTH = 3.35;   // the ground floor is hollowed this deep for shops
const TRADES = [
  'cafe', 'restaurant', 'textile', 'grocer', 'gold', 'bakery',
  'perfume', 'books', 'barber', 'pharmacy', 'cafe', 'textile', 'restaurant',
];
const TRADE_LIGHT = {
  cafe: 0xffcf94, restaurant: 0xffb877, textile: 0xffe3c0, grocer: 0xfff0cf,
  gold: 0xffd98a, bakery: 0xffc98a, perfume: 0xffe8d8, books: 0xffdcae,
  barber: 0xf2f0e6, pharmacy: 0xdff0ee,
};
const TRADE_FLOOR = {
  cafe: 0x6d5c46, restaurant: 0x5a3f30, textile: 0xc9bda6, grocer: 0x9c9384,
  gold: 0x3f3a35, bakery: 0xbcae94, perfume: 0xd8d2c6, books: 0x7a5c3c,
  barber: 0xcfc9bc, pharmacy: 0xd4d8d6,
};

const SHOPS = [];        // every fitted room, for QA and for the trade census
function shopInterior(cx, y, cz, ang, w, h, depth, warm) {
  const cs = Math.cos(ang), sn = Math.sin(ang);
  /* the room's own frame: `across` runs along the shopfront, `into` runs away
     from the street, `up` is up. Every piece below is placed in it. */
  const at = (across, into) => [cx + sn * into + cs * across, cz + cs * into - sn * across];
  const trade = TRADES[Math.floor(rnd() * TRADES.length)];
  /* A fitted room is 2,200 triangles and there are eleven hundred of them, and
     an instanced mesh has one bounding sphere for every instance in it — so a
     shop nobody can walk to is 2,200 triangles submitted every frame forever.
     The same rule the planting uses applies here: full fit-out inside the
     walkable core, a lit shell with a window display outside it. Which one a
     bay gets is decided once, at build time, so nothing pops. */
  let nearest = 1e9;
  for (const a2 of NEARFIELD) {
    const d2 = (cx - a2[0]) * (cx - a2[0]) + (cz - a2[1]) * (cz - a2[1]);
    if (d2 < nearest) nearest = d2;
  }
  const fitted = nearest <= 30 * 30;
  const tint = TRADE_LIGHT[trade] || warm || 0xffd6a0;
  const halfW = w / 2;
  /* A room 1.2 m wide and 3.1 m deep is a corridor: from the street you see
     nothing but its two side walls converging. Depth follows width. */
  const D = Math.max(1.5, Math.min(depth, w * 1.35));

  // ---- glazing: nearly clear, because the room behind it is the point
  let p = at(0, 0.05);
  /* the shop window stops 400 mm short of the head and a reeded transom fills
     the rest. It is what lets the room borrow daylight without showing the
     ceiling void, it is on half the shopfronts this district is drawn from,
     and it is the one place a fluted pane reads at street level. */
  const TR = Math.min(0.42, h * 0.16);
  SHOPGLASS.add(G_BOXT, xf(p[0], y, p[1], ang, w, h - TR, 0.05), 0xcfe0ea, S.METAL, 1);
  REEDGLASS.add(G_BOXT, xf(p[0], y + h - TR, p[1], ang, w, TR, 0.05), 0xd8e8e2, S.METAL, 1);
  ACC.fine.add(G_BOXT, xf(p[0], y + h - TR - 0.03, p[1], ang, w, 0.06, 0.15), K.steelDk, S.METAL, 0.8);
  ACC.fine.add(G_BOXT, xf(p[0], y, p[1], ang, 0.10, h, 0.16), K.steelDk, S.METAL, 0.8);
  for (const s of [-1, 1]) {
    const e = at(s * (halfW - 0.05), 0.05);
    ACC.fine.add(G_BOXT, xf(e[0], y, e[1], ang, 0.10, h, 0.16), K.steelDk, S.METAL, 0.8);
  }
  ACC.fine.add(G_BOXT, xf(p[0], y + h - 0.06, p[1], ang, w, 0.12, 0.18), K.steelDk, S.METAL, 0.8);

  // ---- the shell: floor, back wall, side walls, ceiling
  const fp = at(0, D * 0.5);
  inst('i_shopfloor', xf(fp[0], y - 0.015, fp[1], ang, w, 1, D), TRADE_FLOOR[trade] || 0x8a7a62);
  const bp = at(0, D);
  INTERIOR.add(G_BOXT, xf(bp[0], y, bp[1], ang, w, h, 0.14), 0xe0d0b4, S.RENDER, 1.02);
  for (const s of [-1, 1]) {
    const q = at(s * halfW, D * 0.5);
    INTERIOR.add(G_BOXT, xf(q[0], y, q[1], ang, 0.1, h, D), 0xdcc7a6, S.RENDER, 0.94);
  }
  INTERIOR.add(G_BOXT, xf(fp[0], y + h - 0.12, fp[1], ang, w, 0.12, D), 0xd8c6ab, S.RENDER, 0.82);

  /* the cove: a strip of light washing the back wall, which is what actually
     makes a small room read as lit rather than as a glowing rectangle */
  const cvp = at(0, D - 0.34);
  inst('cove', xf(cvp[0], y + h - 0.20, cvp[1], ang, w * 0.94, 1, 1), tint);

  // ---- ceiling pendants, on the room's own rhythm
  const np = Math.max(1, Math.round(w / 1.5));
  for (let i = 0; i < np; i++) {
    const o = -w / 2 + w * (i + 0.5) / np;
    const lp = at(o, D * 0.45 + ((i % 2) - 0.5) * 0.5);
    inst('pendant', xf(lp[0], y + h - 0.12, lp[1], ang), pick([0xc4a06a, 0xb08a52, 0xd8cbb0]));
    inst('pendantglow', xf(lp[0], y + h - 0.12, lp[1], ang), tint);
  }

  // ---- and now the trade lays itself out
  const put = (name, across, into, rot, sx, sy, sz, col) =>
    inst(name, xf(at(across, into)[0], y, at(across, into)[1], ang + (rot || 0),
      sx === undefined ? 1 : sx, sy === undefined ? 1 : sy, sz === undefined ? 1 : sz), col);
  const putY = (name, across, into, up, rot, sx, sy, sz, col) =>
    inst(name, xf(at(across, into)[0], y + up, at(across, into)[1], ang + (rot || 0),
      sx === undefined ? 1 : sx, sy === undefined ? 1 : sy, sz === undefined ? 1 : sz), col);

  /* Every shop gets a window piece, whatever its trade. Standing outside an
     arched reveal you see a cone perhaps forty degrees wide, and everything a
     programme puts against a side wall falls outside it — so if nothing stands
     in the first metre, the shop reads as a lit empty wall no matter how well
     it is fitted out behind. */
  if (trade !== 'textile') {
    const wo = rr(-halfW * 0.28, halfW * 0.28);
    put('i_windisp', wo, 0.72, chance(0.5) ? 0 : Math.PI, Math.min(1.25, w * 0.52), 1, 1, 0xffffff);
    put('windispglow', wo, 0.72, 0, Math.min(1.25, w * 0.52), 1, 1, tint);
  }

  if (!fitted) {
    // the far version: a lit room with something in the window and a counter
    put('i_counter', rr(-halfW * 0.2, halfW * 0.2), D * 0.62, chance(0.5) ? 0 : Math.PI, Math.min(1.4, w * 0.6), 1, 0.9, 0xffffff);
    if (chance(0.5)) putY('i_shelfbay', 0, D - 0.30, 0, 0, w * 0.8, h * 0.44, 1, 0xffffff);
  } else if (trade === 'cafe') {
    const side = chance(0.5) ? -1 : 1;
    put('i_counter', side * (halfW - 0.42), D * 0.62, side * Math.PI / 2, Math.min(2.2, D * 0.62), 1, 0.9, 0xffffff);
    putY('i_espresso', side * (halfW - 0.52), D * 0.52, 0.92, side * Math.PI / 2, 0.9, 0.9, 0.9, 0xffffff);
    putY('i_bottles', side * (halfW - 0.30), D - 0.28, 1.35, 0, w * 0.42, 1, 1, 0xffffff);
    put('i_dispcase', -side * (halfW - 0.55), D * 0.72, 0, Math.min(1.1, w * 0.42), 1, 0.85, 0xffffff);
    put('dispglow', -side * (halfW - 0.55), D * 0.72, 0, Math.min(1.1, w * 0.42), 1, 0.85, 0xfff0d0);
    putY('i_menuboard', side * (halfW - 0.18), D - 0.22, h * 0.52, 0, w * 0.34, 1, 1, 0xffffff);
    for (let i = 0; i < 2; i++) {
      const tx = -side * (halfW * 0.45) + (i - 0.5) * 0.1;
      put('i_table', tx, 0.95 + i * 1.05, 0, 0.78, 0.78, 0.78, pick([0xe8e3d6, 0xd6c6a8]));
      for (let cch = 0; cch < 2; cch++) {
        const a2 = rnd() * 6.28;
        put('i_chair', tx + Math.sin(a2) * 0.62, 0.95 + i * 1.05 + Math.cos(a2) * 0.62, a2 + Math.PI, 0.8, 0.8, 0.8, 0xefeade);
      }
    }
    if (chance(0.7)) put('i_potbush', -side * (halfW - 0.3), 0.5, 0, 0.7, 0.7, 0.7, K.leaf);
  } else if (trade === 'restaurant') {
    const side = chance(0.5) ? -1 : 1;
    put('i_banquette', side * (halfW - 0.34), D * 0.55, side * Math.PI / 2, Math.min(2.4, D * 0.7), 1, 0.9, pick([0x6d3a34, 0x33465a, 0x4a5240]));
    put('i_counter', 0, D - 0.55, Math.PI, w * 0.55, 1, 0.85, 0xffffff);
    putY('i_bottles', 0, D - 0.26, 1.30, 0, w * 0.55, 1, 1, 0xffffff);
    for (let i = 0; i < 2; i++) {
      const tz = 1.0 + i * 1.15;
      put('i_table', side * (halfW - 0.92), tz, 0, 0.72, 0.75, 0.72, 0xe8e3d6);
      put('i_chair', side * (halfW - 1.55), tz, -side * Math.PI / 2, 0.78, 0.78, 0.78, pick([0x5d5148, 0x3f3a33]));
      put('i_platter', side * (halfW - 0.92), tz, 0, 0.7, 0.7, 0.7, 0xffffff);
    }
    put('i_rug', 0, D * 0.4, 0, w * 0.7, 1, D * 0.5, 0xffffff);
  } else if (trade === 'textile') {
    for (const s of [-1, 1]) {
      putY('i_railrack', s * (halfW - 0.42), D * 0.55 + s * 0.25, 0.16, s * Math.PI / 2, Math.min(1.9, D * 0.55), 1, 1, 0xffffff);
    }
    put('i_stack', 0, D * 0.60, 0, w * 0.42, 0.85, 0.8, 0xffffff);
    put('i_mannequin', -halfW * 0.55, 0.62, rnd() * 6.28, 0.95, 0.95, 0.95, pick([0xe4dccc, 0xd8c9b0]));
    if (chance(0.6)) put('i_mannequin', halfW * 0.5, 0.72, rnd() * 6.28, 0.9, 0.9, 0.9, pick([0xd6cbb6, 0xc9bda6]));
    put('i_counter', halfW - 0.55, D - 0.62, 0, Math.min(1.2, w * 0.45), 1, 0.85, 0xffffff);
  } else if (trade === 'grocer') {
    for (let i = 0; i < 2; i++) {
      putY('i_shelfbay', -halfW + 0.55 + i * 1.02, D - 0.30, 0, 0, 1, h * 0.42, 1, 0xffffff);
    }
    for (const s of [-1, 1]) putY('i_shelfbay', s * (halfW - 0.28), D * 0.55, 0, s * Math.PI / 2, Math.min(1.8, D * 0.5), h * 0.40, 1, 0xffffff);
    put('i_crate', -halfW * 0.5, 0.66, rnd() * 6.28, 0.85, 0.85, 0.85, pick([0x9a7444, 0x86643a]));
    put('i_crate', halfW * 0.45, 0.80, rnd() * 6.28, 0.8, 0.75, 0.8, 0x86643a);
    put('i_counter', halfW - 0.62, D * 0.45, 0, Math.min(1.1, w * 0.42), 1, 0.85, 0xffffff);
  } else if (trade === 'gold') {
    // cabinets down both sides and across the back, all of them lit
    for (const s of [-1, 1]) {
      const n2 = 2;
      for (let i = 0; i < n2; i++) {
        const into = D * (0.34 + i * 0.30);
        put('i_dispcase', s * (halfW - 0.32), into, s * Math.PI / 2, Math.min(1.1, D * 0.3), 1, 0.9, 0xffffff);
        put('dispglow', s * (halfW - 0.32), into, s * Math.PI / 2, Math.min(1.1, D * 0.3), 1, 0.9, 0xffe6a8);
      }
    }
    put('i_dispcase', 0, D - 0.42, 0, w * 0.7, 1, 0.9, 0xffffff);
    put('dispglow', 0, D - 0.42, 0, w * 0.7, 1, 0.9, 0xffe6a8);
    put('i_chair', -halfW * 0.3, D * 0.5, rnd() * 6.28, 0.75, 0.75, 0.75, 0x5d5148);
  } else if (trade === 'bakery') {
    put('i_dispcase', 0, 1.05, 0, w * 0.86, 1.05, 0.95, 0xffffff);
    put('dispglow', 0, 1.05, 0, w * 0.86, 1.05, 0.95, 0xffe0b0);
    for (let i = 0; i < 2; i++) putY('i_shelfbay', -halfW + 0.6 + i * 1.05, D - 0.28, 0, 0, 1, h * 0.44, 1, 0xffffff);
    put('i_counter', halfW - 0.6, D * 0.62, 0, Math.min(1.1, w * 0.42), 1, 0.85, 0xffffff);
    // the oven's own glow at the back of the room
    const op = at(-halfW * 0.4, D - 0.20);
    SHOPEMIS.add(G_BOXT, xf(op[0], y + 0.55, op[1], ang, 0.7, 0.5, 0.06), 0xff7a30, 0, 1);
  } else if (trade === 'perfume') {
    for (const s of [-1, 1]) {
      for (let i = 0; i < 3; i++) {
        putY('i_bottles', s * (halfW - 0.24), D * 0.55, 0.55 + i * 0.46, s * Math.PI / 2, Math.min(1.7, D * 0.5), 1, 1, 0xffffff);
      }
    }
    putY('i_bottles', 0, D - 0.24, 1.05, 0, w * 0.8, 1, 1, 0xffffff);
    put('i_counter', 0, D * 0.42, Math.PI, w * 0.5, 1, 0.85, 0xffffff);
    put('dispglow', 0, D * 0.42, Math.PI, w * 0.5, 0.55, 0.7, 0xffe6d4);
  } else if (trade === 'books') {
    for (const s of [-1, 1]) putY('i_shelfbay', s * (halfW - 0.26), D * 0.58, 0, s * Math.PI / 2, Math.min(2.0, D * 0.6), h * 0.46, 1, 0xffffff);
    for (let i = 0; i < 2; i++) putY('i_shelfbay', -halfW + 0.58 + i * 1.05, D - 0.28, 0, 0, 1, h * 0.46, 1, 0xffffff);
    put('i_chair', 0, 1.0, rnd() * 6.28, 0.85, 0.85, 0.85, pick([0x6d3a34, 0x3f4a3a]));
    put('i_table', -halfW * 0.4, 1.6, 0, 0.6, 0.6, 0.6, 0xd6c6a8);
  } else if (trade === 'barber') {
    const side = chance(0.5) ? -1 : 1;
    for (let i = 0; i < 2; i++) {
      put('i_chair', side * (halfW - 0.55), 0.95 + i * 1.10, side * Math.PI / 2, 0.95, 1.05, 0.95, pick([0x2f2a26, 0x3d3630]));
    }
    // the mirror run: a bright wall panel over a shelf of bottles
    for (let i = 0; i < 2; i++) {
      const mp = at(side * (halfW - 0.12), 0.95 + i * 1.10);
      SHOPEMIS.add(G_BOXT, xf(mp[0], y + 0.95, mp[1], ang + side * Math.PI / 2, 0.8, 1.0, 0.04), 0xdfe6ea, 0, 1);
      putY('i_bottles', side * (halfW - 0.22), 0.95 + i * 1.10, 0.86, side * Math.PI / 2, 0.7, 1, 1, 0xffffff);
    }
    put('i_counter', -side * (halfW - 0.55), D - 0.6, 0, Math.min(1.0, w * 0.4), 1, 0.85, 0xffffff);
  } else {  // pharmacy
    for (let i = 0; i < 2; i++) putY('i_shelfbay', -halfW + 0.58 + i * 1.05, D - 0.28, 0, 0, 1, h * 0.46, 1, 0xf2f4f2);
    for (const s of [-1, 1]) putY('i_shelfbay', s * (halfW - 0.26), D * 0.6, 0, s * Math.PI / 2, Math.min(1.8, D * 0.55), h * 0.44, 1, 0xf2f4f2);
    put('i_counter', 0, D * 0.36, Math.PI, w * 0.62, 1, 0.9, 0xeef2f0);
    putY('i_menuboard', 0, D - 0.24, h * 0.55, 0, w * 0.4, 1, 1, 0xffffff);
  }

  /* somebody is in the shop. A lit room with nobody in it reads as closed,
     and every one of these is open. */
  if (chance(0.62)) {
    const who = chance(0.55) ? 'thobe' : 'abaya';
    put(who, rr(-halfW * 0.5, halfW * 0.5), rr(D * 0.35, D * 0.8), rnd() * 6.28, 1, 1, 1,
      who === 'thobe' ? pick([0xf2efe6, 0xe8e2d4]) : pick([0x1c1a1c, 0x241f24]));
  }

  // the light that leaves the shop and lands on the paving
  SHOPS.push({ trade, fitted, x: cx, y, z: cz, ang, w, h, d: D });
  const gp = at(0, -1.35);
  inst('pool', xf3(gp[0], y - 0.10, gp[1], 0, 0, 0, w * 2.2, 1, w * 2.2), tint);
  /* the practical belongs *inside* the room, where the ceiling is. Sitting it
     in front of the glass put a hotspot on the pier instead of light in the
     shop, and at two metres that hotspot is the brightest thing in the frame. */
  const pr = at(0, D * 0.45);
  PRACTICALS.push({ x: pr[0], y: y + h * 0.72, z: pr[1], c: tint, i: 3.6, r: 10 });
}

/* parapet with a crenellated / stepped top — the Najdi silhouette */
function parapet(a, x0, z0, x1, z1, y, h, colour, surf, shade, style) {
  const dx = x1 - x0, dz = z1 - z0;
  const len = Math.hypot(dx, dz);
  const ang = Math.atan2(dx, dz);
  wallSeg(a, x0, z0, x1, z1, y, y + h, 0.30, colour, surf, shade);
  if (style === 'crenel') {
    const n = Math.max(2, Math.round(len / 1.85));
    for (let i = 0; i < n; i++) {
      const t = (i + 0.5) / n;
      const px = x0 + dx * t, pz = z0 + dz * t;
      const hh = 0.30 + (i % 3 === 0 ? 0.10 : 0);
      a.add(G_BOXT, xf(px, y + h, pz, ang, 0.34, hh, len / n * 0.42), colour, surf, shade * 1.03);
      a.add(G_CONE, xf3(px, y + h + hh, pz, 0, ang + Math.PI / 4, 0, 0.40, 0.42, 0.40), colour, surf, shade * 1.07);
    }
  } else if (style === 'step') {
    const n = Math.max(2, Math.round(len / 2.6));
    for (let i = 0; i < n; i++) {
      const t = (i + 0.5) / n;
      const px = x0 + dx * t, pz = z0 + dz * t;
      a.add(G_BOXT, xf(px, y + h, pz, ang, 0.34, 0.30 + 0.22 * ((i % 2) ? 1 : 0), len / n * 0.86), colour, surf, shade * 1.04);
    }
  } else if (style === 'zigzag') {
    // the white terrace balustrade from the majlis render
    const n = Math.max(3, Math.round(len / 1.35));
    for (let i = 0; i < n; i++) {
      const t = (i + 0.5) / n;
      const px = x0 + dx * t, pz = z0 + dz * t;
      const wgt = len / n;
      a.add(G_BOXT, xf3(px - Math.cos(ang) * wgt * 0.24, y + h * 0.02, pz + Math.sin(ang) * wgt * 0.24, 0, ang, 0.62, 0.20, h * 0.92, wgt * 0.30), colour, surf, shade * 1.05);
      a.add(G_BOXT, xf3(px + Math.cos(ang) * wgt * 0.24, y + h * 0.02, pz - Math.sin(ang) * wgt * 0.24, 0, ang, -0.62, 0.20, h * 0.92, wgt * 0.30), colour, surf, shade * 1.05);
    }
    a.add(G_BOXT, xf((x0 + x1) / 2, y + h * 0.90, (z0 + z1) / 2, ang, 0.40, h * 0.16, len), colour, surf, shade * 1.08);
  }
  // the coping course always overhangs a little: that shadow line is what
  // separates a building from a box
  a.add(G_BOXT, xf((x0 + x1) / 2, y - 0.14, (z0 + z1) / 2, ang, 0.56, 0.16, len), colour, surf, shade * 1.05);
}

/* ====================================================== CONTENT: BUILDINGS */

/* Plot subdivision: a block is split by a recursive cut with a jittered
   ratio, so no two plots are the same width and no grid rhythm survives. */
function subdivide(x0, z0, x1, z1, minSide, maxSide, gap, depth) {
  const w = x1 - x0, d = z1 - z0;
  const out = [];
  if ((w <= maxSide && d <= maxSide) || (depth || 0) > 7) {
    if (w > minSide * 0.5 && d > minSide * 0.5) out.push([x0, z0, x1, z1]);
    return out;
  }
  const cutX = w > d ? true : false;
  const t = 0.5 + (rnd() - 0.5) * 0.42;
  if (cutX) {
    const cx = x0 + w * t;
    out.push(...subdivide(x0, z0, cx - gap / 2, z1, minSide, maxSide, gap, (depth || 0) + 1));
    out.push(...subdivide(cx + gap / 2, z0, x1, z1, minSide, maxSide, gap, (depth || 0) + 1));
  } else {
    const cz = z0 + d * t;
    out.push(...subdivide(x0, z0, x1, cz - gap / 2, minSide, maxSide, gap, (depth || 0) + 1));
    out.push(...subdivide(x0, cz + gap / 2, x1, z1, minSide, maxSide, gap, (depth || 0) + 1));
  }
  return out;
}

/* which elevations of a plot face something public — those get the full
   grammar, the rest get the quiet one */
function publicSides(x0, z0, x1, z1) {
  const sides = [];
  const cx = (x0 + x1) / 2, cz = (z0 + z1) / 2;
  const test = (px, pz) => {
    // near the souq spine, the plaza, a boulevard or the water
    if (Math.abs(px - PLAN.spineX) < 18 && pz > PLAN.souq.z0 - 30 && pz < PLAN.souq.z1 + 30) return 2;
    if (px > PLAN.plaza.x0 - 22 && px < PLAN.plaza.x1 + 22 && pz > PLAN.plaza.z0 - 22 && pz < PLAN.plaza.z1 + 22) return 2;
    /* the downtown plaza was never in this test, so every block around the
       square showed it its quiet elevation — a room walled in dark backs */
    if (px > PLAN.dtplaza.x0 - 26 && px < PLAN.dtplaza.x1 + 26 && pz > PLAN.dtplaza.z0 - 26 && pz < PLAN.dtplaza.z1 + 26) return 2;
    if (Math.abs(px - PLAN.water.x) < 12) return 2;
    for (const r of ROADS) {
      const dx = r[2] - r[0], dz = r[3] - r[1];
      const l2 = dx * dx + dz * dz;
      const t = clamp(((px - r[0]) * dx + (pz - r[1]) * dz) / l2, 0, 1);
      if (Math.hypot(px - (r[0] + t * dx), pz - (r[1] + t * dz)) < r[4] / 2 + 9) return r[5] === 0 ? 1 : 2;
    }
    return 0;
  };
  sides.push(test(cx, z1 + 5));   // +Z (north)
  sides.push(test(x1 + 5, cz));   // +X (east)
  sides.push(test(cx, z0 - 5));   // -Z (south)
  sides.push(test(x0 - 5, cz));   // -X (west)
  return sides;
}

/* ---------------------------------------------------------------- BLOCK ==
   The one building routine. Style chooses the material law, the opening
   grammar, the parapet and the roofscape; every dimension is jittered per
   instance so adjacent blocks never rhyme.                                */
function block(x0, z0, x1, z1, o) {
  o = o || {};
  const w = x1 - x0, d = z1 - z0;
  if (w < 5 || d < 5) return;
  const cx = (x0 + x1) / 2, cz = (z0 + z1) / 2;
  // a scanned building has already claimed this frontage
  if (inScanSite(cx, cz)) return;
  const gy = terrainY(cx, cz);
  const floors = o.floors || 2;
  const fh = o.floorH || 3.55;
  const top = gy + floors * fh;
  const style = o.style || 'sand';
  const detail = o.detail === undefined ? 2 : o.detail;   // 2 full, 1 medium, 0 massing
  const sides = o.sides || publicSides(x0, z0, x1, z1);
  const a = ACC.arch, f = ACC.fine;

  const PAL = {
    sand:  [K.sand, K.sandDk, K.sandLt, 0xcfae7e, 0xbb9a6e],
    brick: [K.brick, K.brickDk, K.brickLt, 0x9c6a4a, 0xab7c5a],
    trav:  [K.travert, K.travDk, 0xdfd2b6, 0xcdbb9c, 0xd4c3a4],
  };
  /* Material was fixed per quarter, so every building in the souq was the same
     render and every building on the boulevard the same travertine — which is
     the single loudest reason a generated street reads as generated. A real
     street is not one quarry: roughly one building in four takes a neighbouring
     stone, and the quarter still reads as itself because the rest hold. */
  const fam0 = style === 'brick' ? 'brick' : (style === 'trav' || style === 'office') ? 'trav' : 'sand';
  const fam = style === 'office' || !chance(0.26) ? fam0
    : (fam0 === 'sand' ? 'trav' : fam0 === 'trav' ? 'sand' : pick(['sand', 'brick']));
  const baseCol = pick(PAL[fam]);
  /* and the bay rhythm varies per building rather than being one constant for
     the whole district: 3.15 m everywhere is what made every facade a grid */
  const bayJit = 0.85 + rnd() * 0.34;
  /* MODERN vs VERNACULAR. The whole district spoke one language — crenellated
     parapets, mashrabiya screens, small punched openings — which is right for
     the souq and wrong for everywhere the reference renders actually look.
     Those are a modern downtown: flat parapets, wide bays, tall glazed
     colonnades. The souq keeps the vernacular; the downtown and commercial
     quarters get the language they are drawn in. */
  const modern = o.modern === undefined
    ? (style === 'office' || style === 'trav') : o.modern;
  const surfBody = style === 'brick' ? S.BRICK : (fam === 'trav' ? S.TRAVERTINE : S.RENDER);
  const surfBase = style === 'brick' ? S.BRICK : S.ASHLAR;
  const tone = 0.90 + rnd() * 0.22;
  const aged = chance(0.28) ? 0.86 : 1.0;                 // a weathered fraction
  const shade = tone * aged;

  occluder(cx, cz, w / 2, d / 2, top);
  if (o.collide !== false) collider(cx, cz, w / 2, d / 2, 0, top);

  /* ---- the solid core: you never see through the openings into daylight.
     Except at ground level, where the shops are. The core used to run the full
     height at a 0.62 m inset, which meant every fitted room — floor, ceiling,
     counter, stock and shopkeeper — was built three metres inside a solid box
     and could not be seen at all, from any angle, ever. The ground floor is now
     hollowed to the depth of a shop, and `elevation` fills that gap back in on
     any side that turns out not to have a shopfront on it. */
  const inset = detail > 0 ? 0.62 : 0.0;
  /* A modern block carries a tall ground floor — the colonnaded frontages in
     the references are close to double height, which is what lets a shopfront
     read as a shopfront from across a square. This must stay in step with the
     matching line in elevation(): the core is hollowed to gh0 and the
     elevation fills that same opening, so if the two disagree the shopfronts
     open into solid stone. */
  const gh0 = (style === 'office' || modern) ? fh * 1.5 : fh;
  const hollow = detail > 0 ? Math.min(SHOP_DEPTH, Math.min(w, d) / 2 - 0.2) : inset;
  addMass(a, cx, gy + gh0, cz, 0, Math.max(1, w - inset * 2), Math.max(0.1, floors * fh - gh0),
    Math.max(1, d - inset * 2), baseCol, surfBody, shade * 0.68, 0.08);
  addMass(a, cx, gy - 0.4, cz, 0, Math.max(0.8, w - hollow * 2), gh0 + 0.4,
    Math.max(0.8, d - hollow * 2), baseCol, surfBody, shade * 0.68, 0.08);

  // ---- plinth course
  addMass(a, cx, gy - 0.30, cz, 0, w + 0.34, 0.62, d + 0.34, fam === 'brick' ? K.brickDk : K.sandDk, surfBase, shade * 0.80, 0.05);

  const SIDES = [
    { ax: 1, x0: x0, z0: z1, x1: x1, z1: z1, nx: 0, nz: 1, ang: Math.PI / 2 },
    { ax: 0, x0: x1, z0: z1, x1: x1, z1: z0, nx: 1, nz: 0, ang: Math.PI },
    { ax: 1, x0: x1, z0: z0, x1: x0, z1: z0, nx: 0, nz: -1, ang: -Math.PI / 2 },
    { ax: 0, x0: x0, z0: z0, x1: x0, z1: z1, nx: -1, nz: 0, ang: 0 },
  ];

  for (let si = 0; si < 4; si++) {
    const S4 = SIDES[si];
    const pub = sides[si];
    const len = Math.hypot(S4.x1 - S4.x0, S4.z1 - S4.z0);
    const lvl = detail === 0 ? 0 : (pub >= 1 ? detail : Math.max(0, detail - 1));
    /* how deep a shop can be on this side before it meets the shop on the far
       side of the same block. On a thin infill block the two rooms otherwise
       overlap and one shop's back wall stands in the other one's window. */
    const avail = (S4.ax === 1 ? d : w) / 2 - 0.35;
    elevation(S4, gy, floors, fh, len, lvl, pub, style, baseCol, surfBody, surfBase, shade, o, avail, bayJit, si, modern);
  }

  // ---- parapet all round
  const pcol = fam === 'brick' ? K.brickLt : (fam === 'trav' ? K.travert : K.sandLt);
  /* a battlement on a downtown office block is a category error, and it was
     on every third one of them */
  const pstyle = modern ? 'step'
    : (o.parapet || (style === 'brick' ? 'crenel' : (fam === 'trav' ? 'step' : (chance(0.5) ? 'crenel' : 'step'))));
  const ph = o.parapetH || (style === 'office' ? 0.95 : 1.15);
  if (detail > 0) {
    /* A cornice under the parapet. The wall used to run straight into the
       coping with nothing proud of it, so the top of every building died into
       the sky on a single flat line and the facade never cast a shadow across
       its own head. Two courses, the upper one wider, is the whole trick. */
    if (style !== 'office') {
      a.add(G_BOXT, xf(cx, top - 0.30, cz, 0, w + 0.30, 0.16, d + 0.30), pcol, surfBase, shade * 1.00);
      a.add(G_BOXT, xf(cx, top - 0.14, cz, 0, w + 0.56, 0.18, d + 0.56), pcol, surfBase, shade * 1.10);
    }
    for (const S4 of SIDES) parapet(a, S4.x0, S4.z0, S4.x1, S4.z1, top, ph, pcol, surfBody, shade * 1.04, pstyle);
    /* Greenery spilling over the parapet onto the street elevation. The
       reference renders are full of it — planting on every roof terrace and
       balcony, trailing down the wall below — and the district had vines only
       as a shopfront dressing item at ankle height. This is the same plant
       seen from the street, which is where it actually reads. */
    if (MODEL_ROUTE.vinepanel) {
      for (let si2 = 0; si2 < 4; si2++) {
        if (sides[si2] < 1 || !chance(0.42)) continue;
        const S4 = SIDES[si2];
        const l2 = Math.hypot(S4.x1 - S4.x0, S4.z1 - S4.z0);
        if (l2 < 7) continue;
        const ang2 = Math.atan2(S4.x1 - S4.x0, S4.z1 - S4.z0);
        const n2 = 1 + (chance(0.45) ? 1 : 0);
        for (let k = 0; k < n2; k++) {
          const t2 = mix(l2 * 0.18, l2 * 0.82, rnd());
          const vx = S4.x0 + (S4.x1 - S4.x0) / l2 * t2 + S4.nx * 0.5;
          const vz = S4.z0 + (S4.z1 - S4.z0) / l2 * t2 + S4.nz * 0.5;
          inst('vinepanel', xf3(vx, top - 2.3 - rnd() * 1.4, vz, 0, ang2 + Math.PI / 2, 0,
            0.9 + rnd() * 0.5, 1.15 + rnd() * 0.5, 0.9), pick([K.leaf, K.leafDk, K.leafLt]));
        }
      }
    }
  } else {
    for (const S4 of SIDES) wallSeg(a, S4.x0, S4.z0, S4.x1, S4.z1, top, top + 0.7, 0.3, pcol, surfBody, shade * 1.02);
  }

  // ---- roof deck + the things that live on a roof
  a.add(G_BOXT, xf(cx, top - 0.18, cz, 0, w - 0.2, 0.22, d - 0.2), 0xa8a196, S.CONCRETE, shade * 0.92);
  if (detail > 0 && o.roof !== false) roofscape(cx, cz, w, d, top, o);
  return { cx, cz, w, d, top, gy, floors, fh, style, baseCol, shade };
}

/* --------------------------------------------------------- one elevation */
function elevation(S4, gy, floors, fh, len, lvl, pub, style, baseCol, surfBody, surfBase, shade, o, avail, bayJit, si, modern) {
  const a = ACC.arch, f = ACC.fine;
  const ux = (S4.x1 - S4.x0) / len, uz = (S4.z1 - S4.z0) / len;
  const ang = Math.atan2(S4.x1 - S4.x0, S4.z1 - S4.z0);
  const nx = S4.nx, nz = S4.nz;
  /* A modern block is a colonnade: wide bays between slim piers, carrying a
     tall opening. The vernacular is the opposite — narrow bays, deep piers,
     small openings — and building the whole district to the second set of
     numbers is why the downtown blocks read as a fort rather than as the
     stone-and-glass frontages in the references. */
  const bayW = (modern ? 4.35 : (style === 'souq' ? 3.5 : 3.15)) * (bayJit || 1);
  const nb = Math.max(1, Math.round(len / bayW));
  const bw = len / nb;
  const pierW = modern ? 0.40 : (style === 'office' ? 0.34 : 0.62);
  // how much of the bay between piers is actually opening
  const owF = modern ? 0.94 : 0.86;
  const at = (t, off) => [S4.x0 + ux * t + nx * (off || 0), S4.z0 + uz * t + nz * (off || 0)];

  // ---- ground floor
  /* `modern` had to join this test. Mixing the downtown quarter's materials
     moved two thirds of its plots off `brick` onto sand and travertine, and
     since neither qualified here the whole quarter quietly lost its
     ground-floor retail — a downtown of blank plinths. Any modern block on a
     public frontage is a shopfront, which is what the references show. */
  const shopfront = (style === 'souq' && pub >= 1) || (style === 'brick' && pub >= 2)
    || (style === 'office' && pub >= 1) || (modern && pub >= 1);
  const gh = (style === 'office' || modern) ? fh * 1.5 : fh;   // must match gh0 in block()
  /* the block hollowed its whole ground floor to make room for shops. A side
     that has none has to put the mass back, or its windows look into a void. */
  if (!shopfront || lvl < 2) {
    /* but it has to stop short of the corners: the sides at right angles to
       this one have their own shops in that same three metres, and a slab run
       to the full length of a blank end wall buries every shop at both ends of
       the street face. On a shallow block the two end slabs then meet in the
       middle, which is correct — there are no shops there either. */
    const bl = len - SHOP_DEPTH * 2;
    if (bl > 0.5) {
      const mid = at(len / 2, SHOP_DEPTH / 2 + 0.1);
      a.add(G_BOXT, xf(mid[0], gy - 0.2, mid[1], ang, bl, gh + 0.2, SHOP_DEPTH),
        baseCol, surfBody, shade * 0.66);
    }
  }
  for (let b = 0; b < nb; b++) {
    const t = (b + 0.5) * bw;
    const p = at(t, 0);
    if (lvl === 0) continue;
    const isDoor = (b === Math.floor(nb / 2) && !shopfront);
    if (shopfront && lvl >= 2 && bw > 2.4) {
      // deep reveal with a pointed head, glass and a lit interior behind
      const ow = bw - pierW * 1.4;
      const oh = gh - 1.15;
      const rd = 0.9;
      // the reveal: piers each side + head
      addMass(a, at(b * bw + pierW / 2, -rd / 2)[0], gy, at(b * bw + pierW / 2, -rd / 2)[1], ang, pierW, gh, rd, baseCol, surfBase, shade * 0.86, 0.035);
      archHead(a, p[0] - nx * rd * 0.5, gy + oh * 0.62, p[1] - nz * rd * 0.5, ang, ow, 1.05, rd, baseCol, surfBase, shade * 0.9);
      a.add(G_BOXT, xf(p[0] - nx * rd * 0.5, gy + oh * 0.62 + 1.05, p[1] - nz * rd * 0.5, ang, ow, Math.max(0.1, gh - oh * 0.62 - 1.05), rd), baseCol, surfBody, shade * 0.88);
      shopInterior(p[0] - nx * (rd * 0.55), gy + 0.12, p[1] - nz * (rd * 0.55), ang + Math.PI / 2, ow * 0.94, oh * 0.94,
        Math.max(1.5, Math.min(SHOP_DEPTH - 0.25, (avail === undefined ? 3.1 : avail))),
        pick([0xffd39a, 0xffc887, 0xffe0bb, 0xf6b877]));
      // signage bracket above every third shop
      if (b % 3 === 1) {
        const sp = at(t, -0.85);
        inst('sign', xf(sp[0], gy + oh + 0.55, sp[1], ang + Math.PI / 2), pick([0xe8c48c, 0xd8a25b, 0xf0e0c8]));
      }
      /* A wall lantern on the pier between shops. The asset was made for
         exactly this and had never been placed anywhere; a shopfront street
         at dusk is a row of warm points at head height before it is anything
         else, and this district had none of them. */
      if (MODEL_ROUTE.wlantern && chance(0.62)) {
        const lp = at(b * bw + pierW / 2, -0.34);
        inst('wlantern', xf(lp[0], gy + 2.85, lp[1], ang + Math.PI / 2), 0xffd9a4);
        PRACTICALS.push({ x: lp[0] - nx * 0.3, y: gy + 2.85, z: lp[1] - nz * 0.3, c: 0xffc98a, i: 2.6, r: 8.5 });
      }
      /* A fabric awning over the shopfront. There is no awning anywhere in the
         87-asset library and none in the district, and it is on the hotel and
         half the frontages in every downtown reference — the one piece of
         colour in an otherwise stone street, and the thing that puts a band of
         shade over the café tables underneath. Built here rather than
         generated because it is four boxes: a sloped canopy on a front rail,
         two side cheeks and a valance. */
      if (chance(0.46) && ow > 1.8) {
        const AC = pick([0x9d4a3c, 0xb5613f, 0x7a5b3a, 0x4f5f52, 0x8e6a3e, 0xa8503f]);
        /* springs from above the head, but never higher than an awning goes.
           A double-height modern shopfront puts oh at 4.25 m, and 90% of that
           is a canopy at nearly four metres — over the heads of the people it
           is meant to shade, which is not what it looks like in any of the
           references. */
        const ah = gy + Math.min(oh * 0.90, 3.35);
        const proj = 1.55;
        /* Stepped rather than tilted. xf3 composes its Euler as XYZ, so a roll
           term here would be applied about the world axis and not about the
           canopy's own length once the yaw has turned it — a tilt whose
           direction depends on which way the elevation faces. Four short
           horizontal treads stepping down as they project read as the same
           slope from the street and cannot be wrong by an axis. */
        const NS = 4;
        for (let k = 0; k < NS; k++) {
          const t0 = proj * (k / NS), t1 = proj * ((k + 1) / NS);
          const mp = at(t, -(t0 + t1) / 2);
          f.add(G_BOXT, xf(mp[0], ah - 0.10 - k * 0.14, mp[1], ang,
            ow + 0.24, 0.055, t1 - t0), AC, S.FABRIC, shade * (1.04 - k * 0.03));
        }
        // the front rail it hangs off, and the valance below it
        const fp = at(t, -proj);
        f.add(G_BOXT, xf(fp[0], ah - 0.10 - (NS - 1) * 0.14, fp[1], ang, ow + 0.28, 0.07, 0.09), K.steelDk, S.METAL, 0.95);
        f.add(G_BOXT, xf(fp[0], ah - 0.36 - (NS - 1) * 0.14, fp[1], ang, ow + 0.24, 0.26, 0.045), AC, S.FABRIC, shade * 0.94);
        /* and a cheek at each end, closing it against the wall. G_BOXT is
           base-at-origin, so this y is the bottom of the cheek: it has to
           start at the front edge of the canopy and rise to the back one, or
           it stands proud above the fabric it is supposed to close. */
        const cy0 = ah - 0.10 - (NS - 1) * 0.14;
        for (const s2 of [-1, 1]) {
          const cp = at(t + s2 * (ow + 0.2) / 2, -proj / 2);
          f.add(G_BOXT, xf(cp[0], cy0, cp[1], ang, 0.04, (NS - 1) * 0.14 + 0.055, proj), AC, S.FABRIC, shade * 0.88);
        }
      }
      /* The glazed vitrine, standing in the opening in front of the lit room.
         The asset exists for exactly this — the comment where it was routed
         says so — and it had never been placed anywhere. Scaled uniformly off
         its 3.30 m fit height so it keeps its proportions rather than being
         stretched to the bay, and only where the bay is wide enough to take
         it without fouling the piers. */
      if (MODEL_ROUTE.vitrine && ow > 2.0 && oh > 2.0) {
        const vs = oh / 3.30;
        const vp = at(t, -0.10);
        inst('vitrine', xf3(vp[0], gy + 0.12, vp[1], 0, ang + Math.PI / 2, 0, vs, vs, vs), 0xffffff);
      }
      // a step and a threshold slab
      a.add(G_BOXT, xf(at(t, -1.35)[0], gy - 0.06, at(t, -1.35)[1], ang, ow + 0.6, 0.14, 1.0), 0xc9b795, S.TRAVERTINE, shade * 0.95);
    } else {
      // pier / spandrel grammar: real openings
      addMass(a, at(b * bw + pierW / 2, 0)[0], gy, at(b * bw + pierW / 2, 0)[1], ang, pierW, gh, 0.5, baseCol, surfBase, shade * 0.9, 0.035);
      const ow = bw - pierW, sill = isDoor ? 0.0 : 0.95, head = gh - 0.85;
      if (sill > 0.01) a.add(G_BOXT, xf(p[0], gy, p[1], ang, ow, sill, 0.42), baseCol, surfBase, shade * 0.88);
      a.add(G_BOXT, xf(p[0], gy + head, p[1], ang, ow, gh - head, 0.42), baseCol, surfBase, shade * 0.88);
      if (lvl >= 2) {
        if (isDoor) inst('door', xf(at(t, -0.30)[0], gy, at(t, -0.30)[1], ang + Math.PI / 2), pick([0x6b4526, 0x54361d, 0x7d5730]));
        else openingKit(p[0], gy + sill, p[1], ang, ow * owF, head - sill, 'window', style);
      }
    }
  }
  // last pier closes the run
  if (lvl > 0) addMass(a, at(len - pierW / 2, 0)[0], gy, at(len - pierW / 2, 0)[1], ang, pierW, gh, 0.5, baseCol, surfBase, shade * 0.9, 0.035);
  // ground-floor string course
  if (lvl > 0) a.add(G_BOXT, xf(S4.x0 + ux * len / 2 + nx * 0.16, gy + gh, S4.z0 + uz * len / 2 + nz * 0.16, ang, 0.62, 0.22, len), baseCol, surfBase, shade * 1.02);

  // ---- upper floors
  for (let fl = 1; fl < floors; fl++) {
    const y = gy + gh + (fl - 1) * fh;
    const isTop = fl === floors - 1;
    if (lvl === 0) continue;
    if (style === 'office') { officeBand(S4, y, fh, len, nb, bw, ang, nx, nz, ux, uz, fl, floors, baseCol, shade, lvl); continue; }
    /* Each floor sets its own sill and head. A single pair of constants for
       every storey of every building is a spreadsheet, not a facade: upper
       storeys are shorter than the piano nobile in every street in the
       reference set. */
    /* A modern floor is mostly glass: the sill drops to a spandrel rail and
       the head goes almost to the slab, which is the proportion in every
       reference elevation. The vernacular keeps its deep wall above and below
       the opening. */
    const sillF = modern ? (0.42 + rnd() * 0.12)
      : (0.95 + (isTop ? 0.16 : 0.0) + rnd() * 0.22);
    const headF = modern ? (fh - 0.34 - rnd() * 0.10) : (fh - 0.75 - rnd() * 0.20);
    for (let b = 0; b < nb; b++) {
      const t = (b + 0.5) * bw;
      const p = at(t, 0);
      /* chamfered, like the ground-floor piers. These were the one run of
         plain boxes left on the facade and they read as cardboard beside the
         arrised stonework directly under them. */
      addMass(a, at(b * bw + pierW / 2, 0)[0], y, at(b * bw + pierW / 2, 0)[1], ang, pierW, fh, 0.5, baseCol, surfBody, shade, 0.03);
      const ow = bw - pierW, sill = sillF, head = headF;
      a.add(G_BOXT, xf(p[0], y, p[1], ang, ow, sill, 0.52), baseCol, surfBody, shade * 0.97);
      a.add(G_BOXT, xf(p[0], y + head, p[1], ang, ow, fh - head, 0.52), baseCol, surfBody, shade * 0.97);
      if (lvl >= 2) {
        /* not every bay is a window. A blank bay is what a stair, a flue or a
           party wall looks like from the street, and a facade without any is
           the giveaway that nobody lives behind it. */
        if (chance(modern ? 0.05 : 0.13)) {
          a.add(G_BOXT, xf(p[0], y + sill, p[1], ang, ow, head - sill, 0.52), baseCol, surfBody, shade * 0.95);
          continue;
        }
        const r = rnd();
        /* mashrabiya on a downtown office block is the same category error as
           the battlement above it */
        const kind = modern ? 'window'
          : ((pub >= 2 && r < 0.30) ? 'mashrabiya' : (r < 0.46 ? 'shutter' : 'window'));
        /* set into a real reveal rather than flush with the wall. The opening
           used to sit on the wall plane, so it had no shadow of its own and
           every window in the district read as a decal. RD is the depth of the
           jamb; the two returns are what actually cast. */
        const RD = 0.22;
        openingKit(p[0] - nx * RD, y + sill, p[1] - nz * RD, ang, ow * owF, head - sill, kind, style);
        const jw = ow * 0.07;
        for (const s of [-1, 1]) {
          const jp = at(t + s * (ow * owF * 0.5 + jw * 0.5), -RD * 0.5);
          a.add(G_BOXT, xf(jp[0], y + sill, jp[1], ang, jw, head - sill, RD), baseCol, surfBase, shade * 0.82);
        }
        // the head of the reveal, which throws the line down the glass
        a.add(G_BOXT, xf(at(t, -RD * 0.5)[0], y + head - 0.02, at(t, -RD * 0.5)[1], ang, ow * owF + jw * 2, 0.10, RD), baseCol, surfBase, shade * 0.80);
        // projecting sill and a lintel with a shadow line
        a.add(G_BOXT, xf(at(t, -0.24)[0], y + sill - 0.10, at(t, -0.24)[1], ang, ow + 0.3, 0.14, 0.5), baseCol, surfBase, shade * 1.06);
        /* A split unit under the window on the quieter elevations. Every
           building in the Gulf has them and this district had none: the asset
           was routed and never placed. Kept off the show frontages, which is
           also where they are in life. */
        if (MODEL_ROUTE.acunit && pub < 2 && chance(0.30)) {
          const ap = at(t + ow * 0.28, -0.42);
          inst('acunit', xf(ap[0], y + sill - 0.62, ap[1], ang + Math.PI / 2), pick([0xd8d4cc, 0xc9c5bc, 0xe2ded4]));
        }
        // a juliet rail across the opening, on the streets that show
        if (MODEL_ROUTE.balcrail && pub >= 1 && chance(0.26)) {
          const rp = at(t, -0.40);
          inst('balcrail', xf3(rp[0], y + sill + 0.02, rp[1], 0, ang + Math.PI / 2, 0, ow * owF / 1.6, 1, 1), pick([0x3c3a36, 0x4a463f, 0x2e2c29]));
        }
      }
    }
    if (lvl > 0) a.add(G_BOXT, xf(at(len - pierW / 2, 0)[0], y, at(len - pierW / 2, 0)[1], ang, pierW, fh, 0.5), baseCol, surfBody, shade);
    // a balcony every so often on the public sides
    if (lvl >= 2 && pub >= 1 && chance(0.55) && len > 9) {
      const bt = mix(len * 0.2, len * 0.8, rnd());
      balcony(at(bt, 0)[0], y + 0.1, at(bt, 0)[1], ang, nx, nz, mix(3.2, 6.4, rnd()), style, baseCol, shade);
    }
    // the timber eave over the shopfronts: one fascia, real rafters, and the
    // shadow it throws down the wall is half of what makes a souq a souq
    if (style === 'souq' && fl === 1 && pub >= 2 && lvl >= 2 && chance(0.55)) {
      const mid = at(len / 2, -0.86);
      f.add(G_BOXT, xf(mid[0], y - 0.40, mid[1], ang, 0.20, 0.28, len), K.timberDk, S.TIMBER, 0.82);
      f.add(G_BOXT, xf(at(len / 2, -0.42)[0], y - 0.08, at(len / 2, -0.42)[1], ang, 1.05, 0.11, len), K.timber, S.TIMBER, 0.88);
      const n = Math.max(3, Math.round(len / 1.15));
      for (let i = 0; i < n; i++) {
        const q = at((i + 0.5) * len / n, -0.5);
        f.add(G_BOXT, xf(q[0], y - 0.28, q[1], ang, 1.15, 0.12, 0.10), pick([K.timber, K.timberLt, K.timberDk]), S.TIMBER, 0.78 + rnd() * 0.2);
      }
      // and a bracket under every third rafter
      for (let i = 1; i < n; i += 5) {
        const q = at((i + 0.5) * len / n, -0.22);
        inst('bracket', xf3(q[0], y - 0.40, q[1], 0, ang + Math.PI / 2, 0, 0.6, 0.6, 0.6), pick([K.timberDk, K.timber]));
      }
    }
  }
}

/* office elevation: vertical timber louvres over glass, with a planted
   balcony band every third floor — the khobar2 language                  */
function officeBand(S4, y, fh, len, nb, bw, ang, nx, nz, ux, uz, fl, floors, baseCol, shade, lvl) {
  const a = ACC.arch, f = ACC.fine;
  const at = (t, off) => [S4.x0 + ux * t + nx * (off || 0), S4.z0 + uz * t + nz * (off || 0)];
  const band = fl % 3 === 0 && fl < floors - 1;
  const mid = at(len / 2, 0);
  // glazing plane, set back
  GLASS.add(G_BOXT, xf(mid[0] - nx * 0.34, y + 0.16, mid[1] - nz * 0.34, ang, len - 0.4, fh - 0.32, 0.10), 0x2b3f52, S.METAL, 1);
  EMIS.add(G_BOXT, xf(mid[0] - nx * 0.92, y + 0.5, mid[1] - nz * 0.92, ang, len - 1.2, fh - 1.4, 0.06),
    fl % 2 ? 0x7f9ec4 : 0xd9c49a, 0, 0.55);
  // floor slab band, white
  a.add(G_BOXT, xf(mid[0] + nx * 0.10, y - 0.24, mid[1] + nz * 0.10, ang, len + 0.5, 0.42, 0.9), 0xe2ddd0, S.CONCRETE, shade * 1.06);
  if (band) {
    // planted balcony: slab, glass rail, foliage
    a.add(G_BOXT, xf(mid[0] - nx * -1.15, y + 0.02, mid[1] - nz * -1.15, ang, len - 1.0, 0.28, 2.3), 0xe2ddd0, S.CONCRETE, shade * 1.02);
    const n = Math.max(3, Math.round(len / 2.4));
    for (let i = 0; i < n; i++) {
      const q = at((i + 0.5) * len / n, -2.0);
      inst('roofbush', xf3(q[0], y + 0.18, q[1], 0, rnd() * 6.28, 0, 1.1 + rnd() * 0.5, 0.9 + rnd() * 0.5, 1.1 + rnd() * 0.5),
        pick([K.leaf, K.leafLt, K.leafDk]));
    }
    GLASS.add(G_BOXT, xf(mid[0] + nx * 2.2, y + 0.3, mid[1] + nz * 2.2, ang, len - 1.2, 1.05, 0.06), 0x9fb6c4, S.METAL, 1);
  } else if (lvl >= 1) {
    // the louvre run: tapered timber fins on a jittered rhythm
    const n = Math.max(5, Math.round(len / 0.52));
    for (let i = 0; i < n; i++) {
      const t = (i + 0.5) * len / n + (rnd() - 0.5) * 0.10;
      const q = at(t, -0.05);
      const dep = 0.20 + rnd() * 0.14;
      inst('louvre', xf3(q[0], y + 0.10, q[1], 0, ang - Math.PI / 2, 0, 0.17, fh - 0.30, dep),
        pick([K.timber, K.timberLt, 0x9a6a3c, 0x7d5730]));
    }
  }
}

/* window / shutter / mashrabiya kit — instanced, so 3000 of them are cheap */
function openingKit(x, y, z, ang, w, h, kind, style) {
  /* A wide opening is a run of panes, not one pane stretched.
     The window kit is a unit square carrying a frame, two jambs and exactly
     one vertical mullion. Scaled to a 4.35 m modern bay that mullion becomes
     160 mm of solid metal, the jambs 320 mm, and four metres of curtain wall
     gets a single division down the middle — which reads as a cartoon window
     blown up, and is worse the wider the bay. Widening the bays for the
     downtown made this visible, so the opening is now subdivided into panes
     of a real size and each one gets its own frame at its own proportions. */
  if (kind === 'window' && w > 2.0) {
    const n = Math.max(2, Math.round(w / 1.45));
    const pw = w / n;
    const sx = Math.sin(ang), sz = Math.cos(ang);   // along the wall
    for (let i = 0; i < n; i++) {
      const t = -w / 2 + pw * (i + 0.5);
      openingKit(x + sx * t, y, z + sz * t, ang, pw, h, '_pane', style);
    }
    return;
  }
  const sc = xf3(x, y, z, 0, ang + Math.PI / 2, 0, w, h, 1);
  if (kind === '_pane') {
    inst('window', sc, pick([0x2a3540, 0x27313b, 0x323d47]));
    if (chance(0.72)) inst('winglow', sc, pick([0xffcf94, 0xffdcae, 0xf7be7c]));
    return;
  }
  if (kind === 'mashrabiya') {
    inst('mashrabiya', sc, 0xffffff);
    inst('mashframe', sc, pick([K.timberDk, 0x4a2f1a, 0x63421f]));
    inst('mashglow', sc, pick([0xffc98a, 0xffb877, 0xffd9a8]));
  } else if (kind === 'shutter') {
    inst('shutter', sc, pick([K.timber, 0x5b3b20, 0x7a5330, 0x46301c]));
  } else {
    inst('window', sc, pick([0x2a3540, 0x27313b, 0x323d47]));
    if (chance(0.72)) inst('winglow', sc, pick([0xffcf94, 0xffdcae, 0xf7be7c]));
  }
}

function balcony(x, y, z, ang, nx, nz, w, style, baseCol, shade) {
  const a = ACC.arch, f = ACC.fine;
  const d = 1.35;
  a.add(G_BOXT, xf(x - nx * d / 2, y, z - nz * d / 2, ang, w, 0.24, d), baseCol, S.CONCRETE, shade * 1.04);
  // balustrade: slender uprights + rail
  const n = Math.max(3, Math.round(w / 0.36));
  for (let i = 0; i <= n; i++) {
    const t = -w / 2 + w * i / n;
    const px = x + Math.cos(ang) * t - nx * d;
    const pz = z - Math.sin(ang) * t - nz * d;
    f.add(G_BOXT, xf(px, y + 0.24, pz, ang, 0.05, 0.92, 0.05), K.steelDk, S.METAL, 0.9);
  }
  f.add(G_BOXT, xf(x - nx * d, y + 1.14, z - nz * d, ang, w, 0.09, 0.09), K.steelDk, S.METAL, 0.98);
  for (const s of [-1, 1]) {
    const px = x + Math.cos(ang) * s * w / 2 - nx * d / 2;
    const pz = z - Math.sin(ang) * s * w / 2 - nz * d / 2;
    f.add(G_BOXT, xf(px, y + 0.24, pz, ang, 0.05, 0.92, d), K.steelDk, S.METAL, 0.9);
  }
  // and something living on it
  if (chance(0.7)) {
    const px = x + Math.cos(ang) * (rnd() - 0.5) * w * 0.7 - nx * d * 0.65;
    const pz = z - Math.sin(ang) * (rnd() - 0.5) * w * 0.7 - nz * d * 0.65;
    inst('pot', xf(px, y + 0.24, pz, rnd() * 6.28, 0.7, 0.7, 0.7), 0xcbb79a);
    inst('potbush', xf3(px, y + 0.66, pz, 0, rnd() * 6.28, 0, 0.8, 0.8, 0.8), pick([K.leaf, K.leafLt]));
  }
}

/* ------------------------------------------------------------ roofscape *
   Nothing is bare, including the fifth elevation: plant screens, tanks in
   vernacular housings, condenser blocks behind mashrabiya, and green roofs
   exactly as the aerial render shows them.                                */
/* From two hundred metres up you do not see a street, a shopfront or a person.
   You see roofs — and a district whose roofs are bare tan slabs with a grey
   box on each reads as a model of a town however good the streets are. So the
   roofscape carries the aerial: planted terraces that read as green mass,
   pergolas that read as striped dark rectangles, photovoltaic arrays that read
   as deep blue, and on the better blocks somewhere to sit. */
function roofscape(cx, cz, w, d, top, o) {
  const a = ACC.arch;
  const n = Math.max(1, Math.round(w * d / 260));
  const green = o.green === undefined ? chance(0.78) : o.green;
  const area = w * d;

  // ---- a pergola: the most legible thing on a roof from the air
  if (area > 130 && chance(0.5)) {
    const pw = Math.min(w * 0.42, 9 + rnd() * 7), pd = Math.min(d * 0.42, 5 + rnd() * 5);
    const px = cx + (rnd() - 0.5) * (w - pw) * 0.7, pz = cz + (rnd() - 0.5) * (d - pd) * 0.7;
    const pc = pick([0x59422a, 0x6b5133, 0x4a3826]);
    for (const sx of [-1, 1]) for (const sz of [-1, 1]) {
      a.add(G_BOXT, xf(px + sx * pw / 2, top, pz + sz * pd / 2, 0, 0.16, 2.5, 0.16), pc, S.TIMBER, 0.8);
    }
    for (const sz of [-1, 1]) a.add(G_BOXT, xf(px, top + 2.42, pz + sz * pd / 2, 0, pw + 0.3, 0.16, 0.18), pc, S.TIMBER, 0.95);
    const nb = Math.max(4, Math.round(pw / 0.42));
    for (let i = 0; i < nb; i++) {
      a.add(G_BOXT, xf(px - pw / 2 + pw * (i + 0.5) / nb, top + 2.58, pz, 0, 0.09, 0.11, pd + 0.5), pc, S.TIMBER, 1.05);
    }
    if (chance(0.6)) {
      for (let i = 0; i < 3; i++) {
        inst('bougain', xf3(px + rr(-pw * 0.4, pw * 0.4), top + 2.1, pz + (chance(0.5) ? -1 : 1) * pd / 2, 0,
          rnd() * 6.28, 0, rr(0.80, 1.25), rr(0.55, 0.85), rr(0.80, 1.25)), pick([0xc0327a, 0xd8447e, 0xa8286b]));
      }
    }
    if (chance(0.55)) {
      inst('table', xf(px, top, pz, rnd() * 6.28, 0.9, 0.9, 0.9), 0xe8e3d6);
      for (let c2 = 0; c2 < 3; c2++) {
        const a2 = rnd() * 6.28;
        inst('chair', xf(px + Math.sin(a2) * 0.9, top, pz + Math.cos(a2) * 0.9, a2 + Math.PI, 0.9, 0.9, 0.9), 0xefeade);
      }
    }
  }

  // ---- photovoltaics: rows of tilted panels, the strongest value on a roof
  if (area > 200 && chance(0.42)) {
    const rows = 2 + Math.floor(rnd() * 3);
    const ax = cx + (rnd() - 0.5) * w * 0.3, az = cz + (rnd() - 0.5) * d * 0.3;
    const rw = Math.min(w * 0.5, 10);
    // a real array where one was generated, the tilted box where it was not
    const pv = !!MODEL_ROUTE.pvarray;
    for (let r2 = 0; r2 < rows; r2++) {
      const rz = az - rows * 0.9 + r2 * 1.8;
      if (pv) {
        const n = Math.max(1, Math.round(rw / 4.4));
        for (let k = 0; k < n; k++) {
          inst('pvarray', xf(ax - rw / 2 + rw * (k + 0.5) / n, top + 0.02, rz, 0));
        }
        continue;
      }
      a.add(G_BOXT, xf(ax, top + 0.30, rz, 0, rw, 0.06, 1.15), 0x1b2740, S.METAL, 0.72, undefined, -0.42);
      for (const sx of [-1, 1]) a.add(G_BOXT, xf(ax + sx * rw * 0.45, top, rz, 0, 0.07, 0.34, 0.07), 0x7d7668, S.METAL, 0.8);
    }
  }

  if (green) {
    // planted roof: a raised bed with a low kerb and massed shrubs
    const bw = w * (0.38 + rnd() * 0.34), bd = d * (0.38 + rnd() * 0.34);
    const bx = cx + (rnd() - 0.5) * (w - bw) * 0.6, bz = cz + (rnd() - 0.5) * (d - bd) * 0.6;
    a.add(G_BOXT, xf(bx, top, bz, 0, bw, 0.34, bd), 0xbdb2a0, S.CONCRETE, 0.95);
    inst('lawn', xf(bx, top + 0.34, bz, 0, bw * 0.94, 1, bd * 0.94),
      pick([0x528038, 0x5c8940, 0x4a7232, 0x466a35]));
    if (MODEL_ROUTE.hammock && bw > 5 && bd > 5 && chance(0.45)) {
      inst('hammock', xf(bx + rr(-bw * 0.25, bw * 0.25), top + 0.34,
        bz + rr(-bd * 0.25, bd * 0.25), rnd() * 6.28));
    }
    const cnt = Math.max(4, Math.round(bw * bd / 5.5));
    for (let i = 0; i < cnt; i++) {
      const px = bx + (rnd() - 0.5) * (bw - 0.9), pz = bz + (rnd() - 0.5) * (bd - 0.9);
      inst('roofbush', xf3(px, top + 0.28, pz, 0, rnd() * 6.28, 0, 0.8 + rnd() * 0.8, 0.7 + rnd() * 0.7, 0.8 + rnd() * 0.8),
        pick([K.leaf, K.leafLt, K.leafDk, 0x3d5c30]));
    }
    if (chance(0.5)) {
      for (let i = 0; i < 2; i++) {
        const px = bx + (rnd() - 0.5) * bw, pz = bz + (rnd() - 0.5) * bd;
        inst('rooftree', xf3(px, top + 0.3, pz, 0, rnd() * 6.28, 0, 1, 0.9 + rnd() * 0.4, 1), pick([K.leaf, K.leafLt]));
      }
    }
  }
  for (let i = 0; i < n; i++) {
    const px = cx + (rnd() - 0.5) * (w - 3.2), pz = cz + (rnd() - 0.5) * (d - 3.2);
    const r = rnd();
    if (r < 0.4) {
      // plant screen: mashrabiya louvres round a condenser
      const sw = 1.9 + rnd() * 1.8, sd = 1.6 + rnd() * 1.3;
      inst('acscreen', xf3(px, top, pz, 0, rnd() * 1.6, 0, sw, 1.5 + rnd() * 0.7, sd), pick([0x8d8271, 0x9c9080, 0x7d7364]));
    } else if (r < 0.72) {
      // water tank on a rendered plinth
      a.add(G_BOXT, xf(px, top, pz, 0, 1.9, 0.55, 1.9), 0xb5aa98, S.CONCRETE, 0.92);
      inst('tank', xf3(px, top + 0.55, pz, 0, rnd() * 6.28, 0, 1, 1 + rnd() * 0.5, 1), pick([0xd8d2c4, 0xc3bcae, 0xe0d8c8]));
    } else {
      inst('duct', xf3(px, top, pz, 0, rnd() * 3.14, 0, 0.8 + rnd() * 1.2, 0.7 + rnd() * 0.7, 2.4 + rnd() * 2.2), 0x9a9184);
    }
  }
  // a stair head box on most roofs — the reason a roof terrace is reachable
  if (chance(0.6)) {
    const px = cx + (rnd() - 0.5) * (w - 4), pz = cz + (rnd() - 0.5) * (d - 4);
    a.add(G_BOXT, xf(px, top, pz, 0, 2.6, 2.5, 2.4), 0xc0b49e, S.RENDER, 0.98);
    a.add(G_BOXT, xf(px, top + 2.5, pz, 0, 3.0, 0.2, 2.8), 0xa8a196, S.CONCRETE, 1.04);
  }
}

/* ============================================================== THE ZONES */
function buildBlocks() {
  // ---------- RETAIL: the souq spine ----------
  CURCHUNK = 'souq';
  {
    const S1 = PLAN.souq, spine = PLAN.spineX;
    for (const side of [-1, 1]) {
      const inner = spine + side * 6.4;
      const outer = spine + side * (30 + rnd() * 8);
      let z = S1.z0;
      while (z < S1.z1) {
        const dep = 13 + rnd() * 9;
        // the spine kinks: the frontage steps in and out so the street is
        // never a corridor and the eye always has a corner to turn
        const kink = 2.6 * Math.sin(z * 0.021) + 1.4 * Math.sin(z * 0.057 + 1.3);
        const x0 = Math.min(inner + kink * side, outer), x1 = Math.max(inner + kink * side, outer);
        block(x0, z, x1, z + dep, {
          floors: chance(0.13) ? 3 : (chance(0.46) ? 1 : 2), floorH: 3.35 + rnd() * 0.6,
          style: 'souq', detail: 2, green: chance(0.3),
          parapet: chance(0.55) ? 'crenel' : 'step',
          sides: side > 0 ? [1, 0, 1, 2] : [1, 2, 1, 0],
        });
        z += dep + 3.5 + rnd() * 5.5;      // the alleys between the shops
      }
    }
    // deeper retail behind the frontage
    for (const side of [-1, 1]) {
      const x0 = spine + side * 40, x1 = spine + side * 72;
      for (const p of subdivide(Math.min(x0, x1), S1.z0, Math.max(x0, x1), S1.z1, 12, 26, 6.5)) {
        block(p[0], p[1], p[2], p[3], { floors: ri(1, 3), floorH: 3.5, style: 'souq', detail: 2 });
      }
    }
  }

  // ---------- ENTERTAINMENT: the brick quarter ----------
  CURCHUNK = 'enter';
  {
    const Z = PLAN.enter;
    const plots = subdivide(Z.x0, Z.z0, Z.x1, Z.z1, 16, 40, 11);
    const MJ = { x0: PLAN.majlis.x - 22, x1: PLAN.majlis.x + 22, z0: PLAN.majlis.z - 20, z1: PLAN.majlis.z + 20 };
    const DP = PLAN.dtplaza;
    for (const p of plots) {
      // the majlis block is placed by hand: nothing may overlap its plot
      if (p[0] < MJ.x1 && p[2] > MJ.x0 && p[1] < MJ.z1 && p[3] > MJ.z0) continue;
      /* nor the downtown plaza, which is composed by hand and is the one view
         in the district that has to hold up against the reference renders */
      if (p[0] < DP.x1 + 24 && p[2] > DP.x0 - 24 && p[1] < DP.z1 + 24 && p[3] > DP.z0 - 24) continue;
      /* subdivide knows nothing about roads, so the two plaza-edge streets
         get their corridors rejected explicitly — a plot straddling a
         carriageway is a building standing in traffic */
      if (p[1] < 314 && p[3] > 286) continue;               // Plaza South street
      if (p[0] < 314 && p[2] > 286 && p[3] > 96) continue;  // Rotunda street
      /* This quarter used to be brick end to end — a quarter of a kilometre
         of red masonry, which is the loudest thing in the district and is in
         none of the reference renders. The reference streets are sandstone
         and limestone with brick as an accent, and the brick hotel and cinema
         that stand here can only read as set pieces if the fabric around them
         is not the same material. Brick is now roughly one plot in three. */
      const brickHere = chance(0.34);
      block(p[0], p[1], p[2], p[3], {
        floors: ri(2, 5), floorH: 3.6 + rnd() * 0.35,
        style: brickHere ? 'brick' : (chance(0.5) ? 'sand' : 'trav'), detail: 2,
        // this is the downtown: it is drawn as stone and glass, not as a fort
        modern: true, green: chance(0.4),
      });
    }
  }

  // ---------- COMMERCIAL: the office edge ----------
  CURCHUNK = 'comm';
  {
    const Z = PLAN.comm, C4 = PLAN.court;
    const plots = subdivide(Z.x0, Z.z0, Z.x1, Z.z1, 18, 46, 13);
    for (const p of plots) {
      const cx = (p[0] + p[2]) / 2, cz = (p[1] + p[3]) / 2;
      if (cx > C4.x0 - 8 && cx < C4.x1 + 8 && cz > C4.z0 - 8 && cz < C4.z1 + 8) continue;
      const tall = chance(0.42);
      block(p[0], p[1], p[2], p[3], {
        floors: tall ? ri(6, 9) : ri(3, 5), floorH: 3.9, style: tall ? 'office' : 'trav',
        detail: 2, parapet: 'step', green: chance(0.55),
      });
    }
  }

  // ---------- RESIDENTIAL: the courtyard fabric ----------
  CURCHUNK = 'resN';
  residentialFabric(PLAN.resN);
  CURCHUNK = 'resS';
  residentialFabric(PLAN.resS);
  CURCHUNK = 'resW';
  residentialFabric(PLAN.resW);

  // ---------- the existing town beyond the ring, graded out ----------
  CURCHUNK = 'outer';
  outerFabric();
}

function residentialFabric(Z) {
  const plots = subdivide(Z.x0, Z.z0, Z.x1, Z.z1, 15, 34, 12);
  for (const p of plots) {
    const w = p[2] - p[0], d = p[3] - p[1];
    const floors = ri(2, 4);
    /* detail follows the eye: the fabric you can actually walk up to keeps
       the full grammar, the deep background keeps only its silhouette */
    const cxp = (p[0] + p[2]) / 2, czp = (p[1] + p[3]) / 2;
    const dcore = Math.hypot(cxp - 20, czp - 200);
    const det = dcore < 300 ? 2 : (dcore < 430 ? 1 : 0);
    if (w > 24 && d > 24 && chance(0.55)) {
      // a real courtyard block: four wings round a void
      const t = 8.5 + rnd() * 3;
      const wings = [
        [p[0], p[1], p[2], p[1] + t], [p[0], p[3] - t, p[2], p[3]],
        [p[0], p[1] + t, p[0] + t, p[3] - t], [p[2] - t, p[1] + t, p[2], p[3] - t],
      ];
      for (const wg of wings) {
        block(wg[0], wg[1], wg[2], wg[3], { floors, floorH: 3.35, style: 'sand', detail: det, green: chance(0.55) });
      }
      // the courtyard itself: paving, a tree, a bench
      const cx = (p[0] + p[2]) / 2, cz = (p[1] + p[3]) / 2;
      paved(ACC.ground, p[0] + t, p[1] + t, p[2] - t, p[3] - t, 0.10, 0xc7b9a0, 0.80);
      inst('tree', xf3(cx, terrainY(cx, cz), cz, 0, rnd() * 6.28, 0, 1, 1, 1), pick([K.leaf, K.leafLt]));
    } else {
      block(p[0], p[1], p[2], p[3], { floors, floorH: 3.35, style: 'sand', detail: det, green: chance(0.5) });
    }
  }
}

/* the edge is designed, not fogged: an older, lower, quieter town runs out
   to a perimeter road and a graded desert apron beyond it                 */
function outerFabric() {
  const B = PLAN.bounds;
  const rings = [
    [B.x0 - 250, B.z0 - 190, B.x0 - 20, B.z1 + 190],
    [B.x1 + 20, B.z0 - 190, B.x1 + 250, B.z1 + 190],
    [B.x0 - 250, B.z1 + 20, B.x1 + 250, B.z1 + 230],
    [B.x0 - 250, B.z0 - 230, B.x1 + 250, B.z0 - 20],
  ];
  for (const r of rings) {
    for (const p of subdivide(r[0], r[1], r[2], r[3], 14, 30, 13)) {
      const cx = (p[0] + p[2]) / 2, cz = (p[1] + p[3]) / 2;
      /* derived from the plan rather than hard-coded, or halving the district
         leaves the outer town thinning around a boundary that no longer
         exists — a ring of full-detail blocks stranded out in the desert */
      const cxL = (B.x1 - B.x0) / 2 + 40, czC = (B.z0 + B.z1) / 2;
      const czL = (B.z1 - B.z0) / 2 + 60;
      const dist = Math.max(Math.abs(cx) - cxL, Math.abs(cz - czC) - czL);
      if (rnd() < sstep(-40, 220, dist) * 0.85) continue;      // thins outward
      /* The background town was built at detail 0 past forty metres — massing
         boxes with no facade grammar at all — which was defensible when the
         plan was 940 m across and you rarely saw it. Halving the district put
         it in shot: the reference aerials show a city with real elevations
         running to the horizon, not a field of blocks. The nearest ring now
         gets the full grammar, the next the medium one, and only genuinely
         distant work stays massing. It still thins outward, so this is paid
         for out of the plots that were culled rather than added on top. */
      block(p[0], p[1], p[2], p[3], {
        floors: ri(1, 3), floorH: 3.2,
        style: chance(0.45) ? 'trav' : 'sand',
        detail: dist < 30 ? 2 : (dist < 130 ? 1 : 0),
        collide: false, green: chance(0.2),
      });
    }
  }
  // the perimeter road that closes the plan
  const a = ACC.ground;
  const R = PLAN.ring;
  stripe(a, -R - 40, B.z0 - 20, R + 40, B.z0 - 20, 20, 0.10, 0x4a463f, S.ASPHALT, 0.8);
  stripe(a, -R - 40, B.z1 + 20, R + 40, B.z1 + 20, 20, 0.10, 0x4a463f, S.ASPHALT, 0.8);
  stripe(a, -R - 40, B.z0 - 20, -R - 40, B.z1 + 20, 20, 0.10, 0x4a463f, S.ASPHALT, 0.8);
  stripe(a, R + 40, B.z0 - 20, R + 40, B.z1 + 20, 20, 0.10, 0x4a463f, S.ASPHALT, 0.8);
}

/* ===================================================== CONTENT: SET PIECES */

/* -------------------------------------------------- THE GOLDEN CANOPY ==
   The district's hero. A true space-frame: a triangulated deck of gold
   panels on slender raking columns, with two rectangular voids punched
   through it so daylight and palms come down into the plaza. Every panel is
   a real triangle with its own tilt and its own tone.                     */
function buildCanopy() {
  CURCHUNK = 'canopy';
  const CP = PLAN.canopy;
  const a = ACC.arch, f = ACC.fine;
  const y = CP.h;
  const cx = (CP.x0 + CP.x1) / 2, cz = (CP.z0 + CP.z1) / 2;
  const W = CP.x1 - CP.x0, D = CP.z1 - CP.z0;
  const GRID = 4.8;                                   // panel module
  const nx = Math.round(W / GRID), nz = Math.round(D / GRID);
  const sx = W / nx, sz = D / nz;

  // the voids: two courtyards cut out of the deck
  const VOIDS = [
    { x0: CP.x0 + 16, x1: CP.x0 + 40, z0: CP.z0 + 32, z1: CP.z0 + 72 },
    { x0: CP.x0 + 64, x1: CP.x0 + 88, z0: CP.z0 + 16, z1: CP.z0 + 56 },
  ];
  const inVoid = (px, pz) => VOIDS.some(v => px > v.x0 && px < v.x1 && pz > v.z0 && pz < v.z1);

  // a gentle warp so the deck is a surface, not a slab
  const dh = (i, j) => {
    const u = i / nx - 0.5, v = j / nz - 0.5;
    return -1.35 * (u * u + v * v * 0.7) * 2.2 + 0.42 * Math.sin(i * 0.9) * Math.cos(j * 0.7);
  };
  const P = (i, j) => new THREE.Vector3(CP.x0 + i * sx, y + dh(i, j), CP.z0 + j * sz);

  const panelAcc = new Acc();
  let panels = 0;
  for (let j = 0; j < nz; j++) {
    for (let i = 0; i < nx; i++) {
      const mx = CP.x0 + (i + 0.5) * sx, mz = CP.z0 + (j + 0.5) * sz;
      if (inVoid(mx, mz)) continue;
      const p00 = P(i, j), p10 = P(i + 1, j), p11 = P(i + 1, j + 1), p01 = P(i, j + 1);
      const flip = ((i + j) & 1) === 0;
      const tris = flip ? [[p00, p10, p11], [p00, p11, p01]] : [[p00, p10, p01], [p10, p11, p01]];
      for (let t = 0; t < 2; t++) {
        const tr = tris[t];
        /* Each triangle is a shallow folded panel, not a pyramid: the lift is
           a few centimetres per metre, enough for the low sun to separate
           every facet into its own tone the way the render's deck does, and
           small enough that the deck still reads as one plane. */
        const lift = 0.10 + rnd() * 0.16;
        const c = new THREE.Vector3().addVectors(tr[0], tr[1]).add(tr[2]).multiplyScalar(1 / 3);
        c.y += lift;
        const tone = 0.80 + rnd() * 0.44;
        const col = rnd() < 0.20 ? K.goldLt : (rnd() < 0.24 ? K.goldDk : K.gold);
        panelAcc.tri(tr[1], tr[0], c, col, S.METAL, tone);
        panelAcc.tri(tr[2], tr[1], c, col, S.METAL, tone * 0.90);
        panelAcc.tri(tr[0], tr[2], c, col, S.METAL, tone * 1.08);
        /* the soffit is folded too, and downward — so the column uplights
           break it into individual lit facets instead of washing one flat
           ceiling. It is the brightest thing over the plaza at dusk. */
        const cu = new THREE.Vector3().addVectors(tr[0], tr[1]).add(tr[2]).multiplyScalar(1 / 3);
        cu.y -= 0.22 + rnd() * 0.18;
        const ut = 0.86 + rnd() * 0.40;
        const ucol = rnd() < 0.30 ? 0xe8c268 : 0xd6a94c;
        panelAcc.tri(tr[0], tr[1], cu, ucol, S.METAL, ut);
        panelAcc.tri(tr[1], tr[2], cu, ucol, S.METAL, ut * 1.10);
        panelAcc.tri(tr[2], tr[0], cu, ucol, S.METAL, ut * 0.88);
        panels++;
      }
    }
  }
  // a deep fascia beam right round the perimeter and round each void: this is
  // the edge that gives the canopy a thickness and a shadow line
  const fascia = (x0, z0, x1, z1, dep) => {
    for (const e of [[x0, z0, x1, z0], [x1, z0, x1, z1], [x1, z1, x0, z1], [x0, z1, x0, z0]]) {
      const len = Math.hypot(e[2] - e[0], e[3] - e[1]);
      f.add(G_BOXT, xf((e[0] + e[2]) / 2, y - dep, (e[1] + e[3]) / 2,
        Math.atan2(e[2] - e[0], e[3] - e[1]), 0.42, dep + 0.30, len), K.goldDk, S.METAL, 0.86);
    }
  };
  fascia(CP.x0, CP.z0, CP.x1, CP.z1, 1.05);
  for (const v of VOIDS) fascia(v.x0, v.z0, v.x1, v.z1, 0.85);
  const pg = panelAcc.geometry();
  addMesh(pg, cityMat);
  INSTCOUNT.canopyPanels = panels;

  /* ---- the frame below the deck. Only the primary chords are expressed:
     the render's soffit is calm, and a full three-way space frame at 8 m
     reads as scaffolding from underneath. */
  for (let j = 0; j <= nz; j++) {
    for (let i = 0; i <= nx; i++) {
      const p = P(i, j);
      if (i < nx) {
        const mx = p.x + sx * 0.5;
        if (!inVoid(mx, p.z)) {
          const q = P(i + 1, j);
          strut(f, p.x, p.y - 0.50, p.z, q.x, q.y - 0.50, q.z, 0.085, 0x9c8340);
        }
      }
      if (j < nz) {
        const mz = p.z + sz * 0.5;
        if (!inVoid(p.x, mz)) {
          const q = P(i, j + 1);
          strut(f, p.x, p.y - 0.50, p.z, q.x, q.y - 0.50, q.z, 0.085, 0x9c8340);
        }
      }
    }
  }

  /* ---- columns: one slender tapered shaft per four modules, opening into a
     three-armed capital that reaches the deck — the render's trees of steel */
  const COLSTEP = 7;
  for (let j = 1; j < nz; j += COLSTEP) {
    for (let i = 1; i < nx; i += COLSTEP) {
      const p = P(i, j);
      if (inVoid(p.x, p.z)) continue;
      const gy = terrainY(p.x, p.z) + 0.18;
      const capY = p.y - 3.4;
      f.add(taper(0.52, 1), xf(p.x, gy, p.z, rnd() * 0.4, 0.58, capY - gy, 0.58), 0xb59a52, S.METAL, 0.92);
      for (let k = 0; k < 3; k++) {
        const ang = k / 3 * 6.283 + 0.5;
        strut(f, p.x, capY - 0.2, p.z,
          p.x + Math.sin(ang) * sx * 1.9, p.y - 0.62, p.z + Math.cos(ang) * sz * 1.9, 0.115, 0xb59a52);
      }
      ACC.arch.add(G_CYLT, xf(p.x, gy - 0.08, p.z, 0, 1.15, 0.34, 1.15), 0x9d8845, S.METAL, 0.84);
      inst('uplight', xf(p.x, gy + 0.34, p.z), 0xffca85);
      PRACTICALS.push({ x: p.x, y: gy + 2.4, z: p.z, c: 0xffbe78, i: 6.5, r: 26 });
      // a ring bench round every third column: the plaza's social furniture
      if ((i + j) % 3 === 1) {
        for (let b = 0; b < 5; b++) {
          const ba = b / 5 * 6.283 + rnd() * 0.3;
          inst('bench', xf(p.x + Math.sin(ba) * 2.6, gy, p.z + Math.cos(ba) * 2.6, ba + Math.PI / 2), pick([0xd6c6a8, 0xcbbb9c]));
        }
      }
    }
  }

  // ---- the plaza floor under the canopy
  paved(ACC.ground, CP.x0 - 4, CP.z0 - 4, CP.x1 + 4, CP.z1 + 4, 0.18, K.travert, 1.0, S.TRAVERTINE);
  platform(CP.x0 - 4, CP.z0 - 4, CP.x1 + 4, CP.z1 + 4, terrainY(cx, cz) + 0.18);
  /* NOTHING IS BARE: a 200 m plaza needs rows of palms, planting beds, café
     clusters and lit bollards, or the canopy is a car park with a roof. */
  const dnx = Math.max(1, Math.round(W / 8.0)), dnz = Math.max(1, Math.round(D / 8.0));
  const dsx = W / dnx, dsz = D / dnz;
  for (let j = 0; j < dnz; j++) {
    for (let i = 0; i < dnx; i++) {
      const px = CP.x0 + (i + 0.5) * dsx + rr(-1.6, 1.6);
      const pz = CP.z0 + (j + 0.5) * dsz + rr(-1.6, 1.6);
      if (inVoid(px, pz)) continue;
      if (Math.abs(px - PLAN.water.x) < 5.5) continue;
      const gy = dressY(px, pz);
      const r = rnd() * 2.4;      // most modules stay open floor
      if (r < 0.30) {
        // a planted bed with its own kerb, a palm and massed shrubs
        inst('planter', xf3(px, gy, pz, 0, rnd() * 6.28, 0, 2.4 + rnd() * 1.1, 1.0, 2.4 + rnd() * 1.1), pick([0xcabb9d, 0xd2c3a4]));
        inst('palm', xf3(px, gy + 0.3, pz, 0, rnd() * 6.28, 0, 0.95 + rnd() * 0.3, 1.05 + rnd() * 0.35, 0.95 + rnd() * 0.3), 0xffffff);
        for (let k = 0; k < 3; k++) {
          inst('shrub', xf3(px + rr(-0.9, 0.9), gy + 0.62, pz + rr(-0.9, 0.9), 0, rnd() * 6.28, 0, 1.0, 0.85, 1.0),
            pick([K.leaf, K.leafLt, K.leafDk]));
        }
      } else if (r < 0.52) {
        inst('table', xf(px, gy, pz, rnd() * 6.28), 0xe8e3d6);
        for (let c = 0; c < ri(2, 4); c++) {
          const ang = rnd() * 6.28;
          inst('chair', xf(px + Math.sin(ang) * 1.02, gy, pz + Math.cos(ang) * 1.02, ang + Math.PI), 0xefeade);
        }
        if (chance(0.4)) inst('umbrella', xf(px, gy, pz, rnd() * 6.28), pick([0xb9b3a4, 0xc6c0b0]));
      } else if (r < 0.66) {
        inst('bench', xf(px, gy, pz, rnd() * 6.28), pick([0xd6c6a8, 0xcbbb9c]));
        inst('bollard', xf(px + rr(-3, 3), gy, pz + rr(-3, 3), 0), 0xffffff);
      } else if (r < 0.76) {
        inst('pot', xf(px, gy, pz, rnd() * 6.28, 1.25, 1.25, 1.25), pick([0xd8ccb2, 0xcabb9d]));
        inst('olive', xf3(px, gy + 0.62, pz, 0, rnd() * 6.28, 0, 0.85, 0.85, 0.85), pick([K.leaf, 0x6d7f52]));
      } else if (r < 0.84) {
        inst('bollard', xf(px, gy, pz, 0), 0xffffff);
        PRACTICALS.push({ x: px, y: gy + 0.9, z: pz, c: 0xffcf8e, i: 1.6, r: 7 });
      }
    }
  }
  for (const v of VOIDS) {
    // the voids read as planted courts open to the sky
    paved(ACC.ground, v.x0, v.z0, v.x1, v.z1, 0.24, 0xbca886, 0.95);
    const n = Math.round((v.x1 - v.x0) * (v.z1 - v.z0) / 62);
    for (let i = 0; i < n; i++) {
      const px = mix(v.x0 + 3, v.x1 - 3, rnd()), pz = mix(v.z0 + 3, v.z1 - 3, rnd());
      inst('palm', xf3(px, dressY(px, pz), pz, 0, rnd() * 6.28, 0, 1, 1.15 + rnd() * 0.55, 1), 0xffffff);
    }
    for (let i = 0; i < 8; i++) {
      const px = mix(v.x0 + 2, v.x1 - 2, rnd()), pz = mix(v.z0 + 2, v.z1 - 2, rnd());
      const vgy = dressY(px, pz);
      inst('planter', xf3(px, vgy + 0.06, pz, 0, rnd() * 6.28, 0, 1.8, 1, 1.8), 0xcabb9d);
      inst('shrub', xf3(px, vgy + 0.68, pz, 0, rnd() * 6.28, 0, 1.6, 1.3, 1.6), pick([K.leaf, K.leafLt]));
    }
  }
  occluder(cx, cz, W / 2, D / 2, y);
}

/* a box strut between two points — the space-frame's only primitive */
function strut(a, x0, y0, z0, x1, y1, z1, r, colour) {
  const dx = x1 - x0, dy = y1 - y0, dz = z1 - z0;
  const len = Math.hypot(dx, dy, dz);
  if (len < 0.01) return;
  const m = new THREE.Matrix4();
  const up = new THREE.Vector3(0, 1, 0);
  const dir = new THREE.Vector3(dx, dy, dz).normalize();
  const q = new THREE.Quaternion().setFromUnitVectors(up, dir);
  m.compose(new THREE.Vector3((x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2), q, new THREE.Vector3(r, len, r));
  a.add(G_BOX, m, colour, S.METAL, 0.86);
}

/* ------------------------------------------------------------- WATCHTOWERS
   Two, and they do different jobs. The Najdi one closes the souq axis in
   render madinah2; the striped brick one carries the skyline in khobar1. */
function buildTowers() {
  CURCHUNK = 'towers';
  const a = ACC.arch, f = ACC.fine;

  // ---- the sandstone watchtower, tapered and battered
  {
    const T = PLAN.towerSouq;
    const gy = terrainY(T.x, T.z);
    const seg = 5, base = 7.4;
    let y = gy;
    for (let i = 0; i < seg; i++) {
      const h = T.h / seg;
      const w0 = base * (1 - i * 0.11), w1 = base * (1 - (i + 1) * 0.11);
      a.add(taper(w1 / w0, h), xf(T.x, y, T.z, 0, w0, h, w0), i === 0 ? K.sandDk : K.sand,
        i === 0 ? S.ASHLAR : S.RENDER, 0.94 + i * 0.02);
      // the drip course between stages
      a.add(G_BOXT, xf(T.x, y + h - 0.16, T.z, 0, w1 + 0.5, 0.26, w1 + 0.5), K.sandLt, S.RENDER, 1.06);
      // slit windows, glowing
      if (i > 0) {
        for (let s = 0; s < 4; s++) {
          const ang = s * Math.PI / 2;
          const r = w1 / 2 * 0.98;
          const px = T.x + Math.sin(ang) * r, pz = T.z + Math.cos(ang) * r;
          a.add(G_BOXT, xf(px, y + h * 0.34, pz, ang, 0.52, h * 0.34, 0.3), K.sandDk, S.RENDER, 0.7);
          EMIS.add(G_BOXT, xf(px, y + h * 0.38, pz, ang, 0.3, h * 0.24, 0.12), 0xffc27a, 0, 1);
        }
      }
      y += h;
    }
    const wTop = base * (1 - seg * 0.11);
    parapet(a, T.x - wTop / 2, T.z - wTop / 2, T.x + wTop / 2, T.z - wTop / 2, y, 1.1, K.sandLt, S.RENDER, 1.02, 'crenel');
    parapet(a, T.x + wTop / 2, T.z - wTop / 2, T.x + wTop / 2, T.z + wTop / 2, y, 1.1, K.sandLt, S.RENDER, 1.02, 'crenel');
    parapet(a, T.x + wTop / 2, T.z + wTop / 2, T.x - wTop / 2, T.z + wTop / 2, y, 1.1, K.sandLt, S.RENDER, 1.02, 'crenel');
    parapet(a, T.x - wTop / 2, T.z + wTop / 2, T.x - wTop / 2, T.z - wTop / 2, y, 1.1, K.sandLt, S.RENDER, 1.02, 'crenel');
    collider(T.x, T.z, base / 2, base / 2, 0, y);
    occluder(T.x, T.z, base / 2, base / 2, y);
    inst('uplight', xf(T.x + 4.5, gy + 0.4, T.z + 4.5), 0xffbe7a);
    inst('uplight', xf(T.x - 4.5, gy + 0.4, T.z + 4.5), 0xffbe7a);
  }

  // ---- the striped brick tower: red brick banded with white plaster
  {
    const T = PLAN.towerBrick;
    const gy = terrainY(T.x, T.z);
    const bands = 22;
    const base = 9.2;
    for (let i = 0; i < bands; i++) {
      const t0 = i / bands, t1 = (i + 1) / bands;
      const h = T.h / bands;
      const w0 = base * (1 - t0 * 0.30), w1 = base * (1 - t1 * 0.30);
      const white = (i % 2) === 1;
      a.add(taper(w1 / w0, h), xf(T.x, gy + t0 * T.h, T.z, 0, w0, h, w0),
        white ? 0xe6ded0 : K.brick, white ? S.RENDER : S.BRICK, white ? 1.02 : 0.96);
      if (white) {
        // the white bands stand slightly proud — that shadow line is the
        // whole reason the tower reads striped rather than painted
        a.add(taper(1, h * 0.5), xf(T.x, gy + t0 * T.h + h * 0.25, T.z, 0, w0 + 0.34, h * 0.5, w0 + 0.34), 0xefe7da, S.RENDER, 1.06);
      }
    }
    const wTop = base * 0.70;
    const ty = gy + T.h;
    for (const e of [[-1, -1, 1, -1], [1, -1, 1, 1], [1, 1, -1, 1], [-1, 1, -1, -1]]) {
      parapet(a, T.x + e[0] * wTop / 2, T.z + e[1] * wTop / 2, T.x + e[2] * wTop / 2, T.z + e[3] * wTop / 2,
        ty, 1.5, K.brickLt, S.BRICK, 1.0, 'crenel');
    }
    // a warm lantern room at the top
    EMIS.add(G_BOXT, xf(T.x, ty - 2.4, T.z, 0, wTop * 0.7, 1.5, wTop * 0.7), 0xffc98a, 0, 1);
    collider(T.x, T.z, base / 2, base / 2, 0, ty);
    occluder(T.x, T.z, base / 2, base / 2, ty);
  }
}

/* ------------------------------------------------------- THE MAJLIS ROOF
   khobar1, built: a walk-up terrace on a brick block with a white zigzag
   balustrade, string lights and lanterns, sadu rugs, low seating, a round
   table set for people, and potted palms — looking west over the district
   at the striped tower.                                                   */
function buildMajlis() {
  CURCHUNK = 'majlis';
  const a = ACC.arch, f = ACC.fine;
  const MX = PLAN.majlis.x, MZ = PLAN.majlis.z;
  const w = 34, d = 30;
  const x0 = MX - w / 2, x1 = MX + w / 2, z0 = MZ - d / 2, z1 = MZ + d / 2;
  const gy = terrainY(MX, MZ);
  const floors = 3, fh = 4.2;
  const top = gy + floors * fh;

  const b = block(x0, z0, x1, z1, {
    floors, floorH: fh, style: 'brick', detail: 2, parapet: 'none',
    green: false, roof: false, sides: [2, 2, 2, 2],
  });

  // the terrace deck, dark and warm, not black
  a.add(G_BOXT, xf(MX, top, MZ, 0, w - 1.0, 0.14, d - 1.0), 0x7a6f60, S.PAVING, 0.94);
  for (let i = 0; i < 10; i++) {
    inst('pool', xf3(MX + rr(-13, 13), top + 0.16, MZ + rr(-11, 11), 0, 0, 0, 11, 1, 11), 0xffc287);
  }
  platform(x0 + 0.6, z0 + 0.6, x1 - 0.6, z1 - 0.6, top + 0.12, 1);

  // the white zigzag balustrade on a brick upstand, west and south sides open
  const bal = [[x0, z0, x1, z0], [x1, z0, x1, z1], [x0, z1, x1, z1], [x0, z0, x0, z1]];
  for (let i = 0; i < 4; i++) {
    const e = bal[i];
    a.add(G_BOXT, xf((e[0] + e[2]) / 2, top + 0.12, (e[1] + e[3]) / 2,
      Math.atan2(e[2] - e[0], e[3] - e[1]), 0.46, 0.72, Math.hypot(e[2] - e[0], e[3] - e[1])),
      K.brick, S.BRICK, 0.98);
    parapet(f, e[0], e[1], e[2], e[3], top + 0.84, 0.86, 0xe8e2d4, S.CONCRETE, 1.06, 'zigzag');
  }

  // string lights round the parapet, each bulb its own instance so they can
  // flicker independently
  const per = 0.9;
  for (let i = 0; i < 4; i++) {
    const e = bal[i];
    const len = Math.hypot(e[2] - e[0], e[3] - e[1]);
    const n = Math.floor(len / per);
    for (let k = 0; k < n; k++) {
      const t = (k + 0.5) / n;
      const px = mix(e[0], e[2], t), pz = mix(e[1], e[3], t);
      const sag = 0.22 * Math.sin((k % 6) / 6 * Math.PI);
      inst('bulb', xf(px, top + 1.98 - sag, pz), 0xffcf8e);
      LIGHTS.push({ i: LIGHTS.length, ph: rnd() * 100 });
    }
    // hurricane lanterns at intervals, hanging off the brick upstand
    const nl = Math.max(2, Math.round(len / 5.5));
    for (let k = 0; k < nl; k++) {
      const t = (k + 0.5) / nl;
      const px = mix(e[0], e[2], t), pz = mix(e[1], e[3], t);
      inst('lantern', xf(px, top + 1.05, pz, 0), 0xd8a05a);
      PRACTICALS.push({ x: px, y: top + 0.7, z: pz, c: 0xffb066, i: 3.4, r: 9 });
      inst('lanternBody', xf(px, top + 1.05, pz, 0), 0xb0763c);
    }
  }

  // the majlis itself: rug, floor cushions, bolsters, low round table
  const cx = MX + 1.5, cz = MZ - 3.5, ty = top + 0.18;
  inst('rug', xf3(cx, ty, cz, 0, 0.12, 0, 9.5, 1, 6.2), 0xffffff);
  // the L of low seating along two sides
  for (let i = 0; i < 9; i++) {
    const t = i / 8;
    const px = cx - 4.0 + t * 8.0, pz = cz + 2.6;
    inst('cushion', xf3(px, ty, pz, 0, 0.06 + (rnd() - 0.5) * 0.1, 0, 1, 1, 1), pick([K.sadu, 0xb03a32, 0x8d2a26, 0xd9cbb4]));
    if (i % 2 === 0) inst('bolster', xf3(px, ty + 0.32, pz + 0.42, 0, 0.06, 0, 1, 1, 1), pick([K.sadu, 0xe0d3ba, 0x7d2622]));
  }
  for (let i = 0; i < 5; i++) {
    const t = i / 4;
    const px = cx + 4.2, pz = cz - 1.6 + t * 4.0;
    inst('cushion', xf3(px, ty, pz, 0, 1.57, 0, 1, 1, 1), pick([K.sadu, 0xb03a32, 0xd9cbb4]));
  }
  inst('lowtable', xf3(cx + 0.4, ty, cz - 0.4, 0, 0.3, 0, 1, 1, 1), 0xf2ece0);
  for (let i = 0; i < 5; i++) {
    const ang = rnd() * 6.28, r = rr(0.25, 0.75);
    inst('platter', xf3(cx + 0.4 + Math.sin(ang) * r, ty + 0.44, cz - 0.4 + Math.cos(ang) * r, 0, rnd() * 6.28, 0, 1, 1, 1),
      pick([0xd8894a, 0xc9b24a, 0xa8452f, 0xe0d8c4]));
  }
  // potted palms and a woven basket planter
  for (const p of [[x0 + 3.0, z0 + 3.2], [x1 - 3.2, z1 - 3.4], [x0 + 3.4, z1 - 4.0]]) {
    inst('basket', xf3(p[0], top + 0.18, p[1], 0, rnd() * 6.28, 0, 1.15, 1.1, 1.15), 0xa8875a);
    inst('yucca', xf3(p[0], top + 1.05, p[1], 0, rnd() * 6.28, 0, 1.2, 1.25, 1.2), pick([K.leaf, K.leafLt]));
  }

  // the stair up: an external flight against the east flank, walkable
  const sx = x1 + 2.4;
  ramp(sx, z0 + 3, sx, z0 + 3 + 15.5, gy, top + 0.12, 1.6);
  const steps = 26;
  for (let i = 0; i < steps; i++) {
    const t = i / steps;
    const pz = z0 + 3 + t * 15.5;
    a.add(G_BOXT, xf(sx, gy + t * (top + 0.12 - gy), pz, 0, 3.0, 0.22, 15.5 / steps + 0.1), 0xc4b294, S.TRAVERTINE, 0.92 + 0.1 * (i % 2));
  }
  f.add(G_BOXT, xf(sx + 1.55, gy + 0.4, z0 + 10.7, 0, 0.1, 1.0, 15.5), K.steelDk, S.METAL, 0.9);
  // and a gateway at the bottom so the way up is legible
  a.add(G_BOXT, xf(sx, gy, z0 + 2.2, 0, 3.6, 3.4, 0.5), K.brickDk, S.BRICK, 0.9);
  EMIS.add(G_BOXT, xf(sx, gy + 2.4, z0 + 2.0, 0, 1.6, 0.14, 0.1), 0xffb877, 0, 1);
  occluder(MX, MZ, w / 2, d / 2, top);

  /* ---- the neon calligraphy sign on the brick flank, as in khobar1 */
  const nz2 = z0 - 0.35;
  neonSign(MX - 6, top - 6.2, nz2, Math.PI, 5.2, 3.2);
  // the great studded timber door beneath it
  inst('bigdoor', xf(MX + 5, gy, z0 - 0.30, Math.PI), 0x6b4526);
  a.add(G_BOXT, xf(MX + 5, gy, z0 - 0.42, 0, 5.0, 5.6, 0.30), 0xcdbfa4, S.TRAVERTINE, 1.0);
  a.add(G_BOXT, xf(MX + 5, gy + 5.6, z0 - 0.42, 0, 5.8, 0.42, 0.5), 0xd6c8ac, S.TRAVERTINE, 1.06);
}

/* the neon: a tube path traced as small emissive boxes, so it glows like a
   bent tube rather than a decal */
function neonSign(x, y, z, ang, w, h) {
  const pts = [];
  // a stylised calligraphic mark: a long horizontal stroke, a bowl and a
  // rising tail — drawn parametrically so the seed varies its hand
  const N = 74;
  for (let i = 0; i < N; i++) {
    const t = i / (N - 1);
    let px, py;
    if (t < 0.42) { const u = t / 0.42; px = -0.5 + u * 1.0; py = 0.34 + 0.10 * Math.sin(u * 3.14); }
    else if (t < 0.78) { const u = (t - 0.42) / 0.36; px = 0.5 - u * 0.92; py = 0.34 - 0.46 * Math.sin(u * 3.14) - u * 0.12; }
    else { const u = (t - 0.78) / 0.22; px = -0.42 + u * 0.30; py = -0.24 + u * 0.72; }
    pts.push([px, py]);
  }
  for (let i = 0; i < pts.length - 1; i++) {
    const a0 = pts[i], a1 = pts[i + 1];
    const mx = (a0[0] + a1[0]) / 2 * w, my = (a0[1] + a1[1]) / 2 * h;
    const len = Math.hypot((a1[0] - a0[0]) * w, (a1[1] - a0[1]) * h) * 1.35;
    const rot = Math.atan2((a1[1] - a0[1]) * h, (a1[0] - a0[0]) * w);
    EMIS.add(G_BOX, xf3(x + mx * Math.cos(ang), y + my, z + mx * Math.sin(ang), 0, ang, rot, len, 0.12, 0.12), 0xffb0d0, 0, 1);
  }
  // the frame the tube is mounted on
  ACC.fine.add(G_BOX, xf3(x, y + h * 0.05, z + 0.06, 0, ang, 0, w * 1.25, h * 1.30, 0.08), 0x3a2a26, S.METAL, 0.6);
}

/* --------------------------------------------- THE COLONNADE COURTYARD ==
   khobar2, built: a travertine colonnade with deep reveals and dark glass
   behind, a reflecting pool ringed with jets, the gold sculpture, wire
   chairs and furled umbrellas, and a pergola walk leading out of it.     */
function buildCourtyard() {
  CURCHUNK = 'court';
  const C4 = PLAN.court;
  const a = ACC.arch, f = ACC.fine;
  const cx = (C4.x0 + C4.x1) / 2, cz = (C4.z0 + C4.z1) / 2;
  const gy = terrainY(cx, cz);
  paved(ACC.ground, C4.x0 - 6, C4.z0 - 6, C4.x1 + 6, C4.z1 + 6, 0.14, K.travert, 1.0, S.TRAVERTINE);
  platform(C4.x0 - 6, C4.z0 - 6, C4.x1 + 6, C4.z1 + 6, gy + 0.14);

  // ---- the west colonnade: massive piers, deep reveals, dark glass behind
  const py0 = C4.z0 + 8, py1 = C4.z1 - 8;
  const bays = 8, H = 8.2;
  const wallX = C4.x0 + 14;
  for (let i = 0; i < bays; i++) {
    const z = mix(py0, py1, (i + 0.5) / bays);
    const bw = (py1 - py0) / bays;
    // pier
    a.add(G_BOXT, xf(wallX, gy, z - bw / 2, 0, 2.4, H, 1.5), K.travert, S.TRAVERTINE, 0.98 + rnd() * 0.05);
    // reveal head
    a.add(G_BOXT, xf(wallX, gy + H - 1.1, z, 0, 2.4, 1.1, bw), K.travert, S.TRAVERTINE, 1.02);
    // the recess and its glazing
    a.add(G_BOXT, xf(wallX - 1.4, gy, z, 0, 0.5, H - 1.1, bw - 1.5), K.travDk, S.TRAVERTINE, 0.72);
    GLASS.add(G_BOXT, xf(wallX - 0.9, gy + 0.1, z, 0, 0.10, H - 1.4, bw - 1.6), 0x1d2a33, S.METAL, 1);
    SHOPEMIS.add(G_BOXT, xf(wallX - 1.30, gy + 0.5, z, 0, 0.08, H - 2.6, bw - 2.0), 0xf0d2a4, 0, 0.85);
    PRACTICALS.push({ x: wallX - 0.4, y: gy + 3.0, z: z, c: 0xffd6a0, i: 4.4, r: 14 });
    // wall sconce between piers
    inst('sconce', xf(wallX + 1.25, gy + 3.4, z - bw / 2, -Math.PI / 2), 0x2f2a24);
  }
  a.add(G_BOXT, xf(wallX, gy, py1, 0, 2.4, H, 1.5), K.travert, S.TRAVERTINE, 1.0);
  // the parapet band above the colonnade
  a.add(G_BOXT, xf(wallX, gy + H, cz, 0, 3.0, 1.6, py1 - py0 + 1.5), K.travert, S.TRAVERTINE, 1.06);
  collider(wallX - 0.8, cz, 1.9, (py1 - py0) / 2, 0, gy + H + 1.6);
  occluder(wallX, cz, 1.6, (py1 - py0) / 2, gy + H + 1.6);

  // ---- the office slab across the court, on its stone podium
  const tx = C4.x1 - 4, tz = cz + 2;
  block(tx - 15, tz - 16, tx + 15, tz + 16, {
    floors: 8, floorH: 4.0, style: 'office', detail: 2, parapet: 'step', green: true,
    sides: [2, 2, 2, 2],
  });
  // the podium's perforated stone band
  for (let i = 0; i < 14; i++) {
    const px = mix(tx - 15, tx + 15, (i + 0.5) / 14);
    inst('perfpanel', xf3(px, gy + 3.2, tz - 16.4, 0, 0, 0, 2.1, 3.4, 1), 0xcdbb9c);
  }

  // ---- the reflecting pool with its ring of jets
  const px0 = PLAN.courtPool.x0, px1 = PLAN.courtPool.x1, pz0 = PLAN.courtPool.z0, pz1 = PLAN.courtPool.z1;
  water(px0, pz0, px1, pz1, gy - 0.12, 0.6, 0.08);
  const wacc = new Acc();
  const wg = new THREE.PlaneGeometry(px1 - px0, pz1 - pz0, 12, 8);
  wg.rotateX(-Math.PI / 2); wg.translate((px0 + px1) / 2, gy - 0.12, (pz0 + pz1) / 2);
  // tank top at gy - 1.05 + 0.62 = gy - 0.43, water at gy - 0.12: 310 mm deep
  waterAttrs(wg, 0.10, 0.31, 0, (px0 + px1) / 2, (pz0 + pz1) / 2,
    (px1 - px0) / 2, (pz1 - pz0) / 2);
  wacc.add(wg, xf(0, 0, 0), 0xffffff, 0, 1);
  const wm = new THREE.Mesh(wacc.geometry(), waterMat);
  WATERMESHES.push(wm);
  wm.renderOrder = 4; cityRoot.add(wm); DISPOSE.push(wm.geometry);
  // pool coping and a dark tiled tank
  for (const e of [[px0, pz0, px1, pz0], [px1, pz0, px1, pz1], [px1, pz1, px0, pz1], [px0, pz1, px0, pz0]]) {
    a.add(G_BOXT, xf((e[0] + e[2]) / 2, gy - 0.02, (e[1] + e[3]) / 2, Math.atan2(e[2] - e[0], e[3] - e[1]),
      0.75, 0.22, Math.hypot(e[2] - e[0], e[3] - e[1]) + 0.75), K.travert, S.TRAVERTINE, 1.04);
  }
  a.add(G_BOXT, xf((px0 + px1) / 2, gy - 1.05, (pz0 + pz1) / 2, 0, px1 - px0 - 0.2, 0.62, pz1 - pz0 - 0.2), 0x2b3a3a, S.CONCRETE, 0.55);
  // jets round the perimeter
  const jn = 26;
  for (let i = 0; i < jn; i++) {
    const t = i / jn * 4;
    let jx, jz;
    if (t < 1) { jx = mix(px0 + 1, px1 - 1, t); jz = pz0 + 1.1; }
    else if (t < 2) { jx = px1 - 1.1; jz = mix(pz0 + 1, pz1 - 1, t - 1); }
    else if (t < 3) { jx = mix(px1 - 1, px0 + 1, t - 2); jz = pz1 - 1.1; }
    else { jx = px0 + 1.1; jz = mix(pz1 - 1, pz0 + 1, t - 3); }
    JETS.push({ x: jx, y: gy - 0.12, z: jz, ph: rnd() * 6.28, h: 0.55 + rnd() * 0.45 });
  }

  // ---- the gold sculpture: a coiled fluted form
  {
    const CPo = PLAN.courtPool;
    goldSculpture((CPo.x0 + CPo.x1) / 2, gy - 0.28, (CPo.z0 + CPo.z1) / 2, 2.6);
  }

  // ---- furniture: wire chairs, round tables, furled umbrellas, olives
  for (let i = 0; i < 15; i++) {
    const gx = wallX + 3.6 + (i % 3) * 4.4 + rr(-0.6, 0.6);
    const gz = mix(py0 + 3, py1 - 3, (Math.floor(i / 3) + 0.5) / 3) + rr(-1.5, 1.5);
    inst('table', xf(gx, gy + 0.14, gz, rnd() * 6.28), 0xe8e3d6);
    const nch = ri(2, 4);
    for (let c = 0; c < nch; c++) {
      const ang = rnd() * 6.28;
      inst('chair', xf(gx + Math.sin(ang) * 1.05, gy + 0.14, gz + Math.cos(ang) * 1.05, ang + Math.PI + rr(-0.4, 0.4)), 0xefeade);
    }
    if (i % 3 === 1) inst('umbrella_furled', xf(gx + 1.9, gy + 0.14, gz, rnd() * 6.28), 0xe4ded0);
  }
  for (let i = 0; i < 12; i++) {
    const ox = mix(wallX + 2.6, wallX + 7.5, rnd()), oz = mix(py0, py1, rnd());
    inst('planter', xf3(ox, gy + 0.14, oz, 0, rnd() * 6.28, 0, 1.1, 1, 1.1), 0xcabb9d);
    inst('olive', xf3(ox, gy + 0.9, oz, 0, rnd() * 6.28, 0, 1, 1 + rnd() * 0.3, 1), pick([K.leaf, K.leafLt, 0x546b3c]));
  }

  // ---- the pergola walk out of the court to the east
  pergola(C4.x1 + 10, cz - 30, C4.x1 + 10, cz + 30, 7.5, 4.4);
  // the fourth side: wire chairs, planters and a bank of trees so the court
  // is a room, not a car park
  for (let i = 0; i < 14; i++) {
    const px = rr(PLAN.courtPool.x1 + 3, C4.x1 - 6), pz = rr(C4.z0 + 6, C4.z1 - 6);
    if (Math.abs(px - tx) < 17 && Math.abs(pz - tz) < 18) continue;
    if (chance(0.5)) {
      inst('table', xf(px, gy + 0.14, pz, rnd() * 6.28), 0xe8e3d6);
      for (let c = 0; c < ri(2, 3); c++) {
        const ang = rnd() * 6.28;
        inst('chair', xf(px + Math.sin(ang) * 1.0, gy + 0.14, pz + Math.cos(ang) * 1.0, ang + Math.PI), 0xefeade);
      }
    } else {
      inst('planter', xf3(px, gy + 0.14, pz, 0, rnd() * 6.28, 0, 1.9, 1, 1.9), 0xcabb9d);
      inst('tree', xf3(px, gy + 0.14, pz, 0, rnd() * 6.28, 0, 0.85, 0.9, 0.85), pick([0xffffff, 0xdfe8cf]));
    }
  }
}

function goldSculpture(x, y, z, s) {
  CURCHUNK = 'court';
  const a = ACC.arch;
  // a coiled shell: fluted ribs sweeping round a spiral axis
  const RIB = 44;
  for (let i = 0; i < RIB; i++) {
    const t = i / (RIB - 1);
    const ang = t * Math.PI * 1.75;
    const rad = s * (0.16 + 0.40 * Math.sin(t * Math.PI * 0.92));
    const hh = s * (0.30 + 0.62 * Math.sin(t * Math.PI * 0.86));
    const px = x + Math.sin(ang) * rad * 0.85;
    const pz = z + Math.cos(ang) * rad * 0.85;
    const th = s * (0.038 + 0.034 * Math.sin(t * 3.1));
    a.add(taper(0.62, 1), xf3(px, y, pz, 0, ang + Math.PI / 2, 0, th, hh, th * 5.2),
      t < 0.5 ? K.gold : K.goldLt, S.METAL, 0.78 + 0.34 * t);
  }
  a.add(G_CYLT, xf(x, y - 0.2, z, 0, s * 0.7, 0.34, s * 0.7), K.goldDk, S.METAL, 0.7);
  inst('uplight', xf(x + s * 0.55, y + 0.1, z), 0xffc07a);
  inst('uplight', xf(x - s * 0.55, y + 0.1, z), 0xffc07a);
}

/* a timber-and-steel pergola walk */
function pergola(x0, z0, x1, z1, w, h) {
  const a = ACC.fine;
  const dx = x1 - x0, dz = z1 - z0;
  const len = Math.hypot(dx, dz);
  const ang = Math.atan2(dx, dz);
  const n = Math.round(len / 3.2);
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    const px = x0 + dx * t, pz = z0 + dz * t;
    const gy = terrainY(px, pz);
    for (const s of [-1, 1]) {
      const ox = Math.cos(ang) * s * w / 2, oz = -Math.sin(ang) * s * w / 2;
      a.add(G_BOXT, xf(px + ox, gy, pz + oz, ang, 0.22, h, 0.22), K.steelDk, S.METAL, 0.82);
    }
    a.add(G_BOXT, xf(px, gy + h, pz, ang, w + 0.4, 0.22, 0.20), K.timberDk, S.TIMBER, 0.9);
  }
  // the longitudinal slats that make the light fall in stripes
  const ns = 9;
  for (let i = 0; i < ns; i++) {
    const o = -w / 2 + w * (i + 0.5) / ns;
    const ox = Math.cos(ang) * o, oz = -Math.sin(ang) * o;
    const gy = terrainY((x0 + x1) / 2, (z0 + z1) / 2);
    a.add(G_BOXT, xf((x0 + x1) / 2 + ox, gy + h + 0.22, (z0 + z1) / 2 + oz, ang, 0.10, 0.20, len), K.timber, S.TIMBER, 0.94);
  }
}

/* --------------------------------------------------- THE SAIL WATER COURT
   The white tensile cluster from the aerial: angular sails on masts over a
   shallow basin with jets, next to the canopy.                            */
function buildTensile() {
  CURCHUNK = 'tensile';
  const T = PLAN.tensile;
  const a = ACC.arch, f = ACC.fine;
  const cx = (T.x0 + T.x1) / 2, cz = (T.z0 + T.z1) / 2;
  const gy = terrainY(cx, cz);
  paved(ACC.ground, T.x0 - 8, T.z0 - 8, T.x1 + 8, T.z1 + 8, 0.14, 0xd2c4a8, 1.0, S.TRAVERTINE);
  platform(T.x0 - 8, T.z0 - 8, T.x1 + 8, T.z1 + 8, gy + 0.14);

  // the basin
  const bx0 = PLAN.sailPool.x0, bx1 = PLAN.sailPool.x1, bz0 = PLAN.sailPool.z0, bz1 = PLAN.sailPool.z1;
  water(bx0, bz0, bx1, bz1, gy - 0.14, 0.35, 0.05);
  const wacc = new Acc();
  const wg = new THREE.PlaneGeometry(bx1 - bx0, bz1 - bz0, 10, 18);
  wg.rotateX(-Math.PI / 2); wg.translate((bx0 + bx1) / 2, gy - 0.14, (bz0 + bz1) / 2);
  // tank top at gy - 0.95 + 0.55 = gy - 0.40, water at gy - 0.14: 260 mm deep
  waterAttrs(wg, 0.22, 0.26, 0, (bx0 + bx1) / 2, (bz0 + bz1) / 2,
    (bx1 - bx0) / 2, (bz1 - bz0) / 2);
  wacc.add(wg, xf(0, 0, 0), 0xffffff, 0, 1);
  const wm = new THREE.Mesh(wacc.geometry(), waterMat);
  WATERMESHES.push(wm);
  wm.renderOrder = 4; cityRoot.add(wm); DISPOSE.push(wm.geometry);
  a.add(G_BOXT, xf((bx0 + bx1) / 2, gy - 0.95, (bz0 + bz1) / 2, 0, bx1 - bx0, 0.55, bz1 - bz0), 0x33444a, S.CONCRETE, 0.6);
  for (const e of [[bx0, bz0, bx1, bz0], [bx1, bz0, bx1, bz1], [bx1, bz1, bx0, bz1], [bx0, bz1, bx0, bz0]]) {
    a.add(G_BOXT, xf((e[0] + e[2]) / 2, gy - 0.02, (e[1] + e[3]) / 2, Math.atan2(e[2] - e[0], e[3] - e[1]),
      0.8, 0.2, Math.hypot(e[2] - e[0], e[3] - e[1]) + 0.8), K.travert, S.TRAVERTINE, 1.05);
  }
  for (let i = 0; i < 30; i++) {
    const jx = rr(bx0 + 2, bx1 - 2), jz = rr(bz0 + 3, bz1 - 3);
    JETS.push({ x: jx, y: gy - 0.14, z: jz, ph: rnd() * 6.28, h: 0.8 + rnd() * 1.6 });
  }

  // seven sails: masts with tensioned hypar quads
  for (let i = 0; i < 7; i++) {
    const mx = cx + rr(-16, 16), mz = T.z0 + 12 + (i / 6) * (T.z1 - T.z0 - 24) + rr(-4, 4);
    // the jamaa takes the north head of the court; no sail crowds its forecourt
    if (Math.hypot(mx - PLAN.jamaa.x, mz - PLAN.jamaa.z) < PLAN.jamaa.r + 12) continue;
    const h = 7.5 + rnd() * 5.5;
    const r = 8.5 + rnd() * 4.5;
    const rot = rnd() * 6.28;
    const g0 = terrainY(mx, mz);
    f.add(G_CYLT, xf(mx, g0, mz, 0, 0.36, h, 0.36), 0xdcd6c8, S.METAL, 0.94);
    const corners = [];
    for (let k = 0; k < 4; k++) {
      const ang = rot + k * Math.PI / 2 + rr(-0.2, 0.2);
      const rr2 = r * (0.7 + rnd() * 0.6);
      corners.push(new THREE.Vector3(mx + Math.sin(ang) * rr2, g0 + (k % 2 ? h * 0.30 : h * 0.62) + rr(-0.5, 0.5), mz + Math.cos(ang) * rr2));
      // the tie-down strut at each corner
      f.add(G_CYLT, xf(corners[k].x, g0, corners[k].z, 0, 0.16, corners[k].y - g0, 0.16), 0xd0cabb, S.METAL, 0.9);
    }
    const apex = new THREE.Vector3(mx, g0 + h, mz);
    const sailAcc = ACC.arch;
    for (let k = 0; k < 4; k++) {
      const p0 = corners[k], p1 = corners[(k + 1) % 4];
      // subdivide so the hypar reads as a curved membrane
      const NSEG = 4;
      for (let u = 0; u < NSEG; u++) {
        for (let v = 0; v < NSEG - u; v++) {
          const bary = (i0, j0) => {
            const b0 = i0 / NSEG, b1 = j0 / NSEG, b2 = 1 - b0 - b1;
            const p = new THREE.Vector3()
              .addScaledVector(p0, b0).addScaledVector(p1, b1).addScaledVector(apex, b2);
            p.y -= 1.6 * b0 * b1 * 4;       // the sag that makes it a membrane
            return p;
          };
          const sh0 = 0.90 + rnd() * 0.12;
          sailAcc.tri(bary(u, v), bary(u + 1, v), bary(u, v + 1), 0xf2eee4, S.FABRIC, sh0);
          sailAcc.tri(bary(u, v + 1), bary(u + 1, v), bary(u, v), 0xe6e0d2, S.FABRIC, sh0 * 0.72);
          if (v < NSEG - u - 1) {
            const sh1 = 0.86 + rnd() * 0.12;
            sailAcc.tri(bary(u + 1, v), bary(u + 1, v + 1), bary(u, v + 1), 0xf2eee4, S.FABRIC, sh1);
            sailAcc.tri(bary(u, v + 1), bary(u + 1, v + 1), bary(u + 1, v), 0xe6e0d2, S.FABRIC, sh1 * 0.72);
          }
        }
      }
    }
    occluder(mx, mz, r * 0.6, r * 0.6, g0 + h * 0.7);
    inst('uplight', xf(mx + 1.2, g0 + 0.3, mz), 0xd8b0ff);
  }
}


/* ==================================================== THE CITY BEYOND ==
   The district sits in Al Khobar, not in an empty quarter, and from the air
   the thing that made it read as a model on a table was the horizon: nothing
   between the last block and the sky but flat sand.

   So a skyline. A ring of towers a kilometre and more out, clustered toward
   the coast the way the real city is, all of it silhouette — no windows worth
   resolving at that distance, just mass, a scatter of lit floors and the odd
   mast. The fog does the rest of the work: at 1,500 m it is half fog already,
   which is exactly what a city looks like across a bay at dusk.          */
function buildSkyline() {
  CURCHUNK = 'skyline';
  const a = new Acc(), e = new Acc();
  const R0 = 1080, R1 = 2250;
  /* A distant city is not a black cutout. At a kilometre and a half it is
     almost entirely aerial perspective — sky bounced off haze — so its
     value sits close to the fog it is seen through, and only its silhouette
     and a scatter of lit floors separate it from the sky. */
  const COL = [0x8ea2c4, 0x9aabca, 0x8496bc, 0xa2b1cd, 0x7f92b6];
  let n = 0;
  for (let i = 0; i < 620; i++) {
    const ang = rnd() * 6.2831853;
    // denser toward the north-east, where the corniche and the causeway are
    const toCoast = Math.max(0, Math.cos(ang - 0.75));
    if (rnd() > 0.16 + 0.84 * toCoast * toCoast) continue;
    const r = R0 + Math.pow(rnd(), 0.62) * (R1 - R0);
    const x = Math.sin(ang) * r, z = Math.cos(ang) * r;
    // keep clear of the district's own ring road
    if (Math.abs(x) < PLAN.ring + 90 && Math.abs(z - 220) < PLAN.ring + 90) continue;
    const near = 1 - (r - R0) / (R1 - R0);
    const tall = Math.pow(rnd(), 2.6);
    const h = (22 + tall * 165) * (0.6 + 0.6 * near);
    const w = 13 + rnd() * 30, dd = 13 + rnd() * 30;
    const gy = terrainY(x, z);
    const col = pick(COL);
    a.add(G_BOXT, xf(x, gy, z, rnd() * 6.28, w, h, dd), col, S.CONCRETE, 0.92 + 0.16 * near);
    // a setback and a crown on the taller ones
    if (tall > 0.42) {
      a.add(G_BOXT, xf(x, gy + h, z, 0, w * 0.68, h * 0.22, dd * 0.68), col, S.CONCRETE, 1.0);
      if (tall > 0.72) {
        a.add(G_BOXT, xf(x, gy + h * 1.22, z, 0, 1.6, h * 0.20, 1.6), 0x9aa8c6, S.METAL, 0.9);
        e.add(G_BOXT, xf(x, gy + h * 1.40, z, 0, 3.2, 3.2, 3.2), 0xff5a4a, 0, 1);   // aircraft light
      }
    }
    // a few lit floors, banded, never every window
    const bands = Math.max(1, Math.round(h / 26));
    for (let b = 0; b < bands; b++) {
      if (!chance(0.34)) continue;
      const by = gy + h * (b + 0.5) / bands;
      e.add(G_BOXT, xf(x, by, z, 0, w * 1.005, h / bands * rr(0.10, 0.28), dd * 1.005),
        pick([0xc9a878, 0xcbb694, 0xa9b8d4, 0xc7a273]), 0, 1);
    }
    n++;
  }
  if (a.n) {
    const g = a.geometry();
    const m = new THREE.Mesh(g, cityMat);
    m.castShadow = false; m.receiveShadow = false; m.frustumCulled = true;
    cityRoot.add(m); DISPOSE.push(g);
  }
  if (e.n) {
    const g = e.geometry();
    const m = new THREE.Mesh(g, emisSoftMat);
    m.castShadow = false; m.receiveShadow = false;
    cityRoot.add(m); DISPOSE.push(g);
  }
  INSTCOUNT.skyline = n;
}

/* ============================================ CONTENT: THE KIT OF PARTS ==
   Everything that repeats is built once here and instanced. Per-instance
   colour carries the variation law; the surface class carries the material
   law; the wind term in the vertex shader carries the motion.            */

const LIGHTS = [];       // string-light bookkeeping (count only; flicker is in-shader)
const JETS = [];         // fountain jets, animated
const WALKERS = [];      // people on seeded paths
/* every instance name the crowd drives — the five procedural figures plus
   whichever of the ten scans tagWalker() managed to label. Filled by the
   dressing pass and read every frame by updateLife, which is why it is here
   and not a local: it used to be a hard-coded list of five names, and adding
   the scans to the crowd without moving it would have left them frozen. */
let WALK_KINDS = [];
const BIRDS = [];

/* emissive material: the instance colour *is* the light colour */
function makeEmissive(intensity, flicker) {
  const m = new THREE.MeshStandardMaterial({
    vertexColors: true, roughness: 1.0, metalness: 0.0, color: 0xffffff,
    emissive: 0x000000, fog: true,
  });
  m.userData.u = { uTime: { value: 0 }, uInt: { value: intensity }, uFlick: { value: flicker ? 1 : 0 } };
  m.onBeforeCompile = (sh) => {
    sh.uniforms.uTime = m.userData.u.uTime;
    sh.uniforms.uInt = m.userData.u.uInt;
    sh.uniforms.uFlick = m.userData.u.uFlick;
    sh.vertexShader = 'varying vec3 vEWP;\n' + sh.vertexShader.replace('#include <begin_vertex>',
      '#include <begin_vertex>\n vEWP = (modelMatrix * vec4(transformed,1.0)).xyz;');
    sh.fragmentShader = 'varying vec3 vEWP; uniform float uTime,uInt,uFlick;\n' +
      sh.fragmentShader.replace('#include <emissivemap_fragment>', `#include <emissivemap_fragment>
      {
        float ph = fract(sin(dot(floor(vEWP*3.0), vec3(12.99,78.23,37.71)))*43758.5453);
        float fl = mix(1.0, 0.72 + 0.34*sin(uTime*(2.1+ph*5.0)+ph*62.8)
                             + 0.10*sin(uTime*(11.0+ph*7.0)), uFlick);
        totalEmissiveRadiance += vColor.rgb * uInt * fl;
        diffuseColor.rgb *= 0.08;
      }`);
  };
  m.customProgramCacheKey = () => 'cityemis' + intensity + (flicker ? 'f' : '');
  return m;
}
const emisMat = makeEmissive(1.70, false);
const emisFlickMat = makeEmissive(2.10, true);
const emisSoftMat = makeEmissive(0.85, false);
const emisShopMat = makeEmissive(1.55, false);
const emisRoomMat = makeEmissive(0.42, false);

/* ------------------------------------------------------------ light pools
   A lantern that does not put a pool of light on the ground is a prop, not a
   light. These are additive discs with a soft radial falloff and a little
   noise so the edge is not a circle; one instanced quad each.            */
const poolMat = MATERIALS && MATERIALS.water ? MATERIALS.water({ pool: true }) : new THREE.ShaderMaterial({
  transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
  uniforms: { uTime: { value: 0 } },
  vertexShader: `varying vec2 vU; varying vec3 vC; varying vec3 vWP;
    void main(){
      vU = uv;
      #ifdef USE_INSTANCING_COLOR
        vC = instanceColor;
      #else
        vC = vec3(1.0);
      #endif
      vec4 wp = modelMatrix * instanceMatrix * vec4(position,1.0);
      vWP = wp.xyz;
      gl_Position = projectionMatrix * viewMatrix * wp; }`,
  fragmentShader: `varying vec2 vU; varying vec3 vC; varying vec3 vWP; uniform float uTime;
    float ph21(vec2 p){ vec3 q=fract(vec3(p.xyx)*0.1031); q+=dot(q,q.yzx+33.33); return fract((q.x+q.y)*q.z); }
    float pvn(vec2 p){ vec2 i=floor(p),f=fract(p); f=f*f*(3.0-2.0*f);
      return mix(mix(ph21(i),ph21(i+vec2(1,0)),f.x),mix(ph21(i+vec2(0,1)),ph21(i+vec2(1,1)),f.x),f.y); }
    void main(){
      vec2 d = vU - 0.5;
      float r = length(d) * 2.0;
      float a = pow(clamp(1.0 - r, 0.0, 1.0), 2.9) * 0.46;
      a *= 0.70 + 0.30 * pvn(vWP.xz * 1.7);
      float fl = 0.88 + 0.12 * sin(uTime * 2.4 + ph21(floor(vWP.xz)) * 62.8);
      gl_FragColor = vec4(vC * a * fl, a);
    }`,
});

/* ================================================================ GLASS ==
   Both panes were a CONSTANT alpha over a metallic standard material —
   opacity 0.34 on the balustrades and 0.085 on the shopfronts — and a constant
   alpha is the single loudest wrong note glass can make. A window is not 34%
   opaque. It is about 4% reflective when you look straight through it and
   almost 100% reflective when you look along it, and the whole reading of a
   glazed elevation comes from that swing: the panes near the middle of your
   view are clear and show the room, and the same panes at the end of the
   street are a sheet of sky. Fresnel is not a refinement here, it IS the
   material.

   Five things, in the order they matter:

   1. SCHLICK FRESNEL, driving both the alpha and the reflection. F0 = 0.043,
      which is (n-1)^2/(n+1)^2 for n = 1.52 soda-lime float glass. The alpha
      goes from the base transmission face-on to opaque at grazing.
   2. WHAT IT REFLECTS. There is no environment map in this build and a real
      one would cost a cube render per frame, so the reflected ray is shaded
      analytically against the same dusk sky and ground bounce the rest of the
      district is lit by — warm low in the west, deep blue overhead, the
      pavement's own colour below the horizon. It agrees with the scene
      because it is built from the scene's own numbers.
   3. ROLL DISTORTION. Float glass is not flat. It is drawn over a tin bath and
      it keeps a slight cylindrical roll, which is why the reflection of a
      straight parapet in a real curtain wall bows and breaks between panes.
      A 1.4 m ripple at a fifth of a degree of slope does it, and it is the
      cue that most reliably separates a rendered window from a photographed
      one.
   4. TINT WITH THICKNESS. Architectural glass is faintly green — iron in the
      melt — and you see the tint in transmission, doubled through a sealed
      unit. It is 6 mm of glass, so this is subtle and it is measurable.
   5. DIRT. A vertical pane in a desert city holds a film that catches the low
      sun. Faint vertical streaking, strongest at the bottom of the pane.

   The transparency rule this uses, decided before the material was written:
   the water is OPAQUE and depth-writes (it computes what is beneath it
   analytically — see the water shader), the glass depth-writes NOT AT ALL and
   is drawn last, and everything else in the district is opaque or alpha-tested.
   So there is exactly one blended layer in the scene, glass never sorts
   against water, and no depth peeling is needed. Where two panes do overlap —
   a shopfront seen through a balustrade — the blend order can be wrong, and at
   these alphas the error is under a per cent. That is the deliberate limit of
   the rule and it is why the rule is cheap.                                 */
function makeGlassMaterial(kind) {
  if (MATERIALS && MATERIALS.glass) return MATERIALS.glass(kind);
  const shop = kind === 'shop';
  /* REEDED glass: the vertical-fluted screen that is on half the shopfronts
     and screens in a Gulf street and that this build had no way to make. It
     is not a texture — it is a shape, a 12 mm half-round repeated across the
     pane — so it belongs in the normal rather than in a map, and putting it
     there gets the thing that makes reeded glass legible: the reflection
     BREAKS INTO VERTICAL BANDS and the room behind it smears sideways while
     staying sharp vertically. A photograph of reeded glass cannot do that,
     because the smear depends on what is behind it. */
  const reed = kind === 'reeded';
  const mat = new THREE.MeshStandardMaterial({
    vertexColors: true, transparent: true, side: THREE.DoubleSide,
    depthWrite: false,
    /* the standard model still runs underneath: it carries the sun's specular
       and the district's lights. What is replaced is the constant alpha and
       the missing environment. */
    opacity: 1.0,
    roughness: shop ? 0.14 : 0.06,
    metalness: 0.0,
    color: 0xffffff,
    envMapIntensity: 0.0,
  });
  mat.userData.u = {
    /* base transmission looking straight through. A shopfront at dusk is meant
       to show the room — the room is brighter than the street, so transmission
       wins — and a balustrade is meant to read as a pane. */
    uBaseA: { value: reed ? 0.42 : shop ? 0.055 : 0.16 },
    uReed: { value: reed ? 1 : 0 },
    uTint: { value: new THREE.Color(reed ? 0xd8e8e2 : shop ? 0xdcece4 : 0xc8dcd8) },
    uSkyHi: { value: new THREE.Color(0x2f4a78) },
    uSkyLo: { value: new THREE.Color(0x9fb2cf) },
    uSunW: { value: CSUN.clone() },
    uWarm: { value: new THREE.Color(0xffc07a) },
    uGnd: { value: new THREE.Color(0x6c6152) },
    uDirt: { value: shop ? 0.55 : 0.30 },
    uFogWarm: { value: new THREE.Color(0xd9a878) },
    uFogCool: { value: new THREE.Color(0x7286a8) },
    uFogScaleH: { value: 150 },
  };
  mat.onBeforeCompile = (sh) => {
    for (const k in mat.userData.u) sh.uniforms[k] = mat.userData.u[k];
    sh.vertexShader = 'varying vec3 vGWP; varying vec3 vGN;\n' + sh.vertexShader
      .replace('#include <begin_vertex>', `#include <begin_vertex>
        vGWP = (modelMatrix * vec4(transformed, 1.0)).xyz;
        vGN = normalize(mat3(modelMatrix) * normal);`);
    sh.fragmentShader = `varying vec3 vGWP; varying vec3 vGN;
      uniform float uBaseA, uDirt, uFogScaleH, uReed;
      uniform vec3 uTint, uSkyHi, uSkyLo, uSunW, uWarm, uGnd, uFogWarm, uFogCool;
      float gh21(vec2 p){ vec3 q=fract(vec3(p.xyx)*0.1031); q+=dot(q,q.yzx+33.33); return fract((q.x+q.y)*q.z); }
      float gvn(vec2 p){ vec2 i=floor(p),f=fract(p); f=f*f*(3.0-2.0*f);
        return mix(mix(gh21(i),gh21(i+vec2(1,0)),f.x),mix(gh21(i+vec2(0,1)),gh21(i+vec2(1,1)),f.x),f.y); }
      /* the dusk sky as a function of direction, built from the same three
         colours the district's own sky dome and fog are built from, so a
         reflection agrees with what it is reflecting */
      vec3 gSky(vec3 d) {
        float up = clamp(d.y * 0.5 + 0.5, 0.0, 1.0);
        vec3 c = mix(uSkyLo, uSkyHi, pow(up, 0.75));
        float s = pow(max(dot(normalize(d), normalize(uSunW)), 0.0), 5.0);
        c += uWarm * s * 0.55;
        // below the horizon it is the ground, not the sky
        return mix(uGnd * 0.75, c, smoothstep(-0.09, 0.06, d.y));
      }\n` + sh.fragmentShader
      .replace('#include <normal_fragment_maps>', `#include <normal_fragment_maps>
      {
        /* ROLL. Float glass keeps a slight cylindrical roll from the tin bath,
           so a straight line reflected in a real curtain wall bows and steps
           between panes. 1.4 m period at about a fifth of a degree. */
        vec3 nw = normalize(vGN);
        vec3 up = abs(nw.y) > 0.9 ? vec3(1.0, 0.0, 0.0) : vec3(0.0, 1.0, 0.0);
        vec3 tw = normalize(cross(up, nw));
        vec3 bw = cross(nw, tw);
        vec2 pl = vec2(dot(vGWP, tw), dot(vGWP, bw));
        float rollA = sin(pl.y * 4.4) * 0.0034 + gvn(pl * 0.62) * 0.0026 - 0.0013;
        float rollB = sin(pl.x * 3.1 + 1.7) * 0.0021;
        vec3 nrw = normalize(nw + tw * rollB + bw * rollA);
        /* the reeding, if this pane has it: a 12 mm half-round repeated
           across the width, as a sawtooth in the in-plane tangent. The
           amplitude is the real one — a 12 mm reed 4 mm deep is a 34-degree
           slope at the edge of each flute — which is why the reflection
           breaks into bands rather than blurring. */
        if (uReed > 0.5) {
          float u = dot(vGWP, tw) / 0.012;
          float f = fract(u) - 0.5;
          nrw = normalize(nrw + tw * (f * 1.35));
        }
        /* a double-sided pane must be lit off the face you can see. Rebuilding
           the normal from the varying throws away the gl_FrontFacing flip that
           <normal_fragment_begin> just applied, so it is put back here — the
           back of a courtyard's glazing would otherwise light from behind. */
        if (dot(nrw, cameraPosition - vGWP) < 0.0) nrw = -nrw;
        normal = normalize((viewMatrix * vec4(nrw, 0.0)).xyz);
      }`)
      .replace('#include <opaque_fragment>', `
      {
        vec3 nw = normalize((vec4(normal, 0.0) * viewMatrix).xyz);
        vec3 Vd = normalize(cameraPosition - vGWP);
        // a double-sided pane must reflect off the face you can see
        if (dot(nw, Vd) < 0.0) nw = -nw;
        float cosT = clamp(dot(nw, Vd), 0.0, 1.0);
        float F = 0.043 + 0.957 * pow(1.0 - cosT, 5.0);

        /* DIRT: a vertical film that runs down the pane, heaviest at the
           bottom and streaked along the run of the glass. It raises the
           reflection a little and the alpha a lot, which is what a dirty
           window actually does. */
        vec3 up2 = abs(nw.y) > 0.9 ? vec3(1.0, 0.0, 0.0) : vec3(0.0, 1.0, 0.0);
        vec3 tw2 = normalize(cross(up2, nw));
        vec2 pl2 = vec2(dot(vGWP, tw2), vGWP.y);
        float streak = gvn(vec2(pl2.x * 7.0, pl2.y * 0.55)) * 0.65
                     + gvn(vec2(pl2.x * 21.0, pl2.y * 0.30)) * 0.35;
        float low = smoothstep(2.6, 0.0, fract(pl2.y * 0.5) * 2.0);
        float dirt = clamp(uDirt * (0.22 + 0.78 * streak) * (0.35 + 0.65 * low), 0.0, 0.55);

        vec3 refl = gSky(reflect(-Vd, nw));
        // the sealed unit reflects twice; the inner pane is dimmer and offset
        refl += gSky(reflect(-Vd, normalize(nw + vec3(0.004, -0.006, 0.003)))) * 0.34;
        refl /= 1.34;

        /* transmission: what the standard model computed, tinted by 6 mm of
           glass twice over and dimmed by the film */
        vec3 through = outgoingLight * uTint * (1.0 - dirt * 0.5);

        float a = clamp(uBaseA + (1.0 - uBaseA) * F + dirt * 0.45, 0.0, 1.0);
        vec3 col = mix(through, refl + outgoingLight * 0.25, clamp(F + dirt * 0.5, 0.0, 1.0));
        col += uWarm * dirt * 0.10 * pow(max(dot(nw, normalize(normalize(uSunW) + Vd)), 0.0), 3.0);

        gl_FragColor = vec4(col, a * diffuseColor.a);
      }`)
      .replace('#include <fog_fragment>', `
      #ifdef USE_FOG
        /* the same directional, altitude-falloff fog the walls use. Glass that
           fogs differently from the mullion beside it is a category error you
           see instantly on a distant tower. */
        vec3 gfd = normalize(vGWP - cameraPosition);
        float gfs = pow(max(dot(gfd, normalize(uSunW)), 0.0), 1.8);
        float gha = 0.5 * (cameraPosition.y + vGWP.y);
        float gfog = 1.0 - exp(-fogDensity * fogDensity
                     * exp(-max(gha, 0.0) / uFogScaleH) * vFogDepth * vFogDepth);
        gl_FragColor.rgb = mix(gl_FragColor.rgb, mix(uFogCool, uFogWarm, gfs), clamp(gfog, 0.0, 1.0));
      #endif`);
  };
  /* the reeded variant compiles a different fragment shader — it must not
     share a program with the clear one */
  mat.customProgramCacheKey = () => 'cityglass' + kind;
  return mat;
}

const glassMat = makeGlassMaterial('rail');
/* Shopfront glazing, and the reason the interiors were invisible for three
   rounds. At metalness 0.30, roughness 0.05 and an environment intensity of
   0.75, the old one was a near-mirror: at dusk it returned a flat sheet of sky
   and nothing behind it could be seen at all, whatever was in there. A real
   shop window in the evening is the opposite — the room is brighter than the
   street, so transmission wins and the reflection is a faint veil over it. The
   Fresnel term above now does that by itself rather than by a hand-picked
   constant, and it does the other half too: the same pane at the end of the
   street goes to sky, which is what a row of shopfronts looks like. */
const shopGlassMat = makeGlassMaterial('shop');
/* reeded glass, for screens and for the upper lights of a shopfront. Built
   here so both renderers get it from the same seam; `?reed=0` falls back to
   clear if it ever needs to be taken out of a comparison. */
const reedGlassMat = makeGlassMaterial('reeded');

/* ---------------------------------------------------------- kit geometry */
function kitBox(list, x, y, z, w, h, d, col, surf, shade, ry, rx, rz) {
  list.push({ geo: G_BOXT, mtx: xf3(x, y, z, rx || 0, ry || 0, rz || 0, w, h, d), col, surf, shade });
}
function kitCyl(list, x, y, z, r, h, col, surf, shade) {
  list.push({ geo: G_CYLT, mtx: xf(x, y, z, 0, r * 2, h, r * 2), col, surf, shade });
}

/* ====================================================== THE DATE PALM ====
   Four hundred and fifty of these go into the district — more than any other
   object in it by a factor of three — so it is the one piece of kit geometry
   worth building properly, and the only one worth paying a distance switch on.

   The old one was ten fronds of stacked boxes: 2,712 triangles of which every
   leaflet was a 28 mm-thick cuboid, which is why from six metres it read as a
   plastic toy. This is the same plant built the way it actually grows —

     trunk    a tapered eight-sided tube whose rings alternate radius and twist
              half a facet, which is the diamond leaf-base scarring without
              one triangle spent on modelling a scar;
     crown    fronds on the golden angle, so no two ever line up, with age
              running from the short upright ones at the centre to the long
              sagging ones at the skirt;
     leaflet  a bladed quad, emitted twice with opposite winding so it is
              there from underneath, alternating up and down along the rachis
              — that alternation is the whole silhouette of a date palm.

   Built at two levels: 3.7 k near, 620 far, switched on distance to the
   walkable core. It is both better looking and cheaper than what it replaces. */
function palmGeo(detail) {
  const P = [], CO = [], SU = [];
  const _pc = new THREE.Color();
  const put = (v, col, surf, shade) => {
    P.push(v[0], v[1], v[2]);
    _pc.set(col);
    CO.push(_pc.r * shade, _pc.g * shade, _pc.b * shade);
    SU.push(surf);
  };
  const tri = (a, b, c, col, sf, sh) => { put(a, col, sf, sh); put(b, col, sf, sh); put(c, col, sf, sh); };
  const quad = (a, b, c, d, col, sf, sh) => { tri(a, b, c, col, sf, sh); tri(a, c, d, col, sf, sh); };
  // foliage has to exist from below as well as above, and the city material is
  // single-sided, so a leaflet is emitted twice with the winding reversed
  const quad2 = (a, b, c, d, col, sf, sh) => {
    quad(a, b, c, d, col, sf, sh);
    quad(d, c, b, a, col, sf, sh * 0.80);
  };

  /* ---- trunk ---------------------------------------------------------- */
  const H = 7.2;
  const RINGS = detail ? 13 : 7, SIDES = detail ? 8 : 6;
  const lean = (t) => [Math.sin(t * 1.6) * 0.17, Math.cos(t * 2.1 + 1.0) * 0.13];
  const ringP = (t, i, twist) => {
    const a = (i / SIDES) * 6.2831853 + twist;
    // every second ring stands a little proud: the leaf-base scar course
    const r = 0.31 * (1 - 0.36 * t) * (1 + (twist > 0 ? 0.085 : -0.055));
    const l = lean(t);
    return [l[0] + Math.cos(a) * r, t * H, l[1] + Math.sin(a) * r];
  };
  for (let k = 0; k < RINGS; k++) {
    const t0 = k / RINGS, t1 = (k + 1) / RINGS;
    const w0 = (k % 2) * (Math.PI / SIDES), w1 = ((k + 1) % 2) * (Math.PI / SIDES);
    const sh = 0.72 + 0.26 * t0 + (k % 2 ? 0.07 : -0.05);
    for (let i = 0; i < SIDES; i++) {
      quad(ringP(t0, i, w0), ringP(t0, i + 1, w0), ringP(t1, i + 1, w1), ringP(t1, i, w1),
        k % 2 ? K.trunk : 0x7a6748, S.TIMBER, sh);
    }
  }

  /* ---- crown ---------------------------------------------------------- */
  const NF = detail ? 30 : 13;
  const SEG = detail ? 7 : 3;
  const NL = detail ? 13 : 5;
  const FCOL = [K.palm, 0x4c6a33, 0x35502a, 0x476438];
  for (let f = 0; f < NF; f++) {
    const u0 = f / (NF - 1);
    const az = f * 2.3999632;                 // the golden angle
    const el = 1.16 - 1.62 * u0;              // upright at the centre, drooping at the skirt
    const len = 3.15 + 1.75 * u0;
    const dr = 0.30 + 0.74 * u0;              // and sagging harder the older it is
    const col = FCOL[f % 4];
    const ca = Math.cos(az), sa = Math.sin(az);
    const sx = -sa, sz = ca;                  // the horizontal perpendicular
    const at = (u) => {
      const rad = len * u * Math.cos(el);
      return [ca * rad, H - 0.12 + len * u * Math.sin(el) - dr * u * u * len * 0.42, sa * rad];
    };
    // the rachis, as a flat blade following the arc
    for (let s = 0; s < SEG; s++) {
      const p0 = at(s / SEG), p1 = at((s + 1) / SEG);
      const w0 = 0.055 * (1 - 0.7 * (s / SEG)), w1 = 0.055 * (1 - 0.7 * ((s + 1) / SEG));
      quad2([p0[0] - sx * w0, p0[1], p0[2] - sz * w0], [p0[0] + sx * w0, p0[1], p0[2] + sz * w0],
        [p1[0] + sx * w1, p1[1], p1[2] + sz * w1], [p1[0] - sx * w1, p1[1], p1[2] - sz * w1],
        col, S.FOLIAGE, 0.66 + 0.30 * (s / SEG));
    }
    // and the leaflets, alternating up and down as they run out along it
    for (let i = 0; i < NL; i++) {
      const u = 0.14 + 0.84 * (i / (NL - 1));
      const p = at(u), pn = at(Math.min(1, u + 0.06));
      let tx = pn[0] - p[0], ty = pn[1] - p[1], tz = pn[2] - p[2];
      const tl = Math.hypot(tx, ty, tz) || 1; tx /= tl; ty /= tl; tz /= tl;
      // near the base the leaflets are short spines; the length peaks past halfway
      const L = (1.06 * Math.sin(Math.min(1, u * 1.30) * 3.14159) + 0.13) * (0.85 + 0.3 * u0);
      for (const sd of [-1, 1]) {
        const alt = (i % 2 ? 1 : -1) * sd;
        const th = 0.50 + alt * 0.26;
        let dx = sd * sx * Math.cos(th) + tx * 0.38;
        let dy = Math.sin(th) * 0.42 - 0.30;
        let dz = sd * sz * Math.cos(th) + tz * 0.38;
        const dl = Math.hypot(dx, dy, dz) || 1; dx /= dl; dy /= dl; dz /= dl;
        const rw = 0.082, tw = 0.026;          // one blade stands for a group of leaflets
        quad2(
          [p[0] - tx * rw, p[1] - ty * rw, p[2] - tz * rw],
          [p[0] + tx * rw, p[1] + ty * rw, p[2] + tz * rw],
          [p[0] + dx * L + tx * tw, p[1] + dy * L + ty * tw, p[2] + dz * L + tz * tw],
          [p[0] + dx * L - tx * tw, p[1] + dy * L - ty * tw, p[2] + dz * L - tz * tw],
          col, S.FOLIAGE, (0.58 + 0.44 * u) * (alt > 0 ? 1.10 : 0.84));
      }
    }
  }

  /* ---- the dead skirt, and the fruit ---------------------------------- */
  if (detail) {
    for (let f = 0; f < 7; f++) {
      const az = f * 2.3999632 + 1.1, ca = Math.cos(az), sa = Math.sin(az);
      const len = 1.35;
      for (let s = 0; s < 3; s++) {
        const g = (u) => [ca * len * u * 0.55, H - 0.42 - len * u * 0.92, sa * len * u * 0.55];
        const p0 = g(s / 3), p1 = g((s + 1) / 3), w = 0.16 * (1 - s * 0.22);
        quad2([p0[0] - sa * w, p0[1], p0[2] + ca * w], [p0[0] + sa * w, p0[1], p0[2] - ca * w],
          [p1[0] + sa * w, p1[1], p1[2] - ca * w], [p1[0] - sa * w, p1[1], p1[2] + ca * w],
          0x7d6b45, S.FOLIAGE, 0.54 + s * 0.08);
      }
    }
    for (let b = 0; b < 3; b++) {
      const az = b * 2.0944 + 0.7, ca = Math.cos(az), sa = Math.sin(az);
      for (let s = 0; s < 5; s++) {
        const t = s / 5, r = 0.30 + t * 0.44, y = H + 0.02 - t * 0.95;
        const w = 0.20 * (1 - t * 0.35);
        quad2([ca * r - sa * w, y + 0.16, sa * r + ca * w], [ca * r + sa * w, y + 0.16, sa * r - ca * w],
          [ca * (r + 0.16) + sa * w, y - 0.16, sa * (r + 0.16) - ca * w],
          [ca * (r + 0.16) - sa * w, y - 0.16, sa * (r + 0.16) + ca * w],
          s < 2 ? 0x8a6a34 : 0xb07a30, S.FOLIAGE, 0.72 + t * 0.3);
      }
    }
  }

  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(P), 3));
  g.setAttribute('color', new THREE.BufferAttribute(new Float32Array(CO), 3));
  g.setAttribute('aSurf', new THREE.BufferAttribute(new Float32Array(SU), 1));
  g.setAttribute('uv', new THREE.BufferAttribute(new Float32Array((P.length / 3) * 2), 2));
  g.computeVertexNormals();
  return g;
}

let STANDERS = [], SITTERS = [], WALKSCANS = [], PALM_PROC = null, FURNITURE = [];

function defineKit() {
  /* ---- palm ----------------------------------------------------------- */
  {
    defInst('palm_l0', palmGeo(1));
    defInst('palm_l1', palmGeo(0));
    const I = new THREE.Matrix4();
    MODEL_ROUTE.palm = {
      parts: [{ fit: I, names: ['palm_l0'] }, { fit: I, names: ['palm_l1'] }],
      near: 48, jitter: true,
    };
  }
  // ... and handed to the scan if it arrived. See the note in defineKit's tail.
  PALM_PROC = MODEL_ROUTE.palm;

  /* ---- broad shade tree (the ficus/olive canopies framing madinah2) -- */
  {
    const L = [];
    const H = 3.9;
    // a leaning, tapering bole with three real limbs — the trunk has to be
    // legible under the crown or the tree reads as a lollipop
    for (let i = 0; i < 5; i++) {
      const t = i / 5;
      L.push({ geo: taper(0.82, 1), mtx: xf3(Math.sin(t * 3.4) * 0.18 * t, H * t, Math.cos(t * 2.8) * 0.14 * t, 0, t * 1.4, 0, 0.42 * (1 - t * 0.42), H / 5 * 1.06, 0.42 * (1 - t * 0.42)), col: 0x6b5942, surf: S.TIMBER, shade: 0.72 + 0.16 * t });
    }
    for (let b = 0; b < 4; b++) {
      const ang = b / 4 * 6.283 + 0.4;
      L.push({ geo: taper(0.5, 1), mtx: xf3(Math.sin(ang) * 0.45, H * 0.80, Math.cos(ang) * 0.45, 0, ang, 0.72, 0.19, 2.3, 0.19), col: 0x5f4e3a, surf: S.TIMBER, shade: 0.66 });
    }
    /* the crown is 46 flattened leaf clumps scattered on a lumpy ellipsoid
       shell, each tilted its own way. A sphere reads as a ball at any
       distance; a mass of tilted planes reads as foliage, and its edge is
       ragged, which is the only thing the eye actually checks. */
    const CL = 74;
    for (let i = 0; i < CL; i++) {
      const t = (i + 0.5) / CL;
      const ph = Math.acos(1 - 1.72 * t);              // denser at the top
      const th = i * 2.39996323;
      // the clumps overlap heavily: a canopy is a solid mass with a ragged
      // edge, not a constellation of leaves floating apart
      const rr2 = 2.05 * (0.72 + 0.30 * Math.sin(i * 1.31)) * Math.pow(Math.sin(ph), 0.75);
      const px = Math.cos(th) * rr2, pz = Math.sin(th) * rr2;
      const py = H + 0.30 + 1.95 * (1 - Math.cos(ph)) * 0.95 + Math.sin(i * 2.7) * 0.22;
      const sc = 1.30 + 0.45 * ((i * 7) % 5) / 5;
      const shade = 0.52 + 0.62 * Math.pow(t, 0.5) * (0.76 + 0.24 * Math.sin(i * 3.1));
      L.push({
        geo: G_BOX,
        mtx: xf3(px, py, pz, Math.sin(i * 1.7) * 0.62, th, Math.cos(i * 2.3) * 0.62,
          sc * 1.45, sc * 0.50, sc * 1.20),
        col: i % 4 === 0 ? K.leafLt : (i % 4 === 3 ? K.leafDk : K.leaf),
        surf: S.FOLIAGE, shade,
      });
    }
    defInst('tree', combine(L));
  }
  /* ---- olive: a smaller, greyer, gnarlier version -------------------- */
  {
    const L = [];
    kitCyl(L, 0, 0, 0, 0.16, 1.5, 0x7d7059, S.TIMBER, 0.8);
    for (let i = 0; i < 10; i++) {
      const ang = i / 10 * 6.283 * 2.1;
      const rad = 0.65 + (i % 3) * 0.34;
      L.push({
        geo: G_SPH, mtx: xf3(Math.sin(ang) * rad, 1.6 + Math.sin(i * 2.1) * 0.42, Math.cos(ang) * rad, 0, 0, 0,
          0.95 + (i % 4) * 0.22, 0.72, 0.95 + (i % 4) * 0.22),
        col: i % 2 ? 0x6d7f52 : 0x53663f, surf: S.FOLIAGE, shade: 0.68 + 0.4 * (i / 10),
      });
    }
    defInst('olive', combine(L));
    defInst('rooftree', combine(L));
  }
  /* ---- massed low planting ------------------------------------------ */
  {
    const L = [];
    for (let i = 0; i < 7; i++) {
      const ang = i / 7 * 6.283;
      const rad = 0.3 + (i % 3) * 0.2;
      L.push({
        geo: G_SPH, mtx: xf3(Math.sin(ang) * rad, 0.28 + (i % 3) * 0.16, Math.cos(ang) * rad, 0, 0, 0, 0.72, 0.56, 0.72),
        col: i % 2 ? K.leaf : K.leafDk, surf: S.FOLIAGE, shade: 0.68 + 0.05 * i,
      });
    }
    defInst('potbush', combine(L));
    defInst('shrub', combine(L));
    // the roof version is the same shape at a fifth of the triangles
    const R = [];
    for (let i = 0; i < 4; i++) {
      const ang = i / 4 * 6.283;
      const rad = 0.19 + (i % 2) * 0.13;
      R.push({
        geo: G_SPHL, mtx: xf3(Math.sin(ang) * rad, 0.20 + (i % 3) * 0.11, Math.cos(ang) * rad, 0, 0, 0, 0.52, 0.40, 0.52),
        col: i % 2 ? K.leaf : K.leafDk, surf: S.FOLIAGE, shade: 0.70 + 0.06 * i,
      });
    }
    defInst('roofbush', combine(R));
  }
  /* ---- flowering mass ------------------------------------------------ *
     Every reference for this place has bougainvillea in it — over a wall, up a
     pergola, spilling off a terrace — and it is the only strong colour in an
     otherwise stone-and-green palette. Without it the whole district reads as
     one note of sand.                                                       */
  {
    const L = [];
    for (let i = 0; i < 13; i++) {
      const ang = i / 13 * 6.2831853 * 1.7;
      const rad = 0.34 + (i % 4) * 0.20;
      const yy = 0.18 + (i % 5) * 0.17;
      L.push({ geo: G_SPHL, mtx: xf3(Math.sin(ang) * rad, yy, Math.cos(ang) * rad, 0, 0, 0,
        0.60 + (i % 3) * 0.18, 0.46, 0.60 + (i % 3) * 0.18),
        col: i % 3 === 0 ? 0x3f5a33 : (i % 3 === 1 ? 0x4d6b3c : 0x36502c), surf: S.FOLIAGE, shade: 0.72 + 0.04 * i });
    }
    // the bracts sit on the outside of the mass, never inside it
    /* Sixty-four-sided spheres for a shrub nobody looks at from closer than two
       metres cost 2,240 triangles apiece, and at seven hundred instances that
       was more than every hero tree in the district put together. Twenty-sided
       blobs at the same silhouette: a sixth of the cost. */
    for (let i = 0; i < 16; i++) {
      const ang = i / 16 * 6.2831853 * 2.3;
      const rad = 0.64 + (i % 3) * 0.15;
      L.push({ geo: G_SPHL, mtx: xf3(Math.sin(ang) * rad, 0.16 + (i % 6) * 0.15, Math.cos(ang) * rad, 0, 0, 0,
        0.31 + (i % 3) * 0.10, 0.23, 0.31 + (i % 3) * 0.10),
        col: 0xffffff, surf: S.FOLIAGE, shade: 0.92 + 0.05 * (i % 3) });
    }
    defInst('bougain', combine(L));
  }
  { // a clipped hedge run, one metre of it
    const L = [];
    for (let i = 0; i < 4; i++) {
      L.push({ geo: G_SPHL, mtx: xf3(-0.34 + i * 0.23, 0.30, ((i % 2) - 0.5) * 0.05, 0, 0, 0, 0.46, 0.66, 0.70),
        col: i % 2 ? 0x3d5a34 : 0x33512c, surf: S.FOLIAGE, shade: 0.76 + 0.06 * (i % 3) });
    }
    L.push({ geo: G_BOXT, mtx: xf3(0, 0.02, 0, 0, 0, 0, 1.0, 0.06, 0.7), col: 0x2c3a22, surf: S.FOLIAGE, shade: 0.6 });
    defInst('hedge', combine(L), { shadow: false });
  }
  { // a lawn / planted panel: a flat plate, tinted per bed
    const L = [];
    L.push({ geo: G_BOXT, mtx: xf3(0, 0, 0, 0, 0, 0, 1.0, 0.05, 1.0), col: 0xffffff, surf: S.FOLIAGE, shade: 1.0 });
    defInst('lawn', combine(L), { shadow: false });
  }

  /* ---- yucca / desert palm in a pot --------------------------------- */
  {
    const L = [];
    for (let i = 0; i < 14; i++) {
      const ang = i / 14 * 6.283 * 1.6;
      const lean = 0.55 + (i % 4) * 0.2;
      L.push({
        geo: G_BOXT, mtx: xf3(Math.sin(ang) * 0.2, 0, Math.cos(ang) * 0.2, 0, ang, lean, 0.13, 1.5 + (i % 3) * 0.35, 0.05),
        col: i % 3 ? 0x5f7a3e : 0x47612f, surf: S.FOLIAGE, shade: 0.7 + 0.02 * i,
      });
    }
    defInst('yucca', combine(L));
  }

  /* ---- mashrabiya: a real lattice, 1x1 unit, instanced ---------------- */
  {
    const L = [];
    const NX = 6, NY = 7;
    kitBox(L, 0, 0, 0, 1.0, 0.07, 0.10, 0x000000, S.TIMBER, 1);      // bottom rail
    for (let i = 0; i <= NX; i++) {
      const x = -0.5 + i / NX;
      kitBox(L, x, 0, 0, 0.048, 1.0, 0.085, 0xffffff, S.TIMBER, 0.86);
    }
    for (let j = 0; j <= NY; j++) {
      const y = j / NY;
      kitBox(L, 0, y, 0, 1.0, 0.042, 0.085, 0xffffff, S.TIMBER, 0.94);
    }
    // a sparse diagonal star over the grid — enough to read as a screen at
    // arm's length without costing a thousand triangles a panel
    for (let i = 1; i < NX; i += 2) {
      for (let j = 1; j < NY; j += 3) {
        const x = -0.5 + i / NX, y = j / NY;
        for (const r of [0.78, -0.78]) {
          L.push({ geo: G_BOX, mtx: xf3(x, y, 0, 0, 0, r, 0.036, 0.26, 0.075), col: 0xffffff, surf: S.TIMBER, shade: 0.8 });
        }
      }
    }
    // a dark void behind so the lattice reads against depth
    L.push({ geo: G_BOX, mtx: xf3(0, 0.5, 0.16, 0, 0, 0, 1.0, 1.0, 0.06), col: 0x140f0a, surf: S.RENDER, shade: 0.5 });
    defInst('mashrabiya_box', combine(L));
    /* the generated panel, if it came through: one quad with the lattice in its
       alpha, plus the thin timber surround that sets it into the reveal */
    if (PANELS.mashrabiya) {
      const P = [];
      P.push({ geo: G_PANEL, mtx: xf3(0, 0.5, 0, 0, 0, 0, 1.0, 1.0, 1.0), col: 0xffffff, surf: S.TIMBER, shade: 1.0 });
      defInst('mashrabiya', combine(P), {
        mat: makeModelMaterial({ map: PANELS.mashrabiya.map, alphaTest: 0.5, name: 'mashrabiya' }, false),
        shadow: true, receive: false,
      });
      const F = [];
      for (const s of [-1, 1]) kitBox(F, s * 0.5, 0, 0, 0.075, 1.0, 0.12, 0xffffff, S.TIMBER, 0.84);
      for (const y of [0, 1]) kitBox(F, 0, y, 0, 1.06, 0.075, 0.12, 0xffffff, S.TIMBER, 0.92);
      defInst('mashframe', combine(F));
      /* what you see through a mashrabiya at this hour is the room behind it.
         Backing the lattice with a near-black slab, as the box version did,
         throws away the one thing the screen is for. */
      const B = [];
      B.push({ geo: G_BOXT, mtx: xf3(0, 0, 0.16, 0, 0, 0, 1.0, 1.0, 0.05), col: 0xffffff, surf: 0, shade: 1 });
      defInst('mashglow', combine(B), { mat: emisRoomMat, shadow: false });
    } else {
      defInst('mashrabiya', combine(L));
    }
  }
  /* ---- timber shutter ------------------------------------------------ */
  {
    const L = [];
    L.push({ geo: G_BOX, mtx: xf3(0, 0.5, 0.13, 0, 0, 0, 1.0, 1.0, 0.06), col: 0x0f0b07, surf: S.RENDER, shade: 0.5 });
    for (const s of [-1, 1]) {
      kitBox(L, s * 0.25, 0, 0, 0.48, 1.0, 0.07, 0xffffff, S.TIMBER, 0.92);
      for (let i = 0; i < 6; i++) {
        kitBox(L, s * 0.25, 0.08 + i * 0.155, -0.03, 0.44, 0.075, 0.07, 0xffffff, S.TIMBER, 0.72 + 0.03 * (i % 2), 0, -0.5);
      }
    }
    kitBox(L, 0, 0, -0.02, 1.06, 0.08, 0.11, 0xffffff, S.TIMBER, 1.0);
    kitBox(L, 0, 0.96, -0.02, 1.06, 0.08, 0.11, 0xffffff, S.TIMBER, 1.0);
    defInst('shutter', combine(L));
  }
  /* ---- plain window: frame, reveal, dark glass ----------------------- */
  {
    const L = [];
    L.push({ geo: G_BOX, mtx: xf3(0, 0.5, 0.16, 0, 0, 0, 0.96, 0.96, 0.05), col: 0xffffff, surf: S.METAL, shade: 1 });
    kitBox(L, 0, 0, 0, 1.04, 0.09, 0.14, 0xd8ceb8, S.CONCRETE, 1.05);
    kitBox(L, 0, 0.94, 0, 1.04, 0.09, 0.14, 0xd8ceb8, S.CONCRETE, 1.05);
    for (const s of [-1, 1]) kitBox(L, s * 0.5, 0, 0, 0.08, 1.0, 0.14, 0xd8ceb8, S.CONCRETE, 1.0);
    kitBox(L, 0, 0.46, 0.02, 1.0, 0.05, 0.10, 0x3d3a34, S.METAL, 0.9);
    kitBox(L, 0, 0.46, 0.02, 0.04, 0.96, 0.10, 0x3d3a34, S.METAL, 0.9);
    defInst('window', combine(L));
  }
  {
    const L = [];
    L.push({ geo: G_BOX, mtx: xf3(0, 0.5, 0.13, 0, 0, 0, 0.86, 0.86, 0.04), col: 0xffffff, surf: 0, shade: 1 });
    defInst('winglow', combine(L), { mat: emisSoftMat, shadow: false });
  }
  /* ---- doors --------------------------------------------------------- */
  {
    const L = [];
    kitBox(L, 0, 0, 0, 1.3, 2.6, 0.12, 0xffffff, S.TIMBER, 0.9);
    for (let i = 0; i < 4; i++) kitBox(L, 0, 0.25 + i * 0.58, -0.05, 1.0, 0.42, 0.05, 0xffffff, S.TIMBER, 0.74);
    kitBox(L, 0, 0, -0.06, 1.5, 0.14, 0.2, 0xc9b795, S.TRAVERTINE, 1.05);
    kitBox(L, 0, 2.6, -0.06, 1.6, 0.18, 0.24, 0xc9b795, S.TRAVERTINE, 1.05);
    defInst('door', combine(L));
  }
  {
    // the studded heritage door of khobar1
    const L = [];
    kitBox(L, 0, 0, 0, 4.2, 5.2, 0.22, 0xffffff, S.TIMBER, 0.88);
    for (let i = 0; i < 3; i++) kitBox(L, 0, 0.5 + i * 1.6, -0.10, 3.6, 1.25, 0.08, 0xffffff, S.TIMBER, 0.72);
    kitBox(L, 0, 0, -0.11, 0.16, 5.2, 0.06, 0x4a3520, S.TIMBER, 0.7);
    for (let i = 0; i < 7; i++) for (let j = 0; j < 2; j++) {
      L.push({ geo: G_SPH, mtx: xf3(-1.2 + j * 2.4, 0.6 + i * 0.66, -0.14, 0, 0, 0, 0.16, 0.16, 0.16), col: 0x30251b, surf: S.METAL, shade: 0.9 });
    }
    defInst('bigdoor', combine(L));
  }
  /* ---- projecting shop sign ------------------------------------------ */
  {
    const L = [];
    kitBox(L, 0, 0, -0.4, 0.06, 0.06, 0.8, 0x2f2a24, S.METAL, 0.8);
    kitBox(L, 0, -0.5, -0.75, 1.15, 0.62, 0.08, 0xffffff, S.METAL, 1.0);
    kitBox(L, 0, -0.5, -0.70, 1.22, 0.68, 0.04, 0x2f2a24, S.METAL, 0.7);
    defInst('sign', combine(L));
  }
  /* ---- freestanding signage totem ------------------------------------
     A lit vertical panel on a plinth, standing in the paving. It is in every
     one of the downtown reference renders — usually two or three of them
     across a square — and the district had only the wall-mounted bracket
     above, which is a different object doing a different job. Kept plain:
     the display face is emissive and carries the light, the surround is dark
     metal, and the plinth grounds it so it does not look pasted onto the
     paving. */
  {
    const L = [];
    kitBox(L, 0, 0, 0, 1.02, 0.16, 0.42, 0x2a2723, S.METAL, 0.72);        // plinth
    kitBox(L, 0, 0.14, 0, 0.92, 2.42, 0.26, 0x33302b, S.METAL, 0.86);     // body
    kitBox(L, 0, 0.22, -0.14, 0.80, 2.20, 0.05, 0xf2ece0, S.METAL, 1.06); // face
    for (const s of [-1, 1]) kitBox(L, s * 0.46, 0.14, 0, 0.05, 2.42, 0.28, 0x1f1d1a, S.METAL, 0.7);
    defInst('totem', combine(L));
    // the display face again, emissive, so it reads as lit rather than pale
    const E = [];
    /* base-at-origin, like every other kit box: G_BOXT is translated +0.5 in
       Y, so this y is the bottom of the panel and not its centre. Getting
       that wrong floats the glow a metre above the sign it belongs to. */
    E.push({ geo: G_BOXT, mtx: xf3(0, 0.24, -0.17, 0, 0, 0, 0.76, 2.14, 0.02), col: 0xffffff, surf: 0, shade: 1 });
    defInst('totemlit', combine(E), { mat: emisSoftMat, shadow: false });
  }
  /* ---- timber pergola bracket ---------------------------------------- */
  {
    const L = [];
    kitBox(L, 0, 0, -0.6, 0.16, 0.16, 1.35, 0xffffff, S.TIMBER, 0.9);
    kitBox(L, 0, -0.55, -0.3, 0.12, 0.12, 0.9, 0xffffff, S.TIMBER, 0.8, 0, 0, -0.9);
    kitBox(L, 0, 0.10, -1.2, 1.9, 0.10, 0.12, 0xffffff, S.TIMBER, 0.95);
    defInst('bracket', combine(L));
  }
  /* ---- office louvre fin: tapered, so the rhythm has a bright edge ---- */
  {
    const L = [];
    L.push({ geo: taper(0.55, 1), mtx: xf3(0, 0, -0.5, 0, 0, 0, 1, 1, 1), col: 0xffffff, surf: S.TIMBER, shade: 0.94 });
    defInst('louvre', combine(L));
  }
  /* ---- roof kit ------------------------------------------------------- */
  {
    const L = [];
    for (let i = 0; i < 9; i++) kitBox(L, -0.45 + i * 0.11, 0, 0.5, 0.045, 1.0, 0.03, 0xffffff, S.TIMBER, 0.9);
    for (let i = 0; i < 9; i++) kitBox(L, -0.45 + i * 0.11, 0, -0.5, 0.045, 1.0, 0.03, 0xffffff, S.TIMBER, 0.9);
    for (const s of [-1, 1]) for (let i = 0; i < 9; i++) kitBox(L, s * 0.5, 0, -0.45 + i * 0.11, 0.03, 1.0, 0.045, 0xffffff, S.TIMBER, 0.85);
    kitBox(L, 0, 0, 0, 0.7, 0.75, 0.7, 0x555049, S.METAL, 0.75);
    kitBox(L, 0, 1.0, 0, 1.06, 0.08, 1.06, 0xffffff, S.CONCRETE, 1.0);
    defInst('acscreen', combine(L));
  }
  { const L = []; kitCyl(L, 0, 0, 0, 0.85, 1.6, 0xffffff, S.METAL, 0.95); kitCyl(L, 0, 1.6, 0, 0.9, 0.12, 0xffffff, S.METAL, 1.05); defInst('tank', combine(L)); }
  { const L = []; kitBox(L, 0, 0, 0, 1, 1, 1, 0xffffff, S.METAL, 0.85); kitBox(L, 0, 1, 0, 1.1, 0.1, 1.1, 0xffffff, S.METAL, 0.95); defInst('duct', combine(L)); }
  { const L = []; for (let i = 0; i < 5; i++) for (let j = 0; j < 8; j++) kitBox(L, -0.4 + i * 0.2, 0.06 + j * 0.12, 0, 0.13, 0.08, 0.22, 0xffffff, S.ASHLAR, 0.86 + 0.03 * ((i + j) % 3)); defInst('perfpanel', combine(L)); }

  /* ---- street furniture ---------------------------------------------- */
  { // planter box
    const L = [];
    for (const e of [[0, 0.5, 1, 0.09], [0, -0.5, 1, 0.09], [0.5, 0, 0.09, 1], [-0.5, 0, 0.09, 1]]) {
      kitBox(L, e[0], 0, e[1], e[2], 0.62, e[3], 0xffffff, S.TRAVERTINE, 1.0);
    }
    kitBox(L, 0, 0.5, 0, 0.92, 0.14, 0.92, 0x4a3a28, S.FOLIAGE, 0.55);
    kitBox(L, 0, 0.62, 0, 1.06, 0.09, 1.06, 0xffffff, S.TRAVERTINE, 1.08);
    // the warm strip under the lip that pools light on the paving
    L.push({ geo: G_BOX, mtx: xf3(0, 0.14, 0.52, 0, 0, 0, 0.9, 0.05, 0.03), col: 0xffc98a, surf: 0, shade: 1 });
    defInst('planter', combine(L));
  }
  { const L = []; kitCyl(L, 0, 0, 0, 0.42, 0.55, 0xffffff, S.TRAVERTINE, 1.0); kitCyl(L, 0, 0.55, 0, 0.46, 0.08, 0xffffff, S.TRAVERTINE, 1.06); defInst('pot', combine(L)); }
  { const L = []; for (let i = 0; i < 9; i++) kitCyl(L, 0, i * 0.09, 0, 0.42 + 0.03 * Math.sin(i), 0.075, 0xffffff, S.FABRIC, 0.82 + 0.04 * (i % 2)); defInst('basket', combine(L)); }
  { // bollard
    const L = []; kitCyl(L, 0, 0, 0, 0.11, 0.85, 0x3b3730, S.METAL, 0.9);
    L.push({ geo: G_SPH, mtx: xf3(0, 0.85, 0, 0, 0, 0, 0.24, 0.18, 0.24), col: 0x3b3730, surf: S.METAL, shade: 1 });
    L.push({ geo: G_BOX, mtx: xf3(0, 0.78, 0, 0, 0, 0, 0.2, 0.05, 0.2), col: 0xffcf8e, surf: 0, shade: 1 });
    defInst('bollard', combine(L));
  }
  { // street light: slim dark pole with a downlight head
    const L = [];
    kitCyl(L, 0, 0, 0, 0.09, 4.6, 0x2f2f2c, S.METAL, 0.86);
    kitBox(L, 0, 4.6, 0.30, 0.16, 0.14, 0.75, 0x2f2f2c, S.METAL, 0.9);
    kitBox(L, 0, 4.42, 0.62, 0.30, 0.20, 0.42, 0x2f2f2c, S.METAL, 0.95);
    L.push({ geo: G_BOX, mtx: xf3(0, 4.40, 0.62, 0, 0, 0, 0.24, 0.04, 0.34), col: 0xfff0d0, surf: 0, shade: 1 });
    defInst('streetlight', combine(L));
  }
  { /* the ornate three-head lantern from the downtown references — a cast
       post with two scrolled arms and a taller centre head, each head a
       tapered glass case under a peaked cap. Built by measure off the
       reference crop (post ~2.9 m, heads at 3.1 and 3.4, case 0.30 m at the
       glass): the one fixture in the kit that is seen from arm's length all
       round the plaza, so it is coded rather than scanned. */
    const IRON = 0x26231f, L = [], G = [];
    kitCyl(L, 0, 0, 0, 0.36, 0.09, IRON, S.METAL, 0.88);
    kitCyl(L, 0, 0.09, 0, 0.27, 0.11, IRON, S.METAL, 0.84);
    kitCyl(L, 0, 0.20, 0, 0.165, 0.46, IRON, S.METAL, 0.92);
    kitCyl(L, 0, 0.66, 0, 0.115, 0.09, IRON, S.METAL, 1.02);
    kitCyl(L, 0, 0.75, 0, 0.082, 1.32, IRON, S.METAL, 0.95);
    kitCyl(L, 0, 2.07, 0, 0.098, 0.08, IRON, S.METAL, 1.03);
    kitCyl(L, 0, 2.15, 0, 0.062, 0.82, IRON, S.METAL, 0.93);
    kitCyl(L, 0, 2.97, 0, 0.105, 0.09, IRON, S.METAL, 1.05);
    for (const s of [-1, 1]) {
      // the arm: three chords of a curve, and the scroll under its elbow
      kitBox(L, s * 0.15, 3.02, 0, 0.20, 0.045, 0.045, IRON, S.METAL, 0.9, 0, 0, s * 0.55);
      kitBox(L, s * 0.36, 3.11, 0, 0.22, 0.045, 0.045, IRON, S.METAL, 0.9, 0, 0, s * 0.22);
      kitBox(L, s * 0.52, 3.13, 0, 0.10, 0.05, 0.05, IRON, S.METAL, 0.9);
      kitBox(L, s * 0.30, 2.90, 0, 0.045, 0.17, 0.045, IRON, S.METAL, 0.85, 0, 0, s * 0.4);
    }
    kitCyl(L, 0, 3.06, 0, 0.048, 0.32, IRON, S.METAL, 0.95);
    const head = (hx, hy) => {
      kitBox(L, hx, hy, 0, 0.10, 0.045, 0.10, IRON, S.METAL, 0.9);          // seat
      for (const c of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) {               // corner ribs
        L.push({ geo: taper(1.32, 1), mtx: xf3(hx + c[0] * 0.115, hy + 0.045, c[1] * 0.115, 0, 0, 0, 0.028, 0.34, 0.028), col: IRON, surf: S.METAL, shade: 0.92 });
      }
      L.push({ geo: taper(0.24, 1), mtx: xf3(hx, hy + 0.385, 0, 0, 0, 0, 0.36, 0.17, 0.36), col: IRON, surf: S.METAL, shade: 0.9 });  // cap
      L.push({ geo: G_SPH, mtx: xf3(hx, hy + 0.56, 0, 0, 0, 0, 0.05, 0.07, 0.05), col: IRON, surf: S.METAL, shade: 0.95 });          // finial
      G.push({ geo: taper(1.30, 1), mtx: xf3(hx, hy + 0.05, 0, 0, 0, 0, 0.20, 0.33, 0.20), col: 0xffffff, surf: 0, shade: 1 });      // the glass
    };
    head(-0.55, 3.13); head(0.55, 3.13); head(0, 3.36);
    defInst('plazlamp', combine(L));
    defInst('plazlampglow', combine(G), { mat: emisFlickMat, shadow: false });
  }
  { // bench with an under-seat glow, as in madinah2
    const L = [];
    kitBox(L, 0, 0, 0, 2.4, 0.42, 0.75, 0xffffff, S.TRAVERTINE, 1.0);
    for (let i = 0; i < 6; i++) kitBox(L, 0, 0.42, -0.3 + i * 0.12, 2.3, 0.07, 0.09, 0x8a5a34, S.TIMBER, 0.92);
    L.push({ geo: G_BOX, mtx: xf3(0, 0.10, 0.38, 0, 0, 0, 2.2, 0.05, 0.03), col: 0xffc07a, surf: 0, shade: 1 });
    defInst('bench', combine(L));
  }
  { const L = []; kitCyl(L, 0, 0, 0, 0.28, 0.9, 0x3b3730, S.METAL, 0.85); kitCyl(L, 0, 0.9, 0, 0.31, 0.07, 0x3b3730, S.METAL, 0.95); defInst('bin', combine(L)); }
  { const L = []; kitBox(L, 0, 0, 0, 0.6, 0.03, 0.35, 0x22201d, S.METAL, 0.7); for (let i = 0; i < 5; i++) kitBox(L, -0.22 + i * 0.11, 0.03, 0, 0.05, 0.02, 0.3, 0x15140f, S.METAL, 0.5); defInst('gully', combine(L), { shadow: false }); }

  /* ---- café furniture ------------------------------------------------ */
  { // round table
    const L = [];
    kitCyl(L, 0, 0, 0, 0.28, 0.05, 0xffffff, S.METAL, 0.85);
    kitCyl(L, 0, 0.05, 0, 0.05, 0.68, 0xffffff, S.METAL, 0.9);
    kitCyl(L, 0, 0.73, 0, 0.42, 0.05, 0xffffff, S.CONCRETE, 1.05);
    defInst('table', combine(L));
  }
  { // wire chair, Bertoia-ish: a mesh seat on splayed rod legs
    const L = [];
    for (let i = 0; i < 4; i++) {
      const ang = i / 4 * 6.283 + 0.78;
      kitBox(L, Math.sin(ang) * 0.20, 0, Math.cos(ang) * 0.20, 0.035, 0.44, 0.035, 0xffffff, S.METAL, 0.86, 0, Math.cos(ang) * 0.2, -Math.sin(ang) * 0.2);
    }
    for (let i = 0; i < 7; i++) kitBox(L, -0.21 + i * 0.07, 0.44, 0, 0.028, 0.02, 0.46, 0xffffff, S.METAL, 0.95);
    for (let i = 0; i < 7; i++) kitBox(L, 0, 0.45, -0.23 + i * 0.077, 0.46, 0.02, 0.028, 0xffffff, S.METAL, 0.95);
    for (let i = 0; i < 7; i++) kitBox(L, -0.21 + i * 0.07, 0.47, -0.22, 0.026, 0.44, 0.026, 0xffffff, S.METAL, 0.92, 0, -0.22, 0);
    defInst('chair', combine(L));
  }
  { // square café umbrella, open
    const L = [];
    kitCyl(L, 0, 0, 0, 0.05, 2.3, 0x3f3a33, S.METAL, 0.85);
    for (let i = 0; i < 4; i++) {
      const ang = i / 4 * 6.283 + 0.785;
      L.push({ geo: G_BOXT, mtx: xf3(Math.sin(ang) * 1.05, 2.18, Math.cos(ang) * 1.05, 0, ang, 0.30, 1.55, 0.05, 1.55), col: 0xffffff, surf: S.FABRIC, shade: 0.90 + 0.06 * i });
    }
    kitBox(L, 0, 2.36, 0, 0.24, 0.16, 0.24, 0xffffff, S.FABRIC, 1.05);
    for (let i = 0; i < 4; i++) {
      const ang = i / 4 * 6.283 + 0.785;
      kitBox(L, Math.sin(ang) * 0.55, 2.05, Math.cos(ang) * 0.55, 0.035, 0.035, 1.1, 0x3f3a33, S.METAL, 0.8, ang);
    }
    kitCyl(L, 0, 0, 0, 0.42, 0.12, 0x55504a, S.CONCRETE, 0.9);
    defInst('umbrella', combine(L));
  }
  { // furled umbrella — the closed one at the left of madinah2
    const L = [];
    kitCyl(L, 0, 0, 0, 0.05, 2.5, 0x3f3a33, S.METAL, 0.85);
    for (let i = 0; i < 6; i++) {
      const ang = i / 6 * 6.283;
      L.push({ geo: G_BOXT, mtx: xf3(Math.sin(ang) * 0.09, 0.95, Math.cos(ang) * 0.09, 0, ang, 0.05, 0.17, 1.55, 0.11), col: 0xffffff, surf: S.FABRIC, shade: 0.80 + 0.10 * (i % 3) });
    }
    kitCyl(L, 0, 2.4, 0, 0.07, 0.22, 0xffffff, S.FABRIC, 1.0);
    kitCyl(L, 0, 0, 0, 0.42, 0.12, 0x55504a, S.CONCRETE, 0.9);
    defInst('umbrella_furled', combine(L));
  }
  { // majlis pieces
    const L = [];
    kitBox(L, 0, 0, 0, 0.92, 0.19, 0.84, 0xffffff, S.FABRIC, 1.0);
    kitBox(L, 0, 0.19, -0.29, 0.88, 0.34, 0.24, 0xffffff, S.FABRIC, 0.92);
    defInst('cushion', combine(L));
  }
  { const L = []; kitCyl(L, 0, 0, 0, 0.19, 0.95, 0xffffff, S.FABRIC, 0.95); defInst('bolster', combine(L)); }
  {
    const L = [];
    kitCyl(L, 0, 0, 0, 0.55, 0.42, 0xffffff, S.CONCRETE, 0.95);
    kitCyl(L, 0, 0.42, 0, 0.85, 0.09, 0xffffff, S.CONCRETE, 1.06);
    defInst('lowtable', combine(L));
  }
  { const L = []; kitCyl(L, 0, 0, 0, 0.24, 0.06, 0xffffff, S.CONCRETE, 1.0); for (let i = 0; i < 5; i++) { const a2 = i / 5 * 6.283; L.push({ geo: G_SPH, mtx: xf3(Math.sin(a2) * 0.09, 0.06, Math.cos(a2) * 0.09, 0, 0, 0, 0.13, 0.11, 0.13), col: 0xffffff, surf: S.FOLIAGE, shade: 1 }); } defInst('platter', combine(L)); }
  { // sadu rug: banded, geometry-thin
    const L = [];
    const bands = 11;
    for (let i = 0; i < bands; i++) {
      const c = i % 3 === 0 ? K.sadu : (i % 3 === 1 ? 0xe7dcc6 : K.saduDk);
      kitBox(L, 0, 0, -0.5 + (i + 0.5) / bands, 1.0, 0.02, 1 / bands * 0.98, c, S.FABRIC, 0.9 + 0.08 * (i % 2));
    }
    defInst('rug', combine(L), { shadow: false });
  }

  /* ---- what a shop puts out on the pavement --------------------------- */
  {   // stacked crates
    const L = [];
    for (let i = 0; i < 3; i++) {
      const w = 0.52 - i * 0.05;
      kitBox(L, (i % 2) * 0.06, i * 0.34, (i % 2) * 0.04, w, 0.32, w * 0.8, 0xffffff, S.TIMBER, 0.86 + 0.06 * i, i * 0.5);
      kitBox(L, (i % 2) * 0.06, i * 0.34 + 0.30, (i % 2) * 0.04, w + 0.04, 0.05, w * 0.8 + 0.04, 0xffffff, S.TIMBER, 1.02, i * 0.5);
    }
    for (let i = 0; i < 5; i++) {
      L.push({ geo: G_SPH, mtx: xf3(-0.14 + i * 0.07, 1.05, 0, 0, 0, 0, 0.14, 0.13, 0.14), col: 0xc8863c, surf: S.FOLIAGE, shade: 0.95 });
    }
    defInst('crate', combine(L));
  }
  {   // a rail of hanging cloth outside a textile shop
    const L = [];
    kitBox(L, 0, 1.75, 0, 1.5, 0.05, 0.05, 0x3f3a33, S.METAL, 0.9);
    for (const sd of [-1, 1]) kitBox(L, sd * 0.72, 0, 0, 0.05, 1.78, 0.05, 0x3f3a33, S.METAL, 0.85);
    for (let i = 0; i < 7; i++) {
      const w = 0.16 + (i % 3) * 0.03;
      kitBox(L, -0.62 + i * 0.20, 0.55, (i % 2) * 0.03, w, 1.18, 0.035, 0xffffff, S.FABRIC, 0.72 + 0.22 * (i % 4) / 3, (i % 2) * 0.12);
    }
    defInst('goods', combine(L));
  }
  {   // an A-board
    const L = [];
    for (const sd of [-1, 1]) {
      kitBox(L, 0, 0, sd * 0.16, 0.62, 0.92, 0.04, 0xffffff, S.TIMBER, 0.9, 0, sd * 0.34, 0);
    }
    kitBox(L, 0, 0.90, 0, 0.66, 0.05, 0.36, 0xffffff, S.TIMBER, 1.0);
    defInst('aboard', combine(L));
  }
  {   // rolled mats leaning on a wall
    const L = [];
    for (let i = 0; i < 4; i++) {
      L.push({ geo: G_CYLT, mtx: xf3(-0.18 + i * 0.13, 0, (i % 2) * 0.05, 0.16 + (i % 2) * 0.06, 0, 0, 0.2, 1.35 + (i % 3) * 0.15, 0.2), col: i % 2 ? K.sadu : 0xd8c9a8, surf: S.FABRIC, shade: 0.86 + 0.08 * (i % 3) });
    }
    defInst('matroll', combine(L));
  }
  {   // the stone drain channel down the middle of a pedestrian street
    const L = [];
    kitBox(L, 0, 0, 0, 0.46, 0.05, 1.0, 0xffffff, S.TRAVERTINE, 0.78);
    for (const sd of [-1, 1]) kitBox(L, sd * 0.30, 0, 0, 0.16, 0.06, 1.0, 0xffffff, S.TRAVERTINE, 1.04);
    defInst('drain', combine(L), { shadow: false });
  }

  /* ================================================== INTERIOR FIT-OUT ==
     A shop you can see into is not a lit box with a counter in it. It is a
     floor, a ceiling with a light in it, a back wall doing something, and
     three or four pieces of furniture arranged by someone who wanted to sell
     you something. All of it instanced, because there are two hundred shops
     and every one of them is looked into from two metres away.

     Everything here is authored in a one-metre cell with its origin at the
     floor and -Z facing the street, so the room composer can place a piece by
     giving it a position, a facing and a scale, and nothing has to know what
     kind of shop it ended up in.                                            */

  { // shelving bay: four shelves of stock, the colours baked in so one
    // instanced draw still gives a wall of mixed merchandise
    const L = [];
    for (const sd of [-1, 1]) kitBox(L, sd * 0.47, 0, 0, 0.06, 2.0, 0.42, 0x6a4a2c, S.TIMBER, 0.62);
    kitBox(L, 0, 0, 0.20, 1.0, 2.0, 0.04, 0x5d4126, S.TIMBER, 0.5);
        // muted into the district's own palette: a shelf of primaries reads as a
    // toy shop from the street, whatever the trade is meant to be
    const GOODS = [0x9c6248, 0xbe9a5c, 0x7d8358, 0x5f7180, 0xc4b596, 0x8a7288, 0xd2cbb8, 0x6f4a2e];
    for (let s = 0; s < 4; s++) {
      const y = 0.34 + s * 0.46;
      kitBox(L, 0, y, 0, 0.98, 0.045, 0.40, 0x7a5636, S.TIMBER, 0.86);
      let x = -0.44;
      let i = 0;
      while (x < 0.40) {
        const w = 0.09 + ((s * 7 + i * 3) % 5) * 0.035;
        const h = 0.16 + ((s * 5 + i * 11) % 4) * 0.055;
        kitBox(L, x + w / 2, y + 0.045, ((i + s) % 3) * 0.04 - 0.04, w * 0.92, h, 0.24 + ((i + s) % 3) * 0.05,
          GOODS[(s * 3 + i * 5) % GOODS.length], S.RENDER, 0.74 + 0.10 * ((i + s) % 3));
        x += w + 0.018; i++;
      }
    }
    defInst('shelfbay', combine(L));
  }
  { // the window display: a plinth right behind the glass with product on it,
    // which is the piece of a shop anyone standing outside actually looks at
    const L = [];
    kitBox(L, 0, 0, 0, 1.0, 0.52, 0.52, 0xc9bda6, S.TRAVERTINE, 0.98);
    kitBox(L, 0, 0.52, 0, 1.04, 0.035, 0.56, 0xdcd3bf, S.TRAVERTINE, 1.10);
    const C = [0xb08a52, 0x8d6a4a, 0xa8a08c, 0xc4b596, 0x7d8358];
    for (let i = 0; i < 4; i++) {
      const w = 0.13 + (i % 3) * 0.05;
      kitBox(L, -0.34 + i * 0.23, 0.555, ((i % 3) - 1) * 0.07, w, 0.14 + (i % 4) * 0.09, w * 0.9,
        C[i % C.length], S.RENDER, 0.92 + 0.08 * (i % 2));
    }
    defInst('windisp', combine(L));
    const G = [];
    G.push({ geo: G_BOXT, mtx: xf3(0, 0.555, 0, 0, 0, 0, 0.94, 0.012, 0.48), col: 0xffffff, surf: 0, shade: 1 });
    defInst('windispglow', combine(G), { mat: emisRoomMat, shadow: false });
  }
  { // a serving / sales counter: a solid base, a stone top, a kick recess
    const L = [];
    kitBox(L, 0, 0, 0.04, 1.0, 0.86, 0.52, 0x54402a, S.TIMBER, 0.62);
    kitBox(L, 0, 0.10, -0.26, 1.0, 0.76, 0.03, 0x6b5236, S.TIMBER, 0.72);
    kitBox(L, 0, 0.86, 0, 1.08, 0.055, 0.62, 0xd6cdb8, S.TRAVERTINE, 1.06);
    kitBox(L, 0, 0.915, -0.30, 1.08, 0.03, 0.03, 0xb9ad92, S.TRAVERTINE, 1.1);
    defInst('counter', combine(L));
  }
  { // a glazed display case — the carcass. Its glow is a separate part.
    const L = [];
    kitBox(L, 0, 0, 0, 1.0, 0.72, 0.56, 0x3d3a34, S.METAL, 0.66);
    kitBox(L, 0, 0.72, 0, 1.02, 0.02, 0.58, 0x8d8578, S.METAL, 0.9);
    for (const sd of [-1, 1]) kitBox(L, sd * 0.49, 0.74, 0, 0.03, 0.42, 0.56, 0x8d8578, S.METAL, 0.9);
    kitBox(L, 0, 1.16, 0, 1.02, 0.04, 0.58, 0x8d8578, S.METAL, 1.0);
    defInst('dispcase', combine(L));
    const G = [];
    // the lit deck and the goods standing on it
    G.push({ geo: G_BOXT, mtx: xf3(0, 0.74, 0, 0, 0, 0, 0.94, 0.02, 0.50), col: 0xffffff, surf: 0, shade: 1 });
    for (let i = 0; i < 7; i++) {
      G.push({ geo: G_BOXT, mtx: xf3(-0.38 + i * 0.126, 0.76, ((i % 3) - 1) * 0.10, 0, 0, 0,
        0.07 + (i % 3) * 0.02, 0.10 + (i % 4) * 0.05, 0.07 + (i % 2) * 0.03), col: 0xffffff, surf: 0, shade: 1 });
    }
    defInst('dispglow', combine(G), { mat: emisRoomMat, shadow: false });
  }
  { // upholstered banquette against a wall
    const L = [];
    kitBox(L, 0, 0, 0, 1.0, 0.40, 0.60, 0x6d3a34, S.FABRIC, 0.78);
    kitBox(L, 0, 0.40, 0.02, 1.0, 0.10, 0.56, 0x8a4a42, S.FABRIC, 0.94);
    kitBox(L, 0, 0.42, 0.26, 1.0, 0.62, 0.10, 0x7a413a, S.FABRIC, 0.86);
    for (let i = 0; i < 3; i++) kitBox(L, -0.3 + i * 0.3, 0.52, 0.19, 0.24, 0.24, 0.09, 0xc9b48c, S.FABRIC, 1.0, 0, 0, 0.2);
    defInst('banquette', combine(L));
  }
  { // espresso machine and its grinder
    const L = [];
    kitBox(L, 0, 0, 0, 0.62, 0.30, 0.42, 0xc8c2b6, S.METAL, 1.02);
    kitBox(L, 0, 0.30, 0.04, 0.56, 0.16, 0.34, 0x8f2f28, S.METAL, 0.92);
    for (const sd of [-1, 1]) kitCyl(L, sd * 0.18, 0.20, -0.20, 0.035, 0.10, 0x2c2a26, S.METAL, 0.7);
    kitCyl(L, 0.42, 0, 0.02, 0.09, 0.46, 0x3a3833, S.METAL, 0.8);
    kitCyl(L, 0.42, 0.46, 0.02, 0.07, 0.14, 0xc8c2b6, S.METAL, 1.0);
    defInst('espresso', combine(L));
  }
  { // a rail of clothes on hangers, seen from the shop side
    const L = [];
    for (const sd of [-1, 1]) kitBox(L, sd * 0.46, 0, 0, 0.05, 1.62, 0.05, 0x4a4740, S.METAL, 0.8);
    kitBox(L, 0, 1.62, 0, 0.96, 0.04, 0.04, 0x4a4740, S.METAL, 0.9);
    const CLOTH = [0xd8d2c4, 0x8e5b4a, 0x4b5f72, 0xc2a45e, 0x6e6a5c, 0x9a8fa8, 0xe0d6bc];
    for (let i = 0; i < 9; i++) {
      kitBox(L, -0.40 + i * 0.10, 0.56, ((i % 3) - 1) * 0.03, 0.085, 1.04, 0.13,
        CLOTH[i % CLOTH.length], S.FABRIC, 0.72 + 0.16 * (i % 3));
    }
    defInst('railrack', combine(L));
  }
  { // a dressed torso on a stand, for the window
    const L = [];
    kitCyl(L, 0, 0, 0, 0.16, 0.04, 0x3a3833, S.METAL, 0.8);
    kitCyl(L, 0, 0.04, 0, 0.03, 0.72, 0x3a3833, S.METAL, 0.85);
    L.push({ geo: G_CYLT, mtx: xf3(0, 0.76, 0, 0, 0, 0, 0.38, 0.62, 0.26), col: 0xe4dccc, surf: S.FABRIC, shade: 1.0 });
    L.push({ geo: G_SPH, mtx: xf3(0, 1.38, 0, 0, 0, 0, 0.20, 0.16, 0.18), col: 0xd8cfbd, surf: S.FABRIC, shade: 1.05 });
    defInst('mannequin', combine(L));
  }
  { // a stack of folded stock on a table
    const L = [];
    kitBox(L, 0, 0, 0, 0.9, 0.72, 0.62, 0x6a4a2c, S.TIMBER, 0.66);
    const C = [0xd8d2c4, 0xa8674f, 0x546b7a, 0xc2a45e, 0x8d8272];
    for (let i = 0; i < 5; i++) kitBox(L, ((i % 2) - 0.5) * 0.34, 0.72 + i * 0.075, ((i % 3) - 1) * 0.05, 0.34, 0.07, 0.30, C[i % C.length], S.FABRIC, 0.86 + 0.06 * (i % 2));
    defInst('stack', combine(L));
  }
  { // a shelf of bottles behind a bar
    const L = [];
    kitBox(L, 0, 0, 0, 1.0, 0.035, 0.22, 0x5d4126, S.TIMBER, 0.9);
    const C = [0x7a4a2a, 0x3f5a3a, 0xc8b48a, 0x6a3040, 0xb8a05a, 0x3a4a5c];
    for (let i = 0; i < 11; i++) {
      // six-sided: a 30 mm bottle behind glass at two metres does not need twelve
      L.push({ geo: G_CYL6, mtx: xf(-0.44 + i * 0.088, 0.035, ((i % 2) - 0.5) * 0.05, 0,
        (0.032 + (i % 3) * 0.008) * 2, 0.20 + (i % 4) * 0.055, (0.032 + (i % 3) * 0.008) * 2),
        col: C[i % C.length], surf: S.RENDER, shade: 0.9 });
    }
    defInst('bottles', combine(L));
  }
  { // pendant lamp: cord and shade, with its own bulb as an emissive part
    const L = [];
    kitBox(L, 0, -0.62, 0, 0.018, 0.62, 0.018, 0x2e2a24, S.METAL, 0.6);
    L.push({ geo: G_CONE, mtx: xf3(0, -0.62, 0, Math.PI, 0, 0, 0.30, 0.22, 0.30), col: 0xc4a06a, surf: S.METAL, shade: 0.9 });
    defInst('pendant', combine(L), { shadow: false });
    const G = [];
    G.push({ geo: G_SPH, mtx: xf3(0, -0.70, 0, 0, 0, 0, 0.15, 0.11, 0.15), col: 0xffffff, surf: 0, shade: 1 });
    G.push({ geo: G_BOXT, mtx: xf3(0, -0.845, 0, 0, 0, 0, 0.30, 0.012, 0.30), col: 0xffffff, surf: 0, shade: 1 });
    defInst('pendantglow', combine(G), { mat: emisRoomMat, shadow: false });
  }
  { // a lit cove: the strip of light along the back of a ceiling
    const L = [];
    L.push({ geo: G_BOXT, mtx: xf3(0, 0, 0, 0, 0, 0, 1.0, 0.05, 0.12), col: 0xffffff, surf: 0, shade: 1 });
    defInst('cove', combine(L), { mat: emisRoomMat, shadow: false });
  }
  { // a menu or price board
    const L = [];
    kitBox(L, 0, 0, 0, 1.0, 0.66, 0.04, 0x2a2620, S.TIMBER, 0.5);
    for (let i = 0; i < 5; i++) kitBox(L, -0.10 + (i % 2) * 0.06, 0.10 + i * 0.11, -0.025, 0.62 - (i % 3) * 0.14, 0.028, 0.01, 0xd8cfb8, S.RENDER, 1.1);
    defInst('menuboard', combine(L), { shadow: false });
  }
  { // a floor plate: one tiled or boarded slab, tinted per shop
    const L = [];
    kitBox(L, 0, 0, 0, 1.0, 0.03, 1.0, 0xffffff, S.PAVING, 1.0);
    defInst('shopfloor', combine(L), { shadow: false });
  }

  /* ---- light fittings ------------------------------------------------ */
  { const L = []; L.push({ geo: G_SPH, mtx: xf3(0, 0, 0, 0, 0, 0, 0.11, 0.14, 0.11), col: 0xffffff, surf: 0, shade: 1 }); defInst('bulb', combine(L), { mat: emisFlickMat, shadow: false }); }
  {
    const L = [];
    kitCyl(L, 0, -0.55, 0, 0.10, 0.10, 0x6b4a2a, S.METAL, 0.9);
    kitBox(L, 0, -0.45, 0, 0.20, 0.34, 0.20, 0xb0763c, S.METAL, 0.85);
    kitCyl(L, 0, -0.10, 0, 0.13, 0.10, 0xb0763c, S.METAL, 0.95);
    defInst('lanternBody', combine(L), { shadow: false });
    const L2 = [];
    L2.push({ geo: G_BOXT, mtx: xf3(0, -0.42, 0, 0, 0, 0, 0.15, 0.27, 0.15), col: 0xffffff, surf: 0, shade: 1 });
    defInst('lantern', combine(L2), { mat: emisFlickMat, shadow: false });
  }
  { const L = []; L.push({ geo: G_CYLT, mtx: xf3(0, 0, 0, 0, 0, 0, 0.42, 0.09, 0.42), col: 0xffffff, surf: 0, shade: 1 }); defInst('uplight', combine(L), { mat: emisMat, shadow: false }); }
  { const L = []; L.push({ geo: G_BOXT, mtx: xf3(0, 0, 0, 0, 0, 0, 0.22, 0.05, 0.22), col: 0xffffff, surf: 0, shade: 1 }); defInst('shoplight', combine(L), { mat: emisMat, shadow: false }); }
  {
    const L = [];
    kitBox(L, 0, 0, 0, 0.16, 0.55, 0.22, 0xffffff, S.METAL, 0.85);
    L.push({ geo: G_BOX, mtx: xf3(0, 0.30, 0.02, 0, 0, 0, 0.12, 0.06, 0.18), col: 0xffc98a, surf: 0, shade: 1 });
    defInst('sconce', combine(L), { shadow: false });
  }

  /* ---- people: stylised, faceless, respectful ------------------------ *
     The old figure was a stack of tapered drums, and at street level a hundred
     of them read as traffic cones: no legs, a hem 800 mm across, and nothing
     that moved except the whole body sliding along a path.

     These are built to a real skeleton — feet at 0, knee at 0.48, hip at 0.92,
     shoulder at 1.42, crown at 1.74 — and every limb is tagged so the vertex
     shader can swing it. The tag rides in the *fractional* part of the surface
     class, which costs no attribute and no memory: the surface law reads
     `floor(aSurf)` and the walk cycle reads `fract(aSurf)`.

        .10 left leg   .20 right leg   .30 left arm   .40 right arm

     A robed figure gets its skirt split into two overlapping panels tagged as
     legs, so the hem opens and closes as it walks, which is what a thobe
     actually does. Bare-legged figures get trousers.                        */
  const LIMB = { LL: 0.10, RL: 0.20, LA: 0.30, RA: 0.40 };
  const SPH7 = new THREE.SphereGeometry(0.5, 7, 5);
  const DRUM8 = (function () { const g = new THREE.CylinderGeometry(0.5, 0.5, 1, 8, 1); g.translate(0, 0.5, 0); return g; })();

  /* an eight-sided tapered drum, flattened front-to-back — a body is an
     ellipse in plan, never a circle and never a slab */
  function limb(L, x, y, z, h, rTop, rBot, col, shade, tag, lean, flat) {
    const g = DRUM8.clone();
    const p = g.attributes.position;
    for (let i = 0; i < p.count; i++) {
      const t = p.getY(i);
      const r = mix(rBot, rTop, t);
      p.setX(i, p.getX(i) * r * 2);
      p.setZ(i, p.getZ(i) * r * 2 * (flat === undefined ? 0.80 : flat));
    }
    g.computeVertexNormals();
    L.push({ geo: g, mtx: xf3(x, y, z, lean || 0, 0, 0, 1, h, 1),
      col, surf: S.FABRIC + (tag || 0), shade });
  }

  const figure = (opt) => {
    const L = [];
    const robe = opt.robe, skin = opt.skin, cloth = opt.cloth;
    const walk = opt.walk ? 1 : 0;
    const tag = (t) => walk * t;

    if (opt.seated) {
      limb(L, 0, 0, 0, 0.44, 0.20, 0.24, robe, 0.84);
      limb(L, 0, 0.03, 0.20, 0.40, 0.15, 0.17, robe, 0.78, 0, 1.42);
      limb(L, 0, 0.44, 0, 0.30, 0.20, 0.22, robe, 0.92);
      for (const s of [-1, 1]) limb(L, s * 0.19, 0.66, 0.02, 0.34, 0.055, 0.07, robe, 0.76, 0, 0.5);
      limb(L, 0, 0.74, 0, 0.07, 0.055, 0.06, skin, 0.88);
      L.push({ geo: SPH7, mtx: xf3(0, 0.86, 0, 0, 0, 0, 0.185, 0.225, 0.19), col: skin, surf: S.FABRIC, shade: 0.96 });
      if (cloth) {
        L.push({ geo: SPH7, mtx: xf3(0, 0.885, 0, 0, 0, 0, 0.215, 0.185, 0.22), col: cloth, surf: S.FABRIC, shade: 1.02 });
        for (const s of [-1, 1]) limb(L, s * 0.10, 0.60, 0.02, 0.30, 0.055, 0.085, cloth, 0.86, 0, 0, 1.4);
      } else if (opt.hijab) {
        L.push({ geo: SPH7, mtx: xf3(0, 0.86, -0.015, 0, 0, 0, 0.235, 0.26, 0.235), col: opt.hijab, surf: S.FABRIC, shade: 0.94 });
        limb(L, 0, 0.60, -0.02, 0.30, 0.11, 0.15, opt.hijab, 0.84);
      }
      return combine(L);
    }

    // ---- legs. A robe hides them; trousers do not.
    if (opt.trousers) {
      for (const [s, t] of [[-1, LIMB.LL], [1, LIMB.RL]]) {
        limb(L, s * 0.085, 0.46, 0, 0.48, 0.075, 0.095, opt.trousers, 0.72, tag(t));
        limb(L, s * 0.085, 0.06, 0, 0.42, 0.062, 0.078, opt.trousers, 0.66, tag(t));
        limb(L, s * 0.09, 0.0, 0.03, 0.06, 0.075, 0.070, opt.shoe || 0x2a2520, 0.60, tag(t), 0, 1.9);
      }
      limb(L, 0, 0.90, 0, 0.30, 0.155, 0.175, opt.trousers, 0.78);
      limb(L, 0, 1.16, 0, 0.30, 0.195, 0.175, robe, 0.90);
    } else {
      // the robe: one body above the knee, two overlapping panels below it, so
      // the hem opens as the legs pass each other
      for (const [s, t] of [[-1, LIMB.LL], [1, LIMB.RL]]) {
        limb(L, s * 0.055, 0.10, 0, 0.56, 0.135, 0.175, robe, 0.78, tag(t));
        limb(L, s * 0.075, 0.0, 0.025, 0.065, 0.075, 0.070, opt.shoe || 0x3a3128, 0.58, tag(t), 0, 1.9);
      }
      limb(L, 0, 0.62, 0, 0.44, 0.155, 0.215, robe, 0.86);
      limb(L, 0, 1.06, 0, 0.40, 0.185, 0.165, robe, 0.94);
    }

    // ---- shoulders, neck, head
    L.push({ geo: SPH7, mtx: xf3(0, 1.40, 0, 0, 0, 0, 0.245, 0.155, 0.145), col: robe, surf: S.FABRIC, shade: 0.98 });
    limb(L, 0, 1.42, 0, 0.09, 0.055, 0.062, skin, 0.84);
    L.push({ geo: SPH7, mtx: xf3(0, 1.60, 0.005, 0, 0, 0, 0.185, 0.235, 0.195), col: skin, surf: S.FABRIC, shade: 0.96 });

    // ---- arms, swinging opposite the legs
    for (const [s, t] of [[-1, LIMB.LA], [1, LIMB.RA]]) {
      limb(L, s * 0.195, 1.10, 0.005, 0.32, 0.055, 0.072, robe, 0.76, tag(t), s * 0.05, 0.9);
      limb(L, s * 0.205, 0.78, 0.015, 0.32, 0.048, 0.056, robe, 0.72, tag(t), s * 0.04, 0.9);
      L.push({ geo: SPH7, mtx: xf3(s * 0.21, 0.76, 0.02, 0, 0, 0, 0.085, 0.10, 0.075),
        col: skin, surf: S.FABRIC + tag(t), shade: 0.86 });
    }

    if (cloth) {
      // the ghutra: a cap, a fall either side of the face, and the black igal
      L.push({ geo: SPH7, mtx: xf3(0, 1.645, 0, 0, 0, 0, 0.215, 0.19, 0.225), col: cloth, surf: S.FABRIC, shade: 1.04 });
      for (const s of [-1, 1]) limb(L, s * 0.115, 1.30, 0.005, 0.34, 0.055, 0.10, cloth, 0.86, 0, s * 0.06, 1.5);
      L.push({ geo: SPH7, mtx: xf3(0, 1.44, -0.06, 0, 0, 0, 0.30, 0.24, 0.20), col: cloth, surf: S.FABRIC, shade: 0.82 });
      L.push({ geo: G_CYLT, mtx: xf3(0, 1.695, 0, 0, 0, 0, 0.235, 0.035, 0.245), col: 0x1b1814, surf: S.FABRIC, shade: 0.9 });
    } else if (opt.hijab) {
      L.push({ geo: SPH7, mtx: xf3(0, 1.60, -0.012, 0, 0, 0, 0.225, 0.255, 0.225), col: opt.hijab, surf: S.FABRIC, shade: 0.94 });
      limb(L, 0, 1.24, -0.02, 0.34, 0.115, 0.16, opt.hijab, 0.84);
    } else if (opt.hair) {
      L.push({ geo: SPH7, mtx: xf3(0, 1.625, -0.01, 0, 0, 0, 0.195, 0.21, 0.205), col: opt.hair, surf: S.FABRIC, shade: 0.72 });
    }
    return combine(L);
  };

  const THOBE = { robe: 0xf0ece2, skin: 0x8a6a4e, cloth: 0xe8e4da, shoe: 0x4a3c2c };
    // not black-black: at this hour an abaya reads as a very dark warm grey with
  // a blue rim off the sky, and true black loses the whole figure
  const ABAYA = { robe: 0x37313a, skin: 0x8a6a4e, hijab: 0x3d3642, shoe: 0x241f22 };
  const WEST  = { robe: 0xdad4c6, skin: 0x8a6a4e, trousers: 0x3d4552, hair: 0x2b2119, shoe: 0x2a2520 };
  const WEST2 = { robe: 0xc0d2d8, skin: 0x9a7a58, trousers: 0x574a5c, hair: 0x3a2a20, shoe: 0x3a2f28 };
  for (const w of [0, 1]) {
    const p = w ? 'walk_' : '';
    defInst(p + 'thobe', figure(Object.assign({ walk: w }, THOBE)));
    defInst(p + 'abaya', figure(Object.assign({ walk: w }, ABAYA)));
    defInst(p + 'west', figure(Object.assign({ walk: w }, WEST)));
    defInst(p + 'west2', figure(Object.assign({ walk: w }, WEST2)));
    defInst(p + 'child', (function () {
      const g = figure(Object.assign({ walk: w }, w % 2 ? WEST : THOBE));
      g.scale(0.64, 0.64, 0.64); return g;
    })());
  }
  defInst('sit_thobe', figure(Object.assign({ seated: 1 }, THOBE)));
  defInst('sit_abaya', figure(Object.assign({ seated: 1 }, ABAYA)));

  /* ---- birds and fountain jets --------------------------------------- */
  {
    const L = [];
    for (const s of [-1, 1]) L.push({ geo: G_BOXT, mtx: xf3(s * 0.16, 0, 0, 0, 0, s * 0.5, 0.30, 0.03, 0.10), col: 0x2b2a30, surf: S.FABRIC, shade: 1 });
    defInst('bird', combine(L), { shadow: false, cull: false });
  }
  {
    const g = new THREE.PlaneGeometry(1, 1);
    g.rotateX(-Math.PI / 2);
    defInst('pool', g, { mat: poolMat, shadow: false, receive: false, order: 3 });
  }
  {
    const L = [];
    L.push({ geo: G_CYLT, mtx: xf3(0, 0, 0, 0, 0, 0, 0.09, 1.0, 0.09), col: 0xffffff, surf: 0, shade: 1 });
    defInst('jet', combine(L), { mat: emisSoftMat, shadow: false });
  }
  {
    // the canvas ribbons stretched over the souq
    const L = [];
    const SEG = 14;
    for (let i = 0; i < SEG; i++) {
      const t = (i + 0.5) / SEG, u = t - 0.5;
      const sag = -1.5 * (0.25 - u * u) * 4;
      L.push({ geo: G_BOXT, mtx: xf3(0, sag, -0.5 + t, 0, 0, u * 0.55, 1.0, 0.02, 1 / SEG * 1.2), col: 0xffffff, surf: S.FABRIC, shade: 0.86 + 0.2 * Math.abs(u) });
    }
    defInst('ribbon', combine(L), { shadow: false });
  }

  /* ---------------------------------------------- the scanned substitutes *
     Handing four of the procedural parts over to the photogrammetry kit. The
     target heights are the heights the procedural versions were authored at,
     so every existing placement, scale and pivot still reads correctly — the
     avenue spacing, the courtyard beds and the roof gardens are unchanged. */
  /* a scrap of leaf or paper: one flat quad, curled, for the litter drift */
  {
    const L = [];
    L.push({ geo: G_PLANE, mtx: xf3(0, 0, 0, 0, 0, 0, 1, 1, 1), col: 0xffffff, surf: S.FABRIC, shade: 0.92 });
    L.push({ geo: G_PLANE, mtx: xf3(0.36, 0.055, 0.10, 0.42, 0.5, 0, 0.7, 1, 0.7), col: 0xffffff, surf: S.FABRIC, shade: 1.04 });
    defInst('scrap', combine(L), { shadow: false });
  }

  /* ------------------------------------------------- the interior copies *
     A chair on the pavement and a chair in a cafe are the same geometry under
     different skies, and an instanced mesh has exactly one material. So every
     part a shop can contain is registered a second time under an `i_` name
     against the interior material — same buffers, no extra geometry, and none
     of them casts into the shadow map, because the sun never gets in.      */
  for (const nm of ['shelfbay', 'windisp', 'counter', 'dispcase', 'banquette', 'espresso',
    'railrack', 'mannequin', 'stack', 'bottles', 'menuboard', 'shopfloor',
    'chair', 'table', 'rug', 'platter', 'crate', 'potbush', 'thobe', 'abaya',
    'basket', 'lowtable', 'cushion', 'bolster']) {
    const src = INST_DEF[nm];
    if (src) defInst('i_' + nm, src.geo, { mat: cityIntMat, shadow: false, receive: false });
  }

  routeModel('tree', 'island_tree_01', 6.2, { near: 62 });
  routeModel('rooftree', 'island_tree_01', 4.1, { near: 0 });
  routeModel('shrub', 'shrub_02', 1.55, { near: 52 });
  routeModel('olive', 'quiver_tree_01', 2.6, { near: 999 });
  routeModel('yucca', 'quiver_tree_01', 2.3, { near: 999 });
  routeModel('potbush', 'potted_plant_01', 1.05, { near: 999 });

  /* ---- generated props -------------------------------------------------
     Seventeen assets generated from this project's own renders, each reduced
     from ~2 M triangles to a few thousand and registered under a kit name.
     Where the name already exists the prop takes it over, so every bench and
     every bin in the district is upgraded without touching one placement —
     and if a prop failed to arrive, routeProp returns false and the hand-built
     part it would have replaced stays exactly where it was.

     The target is the real height in metres. Meshy normalises everything into
     the same two-metre box, so this is the only number that matters and the
     footprint follows from it. */
  routeProp('bench', 'benchw', 0.86, { near: 26 });
  routeProp('binbank', 'bins', 1.15, { near: 26 });
  routeProp('potset', 'pots', 1.30, { near: 22 });
  routeProp('bike', 'bicycle', 1.00, { near: 26 });
  routeProp('evpoint', 'evpoint', 1.50, { near: 26 });
  routeProp('pvarray', 'solar', 0.42, { shadow: false , near: 18 });
  routeProp('vinepanel', 'trellis', 2.60, { near: 30 });
  routeProp('hammock', 'hammock', 1.05, { near: 22 });
  routeProp('rugbig', 'carpet', 0.09, { shadow: false , near: 26 });
  routeProp('bunting', 'bunting', 0.50, { shadow: false , near: 34 });
  routeProp('wshrub', 'watershrub', 1.45, { near: 40 });
  routeProp('slimtree', 'lagoon_a', 6.20, { near: 70 });
  routeProp('jamaa', 'mosque', PLAN.jamaa.h, { jitter: false });
  routeProp('arcadeblk', 'arcade', 11.0, { jitter: false , near: 120 });

  /* ---- the masterplan set ----------------------------------------------
     Generated from the two site aerials rather than from a street-level
     render, so these are the pieces that were missing at plan scale: the
     transit spine under the gold canopy, the roundabout monument, and a
     street architecture that repeats without repeating. */
  routeProp('canopypav', 'canopypav', 15.0, { jitter: false });
  routeProp('tram', 'tram', 3.6, { jitter: false });
  routeProp('tramstop', 'tramstop', 3.4, { jitter: false });
  routeProp('shophouse', 'shophouse', 12.0, { near: 120 });
  routeProp('bluehall', 'bluehall', 16.0, { jitter: false , near: 160 });
  routeProp('resblock', 'resblock', 15.0, { near: 120 });
  routeProp('fountain', 'fountain', 2.46, { jitter: false });
  routeProp('obelisk', 'obelisk', 12.0, { jitter: false });
  routeProp('sail1', 'sail1', 5.0, { near: 60 });
  routeProp('kiosk', 'kiosk', 3.0, { near: 90 });
  /* Re-audited through the corrected intake, and three more of the earlier
     rejections were the pipeline's fault rather than the asset's: `extra` and
     `lagoon_b` are vernacular buildings with balconies and arcaded ground
     floors, not the unclassified rock masses the broken output made them look
     like, and the street bench is a bench. */
  routeProp('bench3', 'bench2', 0.62, { near: 26 });
  routeProp('townhouse', 'extra', 11.5, { near: 55 });
  routeProp('townhouse2', 'lagoon_b', 13.0, { near: 60 });
  routeProp('majlisset', 'majlisset', 0.80, { near: 30 });

  /* ==================================================== THE GENERATED SET ==
     Twenty-seven assets, each from one reference image through
     `models3d_generate`. They are routed here rather than placed, which means
     every existing call site picks them up without moving: the dressing pass
     still asks for a `bench` at a matrix and the router substitutes.

     Where a kit has SEVERAL new props, it is registered with routePropSet and
     the choice is made per instance from its own world position. That is the
     difference between an avenue of buildings and one building eleven times,
     and it is the single most valuable thing in this block. */

  /* ---- outdoor seating, which was the district's thinnest layer ---------
     It had one bench and used it everywhere: 300-odd identical seats down the
     souq, round the plaza, along the water. Now the kit name `bench` picks
     between the slatted bench and the two street benches already in the set,
     and three new kinds of seat exist that a bench cannot do — a ring round a
     tree, a sunken conversation bowl, and a deck you sit on the edge of. */
  routePropSet('bench', ['benchslat', 'benchw', 'bench2'], 0.86, { near: 26 });
  routeProp('treeseat', 'treebench', 0.46, { near: 30 });
  routeProp('treeseat2', 'treebench2', 0.46, { near: 30 });
  routeProp('seatbowl', 'seatbowl', 0.92, { near: 34 });
  routeProp('deckisle', 'deckisle', 0.42, { near: 40, shadow: false });
  routeProp('deckwave', 'deckwave', 0.38, { near: 40, shadow: false });

  /* ---- the cafe set ----------------------------------------------------
     `chair` and `table` are hand-built kit parts the dressing pass places by
     the hundred at every cafe frontage. They take over the same names. */
  routePropSet('chair', ['cafechair'], 0.90, { near: 22 });
  routePropSet('table', ['cafetable'], 0.75, { near: 22 });
  routeProp('parasol', 'parasol', 2.45, { near: 34 });

  /* ---- traffic. The district had none: every road in it was empty, which
     is the one thing that reads as a render rather than a place. Three cars,
     picked per instance, parked along the boulevard kerbs. */
  routePropSet('car', ['car_sedan', 'car_suv', 'car_hatch'], 1.48, { near: 45 });

  /* ---- light fixtures. One lamp type became three: the tall cast post for
     the boulevards, the shorter one for the souq, and a wall lantern for the
     shopfront piers, which the district has never had at all. */
  routePropSet('streetlight', ['lamppost', 'lamppost3'], 5.00, { near: 40 });
  routeProp('wlantern', 'lantern', 0.62, { near: 22, shadow: false });

  /* ---- shopfronts. These go INTO the arcade bays rather than in front of
     them: a glazed vitrine with a lit room behind it is exactly what the
     hand-built shopfront kit has been approximating. */
  routePropSet('vitrine', ['frontclw', 'frontclv', 'frontelw', 'frontelc'],
    3.30, { near: 30 });
  routeProp('clothrail', 'clothrail', 1.55, { near: 18, shadow: false });
  routeProp('acunit', 'acunit', 0.62, { near: 26, shadow: false });
  routeProp('balcrail', 'balcrail', 1.05, { near: 26, shadow: false });

  /* ---- the buildings ---------------------------------------------------
     Four travertine shophouse blocks under one kit name, so the souq and the
     boulevard get a street rather than a repeat; a brick boutique hotel and
     an art-deco cinema as one-offs, sited by hand below. */
  routePropSet('shophouse', ['shophouse', 'shopblk1', 'shopblk2', 'shopblk3'],
    12.0, { near: 120 });
  routeProp('shopstair', 'shopstair', 13.5, { near: 120 });
  routeProp('hotelcnr', 'hotelcnr', 16.5, { jitter: false, near: 200 });
  routeProp('cinema', 'cinema', 12.5, { jitter: false, near: 200 });

  /* ---- the downtown reference set, round 2 -----------------------------
     Generated from the eight reference renders of the plaza itself: the
     mashrabiya-screened retail block with the faceted gold canopy roof that
     closes the plaza in every aerial, the walk-in glass pavilion with the
     sedum roof, the twisted-bronze sculpture that stands beside the ring,
     and the curved timber pergola that roofs the sunken garden. */
  routeProp('mashblock', 'mashblock', 13.5, { jitter: false, near: 200 });
  routeProp('glasspav', 'glasspav', 4.6, { jitter: false, near: 160 });
  routeProp('artknot', 'artknot', 4.2, { jitter: false, near: 60 });
  routeProp('gardenperg', 'gardenperg', 3.4, { jitter: false, near: 120 });

  /* ---- the trees -------------------------------------------------------
     `tree` is the district's most-placed kit name after the palm, and until
     now it resolved to one scanned specimen — so every street tree in Downtown
     Al Khobar was the same tree. Three now, chosen per instance, plus a small
     potted one for terraces and shopfronts.

     All three came through `trellis-2` rather than the default reconstructor,
     for the reason recorded in gen_props.py: foliage is the one thing tripo
     cannot carve, and it returned mushroom caps on sticks. That asset is in
     the tree at `work/gen/_rejected_tree_pot.glb` and is deliberately not in
     the build. */
  /* NO scanned tree carries the streets any more. The client's screenshots
     showed every one of them — the card-reduced island tree AND the
     trellis-2 pair — reading as a bare shredded crown at night. The
     hand-built tree (46 overlapping clumps on a lumpy shell) is a solid
     silhouette from every distance, which at dusk is the whole job. The
     scans stay routed under their own names for daylight work. */
  routeProp('tree_scan', 'tree_big', 6.2, { near: 62 });
  routeProp('olive', 'tree_oliv', 3.4, { near: 999 });
  routeProp('potbush', 'tree_pot', 1.35, { near: 999 });

  /* ---- public art ------------------------------------------------------
     The district had none, which for a masterplan that is largely about public
     realm is a gap you only notice once it is named: every plaza in the four
     SDC renders has a piece standing in it and every plaza here had a fountain
     or nothing. One woven ring, sited by hand below on the axes that already
     want a terminus. */
  routeProp('artring', 'art_ring', 3.10, { jitter: false, near: 60 });

  /* ---- material panels -------------------------------------------------
     Samples rather than objects, and two of them fill real gaps: the district
     has no screens (every service yard and roof terrace is open to view) and
     no lawn at all (the ground is paving, sand or water and nothing else).
     The fluted concrete goes on plinths and blank returns, where the surface
     law's flat CONCRETE class was doing the least work of any class in it. */
  routePropSet('screen', ['pnl_slat', 'pnl_flute'], 1.80, { near: 30 });
  routePropSet('lawn', ['pnl_lawn', 'pnl_turf'], 0.10, { near: 40, shadow: false });
  routeProp('slabstep', 'pnl_slab', 0.09, { near: 20, shadow: false });

  /* ---- street infrastructure -------------------------------------------
     The layer that was still hand-built boxes after the buildings stopped
     being. These three take over kit names the planting pass already places
     by the hundred, so every lamppost, bollard and gully in the district is
     replaced without touching one call site. */
  routeProp('streetlight', 'lamppost', 5.00, { near: 40 });
  routeProp('bollard', 'bollard2', 0.95, { near: 26 });
  routeProp('drain', 'grate', 0.09, { near: 12, shadow: false });   // 532 of them, flush with the paving: almost all of these belong at the far level
  routeProp('tsignal', 'tsignal', 4.30, { near: 60 });
  routeProp('psignal', 'psignal', 3.10, { near: 50 });

  /* the furnished interior, split into its pieces. Anything over 2.4 m is
     part of the room rather than something standing in it. */
  FURNITURE = routeSceneParts('ghscene', 'fn', { maxH: 2.4 });

  /* ---- the scanned people ---------------------------------------------
     Ten standing figures and five seated ones, each split out of its scene
     and given its own kit name. They are static, so they take the standing
     and seated roles; the procedural figures keep the walkers, which is the
     division the walk cycle was built for. */
  STANDERS = routePersonParts('people10', 'gp', 1.72);
  SITTERS = routePersonParts('people5s', 'gs', 1.28);
  /* and the same ten again, tagged limb by limb so the walk cycle drives
     them. The procedural walkers stay: a crowd of ten repeated scans reads as
     a photocopy, and the two mixed read as a crowd. See tagWalker(). */
  WALKSCANS = routeWalkerParts('people10', 'gw', 1.72);

  /* ---- the palm --------------------------------------------------------
     This asset was rejected in an earlier round on the strength of a
     screenshot — and the screenshot was of what the broken intake had done to
     it, not of the model. Through the corrected pipeline it is a full date
     palm with a scarred trunk and a real crown, and it is better than the
     procedural one built to replace it. Worth recording as a method note:
     never judge an asset on the output of a pipeline you have not verified.

     It goes down 450 times, so the near level is 37 k rather than the 194 k
     the source can carry, and the radius is tight. The procedural palm stays
     registered underneath and takes over if the asset ever fails to load. */
  if (!routeProp('palm', 'palm2', 9.5, { near: 26 }) && PALM_PROC) {
    MODEL_ROUTE.palm = PALM_PROC;
  }
  /* ---- the final batch --------------------------------------------------
     Routed here beside the rest so every scanned asset in the district goes
     through one door. Heights are real metres measured off the contact sheet;
     Meshy normalises everything into the same two-metre box, so the number in
     `routeProp` is the only thing that says what the object actually is. */
  routeProp('windtower', 'windtower', 11.5, { jitter: false, near: 90 });
  routeProp('heritage', 'heritage', 9.6, { jitter: false, near: 70 });
  routeProp('shuttle', 'shuttle', 2.85, { jitter: false, near: 70 });
  routeProp('stall', 'stall', 3.10, { near: 40 });
  routeProp('planterset', 'planters', 1.35, { foliage: true, near: 32 });
  routeProp('pvplanter', 'pvplanter', 2.45, { near: 34 });
  routeProp('deckbench', 'deckbench', 0.95, { near: 34 });
  /* the palm with its own pit: 9.5 m to match the bare palm exactly, so the
     two read as one avenue where a paved row meets a planted one */
  routeProp('palmpit', 'palmbase', 9.5, { foliage: true, near: 30 });

  // palm2 and bench2 are generated but not routed: see DELTA.md
}

/* ================================== CONTENT: PLANTING, DRESSING, LIFE ==== */

/* Nothing is bare. Every street gets its trees, lights, bollards, bins and
   gullies; every frontage gets planters, benches and café spill; every
   junction gets a crossing. Placement is seeded and jittered, never gridded. */

function nearBuilding(x, z, pad) {
  const key = Math.floor(x / CCELL) + ',' + Math.floor(z / CCELL);
  for (let di = -1; di <= 1; di++) for (let dj = -1; dj <= 1; dj++) {
    const arr = CGRID.get((Math.floor(x / CCELL) + di) + ',' + (Math.floor(z / CCELL) + dj));
    if (!arr) continue;
    for (const c of arr) {
      const dx = Math.abs(x - c.x), dz = Math.abs(z - c.z);
      if (dx < c.hw + pad && dz < c.hd + pad) return true;
    }
  }
  return false;
}

function buildPlanting() {
  CURCHUNK = 'planting';
  // ---- boulevards get double rows of date palms, the local streets get
  //      shade trees, and the spacing breathes rather than ticks
  for (const r of ROADS) {
    if (r[5] !== 0) continue;
    const dx = r[2] - r[0], dz = r[3] - r[1];
    const len = Math.hypot(dx, dz);
    const ux = dx / len, uz = dz / len;
    const nx = uz, nz = -ux;
    const big = r[4] >= 19;
    /* A tree every 11.5-15.5 m is a car park. Every street in the reference
       set is planted close enough that the canopies touch, and the shade
       pattern on the ground is most of what makes those images read as a
       real place rather than a model. Halving the district paid for this. */
    const step = big ? 7.2 : 9.0;
    const n = Math.floor(len / step);
    for (let i = 0; i < n; i++) {
      const t = (i + 0.5) / n * len + rr(-1.7, 1.7);
      for (const s of [-1, 1]) {
        const off = r[4] / 2 + (big ? 4.6 : 4.2);
        const px = r[0] + ux * t + nx * off * s, pz = r[1] + uz * t + nz * off * s;
        if (nearBuilding(px, pz, 1.6)) continue;
        const gy = dressY(px, pz);
        if (big) {
          inst('palm', xf3(px, gy, pz, 0, rnd() * 6.28, 0, 0.9 + rnd() * 0.35, 0.85 + rnd() * 0.45, 0.9 + rnd() * 0.35),
            pick([0xffffff, 0xf2e8d8, 0xe8dcc4]));
          inst('shrub', xf3(px, gy, pz, 0, rnd() * 6.28, 0, 1.7, 1.1, 1.7), pick([K.leaf, K.leafDk]));
        } else if (chance(0.88)) {
          inst('tree', xf3(px, gy, pz, 0, rnd() * 6.28, 0, 0.85 + rnd() * 0.5, 0.8 + rnd() * 0.5, 0.85 + rnd() * 0.5),
            pick([0xffffff, 0xe6f0d8, 0xd8e4c8, 0xf0e8d4]));
          // understory. A street tree standing alone in paving is a diagram;
          // the reference streets all have something green at ankle height.
          if (chance(0.55)) inst('shrub', xf3(px + nx * s * 1.3, gy, pz + nz * s * 1.3, 0, rnd() * 6.28, 0, 1.25, 0.85, 1.25), pick([K.leaf, K.leafDk, K.leafLt]));
          /* A ring bench round some of them. Both tree-seat assets were
             generated and routed and never placed, and a seat built around a
             tree is the piece of street furniture people actually use. */
          else if ((MODEL_ROUTE.treeseat || MODEL_ROUTE.treeseat2) && chance(0.20)) {
            inst(MODEL_ROUTE.treeseat2 && chance(0.5) ? 'treeseat2' : 'treeseat',
              xf(px, gy, pz, rnd() * 6.28), pick([0xd6c6a8, 0xcbbb9c, 0xc2b08e]));
          }
        }
        // street lights on a slower, offset rhythm
        if (i % 2 === 0 && chance(0.8)) {
          const lx = px + ux * step * 0.5, lz = pz + uz * step * 0.5;
          if (!nearBuilding(lx, lz, 1.2)) {
            const lgy = dressY(lx, lz);
            inst('streetlight', xf(lx, lgy, lz, Math.atan2(-nx * s, -nz * s)), 0xffffff);
            PRACTICALS.push({ x: lx, y: lgy + 4.2, z: lz, c: 0xffe0b0, i: 6.5, r: 18 });
            inst('pool', xf3(lx, lgy + 0.14, lz, 0, 0, 0, 13, 1, 13), 0xffdcaa);
          }
        }
        if (chance(0.18)) inst('bin', xf(px + nx * s * 1.5, gy, pz + nz * s * 1.5, rnd() * 6.28), 0xffffff);
        if (chance(0.05)) inst('evpoint', xf(px + nx * s * 2.6, gy, pz + nz * s * 2.6, Math.atan2(-nx * s, -nz * s)));
        if (chance(0.07)) inst('bike', xf(px - nx * s * 1.1, gy, pz - nz * s * 1.1 + rr(-2, 2), rnd() * 6.28));
      }
    }
    /* Festoon strung across the street, pole to pole. This existed only over
       the souq spine, and it is the one thing present in every reference
       render at dusk: a warm dotted line overhead is what turns a road into
       somewhere people sit outside. Narrow streets only — a 21 m boulevard
       is too wide to span and the catenary would read as a washing line. */
    if (MODEL_ROUTE.bunting && !big) {
      for (let t = 24; t < len - 24; t += rr(13, 21)) {
        const bx = r[0] + ux * t, bz = r[1] + uz * t;
        if (nearBuilding(bx, bz, 0.8)) continue;
        inst('bunting', xf(bx, dressY(bx, bz) + 5.6 + rr(-0.25, 0.25), bz,
          Math.atan2(nx, nz), r[4] / 5.4, 1, 1));
      }
    }

    // pedestrian crossings where two roads meet
    for (const r2 of ROADS) {
      if (r2 === r || r2[5] !== 0) continue;
      const cross = segCross(r, r2);
      if (!cross) continue;
      for (const s of [-1, 1]) {
        const cxp = cross[0] + ux * (r2[4] / 2 + 4.2) * s, czp = cross[1] + uz * (r2[4] / 2 + 4.2) * s;
        if (MODEL_ROUTE.tsignal) {
          // one signal head on the near corner of each approach, and a
          // pedestrian signal beside the crossing it governs
          const sx2 = cxp + nx * (r[4] / 2 + 2.2), sz2 = czp + nz * (r[4] / 2 + 2.2);
          if (!nearBuilding(sx2, sz2, 1.0)) {
            inst('tsignal', xf(sx2, dressY(sx2, sz2), sz2, Math.atan2(-ux * s, -uz * s)));
            if (MODEL_ROUTE.psignal && chance(0.7)) {
              const px2 = cxp - nx * (r[4] / 2 + 2.0), pz2 = czp - nz * (r[4] / 2 + 2.0);
              inst('psignal', xf(px2, dressY(px2, pz2), pz2, Math.atan2(nx, nz)));
            }
          }
        }
        for (let k = 0; k < 6; k++) {
          const o = -r[4] / 2 + r[4] * (k + 0.5) / 6;
          stripe(ACC.ground, cxp + nx * o - ux * 0.6, czp + nz * o - uz * 0.6,
            cxp + nx * o + ux * 0.6, czp + nz * o + uz * 0.6, 0.55, 0.115, 0xd8cfb6, S.CONCRETE, 0.95);
        }
      }
    }
  }

  // ---- the souq spine: trees framing the view, planters, benches, tables
  const S1 = PLAN.souq, sp = PLAN.spineX;
  for (let z = S1.z0 - 16; z < S1.z1 + 24; z += rr(7.5, 11.5)) {
    for (const s of [-1, 1]) {
      const px = sp + s * rr(4.9, 5.9), pz = z + rr(-1.2, 1.2);
      const gy = dressY(px, pz);
      const r = rnd() * 0.82;      // the street is mostly trees and planting
      if (r < 0.30) {
        inst('tree', xf3(px, gy, pz, 0, rnd() * 6.28, 0, 1.30 + rnd() * 0.5, 1.35 + rnd() * 0.55, 1.30 + rnd() * 0.5),
          pick([0xffffff, 0xdfe8cf, 0xeae0cc]));
        /* a third of the street trees get a seat round the trunk instead of a
           planter kerb. It is the seat this district was most obviously
           missing: shade already exists at every one of these points and
           there was nothing under it to sit on. */
        if (chance(0.34)) {
          inst(chance(0.5) ? 'treeseat' : 'treeseat2',
            xf(px, gy, pz, rnd() * 6.28), pick([0xffffff, 0xf2ece0]));
        } else {
          inst('planter', xf3(px, gy, pz, 0, rnd() * 6.28, 0, 2.4, 1.0, 2.4), pick([0xcabb9d, 0xd6c6a8]));
        }
      } else if (r < 0.52) {
        inst('planter', xf3(px, gy, pz, 0, rnd() * 6.28, 0, 1.5 + rnd() * 0.8, 1, 1.4), pick([0xcabb9d, 0xc0b094]));
        inst('shrub', xf3(px, gy + 0.62, pz, 0, rnd() * 6.28, 0, 1.5, 1.3, 1.5), pick([K.leaf, K.leafLt, K.leafDk]));
      } else if (r < 0.68) {
        inst('bench', xf(px, gy, pz, s > 0 ? 0 : Math.PI), pick([0xd6c6a8, 0xcbbb9c]));
      } else if (r < 0.94) {
        // a café spill, pushed out into the street where the eye finds it
        const ox = px - s * rr(1.4, 2.6);
        inst('table', xf(ox, gy, pz, rnd() * 6.28), 0xe8e3d6);
        for (let c = 0; c < ri(2, 4); c++) {
          const ang = rnd() * 6.28;
          inst('chair', xf(ox + Math.sin(ang) * 0.95, gy, pz + Math.cos(ang) * 0.95, ang + Math.PI), 0xefeade);
        }
        if (chance(0.62)) inst('umbrella', xf(ox, gy, pz, rnd() * 6.28), pick([0xb9b3a4, 0xc6c0b0, 0xa9a394]));
        else inst('umbrella_furled', xf(ox, gy, pz, rnd() * 6.28), 0xe4ded0);
        if (chance(0.5)) {
          inst('pot', xf(px, gy, pz + rr(-2, 2), rnd() * 6.28, 1.2, 1.2, 1.2), 0xd8ccb2);
          inst('olive', xf3(px, gy + 0.6, pz, 0, rnd() * 6.28, 0, 0.9, 0.9, 0.9), pick([K.leaf, 0x6d7f52]));
        }
      } else {
        inst('pot', xf(px, gy, pz, rnd() * 6.28, 1.3, 1.3, 1.3), 0xd8ccb2);
        inst('olive', xf3(px, gy + 0.6, pz, 0, rnd() * 6.28, 0, 0.9, 0.9, 0.9), pick([K.leaf, 0x6d7f52]));
      }
      if (chance(0.35)) inst('bollard', xf(sp + s * 6.4, dressY(sp + s * 6.4, pz), pz + rr(-3, 3), 0), 0xffffff);
      // the shopkeeper's own frontage: crates, a rail of cloth, an A-board,
      // rolled mats — the layer that turns an elevation into a trade
      const wx = sp + s * 6.15, wz = pz + rr(-3.5, 3.5);
      const wy = dressY(wx, wz);
      const face = s > 0 ? -Math.PI / 2 : Math.PI / 2;
      const q = rnd();
      if (q < 0.16) inst('crate', xf3(wx - s * 0.9, wy, wz, 0, face + rr(-0.3, 0.3), 0, 1, 1, 1), pick([0x9a7444, 0x86643a, 0xa88254]));
      else if (q < 0.29) inst('goods', xf3(wx - s * 1.0, wy, wz, 0, face, 0, 1, 1, 1), pick([0xd8c0a0, 0xc8b090, 0xe0cdb0]));
      else if (q < 0.40) inst('aboard', xf3(wx - s * 1.3, wy, wz, 0, face + rr(-0.5, 0.5), 0, 1, 1, 1), pick([0x6b4526, 0x54361d]));
      else if (q < 0.50) inst('matroll', xf3(wx - s * 0.7, wy, wz, 0, face, 0, 1, 1, 1), 0xffffff);
    }
  }
  for (let z = S1.z0 - 10; z < S1.z1 + 18; z += rr(17, 24)) {
    const s = chance(0.5) ? 1 : -1;
    const px = sp + s * 6.0;
    const sgy = dressY(px, z);
    inst('streetlight', xf(px, sgy, z, s > 0 ? Math.PI / 2 : -Math.PI / 2), 0xffffff);
    PRACTICALS.push({ x: px, y: sgy + 4.2, z: z, c: 0xffdcaa, i: 5.0, r: 15 });
    inst('pool', xf3(px - s * 1.2, sgy + 0.16, z, 0, 0, 0, 12, 1, 12), 0xffdcaa);
  }

  for (let z = S1.z0 - 20; z < S1.z1 + 30; z += 1.0) {
    for (const sd of [-1, 1]) {
      const dx2 = sp + sd * 5.35;
      inst('drain', xf(dx2, dressY(dx2, z) + 0.002, z, 0), 0xbfae92);
    }
  }

  if (MODEL_ROUTE.bunting) {
    for (let z = S1.z0 - 6; z < S1.z1 + 12; z += rr(9, 14)) {
      inst('bunting', xf(sp, dressY(sp, z) + 5.0 + rr(-0.2, 0.2), z, Math.PI / 2, 2.5, 1, 1));
    }
  }

  /* Market stalls down the spine. `stall` is another asset that was generated,
     processed, routed and then never placed — and a souq whose centre line is
     empty paving is a shopping street, not a souq. They sit alternating sides
     of the drainage channel, clear of it and of the walking line. */
  if (MODEL_ROUTE.stall) {
    let sside = 1;
    for (let z = S1.z0 + 14; z < S1.z1 - 10; z += rr(11, 19)) {
      const stx = sp + sside * rr(2.9, 3.9);
      if (!nearBuilding(stx, z, 1.4)) {
        inst('stall', xf3(stx, dressY(stx, z), z, 0, sside > 0 ? -Math.PI / 2 : Math.PI / 2, 0,
          0.95 + rnd() * 0.25, 0.95 + rnd() * 0.2, 0.95 + rnd() * 0.25),
          pick([0xf2e6d2, 0xe4d3b6, 0xd8c4a2, 0xefe0c8]));
      }
      sside = -sside;
    }
  }

  // the canvas ribbons stretched across the spine
  for (let z = S1.z0 + 22; z < S1.z1 - 14; z += rr(48, 78)) {
    const w = 15.0;
    const rgy = dressY(sp, z);
    for (let k = 0; k < 4; k++) {
      inst('ribbon', xf3(sp + rr(-0.6, 0.6), rgy + 8.1 + k * 0.42 + rr(-0.15, 0.15), z + k * 2.1, 0, 0, 0, w, 1.35, 3.0),
        pick([0xfbf7ee, 0xf2ece0, 0xfefcf6]));
    }
  }

  // ---- the plaza under the canopy: seating clusters, planters, palms
  const CP = PLAN.canopy;
  for (let i = 0; i < 26; i++) {
    const px = rr(CP.x0 + 6, CP.x1 - 6), pz = rr(CP.z0 + 6, CP.z1 - 6);
    if (Math.abs(px - PLAN.water.x) < 6) continue;
    const gy = dressY(px, pz);
    const r = rnd();
    if (r < 0.34) {
      inst('bench', xf(px, gy, pz, rnd() * 6.28), pick([0xd6c6a8, 0xcbbb9c]));
    } else if (r < 0.62) {
      inst('planter', xf3(px, gy, pz, 0, rnd() * 6.28, 0, 2.4 + rnd(), 1.05, 2.4 + rnd()), 0xcabb9d);
      inst('shrub', xf3(px, gy + 0.64, pz, 0, rnd() * 6.28, 0, 2.1, 1.4, 2.1), pick([K.leaf, K.leafLt]));
    } else if (r < 0.84) {
      inst('table', xf(px, gy, pz, rnd() * 6.28), 0xe8e3d6);
      for (let c = 0; c < 3; c++) {
        const ang = rnd() * 6.28;
        inst('chair', xf(px + Math.sin(ang) * 1.0, gy, pz + Math.cos(ang) * 1.0, ang + Math.PI), 0xefeade);
      }
      /* A parasol over most of them. The asset was generated, processed and
         routed, and then never placed by anything — and a cafe table in the
         open sun in Al Khobar is the one piece of furniture nobody sits at. */
      if (MODEL_ROUTE.parasol && chance(0.72)) {
        inst('parasol', xf3(px, gy, pz, 0, rnd() * 6.28, 0, 1, 1, 1),
          pick([0xf4ede0, 0xe8dcc8, 0xd9c9ae, 0xf0e4d2]));
      }
    } else {
      inst('palm', xf3(px, gy, pz, 0, rnd() * 6.28, 0, 1, 1.15 + rnd() * 0.3, 1), 0xffffff);
    }
  }

  // ---- the residential streets get their palms too
  for (const Z of [PLAN.resN, PLAN.resS, PLAN.resW]) {
    for (let i = 0; i < 90; i++) {
      const px = rr(Z.x0, Z.x1), pz = rr(Z.z0, Z.z1);
      if (nearBuilding(px, pz, 2.6)) continue;
      const gy = dressY(px, pz);
      if (chance(0.45)) inst('palm', xf3(px, gy, pz, 0, rnd() * 6.28, 0, 0.85 + rnd() * 0.4, 0.8 + rnd() * 0.5, 0.85 + rnd() * 0.4), pick([0xffffff, 0xeee4d2]));
      else inst('tree', xf3(px, gy, pz, 0, rnd() * 6.28, 0, 0.8 + rnd() * 0.5, 0.75 + rnd() * 0.5, 0.8 + rnd() * 0.5), pick([0xffffff, 0xdfe8cf]));
    }
  }

  // ---- leaf litter and drift sand: the last 5% that stops paving reading new
  for (let i = 0; i < 420; i++) {
    const px = rr(PLAN.bounds.x0, PLAN.bounds.x1), pz = rr(PLAN.bounds.z0, PLAN.bounds.z1);
    if (nearBuilding(px, pz, 0.5)) continue;
    ACC.ground.add(G_PLANE, xf3(px, dressY(px, pz) + 0.05, pz, 0, rnd() * 6.28, 0, rr(0.5, 2.4), 1, rr(0.5, 2.4)),
      pick([0x8f7c56, 0x9c8a63, 0x7c6c4c, 0xa89571]), S.SAND, rr(0.55, 0.95));
  }
}

function segCross(r1, r2) {
  const x1 = r1[0], z1 = r1[1], x2 = r1[2], z2 = r1[3];
  const x3 = r2[0], z3 = r2[1], x4 = r2[2], z4 = r2[3];
  const d = (x2 - x1) * (z4 - z3) - (z2 - z1) * (x4 - x3);
  if (Math.abs(d) < 1e-6) return null;
  const t = ((x3 - x1) * (z4 - z3) - (z3 - z1) * (x4 - x3)) / d;
  const u = ((x3 - x1) * (z2 - z1) - (z3 - z1) * (x2 - x1)) / d;
  if (t < 0 || t > 1 || u < 0 || u > 1) return null;
  return [x1 + t * (x2 - x1), z1 + t * (z2 - z1)];
}

/* ------------------------------------------------------ IDENTITY SIGNAGE
   The destination's line, in Arabic and English, as illuminated plaza
   lettering — the same lockup as the map's title, built as geometry.     */
/* ================================================== GREEN AND COLOUR ==
   The district was one note of sand. Every reference for this place is stone
   *and* deep green *and* one strong flowering colour — bougainvillea over a
   wall, a hedge line holding a terrace, a lawn panel in a plaza. Without them
   an aerial of it reads as a model of a town rather than a town.

   All of it is instanced and all of it is placed against what is already
   there: hedges along kerb lines and terrace edges, lawns in the open panels
   of the plazas, bougainvillea on the walls it would actually climb.       */
function buildGreen() {
  CURCHUNK = 'green';
  const LAWN = [0x4a6b34, 0x53743a, 0x415f2d, 0x5b7c40];
  const bed = (x0, z0, x1, z1, y) => {
    const cx = (x0 + x1) / 2, cz = (z0 + z1) / 2;
    inst('lawn', xf(cx, (y === undefined ? dressY(cx, cz) : y) + 0.035, cz, 0,
      x1 - x0, 1, z1 - z0), pick(LAWN));
  };

  // ---- lawn panels and hedges in the big public rooms
  const CP = PLAN.canopy;
  for (let i = 0; i < 7; i++) {
    const bx = rr(CP.x0 + 14, CP.x1 - 30), bz = rr(CP.z0 + 12, CP.z1 - 26);
    const bw = rr(11, 24), bd = rr(9, 18);
    if (insideSolid(bx + bw / 2, bz + bd / 2, 0.6)) continue;
    bed(bx, bz, bx + bw, bz + bd);
    for (let e = 0; e < Math.round(bw); e += 1.0) {
      inst('hedge', xf(bx + e + 0.5, dressY(bx + e, bz), bz, 0, 1.0, 0.8, 1.0), 0xffffff);
      inst('hedge', xf(bx + e + 0.5, dressY(bx + e, bz + bd), bz + bd, 0, 1.0, 0.8, 1.0), 0xffffff);
    }
    for (let k = 0; k < 5; k++) {
      const px = rr(bx + 1, bx + bw - 1), pz = rr(bz + 1, bz + bd - 1);
      inst('shrub', xf3(px, dressY(px, pz), pz, 0, rnd() * 6.28, 0, 1, 1, 1), pick([K.leaf, K.leafDk]));
    }
  }
  // the colonnade court and the sail court get a planted apron
  for (const R of [PLAN.court, PLAN.tensile]) {
    for (let i = 0; i < 5; i++) {
      const bx = rr(R.x0 + 6, R.x1 - 22), bz = rr(R.z0 + 6, R.z1 - 18);
      if (insideSolid(bx + 8, bz + 6, 0.6)) continue;
      bed(bx, bz, bx + rr(12, 20), bz + rr(9, 15));
    }
  }

  /* ---- bougainvillea, on the walls it would actually climb: the outward
     face of every collider that fronts a public space, at a spacing that
     breathes. The colour picks are the three that grow here. */
  const BOUG = [0xc0327a, 0xd8447e, 0xa8286b, 0xe0668f, 0xd86a3c];
  let placed = 0;
  for (let i = 0; i < 4200 && placed < 460; i++) {
    const x = rr(PLAN.bounds.x0 * 0.72, PLAN.bounds.x1 * 0.72);
    const z = rr(PLAN.bounds.z0 * 0.72, PLAN.bounds.z1 * 0.82);
    const gy = groundAt(x, z);
    if (gy < -6 || insideSolid(x, z, gy + 0.4)) continue;
    if (!wallNear(x, z, gy, 2.6)) continue;
    const bx2 = x + Math.cos(_dw.ang) * (_dw.dist - 0.45);
    const bz2 = z + Math.sin(_dw.ang) * (_dw.dist - 0.45);
    if (insideSolid(bx2, bz2, gy + 0.4)) continue;
    const s = rr(0.85, 1.55);
    inst('bougain', xf3(bx2, dressY(bx2, bz2) + rr(0, 1.9), bz2, 0, rnd() * 6.28, 0, s, s * rr(0.7, 1.1), s),
      pick(BOUG));
    placed++;
    if (chance(0.5)) inst('hedge', xf(bx2, dressY(bx2, bz2), bz2, _dw.ang + Math.PI / 2, rr(1.4, 3.4), 1, 1), 0xffffff);
  }
  INSTCOUNT.bougain = placed;
}

function buildIdentity() {
  CURCHUNK = 'canopy';
  const cx = 4, cz = PLAN.canopy.z0 - 22, gy = dressY(cx, cz);
  // a low travertine plinth carrying the lettering
  ACC.arch.add(G_BOXT, xf(cx, gy + 0.16, cz, 0, 40, 1.25, 2.0), K.travert, S.TRAVERTINE, 1.05);
  ACC.arch.add(G_BOXT, xf(cx, gy + 1.41, cz, 0, 41, 0.16, 2.4), K.travDk, S.TRAVERTINE, 1.1);
  // "وسط مدينة الخبر" reduced to an illuminated calligraphic band, and the
  // English line beneath it as extruded characters
  wordmark(cx, gy + 1.75, cz - 0.2, 30, 1.5, 0xffd9a4, 7);
  wordmark(cx, gy + 0.55, cz - 1.05, 26, 0.55, 0xf0dcc0, 22);
  for (const s of [-1, 1]) inst('uplight', xf(cx + s * 12, gy + 0.2, cz - 1.6), 0xffc98a);
}

/* an abstracted illuminated line of type: strokes of varying width on a
   baseline, which at plaza scale reads as lettering without ever pretending
   to be a font */
function wordmark(x, y, z, w, h, colour, glyphs) {
  let cur = -w / 2;
  for (let g = 0; g < glyphs; g++) {
    const gw = w / glyphs * rr(0.55, 0.95);
    const parts = ri(1, 3);
    for (let p = 0; p < parts; p++) {
      const ph = h * rr(0.42, 1.0);
      const px = cur + gw * rr(0.1, 0.9);
      EMIS.add(G_BOXT, xf(x + px, y, z, 0, gw * rr(0.10, 0.24), ph, 0.14), colour, 0, 1);
      if (chance(0.5)) EMIS.add(G_BOXT, xf(x + px, y + ph * 0.5, z, 0, gw * rr(0.3, 0.7), h * 0.13, 0.14), colour, 0, 1);
    }
    // the connecting baseline stroke of Arabic script
    EMIS.add(G_BOXT, xf(x + cur + gw / 2, y, z, 0, gw * 1.02, h * 0.10, 0.14), colour, 0, 1);
    cur += gw;
  }
}

/* ================================================================= LIFE ==
   Eighty-plus figures on seeded paths, seated groups at every café and on
   the majlis, birds crossing, jets breathing, and wind through everything
   with a leaf on it.                                                     */
const PATHS = [];
function buildLife() {
  CURCHUNK = 'life';
  if (QA.nolife) return;
  const sp = PLAN.spineX, S1 = PLAN.souq, CP = PLAN.canopy;

  // walking routes: the spine, the plaza, the boulevards, the court
  PATHS.push([[sp - 3, S1.z0 - 30], [sp - 2, S1.z0 + 40], [sp - 4, S1.z0 + 120], [sp - 2, S1.z1 + 8]]);
  PATHS.push([[sp + 3, S1.z1 + 10], [sp + 4, S1.z0 + 100], [sp + 2, S1.z0 + 30], [sp + 3, S1.z0 - 34]]);
  PATHS.push([[CP.x0 + 10, CP.z0 + 12], [CP.x1 - 14, CP.z0 + 30], [CP.x1 - 20, CP.z1 - 16], [CP.x0 + 16, CP.z1 - 22]]);
  PATHS.push([[-300, 128], [-160, 122], [-20, 118], [140, 124], [300, 130]]);
  PATHS.push([[PLAN.court.x0 + 12, PLAN.court.z0 + 10], [PLAN.court.x1 - 14, PLAN.court.z0 + 16],
              [PLAN.court.x1 - 18, PLAN.court.z1 - 14], [PLAN.court.x0 + 14, PLAN.court.z1 - 18]]);
  PATHS.push([[PLAN.enter.x0 + 14, PLAN.enter.z0 + 16], [PLAN.enter.x1 - 20, PLAN.enter.z0 + 40],
              [PLAN.enter.x1 - 26, PLAN.enter.z1 - 20], [PLAN.enter.x0 + 20, PLAN.enter.z1 - 26]]);
  PATHS.push([[PLAN.tensile.x0 + 10, PLAN.tensile.z0 + 12], [PLAN.tensile.x1 - 12, PLAN.tensile.z0 + 40],
              [PLAN.tensile.x0 + 14, PLAN.tensile.z1 - 14]]);
  /* the downtown plaza gets its own routes — the references put more people
     on this square than anywhere else in the set, and one perimeter path
     through the whole quarter cannot carry that. A circuit, the cinema-to-
     rotunda desire line, and a loop past the garden and the pavilion. */
  { const D = PLAN.dtplaza, dmx = (D.x0 + D.x1) / 2, dmz = (D.z0 + D.z1) / 2;
    PATHS.push([[D.x0 + 16, D.z0 + 18], [D.x1 - 18, D.z0 + 22], [D.x1 - 16, D.z1 - 20],
                [D.x0 + 20, D.z1 - 18], [D.x0 + 16, D.z0 + 18]]);
    PATHS.push([[D.x0 + 8, dmz - 6], [dmx - 10, dmz + 4], [dmx + 22, dmz + 8], [D.x1 - 6, dmz + 10]]);
    PATHS.push([[dmx + 8, D.z0 + 14], [dmx + 30, dmz + 16], [dmx - 2, D.z1 - 14],
                [dmx - 36, dmz + 10], [dmx + 8, D.z0 + 14]]);
  }

  const N = 150;
  /* The crowd is now mixed source: the ten tagged scans take a bit over half
     of it and the procedural figures take the rest.

     Not all of it, and the reason is arithmetic rather than taste — there are
     ten distinct scans for a hundred and eight people, so an all-scan crowd is
     every face eleven times, which reads as a photocopy from the far end of
     the souq. The procedural figures are individually weaker and collectively
     the thing that stops the repeat being legible, so both stay. Two thirds
     scans is where the two failures cross: below it the crowd reads blocky,
     above it the repeat starts to show. */
  const SCANS = WALKSCANS.slice();
  const PROC = ['walk_thobe', 'walk_abaya', 'walk_west', 'walk_west2', 'walk_child'];
  const KINDS = [];
  for (let i = 0; i < N; i++) {
    const path = PATHS[i % PATHS.length];
    const kind = rnd();
    /* a downtown in Al Khobar is mixed dress, not a uniform. Roughly a third
       thobe, a third abaya, a quarter western, the rest children. */
    const proc = kind < 0.32 ? 'walk_thobe' : kind < 0.63 ? 'walk_abaya'
      : kind < 0.79 ? 'walk_west' : kind < 0.92 ? 'walk_west2' : 'walk_child';
    // children have no scanned counterpart, so they stay procedural
    const which = (SCANS.length && proc !== 'walk_child' && rnd() < 0.66)
      ? SCANS[(rnd() * SCANS.length) | 0] : proc;
    if (KINDS.indexOf(which) < 0) KINDS.push(which);
    WALKERS.push({
      path, t: rnd(), speed: rr(0.55, 1.35) / 100,
      kind: which,
      lane: rr(-2.4, 2.4), ph: rnd() * 100,
      scale: which === 'walk_child' ? rr(0.90, 1.05) : rr(0.94, 1.08),
      /* a scan carries its own photographed colour; tinting it the way the
         flat-shaded procedural figures are tinted would repaint the cloth */
      col: SCANS.indexOf(which) >= 0 ? pick([0xffffff, 0xf7f4ee, 0xefeee8])
        : which === 'walk_thobe' ? pick([0xffffff, 0xf6f2ea, 0xece6da])
          : which === 'walk_abaya' ? pick([0xffffff, 0xe2dce6, 0xd0cad8])
            : pick([0xffffff, 0xe8e2d4, 0xd6dce4, 0xdcd2c2]),
    });
  }
  /* ---- the rigged walkers ---------------------------------------------
     A share of the crowd is replaced by the skinned figures. They are NOT
     instanced — a SkinnedMesh cannot be — so each is its own object with its
     own skeleton, which is why there are forty of them and not a hundred and
     eight. Forty draw calls against a district that already issues several
     hundred is nothing, and forty figures that bend their knees are worth
     more than a hundred that do not.

     They take the FOREGROUND share: every one is dropped on a path segment
     inside the walkable core, because a skinned figure is only worth its
     draw call where you can see it flex. The instanced crowd keeps the
     distance. */
  {
    const nRig = Math.min(40, RIGGED.length ? 40 : 0);
    for (let i = 0; i < nRig; i++) {
      const r = RIGGED[i % RIGGED.length];
      const obj = cloneSkinned(r.obj);
      let mesh = null;
      obj.traverse((o) => { if (o.isSkinnedMesh && !mesh) mesh = o; });
      if (!mesh) continue;
      /* the rest pose, kept per instance: every frame's angles are applied to
         it rather than accumulated onto the last frame, which is the
         difference between a walk and a figure slowly winding itself up */
      const rest = mesh.skeleton.bones.map((b) => b.quaternion.clone());
      obj.matrixAutoUpdate = true;
      cityRoot.add(obj);
      RIG_INSTANCES.push({
        obj, mesh, rest, limbs: r.limbs,
        path: PATHS[i % PATHS.length], t: rnd(), speed: rr(0.55, 1.30) / 100,
        lane: rr(-2.2, 2.2), ph: rnd() * 6.2831853,
        stride: rr(0.85, 1.15),
        scale: rr(0.96, 1.05),
      });
    }
    INSTCOUNT.__rigged = RIG_INSTANCES.length;
  }

  // the instanced meshes the walkers drive
  WALK_KINDS = PROC.concat(SCANS);
  for (const k of WALK_KINDS) {
    for (const w of WALKERS) if (w.kind === k) inst(k, xf(0, -999, 0), w.col);
    if (INST_DEF[k]) { INST_DEF[k].cull = false; INST_DEF[k].shadow = true; }
  }

  // seated groups: at every café table already placed, plus the majlis
  const seatSpots = [];
  for (let i = 0; i < 48; i++) {
    const p = pick(PATHS);
    const seg = ri(0, p.length - 2);
    const t = rnd();
    seatSpots.push([mix(p[seg][0], p[seg + 1][0], t) + rr(-4, 4), mix(p[seg][1], p[seg + 1][1], t) + rr(-4, 4)]);
  }
  for (const s of seatSpots) {
    if (nearBuilding(s[0], s[1], 1.0)) continue;
    const gy = groundAt(s[0], s[1]);
    inst(chance(0.5) ? 'sit_thobe' : 'sit_abaya', xf(s[0], gy, s[1], rnd() * 6.28), pick([0xffffff, 0xf0ece2, 0xdcd6e0]));
  }
  // the family on the majlis, exactly as khobar1 stages them
  const MX = PLAN.majlis.x + 1.5, MZ = PLAN.majlis.z - 3.5;
  const mtop = terrainY(PLAN.majlis.x, PLAN.majlis.z) + 3 * 4.2 + 0.18;
  inst('sit_abaya', xf(MX - 0.6, mtop, MZ + 2.2, 0.1), 0xffffff);
  inst('sit_thobe', xf(MX + 3.4, mtop, MZ + 1.0, -1.3), 0xffffff);
  inst('child', xf3(MX - 2.1, mtop, MZ + 1.5, 0, 0.4, 0, 1.04, 1.04, 1.04), 0xffd8c0);
  inst('child', xf3(MX + 2.0, mtop, MZ - 1.4, 0, 2.6, 0, 0.98, 0.98, 0.98), 0xd8e0f0);
  inst('thobe', xf3(MX - 5.0, mtop, MZ - 0.6, 0, 1.9, 0, 1, 1, 1), 0xf6f2e8);

  /* ================================================== TRAFFIC AND SEATING ==
     Two things the district did not have, and the first one is a category
     error rather than a detail: every road in it was EMPTY. A boulevard with
     no cars on it does not read as a quiet evening, it reads as a render —
     the same way an empty pavement does, which is why the crowd was built
     first. Nine kilometres of carriageway here and nothing on any of it.

     Parked, not moving. A moving car needs a path, a speed, a heading and a
     stopping rule at every junction, and none of that survives being seen
     from a first-floor window at a bookmark; a parked one is right from every
     angle and is what a downtown kerb actually looks like at 19:00. */
  {
    let cars = 0;
    for (const r of ROADS) {
      if (r[5] !== 0) continue;                       // vehicular roads only
      const horiz = Math.abs(r[2] - r[0]) > Math.abs(r[3] - r[1]);
      const len = horiz ? r[2] - r[0] : r[3] - r[1];
      const lane = r[4] / 2 - 1.9;                    // parked against the kerb
      /* 12 m spacing rather than 18, and fuller. A downtown kerb in the
         reference aerials is close to continuous, and at one car every
         eighteen metres on half the bays the boulevards read as a Sunday
         morning rather than as the busiest street in Al Khobar. */
      const n = Math.floor(Math.abs(len) / 12);
      for (let i = 0; i < n; i++) {
        for (const side of [-1, 1]) {
          if (!chance(0.68)) continue;                // a kerb is never full
          const t = (i + 0.5) / n;
          const px = horiz ? mix(r[0], r[2], t) : r[0] + side * lane;
          const pz = horiz ? r[1] + side * lane : mix(r[1], r[3], t);
          if (nearBuilding(px, pz, 1.4)) continue;
          if (WATERBODIES.some((b) => px > b.x0 - 3 && px < b.x1 + 3
            && pz > b.z0 - 3 && pz < b.z1 + 3)) continue;
          const gy = groundAt(px, pz);
          if (gy < -50) continue;
          /* facing along the kerb, and half of them the other way — a row of
             cars all pointing the same way is a car park, not a street */
          const yaw = (horiz ? Math.PI / 2 : 0) + (chance(0.5) ? Math.PI : 0);
          inst('car', xf(px, gy, pz, yaw + rr(-0.03, 0.03)),
            pick([0xffffff, 0xf4f2ee, 0xe8e8ea, 0xd8dade, 0xf0eeea,
                  0x2c2e30, 0x3a3c40, 0xc9ccd2, 0x1a1c20]));
          cars++;
        }
      }
      /* Traffic in the running lanes on the wide roads. Every reference aerial
         has the boulevards carrying cars, and ours had vehicles only against
         the kerb — a downtown with full parking bays and empty carriageways.
         These sit in-lane on the correct side for the direction they face. */
      if (r[4] >= 18) {
        const m = Math.floor(Math.abs(len) / 26);
        for (let i = 0; i < m; i++) {
          for (const side of [-1, 1]) {
            if (!chance(0.44)) continue;
            const t = (i + 0.5) / m + rr(-0.012, 0.012);
            const off = side * (r[4] / 2 - 5.6);
            const px = horiz ? mix(r[0], r[2], t) : r[0] + off;
            const pz = horiz ? r[1] + off : mix(r[1], r[3], t);
            if (nearBuilding(px, pz, 1.2)) continue;
            const gy = groundAt(px, pz);
            if (gy < -50) continue;
            // facing with the flow of its own side, not at random
            const yaw = (horiz ? Math.PI / 2 : 0) + (side > 0 ? Math.PI : 0);
            inst('car', xf(px, gy, pz, yaw + rr(-0.02, 0.02)),
              pick([0xffffff, 0xf2f0ec, 0x2c2e30, 0x3a3c40, 0xc9ccd2,
                    0x8e1f22, 0x1a1c20, 0xd8dade]));
            cars++;
          }
        }
      }
    }
    INSTCOUNT.__cars = cars;
  }

  /* ---- the seating the plazas were short of ---------------------------
     The bench is a linear object and every public space here wanted a
     centre: something to sit round rather than along. Three kinds, each
     placed where its own shape belongs — the conversation bowl in the open,
     the decks under the canopy where they can be walked over as well as sat
     on. */
  {
    const P = PLAN.plaza;
    for (const spot of [
      [P.x0 + 34, P.z0 + 30], [P.x1 - 34, P.z0 + 30],
      [P.x0 + 34, P.z1 - 30], [P.x1 - 34, P.z1 - 30],
      [PLAN.tensile.x0 + 46, PLAN.tensile.z1 - 40],
      [PLAN.enter.x0 + 40, PLAN.enter.z1 - 34],
    ]) {
      if (nearBuilding(spot[0], spot[1], 6)) continue;
      inst('seatbowl', xf(spot[0], groundAt(spot[0], spot[1]), spot[1], rnd() * 6.28),
        pick([0xffffff, 0xf4f0e8]));
    }
    for (const spot of [
      [P.x0 + 70, (P.z0 + P.z1) / 2 - 18], [P.x1 - 70, (P.z0 + P.z1) / 2 + 18],
      [PLAN.tensile.x1 - 44, PLAN.tensile.z0 + 44],
    ]) {
      if (nearBuilding(spot[0], spot[1], 8)) continue;
      inst(chance(0.5) ? 'deckisle' : 'deckwave',
        xf(spot[0], groundAt(spot[0], spot[1]) + 0.02, spot[1], rnd() * 6.28),
        pick([0xffffff, 0xf6f2ea]));
    }
  }

  /* ---- public art -------------------------------------------------------
     On the axes that already want a terminus: the head of the souq spine, and
     the two long sight lines across the canopy plaza. A piece of public art is
     a full stop at the end of a view, which is the job the plan had left to a
     blank wall. */
  {
    const P = PLAN.plaza;
    for (const spot of [
      [PLAN.spineX, PLAN.souq.z1 + 22],
      [(P.x0 + P.x1) / 2 - 96, (P.z0 + P.z1) / 2],
      [(P.x0 + P.x1) / 2 + 96, (P.z0 + P.z1) / 2],
      [PLAN.tensile.x0 + 62, PLAN.tensile.z0 + 62],
    ]) {
      if (nearBuilding(spot[0], spot[1], 5)) continue;
      const gy = groundAt(spot[0], spot[1]);
      if (gy < -50) continue;
      inst('artring', xf(spot[0], gy, spot[1], rnd() * 6.28), 0xffffff);
    }
  }

  /* ---- the two one-off buildings --------------------------------------
     A downtown needs somewhere to stay and somewhere to go in the evening,
     and the plan had neither. Both are corner pieces, so both go on corners
     the grid already makes: the hotel on the boulevard side of the entry
     court, the cinema on the entertainment edge street where the plan's own
     zoning already put leisure. */
  downtownPlaza();
  {
    const sx = PLAN.enter.x0 + 36, sz = PLAN.enter.z1 - 60;
    inst('shopstair', xf(sx, groundAt(sx, sz), sz, 0), 0xffffff);
  }

  // birds
  for (let i = 0; i < 26; i++) {
    BIRDS.push({ r: rr(60, 210), h: rr(28, 78), ph: rnd() * 6.28, sp: rr(0.05, 0.13), cx: rr(-120, 180), cz: rr(40, 320), fl: rnd() * 6.28 });
    inst('bird', xf(0, -999, 0), 0x2b2a30);
  }
  // fountain jets
  for (let i = 0; i < JETS.length; i++) inst('jet', xf(0, -999, 0), 0xcfe8ff);
  if (INST_DEF.jet) INST_DEF.jet.cull = false;
  if (INST_DEF.bird) INST_DEF.bird.cull = false;
}

/* ===================================================== THE DOWNTOWN PLAZA ==
   The one composed view in the district, and the only place where what goes
   where is decided rather than sampled.

   The cinema and the corner hotel were the two best assets in the build and
   they stood 129 m apart on separate streets, each swallowed by whatever the
   scan fabric dropped around it. In every reference render they face each
   other across open paving: cinema on one side, brick hotel on the other, a
   colonnaded stone block closing the north, a glass pavilion on the south,
   and public art in the middle with tree rings and cafe spill around it.

   Yaw convention, confirmed against navigation: 0 faces +Z, so PI/2 faces
   +X (east) and -PI/2 faces -X (west).                                     */
function downtownPlaza() {
  CURCHUNK = 'dtplaza';
  const D = PLAN.dtplaza;
  const mx = (D.x0 + D.x1) / 2, mz = (D.z0 + D.z1) / 2;
  const gy = terrainY(mx, mz);
  const a = ACC.ground;

  // ---- the paved field, and a walkable level over the whole of it
  /* the slab is base-at-origin and 0.14 thick, so its top is gy + 0.20 — the
     walkable level has to be the top of it, not a number near the middle, or
     you walk shin-deep through your own paving */
  /* TRAVERTINE, not PAVING: the paving class draws Worley crazy-flags, and
     at plaza scale that read as a beach. The references' floor is a coursed
     rectangular stone grid, which is exactly what the travertine class is. */
  a.add(G_BOXT, xf(mx, gy + 0.06, mz, 0, D.x1 - D.x0, 0.14, D.z1 - D.z0),
    0xcfc4ad, S.TRAVERTINE, 1.0);
  platform(D.x0, D.z0, D.x1, D.z1, gy + 0.20);
  /* the references draw the plaza in a large square grid with darker inset
     bands, not uniform flags: a 12 m module of 0.34 m granite strips laid
     just proud of the field, so the joint relief carries at eye level and
     the grid carries from the air */
  for (let gxx = D.x0 + 12; gxx < D.x1 - 2; gxx += 12) {
    a.add(G_BOXT, xf(gxx, gy + 0.205, mz, 0, 0.34, 0.012, D.z1 - D.z0 - 4), 0x8d8272, S.PAVING, 0.78);
  }
  for (let gzz = D.z0 + 12; gzz < D.z1 - 2; gzz += 12) {
    a.add(G_BOXT, xf(mx, gy + 0.205, gzz, 0, D.x1 - D.x0 - 4, 0.012, 0.34), 0x8d8272, S.PAVING, 0.78);
  }

  // ---- the four buildings that make the room
  /* Placed with their solidity, not just their geometry. An `inst` on its own
     is scenery you walk through: these need a collider so the square is a
     room you are actually inside, an occluder so the fabric behind them is
     not drawn through them, and a scan site so nothing else claims the
     ground they stand on. */
  const put = (kit, x, z, ry, hw, hd, h) => {
    if (!MODEL_ROUTE[kit]) return;
    const y = groundAt(x, z);
    inst(kit, xf(x, y, z, ry), 0xffffff);
    // footprint half-extents swap when the piece is turned a quarter turn
    const turned = Math.abs(Math.sin(ry)) > 0.5;
    const ex = turned ? hd : hw, ez = turned ? hw : hd;
    collider(x, z, ex - 0.4, ez - 0.4, 0, y + h);
    occluder(x, z, ex, ez, y + h);
    platform(x - ex, z - ez, x + ex, z + ez, y + 0.16);
    SCANSITES.push({ x0: x - ex - 2, x1: x + ex + 2, z0: z - ez - 2, z1: z + ez + 2 });
  };
  /* The cinema holds the north-west corner, as the aerials draw it — and
     measured, its old berth at mz-4 ran 12 by 20 metres INTO the majlis
     block (cinema z 209..251 against majlis z 231..261). The majlis is the
     khobar1 bookmark and does not move; the cinema does. */
  put('cinema', D.x0 - 12, mz - 42, Math.PI / 2, 21.0, 13.0, 12.5);  // north-west, facing east in
  /* the cinema is charcoal deco massing — unlit it reads as a black box
     from the square and from the air, which is exactly what the client's
     aerial showed. The references floodlight it: warm uplights along the
     plaza face and the south flank, and a practical over the marquee. */
  {
    const cy = groundAt(D.x0 - 12, mz - 42);
    for (let i = 0; i < 5; i++) {
      const ux = D.x0 + 2.2, uz = mz - 42 - 16 + i * 8;
      inst('uplight', xf(ux, groundAt(ux, uz) + 0.04, uz), 0xffc98a);
    }
    for (const sx of [-14, 0, 14]) {
      const ux = D.x0 - 12 + sx, uz = mz - 42 + 15.2;
      inst('uplight', xf(ux, groundAt(ux, uz) + 0.04, uz), 0xffc98a);
    }
    PRACTICALS.push({ x: D.x0 - 0.5, y: cy + 6.5, z: mz - 42, c: 0xffd9a4, i: 6.0, r: 22 });
  }
  put('hotelcnr', D.x1 + 14, mz + 6, -Math.PI / 2, 11.5, 11.5, 16.5); // east, facing west in
  /* The north side is the reference set's signature wall: the mashrabiya
     block under its faceted gold canopy at the centre, with the arcaded
     colonnade block beside it. The shophouse row that used to stand here
     belongs to the souq's language, not this square's, and the arcade block
     moved up from the south — the south edge is now low (the sunken garden,
     the glass pavilion, and the street behind them), as drawn. */
  put('mashblock', mx + 22, D.z0 - 20, Math.PI, 12.5, 8.5, 13.5);     // north-centre, facing south in
  put('arcadeblk', mx - 38, D.z0 - 18, Math.PI, 14.3, 8.0, 11.0);     // north-west, facing south in

  // ---- public art on the centre line, which is what the eye lands on
  if (MODEL_ROUTE.artring) inst('artring', xf(mx + 8, gy + 0.13, mz - 6, 0.7), 0xffffff);
  if (MODEL_ROUTE.obelisk) inst('obelisk', xf(mx - 26, gy + 0.13, mz + 10, 0), 0xffffff);

  /* ---- tree rings. Three of them, on the diagonal rather than in a row:
     a bench built round a tree is the piece of furniture every one of the
     reference plazas puts in exactly this position. */
  for (const p of [[mx - 34, mz - 26], [mx + 26, mz + 26], [mx + 22, mz - 22],
                   [mx + 44, mz - 2], [mx - 44, mz - 8], [mx + 6, mz - 34],
                   [mx - 22, mz + 2]]) {
    const py = groundAt(p[0], p[1]);
    inst('tree', xf3(p[0], py, p[1], 0, rnd() * 6.28, 0, 1.25, 1.3, 1.25),
      pick([0xffffff, 0xe6f0d8, 0xdfe8cf]));
    if (MODEL_ROUTE.treeseat) inst('treeseat', xf(p[0], py, p[1], rnd() * 6.28), pick([0xd6c6a8, 0xcbbb9c]));
  }

  /* ---- the signage totems. Two or three stand in every reference square,
     and they are what gives the paving a foreground object at eye height
     between the buildings and the crowd. */
  for (const p of [[mx - 26, mz + 12, 0.4], [mx + 34, mz - 18, 2.4], [mx - 40, mz - 12, 1.3]]) {
    const py = groundAt(p[0], p[1]);
    inst('totem', xf(p[0], py, p[1], p[2]), 0xffffff);
    inst('totemlit', xf(p[0], py, p[1], p[2]), pick([0xffe6c0, 0xf4ecd8, 0xffdcae]));
    PRACTICALS.push({ x: p[0], y: py + 1.6, z: p[1], c: 0xffe0b8, i: 1.5, r: 6.0 });
  }

  /* ---- palms standing in the paving, each with its own base. `palmpit` was
     generated precisely so a palm could stand on hard landscape without a
     planter being built under it, and it had never been placed. The reference
     squares all have them: tall verticals breaking up the open field. */
  if (MODEL_ROUTE.palmpit) {
    for (const p of [[D.x0 + 18, D.z0 + 16], [D.x1 - 20, D.z0 + 20],
                     [D.x0 + 22, D.z1 - 18], [D.x1 - 16, D.z1 - 22],
                     [mx + 40, mz - 34], [mx - 46, mz + 8]]) {
      inst('palmpit', xf3(p[0], groundAt(p[0], p[1]), p[1], 0, rnd() * 6.28, 0,
        0.94 + rnd() * 0.22, 0.92 + rnd() * 0.3, 0.94 + rnd() * 0.22), 0xffffff);
    }
  }

  /* ---- tiered planters marking the edge of the walking field, the other
     asset that was generated for this and never used */
  if (MODEL_ROUTE.planterset) {
    for (let i = 0; i < 7; i++) {
      const qx = mx - 52 + i * 17 + rr(-3, 3), qz = D.z1 - 10 + rr(-2, 2);
      // the sunken garden owns the middle of the south edge now
      if (Math.hypot(qx - (mx - 4), qz - (D.z1 - 22)) < 18) continue;
      inst('planterset', xf3(qx, groundAt(qx, qz), qz, 0, rnd() * 6.28, 0,
        1.0 + rnd() * 0.25, 1.0, 1.0 + rnd() * 0.25), pick([K.leaf, K.leafLt, K.leafDk]));
    }
  }

  /* ---- cafe spill along the hotel frontage, which in the renders is the
     busiest thing in the square: tables out under the arcade, parasols over
     them, planting between them and the paving. */
  for (let i = 0; i < 9; i++) {
    const tx = D.x1 - 6 - rr(0, 5), tz = mz - 30 + i * 7.2 + rr(-1.2, 1.2);
    const ty = groundAt(tx, tz);
    inst('table', xf(tx, ty, tz, rnd() * 6.28), 0xe8e3d6);
    for (let c = 0; c < 3; c++) {
      const ca = rnd() * 6.28;
      inst('chair', xf(tx + Math.sin(ca) * 1.0, ty, tz + Math.cos(ca) * 1.0, ca + Math.PI), 0xefeade);
    }
    if (MODEL_ROUTE.parasol && chance(0.7)) {
      // the references' cafe spill is terracotta and maroon, not cream
      inst('parasol', xf(tx, ty, tz, rnd() * 6.28), pick([0xa8503c, 0x96453a, 0xb35c40, 0xe8dcc8]));
    }
    if (chance(0.5)) {
      const bx = tx - 4.2;
      inst('planter', xf3(bx, groundAt(bx, tz), tz, 0, 0, 0, 1.6, 0.95, 1.6), 0xcabb9d);
      inst('shrub', xf3(bx, groundAt(bx, tz) + 0.6, tz, 0, rnd() * 6.28, 0, 1.5, 1.15, 1.5), pick([K.leaf, K.leafLt]));
    }
  }

  /* ---- the lamp ring. Every reference plaza is lit by a regular rhythm of
     posts round its edge rather than by floodlight, and the pooled warm
     circles they throw on the paving are half of what sells the hour. */
  const per = 2 * ((D.x1 - D.x0) + (D.z1 - D.z0));
  const nL = Math.max(12, Math.round(per / 17));
  for (let i = 0; i < nL; i++) {
    const u = (i / nL) * per;
    let lx, lz;
    const w = D.x1 - D.x0, h = D.z1 - D.z0;
    if (u < w) { lx = D.x0 + u; lz = D.z0 + 2.5; }
    else if (u < w + h) { lx = D.x1 - 2.5; lz = D.z0 + (u - w); }
    else if (u < 2 * w + h) { lx = D.x1 - (u - w - h); lz = D.z1 - 2.5; }
    else { lx = D.x0 + 2.5; lz = D.z1 - (u - 2 * w - h); }
    const ly = groundAt(lx, lz);
    /* the ornate three-head lantern from the references, not the highway
       pole: it is the fixture the eye reads at arm's length in every
       street-level render */
    inst('plazlamp', xf(lx, ly, lz, Math.atan2(mx - lx, mz - lz)), 0xffffff);
    inst('plazlampglow', xf(lx, ly, lz, Math.atan2(mx - lx, mz - lz)), 0xffdfae);
    PRACTICALS.push({ x: lx, y: ly + 3.3, z: lz, c: 0xffe0b0, i: 5.0, r: 15 });
    inst('pool', xf3(lx, ly + 0.15, lz, 0, 0, 0, 11, 1, 11), 0xffdcaa);
  }

  /* ---- the twisted-bronze sculpture, the second piece every reference
     plaza carries beside the ring: on a round stone plinth with candle
     lanterns at its foot */
  if (MODEL_ROUTE.artknot) {
    const kx = mx - 20, kz = mz + 14, ky = groundAt(kx, kz);
    inst('artknot', xf(kx, ky + 0.10, kz, 2.1), 0xffffff);
    for (let i = 0; i < 5; i++) {
      const ca = (i / 5) * 6.28 + 0.4;
      inst('wlantern', xf(kx + Math.sin(ca) * 3.1, ky + 0.12, kz + Math.cos(ca) * 3.1, ca), 0xffe2b2);
    }
    PRACTICALS.push({ x: kx, y: ky + 2.2, z: kz, c: 0xffd9a0, i: 2.4, r: 9 });
  }

  /* ---- the sunken garden that closes the south of the plaza in the
     aerials: a circular bowl two steps down, planted round its rim, with
     the curved timber pergola standing over its walk */
  {
    const gx = mx - 4, gz = D.z1 - 22, R = 15;
    const gy2 = groundAt(gx, gz);
    // two stone step rings down into the bowl, walkable
    for (let s = 0; s < 2; s++) {
      const r = R - s * 1.1;
      a.add(G_CYLT, xf(gx, gy2 - 0.18 - s * 0.18, gz, 0, r * 2, 0.20, r * 2),
        K.travert, S.TRAVERTINE, 1.02 - s * 0.04);
    }
    a.add(G_CYLT, xf(gx, gy2 - 0.56, gz, 0, (R - 2.2) * 2, 0.22, (R - 2.2) * 2),
      K.paveLt || 0xc9bda4, S.PAVING, 0.96);
    platform(gx - R + 2.2, gz - R + 2.2, gx + R - 2.2, gz + R - 2.2, gy2 - 0.34);
    if (MODEL_ROUTE.gardenperg) {
      inst('gardenperg', xf(gx, gy2 - 0.34, gz, 0.6), 0xffffff);
    }
    // the planted rim: shrubs and flowers in a ring, uplit
    for (let i = 0; i < 16; i++) {
      const ca = (i / 16) * 6.28;
      const px = gx + Math.sin(ca) * (R - 1.1), pz = gz + Math.cos(ca) * (R - 1.1);
      inst('shrub', xf3(px, groundAt(px, pz) - 0.1, pz, 0, rnd() * 6.28, 0,
        1.15 + rnd() * 0.5, 0.9 + rnd() * 0.35, 1.15 + rnd() * 0.5), pick([K.leaf, K.leafLt, K.leafDk]));
      if (i % 4 === 2) inst('uplight', xf(px, groundAt(px, pz) + 0.02, pz), 0xffc98a);
    }
    PRACTICALS.push({ x: gx, y: gy2 + 2.4, z: gz, c: 0xffdca8, i: 3.0, r: 14 });
  }

  /* ---- the walk-in glass pavilion with the sedum roof, inside the
     south-west corner of the plaza as the references place it */
  if (MODEL_ROUTE.glasspav) {
    const px = D.x0 + 16, pz = D.z1 - 20;
    const py = groundAt(px, pz);
    inst('glasspav', xf(px, py, pz, 0.35), 0xffffff);
    collider(px, pz, 6.4, 4.6, 0, py + 4.6);
    occluder(px, pz, 6.6, 4.8, py + 4.6);
    PRACTICALS.push({ x: px, y: py + 2.6, z: pz, c: 0xffe6c2, i: 3.2, r: 11 });
  }

}

/* --------------------------------------------------------- per-frame life */
const _wm = new THREE.Matrix4();
function updateLife(dt, t) {
  const defs = INST_DEF;
  // walkers
  const idx = {};
  for (const k of WALK_KINDS) idx[k] = 0;
  for (let i = 0; i < WALKERS.length; i++) {
    const w = WALKERS[i];
    w.t += w.speed * dt;
    if (w.t >= 1) w.t -= 1;
    const p = w.path;
    const f = w.t * (p.length - 1);
    const s0 = Math.min(p.length - 2, Math.floor(f));
    const lt = f - s0;
    const ax = mix(p[s0][0], p[s0 + 1][0], lt), az = mix(p[s0][1], p[s0 + 1][1], lt);
    const dx = p[s0 + 1][0] - p[s0][0], dz = p[s0 + 1][1] - p[s0][1];
    const l = Math.hypot(dx, dz) || 1;
    const px = ax + (dz / l) * w.lane, pz = az - (dx / l) * w.lane;
    const gy = groundAt(px, pz);
    const bob = Math.abs(Math.sin(t * 3.6 + w.ph)) * 0.045;
    const lean = Math.sin(t * 3.6 + w.ph) * 0.035;
    const d = defs[w.kind];
    if (!d || !d.mesh) continue;
    const near = Math.hypot(px - cityCam.position.x, pz - cityCam.position.z);
    const vis = near < 2.6 ? 0 : 1;
    _wm.compose(V.set(px, gy + bob, pz),
      Q.setFromEuler(E.set(0, Math.atan2(dx, dz) + Math.PI, lean)),
      V2.set(w.scale * vis, w.scale * (1 - bob * 0.3) * vis, w.scale * vis));
    d.mesh.setMatrixAt(idx[w.kind]++, _wm);
  }
  for (const k in idx) { const d = defs[k]; if (d && d.mesh) d.mesh.instanceMatrix.needsUpdate = true; }

  /* ---- the rigged walkers, posed bone by bone -------------------------
     Same paths and the same lane offsets as the instanced crowd, so the two
     read as one crowd rather than as two systems sharing a street. The gait
     phase advances with DISTANCE rather than with time, which is the detail
     that stops a slow walker from running on the spot: stride length is a
     property of the body and speed follows from cadence, not the reverse. */
  for (let i = 0; i < RIG_INSTANCES.length; i++) {
    const w = RIG_INSTANCES[i];
    w.t += w.speed * dt;
    if (w.t >= 1) w.t -= 1;
    const p = w.path;
    const f = w.t * (p.length - 1);
    const s0 = Math.min(p.length - 2, Math.floor(f));
    const lt = f - s0;
    const ax = mix(p[s0][0], p[s0 + 1][0], lt), az = mix(p[s0][1], p[s0 + 1][1], lt);
    const dx = p[s0 + 1][0] - p[s0][0], dz = p[s0 + 1][1] - p[s0][1];
    const l = Math.hypot(dx, dz) || 1;
    const px = ax + (dz / l) * w.lane, pz = az - (dx / l) * w.lane;
    const gy = groundAt(px, pz);
    // 0.78 m of stride per half cycle, so cadence follows speed
    w.ph += (w.speed * dt * l * (p.length - 1)) / 0.78 * Math.PI;
    const bob = Math.abs(Math.sin(w.ph)) * 0.032;
    w.obj.position.set(px, gy + bob, pz);
    w.obj.rotation.set(0, Math.atan2(dx, dz) + Math.PI, Math.sin(w.ph) * 0.026);
    w.obj.scale.setScalar(w.scale);
    poseWalker({ mesh: w.mesh, limbs: w.limbs, rest: w.rest }, w.ph, w.stride);
  }

  // birds
  const bd = defs.bird;
  if (bd && bd.mesh) {
    for (let i = 0; i < BIRDS.length; i++) {
      const b = BIRDS[i];
      const a = t * b.sp + b.ph;
      const px = b.cx + Math.cos(a) * b.r, pz = b.cz + Math.sin(a * 1.13) * b.r * 0.6;
      const py = b.h + Math.sin(t * 0.4 + b.ph) * 4;
      const flap = 0.5 + 0.5 * Math.sin(t * 9.0 + b.fl);
      _wm.compose(V.set(px, py, pz), Q.setFromEuler(E.set(flap * 0.7 - 0.2, -a - Math.PI / 2, 0)), V2.set(1.5, 1.5, 1.5));
      bd.mesh.setMatrixAt(i, _wm);
    }
    bd.mesh.instanceMatrix.needsUpdate = true;
  }
  // jets
  const jd = defs.jet;
  if (jd && jd.mesh) {
    for (let i = 0; i < JETS.length; i++) {
      const j = JETS[i];
      const h = j.h * (0.55 + 0.45 * Math.abs(Math.sin(t * 1.35 + j.ph)) + 0.10 * Math.sin(t * 6.1 + j.ph * 3));
      _wm.compose(V.set(j.x, j.y, j.z), Q.identity(), V2.set(1, h, 1));
      jd.mesh.setMatrixAt(i, _wm);
    }
    jd.mesh.instanceMatrix.needsUpdate = true;
  }
  // material clocks
  emisMat.userData.u.uTime.value = t;
  emisFlickMat.userData.u.uTime.value = t;
  emisSoftMat.userData.u.uTime.value = t;
  emisShopMat.userData.u.uTime.value = t;
  _wu(poolMat).uTime.value = t;
  _wu(waterMat).uTime.value = t;
}

/* ============================================================ LANDMARKS ==
   Two things were missing from the wide shot, and they are the same thing
   twice: nothing rose out of the district that you could name, and the open
   quarters trailed off into paving instead of being held by architecture.

   Both are generated assets — a jamaa at the head of the water court, whose
   minaret is the only thing in the plan taller than its own quarter, and a
   colonnaded street building repeated along the edges that had no street
   wall. Every one of them stands on hand-built ground: a podium, steps, a
   ramp, a collider, and light aimed at the facade after dark.             */

/* Meshy picks its own facing per asset. These two constants are the whole
   correction, and they are read off a screenshot rather than guessed. */
const JAMAA_ROT = Math.PI;
const ARCADE_ROT = 0;

function buildLandmarks() {
  CURCHUNK = 'landmark';
  const a = ACC.arch, f = ACC.fine;
  const J = PLAN.jamaa;
  const gy = terrainY(J.x, J.z);

  /* ---- the podium ------------------------------------------------------
     A jamaa does not sit on the pavement. It sits a metre proud of it, with
     the whole precinct wall reading as one plane of travertine.           */
  const PW = 62, PD = 68, PY = gy + 1.15;
  const x0 = J.x - PW / 2, x1 = J.x + PW / 2, z0 = J.z - PD / 2, z1 = J.z + PD / 2;
  a.add(G_BOXT, xf(J.x, gy - 1.1, J.z, 0, PW, 2.25, PD), K.travDk, S.TRAVERTINE, 0.90);
  paved(ACC.ground, x0 + 0.4, z0 + 0.4, x1 - 0.4, z1 - 0.4, PY - terrainY(J.x, J.z) + 0.01, K.travert, 1.08, S.TRAVERTINE);
  platform(x0, z0, x1, z1, PY);

  // three steps and a walkable ramp down to the court on the south face
  for (let s = 0; s < 3; s++) {
    a.add(G_BOXT, xf(J.x, gy + 0.05 + 0.34 * s, z0 - 1.05 + s * 0.35, 0,
      19 - s * 1.2, 0.36, 0.72), K.travert, S.TRAVERTINE, 1.02 - s * 0.03);
  }
  ramp(J.x, z0 - 1.9, J.x, z0 + 1.4, gy + 0.06, PY, 9);
  platform(J.x - 9.5, z0 - 2.2, J.x + 9.5, z0 - 1.0, gy + 0.06);

  /* ---- the riwaq -------------------------------------------------------
     A pier-and-lintel colonnade round three sides of the precinct. It is
     what turns a building standing on a slab into a courtyard.           */
  const PIER = 4.6;
  for (const side of [-1, 1]) {
    for (let z = z0 + 3; z <= z1 - 3; z += PIER) {
      a.add(G_BOXT, xf(J.x + side * (PW / 2 - 1.5), PY, z, 0, 1.0, 4.5, 1.0), K.travert, S.TRAVERTINE, 1.0);
    }
    a.add(G_BOXT, xf(J.x + side * (PW / 2 - 1.5), PY + 4.5, J.z, 0, 1.3, 0.85, PD - 5), K.travert, S.TRAVERTINE, 1.06);
  }
  for (let x = x0 + 3; x <= x1 - 3; x += PIER) {
    a.add(G_BOXT, xf(x, PY, z1 - 1.5, 0, 1.0, 4.5, 1.0), K.travert, S.TRAVERTINE, 1.0);
  }
  a.add(G_BOXT, xf(J.x, PY + 4.5, z1 - 1.5, 0, PW - 5, 0.85, 1.3), K.travert, S.TRAVERTINE, 1.06);

  /* ---- the jamaa ------------------------------------------------------- */
  inst('jamaa', xf(J.x, PY, J.z, JAMAA_ROT));
  collider(J.x, J.z, 9.6, 12.4, 0, PY + J.h);

  // washing court and planting on the podium, and the light that finds the
  // minaret once the sun has gone
  for (const s of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) {
    inst('uplight', xf(J.x + s[0] * 13.5, PY + 0.06, J.z + s[1] * 16.5), 0xffc98a);
    inst('slimtree', xf(J.x + s[0] * 18.5, PY, J.z + s[1] * 20.0, rnd() * 6.28));
  }
  for (let i = 0; i < 8; i++) {
    const t = i / 7;
    inst('potset', xf(mix(J.x - 8.5, J.x + 8.5, t), PY, z0 + 3.4, rnd() * 6.28));
  }
  for (let i = 0; i < 5; i++) {
    inst('bench', xf(J.x + rr(-16, 16), PY, z0 + rr(6, 12), rnd() < 0.5 ? 0 : Math.PI));
  }

  /* ---- the street wall -------------------------------------------------
     The water court was 164 by 162 metres of paving with seven sails on it
     and nothing at its edges, which is why it read as the empty quarter. */
  const T = PLAN.tensile;
  const AW = 28.6;          // the arcade block's real width at this height
  for (let i = 0; i < 5; i++) {
    const z = T.z0 + 6 + i * (AW + 3.4);
    if (z > T.z1 - 22) break;
    const x = T.x0 - 15;
    const g = terrainY(x, z);
    a.add(G_BOXT, xf(x, g - 0.6, z, 0, 20, 0.72, AW + 2.2), K.travDk, S.TRAVERTINE, 0.92);
    platform(x - 10, z - AW / 2 - 1.1, x + 10, z + AW / 2 + 1.1, g + 0.12);
    inst('arcadeblk', xf(x, g + 0.12, z, ARCADE_ROT + Math.PI / 2));
    collider(x, z, 5.6, AW / 2 - 0.6, 0, g + 11);
    inst('slimtree', xf(x + 11.5, g, z - AW / 3, rnd() * 6.28));
    inst('slimtree', xf(x + 11.5, g, z + AW / 3, rnd() * 6.28));
    inst('bench', xf(x + 9.5, g + 0.12, z, Math.PI / 2));
    if (i % 2 === 0) inst('binbank', xf(x + 9.8, g + 0.12, z + 7, rnd() * 6.28));
  }
  // and a short terrace closing the court's south end
  for (let i = 0; i < 3; i++) {
    const x = T.x0 + 24 + i * (AW + 4);
    const z = T.z0 - 17;
    const g = terrainY(x, z);
    a.add(G_BOXT, xf(x, g - 0.6, z, 0, AW + 2.2, 0.72, 20), K.travDk, S.TRAVERTINE, 0.92);
    platform(x - AW / 2 - 1.1, z - 10, x + AW / 2 + 1.1, z + 10, g + 0.12);
    inst('arcadeblk', xf(x, g + 0.12, z, ARCADE_ROT + Math.PI));
    collider(x, z, AW / 2 - 0.6, 5.6, 0, g + 11);
    inst('bench', xf(x, g + 0.12, z + 9.5, 0));
  }

  /* ---- the water's edge ------------------------------------------------
     A basin with a hard travertine kerb and nothing growing at it is a
     swimming pool. These are what make it a lagoon.                      */
  const B = PLAN.sailPool;
  for (const side of [-1, 1]) {
    // a soil strip down each long side, and the planting standing in it —
    // scattering shrubs straight onto the pavers read as a carpet of leaves
    const sx = side < 0 ? B.x0 - 3.3 : B.x1 + 3.3;
    const g0 = terrainY(sx, (B.z0 + B.z1) / 2);
    ACC.arch.add(G_BOXT, xf(sx, g0 + 0.02, (B.z0 + B.z1) / 2, 0, 4.0, 0.16, B.z1 - B.z0 + 4),
      0x6a5b45, S.SAND, 0.86);
    for (let i = 0; i < 11; i++) {
      const px = sx + rr(-1.3, 1.3), pz = mix(B.z0 - 1.6, B.z1 + 1.6, (i + rr(0.1, 0.9)) / 11);
      inst('wshrub', xf(px, terrainY(px, pz) + 0.18, pz, rnd() * 6.28,
        1.0 + rnd() * 0.6, 1.05 + rnd() * 0.7, 1.0 + rnd() * 0.6));
    }
  }
  for (let i = 0; i < 9; i++) {
    const ang = i / 9 * 6.2831853 + 0.4;
    const px = (B.x0 + B.x1) / 2 + Math.cos(ang) * rr(24, 40);
    const pz = (B.z0 + B.z1) / 2 + Math.sin(ang) * rr(30, 52);
    if (Math.hypot(px - J.x, pz - J.z) < J.r + 6) continue;
    inst('slimtree', xf(px, terrainY(px, pz) + 0.14, pz, rnd() * 6.28));
  }

  /* ---- the garden ------------------------------------------------------
     What was actually wrong with this quarter was not that it lacked a
     landmark — it was that a hundred and sixty metres of paving with seven
     sails on it is a car park. It is now a walled garden on the jamaa's
     axis: two date allées running the full length, planting between them
     and the riwaq, and the basin sitting in the middle of it.

     The axis is the mosque's, so everything is measured off J.x rather than
     off the court, and the whole composition reads from the podium steps. */
  const AX = J.x;
  const gz0 = T.z0 + 8, gz1 = z0 - 6;      // between the south terrace and the podium
  for (const side of [-1, 1]) {
    const px = AX + side * 27;
    for (let z = gz0; z <= gz1; z += 9.4) {
      const g = terrainY(px, z);
      inst('planter', xf3(px, g + 0.10, z, 0, rnd() * 6.28, 0, 2.5, 1.0, 2.5), pick([0xcabb9d, 0xd2c3a4]));
      inst('palm', xf3(px, g + 0.42, z, 0, rnd() * 6.28, 0,
        0.94 + rnd() * 0.28, 1.02 + rnd() * 0.34, 0.94 + rnd() * 0.28), 0xffffff);
      // the allées are lit from below, which is what makes them read at dusk
      if (((z - gz0) / 9.4) % 2 < 1) inst('uplight', xf(px + side * 2.2, g + 0.14, z), 0xffc98a);
    }
    // the bed behind each allée: lawn plate, bougainvillea against the riwaq
    const bx0 = AX + side * 33, bx1 = AX + side * 62;
    const bx = (bx0 + bx1) / 2, bw = Math.abs(bx1 - bx0);
    for (let z = gz0 + 6; z <= gz1 - 12; z += 24) {
      const g = terrainY(bx, z);
      /* a bed, not a pitch: a travertine kerb round each plate and a metre of
         variation in its size, so the row does not read as mown rectangles */
      const pw = bw * rr(0.80, 0.94), pd = rr(17, 22);
      const jx = bx + rr(-2.2, 2.2);
      ACC.arch.add(G_BOXT, xf(jx, g, z, 0, pw + 1.1, 0.30, pd + 1.1), K.travert, S.TRAVERTINE, 1.04);
      ACC.arch.add(G_BOXT, xf(jx, g + 0.06, z, 0, pw - 0.5, 0.18, pd - 0.5), 0x6a5b45, S.SAND, 0.86);
      inst('lawn', xf(jx, g + 0.26, z, 0, pw - 0.7, 1, pd - 0.7), pick([K.leaf, K.leafDk, 0x4b6d3e]));
      for (let k = 0; k < 5; k++) {
        const qx = jx + rr(-pw * 0.42, pw * 0.42), qz = z + rr(-pd * 0.38, pd * 0.38);
        inst(chance(0.5) ? 'wshrub' : 'bougain',
          xf3(qx, terrainY(qx, qz) + 0.18, qz, 0, rnd() * 6.28, 0,
            0.8 + rnd() * 0.6, 0.8 + rnd() * 0.6, 0.8 + rnd() * 0.6), 0xffffff);
      }
      inst('slimtree', xf(jx + rr(-pw * 0.3, pw * 0.3), g + 0.26, z + rr(-pd * 0.34, pd * 0.34), rnd() * 6.28));
    }
  }

  /* the shaded rooms under the sails: a rug, a low seating set, and the
     string lights that turn the whole court on after sunset */
  for (let i = 0; i < 6; i++) {
    const mx = AX + rr(-17, 17), mz = mix(gz0 + 14, gz1 - 20, i / 5) + rr(-4, 4);
    if (mz > B.z0 - 6 && mz < B.z1 + 6 && mx > B.x0 - 6 && mx < B.x1 + 6) continue;
    const g = terrainY(mx, mz);
    const rot = rnd() * 6.28;
    inst('rugbig', xf(mx, g + 0.13, mz, rot, 1.15, 1, 1.15));
    if (MODEL_ROUTE.majlisset) {
      // the scanned lounge set: it survives the corrected intake perfectly well
      inst('majlisset', xf(mx, g + 0.14, mz, rot));
      inst('lowtable', xf3(mx, g + 0.15, mz, 0, rot, 0, 1, 1, 1), 0xf2ece0);
      if (chance(0.6)) inst('potset', xf(mx + rr(-3.4, 3.4), g + 0.13, mz + rr(-3.4, 3.4), rnd() * 6.28));
      continue;
    }
    for (let k = 0; k < 7; k++) {
      const a2 = rot + k / 7 * 6.2831853;
      const px = mx + Math.sin(a2) * 1.55, pz = mz + Math.cos(a2) * 1.55;
      inst('cushion', xf3(px, g + 0.15, pz, 0, a2 + Math.PI, 0, 1, 1, 1),
        pick([K.sadu, 0xb03a32, 0x8d2a26, 0xd9cbb4]));
      if (k % 3 === 0) inst('bolster', xf3(px, g + 0.47, pz, 0, a2 + Math.PI, 0, 1, 1, 1),
        pick([K.sadu, 0xe0d3ba, 0x7d2622]));
    }
    inst('lowtable', xf3(mx, g + 0.15, mz, 0, rot, 0, 1, 1, 1), 0xf2ece0);
    if (chance(0.6)) inst('potset', xf(mx + rr(-3.4, 3.4), g + 0.13, mz + rr(-3.4, 3.4), rnd() * 6.28));
  }
  for (const side of [-1, 1]) {
    for (let z = gz0 + 4.7; z <= gz1 - 9; z += 18.8) {
      const g = terrainY(AX + side * 27, z);
      inst('bunting', xf(AX + side * 27, g + 6.4, z + 9.4, 0, 1, 1, 1));
    }
  }
  // benches facing the water, back to back down the axis
  for (let z = gz0 + 10; z <= gz1 - 10; z += 12.5) {
    if (z > B.z0 - 4 && z < B.z1 + 4) continue;
    const g = terrainY(AX, z);
    inst('bench', xf(AX - 1.3, g + 0.13, z, 0));
    inst('bench', xf(AX + 1.3, g + 0.13, z, Math.PI));
    if (chance(0.22)) inst('binbank', xf(AX + rr(-7, 7), g + 0.13, z + 5, rnd() * 6.28));
  }
}

/* ============================================================== TRANSIT ==
   The site aerials show something the plan never had: a light rail running
   the length of the main boulevard, under the gold canopy, with a centre
   platform where the canopy is widest. It is the reason the canopy is where
   it is, and without it the canopy was a very large parasol over nothing.

   The alignment is the median of Canopy Boulevard. The canopy already spans
   it — z=104 falls inside the canopy's own footprint — so the tram runs in
   the shade for the whole width of the plaza, exactly as drawn.           */
const TRAM = { z: 104, x0: -400, x1: 400, gauge: 3.1, sep: 9.2, plat: { x: 4, len: 68 } };

function buildTransit() {
  CURCHUNK = 'transit';
  const a = ACC.arch, f = ACC.fine;
  const T = TRAM;
  const gy = terrainY(0, T.z);

  // the track slab, then two pairs of rail
  a.add(G_BOXT, xf((T.x0 + T.x1) / 2, gy + 0.02, T.z, 0, T.x1 - T.x0, 0.10, T.sep + 3.4),
    0x4c4a46, S.CONCRETE, 0.82);
  for (const s of [-1, 1]) {
    for (const r of [-T.gauge / 2, T.gauge / 2]) {
      a.add(G_BOXT, xf((T.x0 + T.x1) / 2, gy + 0.12, T.z + s * T.sep / 2 + r, 0,
        T.x1 - T.x0, 0.14, 0.14), 0x8e8b84, S.METAL, 1.0);
    }
    // sleepers, only where a walker can see them
    for (let x = -220; x <= 220; x += 2.4) {
      a.add(G_BOXT, xf(x, gy + 0.04, T.z + s * T.sep / 2, 0, 0.28, 0.09, T.gauge + 0.9),
        0x5d564c, S.CONCRETE, 0.9);
    }
  }
  // catenary masts down the centre reserve, with the wire between them
  for (let x = T.x0 + 20; x <= T.x1 - 20; x += 28) {
    if (Math.abs(x - T.plat.x) < T.plat.len / 2 + 6) continue;
    const g = terrainY(x, T.z);
    f.add(G_CYLT, xf(x, g, T.z, 0, 0.24, 8.2, 0.24), 0x9aa0a2, S.METAL, 0.95);
    for (const s of [-1, 1]) {
      f.add(G_BOXT, xf(x, g + 7.6, T.z + s * T.sep / 4, 0, 0.12, 0.12, T.sep / 2),
        0x9aa0a2, S.METAL, 0.95);
      f.add(G_BOXT, xf(x + 14, g + 6.9, T.z + s * T.sep / 2, 0, 28, 0.055, 0.055),
        0x6d6a63, S.METAL, 0.8);
    }
  }

  /* ---- the platform ---------------------------------------------------- */
  const P = T.plat, pgy = terrainY(P.x, T.z);
  a.add(G_BOXT, xf(P.x, pgy, T.z, 0, P.len, 0.34, T.sep - T.gauge - 0.6),
    K.travert, S.TRAVERTINE, 1.06);
  platform(P.x - P.len / 2, T.z - (T.sep - T.gauge) / 2 + 0.3,
    P.x + P.len / 2, T.z + (T.sep - T.gauge) / 2 - 0.3, pgy + 0.34);
  // the tactile edge strip each side
  for (const s of [-1, 1]) {
    a.add(G_BOXT, xf(P.x, pgy + 0.34, T.z + s * ((T.sep - T.gauge) / 2 - 0.42), 0,
      P.len, 0.03, 0.5), 0xd9c98c, S.CONCRETE, 1.1);
  }
  for (let i = 0; i < 3; i++) {
    const px = P.x - P.len / 2 + P.len * (i + 0.5) / 3;
    inst('tramstop', xf(px, pgy + 0.34, T.z, 0));
    PRACTICALS.push({ x: px, y: pgy + 3.2, z: T.z, c: 0xffe6c0, i: 5.5, r: 16 });
  }
  for (const s of [-1, 1]) {
    inst('kiosk', xf(P.x + s * (P.len / 2 - 6), pgy + 0.34, T.z, s > 0 ? 0 : Math.PI));
    inst('bench', xf(P.x + s * 12, pgy + 0.34, T.z + 1.4, Math.PI));
    inst('bench', xf(P.x + s * 12, pgy + 0.34, T.z - 1.4, 0));
    inst('binbank', xf(P.x + s * 19, pgy + 0.34, T.z, rnd() * 6.28));
  }

  /* ---- the gold pavilion over the stop ---------------------------------
     The plaza canopy already covers this stretch, but the aerials give the
     stop its own deeper roof where the two meet. It sits below the canopy's
     soffit so the two read as one structure seen end-on.                  */
  inst('canopypav', xf(P.x, pgy, T.z, 0, 1.35, 1, 1.0));

  /* ---- the vehicles ---------------------------------------------------- */
  const RAIL = [[P.x - 12, -1], [P.x + 96, 1], [P.x - 168, 1], [P.x + 214, -1]];
  for (const v of RAIL) {
    const g = terrainY(v[0], T.z + v[1] * T.sep / 2);
    inst('tram', xf(v[0], g + 0.20, T.z + v[1] * T.sep / 2, v[1] > 0 ? 0 : Math.PI));
  }

  // the boulevard's own trees keep off the alignment; these are the ones that
  // frame it instead, in the double row the aerials show
  for (let x = T.x0 + 30; x <= T.x1 - 30; x += 11.5) {
    if (Math.abs(x - P.x) < P.len / 2 + 4) continue;
    for (const s of [-1, 1]) {
      const pz = T.z + s * (T.sep / 2 + 8.5);
      if (insideSolid(x, pz, terrainY(x, pz) + 1)) continue;
      inst('palm', xf3(x + rr(-1.4, 1.4), terrainY(x, pz), pz, 0, rnd() * 6.28, 0,
          0.92 + rnd() * 0.26, 0.94 + rnd() * 0.3, 0.92 + rnd() * 0.26), 0xffffff);
    }
  }
}

/* ============================================================ ROUNDABOUT ==
   The arrival monument from the second aerial: a broad water bowl with an
   obelisk standing in it, at the junction the district is entered from. */
function buildRoundabout() {
  CURCHUNK = 'roundabout';
  const a = ACC.arch;
  const RX = -88, RZ = -96, R = 17.5;      // West Avenue x South Boulevard
  const gy = terrainY(RX, RZ);
  // the island: a raised paved disc the roads pass around
  for (let i = 0; i < 40; i++) {
    const A0 = i / 40 * 6.2831853, A1 = (i + 1) / 40 * 6.2831853;
    const mx = (Math.cos(A0) + Math.cos(A1)) / 2, mz = (Math.sin(A0) + Math.sin(A1)) / 2;
    const seg = 2 * R * Math.sin(Math.PI / 40);
    a.add(G_BOXT, xf(RX + mx * R * 0.995, gy - 0.1, RZ + mz * R * 0.995,
      Math.atan2(mx, mz), 0.9, 0.44, seg + 0.3), K.travDk, S.TRAVERTINE, 0.96);
  }
  paved(ACC.ground, RX - R + 1, RZ - R + 1, RX + R - 1, RZ + R - 1, 0.30, K.travert, 1.04, S.TRAVERTINE);
  platform(RX - R + 1, RZ - R + 1, RX + R - 1, RZ + R - 1, gy + 0.30);
  hole(RX - R, RZ - R, RX + R, RZ + R);

  inst('fountain', xf(RX, gy + 0.30, RZ, 0));
  {
    const wr = 12.2, wy = gy + 1.05;
    const wg = new THREE.CircleGeometry(wr, 56);
    wg.rotateX(-Math.PI / 2); wg.translate(RX, wy, RZ);
    // the fountain basin: a disc, and the only one, which is why the shader
    // carries a shape flag rather than assuming a box
    waterAttrs(wg, 0.06, 0.42, 1, RX, RZ, wr, wr);
    const wacc = new Acc();
    wacc.add(wg, xf(0, 0, 0), 0xffffff, 0, 1);
    const wm = new THREE.Mesh(wacc.geometry(), waterMat);
    WATERMESHES.push(wm); wm.renderOrder = 4;
    cityRoot.add(wm); DISPOSE.push(wm.geometry);
    WATERBODIES.push({ x0: RX - wr, x1: RX + wr, z0: RZ - wr, z1: RZ + wr, y: wy, depth: 0.5, flow: 0 });
    for (let i = 0; i < 26; i++) {
      const A1 = rnd() * 6.2831853, rr3 = Math.sqrt(rnd()) * (wr - 1.5);
      JETS.push({ x: RX + Math.cos(A1) * rr3, y: wy, z: RZ + Math.sin(A1) * rr3,
        ph: rnd() * 6.28, h: 1.1 + rnd() * 2.6 });
    }
  }
  inst('obelisk', xf(RX, gy + 0.62, RZ, 0.24));
  collider(RX, RZ, 2.2, 2.2, 0, gy + 13);
  for (let i = 0; i < 10; i++) {
    const A0 = i / 10 * 6.2831853 + 0.31;
    inst('uplight', xf(RX + Math.cos(A0) * (R - 4.5), gy + 0.34, RZ + Math.sin(A0) * (R - 4.5)), 0xffc98a);
  }
  PRACTICALS.push({ x: RX, y: gy + 4, z: RZ, c: 0xffd9a8, i: 9, r: 30 });
  for (let i = 0; i < 14; i++) {
    const A0 = i / 14 * 6.2831853 + 0.11;
    const px = RX + Math.cos(A0) * (R + 6.5), pz = RZ + Math.sin(A0) * (R + 6.5);
    inst('palm', xf3(px, terrainY(px, pz), pz, 0, rnd() * 6.28, 0, 1, 1.05 + rnd() * 0.3, 1), 0xffffff);
  }
}

/* ========================================================= FABRIC PROPS ==
   The district's architecture is procedural, which is what lets it be a
   district rather than four buildings — but every wall in it came out of the
   same grammar, and at plan scale that reads. These are the generated blocks
   dropped into the fabric to break it: a scanned shophouse row, a scanned
   apartment block, and the blue-roofed hall from the first aerial.

   Nothing is hand-placed. Each candidate site is tested against the colliders
   the block pass has already registered, so a prop only ever lands in a gap
   that was genuinely empty — which also means the seed decides where they go
   and the world stays identical between reloads.                          */
/* ==================================================== THE SCANNED STREET ==
   This used to sprinkle scanned buildings into whatever gaps the procedural
   block pass happened to leave. That was backwards, and it was the ceiling on
   how the district looked: every façade you could walk up to was assembled
   from two dozen boxes — 0.9 m floor slab bands, stepped crenellated
   parapets, box corbels — and no surface law fixes architecture that is
   actually made of blocks.

   So the order is inverted. This runs BEFORE the blocks, walks every public
   street in the walkable core, and lines it with scanned buildings, plot by
   plot, back to back along the frontage. The block pass then skips any plot
   whose centre has been claimed. The procedural grammar still builds the
   backs, the side streets and the outer fabric — everywhere nobody stands —
   which is what it was always good enough for.

   The scans keep their own proportions: a building is scaled uniformly to a
   storey height and laid along the frontage, never stretched to fill a plot.
   Where it does not reach the back of its site a plain mass is carried behind
   it, so the block reads solid from the roofs without a scanned façade being
   asked to be a whole building.                                            */
const SCANSITES = [];
const RESERVED = [];

function reserve(x0, z0, x1, z1) {
  RESERVED.push({ x0: Math.min(x0, x1), x1: Math.max(x0, x1),
    z0: Math.min(z0, z1), z1: Math.max(z0, z1) });
}
function inRect(list, x, z) {
  for (let i = 0; i < list.length; i++) {
    const r = list[i];
    if (x > r.x0 && x < r.x1 && z > r.z0 && z < r.z1) return true;
  }
  return false;
}
const inReserved = (x, z) => inRect(RESERVED, x, z);
const inScanSite = (x, z) => inRect(SCANSITES, x, z);

/* everything the plan places by hand, kept clear before anything claims it */
function planReserved() {
  const CP = PLAN.canopy, S1 = PLAN.souq, T = PLAN.tensile, J = PLAN.jamaa;
  reserve(CP.x0 - 14, CP.z0 - 14, CP.x1 + 14, CP.z1 + 14);
  reserve(PLAN.plaza.x0 - 10, PLAN.plaza.z0 - 10, PLAN.plaza.x1 + 10, PLAN.plaza.z1 + 10);
  reserve(S1.x0 - 12, S1.z0 - 20, S1.x1 + 12, S1.z1 + 26);
  reserve(T.x0 - 20, T.z0 - 22, T.x1 + 20, T.z1 + 20);
  reserve(PLAN.court.x0 - 18, PLAN.court.z0 - 18, PLAN.court.x1 + 18, PLAN.court.z1 + 18);
  reserve(J.x - 46, J.z - 50, J.x + 46, J.z + 50);
  reserve(PLAN.majlis.x - 30, PLAN.majlis.z - 28, PLAN.majlis.x + 30, PLAN.majlis.z + 28);
  // the downtown plaza and the frontages of the four buildings that face it
  const D = PLAN.dtplaza;
  reserve(D.x0 - 26, D.z0 - 26, D.x1 + 26, D.z1 + 26);
  reserve(-118, TRAM.z - 24, 118, TRAM.z + 24);
  reserve(-118, -118, 118, -66);
  reserve(PLAN.water.x - 16, -90, PLAN.water.x + 16, 580);
  for (const r of ROADS) {
    const w = r[4] / 2 + 1.5;   // the kerb, not the frontage: buildings stand at r/2 + depth/2 + 4.5 and were being rejected by their own street
    reserve(Math.min(r[0], r[2]) - w, Math.min(r[1], r[3]) - w,
      Math.max(r[0], r[2]) + w, Math.max(r[1], r[3]) + w);
  }
}

/* the scanned buildings, with their real footprint at the height they are
   placed at — measured off the contact sheet, not guessed */
const SCANBLD = [
  { kit: 'arcadeblk', h: 11.0, w: 28.6, d: 16.0, top: 11.0, w8: 3 },
  { kit: 'shophouse', h: 12.0, w: 42.5, d: 10.4, top: 12.4, w8: 3 },
  { kit: 'resblock', h: 15.0, w: 13.7, d: 13.6, top: 15.4, w8: 3 },
  { kit: 'townhouse', h: 11.5, w: 13.0, d: 12.3, top: 11.9, w8: 4 },
  { kit: 'townhouse2', h: 13.0, w: 20.4, d: 13.8, top: 13.4, w8: 3 },
  { kit: 'bluehall', h: 16.0, w: 52.8, d: 32.6, top: 16.4, w8: 1 },
];

function buildScanFabric() {
  CURCHUNK = 'scanfab';
  planReserved();
  const avail = SCANBLD.filter((b) => MODEL_ROUTE[b.kit]);
  if (!avail.length) return 0;
  const pool = [];
  for (const b of avail) for (let i = 0; i < b.w8; i++) pool.push(b);
  const a = ACC.arch;
  let n = 0;

  const place = (b, x, z, ang, backTo) => {
    const c = Math.abs(Math.cos(ang)), sn = Math.abs(Math.sin(ang));
    const ex = (b.w / 2) * c + (b.d / 2) * sn, ez = (b.w / 2) * sn + (b.d / 2) * c;
    for (const p of [[0, 0], [-ex, -ez], [ex, -ez], [-ex, ez], [ex, ez], [ex, 0], [-ex, 0]]) {
      if (inReserved(x + p[0], z + p[1]) || inScanSite(x + p[0], z + p[1])) return false;
    }
    for (const wb of WATERBODIES) {
      if (x + ex > wb.x0 - 4 && x - ex < wb.x1 + 4 && z + ez > wb.z0 - 4 && z - ez < wb.z1 + 4) return false;
    }
    const gy = terrainY(x, z);
    a.add(G_BOXT, xf(x, gy - 0.62, z, ang, b.w + 1.4, 0.78, b.d + 1.4), K.sandDk, S.ASHLAR, 0.88);
    inst(b.kit, xf(x, gy + 0.16, z, ang));
    // a plain mass carried behind the façade so the block reads solid from
    // the air without the scan being asked to be a whole building
    if (backTo > 2) {
      const bx = x - Math.sin(ang) * (b.d / 2 + backTo / 2);
      const bz = z - Math.cos(ang) * (b.d / 2 + backTo / 2);
      if (!inReserved(bx, bz)) {
        addMass(a, bx, terrainY(bx, bz), bz, ang, b.w * 0.94, b.top * 0.92, backTo,
          K.sandDk, S.RENDER, 0.72, 0.1);
        occluder(bx, bz, b.w / 2, backTo / 2, gy + b.top * 0.92);
      }
    }
    platform(x - ex, z - ez, x + ex, z + ez, gy + 0.16);
    collider(x, z, b.w / 2 - 0.4, b.d / 2 - 0.4, ang, gy + b.top);
    occluder(x, z, b.w / 2, b.d / 2, gy + b.top);
    SCANSITES.push({ x0: x - ex - 2, x1: x + ex + 2, z0: z - ez - 2, z1: z + ez + 2 });
    n++;
    return true;
  };

  /* Line every street in the core, both sides, back to back — and where the
     first rank cannot take a site, try a second one set back behind it. Most
     rejections are legitimate (the plan's own set pieces are reserved before
     anything claims a site), but a rejection used to skip eleven metres of
     frontage whether the obstruction was eleven metres or one. */
  for (const r of ROADS) {
    if (r[5] === 1) continue;   // pedestrian ways are dressed, not built on
    const dx = r[2] - r[0], dz = r[3] - r[1];
    const len = Math.hypot(dx, dz);
    const ux = dx / len, uz = dz / len, nx = uz, nz = -ux;
    const ang = Math.atan2(ux, uz) + Math.PI / 2;
    for (const side of [-1, 1]) {
      let t = 40;
      while (t < len - 40) {
        const b = pick(pool);
        const off = r[4] / 2 + b.d / 2 + 4.5;
        const px = r[0] + ux * (t + b.w / 2) + nx * off * side;
        const pz = r[1] + uz * (t + b.w / 2) + nz * off * side;
        // only inside the plan's own bounds, and only where a walker goes
        const inBounds = px > PLAN.bounds.x0 + 40 && px < PLAN.bounds.x1 - 40 &&
          pz > PLAN.bounds.z0 + 40 && pz < PLAN.bounds.z1 - 40;
        const face = ang + (side > 0 ? Math.PI : 0);
        if (inBounds && place(b, px, pz, face, rr(6, 17))) {
          /* Shoulder to shoulder, the way a street is actually built. Every
             building used to be set 1.2-5 m off its neighbour, which is a
             suburb: a town terrace runs continuous and breaks only where an
             alley or a gate goes through it. Most joints now close up, and
             one in six opens into a real gap wide enough to walk down. */
          t += b.w + (chance(0.17) ? rr(3.5, 8.0) : rr(0.1, 0.9));
          continue;
        }
        /* the second rank: a courtyard block set back behind the frontage,
           which is how this fabric actually works and which picks up the
           depth the first rank could not reach */
        const b2 = pick(pool);
        const off2 = r[4] / 2 + b2.d / 2 + 4.5 + b2.d + 9;
        const qx = r[0] + ux * (t + b2.w / 2) + nx * off2 * side;
        const qz = r[1] + uz * (t + b2.w / 2) + nz * off2 * side;
        if (inBounds && chance(0.55) && place(b2, qx, qz, face + (chance(0.5) ? Math.PI : 0), rr(0, 8))) {
          t += b2.w * 0.7 + rr(1.0, 4.0);
        } else {
          t += 6;
        }
      }
    }
  }
  INSTCOUNT.scanfab = n;
  return n;
}

/* ======================================================= SCANNED PEOPLE ==
   A street is not made of pedestrians in transit. Most of the people in any
   photograph of one are standing still — talking in twos, waiting, looking at
   a window, sitting down. The procedural figures walk, which is what they were
   built for; these are the ones that stop.

   Placed the way the dressing pass places everything else: sampled round the
   composed viewpoints, rejected inside solids and water, and turned to face
   each other where they land in pairs, because two people standing parallel
   read as a bus queue and two people turned in read as a conversation.     */
function buildScannedPeople() {
  if (QA.nolife || !STANDERS.length) return 0;
  CURCHUNK = 'people';
  let n = 0;
  for (const s of DRESS_SPOTS) {
    const want = Math.round(s.r * s.r * 0.013 * s.d);
    for (let i = 0; i < want; i++) {
      const a = rnd() * 6.2831853, rr2 = Math.sqrt(rnd()) * s.r;
      const x = s.x + Math.cos(a) * rr2, z = s.z + Math.sin(a) * rr2;
      const gy = dressY(x, z);
      if (gy < -6 || insideSolid(x, z, gy + 0.9)) continue;
      if (WATERBODIES.some((b) => x > b.x0 - 1 && x < b.x1 + 1 && z > b.z0 - 1 && z < b.z1 + 1)) continue;
      const face = rnd() * 6.2831853;
      inst(pick(STANDERS), xf(x, gy, z, face));
      n++;
      // roughly two in five are with someone
      if (chance(0.40)) {
        const d = rr(0.85, 1.35);
        const px = x + Math.sin(face) * d, pz = z + Math.cos(face) * d;
        if (!insideSolid(px, pz, gy + 0.9)) {
          inst(pick(STANDERS), xf(px, dressY(px, pz), pz, face + Math.PI + rr(-0.35, 0.35)));
          n++;
        }
      }
    }
  }
  /* and the seated ones, on the benches that already exist — the bench kit
     records nothing, so they are placed on the same rhythm the benches were */
  if (SITTERS.length) {
    const T = PLAN.tensile, J = PLAN.jamaa;
    const SEATS = [];
    for (let z = T.z0 + 18; z <= J.z - 40; z += 12.5) { SEATS.push([J.x - 1.3, z, 0]); SEATS.push([J.x + 1.3, z, Math.PI]); }
    for (let z = PLAN.souq.z0 - 10; z < PLAN.souq.z1; z += rr(16, 28)) {
      const sd = chance(0.5) ? 1 : -1;
      SEATS.push([PLAN.spineX + sd * 5.4, z, sd > 0 ? 0 : Math.PI]);
    }
    for (const q of SEATS) {
      if (!chance(0.45)) continue;
      const gy = dressY(q[0], q[1]);
      if (gy < -6) continue;
      inst(pick(SITTERS), xf(q[0] + rr(-0.3, 0.3), gy + 0.42, q[1] + rr(-0.3, 0.3), q[2] + rr(-0.25, 0.25)));
      n++;
    }
  }
  INSTCOUNT.scannedPeople = n;
  return n;
}

/* ========================================================== FURNISHING ==
   The golden-hour interior is a complete furnished room, and the thirty
   pieces standing in it are the first real furniture in the build — every
   shop fit-out until now was a hand-built kit of boxes.

   Which piece is which is not recorded anywhere and the mesh names are
   Object_N, so they are used by size rather than by name, which is both
   honest and sufficient: a 1.4 m-wide, 0.6 m-tall object is seating whatever
   the modeller called it, a 1.8 m-tall, 0.4 m-wide one stands in a corner,
   and a 0.2 m one goes on a counter. Placement is inside the fitted rooms,
   against the back wall and clear of the glass, because the whole point of
   the interiors is that you see them from the street.                      */
function furnishInteriors() {
  if (!FURNITURE.length) return 0;
  CURCHUNK = 'furnish';
  const SEAT = FURNITURE.filter((f) => f.h > 0.25 && f.h < 1.15 && Math.max(f.w, f.d) > 0.9);
  const TALL = FURNITURE.filter((f) => f.h >= 1.15 && Math.max(f.w, f.d) < 0.75);
  const SMALL = FURNITURE.filter((f) => f.h <= 0.25 && Math.max(f.w, f.d) < 0.7);
  let n = 0;
  for (const sh of SHOPS) {
    if (!sh.fitted) continue;
    const sn = Math.sin(sh.ang), cs = Math.cos(sh.ang);
    // the shop's own frame: `across` runs along the frontage, `into` goes back
    const at = (across, into) => [sh.x + cs * across + sn * into, sh.z - sn * across + cs * into];
    const put = (list, across, into, ry) => {
      if (!list.length) return;
      const q = at(across, into);
      inst(pick(list).kit, xf(q[0], sh.y + 0.02, q[1], sh.ang + (ry || 0)));
      n++;
    };
    const half = Math.max(0.6, sh.w * 0.5 - 0.7);
    if (SEAT.length && chance(0.72)) put(SEAT, rr(-half, half), rr(1.5, 2.6), rr(-0.4, 0.4));
    if (TALL.length && chance(0.62)) put(TALL, (chance(0.5) ? -1 : 1) * half, rr(1.9, 2.9), 0);
    if (SMALL.length) {
      for (let k = 0, m = ri(1, 3); k < m; k++) put(SMALL, rr(-half, half), rr(1.0, 2.4), rnd() * 6.28);
    }
  }
  /* and on the majlis terrace and the court rugs, where a room's worth of
     furniture is the difference between a terrace and a roof */
  for (let i = 0; i < 22; i++) {
    const x = PLAN.majlis.x + rr(-16, 16), z = PLAN.majlis.z + rr(-14, 14);
    const gy = groundAt(x, z);
    if (gy < -6 || insideSolid(x, z, gy + 0.5)) continue;
    const list = chance(0.5) ? SEAT : (chance(0.5) ? TALL : SMALL);
    if (!list.length) continue;
    inst(pick(list).kit, xf(x, gy, z, rnd() * 6.28));
    n++;
  }
  INSTCOUNT.furniture = n;
  return n;
}

/* =============================================================== RULER ==
   ?ruler=1 stands a graduated two-metre pole and a 1.7 m figure at every
   composed viewpoint, plus a one-metre chequer on the ground.

   Scale is the one error you cannot see by looking. A district that is
   uniformly thirty per cent too big looks completely convincing until
   something of known size stands in it, and then nothing else in the frame
   is believable again. Every reference shot from here on carries one, and
   any measurement claim in DELTA.md has to be made against it rather than
   against an eye.                                                         */
const RULER_AT = [
  [0, 0], [4, 60], [TRAM.plat.x, TRAM.z - 6], [4, 200], [4, 300],
  [-214, 20], [-224, 230], [150, 235], [-88, -70], [21, -44], [-311, 0],
];

function buildRuler() {
  if (!QA.ruler) return;
  CURCHUNK = 'ruler';
  const a = ACC.fine;
  for (const p of RULER_AT) {
    const gy = groundAt(p[0], p[1]);
    // the pole: four half-metre bands, red and white, topped at exactly 2 m
    for (let b = 0; b < 4; b++) {
      a.add(G_BOXT, xf(p[0], gy + b * 0.5, p[1], 0, 0.075, 0.5, 0.075),
        b % 2 ? 0xf4f0e6 : 0xc03626, S.CONCRETE, 1.25);
    }
    a.add(G_BOXT, xf(p[0], gy + 2.0, p[1], 0, 0.30, 0.035, 0.30), 0x18324e, S.METAL, 1.3);
    // a one-metre chequer at its foot, so horizontal scale is readable too
    for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) {
      a.add(G_BOXT, xf(p[0] + (i - 0.5) * 0.5, gy + 0.012, p[1] + 1.0 + (j - 0.5) * 0.5, 0, 0.5, 0.02, 0.5),
        (i + j) % 2 ? 0xf4f0e6 : 0x18324e, S.CONCRETE, 1.2);
    }
    // and a person, because a figure is the ruler everyone reads instinctively
    inst('thobe', xf(p[0] + 0.9, gy, p[1], Math.PI * 0.85));
  }
}

/* =========================================================== BUILD ORDER */
function* buildSteps() {
  yield 'env'; buildEnvironment();
  yield 'kit'; defineKit();
  yield 'water-plan'; planWater();
  yield 'ground'; buildGround();
  yield 'water'; buildWater();
  yield 'roads'; buildRoads();
  yield 'scanfab'; buildScanFabric();
  yield 'blocks-a'; buildBlocks();
  yield 'canopy'; buildCanopy();
  yield 'towers'; buildTowers();
  yield 'skyline'; buildSkyline();
  yield 'majlis'; buildMajlis();
  yield 'court'; buildCourtyard();
  yield 'tensile'; buildTensile();
  yield 'landmarks'; buildLandmarks();
  yield 'transit'; buildTransit();
  yield 'roundabout'; buildRoundabout();
  yield 'planting'; buildPlanting();
  yield 'green'; buildGreen();
  yield 'sustain'; buildSustainability();
  yield 'identity'; buildIdentity();
  yield 'probes'; bakeProbes();
  yield 'dressing'; { const d = nearDressing(); INSTCOUNT.dressing = d.placed; INSTCOUNT.litter = d.scraps; }
  yield 'life'; buildLife();
  yield 'people'; buildScannedPeople();
  yield 'furnish'; furnishInteriors();
  yield 'ruler'; buildRuler();
  yield 'merge'; finalise();
}

/* One merged mesh per quarter is one draw call but also one bounding sphere:
   nothing is ever culled, and the shadow pass redraws the entire district
   every frame. So each chunk is re-indexed into 64 m tiles that share the
   same vertex buffers and differ only in their index — the upload cost is
   unchanged, and both the camera and the shadow camera can throw most of it
   away. Draw calls roughly triple; triangles submitted fall by far more.  */
const TILE = 104;
function emitTiled(acc, mat, shadow, receive) {
  const g0 = acc.geometry();
  const pos = g0.attributes.position;
  const idx = g0.index.array;
  const buckets = new Map();
  for (let t = 0; t < idx.length; t += 3) {
    const a = idx[t], b = idx[t + 1], c = idx[t + 2];
    const cx = (pos.getX(a) + pos.getX(b) + pos.getX(c)) / 3;
    const cz = (pos.getZ(a) + pos.getZ(b) + pos.getZ(c)) / 3;
    const k = Math.floor(cx / TILE) + ',' + Math.floor(cz / TILE);
    let arr = buckets.get(k);
    if (!arr) { arr = []; buckets.set(k, arr); }
    arr.push(a, b, c);
  }
  let n = 0;
  buckets.forEach((arr) => {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', pos);
    g.setAttribute('normal', g0.attributes.normal);
    g.setAttribute('uv', g0.attributes.uv);
    g.setAttribute('color', g0.attributes.color);
    g.setAttribute('aSurf', g0.attributes.aSurf);
    g.setIndex(acc.n > 65535 ? new THREE.Uint32BufferAttribute(arr, 1) : new THREE.Uint16BufferAttribute(arr, 1));
    // the bound must come from this tile's own vertices, not the whole buffer
    let x0 = 1e9, y0 = 1e9, z0 = 1e9, x1 = -1e9, y1 = -1e9, z1 = -1e9;
    for (let i = 0; i < arr.length; i++) {
      const v = arr[i];
      const x = pos.getX(v), y = pos.getY(v), z = pos.getZ(v);
      if (x < x0) x0 = x; if (x > x1) x1 = x;
      if (y < y0) y0 = y; if (y > y1) y1 = y;
      if (z < z0) z0 = z; if (z > z1) z1 = z;
    }
    g.boundingBox = new THREE.Box3(new THREE.Vector3(x0, y0, z0), new THREE.Vector3(x1, y1, z1));
    g.boundingSphere = new THREE.Sphere(
      new THREE.Vector3((x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2),
      Math.hypot(x1 - x0, y1 - y0, z1 - z0) / 2 + 0.5);
    const m = new THREE.Mesh(g, mat);
    m.castShadow = shadow !== false;
    m.receiveShadow = receive !== false;
    cityRoot.add(m);
    DISPOSE.push(g);
    n++;
  });
  DISPOSE.push(g0);
  return n;
}

function finalise() {
  let tiles = 0;
  for (const key in CHUNKS) {
    const a = CHUNKS[key];
    if (!a.n) continue;
    tiles += emitTiled(a, cityMat, true, true);
    INSTCOUNT['tri_' + key] = a.tris();
  }
  if (ACC.ground.n) tiles += emitTiled(ACC.ground, cityMat, false, true);
  if (INTERIOR.n) { tiles += emitTiled(INTERIOR, cityIntMat, false, true); INSTCOUNT.tri_interior = INTERIOR.tris(); }
  INSTCOUNT.tiles = tiles;
  if (GLASS.n) { const g = GLASS.geometry(); const m = new THREE.Mesh(g, glassMat); m.renderOrder = 6; m.castShadow = false; m.receiveShadow = false; cityRoot.add(m); DISPOSE.push(g); }
  if (SHOPGLASS.n) { const g = SHOPGLASS.geometry(); const m = new THREE.Mesh(g, shopGlassMat); m.renderOrder = 6; m.castShadow = false; m.receiveShadow = false; cityRoot.add(m); DISPOSE.push(g); }
  if (REEDGLASS.n) { const g = REEDGLASS.geometry(); const m = new THREE.Mesh(g, reedGlassMat); m.renderOrder = 6; m.castShadow = false; m.receiveShadow = false; cityRoot.add(m); DISPOSE.push(g); }
  if (EMIS.n) { const g = EMIS.geometry(); const m = new THREE.Mesh(g, emisMat); m.castShadow = false; m.receiveShadow = false; cityRoot.add(m); DISPOSE.push(g); }
  if (SHOPEMIS.n) { const g = SHOPEMIS.geometry(); const m = new THREE.Mesh(g, emisShopMat); m.castShadow = false; m.receiveShadow = false; cityRoot.add(m); DISPOSE.push(g); }
  flushInstances();
  INSTCOUNT.colliders = COLLIDERS.length;
  INSTCOUNT.platforms = PLATFORMS.length;
  INSTCOUNT.walkers = WALKERS.length;
  INSTCOUNT.bulbs = (INST.bulb ? INST.bulb.m.length : 0);
  cityRoot.updateMatrixWorld(true);
}

/* ================================================== NEAR-FIELD DRESSING ==
   The gap between a model and a place is the first eight metres. A block, a
   kerb and a tree are the same in both; what is only in the real one is the
   crate someone left against a shopfront, the A-board turned to catch the
   street, the drift of leaves in the lee of a step, the stain of a spilled
   drink, the chair pulled out of line.

   None of that can be authored by hand across a 940 m district, and scattering
   it everywhere costs a fortune for detail no one is close enough to read. So
   it goes where the composed viewpoints are, and it is placed by asking the
   collision world the same questions a person would: is this ground I could
   stand on, and is there a wall within arm's reach? Props that belong against
   a wall go against a wall, facing out; props that belong in the open stay in
   the open; and nothing lands inside a building, because the test that keeps
   the walker out is the test that places them.                             */
const DRESS_SPOTS = [
  { x: 0, z: 0, r: 60, d: 0.9 },          // the canopy plaza
  { x: 21, z: -44, r: 44, d: 0.9 },
  { x: -40, z: -26, r: 34, d: 0.7 },
  { x: 150, z: 235, r: 34, d: 1.1 },      // the majlis terrace
  { x: -224, z: 198, r: 46, d: 1.0 },     // the colonnade court
  { x: -200, z: 150, r: 34, d: 0.8 },
  { x: -34, z: 120, r: 30, d: 0.7 },      // the channel walk
  { x: -214, z: 20, r: 48, d: 1.0 },      // the water court garden
  { x: -214, z: 24, r: 26, d: 1.2 },      // and its axis, more densely
  /* the downtown plaza, denser than anywhere else in the district. The
     reference renders of this square are the most crowded images in the set
     and the crowd is most of why they read as a place people go. */
  /* dense at the edges where the cafes are, calm in the middle: sprinkling
     chairs and crates across the open field read as a flea market in the
     client's screenshots, and no reference does it */
  { x: 212, z: 234, r: 42, d: 0.8 },
  { x: 256, z: 240, r: 18, d: 1.9 },      // the cafe spill along the hotel
  { x: 162, z: 198, r: 18, d: 1.5 },      // and the cinema doors
];
for (let z = 90; z <= 360; z += 26) {     // the souq spine, end to end
  DRESS_SPOTS.push({ x: 4 + (z > 250 ? 26 : 0), z, r: 22, d: 1.5 });
}

/* Leaf and paper drift. Wind does not distribute litter evenly — it piles it
   against whatever stops it, so a scrap goes in the lee of the wall it was
   found by, in a tight cluster, lying flat with a little curl. Two triangles
   each and one instanced draw for the lot. */
function litterDrift(x, z, gy, wallAng, n) {
  const bx = Math.cos(wallAng), bz = Math.sin(wallAng);
  let k = 0;
  for (let i = 0; i < n; i++) {
    const along = rr(-1.4, 1.4), out = 0.06 + Math.abs(rr(0, 0.5));
    const px = x + -bz * along - bx * out;
    const pz = z + bx * along - bz * out;
    if (insideSolid(px, pz, gy + 0.3)) continue;
    inst('scrap', xf3(px, gy + 0.010 + rnd() * 0.010, pz,
      rr(-0.20, 0.20), rnd() * 6.2831853, rr(-0.20, 0.20),
      0.055 + rnd() * 0.085, 1, 0.045 + rnd() * 0.075),
      // dry leaf, dust and pale paper: at dusk a dark scrap reads as a hole in
      // the paving, not as litter
      pick([0xa8996f, 0xbdae86, 0xc9c1ab, 0x9a7f4e, 0xd6cfbd, 0x8f7a55]));
    k++;
  }
  return k;
}

/* Where the nearest wall is, and how far. Probing outward in rings rather than
   testing one radius is what turns a scatter into a street: almost everything
   a shop puts out is against its own frontage, and a crate in the middle of the
   road is not dressing, it is litter of the wrong kind. */
const _dw = { ang: 0, dist: 0, hit: false };
function wallNear(x, z, y, maxReach) {
  for (let r = 0.9; r <= maxReach; r += 0.72) {
    for (let k = 0; k < 16; k++) {
      const th = k / 16 * 6.2831853;
      if (insideSolid(x + Math.cos(th) * r, z + Math.sin(th) * r, y + 0.7)) {
        _dw.ang = th; _dw.dist = r; _dw.hit = true; return true;
      }
    }
  }
  _dw.hit = false;
  return false;
}

/* Paving sits 6 to 24 cm above the terrain it is laid on, so anything dressed
   onto the terrain height is buried in it. A platform, on the other hand, is
   its own finished level. */
function dressY(x, z) {
  const g = groundAt(x, z), t = terrainY(x, z);
  return g > t + 0.5 ? g + 0.02 : t + 0.155;
}

function nearDressing() {
  let placed = 0, scraps = 0;
  for (const s of DRESS_SPOTS) {
    const n = Math.round(s.r * s.r * 0.18 * s.d);
    for (let i = 0; i < n; i++) {
      const a = rnd() * 6.2831853, rr2 = Math.sqrt(rnd()) * s.r;
      let x = s.x + Math.cos(a) * rr2, z = s.z + Math.sin(a) * rr2;
      let gy = dressY(x, z);
      if (gy < -6 || insideSolid(x, z, gy + 0.35)) continue;
      if (WATERBODIES.some((b) => x > b.x0 - 1.2 && x < b.x1 + 1.2 && z > b.z0 - 1.2 && z < b.z1 + 1.2)) continue;

      const found = wallNear(x, z, gy, 3.9);
      if (found && rnd() < 0.86) {
        // ... but not across a shop window. A shopkeeper stacks crates beside
        // the glass, never in front of it, and a rail of cloth parked over a
        // fitted room hides the one thing worth looking at.
        let onGlass = false;
        for (let k = 0; k < SHOPS.length; k++) {
          const sh = SHOPS[k];
          const dx = x - sh.x, dz = z - sh.z;
          if (dx * dx + dz * dz > 25) continue;
          const across = dx * Math.cos(sh.ang) - dz * Math.sin(sh.ang);
          const into = dx * Math.sin(sh.ang) + dz * Math.cos(sh.ang);
          if (into < 0.2 && into > -2.6 && Math.abs(across) < sh.w * 0.62) { onGlass = true; break; }
        }
        if (onGlass) continue;
        // slide the prop in to arm's reach of the frontage it belongs to
        const bx = Math.cos(_dw.ang), bz = Math.sin(_dw.ang);
        const off = _dw.dist - rr(0.45, 0.85);
        const px = x + bx * off, pz = z + bz * off;
        if (insideSolid(px, pz, gy + 0.35)) continue;
        gy = dressY(px, pz);
        // the kit's wall-mounted convention: local -Z faces out of the wall
        const ang = _dw.ang + Math.PI / 2;
        const roll = rnd();
        if (roll < 0.17) inst('crate', xf3(px, gy, pz, 0, ang + rr(-0.22, 0.22), 0, 0.85 + rnd() * 0.3, 0.9, 0.85 + rnd() * 0.3), pick([0x9a7444, 0x86643a, 0xa88254]));
        else if (roll < 0.29) inst('matroll', xf3(px, gy, pz, 0, ang + rr(-0.3, 0.3), 0, 1, 0.85 + rnd() * 0.3, 1), 0xffffff);
        else if (roll < 0.36) inst('aboard', xf3(px, gy, pz, 0, ang + rr(-0.8, 0.8), 0, 1, 1, 1), pick([0x6b4526, 0x54361d]));
        else if (roll < 0.42) {
          if (MODEL_ROUTE.vinepanel) inst('vinepanel', xf(px, gy, pz, ang));
          else inst('matroll', xf3(px, gy, pz, 0, ang, 0, 1, 1, 1), 0xffffff);
        }
        /* the hanging rail of clothes outside a shop — generated for exactly
           this frontage dressing and never placed anywhere */
        else if (roll < 0.48 && MODEL_ROUTE.clothrail) {
          inst('clothrail', xf(px, gy, pz, ang + rr(-0.15, 0.15)),
            pick([0xd8c0a0, 0xc8b090, 0x9d5f4e, 0x6e7f8e, 0xb8a25e, 0x7c5a72]));
        }
        else if (roll < 0.53) inst('goods', xf3(px, gy, pz, 0, ang, 0, 0.9 + rnd() * 0.25, 1, 1), pick([0xd8c0a0, 0xc8b090, 0xe0cdb0, 0x9d5f4e, 0x6e7f8e, 0xb8a25e, 0x7c5a72, 0xd9d3c4]));
        else if (roll < 0.64) inst('basket', xf(px, gy, pz, rnd() * 6.28, 0.7 + rnd() * 0.4, 0.8 + rnd() * 0.5, 0.7 + rnd() * 0.4), pick([0xc9b088, 0xb59a72]));
        else if (roll < 0.73) {
          inst('pot', xf(px, gy, pz, rnd() * 6.28, 0.8, 0.8, 0.8), pick([0xcbb79a, 0xb9a184]));
          inst('potbush', xf3(px, gy + 0.53, pz, 0, rnd() * 6.28, 0, 0.7, 0.7, 0.7), pick([K.leaf, K.leafLt]));
        } else if (roll < 0.81) inst('bin', xf(px, gy, pz, rnd() * 6.28, 0.85, 0.9, 0.85), 0xffffff);
        else if (roll < 0.90) inst('planter', xf3(px, gy, pz, 0, ang, 0, 0.9, 0.85, 0.9), pick([K.travert, K.plaster]));
        else inst('bench', xf(px, gy, pz, ang), pick([0xd6c6a8, 0xcbbb9c]));
        scraps += litterDrift(px, pz, gy, _dw.ang, 3 + Math.floor(rnd() * 6));
        placed++;
      } else if (rnd() < 0.58) {
        const roll = rnd();
        if (roll < 0.14) inst('chair', xf(x, gy, z, rnd() * 6.28, 1, 1, 1), pick([0xefeade, 0xd8d2c4, 0xb9b2a2]));
        else if (roll < 0.22) inst('table', xf(x, gy, z, rnd() * 6.28, 1, 1, 1), pick([0xe8e3d6, 0xd6c6a8]));
        else if (roll < 0.30) inst('planter', xf3(x, gy, z, 0, rnd() * 6.28, 0, 0.85, 0.80, 0.85), pick([K.travert, K.plaster]));
        else if (roll < 0.36) inst('pot', xf(x, gy, z, rnd() * 6.28, 0.75, 0.75, 0.75), pick([0xcbb79a, 0xb9a184]));
        else scraps += litterDrift(x, z, gy, rnd() * 6.28, 2 + Math.floor(rnd() * 4));
        placed++;
      }
    }
  }
  return { placed, scraps };
}

/* ========================================================= SUSTAINABILITY ==
   The last batch of scans, and the one theme the four SDC renders carry that
   this district was carrying only as a roof-mounted solar array: a wind-catcher
   tower, PV over the planting and over a heritage roof, an electric shuttle on
   the boulevard. Plus the soft landscape the plaza was visibly short of —
   tiered planters, deck benches over the water, market stalls down the souq,
   and a date palm that arrives with its own stone tree pit rather than needing
   one built under it.

   Everything here places against the existing reservation system and the road
   table, so nothing lands in a carriageway or inside a building's footprint,
   and everything is seeded off DRNG so the world is still identical per seed.
   ========================================================================== */
function buildSustainability() {
  CURCHUNK = 'sustain';
  let n = 0;
  const put = (kit, x, z, ry, y) => {
    if (!MODEL_ROUTE[kit]) return false;
    inst(kit, xf3(x, y === undefined ? dressY(x, z) : y, z, 0, ry, 0, 1, 1, 1));
    n++;
    return true;
  };

  /* ---- wind-catcher towers ---------------------------------------------
     A malqaf is a landmark and a piece of infrastructure at once, so these go
     where a landmark belongs: the four corners of the canopy plaza, standing
     clear of the deck, plus one on the souq's north head where the spine
     needs a stop. Four, not forty — the whole point of a wind tower is that
     you can see it from the other end of the district. */
  const CP = PLAN.canopy;
  const TOWERS = [
    [CP.x0 - 9, CP.z0 - 9, 0.78], [CP.x1 + 9, CP.z0 - 9, -0.78],
    [CP.x0 - 9, CP.z1 + 9, 2.36], [CP.x1 + 9, CP.z1 + 9, -2.36],
    [PLAN.spineX, PLAN.souq.z1 + 18, 0],
  ];
  for (const [x, z, ry] of TOWERS) put('windtower', x, z, ry);

  /* ---- the heritage block ----------------------------------------------
     A solar roof on a vernacular stone building is the clearest single image
     of the brief, so it faces the colonnade court rather than hiding on a back
     street. Three of them, along the court's north edge. */
  const CT = PLAN.court;
  for (let i = 0; i < 3; i++) {
    put('heritage', CT.x0 + 18 + i * 41, CT.z1 + 26, Math.PI);
  }

  /* ---- deck benches over the water --------------------------------------
     9 m of timber deck with its own planting, so they belong on the channel
     edge where the bank is otherwise a stone lip. Alternating sides, and only
     where the reservation system says the bank is clear. */
  const WX = PLAN.water.x, WW = PLAN.water.w;
  for (let z = 20, i = 0; z < 420; z += 62, i++) {
    const side = i % 2 ? 1 : -1;
    const x = WX + side * (WW / 2 + 4.6);
    if (inScanSite(x, z)) continue;
    put('deckbench', x, z, side > 0 ? -Math.PI / 2 : Math.PI / 2);
  }

  /* ---- market stalls ----------------------------------------------------
     Down the souq spine, alternating sides, at the bay rhythm the arcade
     already uses. A souq without stalls in it is a shopping street. */
  const SQ = PLAN.souq;
  for (let z = SQ.z0 + 14; z < SQ.z1 - 10; z += 21) {
    for (const side of [-1, 1]) {
      if (chance(0.35)) continue;
      const x = PLAN.spineX + side * 12.5;
      if (inScanSite(x, z)) continue;
      put('stall', x, z, side > 0 ? -Math.PI / 2 : Math.PI / 2);
    }
  }

  /* ---- tiered planters and PV planters -----------------------------------
     Planters soften the plaza edge; the PV planters line the boulevards,
     where they are shading a footway rather than decorating a square. */
  /* A fixed ring placed nothing: every radius that reads as "the plaza edge"
     is inside the plaza's own reservation, so all 26 samples were rejected and
     the kit silently never appeared. Walk each sample outward until it clears
     instead — the intent is "just outside whatever is already claimed here",
     which is a search, not a radius. */
  for (let i = 0; i < 30; i++) {
    const a = (i / 30) * Math.PI * 2 + DRNG() * 0.12;
    let x = 0, z = 0, ok = false;
    for (let r2 = 118; r2 <= 260 && !ok; r2 += 9) {
      x = Math.cos(a) * r2;
      z = 20 + Math.sin(a) * r2 * 0.8;
      ok = !inReserved(x, z) && !inScanSite(x, z);
    }
    if (ok) put('planterset', x, z, DRNG() * Math.PI * 2);
  }
  for (const r of ROADS) {
    if (r[5] !== 0) continue;                       // vehicular only
    const horiz = Math.abs(r[3] - r[1]) < Math.abs(r[2] - r[0]);
    const half = r[4] / 2 + 5.2;                    // just outside the kerb
    const len = horiz ? r[2] - r[0] : r[3] - r[1];
    const steps = Math.min(9, Math.max(2, Math.floor(Math.abs(len) / 96)));
    for (let s = 1; s <= steps; s++) {
      const t = s / (steps + 1);
      const cx = horiz ? r[0] + len * t : r[0];
      const cz = horiz ? r[1] : r[1] + len * t;
      for (const side of [-1, 1]) {
        const x = horiz ? cx : cx + side * half;
        const z = horiz ? cz + side * half : cz;
        if (inScanSite(x, z)) continue;
        put('pvplanter', x, z, horiz ? 0 : Math.PI / 2);
      }
    }
  }

  /* ---- the shuttle ------------------------------------------------------
     Four of them on the boulevards, in the kerbside lane, facing the way the
     traffic goes. Parked rather than driving: the district's life system moves
     people, not vehicles, and a stationary bus at a stop is a true image where
     a frozen bus mid-lane is not. */
  const SHUTTLES = [
    [-64, 104 - 6.2, Math.PI / 2], [128, 104 + 6.2, -Math.PI / 2],
    [-88 - 6.0, 232, 0], [88 + 6.0, 168, Math.PI],
  ];
  for (const [x, z, ry] of SHUTTLES) put('shuttle', x, z, ry);

  /* ---- palms with their own tree pit ------------------------------------
     The plaza's palms stand in paving, and the district was building a ring of
     kerb under each one. This asset arrives with the pit, the ring and the
     underplanting, so it takes over exactly the paved rows and leaves the
     planted ground to the bare palm. */
  const rows = [[-1, -1], [-1, 1], [1, -1], [1, 1]];
  for (const [sx, sz] of rows) {
    for (let i = 0; i < 7; i++) {
      const x = sx * (26 + i * 11.5), z = sz * (22 + (i % 3) * 15);
      if (inScanSite(x, z)) continue;
      put('palmpit', x, z, DRNG() * Math.PI * 2);
    }
  }

  INSTCOUNT.sustain = n;
}


/* ========================================================== NAVIGATION ==
   Look is direct: a mouse pixel is a fixed number of radians, applied to a
   target angle that the camera chases on a 28 ms time constant. It is not an
   impulse into an angular velocity — that is what made the view keep drifting
   after the mouse stopped and made the sensitivity depend on frame rate.
   Movement is exponential-smoothed toward a target velocity with the same
   frame-rate-independent form, so 30 fps and 144 fps feel identical.       */
const NAV = {
  mode: 'fly',
  pos: new THREE.Vector3(21, 5.4, -44),
  vel: new THREE.Vector3(),
  yaw: 0, pitch: 0,                 // what the camera is showing
  tYaw: 0, tPitch: 0,               // where the mouse has asked it to be
  keys: {},
  active: false,
  locked: false,
  eye: 1.68,
  groundY: 0,
  bob: 0, bobPhase: 0,
  sens: 0.0023,                     // radians per pixel
  flySpeed: 17,                     // metres per second, wheel-adjustable
  walkSpeed: 1.55,
  invertY: false,
};
const KEYMAP = {
  KeyW: 'f', KeyS: 'b', KeyA: 'l', KeyD: 'r',
  ArrowUp: 'f', ArrowDown: 'b', ArrowLeft: 'l', ArrowRight: 'r',
  KeyE: 'up', KeyQ: 'dn', Space: 'up', KeyC: 'dn', KeyZ: 'dn',
  ShiftLeft: 'run', ShiftRight: 'run',
};
const PITCH_LIMIT = { fly: 1.48, walk: 1.32 };

function navPose() {
  return {
    pos: NAV.pos.toArray().map(v => +v.toFixed(2)),
    yaw: +THREE.MathUtils.radToDeg(NAV.yaw).toFixed(1),
    pitch: +THREE.MathUtils.radToDeg(NAV.pitch).toFixed(1),
    mode: NAV.mode,
  };
}

function applyPose(p) {
  NAV.pos.fromArray(p.pos);
  NAV.yaw = NAV.tYaw = THREE.MathUtils.degToRad(p.yaw || 0);
  NAV.pitch = NAV.tPitch = THREE.MathUtils.degToRad(p.pitch || 0);
  NAV.vel.set(0, 0, 0);
  setMode(p.mode || 'fly', true);
  syncCam();
}

function syncCam() {
  cityCam.position.copy(NAV.pos);
  cityCam.rotation.set(0, 0, 0);
  cityCam.rotateY(NAV.yaw + Math.PI);     // yaw 0 = looking toward +Z
  cityCam.rotateX(NAV.pitch);
}

function setMode(m, silent) {
  NAV.mode = m;
  if (m === 'walk') {
    NAV.pos.y = groundAt(NAV.pos.x, NAV.pos.z, NAV.pos.y) + NAV.eye;
    NAV.vel.y = 0;
  }
  const lim = PITCH_LIMIT[m];
  NAV.pitch = clamp(NAV.pitch, -lim, lim);
  NAV.tPitch = clamp(NAV.tPitch, -lim, lim);
  if (ui.cityMode) ui.cityMode.textContent = m === 'walk' ? 'WALK' : 'FLY';
  updateHint();
  if (!silent) showToast(m === 'walk' ? 'Walking · F to fly' : 'Flying · F to walk');
}

function updateHint() {
  if (!ui.cityHint) return;
  const lock = NAV.locked
    ? '<b>Esc</b> release mouse'
    : '<b>click</b> to look · <b>drag</b> also works';
  ui.cityHint.innerHTML = NAV.mode === 'walk'
    ? `<b>W A S D</b> walk · <b>Shift</b> run · <b>F</b> fly · ${lock} · <b>Esc Esc</b> map`
    : `<b>W A S D</b> fly · <b>Q E</b> down / up · <b>Shift</b> boost · <b>wheel</b> speed · <b>F</b> walk · ${lock} · <b>Esc Esc</b> map`;
}

/* A mouse movement in pixels becomes an absolute change in the target angle.
   One convention, captured or dragged: moving the mouse right looks right and
   moving it down looks down. Two conventions in one control is one too many. */
function look(dx, dy) {
  NAV.tYaw += dx * NAV.sens;
  NAV.tPitch -= (NAV.invertY ? -dy : dy) * NAV.sens;
  const lim = PITCH_LIMIT[NAV.mode];
  NAV.tPitch = clamp(NAV.tPitch, -lim, lim);
}

function navUpdate(dt) {
  if (!NAV.active) return;
  const k = NAV.keys;
  const run = k.run ? 1 : 0;

  // ---- look: chase the target on a fixed time constant, frame-rate free
  const la = 1 - Math.exp(-dt / 0.028);
  // take the shortest way round so a fast flick never spins the long way
  let dy2 = NAV.tYaw - NAV.yaw;
  while (dy2 > Math.PI) { dy2 -= Math.PI * 2; NAV.tYaw -= Math.PI * 2; }
  while (dy2 < -Math.PI) { dy2 += Math.PI * 2; NAV.tYaw += Math.PI * 2; }
  NAV.yaw += dy2 * la;
  NAV.pitch += (NAV.tPitch - NAV.pitch) * la;

  // ---- move
  const walk = NAV.mode === 'walk';
  const spd = walk ? NAV.walkSpeed * (1 + run * 1.55) : NAV.flySpeed * (1 + run * 2.6);
  const fwd = (k.f ? 1 : 0) - (k.b ? 1 : 0);
  const str = (k.r ? 1 : 0) - (k.l ? 1 : 0);
  const vert = (k.up ? 1 : 0) - (k.dn ? 1 : 0);

  const cy = Math.cos(NAV.yaw), sy = Math.sin(NAV.yaw);
  const cp = Math.cos(NAV.pitch), sp = Math.sin(NAV.pitch);
  let dx, dyv, dz;
  /* forward is (sin yaw, cos yaw); right is its cross with up, which is
     (-cos yaw, sin yaw). Getting that sign wrong is what made D walk left. */
  if (walk) { dx = sy * fwd - cy * str; dyv = 0; dz = cy * fwd + sy * str; }
  else { dx = sy * cp * fwd - cy * str; dyv = sp * fwd + vert; dz = cy * cp * fwd + sy * str; }
  const l = Math.hypot(dx, dyv, dz);
  if (l > 0.0001) { dx /= l; dyv /= l; dz /= l; }
  // stopping is quicker than starting: that is what makes a walk feel planted
  const moving = l > 0.0001;
  const tau = walk ? (moving ? 0.085 : 0.055) : (moving ? 0.20 : 0.32);
  const ma = 1 - Math.exp(-dt / tau);
  V.set(dx * spd, dyv * spd, dz * spd);
  NAV.vel.lerp(V, ma);
  if (NAV.vel.lengthSq() < 1e-6) NAV.vel.set(0, 0, 0);

  const px0 = NAV.pos.x, pz0 = NAV.pos.z;
  NAV.pos.addScaledVector(NAV.vel, dt);

  if (walk) {
    const feet = NAV.pos.y - NAV.eye;
    const r = resolve(NAV.pos.x, NAV.pos.z, 0.42, feet);
    NAV.pos.x = r[0]; NAV.pos.z = r[1];
    for (let i = 0; i < WATERBODIES.length; i++) {
      const b = WATERBODIES[i];
      if (NAV.pos.x > b.x0 - 0.3 && NAV.pos.x < b.x1 + 0.3 && NAV.pos.z > b.z0 - 0.3 && NAV.pos.z < b.z1 + 0.3
          && groundAt(NAV.pos.x, NAV.pos.z, feet) < b.y + 0.45) {
        NAV.pos.x = px0; NAV.pos.z = pz0; NAV.vel.x *= 0.2; NAV.vel.z *= 0.2; break;
      }
    }
    /* Belt and braces: relaxation clears the plan to three points in 340k, all
       where two footprints overlap at a corner. Refusing any step that still
       lands inside makes it impossible rather than merely unlikely. */
    if (insideSolid(NAV.pos.x, NAV.pos.z, feet)) {
      NAV.pos.x = px0; NAV.pos.z = pz0; NAV.vel.x *= 0.15; NAV.vel.z *= 0.15;
    }
    const g = groundAt(NAV.pos.x, NAV.pos.z, NAV.pos.y - NAV.eye);
    NAV.groundY = g;
    // the step up on to a kerb or a stair is eased; the drop off one is faster
    const want = g + NAV.eye;
    const rise = want > NAV.pos.y;
    NAV.pos.y += (want - NAV.pos.y) * (1 - Math.exp(-dt / (rise ? 0.075 : 0.13)));
    const spdXZ = Math.hypot(NAV.vel.x, NAV.vel.z);
    NAV.bobPhase += dt * spdXZ * 2.6;
    const bobT = spdXZ > 0.15 ? Math.sin(NAV.bobPhase * 2) * 0.026 * clamp(spdXZ / 2.2, 0, 1.4) : 0;
    NAV.bob += (bobT - NAV.bob) * (1 - Math.exp(-dt / 0.05));
    NAV.pos.y += NAV.bob;
  } else {
    const g = groundAt(NAV.pos.x, NAV.pos.z) + 1.1;
    if (NAV.pos.y < g) { NAV.pos.y = g; if (NAV.vel.y < 0) NAV.vel.y = 0; }
    NAV.pos.y = Math.min(NAV.pos.y, 620);
  }
  const B = PLAN.bounds;
  NAV.pos.x = clamp(NAV.pos.x, B.x0 - 60, B.x1 + 60);
  NAV.pos.z = clamp(NAV.pos.z, B.z0 - 60, B.z1 + 60);
  syncCam();
}

/* ---------------------------------------------------------------- input */
function onKeyDown(e) {
  if (!NAV.active) return;
  if (e.ctrlKey || e.metaKey || e.altKey) return;
  const a = KEYMAP[e.code];
  if (a) { NAV.keys[a] = 1; e.preventDefault(); return; }
  if (e.code === 'KeyF') { setMode(NAV.mode === 'fly' ? 'walk' : 'fly'); e.preventDefault(); }
  if (e.code === 'KeyR') { NAV.tPitch = 0; e.preventDefault(); }          // level the horizon
}
function onKeyUp(e) {
  const a = KEYMAP[e.code];
  if (a) NAV.keys[a] = 0;
}
addEventListener('keydown', onKeyDown);
addEventListener('keyup', onKeyUp);
addEventListener('blur', () => { NAV.keys = {}; });

let dragging = false, lastX = 0, lastY = 0, downT = 0, moved = 0;
function onPointerDown(e) {
  if (!NAV.active || e.button !== 0) return;
  dragging = true; lastX = e.clientX; lastY = e.clientY; downT = performance.now(); moved = 0;
}
function onPointerUp(e) {
  if (!NAV.active) { dragging = false; return; }
  // a click that did not drag asks for pointer lock; a drag was a look
  if (dragging && moved < 5 && performance.now() - downT < 400 && !NAV.locked) {
    if (renderer.domElement.requestPointerLock) {
      try { renderer.domElement.requestPointerLock(); } catch (err) { }
    }
  }
  dragging = false;
}
function onPointerMove(e) {
  if (!NAV.active) return;
  if (NAV.locked) { look(e.movementX || 0, e.movementY || 0); return; }
  if (!dragging) return;
  const dx = e.clientX - lastX, dy = e.clientY - lastY;
  lastX = e.clientX; lastY = e.clientY;
  moved += Math.abs(dx) + Math.abs(dy);
  look(dx, dy);
}
function onWheel(e) {
  if (!NAV.active) return;
  e.preventDefault();
  const f = Math.exp(-e.deltaY * 0.0012);
  if (NAV.mode === 'fly') {
    NAV.flySpeed = clamp(NAV.flySpeed * f, 2.5, 140);
    showToast('Fly speed ' + NAV.flySpeed.toFixed(0) + ' m/s');
  } else {
    NAV.walkSpeed = clamp(NAV.walkSpeed * f, 0.6, 4.5);
    showToast('Walk speed ' + NAV.walkSpeed.toFixed(1) + ' m/s');
  }
}
document.addEventListener('pointerlockchange', () => {
  NAV.locked = document.pointerLockElement === renderer.domElement;
  document.body.classList.toggle('mouse-locked', NAV.locked);
  updateHint();
});
/* These were written and never attached, which is why looking around did
   nothing at all. They live on the canvas for the press and on the window for
   the release, so letting go outside the frame still ends a drag. */
renderer.domElement.addEventListener('pointerdown', onPointerDown);
addEventListener('pointerup', onPointerUp);
addEventListener('pointermove', onPointerMove);
renderer.domElement.addEventListener('wheel', onWheel, { passive: false });
renderer.domElement.addEventListener('contextmenu', (e) => { if (NAV.active) e.preventDefault(); });
;

/* ============================================================ TRANSITION ==
   One continuous move. The map camera dives into Al Khobar's light shaft, the
   shaft's own glare becomes the veil, the district is built inside the white,
   and the city camera falls out of the light onto the poster shot.        */
const DIVE = { t: 0, dur: 0, phase: 'off', from: null, target: null, builder: null, out: false };
let veil = 0;

function poseOfShot(s) { return { pos: s.pos.slice(), yaw: s.yaw, pitch: s.pitch, mode: s.mode }; }
const POSTER_CITY = { pos: [21, 5.4, -44], yaw: 4, pitch: 7.5, mode: 'fly' };

function beginBuild() {
  if (BUILT) return null;
  return buildSteps();
}

const _lookTmp = new THREE.Vector3();
/* Collected here rather than at module scope. The district's assets are two
   hundred megabytes and the map does not need one byte of them, so holding
   first paint until they arrive was simply the wrong order: the fetch starts
   when the app starts, the map renders as soon as it is built, and the wait —
   if there is any left by then — happens inside the dive veil, which is
   already up and already white. */
async function enter(opts) {
  opts = opts || {};
  if (!PROPS_DONE) { await PROPS_READY; PROPS_DONE = true; }
  controls.enabled = false;
  const pose = opts.pose || POSTER_CITY;
  if (opts.instant || QA.noveil) {
    let it = beginBuild();
    if (it) { while (!it.next().done) { } BUILT = true; }
    finishEnter(pose);
    veil = 0; DIVE.phase = 'off';
    return;
  }
  DIVE.phase = 'in';
  DIVE.t = 0; DIVE.dur = 3.35;
  DIVE.target = pose;
  DIVE.builder = beginBuild();
  document.body.classList.add('diving');
  // the map camera's own approach: straight at the beacon, accelerating
  const c = CITIES.find(x => x.name === 'Al Khobar');
  DIVE.from = { pos: camera.position.clone(), tgt: controls.target.clone() };
  DIVE.beacon = c.wpos.clone();
  ui.panel && document.body.classList.remove('panel-open');
  dimTarget = 0;
}

function finishEnter(pose) {
  sceneState = 'city';
  applyPose(pose);
  NAV.active = true;
  renderPass.scene = cityScene;
  renderPass.camera = cityCam;
  document.body.classList.add('in-city');
  document.body.classList.remove('diving');
  setCityGrade(1);
  CITIES.forEach(x => { x.labelObj.visible = false; });
}

function exit(instant) {
  if (sceneState !== 'city') return;
  NAV.active = false;
  NAV.keys = {};
  if (document.pointerLockElement) document.exitPointerLock();
  if (instant || QA.noveil) { finishExit(); veil = 0; DIVE.phase = 'off'; return; }
  DIVE.phase = 'out';
  DIVE.t = 0; DIVE.dur = 2.5;
  document.body.classList.add('diving');
}

function finishExit() {
  sceneState = 'map';
  controls.enabled = true;
  renderPass.scene = scene;
  renderPass.camera = camera;
  document.body.classList.remove('in-city');
  document.body.classList.remove('diving');
  setCityGrade(0);
  markIdle();
}

function setCityGrade(k) {
  // k=0 map grade, k=1 district grade. Crossfaded during the dive.
  renderer.toneMappingExposure = mix(1.00, 0.88, k);
  bloom.strength = mix(BLOOM_MAP.s, 0.40, k);
  bloom.threshold = mix(BLOOM_MAP.t, 0.92, k);
  bloom.radius = mix(BLOOM_MAP.r, 0.55, k);
  grade.uniforms.uCity.value = k;
}

function diveUpdate(dt) {
  if (DIVE.phase === 'off') return;
  DIVE.t += dt;
  const k = clamp(DIVE.t / DIVE.dur, 0, 1);
  if (DIVE.phase === 'in') {
    // 0.00-0.42 map approach   0.34-0.62 veil peak + build   0.55-1.0 city fall
    const a = sstep(0, 0.44, k);
    const ease = a * a * (3 - 2 * a);
    const b = DIVE.beacon;
    const p0 = DIVE.from.pos;
    const approach = new THREE.Vector3(
      mix(p0.x, b.x + 2, ease), mix(p0.y, b.y + 15, Math.pow(ease, 1.5)), mix(p0.z, b.z + 12, ease));
    camera.position.copy(approach);
    _lookTmp.lerpVectors(DIVE.from.tgt, b, ease);
    camera.lookAt(_lookTmp);
    veil = sstep(0.16, 0.46, k) * (1 - sstep(0.62, 0.96, k));
    setCityGrade(sstep(0.30, 0.75, k));
    if (DIVE.builder && k > 0.24) {
      const budget = performance.now() + 12;
      while (performance.now() < budget) {
        const s = DIVE.builder.next();
        if (s.done) { DIVE.builder = null; BUILT = true; break; }
      }
    }
    if (k >= 0.50 && sceneState !== 'city') {
      if (DIVE.builder) { while (!DIVE.builder.next().done) { } DIVE.builder = null; BUILT = true; }
      finishEnter(DIVE.target);
      // start high inside the shaft and fall to the poster pose
      NAV.pos.set(DIVE.target.pos[0] - 6, DIVE.target.pos[1] + 118, DIVE.target.pos[2] - 42);
      NAV.pitch = THREE.MathUtils.degToRad(-32);
      NAV.active = false;
    }
    if (sceneState === 'city') {
      const f = sstep(0.50, 1.0, k);
      const e = f < 0.5 ? 2 * f * f : 1 - Math.pow(-2 * f + 2, 2.2) / 2;
      const tp = DIVE.target;
      NAV.pos.set(
        mix(tp.pos[0] - 6, tp.pos[0], e),
        mix(tp.pos[1] + 118, tp.pos[1], Math.pow(e, 0.82)),
        mix(tp.pos[2] - 42, tp.pos[2], e));
      NAV.yaw = THREE.MathUtils.degToRad(tp.yaw);
      NAV.pitch = mix(THREE.MathUtils.degToRad(-32), THREE.MathUtils.degToRad(tp.pitch), e);
      syncCam();
    }
    if (k >= 1) { DIVE.phase = 'off'; veil = 0; NAV.active = true; setMode(DIVE.target.mode || 'fly', true); }
  } else {
    veil = sstep(0.0, 0.34, k) * (1 - sstep(0.58, 0.94, k));
    setCityGrade(1 - sstep(0.32, 0.78, k));
    if (sceneState === 'city') {
      NAV.pos.y += dt * 70 * (0.4 + k);
      NAV.pitch = mix(NAV.pitch, -0.5, Math.min(1, dt * 1.6));
      syncCam();
      if (k >= 0.46) {
        finishExit();
        camera.position.copy(CITY_RETURN.pos); controls.target.copy(CITY_RETURN.tgt);
        controls.enabled = true; controls.update();
      }
    }
    if (k >= 1) { DIVE.phase = 'off'; veil = 0; }
  }
}

/* ------------------------------------------------------------ public API */
/* async for the same reason `enter` is: the first jump into the city may have
   to collect the district's assets, and everything downstream of that has to
   wait for it rather than snapshot an empty scene */
async function goShot(s, instant) {
  const pose = poseOfShot(s);
  if (sceneState !== 'city') {
    await enter(instant ? { instant: true, pose } : { pose });
  } else {
    applyPose(pose);
  }
}

/* ====================================================== PLANAR REFLECTION ==
   Still water that does not reflect is a painted floor. The channel, the
   reflecting pool and the sail basin are three of the best things in the plan
   and all three read as flat cyan slabs without this.

   So: one mirrored render per frame into a half-resolution target, taken about
   the plane of whichever water body is nearest, with the projection matrix
   skewed so its near plane *is* the water surface — nothing below the surface
   can leak into its own reflection. The water shader then projects that target
   and lets the ripple normal distort the lookup.

   It is paid for by distance: the mirror camera's far plane is 340 m, not the
   1,900 m the eye camera uses, so the tiled fabric mostly culls out. At this
   fog density anything past 340 m contributes a flat wash anyway, which is
   exactly what the Fresnel sky term already gives it. And the pass is skipped
   outright whenever no water body is inside the view frustum.            */
const REFL = {
  on: !QA.norefl, rt: null, cam: new THREE.PerspectiveCamera(),
  tex: new THREE.Matrix4(), y: 0, live: 0, w: 0, h: 0,
};
const _rNrm = new THREE.Vector3(0, 1, 0);
const _rPln = new THREE.Vector3();
const _rView = new THREE.Vector3();
const _rTgt = new THREE.Vector3();
const _rLook = new THREE.Vector3();
const _rRot = new THREE.Matrix4();
const _rClip = new THREE.Plane();
const _rCV = new THREE.Vector4();
const _rQ = new THREE.Vector4();
const _rFrus = new THREE.Frustum();
const _rMat = new THREE.Matrix4();
const _rBox = new THREE.Box3();

function reflectionTarget() {
  const w = Math.max(160, Math.min(1120, Math.floor(renderer.domElement.width * 0.5)));
  const h = Math.max(120, Math.min(700, Math.floor(renderer.domElement.height * 0.5)));
  if (!REFL.rt || REFL.w !== w || REFL.h !== h) {
    if (REFL.rt) REFL.rt.dispose();
    REFL.rt = new THREE.WebGLRenderTarget(w, h, {
      minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter,
      type: THREE.HalfFloatType, depthBuffer: true, generateMipmaps: false,
    });
    REFL.rt.texture.colorSpace = THREE.NoColorSpace;
    REFL.w = w; REFL.h = h;
  }
  return REFL.rt;
}

/* which water body is worth mirroring: the nearest one whose box is in view */
function reflectionPlane() {
  if (!WATERBODIES.length) return null;
  _rMat.multiplyMatrices(cityCam.projectionMatrix, cityCam.matrixWorldInverse);
  _rFrus.setFromProjectionMatrix(_rMat);
  const p = cityCam.position;
  let best = null, bestD = Infinity;
  for (const b of WATERBODIES) {
    if (p.y < b.y + 0.05) continue;                   // standing in it, not on it
    const dx = Math.max(b.x0 - p.x, 0, p.x - b.x1);
    const dz = Math.max(b.z0 - p.z, 0, p.z - b.z1);
    const d = dx * dx + dz * dz;
    /* how far a reflection is worth paying for scales with how high you are.
       Walking in the souq the channel is forty metres away behind two hundred
       metres of building, and mirroring the district for it is a whole extra
       pass for pixels that do not exist. */
    const maxD = Math.min(300, 70 + p.y * 2.6);
    if (d >= bestD || d > maxD * maxD) continue;
    _rBox.min.set(b.x0, b.y - 0.4, b.z0);
    _rBox.max.set(b.x1, b.y + 0.4, b.z1);
    if (!_rFrus.intersectsBox(_rBox)) continue;
    best = b; bestD = d;
  }
  return best;
}

function renderReflection() {
  const body = REFL.on ? reflectionPlane() : null;
  if (!body) { REFL.live = 0; _wu(waterMat).uReflOn.value = 0; return; }
  REFL.y = body.y;
  const rt = reflectionTarget();
  const cam = REFL.cam;

  /* the mirrored camera. Reflecting the up vector as well as the position and
     the target is what keeps the handedness right — a rotation alone would
     give a laterally flipped image that looks almost, but not quite, correct. */
  _rPln.set(0, REFL.y, 0);
  _rView.subVectors(_rPln, cityCam.position).reflect(_rNrm).negate().add(_rPln);
  _rRot.extractRotation(cityCam.matrixWorld);
  _rLook.set(0, 0, -1).applyMatrix4(_rRot).add(cityCam.position);
  _rTgt.subVectors(_rPln, _rLook).reflect(_rNrm).negate().add(_rPln);
  cam.position.copy(_rView);
  cam.up.set(0, 1, 0).applyMatrix4(_rRot).reflect(_rNrm);
  cam.lookAt(_rTgt);
  cam.far = 340;
  cam.near = cityCam.near;
  cam.fov = cityCam.fov;
  cam.aspect = cityCam.aspect;
  cam.updateMatrixWorld(true);
  cam.updateProjectionMatrix();

  /* Lengyel's oblique near plane: fold the clip plane into the projection so
     the near plane lies exactly on the water */
  _rClip.setFromNormalAndCoplanarPoint(_rNrm, _rPln).applyMatrix4(cam.matrixWorldInverse);
  _rCV.set(_rClip.normal.x, _rClip.normal.y, _rClip.normal.z, _rClip.constant);
  const P = cam.projectionMatrix;
  _rQ.set((Math.sign(_rCV.x) + P.elements[8]) / P.elements[0],
    (Math.sign(_rCV.y) + P.elements[9]) / P.elements[5],
    -1.0, (1.0 + P.elements[10]) / P.elements[14]);
  _rCV.multiplyScalar(2.0 / _rCV.dot(_rQ));
  P.elements[2] = _rCV.x;
  P.elements[6] = _rCV.y;
  P.elements[10] = _rCV.z + 1.0 - 0.004;
  P.elements[14] = _rCV.w;

  REFL.tex.set(0.5, 0, 0, 0.5, 0, 0.5, 0, 0.5, 0, 0, 0.5, 0.5, 0, 0, 0, 1);
  REFL.tex.multiply(P).multiply(cam.matrixWorldInverse);

  const oldTarget = renderer.getRenderTarget();
  const autoShadow = renderer.shadowMap.autoUpdate;
  // on the very first frame the eye pass has not run yet, so there is no
  // shadow map to reuse; suppressing the update then binds a default texture
  // to a shadow sampler, which is a driver error, loudly, once per draw
  const haveShadow = !!(citySun.shadow && citySun.shadow.map);
  if (haveShadow) renderer.shadowMap.autoUpdate = false;
  citySky.position.copy(cam.position);
  for (const w of WATERMESHES) w.visible = false;
  renderer.setRenderTarget(rt);
  renderer.clear();
  renderer.render(cityScene, cam);
  renderer.setRenderTarget(oldTarget);
  for (const w of WATERMESHES) w.visible = true;
  renderer.shadowMap.autoUpdate = autoShadow;
  citySky.position.copy(cityCam.position);

  _wu(waterMat).uRefl.value = rt.texture;
  _wu(waterMat).uReflMtx.value.copy(REFL.tex);
  _wu(waterMat).uReflOn.value = 1;
  _wu(waterMat).uReflY.value = REFL.y;
  REFL.live = 1;
}

/* ---------------------------------------------------------- focus pull --
   What the camera is pointed at, in metres. The view ray is marched against
   the district's own ground and colliders with a step that grows with
   distance, so a nearby wall costs a handful of tests and an empty street
   costs a few dozen. The result is damped: a lens does not snap. */
const _fRay = new THREE.Vector3();
let FOCUS = 18;
function focusRay(dx, dy, dz, p) {
  let t = 1.6, step = 0.7;
  for (let i = 0; i < 120 && t < 200; i++) {
    const x = p.x + dx * t, y = p.y + dy * t, z = p.z + dz * t;
    if (y <= groundAt(x, z) + 0.12) return t;
    if (insideSolid(x, z, y)) return t;
    t += step;
    step = Math.min(6.5, step * 1.055);
  }
  return 200;
}
function focusProbe() {
  cityCam.getWorldDirection(_fRay);
  const p = cityCam.position;
  const a = focusRay(_fRay.x, _fRay.y, _fRay.z, p);
  /* and a second ray seven degrees down. Looking level along a street the
     centre ray runs to the horizon, and focusing at two hundred metres throws
     the ground you are standing on out of focus — which is not what anybody
     pointing a camera down a street would do. */
  const fl = Math.hypot(_fRay.x, _fRay.z) || 1;
  const c = Math.cos(0.122), s = Math.sin(0.122);
  const b = focusRay(_fRay.x / fl * (fl * c), _fRay.y * c - fl * s, _fRay.z / fl * (fl * c), p);
  return Math.min(48, Math.max(3.5, Math.min(a, b)));
}
function focusDistance() { return FOCUS; }

/* ----------------------------------------------------------- shadow cost *
   The shadow map was re-rendering every frame: the whole district drawn a
   second time, from the sun, at 4096. renderer.info counts that pass, which
   is a large part of why a plaza view measured 108 M triangles — most of the
   district was in there twice.

   Almost nothing in this district moves. The shadow map only genuinely needs
   redrawing when the viewer travels (the shadow camera follows them) or when
   the walkers have moved far enough for their shadows to lag visibly. So it
   updates on movement, and otherwise on a fixed cadence rather than every
   frame — 20 Hz of shadow against 60 Hz of image is a trade games have been
   making for twenty years and it is invisible at this scale. */
const SHADOW_EVERY = 3;
let _shFrame = 0;
const _shLast = new THREE.Vector3(1e9, 1e9, 1e9);
function shadowCadence() {
  if (QA.noshadow) return;
  renderer.shadowMap.autoUpdate = false;
  const moved = _shLast.distanceToSquared(cityCam.position) > 2.25;   // 1.5 m
  if (moved || (_shFrame % SHADOW_EVERY) === 0) {
    renderer.shadowMap.needsUpdate = true;
    _shLast.copy(cityCam.position);
  }
  _shFrame++;
}

function update(dt, t) {
  diveUpdate(dt);
  if (sceneState === 'city') {
    navUpdate(dt);
    // pick a detail level per tile before anything is drawn from this pose
    lodUpdate(cityCam.position);
    shadowCadence();
    /* `.uniforms` on a ShaderMaterial, `.userData.u` on the node material the
       seam substitutes — the same handle under the two renderers' own spellings */
    (citySkyMat.uniforms || citySkyMat.userData.u).uTime.value = t;
    for (const m of PROBE_MATS) m.userData.u.uTime.value = t;
    citySky.position.copy(cityCam.position);
    fitShadow(cityCam.position);
    updatePracticals(cityCam.position);
    updateLife(dt, t);
    const want = focusProbe();
    // a fast pull toward something nearer, a slower drift back out
    const k = 1 - Math.exp(-dt * (want < FOCUS ? 7.0 : 3.2));
    FOCUS += (want - FOCUS) * k;
  }
  grade.uniforms.uVeil.value = veil;
}

function hudInfo() {
  if (sceneState !== 'city') return null;
  const o = { mode: NAV.mode, pos: NAV.pos.toArray().map(v => v.toFixed(0)).join(' ') };
  for (const k in INSTCOUNT) o[k] = INSTCOUNT[k];
  return o;
}

/* QA: is a point inside any building footprint it should not be inside? */
function insideSolid(x, z, feetY) {
  const gi = Math.floor(x / CCELL), gj = Math.floor(z / CCELL);
  for (let di = -1; di <= 1; di++) for (let dj = -1; dj <= 1; dj++) {
    const arr = CGRID.get((gi + di) + ',' + (gj + dj));
    if (!arr) continue;
    for (const c of arr) {
      if (c.top <= feetY + 0.4) continue;
      const dx = x - c.x, dz = z - c.z;
      const lx = dx * c.ca + dz * c.sa, lz = -dx * c.sa + dz * c.ca;
      if (lx > -c.hw && lx < c.hw && lz > -c.hd && lz < c.hd) return true;
    }
  }
  return false;
}

return {
  enter, exit, goShot, update, hudInfo,
  debug: {
    insideSolid, groundAt, resolve,
    platforms: () => PLATFORMS.length, colliders: () => COLLIDERS.length,
    /* deterministic control probe: set a pose, hold a key set, and step the
       navigator by a fixed dt. Wall-clock tests of a controller are only ever
       testing the frame rate of the machine running them. */
    sim(keys, dt, steps, pose) {
      if (pose) {
        NAV.pos.set(pose[0], pose[1], pose[2]);
        NAV.yaw = NAV.tYaw = pose[3] || 0;
        NAV.pitch = NAV.tPitch = pose[4] || 0;
        NAV.vel.set(0, 0, 0);
      }
      const was = NAV.keys, wasActive = NAV.active;
      NAV.keys = {}; for (const k of keys) NAV.keys[k] = 1;
      NAV.active = true;
      for (let i = 0; i < steps; i++) navUpdate(dt);
      NAV.keys = was; NAV.active = wasActive;
      return { x: NAV.pos.x, y: NAV.pos.y, z: NAV.pos.z, yaw: NAV.yaw, pitch: NAV.pitch };
    },
    look(dx, dy, steps) {
      look(dx, dy);
      for (let i = 0; i < (steps || 30); i++) navUpdate(1 / 60);
      return { yaw: NAV.yaw, pitch: NAV.pitch, tYaw: NAV.tYaw, tPitch: NAV.tPitch };
    }, waterAt: (x, z) => WATERBODIES.some(b => x > b.x0 && x < b.x1 && z > b.z0 && z < b.z1),
    /* Every instanced object's real world size, in metres, measured off the
       instance matrices rather than off the source geometry — a kit part is
       only ever the size the call site scaled it to. Scale errors are
       invisible by eye and obvious in this table, which is the whole reason
       it exists: `node tests/scale_audit.mjs` reads it and diffs it against
       the sizes the reference renders imply. */
    furniture: () => FURNITURE,
    /* Per-object culling state, for when the frame cost will not move as the
       camera does. A chunked tile is 130 m across, so its bounding sphere
       should have a radius near 65 m plus the prop's own size; anything in the
       hundreds means the tile spans the district and the culler can never
       reject it, which is the difference between chunking that works and
       chunking that only looks like it does. */
    cullinfo() {
      const out = [];
      cityRoot.traverse((o) => {
        if (!o.isInstancedMesh || !o.count) return;
        const bs = o.boundingSphere;
        out.push({
          name: o.name, n: o.count, culled: o.frustumCulled,
          r: bs ? +bs.radius.toFixed(1) : null,
          c: bs ? [+bs.center.x.toFixed(0), +bs.center.z.toFixed(0)] : null,
        });
      });
      out.sort((a, b) => (b.r || 0) - (a.r || 0));
      return { meshes: out.length, widest: out.slice(0, 12),
        uncullable: out.filter((x) => !x.culled).length };
    },
    sizes() {
      const out = {};
      const bb = new THREE.Box3(), b2 = new THREE.Box3(), m = new THREE.Matrix4();
      cityRoot.traverse((o) => {
        if (!o.isInstancedMesh || !o.count) return;
        o.geometry.computeBoundingBox();
        bb.copy(o.geometry.boundingBox);
        const rows = [];
        const n = Math.min(o.count, 32);
        for (let i = 0; i < n; i++) {
          o.getMatrixAt(Math.floor((i + 0.5) * o.count / n), m);
          b2.copy(bb).applyMatrix4(m);
          rows.push([b2.max.y - b2.min.y, b2.max.x - b2.min.x, b2.max.z - b2.min.z]);
        }
        rows.sort((p, q) => p[0] - q[0]);
        const md = rows[rows.length >> 1];
        out[o.name] = { n: o.count, h: +md[0].toFixed(2), w: +md[1].toFixed(2), d: +md[2].toFixed(2) };
      });
      return out;
    } },
  get diving() { return DIVE.phase !== 'off'; },
  pose: navPose,
  get built() { return BUILT; },
  reflect: renderReflection,
  focus: focusDistance,
  shops: () => SHOPS,
  scene: cityScene, cam: cityCam, nav: NAV,
  setMode,
  plan: PLAN,
};
})();
SCENES.city = CITY;


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
