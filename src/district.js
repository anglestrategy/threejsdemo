/* ==========================================================================
   16.  DOWNTOWN AL KHOBAR
   A complete district you fly and walk. Built lazily on first entry, lives in
   its own scene so the map is never paying for it, and torn back down to the
   map with the whole map state intact.

   Local frame: metres, origin at the centre of the canopy plaza, +Z north,
   +X east. The sun is low in the west-south-west, the hour is gold-into-blue.
   ========================================================================== */
const CITY = (function buildDowntownModule() {

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
  brick:     0x9a5c46, brickDk:  0x744336, brickLt: 0xb0765a,
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
const G_CONE = (function () { const g = new THREE.ConeGeometry(0.5, 1, 10); g.translate(0, 0.5, 0); return g; })();

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
      vec2 p2 = q * 2.05 + warp * 1.30;
      vec2 ci = floor(p2), cf = fract(p2);
      float best = 9.0, second = 9.0; vec2 bid = vec2(0.0);
      for (int j = -1; j <= 1; j++) for (int i = -1; i <= 1; i++) {
        vec2 g = vec2(float(i), float(j));
        vec2 o = vec2(h21(ci + g), h21(ci + g + 41.7));
        float d = length(g + o - cf);
        if (d < best) { second = best; best = d; bid = ci + g; }
        else if (d < second) second = d;
      }
      float edge = smoothstep(0.0, 0.055, second - best);
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
    } else if (s < 10.5) {                           // FABRIC, woven
      float w = 0.5 + 0.5 * sin(q.x * 210.0) * sin(q.y * 210.0);
      grain = w; cav = 1.0;
      return w * 0.35 + fb2(q * 8.0) * 0.4;
    }
    grain = fb2(q * 4.0); cav = 1.0;                 // FOLIAGE
    return grain;
  }
`;

function makeCityMaterial() {
  const mat = new THREE.MeshStandardMaterial({
    vertexColors: true, roughness: 0.86, metalness: 0.0, envMapIntensity: 1.0,
  });
  mat.userData.u = { uTime: { value: 0 }, uWind: { value: new THREE.Vector2(0.85, 0.32) } };
  mat.onBeforeCompile = (sh) => {
    sh.uniforms.uTime = mat.userData.u.uTime;
    sh.uniforms.uWind = mat.userData.u.uWind;
    sh.vertexShader = `attribute float aSurf; varying float vSurf; varying vec3 vWP; varying vec3 vONrm; varying vec3 vWNrm;
      uniform float uTime; uniform vec2 uWind;
      float wh(vec3 p){ return fract(sin(dot(p,vec3(12.99,78.23,37.71)))*43758.5453); }\n` +
      sh.vertexShader
        .replace('#include <begin_vertex>', `#include <begin_vertex>
          vSurf = aSurf; vONrm = normalize(normal);
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
      float gRough; float gMetal; vec3 gNrmW;\n` + SURF_GLSL +
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
        gNrmW = normalize(Tw * pn.x + Bw * pn.y + Nw * pn.z);

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
      }`);
  };
  mat.customProgramCacheKey = () => 'citysurf';
  return mat;
}

/* ======================================================== SCENE & LIGHTS == */
const cityScene = new THREE.Scene();
cityScene.background = null;
const CITY_FOG = 0.00058;
cityScene.fog = new THREE.FogExp2(0xc2a495, CITY_FOG);

const cityCam = new THREE.PerspectiveCamera(52, innerWidth / innerHeight, 0.08, 1900);

const CSUN = new THREE.Vector3(-0.895, 0.196, -0.170).normalize();   // 11 degrees, WSW
const cityHemi = new THREE.HemisphereLight(0x6f8ec6, 0x7d5730, 0.26);
cityScene.add(cityHemi);
const citySun = new THREE.DirectionalLight(0xffc596, 1.95);
citySun.position.copy(CSUN).multiplyScalar(300);
citySun.castShadow = true;
citySun.shadow.mapSize.set(2048, 2048);
citySun.shadow.camera.near = 1; citySun.shadow.camera.far = 460;
citySun.shadow.bias = -0.0009;
citySun.shadow.normalBias = 0.10;
cityScene.add(citySun);
cityScene.add(citySun.target);
/* a cool counter-fill from the east sky so shadowed stone never goes grey —
   the shadow side reads blue-violet from the dusk dome, not black */
const cityFill = new THREE.DirectionalLight(0x8aa4e8, 0.40);
cityFill.position.set(240, 130, 200);
cityScene.add(cityFill);
/* and a warm bounce from the paving, aimed up */
const cityBounce = new THREE.DirectionalLight(0xff9a52, 0.62);
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
const SHADOW_HALF = 54;
function fitShadow(target) {
  const c = citySun.shadow.camera;
  c.left = -SHADOW_HALF; c.right = SHADOW_HALF;
  c.top = SHADOW_HALF; c.bottom = -SHADOW_HALF;
  c.updateProjectionMatrix();
  citySun.target.position.set(target.x, 0, target.z);
  citySun.position.set(target.x + CSUN.x * 220, CSUN.y * 220, target.z + CSUN.z * 220);
  citySun.target.updateMatrixWorld();
}

/* ------------------------------------------------------------- city sky */
const citySkyMat = new THREE.ShaderMaterial({
  side: THREE.BackSide, depthWrite: false, fog: false,
  uniforms: {
    uSun: { value: CSUN.clone() }, uTime: { value: 0 },
    uZen: { value: C(0x101a3a) }, uMid: { value: C(0x3d456e) },
    uHorizon: { value: C(0xc2a495) }, uGlow: { value: C(0xffd2a0) },
  },
  vertexShader: `varying vec3 vD; void main(){ vD=normalize(position); gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,
  fragmentShader: `
    varying vec3 vD; uniform vec3 uSun,uZen,uMid,uHorizon,uGlow; uniform float uTime;
    float h21(vec2 p){ vec3 q=fract(vec3(p.xyx)*0.1031); q+=dot(q,q.yzx+33.33); return fract((q.x+q.y)*q.z); }
    float vn(vec2 p){ vec2 i=floor(p),f=fract(p); f=f*f*(3.0-2.0*f);
      return mix(mix(h21(i),h21(i+vec2(1,0)),f.x),mix(h21(i+vec2(0,1)),h21(i+vec2(1,1)),f.x),f.y); }
    float fb(vec2 p){ float s=0.0,a=0.5; for(int i=0;i<5;i++){ s+=a*vn(p); p*=2.09; a*=0.52; } return s; }
    void main(){
      vec3 d = normalize(vD);
      float up = clamp(d.y, -0.2, 1.0);
      vec3 c = mix(uMid, uZen, pow(clamp(up,0.0,1.0), 0.62));
      float hz = pow(1.0 - clamp(up,0.0,1.0), 5.0);
      c = mix(c, uHorizon, hz * 0.92);
      float sd = max(dot(d, normalize(uSun)), 0.0);
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
const citySky = new THREE.Mesh(new THREE.SphereGeometry(1400, 36, 24), citySkyMat);
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
  cityScene.environmentIntensity = 0.82;
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
   Captured and dragged looking are opposite conventions and both are right:
   with the pointer locked the mouse IS the head, so right turns right; on a
   drag the hand is on the world, so dragging right swings the view left. */
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
  if (walk) { dx = sy * fwd + cy * str; dyv = 0; dz = cy * fwd - sy * str; }
  else { dx = sy * cp * fwd + cy * str; dyv = sp * fwd + vert; dz = cy * cp * fwd - sy * str; }
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
  look(-dx, -dy);
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
function enter(opts) {
  opts = opts || {};
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
  renderer.toneMappingExposure = mix(1.00, 0.94, k);
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
function goShot(s, instant) {
  const pose = poseOfShot(s);
  if (sceneState !== 'city') {
    if (instant) enter({ instant: true, pose });
    else enter({ pose });
  } else {
    applyPose(pose);
  }
}

function update(dt, t) {
  diveUpdate(dt);
  if (sceneState === 'city') {
    navUpdate(dt);
    citySkyMat.uniforms.uTime.value = t;
    cityMat.userData.u.uTime.value = t;
    citySky.position.copy(cityCam.position);
    fitShadow(cityCam.position);
    updatePracticals(cityCam.position);
    updateLife(dt, t);
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
  debug: { insideSolid, groundAt, resolve, platforms: () => PLATFORMS.length, colliders: () => COLLIDERS.length, waterAt: (x, z) => WATERBODIES.some(b => x > b.x0 && x < b.x1 && z > b.z0 && z < b.z1) },
  get diving() { return DIVE.phase !== 'off'; },
  pose: navPose,
  get built() { return BUILT; },
  scene: cityScene, cam: cityCam, nav: NAV,
  setMode,
  plan: PLAN,
};
})();
SCENES.city = CITY;
