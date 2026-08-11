/* ============================================ CONTENT: THE KIT OF PARTS ==
   Everything that repeats is built once here and instanced. Per-instance
   colour carries the variation law; the surface class carries the material
   law; the wind term in the vertex shader carries the motion.            */

const LIGHTS = [];       // string-light bookkeeping (count only; flicker is in-shader)
const JETS = [];         // fountain jets, animated
const WALKERS = [];      // people on seeded paths
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

/* ------------------------------------------------------------ light pools
   A lantern that does not put a pool of light on the ground is a prop, not a
   light. These are additive discs with a soft radial falloff and a little
   noise so the edge is not a circle; one instanced quad each.            */
const poolMat = new THREE.ShaderMaterial({
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

/* glass: transparent, low roughness, keeps a little of the sky */
const glassMat = new THREE.MeshStandardMaterial({
  vertexColors: true, transparent: true, opacity: 0.34, roughness: 0.06,
  metalness: 0.70, color: 0xffffff, side: THREE.DoubleSide, depthWrite: false,
  envMapIntensity: 1.5,
});
// shopfront glazing is nearly clear: you are meant to see the lit room
const shopGlassMat = new THREE.MeshStandardMaterial({
  vertexColors: true, transparent: true, opacity: 0.13, roughness: 0.05,
  metalness: 0.30, color: 0xffffff, side: THREE.DoubleSide, depthWrite: false,
  envMapIntensity: 0.75,
});

/* ---------------------------------------------------------- kit geometry */
function kitBox(list, x, y, z, w, h, d, col, surf, shade, ry, rx, rz) {
  list.push({ geo: G_BOXT, mtx: xf3(x, y, z, rx || 0, ry || 0, rz || 0, w, h, d), col, surf, shade });
}
function kitCyl(list, x, y, z, r, h, col, surf, shade) {
  list.push({ geo: G_CYLT, mtx: xf(x, y, z, 0, r * 2, h, r * 2), col, surf, shade });
}

function defineKit() {
  /* ---- palm: a ringed trunk and eleven drooping fronds --------------- */
  {
    const L = [];
    const H = 7.0;
    for (let i = 0; i < 11; i++) {
      const t = i / 11;
      const r = 0.30 * (1 - t * 0.42);
      kitBox(L, Math.sin(t * 6) * 0.10 * t, H * t, Math.cos(t * 5) * 0.10 * t, r * 2, H / 11 * 1.06, r * 2,
        i % 2 ? K.trunk : 0x7a6748, S.TIMBER, 0.80 + 0.2 * t, t * 0.7);
    }
    const NF = 10;
    for (let f = 0; f < NF; f++) {
      const ang = f / NF * 6.283 + 0.2;
      const droop = 0.45 + (f % 3) * 0.16;
      const len = 3.5 + (f % 4) * 0.42;
      const SEG = 7;
      const fcol = f % 3 === 0 ? K.palm : (f % 3 === 1 ? 0x4c6a33 : 0x35502a);
      for (let s = 0; s < SEG; s++) {
        const u = (s + 0.5) / SEG;
        const rad = len * u;
        const yy = H + 0.25 + Math.sin(u * 1.5) * 1.15 - droop * u * u * 3.0;
        const wdt = 0.60 * Math.sin(Math.min(1, u * 1.6) * 3.14) + 0.09;
        // the rachis
        L.push({
          geo: G_BOXT,
          mtx: xf3(Math.sin(ang) * rad, yy, Math.cos(ang) * rad, 0, ang, 0.35 - u * 0.9, 0.075, 0.045, len / SEG * 1.15),
          col: fcol, surf: S.FOLIAGE, shade: 0.70 + 0.34 * u,
        });
        // and the leaflets either side of it, angled down
        for (const sd of [-1, 1]) {
          L.push({
            geo: G_BOXT,
            mtx: xf3(Math.sin(ang) * rad + Math.cos(ang) * sd * wdt * 0.5, yy - wdt * 0.22,
              Math.cos(ang) * rad - Math.sin(ang) * sd * wdt * 0.5,
              sd * 0.55, ang, 0.35 - u * 0.9, wdt, 0.028, len / SEG * 1.05),
            col: fcol, surf: S.FOLIAGE, shade: (0.62 + 0.40 * u) * (sd > 0 ? 1.08 : 0.86),
          });
        }
      }
    }
    // the dead frond skirt under the crown, and a fruit cluster
    for (let f = 0; f < 5; f++) {
      const ang = f / 5 * 6.283;
      L.push({ geo: G_BOXT, mtx: xf3(Math.sin(ang) * 0.55, H - 0.35, Math.cos(ang) * 0.55, 0, ang, 1.15, 0.5, 0.06, 1.1), col: 0x7d6b45, surf: S.FOLIAGE, shade: 0.6 });
    }
    defInst('palm', combine(L));
  }

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
      const rad = 0.32 + (i % 2) * 0.22;
      R.push({
        geo: G_SPHL, mtx: xf3(Math.sin(ang) * rad, 0.30 + (i % 3) * 0.16, Math.cos(ang) * rad, 0, 0, 0, 0.86, 0.62, 0.86),
        col: i % 2 ? K.leaf : K.leafDk, surf: S.FOLIAGE, shade: 0.70 + 0.06 * i,
      });
    }
    defInst('roofbush', combine(R));
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
    defInst('mashrabiya', combine(L));
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
    kitBox(L, 0, 0, 0, 1.05, 0.24, 0.95, 0xffffff, S.FABRIC, 1.0);
    kitBox(L, 0, 0.24, -0.32, 1.0, 0.42, 0.28, 0xffffff, S.FABRIC, 0.92);
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

  /* ---- people: stylised, faceless, respectful ------------------------ */
  const figure = (robe, head, cloth, seated) => {
    const L = [];
    const SPH = new THREE.SphereGeometry(0.5, 7, 5);
    if (seated) {
      L.push({ geo: taper(1.35, 1), mtx: xf3(0, 0, 0, 0, 0, 0, 0.44, 0.58, 0.40), col: robe, surf: S.FABRIC, shade: 0.86 });
      L.push({ geo: taper(0.7, 1), mtx: xf3(0, 0.05, 0.26, 0, 0, 1.45, 0.30, 0.52, 0.30), col: robe, surf: S.FABRIC, shade: 0.80 });
      L.push({ geo: SPH, mtx: xf3(0, 0.60, 0, 0, 0, 0, 0.34, 0.30, 0.32), col: robe, surf: S.FABRIC, shade: 0.92 });
      L.push({ geo: SPH, mtx: xf3(0, 0.78, 0, 0, 0, 0, 0.19, 0.23, 0.19), col: head, surf: S.FABRIC, shade: 0.96 });
      if (cloth) {
        L.push({ geo: SPH, mtx: xf3(0, 0.80, 0, 0, 0, 0, 0.22, 0.16, 0.22), col: cloth, surf: S.FABRIC, shade: 1.0 });
        L.push({ geo: taper(1.6, 1), mtx: xf3(0, 0.62, 0, 0, 0, 0, 0.20, 0.20, 0.20), col: cloth, surf: S.FABRIC, shade: 0.86 });
      }
    } else {
      /* The robe is a stack of eight-sided tapered drums, not a box: a flat
         slab is the loudest tell at eye level, and eight sides is enough to
         read as a body from two metres. Shoulders narrow, hem wide, a slight
         forward lean. */
      const DRUM = (function () { const g = new THREE.CylinderGeometry(0.5, 0.5, 1, 8, 1); g.translate(0, 0.5, 0); return g; })();
      const drum = (y, h, rTop, rBot, col, sh, lean) => {
        const g = DRUM.clone();
        const p = g.attributes.position;
        for (let i = 0; i < p.count; i++) {
          const yy = p.getY(i);
          const r = mix(rBot, rTop, yy);
          p.setX(i, p.getX(i) * r * 2); p.setZ(i, p.getZ(i) * r * 2 * 0.78);
        }
        g.computeVertexNormals();
        L.push({ geo: g, mtx: xf3(0, y, 0, lean || 0, 0, 0, 1, h, 1), col, surf: S.FABRIC, shade: sh });
      };
      drum(0, 0.62, 0.30, 0.40, robe, 0.80);          // the hem
      drum(0.62, 0.46, 0.25, 0.30, robe, 0.88);       // the waist
      drum(1.08, 0.26, 0.27, 0.25, robe, 0.96);       // the shoulders
      L.push({ geo: SPH, mtx: xf3(0, 1.26, 0, 0, 0, 0, 0.30, 0.18, 0.26), col: robe, surf: S.FABRIC, shade: 0.98 });
      L.push({ geo: taper(0.86, 1), mtx: xf3(0, 1.30, 0, 0, 0, 0, 0.15, 0.13, 0.15), col: head, surf: S.FABRIC, shade: 0.86 });
      L.push({ geo: SPH, mtx: xf3(0, 1.43, 0, 0, 0, 0, 0.185, 0.225, 0.185), col: head, surf: S.FABRIC, shade: 0.96 });
      if (cloth) {
        // the shemagh: a cap and two falls either side of the face
        L.push({ geo: SPH, mtx: xf3(0, 1.47, 0, 0, 0, 0, 0.215, 0.20, 0.215), col: cloth, surf: S.FABRIC, shade: 1.0 });
        for (const s of [-1, 1]) {
          L.push({ geo: taper(1.4, 1), mtx: xf3(s * 0.115, 1.10, 0.02, 0, 0, s * 0.09, 0.095, 0.36, 0.15), col: cloth, surf: S.FABRIC, shade: 0.86 });
        }
        L.push({ geo: SPH, mtx: xf3(0, 1.16, -0.09, 0, 0, 0, 0.28, 0.30, 0.16), col: cloth, surf: S.FABRIC, shade: 0.80 });
      }
      for (const s of [-1, 1]) {
        L.push({ geo: taper(0.72, 1), mtx: xf3(s * 0.205, 1.10, 0.01, 0.12, 0, s * 0.13, 0.105, 0.58, 0.105), col: robe, surf: S.FABRIC, shade: 0.76 });
      }
    }
    return combine(L);
  };
  defInst('thobe', figure(0xf0ece2, 0x8a6a4e, 0xd8534a, false));
  defInst('abaya', figure(0x241f26, 0x2a2228, 0, false));
  defInst('child', (function () {
    const g = figure(0xe4d8c4, 0x8a6a4e, 0, false);
    g.scale(0.66, 0.66, 0.66); return g;
  })());
  defInst('sit_thobe', figure(0xf0ece2, 0x8a6a4e, 0xd8534a, true));
  defInst('sit_abaya', figure(0x241f26, 0x2a2228, 0, true));

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
  routeModel('tree', 'island_tree_01', 6.2, { near: 62 });
  routeModel('rooftree', 'island_tree_01', 4.1, { near: 0 });
  routeModel('shrub', 'shrub_02', 1.55, { near: 52 });
  routeModel('olive', 'quiver_tree_01', 2.6, { near: 999 });
  routeModel('yucca', 'quiver_tree_01', 2.3, { near: 999 });
  routeModel('potbush', 'potted_plant_01', 1.05, { near: 999 });
}
