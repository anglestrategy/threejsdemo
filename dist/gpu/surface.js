/* ==========================================================================
   THE SURFACE LAW, in TSL.

   This is the port of the GLSL chunk that the WebGL2 build injects through
   `MeshStandardMaterial.onBeforeCompile`, and it is the piece everything else
   depends on: it is what makes a wall stone rather than a painted plane.

   The shape is unchanged, because the shape was right —

     one height field, branched by surface class, returning a 0..1 relief
     height for a triplanar coordinate. Everything else is derived from it:
     the albedo darkens in the recesses, the roughness rises there, and the
     shading normal is bent by its gradient.

   Three things had to change in the translation, and they are the only
   places where this is not a transcription:

   1. GLSL `out` parameters do not exist in TSL. `srfH` returned a float and
      wrote `cav` and `grain` through out-params; here it returns a vec3 of
      (height, cavity, grain), which is what those three always were.

   2. Branching. The GLSL was an if/else-if ladder on a float class id, which
      in TSL is `If(...).ElseIf(...)` over a `.toVar()` result. Every branch
      has to write the same variable, so the result var is declared once up
      front rather than returned per branch.

   3. Loops. `fb2`/`fb3` unrolled fixed iteration counts; TSL's `Loop` is
      fine but the counts are small and constant, so they stay unrolled —
      it compiles to the same thing and reads closer to the original.

   The measured corrections from the WebGL2 build come across with it, and
   they matter more than the port does: travertine at 0.90 x 0.45 m rather
   than 2.3 x 1.15 (that grid was the single biggest reason the fabric read
   as stacked blocks), paving flags at ~0.5 m, ashlar at 0.225 m courses,
   brick at 235 x 82 mm, and fabric as drape rather than a 3 cm chequer.
   ========================================================================== */

import {
  Fn, float, vec2, vec3, If, floor, fract, abs, min, max, sin, dot, mix,
  smoothstep, pow, length, mod, sign, sqrt,
} from 'three/tsl';

/* ------------------------------------------------------------------ hashes */
export const h11 = Fn(([p]) => {
  const q = fract(p.mul(0.1031)).toVar();
  q.assign(q.mul(q.add(33.33)));
  q.assign(q.mul(q.add(q)));
  return fract(q);
});

export const h21 = Fn(([p]) => {
  const q = fract(vec3(p.x, p.y, p.x).mul(0.1031)).toVar();
  q.assign(q.add(dot(q, q.yzx.add(33.33))));
  return fract(q.x.add(q.y).mul(q.z));
});

export const vn2 = Fn(([p]) => {
  const i = floor(p).toVar();
  const f = fract(p).toVar();
  f.assign(f.mul(f).mul(float(3).sub(f.mul(2))));
  return mix(
    mix(h21(i), h21(i.add(vec2(1, 0))), f.x),
    mix(h21(i.add(vec2(0, 1))), h21(i.add(vec2(1, 1))), f.x),
    f.y,
  );
});

/* ==================================================== BAND-LIMITING ========
   The other half of the port, and the half that is not a transcription: the
   law is now FILTERED, and the WebGL2 build gained the identical change in the
   same commit so the two renderers keep agreeing.

   A procedural surface has nothing to mipmap. A texture gets mipmaps and
   anisotropic filtering for free and both exist for one reason: a pixel covers
   an AREA, and what it should show is the average over that area. Asking the
   law for the value at one infinitesimal point of a 225 mm course, through a
   pixel that covers 300 mm of wall, returns a random draw — and a random draw
   that changes as the camera moves is a shimmer. Measured on the WebGL2 law
   before this change, neighbouring pixels at street distance disagreed by
   60-80% of full range on every class. That is most of what read as "low
   quality" in a street-level frame, and no tuning of the law fixes it, because
   the law was never what was wrong.

   Three mechanisms, all analytic, none of which costs a texture or repeats:

     fb2/fb3   fade each octave finer than the pixel to its own mean (0.5),
               so it contributes its DC and none of its aliasing
     blFeat    fade a hard feature — a joint, a mortar line, a groove — to its
               closed-form spatial mean over the cell it divides
     blCell    fade a per-cell constant to 0.5 once its cell is under about two
               pixels

   Two footprints travel with the coordinate, and the difference matters:

     wa   the MAJOR axis of the pixel footprint, in metres. Conservative, and
          used wherever there is a discontinuity to alias.
     wg   the GEOMETRIC MEAN of the two axes — the equal-area square's width.
          Used for the smooth octaves, which alias gently, and where taking the
          major axis at a grazing angle throws away detail the eye can resolve
          along the other one.

   Both are computed from dFdx/dFdy of the WORLD POSITION in material.js, never
   from the triplanar uv: the uv jumps where the dominant axis changes, and the
   derivative of a jump is a spike that would blur a line down every convex
   edge in the district.
 * ========================================================================== */

/* four and three octaves, unrolled as in the original.

   `wp` is the footprint IN THIS FUNCTION'S OWN p-space, so a caller that wrote
   fb2(q.mul(22)) writes fb2(q.mul(22), wg.mul(22)) and neither side has to
   know the other's scale. One lattice cell of octave i is one unit of p, so
   the octave carries nothing a pixel can hold once wp >= 0.5; it is faded out
   between 0.35 and 0.90 rather than cut, because a hard cut is itself a
   visible edge travelling over the ground as the camera moves. */
export const fb2 = Fn(([p0, wp0]) => {
  const p = p0.toVar();
  const wp = wp0.toVar();
  const s = float(0).toVar();
  const a = float(0.5).toVar();
  for (let i = 0; i < 4; i++) {
    const k = float(1).sub(smoothstep(0.35, 0.90, wp)).toVar();
    const v = float(0.5).toVar();
    If(k.greaterThan(0.002), () => { v.assign(mix(float(0.5), vn2(p), k)); });
    s.addAssign(a.mul(v));
    p.assign(p.mul(2.03));
    a.assign(a.mul(0.52));
    wp.assign(wp.mul(2.03));
  }
  return s;
});

export const fb3 = Fn(([p0, wp0]) => {
  const p = p0.toVar();
  const wp = wp0.toVar();
  const s = float(0).toVar();
  const a = float(0.5).toVar();
  for (let i = 0; i < 3; i++) {
    const k = float(1).sub(smoothstep(0.35, 0.90, wp)).toVar();
    const v = float(0.5).toVar();
    If(k.greaterThan(0.002), () => { v.assign(mix(float(0.5), vn2(p), k)); });
    s.addAssign(a.mul(v));
    p.assign(p.mul(2.11));
    a.assign(a.mul(0.5));
    wp.assign(wp.mul(2.11));
  }
  return s;
});

/* A hard feature fades to its own spatial mean once a pixel is wider than the
   feature. `mean` is the closed-form average of the sharp expression over one
   cell — for smoothstep(0, w, e) with e the distance to the nearest cell edge
   that average is exactly 1 - w/cell per axis. Using the true mean rather than
   widening the smoothstep is the whole trick: widening spreads the joint until
   the wall is half joint and reads two stops too dark, which is the usual way
   this gets done wrong. */
export const blFeat = Fn(([sharp, mean, feat, cell, wa]) =>
  mix(sharp, mean, smoothstep(feat, max(feat.mul(2.0), cell.mul(0.5)), wa)));

/* A per-cell constant fades to the mean of its own distribution — h21 is
   uniform on 0..1, so 0.5 — once the cell is under about two pixels. This is
   the term that puts salt and pepper on a distant brick wall. */
export const blCell = Fn(([v, cell, wa]) =>
  mix(v, float(0.5), smoothstep(cell.mul(0.30), cell.mul(0.75), wa)));

/* The pixel footprint on the surface, as vec2(major, geometric mean), in
   metres. Kept here beside the law that consumes it. */
export const footprint = Fn(([wp]) => {
  const la = length(wp.dFdx()).toVar();
  const lb = length(wp.dFdy()).toVar();
  return vec2(max(la, lb), sqrt(max(la.mul(lb), 1e-12)));
});

/* --------------------------------------------------------------------------
   srfH(q, s) -> vec3(height, cavity, grain)

   `q` is the triplanar world coordinate in metres — every frequency in here
   is therefore a real dimension, which is the whole reason the scale errors
   in this law were findable by measuring rather than by eye.
   -------------------------------------------------------------------------- */
export const srfH = Fn(([q0, s0, wa0, wg0]) => {
  /* Both parameters are materialised HERE, above the ladder, and this is not
     tidiness — it is the whole reason the classes past ASHLAR rendered black.

     TSL emits a shared node's initialisation at its FIRST USE. `q` arrives as
     `triplanarUV(positionWorld, normalWorld)`, and its first use used to be
     inside the `If(s < 0.5)` body, so the builder wrote

         if ( cls < 0.5 ) {
             normalView  = ...;                 // <- initialised in here
             normalWorld = normalize( ... );
             uv = ...;
         } else if ( cls < 1.5 ) {
             normalWorld = normalize( vec4( normalView, 0 ) * viewMatrix );
                                       //   ^ never assigned on this path

     Every branch but the first read an unassigned `normalView`, normalised
     a zero vector, and got NaN — which propagates to the albedo and reads as
     a black panel. One `.toVar()` above the branch pins the assignment to the
     unconditional scope and all twelve classes light.

     The rule this cost four rounds to learn: an Fn that branches must
     materialise its parameters before its first If. */
  const q = q0.toVar();
  const s = s0.toVar();
  const wa = wa0.toVar();                  // footprint, major axis, metres
  const wg = wg0.toVar();                  // footprint, geometric mean, metres
  const out = vec3(0, 1, 0.5).toVar();     // height, cavity, grain

  /* ---- 0 ASHLAR: 225 mm courses, 420-840 mm blocks, 16 mm recessed joint */
  If(s.lessThan(0.5), () => {
    const course = float(0.225);
    const row = floor(q.y.div(course)).toVar();
    const off = h11(row.mul(7.13)).mul(0.9).toVar();
    const bl = float(0.42).add(h11(row.mul(3.7).add(11.0)).mul(0.42)).toVar();
    const jx = fract(q.x.add(off).div(bl)).toVar();
    const jy = fract(q.y.div(course)).toVar();
    const e = min(min(jx, float(1).sub(jx)).mul(bl),
      min(jy, float(1).sub(jy)).mul(course)).toVar();
    const jw = float(0.016);
    const cell = min(bl, course).toVar();
    const joint = blFeat(smoothstep(0.0, jw, e),
      float(1).sub(jw.div(bl)).mul(float(1).sub(jw.div(course))), jw, cell, wa).toVar();
    const stone = blCell(h21(vec2(floor(q.x.add(off).div(bl)), row).mul(1.37)),
      cell, wa).toVar();
    // each block sits a little proud or shy of its neighbours, and its face is
    // not flat: that is what separates coursed stone from a grid
    const face = float(0.55).add(
      fb2(q.mul(22.0).add(stone.mul(30.0)), wg.mul(22.0)).mul(0.45));
    out.assign(vec3(
      joint.mul(float(0.55).add(stone.mul(0.45))).mul(0.55).add(face.mul(0.30).mul(joint)),
      joint, stone));
  })
    /* ---- 1 RENDER: mud plaster, three octaves and nothing else ---------- */
    .ElseIf(s.lessThan(1.5), () => {
      const t = fb2(q.mul(3.2), wg.mul(3.2)).mul(0.55)
        .add(fb2(q.mul(14.0), wg.mul(14.0)).mul(0.30))
        .add(fb2(q.mul(46.0), wg.mul(46.0)).mul(0.15)).toVar();
      out.assign(vec3(t, float(0.55).add(t.mul(0.45)), t));
    })
    /* ---- 2 BRICK: 235 x 82 mm, stretcher bond, 11 mm mortar ------------ */
    .ElseIf(s.lessThan(2.5), () => {
      const ch = float(0.082), cw = float(0.235);
      const row = floor(q.y.div(ch)).toVar();
      const sft = mod(row, 2.0).mul(0.5).mul(cw).toVar();
      const jx = fract(q.x.add(sft).div(cw)).toVar();
      const jy = fract(q.y.div(ch)).toVar();
      const e = min(min(jx, float(1).sub(jx)).mul(cw),
        min(jy, float(1).sub(jy)).mul(ch)).toVar();
      const mw = float(0.011);
      const cell = min(cw, ch).toVar();
      const mortar = blFeat(smoothstep(0.0, mw, e),
        float(1).sub(mw.div(cw)).mul(float(1).sub(mw.div(ch))), mw, cell, wa).toVar();
      const bk = blCell(h21(vec2(floor(q.x.add(sft).div(cw)), row).mul(1.91)),
        cell, wa).toVar();
      out.assign(vec3(
        mortar.mul(float(0.62).add(bk.mul(0.38))).mul(0.72)
          .add(fb2(q.mul(40.0), wg.mul(40.0)).mul(0.16).mul(mortar)),
        mortar, bk));
    })
    /* ---- 3 TIMBER: boards at 5.2/m with a groove and a long grain ------
       the groove threshold is in BOARD units, not metres — 0.06 of a 192 mm
       board is 11.5 mm — so both it and the edge distance go back into metres
       before the footprint is allowed to judge them */
    .ElseIf(s.lessThan(3.5), () => {
      const bwm = float(1.0 / 5.2);
      const board = floor(q.y.mul(5.2)).toVar();
      const bj = fract(q.y.mul(5.2)).toVar();
      const gwm = float(0.06 / 5.2);
      const groove = blFeat(smoothstep(0.0, gwm, min(bj, float(1).sub(bj)).mul(bwm)),
        float(1).sub(gwm.div(bwm)), gwm, bwm, wa).toVar();
      const gr = fb2(vec2(q.x.mul(2.2), q.y.mul(60.0)), wg.mul(60.0)).toVar();
      out.assign(vec3(
        groove.mul(float(0.6).add(gr.mul(0.4))).mul(0.5)
          .add(blCell(h11(board.mul(5.1)), bwm, wa).mul(0.12).mul(groove)),
        groove, gr));
    })
    /* ---- 4 TRAVERTINE: 900 x 450 panels, broken course, open pores -----
       These were 2.3 x 1.15 m in the first build — bigger than a door, in an
       unbroken grid over the commonest façade material in the plan, and the
       single biggest reason the district read as stacked blocks. */
    .ElseIf(s.lessThan(4.5), () => {
      const sh = float(0.45), sw = float(0.90);
      const row = floor(q.y.div(sh)).toVar();
      const sft = mod(row, 2.0).mul(0.5).mul(sw)
        .add(h11(row.mul(4.7)).mul(0.18)).toVar();
      const jx = fract(q.x.add(sft).div(sw)).toVar();
      const jy = fract(q.y.div(sh)).toVar();
      const e = min(min(jx, float(1).sub(jx)).mul(sw),
        min(jy, float(1).sub(jy)).mul(sh)).toVar();
      const jw = float(0.006);
      const cell = min(sw, sh).toVar();
      const joint = blFeat(smoothstep(0.0, jw, e),
        float(1).sub(jw.div(sw)).mul(float(1).sub(jw.div(sh))), jw, cell, wa).toVar();
      const band = fb2(vec2(q.x.mul(2.2), q.y.mul(16.0)), wg.mul(16.0)).toVar();
      const slab = blCell(h21(vec2(floor(q.x.add(sft).div(sw)), row).mul(1.61)),
        cell, wa).toVar();
      const pit = smoothstep(0.62, 0.92, fb2(q.mul(26.0), wg.mul(26.0))).toVar();
      out.assign(vec3(
        joint.mul(float(0.62).add(slab.mul(0.38))).mul(0.40).sub(pit.mul(0.22)),
        joint.mul(float(1).sub(pit.mul(0.7))),
        band.mul(0.35).add(slab.mul(0.65))));
    })
    /* ---- 5 CONCRETE / white render ------------------------------------- */
    .ElseIf(s.lessThan(5.5), () => {
      const t = fb2(q.mul(4.2), wg.mul(4.2)).mul(0.6)
        .add(fb2(q.mul(19.0), wg.mul(19.0)).mul(0.4)).toVar();
      out.assign(vec3(t.mul(0.6), float(0.7).add(t.mul(0.3)), t));
    })
    /* ---- 6 METAL: brushed, anisotropic ---------------------------------- */
    .ElseIf(s.lessThan(6.5), () => {
      const t = fb2(vec2(q.x.mul(90.0), q.y.mul(4.0)), wg.mul(90.0)).toVar();
      out.assign(vec3(t.mul(0.25), 1.0, t));
    })
    /* ---- 7 PAVING: irregular flags at ~0.5 m ---------------------------
       A Worley cell field, warped. The warp was 1.30 in the first build,
       which merged neighbouring cells and made the flags read at twice the
       frequency's size — measured against the 2 m ruler at 1.0-1.3 m where a
       real flag is 0.4-0.6. */
    .ElseIf(s.lessThan(7.5), () => {
      /* A Worley cell is one unit of p2, which is 247 mm of ground. Once a
         pixel is wider than that the nine hashes below are nine random numbers
         per pixel and the whole loop is a sparkle generator — so past that
         width it is skipped and the flags go straight to their mean. That is
         both the correct filtered answer and the biggest single cost in this
         shader gone from every distant square metre of pavement. */
      const cellm = float(1.0 / 4.05);
      const ewm = float(0.038 / 4.05);
      const edge = float(1).sub(ewm.div(cellm)).toVar();
      const slab = float(0.5).toVar();
      If(wa.lessThan(cellm.mul(0.85)), () => {
        const warp = vec2(fb3(q.mul(0.28), wg.mul(0.28)),
          fb3(q.mul(0.28).add(19.0), wg.mul(0.28))).sub(0.5).toVar();
        const p2 = q.mul(4.05).add(warp.mul(0.85)).toVar();
        const ci = floor(p2).toVar();
        const cf = fract(p2).toVar();
        const best = float(9).toVar();
        const second = float(9).toVar();
        const bid = vec2(0, 0).toVar();
        for (let j = -1; j <= 1; j++) {
          for (let i = -1; i <= 1; i++) {
            const g = vec2(i, j);
            const o = vec2(h21(ci.add(g)), h21(ci.add(g).add(41.7)));
            const d = length(g.add(o).sub(cf)).toVar();
            If(d.lessThan(best), () => {
              second.assign(best); best.assign(d); bid.assign(ci.add(g));
            }).ElseIf(d.lessThan(second), () => { second.assign(d); });
          }
        }
        edge.assign(blFeat(smoothstep(0.0, ewm, second.sub(best).mul(cellm)),
          float(1).sub(ewm.div(cellm)), ewm, cellm, wa));
        slab.assign(blCell(h21(bid.mul(1.13)), cellm, wa));
      });
      out.assign(vec3(
        edge.mul(float(0.5).add(slab.mul(0.5))).mul(0.5)
          .add(edge.mul(0.22).mul(fb2(q.mul(9.0), wg.mul(9.0)))),
        edge, slab));
    })
    /* ---- 8 SAND ---------------------------------------------------------- */
    .ElseIf(s.lessThan(8.5), () => {
      const d = fb2(q.mul(0.9), wg.mul(0.9)).mul(0.6)
        .add(fb2(q.mul(6.0), wg.mul(6.0)).mul(0.4)).toVar();
      out.assign(vec3(d, 1.0, d));
    })
    /* ---- 9 ASPHALT ------------------------------------------------------- */
    .ElseIf(s.lessThan(9.5), () => {
      const g2 = fb2(q.mul(26.0), wg.mul(26.0)).mul(0.6)
        .add(fb2(q.mul(90.0), wg.mul(90.0)).mul(0.4)).toVar();
      out.assign(vec3(g2.mul(0.5), float(0.8).add(g2.mul(0.2)), g2));
    })
    /* ---- 10 FABRIC ------------------------------------------------------
       A woven cloth at two metres is smooth; the weave of a thobe is
       sub-millimetre and what you see at conversational distance is drape.
       This was a 3 cm chequer at full amplitude, which put gingham on every
       figure, awning and cushion in the district. */
    .ElseIf(s.lessThan(10.5), () => {
      const fold = fb2(q.mul(5.5), wg.mul(5.5)).mul(0.62)
        .add(fb2(q.mul(17.0), wg.mul(17.0)).mul(0.38)).toVar();
      /* the weave is 4.8 mm — under a pixel from about a metre and a half
         away, and a sin() aliases into wide moire bands rather than into
         noise, which is far more visible. It goes to its mean early. */
      const wk = float(1).sub(smoothstep(0.0012, 0.0034, wa)).toVar();
      const w = float(0.5).add(
        sin(q.x.mul(1300.0)).mul(sin(q.y.mul(1300.0))).mul(0.5).mul(wk));
      out.assign(vec3(fold.mul(0.52).add(w.mul(0.055)),
        1.0, float(0.34).add(fold.mul(0.66))));
    })
    /* ---- 11 FOLIAGE ------------------------------------------------------ */
    .Else(() => {
      const g = fb2(q.mul(4.0), wg.mul(4.0)).toVar();
      out.assign(vec3(g, 1.0, g));
    });

  return out;
});

/* --------------------------------------------------------------------------
   The triplanar frame. The dominant axis of the world normal picks the plane,
   and its two companions are the tangent and bitangent the relief is bent
   along. Working in world space means the perturbed normal comes out ready to
   use, with no model matrix in the fragment shader.
   -------------------------------------------------------------------------- */
export const triplanarUV = Fn(([wp0, wn0]) => {
  // both above the branch — see the note on srfH
  const wp = wp0.toVar(), wn = wn0.toVar();
  const a = abs(wn).toVar();
  const uv = vec2(0, 0).toVar();
  If(a.y.greaterThan(max(a.x, a.z)), () => {
    uv.assign(wp.xz);
  }).ElseIf(a.x.greaterThan(a.z), () => {
    uv.assign(vec2(wp.z, wp.y));
  }).Else(() => {
    uv.assign(vec2(wp.x, wp.y));
  });
  return uv;
});

/* The triplanar tangent frame. The GLSL built Tw/Bw beside the uv and combined
   the perturbation back into world space with them; dropping that step is what
   made the first TSL panels render black — a tangent-space vector assigned
   straight to `normalNode` is not a normal, and every face reads as facing
   away from the light. */
export const triplanarFrame = Fn(([wn0]) => {
  const wn = wn0.toVar();          // above the branch — see the note on srfH
  const a = abs(wn).toVar();
  const t = vec3(1, 0, 0).toVar();
  If(a.y.greaterThan(max(a.x, a.z)), () => {
    t.assign(vec3(1, 0, 0));
  }).ElseIf(a.x.greaterThan(a.z), () => {
    t.assign(vec3(0, 0, 1));
  }).Else(() => {
    t.assign(vec3(1, 0, 0));
  });
  // Gram-Schmidt against the normal, as the original did
  return t.sub(wn.mul(dot(wn, t))).normalize();
});

/* The relief normal, by central difference on the height field. `fade` is the
   distance term: the WebGL2 build faded relief out between 26 and 95 m, which
   left everything past the middle of a 200 m street as flat paint carrying a
   per-block albedo pattern. 70 to 300 m, and the samples were always taken
   either way. */
/* staged variants, so the fault can be walked to a line rather than guessed.
   stage 1: constant — proves the wrapper
   stage 2: gradient, no normalize
   stage 3: one srfH call instead of three (constant gradient)
   stage 0/default: the real thing */
export const reliefNormalStaged = Fn(([uv0, s0, dist0, amp0, stage, wn0, fp0]) => {
  // materialised above the ladder, for the reason recorded on srfH
  const uv = uv0.toVar(), s = s0.toVar(), dist = dist0.toVar(), amp = amp0.toVar();
  const wn = wn0.toVar(), fp = fp0.toVar();
  const out = vec3(0, 0, 1).toVar();
  If(stage.equal(2), () => {
    const e = max(float(0.006).add(dist.mul(0.00035)), fp.x).toVar();
    const h0 = srfH(uv, s, fp.x, fp.y).toVar();
    const hx = srfH(uv.add(vec2(e, 0)), s, fp.x, fp.y).toVar();
    const hy = srfH(uv.add(vec2(0, e)), s, fp.x, fp.y).toVar();
    const k = amp.div(e).toVar();
    out.assign(vec3(hx.x.sub(h0.x).mul(k).negate(),
      hy.x.sub(h0.x).mul(k).negate(), 1.0));      // no normalize
  }).ElseIf(stage.equal(3), () => {
    const h0 = srfH(uv, s, fp.x, fp.y).toVar();   // one call, not three
    out.assign(vec3(h0.x.mul(0.1), h0.y.mul(0.1), 1.0).normalize());
  });
  /* framed into world space by the same triplanar basis the real one uses, so
     a stage reading can be compared against the full path without the space
     being one of the differences */
  const T = triplanarFrame(wn).toVar();
  const B = wn.cross(T).normalize().toVar();
  return T.mul(out.x).add(B.mul(out.y)).add(wn.mul(out.z)).normalize();
});

export const reliefNormal = Fn(([uv, s, dist, amp, fp]) => {
  /* The central difference must never be finer than a pixel. Sampling the
     height field at 6 mm through a pixel that covers 300 mm asks for the slope
     between two arbitrary points of a field with twenty features between them,
     which is a random direction — and a random normal direction is exactly the
     sparkle on a distant wall. This one max() is half of what the band-limit
     buys, because the normal aliases harder than the albedo does. */
  const e = max(float(0.006).add(dist.mul(0.00035)), fp.x).toVar();
  const h0 = srfH(uv, s, fp.x, fp.y).toVar();
  const hx = srfH(uv.add(vec2(e, 0)), s, fp.x, fp.y).toVar();
  const hy = srfH(uv.add(vec2(0, e)), s, fp.x, fp.y).toVar();
  const fade = float(1).sub(smoothstep(70.0, 300.0, dist)).toVar();
  const k = amp.mul(fade).div(e).toVar();
  const pn = vec3(hx.x.sub(h0.x).mul(k).negate(),
    hy.x.sub(h0.x).mul(k).negate(), 1.0).normalize().toVar();
  return pn;
});

/* the same perturbation put back into world space with the triplanar frame,
   for consumers that want a world normal rather than a tangent-space one */
export const reliefNormalWorld = Fn(([uv, s, dist, amp, wn, fp]) => {
  const pn = reliefNormal(uv, s, dist, amp, fp).toVar();
  const T = triplanarFrame(wn).toVar();
  const B = wn.cross(T).normalize().toVar();
  return T.mul(pn.x).add(B.mul(pn.y)).add(wn.mul(pn.z)).normalize();
});

export const SURF = {
  ASHLAR: 0, RENDER: 1, BRICK: 2, TIMBER: 3, TRAVERTINE: 4, CONCRETE: 5,
  METAL: 6, PAVING: 7, SAND: 8, ASPHALT: 9, FABRIC: 10, FOLIAGE: 11,
};
