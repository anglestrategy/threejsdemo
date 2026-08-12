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
function Acc() { this.pos = []; this.nrm = []; this.uv = []; this.col = []; this.srf = []; this.idx = []; this.n = 0; }
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
  const gi = geo.index;
  if (gi) { for (let i = 0; i < gi.count; i++) this.idx.push(base + gi.getX(i)); }
  else { for (let i = 0; i < cnt; i++) this.idx.push(base + i); }
  this.n += cnt;
  return this;
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
const TEXPACK = /*@TEXTURES@*/;
const TEX = {};
(function loadDetail() {
  const ld = new THREE.TextureLoader();
  for (const k in TEXPACK) {
    const d = ld.load(TEXPACK[k].diff);
    d.wrapS = d.wrapT = THREE.RepeatWrapping;
    d.colorSpace = THREE.SRGBColorSpace;
    d.anisotropy = 8;
    const n = ld.load(TEXPACK[k].nrm);
    n.wrapS = n.wrapT = THREE.RepeatWrapping;
    n.anisotropy = 8;
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
const PROBE_MATS = [];
/* Panels generated from the renders and baked to alpha-cutout imposters by
   `gen_imposter.py`. A mashrabiya is 22,000 triangles of real lattice and this
   district wants two hundred and sixty of them — but it is a flat thing, and
   from more than a couple of metres a quad carrying its own colour with its own
   holes punched out of the alpha is the same picture for two triangles. */
const PANELPACK = /*@PANELS@*/;
const PANELS = {};
{
  const ld = new THREE.TextureLoader();
  for (const k in PANELPACK) {
    const t = ld.load(PANELPACK[k].tex);
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = 8;
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
      // the far level, where the intake produced one
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
}

const MODELPACK = /*@MODELS@*/;
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
  const zen = [0.063, 0.102, 0.231], mid = [0.239, 0.271, 0.431], hor = [0.761, 0.643, 0.584];
  const p = Math.pow(up, 0.62);
  let r = mid[0] + (zen[0] - mid[0]) * p;
  let g = mid[1] + (zen[1] - mid[1]) * p;
  let b = mid[2] + (zen[2] - mid[2]) * p;
  const hz = Math.pow(1 - up, 5.0);
  r = r + (hor[0] - r) * hz * 0.92; g = g + (hor[1] - g) * hz * 0.92; b = b + (hor[2] - b) * hz * 0.92;
  const sd = Math.max(dx * CSUN.x + dy * CSUN.y + dz * CSUN.z, 0);
  const glow = Math.pow(sd, 5.0) * 0.55 * (0.35 + 0.65 * hz) + Math.pow(sd, 24.0) * 0.7;
  return [r + 1.00 * glow, g + 0.82 * glow, b + 0.63 * glow];
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
const PLAN = {
  bounds: { x0: -470, x1: 470, z0: -250, z1: 700 },
  ring: 400,                       // perimeter road half-extent
  plaza: { x0: -112, x1: 112, z0: -78, z1: 122 },
  canopy: { x0: -104, x1: 104, z0: -66, z1: 112, h: 15.4 },
  water:  { x: -34, w: 5.4 },      // the main north-south channel
  souq:   { x0: -74, x1: 74, z0: 132, z1: 348 },
  spineX: 4,                       // the souq's walking centreline
  enter:  { x0: 96, x1: 322, z0: 118, z1: 366 },
  comm:   { x0: -336, x1: -104, z0: 118, z1: 366 },
  court:  { x0: -282, x1: -166, z0: 178, z1: 282 },   // colonnade courtyard
  tensile:{ x0: -296, x1: -132, z0: -74, z1: 88 },    // shade-sail water court
  resN:   { x0: -340, x1: 336, z0: 392, z1: 640 },
  resS:   { x0: 150, x1: 430, z0: -230, z1: 96 },
  resW:   { x0: -450, x1: -356, z0: -120, z1: 340 },
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
  [-420, 104, 420, 104, 21, 0],        // Canopy Boulevard, east-west
  [-420, 378, 420, 378, 19, 0],        // North Boulevard
  [-420, -96, 420, -96, 18, 0],        // South Boulevard
  [-88, -240, -88, 690, 18, 0],        // West Avenue
  [88, -240, 88, 690, 18, 0],          // East Avenue
  [-352, -240, -352, 690, 15, 0],      // Commercial edge street
  [212, -240, 212, 690, 15, 0],        // Entertainment edge street
  [-420, 250, 420, 250, 12, 2],        // mid service street
  [-420, 520, 420, 520, 15, 0],        // residential street
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
const SURF_GLSL = `
  float h11(float p){ p=fract(p*0.1031); p*=p+33.33; p*=p+p; return fract(p); }
  float h21(vec2 p){ vec3 q=fract(vec3(p.xyx)*0.1031); q+=dot(q,q.yzx+33.33); return fract((q.x+q.y)*q.z); }
  float vn2(vec2 p){ vec2 i=floor(p),f=fract(p); f=f*f*(3.0-2.0*f);
    return mix(mix(h21(i),h21(i+vec2(1,0)),f.x),mix(h21(i+vec2(0,1)),h21(i+vec2(1,1)),f.x),f.y); }
  float fb2(vec2 p){ float s=0.0,a=0.5; for(int i=0;i<4;i++){ s+=a*vn2(p); p*=2.03; a*=0.52; } return s; }
  float fb3(vec2 p){ float s=0.0,a=0.5; for(int i=0;i<3;i++){ s+=a*vn2(p); p*=2.11; a*=0.5; } return s; }

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
      float joint = smoothstep(0.0, 0.016, e);        // 16 mm recessed joint
      float stone = h21(vec2(floor((q.x + off) / bl), row) * 1.37);
      grain = stone;
      cav = joint;
      // each block sits a little proud or shy of its neighbours, and its face
      // is not flat: that is what separates coursed stone from a grid
      float face = 0.55 + 0.45 * fb2(q * 22.0 + stone * 30.0);
      return joint * (0.55 + 0.45 * stone) * 0.55 + face * 0.30 * joint;
    } else if (s < 1.5) {                            // RENDER, mud plaster
      float t = fb2(q * 3.2) * 0.55 + fb2(q * 14.0) * 0.30 + fb2(q * 46.0) * 0.15;
      grain = t; cav = 0.55 + 0.45 * t;
      return t;
    } else if (s < 2.5) {                            // BRICK
      float ch = 0.082, cw = 0.235;
      float row = floor(q.y / ch);
      float sft = mod(row, 2.0) * 0.5 * cw;
      float jx = fract((q.x + sft) / cw), jy = fract(q.y / ch);
      float e = min(min(jx, 1.0 - jx) * cw, min(jy, 1.0 - jy) * ch);
      float mortar = smoothstep(0.0, 0.011, e);
      float bk = h21(vec2(floor((q.x + sft) / cw), row) * 1.91);
      grain = bk; cav = mortar;
      return mortar * (0.62 + 0.38 * bk) * 0.72 + 0.16 * fb2(q * 40.0) * mortar;
    } else if (s < 3.5) {                            // TIMBER
      float board = floor(q.y * 5.2);
      float bj = fract(q.y * 5.2);
      float groove = smoothstep(0.0, 0.06, min(bj, 1.0 - bj));
      float gr = fb2(vec2(q.x * 2.2, q.y * 60.0));
      grain = gr; cav = groove;
      return groove * (0.6 + 0.4 * gr) * 0.5 + h11(board * 5.1) * 0.12 * groove;
    } else if (s < 4.5) {                            // TRAVERTINE
      float sw = 2.3, sh = 1.15;
      float jx = fract(q.x / sw), jy = fract(q.y / sh);
      float e = min(min(jx, 1.0 - jx) * sw, min(jy, 1.0 - jy) * sh);
      float joint = smoothstep(0.0, 0.010, e);
      float band = fb2(vec2(q.x * 0.9, q.y * 9.0));
      float pit = smoothstep(0.62, 0.92, fb2(q * 26.0));   // the travertine pores
      grain = band; cav = joint * (1.0 - pit * 0.7);
      return joint * (0.72 + 0.28 * band) * 0.42 - pit * 0.22;
    } else if (s < 5.5) {                            // CONCRETE / white render
      float t = fb2(q * 4.2) * 0.6 + fb2(q * 19.0) * 0.4;
      grain = t; cav = 0.7 + 0.3 * t;
      return t * 0.6;
    } else if (s < 6.5) {                            // METAL, brushed
      float t = fb2(vec2(q.x * 90.0, q.y * 4.0));
      grain = t; cav = 1.0;
      return t * 0.25;
    } else if (s < 7.5) {                            // PAVING, irregular flags
      vec2 warp = vec2(fb3(q * 0.28), fb3(q * 0.28 + 19.0)) - 0.5;
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
      float edge = smoothstep(0.0, 0.038, second - best);
      float slab = h21(bid * 1.13);
      grain = slab; cav = edge;
      // every flag is laid a little high or low, and its face is worn
      return edge * (0.5 + 0.5 * slab) * 0.5 + edge * 0.22 * fb2(q * 9.0);
    } else if (s < 8.5) {                            // SAND
      float d = fb2(q * 0.9) * 0.6 + fb2(q * 6.0) * 0.4;
      grain = d; cav = 1.0;
      return d;
    } else if (s < 9.5) {                            // ASPHALT
      float g2 = fb2(q * 26.0) * 0.6 + fb2(q * 90.0) * 0.4;
      grain = g2; cav = 0.8 + 0.2 * g2;
      return g2 * 0.5;
    } else if (s < 10.5) {                           // FABRIC
      /* A woven cloth at two metres is smooth. The weave of a thobe is
         sub-millimetre; what you actually see at conversational distance is
         the drape. This was a 3 cm chequer at full amplitude, which put
         gingham on every figure, every awning and every cushion in the
         district — the single loudest wrong note in the near field. */
      float fold = fb2(q * 5.5) * 0.62 + fb2(q * 17.0) * 0.38;
      float w = 0.5 + 0.5 * sin(q.x * 1300.0) * sin(q.y * 1300.0);
      grain = 0.34 + 0.66 * fold; cav = 1.0;
      return fold * 0.52 + w * 0.055;
    }
    grain = fb2(q * 4.0); cav = 1.0;                 // FOLIAGE
    return grain;
  }
`;

function makeCityMaterial(cacheKey) {
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
    uProbeInt: { value: 1.05 },
    uFogWarm: { value: new THREE.Color(0xd9a878) }, uFogCool: { value: new THREE.Color(0x7286a8) },
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
        float e = 0.006 + dist * 0.00035;
        float h0 = srfH(uvw, s, cav, grain);
        float hx = srfH(uvw + vec2(e, 0.0), s, cavx, gx);
        float hy = srfH(uvw + vec2(0.0, e), s, cavy, gy);
        // relief fades with distance so it never aliases into noise
        float rel = (1.0 - smoothstep(26.0, 95.0, dist)) * (s > 10.5 ? 0.0 : 1.0);
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
        alb *= mix(vec3(1.0), gA, 0.58 * dw) * mix(vec3(1.0), gB, 0.34 * dw);

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
        float macro = fb2(vWP.xz * 0.045) * 0.62 + fb3(vWP.xz * 0.011) * 0.38;
        alb *= 0.84 + 0.34 * macro;

        // ---- albedo and roughness follow the same height field, so the
        //      recesses are dark and matt exactly where they are recessed
        float foli = step(10.5, s);
        float dk = mix(1.0, cav, 0.72 * (0.35 + 0.65 * rel) * (1.0 - foli));
        alb *= mix(0.62 + 0.55 * dk, 1.0, foli);
        alb *= mix(0.80 + 0.42 * grain, 0.90 + 0.26 * grain, foli);
        // leaves are thin: they pass light, so a canopy never goes to black
        alb += foli * vec3(0.070, 0.105, 0.038) * (0.45 + 0.55 * grain);
        rough = clamp(rough * (1.10 - 0.28 * grain) + (1.0 - cav) * 0.20, 0.05, 1.0);

        if (s > 1.5 && s < 2.5) alb = mix(alb, alb * vec3(1.08, 0.95, 0.88), grain);
        if (s > 3.5 && s < 4.5) alb *= 0.94 + 0.16 * grain;
        if (s > 5.5 && s < 6.5) { gMetal = 0.44; rough = 0.26 + 0.34 * grain; }

        // ---- micro band: hue and value jitter, everywhere, at 6-40 cm
        float micro = fb3(vWP.xz * 3.7 + vWP.y * 2.1);
        alb *= 0.945 + 0.11 * micro;
        /* ground-contact weathering: every vertical surface darkens and
           desaturates in the first 900 mm, warmer where the ground bounces,
           and the splash line is uneven because rain is uneven */
        float splash = 0.55 + 0.45 * fb2(vec2(vWP.x, vWP.z) * 1.7);
        float lowT = smoothstep(0.95 * splash, 0.02, vWP.y) * (1.0 - aN.y);
        alb = mix(alb, alb * vec3(0.72, 0.69, 0.63), lowT * 0.55);

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
   flickers as you walk past it. */
function makeModelMaterial(src, foliage) {
  const mat = new THREE.MeshStandardMaterial({
    map: src.map || null, normalMap: foliage ? null : (src.normalMap || null),
    roughnessMap: foliage ? null : (src.roughnessMap || null),
    aoMap: foliage ? null : (src.aoMap || null),
    color: 0xffffff, roughness: foliage ? 0.88 : 0.94, metalness: 0.0,
    side: THREE.DoubleSide, envMapIntensity: 1.0, fog: true,
    transparent: false,
    alphaTest: src.alphaTest > 0 ? src.alphaTest : (foliage && src.map ? 0.42 : 0),
  });
  if (mat.map) mat.map.anisotropy = 8;
  mat.userData.u = {
    uTime: { value: 0 }, uWind: { value: new THREE.Vector2(0.85, 0.32) },
    uSway: { value: foliage ? 1 : 0 },
    uProbeSky: { value: null }, uProbeGnd: { value: null },
    uProbeOrg: { value: new THREE.Vector3() }, uProbeStp: { value: new THREE.Vector3(1, 1, 1) },
    uProbeDim: { value: new THREE.Vector3(1, 1, 1) }, uProbeOn: { value: 0 },
    uProbeInt: { value: 1.05 },
    uFogWarm: { value: new THREE.Color(0xd9a878) }, uFogCool: { value: new THREE.Color(0x7286a8) },
    uFogScaleH: { value: 150 },
    uSunW: { value: CSUN.clone() },
  };
  mat.onBeforeCompile = (sh) => {
    for (const k in mat.userData.u) sh.uniforms[k] = mat.userData.u[k];
    sh.vertexShader = `uniform float uTime, uSway; uniform vec2 uWind; varying vec3 vMWP;
      float mwh(vec3 p){ return fract(sin(dot(p,vec3(12.99,78.23,37.71)))*43758.5453); }\n` +
      sh.vertexShader.replace('#include <begin_vertex>', `#include <begin_vertex>
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
      uniform float uFogScaleH;
      /* mean aerosol density along the ray, from an exponential atmosphere of
         scale height uFogScaleH sampled at both ends */
      float FOG_H(float wy) {
        float hAvg = 0.5 * (cameraPosition.y + wy);
        return exp(-max(hAvg, 0.0) / uFogScaleH);
      }
      uniform float uProbeOn, uProbeInt;\n` +
      sh.fragmentShader
        .replace('#include <fog_fragment>', `
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
  mat.customProgramCacheKey = () => 'citymodel' + (foliage ? 'f' : 's');
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

const cityCam = new THREE.PerspectiveCamera(52, innerWidth / innerHeight, 0.11, 3400);

/* 20 degrees WSW, not 12. With shadows finally switched on, a twelve-degree
   sun puts three hundred metres of building between the light and every point
   at ground level — the whole district reads as one flat blue shadow, which is
   physically right and looks dead. At twenty the streets take long raking
   shadows and the west faces still carry the gold. */
const CSUN = new THREE.Vector3(-0.9232, 0.3420, -0.1754).normalize();
const cityHemi = new THREE.HemisphereLight(0x6f8ec6, 0x7d5730, 0.06);
cityScene.add(cityHemi);
const citySun = new THREE.DirectionalLight(0xffc596, 2.35);
citySun.position.copy(CSUN).multiplyScalar(300);
citySun.castShadow = true;
/* not quite to zero. A real shadow at this hour is filled by a whole sky, and
   the pillar is that nothing in this district ever goes to a grey void. */
citySun.shadow.intensity = 0.92;
const SHADOW_MAP = 4096;
citySun.shadow.mapSize.set(SHADOW_MAP, SHADOW_MAP);
cityScene.add(citySun);
cityScene.add(citySun.target);
/* a cool counter-fill from the east sky so shadowed stone never goes grey —
   the shadow side reads blue-violet from the dusk dome, not black */
const cityFill = new THREE.DirectionalLight(0x8aa4e8, 0.54);
cityFill.position.set(240, 130, 200);
cityScene.add(cityFill);
/* and a warm bounce from the paving, aimed up */
const cityBounce = new THREE.DirectionalLight(0xff9a52, 0.74);
cityBounce.position.set(40, -100, -30);
cityScene.add(cityBounce);

/* ------------------------------------------------------------ practicals *
   Eight point lights, recycled every frame onto the nearest registered
   practical. Lanterns, shopfronts, uplights and street lamps all register;
   the viewer always stands inside a correctly lit pool without the scene
   ever carrying more than eight dynamic lights.                           */
const PRACTICALS = [];
const POOL = [];
for (let i = 0; i < 8; i++) {
  const l = new THREE.PointLight(0xffc98a, 0, 26, 1.8);
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
    if (d < 3600) _pd.push([d, p]);
  }
  _pd.sort((a, b) => a[0] - b[0]);
  for (let i = 0; i < POOL.length; i++) {
    const e = _pd[i];
    if (!e) { POOL[i].intensity = 0; continue; }
    const p = e[1];
    POOL[i].position.set(p.x, p.y, p.z);
    POOL[i].color.setHex(p.c);
    POOL[i].distance = p.r;
    POOL[i].intensity = p.i * (1 - sstep(2000, 3600, e[0]));
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
  c.left = -half; c.right = half; c.top = half; c.bottom = -half;
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
  const texel = 2 * half / SHADOW_MAP;
  citySun.shadow.bias = -(0.30 + texel * 3.6) / (c.far - c.near);
  citySun.shadow.normalBias = Math.max(0.05, texel * 3.6);
  citySun.shadow.radius = Math.min(9, Math.max(1, 0.14 / texel));
}

/* ------------------------------------------------------------- city sky */
const citySkyMat = new THREE.ShaderMaterial({
  side: THREE.BackSide, depthWrite: false, fog: false,
  uniforms: {
    uSun: { value: CSUN.clone() }, uTime: { value: 0 },
    uZen: { value: C(0x091a44) }, uMid: { value: C(0x1e3c74) },
    uHorizon: { value: C(0x7286a8) }, uGlow: { value: C(0xffc98a) },
    uWarmHz: { value: C(0xd9a878) },
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
      c += uGlow * pow(sd, 5.0) * 0.55 * (0.35 + 0.65 * hz);
      c += uGlow * pow(sd, 24.0) * 0.7;
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
  const gm = new THREE.ShaderMaterial({
    side: THREE.BackSide, depthWrite: false, fog: false,
    uniforms: { uSun: { value: CSUN.clone() } },
    vertexShader: `varying vec3 vD; void main(){ vD=normalize(position); gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,
    fragmentShader: `varying vec3 vD; uniform vec3 uSun;
      void main(){
        vec3 d = normalize(vD);
        float down = clamp(-d.y, 0.0, 1.0);
        vec3 c = mix(vec3(0.44,0.34,0.25), vec3(0.66,0.48,0.32), down);
        c += vec3(0.50,0.32,0.14) * pow(max(dot(normalize(vec3(uSun.x,-uSun.y,uSun.z)), d),0.0), 3.0);
        gl_FragColor = vec4(c * (0.35 + 0.65*down), 1.0);
      }`,
  });
  const ground = new THREE.Mesh(new THREE.SphereGeometry(58, 24, 16, 0, Math.PI * 2, Math.PI * 0.5, Math.PI * 0.5), gm);
  s.add(ground);
  const rt = pmrem.fromScene(s, 0.04);
  cityEnv = rt.texture;
  cityScene.environment = cityEnv;
  cityScene.environmentIntensity = 0.42;
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
cityIntMat.userData.u.uRoomAdd.value.setRGB(1.05, 0.86, 0.62);
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

/*@DISTRICT_CONTENT@*/

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
  if (!body) { REFL.live = 0; waterMat.uniforms.uReflOn.value = 0; return; }
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

  waterMat.uniforms.uRefl.value = rt.texture;
  waterMat.uniforms.uReflMtx.value.copy(REFL.tex);
  waterMat.uniforms.uReflOn.value = 1;
  waterMat.uniforms.uReflY.value = REFL.y;
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

function update(dt, t) {
  diveUpdate(dt);
  if (sceneState === 'city') {
    navUpdate(dt);
    citySkyMat.uniforms.uTime.value = t;
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
