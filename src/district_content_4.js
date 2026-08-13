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
    uBaseA: { value: shop ? 0.055 : 0.16 },
    uTint: { value: new THREE.Color(shop ? 0xdcece4 : 0xc8dcd8) },
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
      uniform float uBaseA, uDirt, uFogScaleH;
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
  routeProp('arcadeblk', 'arcade', 11.0, { jitter: false , near: 62 });

  /* ---- the masterplan set ----------------------------------------------
     Generated from the two site aerials rather than from a street-level
     render, so these are the pieces that were missing at plan scale: the
     transit spine under the gold canopy, the roundabout monument, and a
     street architecture that repeats without repeating. */
  routeProp('canopypav', 'canopypav', 15.0, { jitter: false });
  routeProp('tram', 'tram', 3.6, { jitter: false });
  routeProp('tramstop', 'tramstop', 3.4, { jitter: false });
  routeProp('shophouse', 'shophouse', 12.0, { near: 62 });
  routeProp('bluehall', 'bluehall', 16.0, { jitter: false , near: 110 });
  routeProp('resblock', 'resblock', 15.0, { near: 55 });
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
