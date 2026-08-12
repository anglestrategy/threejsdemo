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
  smoothstep, pow, length, mod, sign,
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

/* four and three octaves, unrolled as in the original */
export const fb2 = Fn(([p0]) => {
  const p = p0.toVar();
  const s = float(0).toVar();
  const a = float(0.5).toVar();
  for (let i = 0; i < 4; i++) {
    s.addAssign(a.mul(vn2(p)));
    p.assign(p.mul(2.03));
    a.assign(a.mul(0.52));
  }
  return s;
});

export const fb3 = Fn(([p0]) => {
  const p = p0.toVar();
  const s = float(0).toVar();
  const a = float(0.5).toVar();
  for (let i = 0; i < 3; i++) {
    s.addAssign(a.mul(vn2(p)));
    p.assign(p.mul(2.11));
    a.assign(a.mul(0.5));
  }
  return s;
});

/* --------------------------------------------------------------------------
   srfH(q, s) -> vec3(height, cavity, grain)

   `q` is the triplanar world coordinate in metres — every frequency in here
   is therefore a real dimension, which is the whole reason the scale errors
   in this law were findable by measuring rather than by eye.
   -------------------------------------------------------------------------- */
export const srfH = Fn(([q0, s0]) => {
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
    const joint = smoothstep(0.0, 0.016, e).toVar();
    const stone = h21(vec2(floor(q.x.add(off).div(bl)), row).mul(1.37)).toVar();
    // each block sits a little proud or shy of its neighbours, and its face is
    // not flat: that is what separates coursed stone from a grid
    const face = float(0.55).add(fb2(q.mul(22.0).add(stone.mul(30.0))).mul(0.45));
    out.assign(vec3(
      joint.mul(float(0.55).add(stone.mul(0.45))).mul(0.55).add(face.mul(0.30).mul(joint)),
      joint, stone));
  })
    /* ---- 1 RENDER: mud plaster, three octaves and nothing else ---------- */
    .ElseIf(s.lessThan(1.5), () => {
      const t = fb2(q.mul(3.2)).mul(0.55)
        .add(fb2(q.mul(14.0)).mul(0.30))
        .add(fb2(q.mul(46.0)).mul(0.15)).toVar();
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
      const mortar = smoothstep(0.0, 0.011, e).toVar();
      const bk = h21(vec2(floor(q.x.add(sft).div(cw)), row).mul(1.91)).toVar();
      out.assign(vec3(
        mortar.mul(float(0.62).add(bk.mul(0.38))).mul(0.72)
          .add(fb2(q.mul(40.0)).mul(0.16).mul(mortar)),
        mortar, bk));
    })
    /* ---- 3 TIMBER: boards at 5.2/m with a groove and a long grain ------ */
    .ElseIf(s.lessThan(3.5), () => {
      const board = floor(q.y.mul(5.2)).toVar();
      const bj = fract(q.y.mul(5.2)).toVar();
      const groove = smoothstep(0.0, 0.06, min(bj, float(1).sub(bj))).toVar();
      const gr = fb2(vec2(q.x.mul(2.2), q.y.mul(60.0))).toVar();
      out.assign(vec3(
        groove.mul(float(0.6).add(gr.mul(0.4))).mul(0.5)
          .add(h11(board.mul(5.1)).mul(0.12).mul(groove)),
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
      const joint = smoothstep(0.0, 0.006, e).toVar();
      const band = fb2(vec2(q.x.mul(2.2), q.y.mul(16.0))).toVar();
      const slab = h21(vec2(floor(q.x.add(sft).div(sw)), row).mul(1.61)).toVar();
      const pit = smoothstep(0.62, 0.92, fb2(q.mul(26.0))).toVar();
      out.assign(vec3(
        joint.mul(float(0.62).add(slab.mul(0.38))).mul(0.40).sub(pit.mul(0.22)),
        joint.mul(float(1).sub(pit.mul(0.7))),
        band.mul(0.35).add(slab.mul(0.65))));
    })
    /* ---- 5 CONCRETE / white render ------------------------------------- */
    .ElseIf(s.lessThan(5.5), () => {
      const t = fb2(q.mul(4.2)).mul(0.6).add(fb2(q.mul(19.0)).mul(0.4)).toVar();
      out.assign(vec3(t.mul(0.6), float(0.7).add(t.mul(0.3)), t));
    })
    /* ---- 6 METAL: brushed, anisotropic ---------------------------------- */
    .ElseIf(s.lessThan(6.5), () => {
      const t = fb2(vec2(q.x.mul(90.0), q.y.mul(4.0))).toVar();
      out.assign(vec3(t.mul(0.25), 1.0, t));
    })
    /* ---- 7 PAVING: irregular flags at ~0.5 m ---------------------------
       A Worley cell field, warped. The warp was 1.30 in the first build,
       which merged neighbouring cells and made the flags read at twice the
       frequency's size — measured against the 2 m ruler at 1.0-1.3 m where a
       real flag is 0.4-0.6. */
    .ElseIf(s.lessThan(7.5), () => {
      const warp = vec2(fb3(q.mul(0.28)), fb3(q.mul(0.28).add(19.0)))
        .sub(0.5).toVar();
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
      const edge = smoothstep(0.0, 0.038, second.sub(best)).toVar();
      const slab = h21(bid.mul(1.13)).toVar();
      out.assign(vec3(
        edge.mul(float(0.5).add(slab.mul(0.5))).mul(0.5)
          .add(edge.mul(0.22).mul(fb2(q.mul(9.0)))),
        edge, slab));
    })
    /* ---- 8 SAND ---------------------------------------------------------- */
    .ElseIf(s.lessThan(8.5), () => {
      const d = fb2(q.mul(0.9)).mul(0.6).add(fb2(q.mul(6.0)).mul(0.4)).toVar();
      out.assign(vec3(d, 1.0, d));
    })
    /* ---- 9 ASPHALT ------------------------------------------------------- */
    .ElseIf(s.lessThan(9.5), () => {
      const g2 = fb2(q.mul(26.0)).mul(0.6).add(fb2(q.mul(90.0)).mul(0.4)).toVar();
      out.assign(vec3(g2.mul(0.5), float(0.8).add(g2.mul(0.2)), g2));
    })
    /* ---- 10 FABRIC ------------------------------------------------------
       A woven cloth at two metres is smooth; the weave of a thobe is
       sub-millimetre and what you see at conversational distance is drape.
       This was a 3 cm chequer at full amplitude, which put gingham on every
       figure, awning and cushion in the district. */
    .ElseIf(s.lessThan(10.5), () => {
      const fold = fb2(q.mul(5.5)).mul(0.62).add(fb2(q.mul(17.0)).mul(0.38)).toVar();
      const w = float(0.5).add(sin(q.x.mul(1300.0)).mul(sin(q.y.mul(1300.0))).mul(0.5));
      out.assign(vec3(fold.mul(0.52).add(w.mul(0.055)),
        1.0, float(0.34).add(fold.mul(0.66))));
    })
    /* ---- 11 FOLIAGE ------------------------------------------------------ */
    .Else(() => {
      const g = fb2(q.mul(4.0)).toVar();
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
export const reliefNormalStaged = Fn(([uv0, s0, dist0, amp0, stage, wn0]) => {
  // materialised above the ladder, for the reason recorded on srfH
  const uv = uv0.toVar(), s = s0.toVar(), dist = dist0.toVar(), amp = amp0.toVar();
  const wn = wn0.toVar();
  const out = vec3(0, 0, 1).toVar();
  If(stage.equal(2), () => {
    const e = float(0.006).add(dist.mul(0.00035)).toVar();
    const h0 = srfH(uv, s).toVar();
    const hx = srfH(uv.add(vec2(e, 0)), s).toVar();
    const hy = srfH(uv.add(vec2(0, e)), s).toVar();
    const k = amp.div(e).toVar();
    out.assign(vec3(hx.x.sub(h0.x).mul(k).negate(),
      hy.x.sub(h0.x).mul(k).negate(), 1.0));      // no normalize
  }).ElseIf(stage.equal(3), () => {
    const h0 = srfH(uv, s).toVar();               // one call, not three
    out.assign(vec3(h0.x.mul(0.1), h0.y.mul(0.1), 1.0).normalize());
  });
  /* framed into world space by the same triplanar basis the real one uses, so
     a stage reading can be compared against the full path without the space
     being one of the differences */
  const T = triplanarFrame(wn).toVar();
  const B = wn.cross(T).normalize().toVar();
  return T.mul(out.x).add(B.mul(out.y)).add(wn.mul(out.z)).normalize();
});

export const reliefNormal = Fn(([uv, s, dist, amp]) => {
  const e = float(0.006).add(dist.mul(0.00035)).toVar();
  const h0 = srfH(uv, s).toVar();
  const hx = srfH(uv.add(vec2(e, 0)), s).toVar();
  const hy = srfH(uv.add(vec2(0, e)), s).toVar();
  const fade = float(1).sub(smoothstep(70.0, 300.0, dist)).toVar();
  const k = amp.mul(fade).div(e).toVar();
  const pn = vec3(hx.x.sub(h0.x).mul(k).negate(),
    hy.x.sub(h0.x).mul(k).negate(), 1.0).normalize().toVar();
  return pn;
});

/* the same perturbation put back into world space with the triplanar frame,
   for consumers that want a world normal rather than a tangent-space one */
export const reliefNormalWorld = Fn(([uv, s, dist, amp, wn]) => {
  const pn = reliefNormal(uv, s, dist, amp).toVar();
  const T = triplanarFrame(wn).toVar();
  const B = wn.cross(T).normalize().toVar();
  return T.mul(pn.x).add(B.mul(pn.y)).add(wn.mul(pn.z)).normalize();
});

export const SURF = {
  ASHLAR: 0, RENDER: 1, BRICK: 2, TIMBER: 3, TRAVERTINE: 4, CONCRETE: 5,
  METAL: 6, PAVING: 7, SAND: 8, ASPHALT: 9, FABRIC: 10, FOLIAGE: 11,
};
