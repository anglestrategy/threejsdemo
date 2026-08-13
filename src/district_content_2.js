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
  const gh0 = style === 'office' ? fh * 1.5 : fh;
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
    elevation(S4, gy, floors, fh, len, lvl, pub, style, baseCol, surfBody, surfBase, shade, o, avail, bayJit, si);
  }

  // ---- parapet all round
  const pcol = fam === 'brick' ? K.brickLt : (fam === 'trav' ? K.travert : K.sandLt);
  const pstyle = o.parapet || (style === 'brick' ? 'crenel' : (fam === 'trav' ? 'step' : (chance(0.5) ? 'crenel' : 'step')));
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
function elevation(S4, gy, floors, fh, len, lvl, pub, style, baseCol, surfBody, surfBase, shade, o, avail, bayJit, si) {
  const a = ACC.arch, f = ACC.fine;
  const ux = (S4.x1 - S4.x0) / len, uz = (S4.z1 - S4.z0) / len;
  const ang = Math.atan2(S4.x1 - S4.x0, S4.z1 - S4.z0);
  const nx = S4.nx, nz = S4.nz;
  const bayW = (style === 'office' ? 2.55 : (style === 'souq' ? 3.5 : 3.15)) * (bayJit || 1);
  const nb = Math.max(1, Math.round(len / bayW));
  const bw = len / nb;
  const pierW = style === 'office' ? 0.34 : 0.62;
  const at = (t, off) => [S4.x0 + ux * t + nx * (off || 0), S4.z0 + uz * t + nz * (off || 0)];

  // ---- ground floor
  const shopfront = (style === 'souq' && pub >= 1) || (style === 'brick' && pub >= 2) || (style === 'office' && pub >= 1);
  const gh = style === 'office' ? fh * 1.5 : fh;
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
        else openingKit(p[0], gy + sill, p[1], ang, ow * 0.86, head - sill, 'window', style);
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
    const sillF = 0.95 + (isTop ? 0.16 : 0.0) + rnd() * 0.22;
    const headF = fh - 0.75 - rnd() * 0.20;
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
        if (chance(0.13)) {
          a.add(G_BOXT, xf(p[0], y + sill, p[1], ang, ow, head - sill, 0.52), baseCol, surfBody, shade * 0.95);
          continue;
        }
        const r = rnd();
        const kind = (pub >= 2 && r < 0.30) ? 'mashrabiya' : (r < 0.46 ? 'shutter' : 'window');
        /* set into a real reveal rather than flush with the wall. The opening
           used to sit on the wall plane, so it had no shadow of its own and
           every window in the district read as a decal. RD is the depth of the
           jamb; the two returns are what actually cast. */
        const RD = 0.22;
        openingKit(p[0] - nx * RD, y + sill, p[1] - nz * RD, ang, ow * 0.86, head - sill, kind, style);
        const jw = ow * 0.07;
        for (const s of [-1, 1]) {
          const jp = at(t + s * (ow * 0.86 * 0.5 + jw * 0.5), -RD * 0.5);
          a.add(G_BOXT, xf(jp[0], y + sill, jp[1], ang, jw, head - sill, RD), baseCol, surfBase, shade * 0.82);
        }
        // the head of the reveal, which throws the line down the glass
        a.add(G_BOXT, xf(at(t, -RD * 0.5)[0], y + head - 0.02, at(t, -RD * 0.5)[1], ang, ow * 0.86 + jw * 2, 0.10, RD), baseCol, surfBase, shade * 0.80);
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
          inst('balcrail', xf3(rp[0], y + sill + 0.02, rp[1], 0, ang + Math.PI / 2, 0, ow * 0.86 / 1.6, 1, 1), pick([0x3c3a36, 0x4a463f, 0x2e2c29]));
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
  const sc = xf3(x, y, z, 0, ang + Math.PI / 2, 0, w, h, 1);
  if (kind === 'mashrabiya') {
    inst('mashrabiya', sc, 0xffffff);
    inst('mashframe', sc, pick([K.timberDk, 0x4a2f1a, 0x63421f]));
    inst('mashglow', sc, pick([0xffc98a, 0xffb877, 0xffd9a8]));
  } else if (kind === 'shutter') {
    inst('shutter', sc, pick([K.timber, 0x5b3b20, 0x7a5330, 0x46301c]));
  } else {
    inst('window', sc, pick([0x2a3540, 0x27313b, 0x323d47]));
    if (chance(0.42)) inst('winglow', sc, pick([0xffcf94, 0xffdcae, 0xf7be7c]));
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
    for (const p of plots) {
      // the majlis block is placed by hand: nothing may overlap its plot
      if (p[0] < MJ.x1 && p[2] > MJ.x0 && p[1] < MJ.z1 && p[3] > MJ.z0) continue;
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
        parapet: chance(0.7) ? 'crenel' : 'step', green: chance(0.4),
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
      block(p[0], p[1], p[2], p[3], {
        floors: ri(1, 3), floorH: 3.2, style: 'sand',
        detail: dist < 40 ? 1 : 0, collide: false, green: chance(0.2),
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
