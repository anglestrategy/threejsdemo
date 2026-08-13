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
  paved(ACC.ground, CP.x0 - 4, CP.z0 - 4, CP.x1 + 4, CP.z1 + 4, 0.18, K.travert, 1.0);
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
      const gy = terrainY(px, pz) + 0.18;
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
      inst('palm', xf3(px, terrainY(px, pz), pz, 0, rnd() * 6.28, 0, 1, 1.15 + rnd() * 0.55, 1), 0xffffff);
    }
    for (let i = 0; i < 8; i++) {
      const px = mix(v.x0 + 2, v.x1 - 2, rnd()), pz = mix(v.z0 + 2, v.z1 - 2, rnd());
      inst('planter', xf3(px, terrainY(px, pz) + 0.24, pz, 0, rnd() * 6.28, 0, 1.8, 1, 1.8), 0xcabb9d);
      inst('shrub', xf3(px, terrainY(px, pz) + 0.86, pz, 0, rnd() * 6.28, 0, 1.6, 1.3, 1.6), pick([K.leaf, K.leafLt]));
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
  paved(ACC.ground, C4.x0 - 6, C4.z0 - 6, C4.x1 + 6, C4.z1 + 6, 0.14, K.travert, 1.0);
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
  paved(ACC.ground, T.x0 - 8, T.z0 - 8, T.x1 + 8, T.z1 + 8, 0.14, 0xd2c4a8, 1.0);
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
