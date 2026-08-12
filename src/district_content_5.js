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
    const step = big ? 11.5 : 15.5;
    const n = Math.floor(len / step);
    for (let i = 0; i < n; i++) {
      const t = (i + 0.5) / n * len + rr(-1.7, 1.7);
      for (const s of [-1, 1]) {
        const off = r[4] / 2 + (big ? 4.6 : 4.2);
        const px = r[0] + ux * t + nx * off * s, pz = r[1] + uz * t + nz * off * s;
        if (nearBuilding(px, pz, 1.6)) continue;
        const gy = terrainY(px, pz);
        if (big) {
          inst('palm', xf3(px, gy, pz, 0, rnd() * 6.28, 0, 0.9 + rnd() * 0.35, 0.85 + rnd() * 0.45, 0.9 + rnd() * 0.35),
            pick([0xffffff, 0xf2e8d8, 0xe8dcc4]));
          inst('shrub', xf3(px, gy, pz, 0, rnd() * 6.28, 0, 1.7, 1.1, 1.7), pick([K.leaf, K.leafDk]));
        } else if (chance(0.72)) {
          inst('tree', xf3(px, gy, pz, 0, rnd() * 6.28, 0, 0.85 + rnd() * 0.5, 0.8 + rnd() * 0.5, 0.85 + rnd() * 0.5),
            pick([0xffffff, 0xe6f0d8, 0xd8e4c8, 0xf0e8d4]));
        }
        // street lights on a slower, offset rhythm
        if (i % 2 === 0 && chance(0.8)) {
          const lx = px + ux * step * 0.5, lz = pz + uz * step * 0.5;
          if (!nearBuilding(lx, lz, 1.2)) {
            inst('streetlight', xf(lx, terrainY(lx, lz), lz, Math.atan2(-nx * s, -nz * s)), 0xffffff);
            PRACTICALS.push({ x: lx, y: terrainY(lx, lz) + 4.2, z: lz, c: 0xffe0b0, i: 6.5, r: 18 });
            inst('pool', xf3(lx, terrainY(lx, lz) + 0.14, lz, 0, 0, 0, 13, 1, 13), 0xffdcaa);
          }
        }
        if (chance(0.18)) inst('bin', xf(px + nx * s * 1.5, gy, pz + nz * s * 1.5, rnd() * 6.28), 0xffffff);
      }
    }
    // pedestrian crossings where two roads meet
    for (const r2 of ROADS) {
      if (r2 === r || r2[5] !== 0) continue;
      const cross = segCross(r, r2);
      if (!cross) continue;
      for (const s of [-1, 1]) {
        const cxp = cross[0] + ux * (r2[4] / 2 + 4.2) * s, czp = cross[1] + uz * (r2[4] / 2 + 4.2) * s;
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
      const gy = terrainY(px, pz);
      const r = rnd() * 0.82;      // the street is mostly trees and planting
      if (r < 0.30) {
        inst('tree', xf3(px, gy, pz, 0, rnd() * 6.28, 0, 1.30 + rnd() * 0.5, 1.35 + rnd() * 0.55, 1.30 + rnd() * 0.5),
          pick([0xffffff, 0xdfe8cf, 0xeae0cc]));
        inst('planter', xf3(px, gy, pz, 0, rnd() * 6.28, 0, 2.4, 1.0, 2.4), pick([0xcabb9d, 0xd6c6a8]));
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
      if (chance(0.35)) inst('bollard', xf(sp + s * 6.4, terrainY(sp + s * 6.4, pz), pz + rr(-3, 3), 0), 0xffffff);
      // the shopkeeper's own frontage: crates, a rail of cloth, an A-board,
      // rolled mats — the layer that turns an elevation into a trade
      const wx = sp + s * 6.15, wz = pz + rr(-3.5, 3.5);
      const wy = terrainY(wx, wz);
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
    inst('streetlight', xf(px, terrainY(px, z), z, s > 0 ? Math.PI / 2 : -Math.PI / 2), 0xffffff);
    PRACTICALS.push({ x: px, y: terrainY(px, z) + 4.2, z: z, c: 0xffdcaa, i: 5.0, r: 15 });
    inst('pool', xf3(px - s * 1.2, terrainY(px, z) + 0.16, z, 0, 0, 0, 12, 1, 12), 0xffdcaa);
  }

  for (let z = S1.z0 - 20; z < S1.z1 + 30; z += 1.0) {
    for (const sd of [-1, 1]) {
      const dx2 = sp + sd * 5.35;
      inst('drain', xf(dx2, terrainY(dx2, z) + 0.152, z, 0), 0xbfae92);
    }
  }

  // the canvas ribbons stretched across the spine
  for (let z = S1.z0 + 22; z < S1.z1 - 14; z += rr(48, 78)) {
    const w = 15.0;
    for (let k = 0; k < 4; k++) {
      inst('ribbon', xf3(sp + rr(-0.6, 0.6), terrainY(sp, z) + 8.2 + k * 0.42 + rr(-0.15, 0.15), z + k * 2.1, 0, 0, 0, w, 1.35, 3.0),
        pick([0xfbf7ee, 0xf2ece0, 0xfefcf6]));
    }
  }

  // ---- the plaza under the canopy: seating clusters, planters, palms
  const CP = PLAN.canopy;
  for (let i = 0; i < 26; i++) {
    const px = rr(CP.x0 + 6, CP.x1 - 6), pz = rr(CP.z0 + 6, CP.z1 - 6);
    if (Math.abs(px - PLAN.water.x) < 6) continue;
    const gy = terrainY(px, pz) + 0.18;
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
    } else {
      inst('palm', xf3(px, gy, pz, 0, rnd() * 6.28, 0, 1, 1.15 + rnd() * 0.3, 1), 0xffffff);
    }
  }

  // ---- the residential streets get their palms too
  for (const Z of [PLAN.resN, PLAN.resS, PLAN.resW]) {
    for (let i = 0; i < 90; i++) {
      const px = rr(Z.x0, Z.x1), pz = rr(Z.z0, Z.z1);
      if (nearBuilding(px, pz, 2.6)) continue;
      const gy = terrainY(px, pz);
      if (chance(0.45)) inst('palm', xf3(px, gy, pz, 0, rnd() * 6.28, 0, 0.85 + rnd() * 0.4, 0.8 + rnd() * 0.5, 0.85 + rnd() * 0.4), pick([0xffffff, 0xeee4d2]));
      else inst('tree', xf3(px, gy, pz, 0, rnd() * 6.28, 0, 0.8 + rnd() * 0.5, 0.75 + rnd() * 0.5, 0.8 + rnd() * 0.5), pick([0xffffff, 0xdfe8cf]));
    }
  }

  // ---- leaf litter and drift sand: the last 5% that stops paving reading new
  for (let i = 0; i < 420; i++) {
    const px = rr(PLAN.bounds.x0, PLAN.bounds.x1), pz = rr(PLAN.bounds.z0, PLAN.bounds.z1);
    if (nearBuilding(px, pz, 0.5)) continue;
    ACC.ground.add(G_PLANE, xf3(px, terrainY(px, pz) + 0.20, pz, 0, rnd() * 6.28, 0, rr(0.5, 2.4), 1, rr(0.5, 2.4)),
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
    inst('lawn', xf(cx, (y === undefined ? terrainY(cx, cz) : y) + 0.055, cz, 0,
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
      inst('hedge', xf(bx + e + 0.5, terrainY(bx + e, bz) + 0.05, bz, 0, 1.0, 0.8, 1.0), 0xffffff);
      inst('hedge', xf(bx + e + 0.5, terrainY(bx + e, bz + bd) + 0.05, bz + bd, 0, 1.0, 0.8, 1.0), 0xffffff);
    }
    for (let k = 0; k < 5; k++) {
      const px = rr(bx + 1, bx + bw - 1), pz = rr(bz + 1, bz + bd - 1);
      inst('shrub', xf3(px, terrainY(px, pz) + 0.06, pz, 0, rnd() * 6.28, 0, 1, 1, 1), pick([K.leaf, K.leafDk]));
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
    const s = rr(1.5, 2.9);
    inst('bougain', xf3(bx2, dressY(bx2, bz2) + rr(0, 1.9), bz2, 0, rnd() * 6.28, 0, s, s * rr(0.7, 1.1), s),
      pick(BOUG));
    placed++;
    if (chance(0.5)) inst('hedge', xf(bx2, dressY(bx2, bz2), bz2, _dw.ang + Math.PI / 2, rr(1.4, 3.4), 1, 1), 0xffffff);
  }
  INSTCOUNT.bougain = placed;
}

function buildIdentity() {
  CURCHUNK = 'canopy';
  const cx = 4, cz = PLAN.canopy.z0 - 22, gy = terrainY(cx, cz);
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

  const N = 108;
  for (let i = 0; i < N; i++) {
    const path = PATHS[i % PATHS.length];
    const kind = rnd();
    /* a downtown in Al Khobar is mixed dress, not a uniform. Roughly a third
       thobe, a third abaya, a quarter western, the rest children. */
    const which = kind < 0.32 ? 'walk_thobe' : kind < 0.63 ? 'walk_abaya'
      : kind < 0.79 ? 'walk_west' : kind < 0.92 ? 'walk_west2' : 'walk_child';
    WALKERS.push({
      path, t: rnd(), speed: rr(0.55, 1.35) / 100,
      kind: which,
      lane: rr(-2.4, 2.4), ph: rnd() * 100,
      scale: which === 'walk_child' ? rr(0.90, 1.05) : rr(0.94, 1.08),
      col: which === 'walk_thobe' ? pick([0xffffff, 0xf6f2ea, 0xece6da])
        : which === 'walk_abaya' ? pick([0xffffff, 0xe2dce6, 0xd0cad8])
        : pick([0xffffff, 0xe8e2d4, 0xd6dce4, 0xdcd2c2]),
    });
  }
  // the instanced meshes the walkers drive
  for (const k of ['walk_thobe', 'walk_abaya', 'walk_west', 'walk_west2', 'walk_child']) {
    for (const w of WALKERS) if (w.kind === k) inst(k, xf(0, -999, 0), w.col);
    if (INST_DEF[k]) { INST_DEF[k].cull = false; INST_DEF[k].shadow = true; }
  }

  // seated groups: at every café table already placed, plus the majlis
  const seatSpots = [];
  for (let i = 0; i < 34; i++) {
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
  inst('child', xf3(MX - 2.1, mtop, MZ + 1.5, 0, 0.4, 0, 0.62, 0.62, 0.62), 0xffd8c0);
  inst('child', xf3(MX + 2.0, mtop, MZ - 1.4, 0, 2.6, 0, 0.60, 0.60, 0.60), 0xd8e0f0);
  inst('thobe', xf3(MX - 5.0, mtop, MZ - 0.6, 0, 1.9, 0, 1, 1, 1), 0xf6f2e8);

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

/* --------------------------------------------------------- per-frame life */
const _wm = new THREE.Matrix4();
function updateLife(dt, t) {
  const defs = INST_DEF;
  // walkers
  const idx = { walk_thobe: 0, walk_abaya: 0, walk_west: 0, walk_west2: 0, walk_child: 0 };
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
  poolMat.uniforms.uTime.value = t;
  waterMat.uniforms.uTime.value = t;
}

/* =========================================================== BUILD ORDER */
function* buildSteps() {
  yield 'env'; buildEnvironment();
  yield 'kit'; defineKit();
  yield 'water-plan'; planWater();
  yield 'ground'; buildGround();
  yield 'water'; buildWater();
  yield 'roads'; buildRoads();
  yield 'blocks-a'; buildBlocks();
  yield 'canopy'; buildCanopy();
  yield 'towers'; buildTowers();
  yield 'skyline'; buildSkyline();
  yield 'majlis'; buildMajlis();
  yield 'court'; buildCourtyard();
  yield 'tensile'; buildTensile();
  yield 'planting'; buildPlanting();
  yield 'green'; buildGreen();
  yield 'identity'; buildIdentity();
  yield 'probes'; bakeProbes();
  yield 'dressing'; { const d = nearDressing(); INSTCOUNT.dressing = d.placed; INSTCOUNT.litter = d.scraps; }
  yield 'life'; buildLife();
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
    const n = Math.round(s.r * s.r * 0.14 * s.d);
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
        else if (roll < 0.42) inst('aboard', xf3(px, gy, pz, 0, ang + rr(-0.8, 0.8), 0, 1, 1, 1), pick([0x6b4526, 0x54361d]));
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
      } else if (rnd() < 0.5) {
        const roll = rnd();
        // the middle of a street is not where a shop puts its stock: out here
        // it is only what blows about and what a cafe pulls out of line
        if (roll < 0.16) inst('chair', xf(x, gy, z, rnd() * 6.28, 1, 1, 1), pick([0xefeade, 0xd8d2c4, 0xb9b2a2]));
        else if (roll < 0.22) inst('table', xf(x, gy, z, rnd() * 6.28, 1, 1, 1), pick([0xe8e3d6, 0xd6c6a8]));
        else scraps += litterDrift(x, z, gy, rnd() * 6.28, 2 + Math.floor(rnd() * 4));
        placed++;
      }
    }
  }
  return { placed, scraps };
}
