/* ==========================================================================
   THE GLASS, in TSL.

   The WebGPU half of `makeGlassMaterial` in district_content_4.js. Same
   material, same numbers, same reasoning — read the long note there for why
   any of it is the way it is; this file records only what is different about
   saying it in nodes.

   The whole material is four node slots and NOT an `outputNode`, and that
   distinction cost this project a day on the fog:

     three.webgpu.js:  const isCustomOutput = this.outputNode !== null;
                       if ( isCustomOutput ) resultNode = this.outputNode;

   `outputNode` REPLACES the lit fragment rather than receiving it, so writing
   the glass as one final expression would have thrown away the sun, the
   lights and the shop interiors behind it — which is exactly the bug the fog
   had. The composition is done through the slots the lighting model already
   multiplies through instead:

     normalNode     the roll of float glass off the tin bath
     colorNode      what is transmitted: the room, tinted, dimmed as the
                    Fresnel term takes light away from it
     emissiveNode   what is reflected: the dusk sky, added on top
     opacityNode    the Fresnel alpha — 4% face-on, opaque at grazing

   Written this way the standard model still runs underneath, so a pane picks
   up the sun's specular and the street lights for free and agrees with the
   mullion beside it.
   ========================================================================== */

import { Color, DoubleSide, Vector3 } from 'three';
import { MeshStandardNodeMaterial } from 'three/webgpu';
import {
  Fn, float, vec2, vec3, uniform, positionWorld, normalWorld, cameraPosition,
  cameraViewMatrix, normalize, dot, cross, abs, sin, pow, clamp, mix, reflect,
  smoothstep, fract, floor, select, max,
} from 'three/tsl';

/* the same dusk numbers the district's sky dome and fog are built from */
export const GLASS = {
  skyHi: new Color(0x2f4a78),
  skyLo: new Color(0x9fb2cf),
  warm: new Color(0xffc07a),
  gnd: new Color(0x6c6152),
  sun: new Vector3(-0.9232, 0.3420, -0.1754).normalize(),
};

const h21 = Fn(([p]) => {
  const q = vec3(p.x, p.y, p.x).mul(0.1031).fract().toVar();
  q.assign(q.add(dot(q, q.yzx.add(33.33))));
  return fract(q.x.add(q.y).mul(q.z));
});
const vn = Fn(([p]) => {
  const i = floor(p).toVar();
  const f = fract(p).toVar();
  f.assign(f.mul(f).mul(float(3).sub(f.mul(2))));
  return mix(
    mix(h21(i), h21(i.add(vec2(1, 0))), f.x),
    mix(h21(i.add(vec2(0, 1))), h21(i.add(vec2(1, 1))), f.x),
    f.y);
});

/**
 * @param kind 'shop' for shopfront glazing, anything else for a balustrade
 */
export function makeGlassMaterial(kind) {
  const shop = kind === 'shop';
  /* REEDED glass — the vertical-fluted screen. A 12 mm half-round repeated
     across the pane, put into the NORMAL rather than into a map, because that
     is what makes it read: the reflection breaks into vertical bands and the
     room behind smears sideways while staying sharp vertically. A photograph
     of reeded glass cannot do that, since the smear depends on what is
     behind it. */
  const reed = kind === 'reeded';
  const mat = new MeshStandardNodeMaterial({
    vertexColors: true, transparent: true, side: DoubleSide,
    depthWrite: false, opacity: 1.0,
    roughness: shop ? 0.14 : 0.06, metalness: 0.0,
  });

  const uBaseA = uniform(float(reed ? 0.42 : shop ? 0.055 : 0.16));
  const uTint = uniform(new Color(reed ? 0xd8e8e2 : shop ? 0xdcece4 : 0xc8dcd8));
  const uDirt = uniform(float(shop ? 0.55 : 0.30));
  const uSkyHi = uniform(GLASS.skyHi.clone());
  const uSkyLo = uniform(GLASS.skyLo.clone());
  const uWarm = uniform(GLASS.warm.clone());
  const uGnd = uniform(GLASS.gnd.clone());
  const uSunW = uniform(GLASS.sun.clone());

  /* Factories, not shared variables. A `.toVar()` belongs to the node function
     that consumes it, and hoisting one across several independent graphs is
     what collapsed the city material to black — see the note in material.js.
     Each slot below builds its own. */

  /* the pane's own in-plane frame, so the roll and the streaks run along the
     glass rather than along the world axes */
  const frame = Fn(([n]) => {
    const up = select(abs(n.y).greaterThan(0.9), vec3(1, 0, 0), vec3(0, 1, 0)).toVar();
    const t = normalize(cross(up, n)).toVar();
    return t;
  });

  const rolled = () => Fn(() => {
    const nw = normalize(normalWorld).toVar();
    const tw = frame(nw).toVar();
    const bw = cross(nw, tw).toVar();
    const pl = vec2(dot(positionWorld, tw), dot(positionWorld, bw)).toVar();
    /* float glass is drawn over a tin bath and keeps a slight cylindrical
       roll — about a fifth of a degree at a 1.4 m period. It is why a
       reflected parapet bows and steps between panes in a real curtain wall,
       and it is the cue that most reliably separates a rendered window from
       a photographed one. */
    const rollA = sin(pl.y.mul(4.4)).mul(0.0034)
      .add(vn(pl.mul(0.62)).mul(0.0026)).sub(0.0013).toVar();
    const rollB = sin(pl.x.mul(3.1).add(1.7)).mul(0.0021).toVar();
    const n = normalize(nw.add(tw.mul(rollB)).add(bw.mul(rollA))).toVar();
    if (reed) {
      // a 12 mm reed 4 mm deep: a 34-degree slope at the edge of each flute
      const f = fract(pl.x.div(0.012)).sub(0.5).toVar();
      return normalize(n.add(tw.mul(f.mul(1.35))));
    }
    return n;
  })();

  /* the view-facing normal. A double-sided pane must Fresnel off the face you
     can actually see, or every window on the far side of a court inverts. */
  const facing = () => Fn(() => {
    const n = rolled().toVar();
    const v = normalize(cameraPosition.sub(positionWorld)).toVar();
    return select(dot(n, v).lessThan(0.0), n.negate(), n);
  })();

  const fresnel = () => Fn(() => {
    const n = facing().toVar();
    const v = normalize(cameraPosition.sub(positionWorld)).toVar();
    const c = clamp(dot(n, v), 0.0, 1.0).toVar();
    // Schlick, F0 = ((n-1)/(n+1))^2 for n = 1.52 soda-lime float glass
    return float(0.043).add(float(0.957).mul(pow(float(1).sub(c), 5.0)));
  })();

  const dirt = () => Fn(() => {
    const nw = facing().toVar();
    const tw = frame(nw).toVar();
    const pl = vec2(dot(positionWorld, tw), positionWorld.y).toVar();
    /* a vertical film that runs down the pane, heaviest at the bottom and
       streaked along the run of the glass */
    const streak = vn(vec2(pl.x.mul(7.0), pl.y.mul(0.55))).mul(0.65)
      .add(vn(vec2(pl.x.mul(21.0), pl.y.mul(0.30))).mul(0.35)).toVar();
    const low = smoothstep(2.6, 0.0, fract(pl.y.mul(0.5)).mul(2.0)).toVar();
    return clamp(uDirt.mul(float(0.22).add(streak.mul(0.78)))
      .mul(float(0.35).add(low.mul(0.65))), 0.0, 0.55);
  })();

  /* the dusk sky by direction, from the same three colours the district's own
     sky and fog are built from — so a reflection agrees with what it reflects.
     There is no environment map in this build and a real one would cost a cube
     render every frame. */
  const skyOf = Fn(([d, hi, lo, warm, gnd, sun]) => {
    const up = clamp(d.y.mul(0.5).add(0.5), 0.0, 1.0).toVar();
    const c = mix(lo, hi, pow(up, 0.75)).toVar();
    c.addAssign(warm.mul(pow(max(dot(normalize(d), normalize(sun)), 0.0), 5.0)).mul(0.55));
    return mix(gnd.mul(0.75), c, smoothstep(-0.09, 0.06, d.y));
  });

  mat.normalNode = rolled().transformDirection(cameraViewMatrix).normalize();

  /* what gets through: the room behind, tinted by 6 mm of glass twice over,
     dimmed by the film, and taken away as the Fresnel term reflects more */
  mat.colorNode = Fn(() => {
    const F = fresnel().toVar();
    const d = dirt().toVar();
    return uTint.mul(float(1).sub(d.mul(0.5))).mul(clamp(float(1).sub(F), 0.05, 1.0));
  })();

  /* what comes back off it. The sealed unit reflects twice — the inner pane is
     dimmer and slightly offset, which is the doubled highlight you see on any
     modern shopfront. */
  mat.emissiveNode = Fn(() => {
    const n = facing().toVar();
    const v = normalize(cameraPosition.sub(positionWorld)).toVar();
    const F = fresnel().toVar();
    const d = dirt().toVar();
    const r1 = skyOf(reflect(v.negate(), n), uSkyHi, uSkyLo, uWarm, uGnd, uSunW).toVar();
    const r2 = skyOf(reflect(v.negate(), normalize(n.add(vec3(0.004, -0.006, 0.003)))),
      uSkyHi, uSkyLo, uWarm, uGnd, uSunW).toVar();
    const refl = r1.add(r2.mul(0.34)).div(1.34).toVar();
    return refl.mul(clamp(F.add(d.mul(0.5)), 0.0, 1.0));
  })();

  mat.opacityNode = Fn(() => {
    const F = fresnel().toVar();
    const d = dirt().toVar();
    return clamp(uBaseA.add(float(1).sub(uBaseA).mul(F)).add(d.mul(0.45)), 0.0, 1.0);
  })();

  mat.userData.u = { uBaseA, uTint, uDirt, uSkyHi, uSkyLo, uWarm, uGnd, uSunW };
  mat.userData.gpuName = 'glass:' + (kind || 'rail');
  mat.userData.reeded = reed;
  return mat;
}
