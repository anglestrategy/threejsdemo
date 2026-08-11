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
const GLASS = new Acc();
const SHOPGLASS = new Acc();
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
  [-200, 150], [-250, 230], [258, 374], [-120, -60]];
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

function modelLOD(r, x, z) {
  if (r.parts.length < 2) return 0;
  let best = 1e9;
  for (const p of NEARFIELD) {
    const d = (x - p[0]) * (x - p[0]) + (z - p[1]) * (z - p[1]);
    if (d < best) best = d;
  }
  return best <= r.near * r.near ? 0 : r.parts.length - 1;
}

function inst(name, mtx, colour) {
  const r = MODEL_ROUTE[name];
  if (r) {
    _routeP.setFromMatrixPosition(mtx);
    const lv = r.parts[modelLOD(r, _routeP.x, _routeP.z)];
    // the scans are one plant each; without a per-instance tint an avenue of
    // them reads as a photocopy. A few percent of warmth either way is enough.
    let c = 0xffffff;
    if (r.jitter) {
      const j = 0.90 + 0.16 * DRNG();
      c = (Math.min(255, (255 * j) | 0) << 16) | (Math.min(255, (255 * (j * 0.99 + 0.01)) | 0) << 8)
        | Math.min(255, (255 * (j * 0.94 + 0.05)) | 0);
    }
    _fitM.multiplyMatrices(mtx, lv.fit);
    for (const nm of lv.names) inst(nm, _fitM.clone(), c);
    return;
  }
  let e = INST[name];
  if (!e) e = INST[name] = { m: [], c: [] };
  e.m.push(mtx);
  e.c.push(colour === undefined ? 0xffffff : colour);
}
function flushInstances() {
  for (const name in INST) {
    const e = INST[name], def = INST_DEF[name];
    if (!def || !e.m.length) continue;
    const mat = def.mat || cityMat;
    const im = new THREE.InstancedMesh(def.geo, mat, e.m.length);
    im.name = name;
    for (let i = 0; i < e.m.length; i++) {
      im.setMatrixAt(i, e.m[i]);
      _c3.set(e.c[i]); im.setColorAt(i, _c3);
    }
    im.instanceMatrix.needsUpdate = true;
    if (im.instanceColor) im.instanceColor.needsUpdate = true;
    im.castShadow = def.shadow !== false;
    im.receiveShadow = def.receive !== false;
    im.frustumCulled = def.cull !== false;
    if (def.order !== undefined) im.renderOrder = def.order;
    im.geometry.computeBoundingSphere();
    cityRoot.add(im);
    INSTCOUNT[name] = e.m.length;
    def.mesh = im;
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
  // the desert apron — one big subdivided plane so it takes the ground shade
  const AP = 3800, SEG = 60;
  const gp = new THREE.PlaneGeometry(AP, AP, SEG, SEG);
  gp.rotateX(-Math.PI / 2);
  const pos = gp.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i), z = pos.getZ(i) + 220;
    pos.setZ(i, z);
    const d = Math.max(Math.abs(x) - 430, Math.abs(z - 220) - 460);
    const dune = 3.4 * sstep(30, 620, d) * (0.5 + 0.5 * Math.sin(x * 0.0052 + z * 0.0031));
    pos.setY(i, terrainY(x, z) - 0.06 + dune + 1.8 * fbm(x * 0.0022 + 5, z * 0.0022, 3) * sstep(20, 420, d));
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
    _c3.set(K.sand);
    for (let i = 0; i < cnt; i++) {
      sa[i] = S.SAND;
      const x = gpp.getX(i), z = gpp.getZ(i);
      const d = Math.max(Math.abs(x) - 430, Math.abs(z - 220) - 460);
      const s = 0.86 + 0.20 * fbm(x * 0.02, z * 0.02, 2) - 0.10 * sstep(0, 200, d);
      ca[i * 3] = _c3.r * s; ca[i * 3 + 1] = _c3.g * s * 0.99; ca[i * 3 + 2] = _c3.b * s * 0.96;
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
function water(x0, z0, x1, z1, y, depth, flow) {
  WATERBODIES.push({ x0: Math.min(x0, x1), x1: Math.max(x0, x1), z0: Math.min(z0, z1), z1: Math.max(z0, z1), y, depth: depth || 0.5, flow: flow || 0 });
}

const waterMat = new THREE.ShaderMaterial({
  transparent: true,
  uniforms: {
    uTime: { value: 0 }, uSun: { value: CSUN.clone() },
    uDeep: { value: C(K.waterDk) }, uShal: { value: C(0x2f8f92) },
    uSky: { value: C(0x7c8fc4) }, uWarm: { value: C(0xffc98a) },
    uFogColor: { value: C(0xc2a495) }, uFogD: { value: CITY_FOG },
  },
  vertexShader: `
    varying vec3 vW; varying vec2 vF; varying float vD;
    attribute float aFlow;
    void main(){
      vec4 wp = modelMatrix*vec4(position,1.0);
      vW = wp.xyz; vF = uv; vD = aFlow;
      vec4 mv = viewMatrix*wp;
      gl_Position = projectionMatrix*mv;
    }`,
  fragmentShader: `
    precision highp float;
    varying vec3 vW; varying vec2 vF; varying float vD;
    uniform float uTime,uFogD; uniform vec3 uSun,uDeep,uShal,uSky,uWarm,uFogColor;
    float h21(vec2 p){ vec3 q=fract(vec3(p.xyx)*0.1031); q+=dot(q,q.yzx+33.33); return fract((q.x+q.y)*q.z); }
    float vn(vec2 p){ vec2 i=floor(p),f=fract(p); f=f*f*(3.0-2.0*f);
      return mix(mix(h21(i),h21(i+vec2(1,0)),f.x),mix(h21(i+vec2(0,1)),h21(i+vec2(1,1)),f.x),f.y); }
    void main(){
      vec2 p = vW.xz;
      float t = uTime;
      // two crossed ripple trains plus a slow drift along the channel
      float a = vn(p*1.7 + vec2(t*0.30*vD, t*0.11));
      float b = vn(p*3.6 - vec2(t*0.18, t*0.42*vD));
      float c = vn(p*8.1 + vec2(-t*0.55, t*0.33));
      float hgt = a*0.5 + b*0.32 + c*0.18;
      vec3 N = normalize(vec3((a-b)*0.9, 1.0, (b-c)*0.9));
      vec3 Vd = normalize(cameraPosition - vW);
      float fres = pow(1.0 - clamp(dot(N,Vd),0.0,1.0), 3.2);
      vec3 col = mix(uDeep, uShal, 0.30 + 0.55*hgt);
      col = mix(col, uSky, fres*0.66);
      vec3 H = normalize(normalize(uSun) + Vd);
      col += uWarm * pow(max(dot(N,H),0.0), 90.0) * 1.5;
      col += uWarm * pow(max(dot(N,H),0.0), 12.0) * 0.16;
      // caustic glitter
      col += vec3(0.9,0.98,1.0) * pow(max(c-0.62,0.0), 2.0) * 1.1;
      float d = length(cameraPosition - vW);
      float fog = 1.0 - exp(-uFogD*uFogD*d*d);
      col = mix(col, uFogColor, fog);
      gl_FragColor = vec4(col, 0.90 + 0.10*fres);
    }`,
});

const WATER_RUNS = [
  [PLAN.water.x, -70, PLAN.water.x, 560, PLAN.water.w, 1],   // the main channel
  [PLAN.water.x, 250, 268, 250, 4.6, 1],                     // the eastern branch
];
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
    const nv = g.attributes.position.count;
    const fl = new Float32Array(nv); fl.fill(r[5] ? 1 : 0.14);
    g.setAttribute('aFlow', new THREE.BufferAttribute(fl, 1));
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
function shopInterior(cx, y, cz, ang, w, h, depth, warm) {
  const cs = Math.cos(ang), sn = Math.sin(ang);
  const push = (d) => [cx + sn * d, cz + cs * d];
  // glazing — nearly clear, because the room behind it is the point
  let p = push(0.05);
  SHOPGLASS.add(G_BOXT, xf(p[0], y, p[1], ang, w, h, 0.05), 0xcfe0ea, S.METAL, 1);
  // frame
  ACC.fine.add(G_BOXT, xf(p[0], y, p[1], ang, 0.10, h, 0.16), K.steelDk, S.METAL, 0.8);
  ACC.fine.add(G_BOXT, xf(p[0] - cs * (w / 2 - 0.05), y, p[1] + sn * (w / 2 - 0.05), ang, 0.10, h, 0.16), K.steelDk, S.METAL, 0.8);
  ACC.fine.add(G_BOXT, xf(p[0] + cs * (w / 2 - 0.05), y, p[1] - sn * (w / 2 - 0.05), ang, 0.10, h, 0.16), K.steelDk, S.METAL, 0.8);
  ACC.fine.add(G_BOXT, xf(p[0], y + h - 0.06, p[1], ang, w, 0.12, 0.18), K.steelDk, S.METAL, 0.8);
  // back wall, emissive — this is the lamp of the whole street
  p = push(depth);
  const tint = warm === undefined ? 0xffd6a0 : warm;
  SHOPEMIS.add(G_BOXT, xf(p[0], y + 0.02, p[1], ang, w * 0.98, h * 0.94, 0.08), tint, 0, 1);
  // the light that lands on the pavement in front of the shop
  const gp = push(-1.35);
  inst('pool', xf3(gp[0], y - 0.10, gp[1], 0, 0, 0, w * 2.2, 1, w * 2.2), tint);
  // side walls catch the light
  for (const s of [-1, 1]) {
    const q = [p[0] + cs * s * w / 2, p[1] - sn * s * w / 2];
    ACC.arch.add(G_BOXT, xf(q[0] + sn * depth * 0.5, y, q[1] + cs * depth * 0.5, ang, 0.1, h, depth), 0xdcc7a6, S.RENDER, 0.9);
  }
  // ceiling + a run of downlights
  const q = push(depth * 0.5);
  ACC.arch.add(G_BOXT, xf(q[0], y + h - 0.12, q[1], ang, w, 0.12, depth), 0xd8c6ab, S.RENDER, 0.8);
  const n = Math.max(2, Math.round(w / 1.1));
  for (let i = 0; i < n; i++) {
    const o = -w / 2 + w * (i + 0.5) / n;
    const lp = [q[0] + cs * o, q[1] - sn * o];
    inst('shoplight', xf(lp[0], y + h - 0.22, lp[1], ang), 0xfff0d4);
  }
  // the light that actually leaves the shop and lands on the paving
  const fp = push(-0.6);
  PRACTICALS.push({ x: fp[0], y: y + h * 0.55, z: fp[1], c: tint, i: 5.2, r: 13 });
  // merchandise: a counter and a couple of shelf stacks, silhouetted
  const cpos = push(depth * 0.62);
  ACC.fine.add(G_BOXT, xf(cpos[0], y + 0.02, cpos[1], ang, w * 0.62, 0.95, 0.5), 0x6b4b2e, S.TIMBER, 0.7);
  for (let i = 0; i < 3; i++) {
    const o = -w / 2 + w * (i + 0.5) / 3;
    const sp = [push(depth * 0.9)[0] + cs * o, push(depth * 0.9)[1] - sn * o];
    ACC.fine.add(G_BOXT, xf(sp[0], y + 0.4, sp[1], ang, w * 0.2, h * (0.42 + 0.2 * rnd()), 0.28), 0x7a5636, S.TIMBER, 0.6);
  }
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
