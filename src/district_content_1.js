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
const INTERIOR = new Acc();   // the shell of every shop, lit by its own ceiling
const GLASS = new Acc();
const SHOPGLASS = new Acc();
/* reeded glass — the vertical-fluted screen that is on half the shopfronts in
   a Gulf street. It takes the transom over every shop window: a clear light up
   there would show the ceiling void and the back of the fascia, and a solid
   one would kill the light; reeded is what the detail is actually for. */
const REEDGLASS = new Acc();
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
  [-200, 150], [-250, 230], [258, 374], [-120, -60],
  [292, 144], [178, 196], [132, 306], [250, 200], [300, 200]];
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

/* ------------------------------------------------------------- VARIANTS --
   One kit name, several props, chosen per instance.

   This is the fix for the failure the whole asset programme keeps running
   into: a scan is one object, and one object placed four hundred times is a
   photocopy. It showed on the palms first, then on the benches, and it would
   have shown worst of all on the buildings — a boulevard of the same corner
   block eleven times is not a street, it is a texture.

   `routePropSet` registers N props under one kit name. Every call site stays
   exactly as it was; `inst()` picks a variant from the instance's own world
   position, so the choice is stable across frames and across reloads (the
   whole district is one seeded world and this must not break that), and
   neighbouring instances land on different variants because the hash is on
   position rather than on an incrementing counter. */
function routePropSet(kit, keys, targetH, opts) {
  const vs = [];
  for (const key of keys) {
    const tmp = '__v:' + kit + ':' + key;
    if (routeProp(tmp, key, targetH, opts)) {
      vs.push(MODEL_ROUTE[tmp]);
      delete MODEL_ROUTE[tmp];
    }
  }
  if (!vs.length) return false;
  MODEL_ROUTE[kit] = vs.length === 1 ? vs[0]
    : { variants: vs, near: vs[0].near, jitter: vs[0].jitter };
  return true;
}

/* Register a generated prop under a kit name, sized to what it actually is.
   Meshy normalises every asset to the same bounding box, so `targetH` is the
   real height in metres and everything else follows from it. */
function routeProp(kit, key, targetH, opts) {
  const P = PROPS[key];
  if (!P || !P.parts.length) return false;
  opts = opts || {};
  /* Measured from the geometry that actually loaded, not from the index.
     The index records accessor min/max, which ignores node transforms — and
     an FBX conversion puts all of its scale there, so the golden-hour interior
     was recorded as 0.2 m across. The loader bakes matrixWorld in, so the
     geometry in hand is always right; ask it. */
  const bb = new THREE.Box3();
  const _b1 = new THREE.Box3();
  for (const p of P.parts) {
    p.geo.computeBoundingBox();
    bb.union(_b1.copy(p.geo.boundingBox));
  }
  const gh = Math.max(0.001, bb.max.y - bb.min.y);
  const k = targetH / gh;
  const fit = new THREE.Matrix4().makeScale(k, k, k)
    .multiply(new THREE.Matrix4().makeTranslation(
      -(bb.min.x + bb.max.x) / 2, -bb.min.y, -(bb.min.z + bb.max.z) / 2));
  const level = (list, sfx) => {
    const names = [];
    list.forEach((p, pi) => {
      const nm = 'p:' + key + sfx + ':' + pi;
      if (!INST_DEF[nm]) {
        defInst(nm, p.geo, {
          mat: makeModelMaterial(p.src, !!opts.foliage),
          shadow: opts.shadow !== false, receive: true, cull: opts.cull !== false,
        });
      }
      names.push(nm);
    });
    return { fit, names };
  };
  /* Two levels where the intake produced one. `near` is the radius round the
     walkable core inside which the full asset is used; outside it the far
     level takes over, which is what lets a 240 k-triangle tram and a 40 k
     shrub both exist in the same scene without either compromising. */
  const parts = [level(P.parts, '')];
  if (P.parts1 && P.parts1.length) parts.push(level(P.parts1, '_l1'));
  MODEL_ROUTE[kit] = {
    parts,
    near: opts.near === undefined ? (parts.length > 1 ? 70 : 1e9) : opts.near,
    jitter: opts.jitter !== false,
  };
  return true;
}

/* Split a multi-figure scan into individually placeable people.

   The two people assets are FBX conversions: ten (and five) separate figures,
   each on its own node, Z-up, scattered over hundreds of units of the
   original scene. Routed whole they would place all ten together in the
   arrangement someone happened to leave them in. So each part is taken on its
   own, stood on end if its long axis is Z, re-centred with its feet at the
   origin, and scaled to a real height — after which it is an ordinary kit
   name the dressing pass can place one at a time.

   These are static, so they take the standing and seated roles and the
   procedural figures keep the walking ones, which is the division the work
   was already set up for.                                                  */
function routePersonParts(key, prefix, targetH) {
  const P = PROPS[key];
  if (!P || !P.parts.length) return [];
  const kits = [];
  P.parts.forEach((p, pi) => {
    const g = p.geo.clone();
    g.computeBoundingBox();
    let bb = g.boundingBox;
    if ((bb.max.z - bb.min.z) > (bb.max.y - bb.min.y) * 1.3) {
      g.rotateX(-Math.PI / 2);
      g.computeBoundingBox();
      bb = g.boundingBox;
    }
    const h = bb.max.y - bb.min.y;
    if (h < 1e-4) return;
    g.translate(-(bb.min.x + bb.max.x) / 2, -bb.min.y, -(bb.min.z + bb.max.z) / 2);
    const k = targetH / h;
    g.scale(k, k, k);
    const nm = 'g:' + prefix + pi;
    if (!INST_DEF[nm]) {
      defInst(nm, g, { mat: makeModelMaterial(p.src, false), shadow: true, receive: true });
    }
    MODEL_ROUTE[prefix + pi] = {
      parts: [{ fit: new THREE.Matrix4(), names: [nm] }], near: 1e9, jitter: true,
    };
    kits.push(prefix + pi);
  });
  return kits;
}

/* ------------------------------------------------------ THE SCANNED CROWD *
   The walkers were the last hand-built thing in the near field: tapered drums
   with 7-segment spheres for heads, and at street level a hundred of them read
   as exactly what they are. The scans are real people — 18 k triangles, cloth,
   faces, folds — but they arrived as ten STATIC figures, and a static person
   standing in the middle of a street is a worse error than a crude one
   walking.

   There is no rigging tool available in this project. What there IS, already
   built and already shipping, is a vertex walk cycle driven by a limb tag in
   the fractional part of a per-vertex float:

       .10 left leg   .20 right leg   .30 left arm   .40 right arm

   So the scans get labelled instead of rigged: every vertex is assigned to a
   limb by WHERE IT IS on the body, and the shader that already swings the
   procedural figures' limbs swings these. That is a skin with binary weights,
   which is the crudest possible skin — and the two things that make a binary
   skin tear are handled in the shader rather than here:

     * a vertex AT the hip must not move, or the mesh rips across the pelvis.
       The swing ramps in over the 180 mm below the pivot.
     * a robe is continuous across the centre line, and two legs rotating
       opposite ways would split it up the middle. The swing ramps in over the
       60 mm either side of the centre line, so a thobe's skirt opens and
       closes about a hem that stays whole.

   Neither ramp touches the procedural figures: their limbs are separate drums
   whose tops already sit 260 mm below the pivot, and they use a different
   material. This is additive.

   Three measurements have to be made off the mesh first, because a scan
   arrives in whatever pose and orientation the scanner left it in:

     1. WHICH HORIZONTAL AXIS IS LATERAL. A person is wider across the
        shoulders than they are deep, so the wider extent of the shoulder band
        is the left-right axis. The figure is then rotated so lateral is +X,
        which is what the shader assumes.
     2. WHICH WAY THEY FACE. Toes stick out forward of the ankle and heels do
        not, so the feet's centroid sits forward of the body's. Where it sits
        behind, the figure is turned around. This is the one measurement with
        a real failure mode — a figure standing with its weight back could
        read either way — so it is asserted in `tests/walkcycle_test.mjs`
        rather than trusted.
     3. WHERE THE SHOULDERS ARE. The arm band runs from the hip to the
        shoulder, and an arm is anything in it further out than 55% of the
        widest point. A figure with its arms held tight to its body gets few
        arm vertices and swings its arms less, which is a deliberate failure
        direction: an unswung arm reads as someone carrying something, and a
        wrongly-swung torso reads as a rendering bug.                        */
function tagWalker(g0, targetH) {
  const g = g0.index ? g0.toNonIndexed() : g0.clone();
  g.computeBoundingBox();
  let bb = g.boundingBox;
  // stand it up if the scan is Z-up, as routePersonParts does
  if ((bb.max.z - bb.min.z) > (bb.max.y - bb.min.y) * 1.3) {
    g.rotateX(-Math.PI / 2);
    g.computeBoundingBox();
    bb = g.boundingBox;
  }
  const h0 = bb.max.y - bb.min.y;
  if (h0 < 1e-4) return null;
  g.translate(-(bb.min.x + bb.max.x) / 2, -bb.min.y, -(bb.min.z + bb.max.z) / 2);
  const k = targetH / h0;
  g.scale(k, k, k);

  const p = g.attributes.position;
  const n = p.count;
  const H = targetH;

  /* 1. the lateral axis: the wider extent across the shoulder band */
  let sx0 = 1e9, sx1 = -1e9, sz0 = 1e9, sz1 = -1e9;
  for (let i = 0; i < n; i++) {
    const y = p.getY(i);
    if (y < H * 0.72 || y > H * 0.90) continue;
    const x = p.getX(i), z = p.getZ(i);
    if (x < sx0) sx0 = x; if (x > sx1) sx1 = x;
    if (z < sz0) sz0 = z; if (z > sz1) sz1 = z;
  }
  if (sx1 < sx0) { sx0 = bb.min.x; sx1 = bb.max.x; sz0 = bb.min.z; sz1 = bb.max.z; }
  if ((sz1 - sz0) > (sx1 - sx0)) g.rotateY(Math.PI / 2);   // put lateral on X

  /* 2. facing: the feet's centroid sits forward of the body's */
  let fz = 0, fn = 0, bz = 0;
  for (let i = 0; i < n; i++) {
    const y = p.getY(i);
    bz += p.getZ(i);
    if (y > H * 0.055) continue;
    fz += p.getZ(i); fn++;
  }
  const toe = fn ? (fz / fn) - (bz / n) : 0;
  const flipped = toe < 0;
  if (flipped) g.rotateY(Math.PI);

  /* 3. the bands, and the widest point of the upper body */
  const HIP = 0.92 * (H / 1.72);
  const SHO = 1.40 * (H / 1.72);
  let latMax = 1e-4;
  for (let i = 0; i < n; i++) {
    const y = p.getY(i);
    if (y < H * 0.50 || y > H * 0.92) continue;
    const a = Math.abs(p.getX(i));
    if (a > latMax) latMax = a;
  }
  const ARM_OUT = latMax * 0.55;

  const sa = new Float32Array(n);
  const tally = [0, 0, 0, 0, 0];
  for (let i = 0; i < n; i++) {
    const x = p.getX(i), y = p.getY(i);
    let tag = 0;
    if (y < HIP) {
      // a hanging forearm reaches below the hip; anything that far out is
      // not a leg, and leaving it untagged is better than swinging it wrong
      if (Math.abs(x) < ARM_OUT) tag = x < 0 ? 0.10 : 0.20;
    } else if (y <= SHO && Math.abs(x) > ARM_OUT) {
      tag = x < 0 ? 0.30 : 0.40;
    }
    sa[i] = tag;
    tally[tag === 0 ? 4 : Math.round(tag * 10) - 1]++;
  }
  g.setAttribute('aSurf', new THREE.BufferAttribute(sa, 1));
  if (!g.attributes.uv) g.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(n * 2), 2));
  g.userData.walkTally = tally;      // read by tests/walkcycle_test.mjs
  /* the SIGNED measurement, kept as measured rather than as corrected. The
     gate asserts on its MAGNITUDE: a figure whose feet sit 2 mm forward of its
     body centroid has not told us which way it faces, and a coin toss on that
     is a walker moonwalking down the souq. */
  g.userData.toe = toe;
  g.userData.flipped = flipped;
  return g;
}

/* The same ten scans again, tagged and given the walking material. They are a
   second set of kit names rather than a replacement for the standers: a
   district needs both, and the geometry is the cheap half of a scan. */
function routeWalkerParts(key, prefix, targetH) {
  const P = PROPS[key];
  if (!P || !P.parts.length) return [];
  const kits = [];
  P.parts.forEach((part, pi) => {
    const g = tagWalker(part.geo, targetH);
    if (!g) return;
    const nm = 'w:' + prefix + pi;
    if (!INST_DEF[nm]) {
      defInst(nm, g, {
        mat: makeModelMaterial(part.src, false, true), shadow: true, receive: true,
        cull: false,
      });
    }
    /* deliberately NOT registered in MODEL_ROUTE. A routed kit resolves to a
       different instanced mesh each frame depending on the camera, and the
       walkers are driven by writing a matrix into one known mesh every frame —
       so these are ordinary instance names the life pass can address
       directly. */
    kits.push(nm);
  });
  return kits;
}


/* ====================================================== THE RIGGED CROWD ==
   This replaces the limb-tagging above, and the reason is worth recording
   because it is the second time on this project that the answer was to look
   at what the tool actually returned rather than at what I assumed it did.

   `tagWalker()` exists because there was no rigger. There still is no rigging
   TOOL — `models3d_rig` is named in another tool's description and is not
   exposed, which I checked twice. But the image-to-3D generator returns a
   figure ALREADY RIGGED: every one of these comes back as `model-rigged.glb`
   with a 41-63 joint skeleton, JOINTS_0 and WEIGHTS_0, and smooth weights.

   So the crowd is skinned rather than labelled. What that buys, concretely:

     * no tear. A binary skin rips at the hip and splits a robe up the middle,
       and the two ramps in `tagWalker` are damage control for exactly that.
       A weighted skin deforms, which is what cloth does.
     * knees. A limb tag can rotate a leg about the hip and nothing else; a
       chain can bend the knee, roll the ankle and swing the arm from the
       shoulder AND the elbow. A straight-legged walk is uncanny in a way that
       is hard to name and impossible to miss.
     * the figures keep their own proportions. No pivot heights assumed.

   `tagWalker` stays for the ten-figure people10 scan, which has no skeleton.
   Both crowds walk; only this one bends.

   ---- what has to be worked out, and how -------------------------------

   The joints are named `tripo::Root`, `tripo::0_Left_Limb_0`, `Head_0` and
   then `bone_5` ... `bone_62`. So the names carry almost nothing and the
   skeleton has to be read from its own REST POSE, which is more reliable
   anyway: a bone's rest position on the body says what it is far better than
   a name a generator picked.

     lateral axis   the figure is widest across the shoulders, so the wider
                    horizontal extent of the 0.72-0.90 H band is left-right
     hip / shoulder measured from the bone cloud rather than assumed: the hip
                    line is where the leg chains start and the shoulder line
                    is where the arm chains do
     limbs          a bone below the hip and inboard of the arm line is a leg;
                    one between hip and shoulder and outboard of it is an arm.
                    Sign of the lateral coordinate splits left from right.
     chain order    sort each limb's bones by height, descending. That is
                    hip, knee, ankle, toe — and shoulder, elbow, wrist —
                    without needing the parent hierarchy to be sane.
   ========================================================================== */
const RIGGED = [];        // { name, mesh, height, limbs }
const RIG_INSTANCES = []; // { obj, bones, rest, phase, speed, path, t, lane }

/* Clone a SkinnedMesh so each walker has its own pose.

   three ships SkeletonUtils for this and it is not vendored here; it is also
   thirty lines, and the thirty lines are worth having in the open because the
   subtle part is not the cloning — Object3D.clone() does that — it is that
   the clone's SkinnedMesh still points at the ORIGINAL skeleton's bones. Miss
   the rebind and all 108 walkers share one skeleton and move as one body,
   which looks like a bug in the walk cycle and is not. */
function cloneSkinned(src) {
  const out = src.clone(true);
  const map = new Map();
  const walk = (a, b) => {
    map.set(a.name, b);
    for (let i = 0; i < a.children.length; i++) walk(a.children[i], b.children[i]);
  };
  walk(src, out);
  out.traverse((o) => {
    if (!o.isSkinnedMesh) return;
    const s = o.skeleton;
    const bones = s.bones.map((b) => map.get(b.name) || b);
    o.bind(new THREE.Skeleton(bones, s.boneInverses), o.bindMatrix.clone());
  });
  return out;
}

/* Read a skeleton's rest pose and work out which bones are which. */
function classifyRig(mesh, H) {
  const sk = mesh.skeleton;
  const P = [];
  mesh.updateMatrixWorld(true);
  for (const b of sk.bones) {
    b.updateMatrixWorld(true);
    const v = new THREE.Vector3().setFromMatrixPosition(b.matrixWorld);
    P.push(v);
  }
  /* the lateral axis: the wider horizontal spread of the shoulder band */
  let sx = 0, sz = 0, n = 0;
  for (const v of P) {
    if (v.y < H * 0.66 || v.y > H * 0.92) continue;
    sx = Math.max(sx, Math.abs(v.x)); sz = Math.max(sz, Math.abs(v.z)); n++;
  }
  const lat = (n && sz > sx) ? 'z' : 'x';       // which component is left-right
  const sag = lat === 'x' ? 'z' : 'x';          // and which is front-back
  let latMax = 1e-4;
  for (const v of P) if (v.y > H * 0.45 && v.y < H * 0.92) latMax = Math.max(latMax, Math.abs(v[lat]));

  const HIP = H * 0.55, SHO = H * 0.80, ARM = latMax * 0.42;
  const L = { ll: [], rl: [], la: [], ra: [], spine: [] };
  for (let i = 0; i < P.length; i++) {
    const v = P[i], a = v[lat];
    if (v.y < HIP && Math.abs(a) < latMax * 0.55) (a < 0 ? L.ll : L.rl).push(i);
    else if (v.y >= HIP && v.y <= SHO * 1.06 && Math.abs(a) > ARM) (a < 0 ? L.la : L.ra).push(i);
    else L.spine.push(i);
  }
  // top of each chain first: hip, knee, ankle — shoulder, elbow, wrist
  for (const k of ['ll', 'rl', 'la', 'ra']) L[k].sort((i, j) => P[j].y - P[i].y);
  L.lat = lat; L.sag = sag;
  return L;
}

/* Load every rigged figure once. Called from the district's async build. */
async function loadRiggedPeople(targetH) {
  let names = [];
  try {
    names = await (await fetch('assets/people.json')).json();
  } catch (e) { return []; }
  const loader = window.__gltfLoader || new THREE.GLTFLoader();
  for (const nm of names) {
    try {
      const g = await loader.loadAsync('assets/people/' + nm + '.glb');
      let mesh = null;
      g.scene.traverse((o) => { if (o.isSkinnedMesh && !mesh) mesh = o; });
      if (!mesh) continue;
      g.scene.updateMatrixWorld(true);
      const bb = new THREE.Box3().setFromObject(g.scene);
      const h0 = Math.max(0.001, bb.max.y - bb.min.y);
      const k = targetH / h0;
      /* Scale and re-seat on the ROOT, not on the mesh: a SkinnedMesh ignores
         its own transform for skinning (the bind matrix owns that), so scaling
         the mesh moves the silhouette and not the skin, which produces a
         figure standing in a puddle of its own geometry. */
      g.scene.scale.setScalar(k);
      g.scene.position.y = -bb.min.y * k;
      g.scene.position.x = -(bb.min.x + bb.max.x) / 2 * k;
      g.scene.position.z = -(bb.min.z + bb.max.z) / 2 * k;
      const holder = new THREE.Group();
      holder.add(g.scene);
      holder.updateMatrixWorld(true);
      const limbs = classifyRig(mesh, targetH);
      mesh.frustumCulled = false;
      mesh.castShadow = true; mesh.receiveShadow = true;
      RIGGED.push({ name: nm, obj: holder, mesh, height: targetH, limbs });
    } catch (e) { /* a figure that fails to load simply is not in the crowd */ }
  }
  return RIGGED;
}

/* ---- the walk ---------------------------------------------------------
   Angles in radians, at the phase of the stride. These are read off a human
   gait rather than invented: the hip swings about 25 degrees peak to peak, the
   knee bends only ONE WAY and only in the swing half — a knee that bends
   backwards is the single most common tell in a hand-written walk cycle — the
   ankle rolls a little late, and the arms swing opposed at about two thirds of
   the leg amplitude, from the shoulder AND the elbow. */
const _rq = new THREE.Quaternion();
const _rax = new THREE.Vector3();
const _rm3 = new THREE.Matrix4();

function poseChain(chain, bones, rest, ang, sagAxis) {
  for (let i = 0; i < chain.length && i < ang.length; i++) {
    const b = bones[chain[i]];
    const r = rest[chain[i]];
    if (!b || !ang[i]) { if (b && r) b.quaternion.copy(r); continue; }
    /* rotate about the FIGURE's sagittal axis, expressed in this bone's own
       parent space — the generator's bone frames are arbitrary, so rotating
       about the bone's local X would swing a leg sideways on half of them */
    _rax.set(sagAxis === 'x' ? 1 : 0, 0, sagAxis === 'z' ? 1 : 0);
    if (b.parent) {
      _rm3.copy(b.parent.matrixWorld).invert();
      _rax.transformDirection(_rm3).normalize();
    }
    b.quaternion.copy(r).multiply(_rq.setFromAxisAngle(_rax, ang[i]));
  }
}

function poseWalker(r, ph, stride) {
  const s = Math.sin(ph), c = Math.cos(ph);
  const k = stride;
  const L = r.limbs, B = r.mesh.skeleton.bones, R = r.rest;
  // hip, knee (one way only), ankle
  const kneeL = Math.max(0, -Math.sin(ph + 0.55)) * 0.62 * k;
  const kneeR = Math.max(0, -Math.sin(ph + 0.55 + Math.PI)) * 0.62 * k;
  poseChain(L.ll, B, R, [0.44 * s * k, -kneeL, 0.18 * Math.sin(ph + 1.1) * k], L.sag);
  poseChain(L.rl, B, R, [-0.44 * s * k, -kneeR, -0.18 * Math.sin(ph + 1.1) * k], L.sag);
  // arms, opposed to their own leg, from shoulder and elbow
  poseChain(L.la, B, R, [-0.30 * s * k, -0.26 * (0.55 + 0.45 * c) * k], L.sag);
  poseChain(L.ra, B, R, [0.30 * s * k, -0.26 * (0.55 - 0.45 * c) * k], L.sag);
}

/* Split a furnished scene into individually placeable pieces.

   `ghscene` is a complete residential interior: fifty-four meshes across
   thirty materials — leather and beige-cushioned sofas, marble, a rug,
   curtains, lamps, two indoor trees — inside a shell of FLOOR, ROOF and three
   WALLs. The shell is the one part that is no use: the district already has
   rooms, and what it has never had is furniture in them.

   So the shell is dropped by name and everything else is taken on its own,
   re-centred on its own footprint with its base at zero, and registered under
   its own kit name at whatever real size it already is — this scene is
   modelled to scale, so nothing is resized.                                */
const SHELL = /FLOOR|ROOF|WALL|ROOM|Particles|BezierCurve/i;

function routeSceneParts(key, prefix, opts) {
  const P = PROPS[key];
  if (!P || !P.parts.length) return [];
  opts = opts || {};
  const kits = [];
  const bb = new THREE.Box3();
  P.parts.forEach((p, pi) => {
    if (SHELL.test(p.name || '') || /Window|Curtains|IMAGE|FILL/i.test(p.mat || '')) return;
    const g = p.geo.clone();
    g.computeBoundingBox();
    bb.copy(g.boundingBox);
    const h = bb.max.y - bb.min.y, w = bb.max.x - bb.min.x, d = bb.max.z - bb.min.z;
    // skip the slivers: two-triangle planes and anything the size of a coin
    if (h < 0.05 || Math.max(w, d) < 0.12 || g.index === null) return;
    if (opts.maxH && h > opts.maxH) return;
    g.translate(-(bb.min.x + bb.max.x) / 2, -bb.min.y, -(bb.min.z + bb.max.z) / 2);
    const nm = 'f:' + prefix + pi;
    if (!INST_DEF[nm]) {
      defInst(nm, g, { mat: makeModelMaterial(p.src, false), shadow: true, receive: true });
    }
    MODEL_ROUTE[prefix + pi] = {
      parts: [{ fit: new THREE.Matrix4(), names: [nm] }], near: 1e9, jitter: true,
    };
    kits.push({ kit: prefix + pi, h, w, d });
  });
  return kits;
}

/* The far level is for things genuinely out on the perimeter, and nothing
   else. It used to be chosen off per-asset radii of 55-90 m, which put the
   decimated level on buildings a hundred metres away — in full view, filling
   the frame, and visibly destroyed. Every asset now keeps its full geometry
   anywhere in the walkable district; only the ring beyond LOD_FULL drops. */
const LOD_FULL = 340;
/* Whether the far level can ever be selected at all. Since the district was
   halved, every corner of the plan sits inside LOD_FULL of a near-field
   viewpoint and the answer is no — which is worth knowing at load time,
   because it means the loader can skip a second GLB fetch, parse and
   in-memory geometry copy for all 87 props. Measured rather than assumed, so
   that widening the plan again turns the far level back on by itself. */
const LOD_FAR_USED = (function () {
  const B = PLAN.bounds;
  for (const c of [[B.x0, B.z0], [B.x1, B.z0], [B.x0, B.z1], [B.x1, B.z1]]) {
    let best = 1e9;
    for (const p of NEARFIELD) {
      const d = (c[0] - p[0]) * (c[0] - p[0]) + (c[1] - p[1]) * (c[1] - p[1]);
      if (d < best) best = d;
    }
    if (best > LOD_FULL * LOD_FULL) return true;
  }
  return false;
})();
function modelLOD(r, x, z) {
  if (r.parts.length < 2) return 0;
  const rad = Math.max(r.near, LOD_FULL);
  let best = 1e9;
  for (const p of NEARFIELD) {
    const d = (x - p[0]) * (x - p[0]) + (z - p[1]) * (z - p[1]);
    if (d < best) best = d;
  }
  return best <= rad * rad ? 0 : r.parts.length - 1;
}

/* a stable per-instance hash off the world position — see routePropSet */
function posHash(x, z) {
  const v = Math.sin(x * 12.9898 + z * 78.233) * 43758.5453;
  return v - Math.floor(v);
}

function inst(name, mtx, colour) {
  let r = MODEL_ROUTE[name];
  if (r && r.variants) {
    _routeP.setFromMatrixPosition(mtx);
    r = r.variants[Math.min(r.variants.length - 1,
      (posHash(_routeP.x, _routeP.z) * r.variants.length) | 0)];
  }
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
  /* The desert apron. It used to be a 3.8 km plane at 63 m per quad carrying
     one sine wave, which from the air is a sheet of mud: no landform, no
     colour, and a hard edge where it stopped. It is now 5.2 km at 26 m per
     quad, and its height is three things at three scales —

       barchan   wind-aligned crescent dunes, the shape that actually forms
                 on this coast, ridged along the prevailing WSW and asymmetric
                 across it, so the light catches a bright windward face and
                 leaves a long slip-face shadow;
       swell     a slow two-kilometre rise and fall that keeps the horizon
                 from being a ruled line;
       grain     fine fbm, only where the dunes already are.

     Everything is faded out toward the district by the same distance ramp, so
     the ground the walker stands on stays the flat sabkha it has to be. */
  const AP = 5200, SEG = 200;
  const gp = new THREE.PlaneGeometry(AP, AP, SEG, SEG);
  gp.rotateX(-Math.PI / 2);
  const pos = gp.attributes.position;
  // the prevailing wind, WSW: dune crests run across it
  const WX = 0.9239, WZ = 0.3827;
  const duneAt = (x, z) => {
    const along = x * WX + z * WZ;      // downwind
    const across = -x * WZ + z * WX;    // along the crest line
    // crest lines meander instead of running dead straight
    const wander = 62 * fbm(across * 0.00085 + 13, along * 0.00042 - 7, 3);
    const u = (along + wander) / 210;
    const ph = u - Math.floor(u);
    /* a barchan section: a long windward ramp to the crest at 0.72, then a
       short steep slip face. Squaring the ramp keeps the toe flat. */
    const prof = ph < 0.72 ? Math.pow(ph / 0.72, 1.7) : 1 - Math.pow((ph - 0.72) / 0.28, 0.85);
    // dune fields are patchy: some corridors are bare sabkha
    const field = sstep(0.34, 0.66, fbm(x * 0.00046 - 31, z * 0.00046 + 19, 3));
    return prof * field;
  };
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i), z = pos.getZ(i) + 220;
    pos.setZ(i, z);
    const d = Math.max(Math.abs(x) - 430, Math.abs(z - 220) - 460);
    const out = sstep(20, 700, d);          // how far into the open desert
    const far = sstep(300, 1900, d);        // the big dunes are only far out
    const dune = (3.0 + 6.0 * far) * duneAt(x, z) * out;
    const swell = 2.6 * fbm(x * 0.00052 + 5, z * 0.00052, 3) * far;
    const grain = 1.1 * fbm(x * 0.0075 + 41, z * 0.0075 - 12, 3) * out;
    pos.setY(i, terrainY(x, z) - 0.06 + dune + swell + grain);
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
    /* Three ground types, not one. Eastern Province desert is a mosaic: pale
       salt sabkha where the water table is near, warm aeolian sand where it
       has drifted, and dark gravel serir scoured between them. One tone over
       five kilometres is what made the aerial read as mud. */
    const SABKHA = [0.86, 0.83, 0.75], SANDC = [0.76, 0.62, 0.40], SERIR = [0.48, 0.42, 0.33];
    for (let i = 0; i < cnt; i++) {
      sa[i] = S.SAND;
      const x = gpp.getX(i), y = gpp.getY(i), z = gpp.getZ(i);
      const d = Math.max(Math.abs(x) - 430, Math.abs(z - 220) - 460);
      // which of the three, chosen by a slow field and reinforced by height:
      // sand piles up, sabkha sits in the hollows, gravel is the flat between
      const t = fbm(x * 0.00062 + 88, z * 0.00062 - 41, 4);
      const lift = clamp((y - terrainY(x, z)) / 14, 0, 1);
      const wSand = clamp(sstep(0.48, 0.66, t) + lift * 0.8, 0, 1);
      const wSab = clamp(sstep(0.46, 0.22, t) * (1 - lift), 0, 1);
      let r = mix(mix(SERIR[0], SABKHA[0], wSab), SANDC[0], wSand);
      let g = mix(mix(SERIR[1], SABKHA[1], wSab), SANDC[1], wSand);
      let b = mix(mix(SERIR[2], SABKHA[2], wSab), SANDC[2], wSand);
      // scrub stipple: sparse grey-green in the gravel corridors only
      const scrub = sstep(0.63, 0.80, fbm(x * 0.011 - 5, z * 0.011 + 3, 3)) * (1 - wSand) * 0.5;
      r = mix(r, 0.30, scrub); g = mix(g, 0.32, scrub); b = mix(b, 0.22, scrub);
      // fine tonal break-up, and a slow darkening in toward the district so
      // the paved slab does not sit on a lighter ring
      const s = 0.90 + 0.16 * fbm(x * 0.019, z * 0.019, 2) - 0.09 * sstep(600, 0, d);
      ca[i * 3] = r * s; ca[i * 3 + 1] = g * s; ca[i * 3 + 2] = b * s;
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
/* every water surface, so the mirror pass can hide them: water sampling the
   target it is being drawn into is a feedback loop */
const WATERMESHES = [];
function water(x0, z0, x1, z1, y, depth, flow) {
  WATERBODIES.push({ x0: Math.min(x0, x1), x1: Math.max(x0, x1), z0: Math.min(z0, z1), z1: Math.max(z0, z1), y, depth: depth || 0.5, flow: flow || 0 });
}

/* ============================================================== THE WATER ==
   Rebuilt. The old shader was a tinted plane with a mirror on it: three
   isotropic noise fields, a normal that was the difference of two of them
   rather than the gradient of any of them, no depth, no refraction, no foam,
   and ripples at 0.6 / 0.28 / 0.12 m — swells, in a three-metre rill. It read
   as coloured glass, which is what the client saw and said.

   What actually makes water read as water, in the order the eye notices:

   1. YOU CAN SEE THE BOTTOM, AND IT IS IN THE WRONG PLACE. Refraction at the
      surface bends the view ray by about 30 degrees at a walking eye height,
      so the tank floor is visibly displaced and it MOVES with the ripples.
      This is the single strongest cue and the old shader had none of it.
   2. THE COLOUR IS PATH LENGTH, NOT PAINT. Water absorbs red about ten times
      faster than blue, so the tint deepens with the distance the light travels
      through it — pale at the coping, saturated across the middle, and darker
      again where the ray runs the long way along the channel. Beer-Lambert,
      one exponential, and it is what makes a pool look wet rather than teal.
   3. CAUSTICS. The floor is lit through a lens that is moving. This is not
      decoration — a pool without caustics reads as a photograph of a pool.
   4. FRESNEL, DONE PROPERLY. Schlick with F0 = 0.02: near-total reflection at
      grazing, near-total transmission looking down. The old one was
      `fres*1.9 + 0.20 + 0.30*(1-flow)`, a fudge that made every pool a mirror
      from every angle.
   5. FOAM at the edge, because water wets a wall and holds a meniscus there.

   ---- the model ------------------------------------------------------------

   Six directional waves at REAL sizes and REAL speeds. Deep-water dispersion
   is c = sqrt(g*L/2pi), so the long waves outrun the short ones and the
   pattern never repeats — using one speed for all of them is the other thing
   that makes procedural water read as a texture sliding under a plane.

     1.10 m at 1.31 m/s      the wind swell, open pools only
     0.62 m at 0.98
     0.42 m at 0.81          the chop you actually see in a channel
     0.235 m at 0.61
     0.155 m at 0.49
     0.052 m at 0.29         the capillary glitter that catches the sun

   Because they are sines, the height, the SLOPE and the CURVATURE are all
   available in closed form from the same six evaluations. The slope gives the
   normal exactly — no central difference, no epsilon to tune — and the
   curvature gives the caustics, because focusing IS curvature. Getting both
   for free is the whole reason this is sines and not noise.

   Every train is band-limited by the pixel footprint on the same principle as
   the surface law: a 52 mm ripple seen from forty metres is under a pixel, and
   point-sampling it is the sparkle that makes distant water look like tinfoil.

   ---- opaque, and why ------------------------------------------------------

   The water writes depth and does not blend. That is the decided transparency
   rule and it falls out of the model rather than being imposed on it: the
   surface computes what is underneath it analytically — the tank floor, the
   tank walls, their tile, their caustics, their extinction — so there is
   nothing left for the framebuffer to contribute. One less sorted surface, no
   ordering against the glass, and refraction that a blended pass cannot do at
   all without a second full-scene target.

   What it costs: real geometry below the surface is replaced by the analytic
   tank. In this district that is four flat tank boxes and the submerged 750 mm
   of the fountain plinth, which is not visible through moving water anyway.
   ========================================================================== */
const waterMat = MATERIALS && MATERIALS.water ? MATERIALS.water({}) : new THREE.ShaderMaterial({
  transparent: false,
  uniforms: {
    uTime: { value: 0 }, uSun: { value: CSUN.clone() },
    /* absorption per metre, linear RGB. Clean water: red goes first, which is
       why a metre of it is blue-green and ten metres of it is blue. */
    uAbsorb: { value: new THREE.Vector3(0.72, 0.10, 0.07) },
    /* the light the body scatters back out of itself, which is what makes a
       shallow pool glow rather than just darken */
    uScatter: { value: C(0x38a89e) },
    uTank: { value: C(0x2c4e48) }, uGrout: { value: C(0x162c2c) },
    uFoam: { value: C(0xe8f2f2) },
    uSky: { value: C(0x7c8fc4) }, uWarm: { value: C(0xffc98a) },
    uFogColor: { value: C(0x62789f) }, uFogWarm: { value: C(0xe6bd92) }, uFogD: { value: CITY_FOG },
    uRefl: { value: null }, uReflMtx: { value: new THREE.Matrix4() },
    uReflOn: { value: 0 }, uReflY: { value: 0 },
  },
  vertexShader: `
    varying vec3 vW; varying vec4 vRP; varying float vFlow;
    varying vec4 vTank; varying vec2 vShape;
    attribute float aFlow;
    attribute vec4 aTank;      // cx, cz, halfX, halfZ  (halfX == halfZ for a disc)
    attribute vec2 aShape;     // shape (0 box, 1 disc), depth in metres
    uniform mat4 uReflMtx;
    void main(){
      vec4 wp = modelMatrix*vec4(position,1.0);
      vW = wp.xyz; vFlow = aFlow; vTank = aTank; vShape = aShape;
      vRP = uReflMtx * wp;
      gl_Position = projectionMatrix*viewMatrix*wp;
    }`,
  fragmentShader: `
    precision highp float;
    varying vec3 vW; varying vec4 vRP; varying float vFlow;
    varying vec4 vTank; varying vec2 vShape;
    uniform float uTime,uFogD,uReflOn,uReflY;
    uniform vec3 uSun,uAbsorb,uScatter,uTank,uGrout,uFoam,uSky,uWarm,uFogColor,uFogWarm;
    uniform sampler2D uRefl;

    float h21(vec2 p){ vec3 q=fract(vec3(p.xyx)*0.1031); q+=dot(q,q.yzx+33.33); return fract((q.x+q.y)*q.z); }
    float vn(vec2 p){ vec2 i=floor(p),f=fract(p); f=f*f*(3.0-2.0*f);
      return mix(mix(h21(i),h21(i+vec2(1,0)),f.x),mix(h21(i+vec2(0,1)),h21(i+vec2(1,1)),f.x),f.y); }

    /* wavelength, amplitude, direction, and the deep-water speed that follows
       from the wavelength — c = sqrt(g L / 2pi). The last column is how much
       of the train survives on a still tank versus a moving channel. */
    const int NW = 6;
    const vec4 WD[NW] = vec4[NW](            // dir.xy, wavelength, amplitude
      vec4( 0.92,  0.39, 1.100, 0.0180),
      vec4( 0.55, -0.84, 0.620, 0.0100),
      vec4(-0.79,  0.61, 0.420, 0.0072),
      vec4( 0.33,  0.94, 0.235, 0.0034),
      vec4(-0.97, -0.24, 0.155, 0.0021),
      vec4( 0.71, -0.70, 0.052, 0.00055));

    /* height, slope and curvature of the surface at p, all from the same six
       evaluations. fp is the pixel footprint in metres: a train shorter than
       the pixel is faded to nothing, which is the difference between distant
       water and distant tinfoil. */
    void waves(vec2 p, float fp, float flow, float t, out float h, out vec2 grad, out float lap) {
      h = 0.0; grad = vec2(0.0); lap = 0.0;
      /* a channel drifts; a tank does not. The drift is a translation of the
         whole field, so it does not change the wave shapes, only where they
         are — which is what a current does. */
      vec2 drift = vec2(0.0, -t * 0.42 * flow);
      for (int i = 0; i < NW; i++) {
        vec2 d = WD[i].xy;
        float L = WD[i].z;
        float k = 6.2831853 / L;
        float c = sqrt(9.81 * L * 0.159155);          // deep-water phase speed
        // the long swells are wind-driven and a sheltered tank has less of them
        float still = mix(mix(0.42, 1.0, flow), 1.0, clamp(0.30 / L, 0.0, 1.0));
        float a = WD[i].w * still * (1.0 - smoothstep(L * 0.30, L * 0.85, fp));
        if (a < 1e-5) continue;
        float ph = dot(p + drift, d) * k - t * c * k;
        /* the irregular part: without it six sines are a corrugated sheet.
           One slow noise field warps the phase, which is cheap and is what
           breaks the lattice. */
        ph += vn(p * (0.7 / L) + t * 0.05) * 2.4;
        float s = sin(ph), co = cos(ph);
        h    += a * s;
        grad += a * k * co * d;
        lap  -= a * k * k * s;
      }
    }

    /* the tank floor: dark glazed tile, 550 mm, with grout and a wash of dirt */
    vec3 tankFloor(vec2 p) {
      vec2 f = abs(fract(p / 0.55) - 0.5);
      float grout = smoothstep(0.44, 0.48, max(f.x, f.y));
      vec3 c = mix(uTank, uGrout, grout);
      c *= 0.80 + 0.30 * vn(p * 2.1);
      c *= 0.86 + 0.22 * vn(p * 0.37);          // the uneven staining of a tank
      return c;
    }

    void main(){
      vec2 p = vW.xz;
      float t = uTime;
      vec3 Vd = normalize(cameraPosition - vW);
      float dist = length(cameraPosition - vW);

      /* the pixel footprint on the surface, in metres — the same measurement
         the surface law uses, and needed here for the same reason */
      vec3 fdx = dFdx(vW), fdy = dFdy(vW);
      float fp = max(length(fdx), length(fdy));

      float h; vec2 grad; float lap;
      waves(p, fp, vFlow, t, h, grad, lap);
      vec3 N = normalize(vec3(-grad.x, 1.0, -grad.y));

      // ---- the tank, and where the refracted ray meets it -----------------
      float depth = max(vShape.y, 0.05);
      float yFloor = vW.y - depth;
      vec3 R = refract(-Vd, N, 1.0 / 1.333);
      // total internal reflection cannot happen entering a denser medium, but
      // a degenerate normal can still produce a zero vector
      if (dot(R, R) < 0.5) R = vec3(0.0, -1.0, 0.0);
      R = normalize(R);
      float tF = R.y < -1e-4 ? (yFloor - vW.y) / R.y : 1e9;
      // the tank walls, so a ray running down the channel stops at the end
      vec2 c2 = vTank.xy, hx = vTank.zw;
      float tS = 1e9;
      if (vShape.x > 0.5) {
        vec2 o = p - c2;
        float A = dot(R.xz, R.xz), B = dot(o, R.xz), Cq = dot(o, o) - hx.x * hx.x;
        float disc = B * B - A * Cq;
        if (A > 1e-6 && disc > 0.0) tS = (-B + sqrt(disc)) / A;
      } else {
        if (abs(R.x) > 1e-4) {
          float d = ((R.x > 0.0 ? c2.x + hx.x : c2.x - hx.x) - p.x) / R.x;
          if (d > 0.0) tS = min(tS, d);
        }
        if (abs(R.z) > 1e-4) {
          float d = ((R.z > 0.0 ? c2.y + hx.y : c2.y - hx.y) - p.y) / R.z;
          if (d > 0.0) tS = min(tS, d);
        }
      }
      float tHit = max(0.02, min(tF, tS));
      vec3 Pb = vW + R * tHit;
      bool onFloor = tF <= tS;

      /* caustics: focusing is curvature, and the curvature is already in hand.
         Sampled where the SUN's refracted ray would have crossed the surface,
         not under the fragment, which is what makes the pattern lie along the
         light rather than under the eye. */
      float caust = 0.0;
      if (onFloor) {
        vec3 Sd = normalize(uSun);
        vec2 back = Pb.xz - Sd.xz / max(Sd.y, 0.25) * depth * 0.75;
        float hb; vec2 gb; float lb;
        waves(back, fp, vFlow, t, hb, gb, lb);
        caust = pow(max(lb * 0.020, 0.0), 1.6) * 2.6;
      }

      /* Beer-Lambert over the real path: down through the water and back out.
         The the + depth is the sun's own leg, which is why a deep tank is dark
         even where you are looking straight down into it. */
      float path = tHit + depth * 0.9;
      vec3 trans = exp(-uAbsorb * path);
      vec3 below = (onFloor ? tankFloor(Pb.xz) * (1.0 + caust * 1.8)
                            : mix(uTank, vec3(0.42, 0.40, 0.35), 0.5) * 0.9);
      vec3 through = below * trans + uScatter * (1.0 - trans) * 0.55;

      // ---- the surface ----------------------------------------------------
      float cosT = clamp(dot(N, Vd), 0.0, 1.0);
      float F = 0.02 + 0.98 * pow(1.0 - cosT, 5.0);      // Schlick, water F0

      vec3 skyish = mix(uSky, uFogColor, 0.25);
      vec3 mirror = skyish;
      float ok = 0.0;
      if (uReflOn > 0.5 && vRP.w > 0.0) {
        /* the ripple displaces the projected lookup, scaled down with distance
           so the far end of a 630 m channel does not smear — a metre of
           displacement is a whole reflected tower at fifty metres and
           invisible at two */
        float wob = 0.030 / (1.0 + dist * 0.16);
        vec2 ruv = (vRP.xy / vRP.w) + vec2(N.x, N.z) * wob;
        vec2 edge = smoothstep(vec2(0.0), vec2(0.03), ruv)
                  * (1.0 - smoothstep(vec2(0.97), vec2(1.0), ruv));
        ok = edge.x * edge.y;
        mirror = mix(skyish, texture2D(uRefl, clamp(ruv, 0.002, 0.998)).rgb, ok);
      }
      vec3 col = mix(through, mirror, F);

      // ---- foam at the wall ------------------------------------------------
      float d2e = vShape.x > 0.5 ? hx.x - length(p - c2)
                                 : min(hx.x - abs(p.x - c2.x), hx.y - abs(p.y - c2.y));
      float fw = 0.11 + 0.05 * vn(p * 6.5 + vec2(0.0, t * 0.25));
      float foam = smoothstep(fw, 0.0, d2e) * (0.45 + 0.55 * vn(p * 11.0 - vec2(t * 0.4, 0.0)));
      foam *= 1.0 - smoothstep(0.0, 0.9, fp);      // it is not visible at range
      col = mix(col, uFoam, clamp(foam, 0.0, 0.72));

      // ---- the sun on it ---------------------------------------------------
      vec3 H = normalize(normalize(uSun) + Vd);
      float ndh = max(dot(N, H), 0.0);
      col += uWarm * pow(ndh, 380.0) * 3.4;        // the glint
      col += uWarm * pow(ndh, 22.0) * 0.10;        // the sheen around it

      float fog = 1.0 - exp(-uFogD*uFogD*dist*dist);
      vec3 fd = normalize(vW - cameraPosition);
      col = mix(col, mix(uFogColor, uFogWarm, pow(max(dot(fd, normalize(uSun)), 0.0), 1.8)), fog);
      gl_FragColor = vec4(col, 1.0);
    }`,
});

/* Describe a water plane's own tank to the shader. Every body needs the same
   four things and they used to be either absent or hard-coded: which way it
   flows, how deep it is, whether it is a box or a disc, and where its walls
   are. They ride as vertex attributes rather than uniforms because all four
   bodies share one material and one draw call each — a uniform would mean four
   materials, four programs and four reflection wirings. */
function waterAttrs(g, flow, depth, shape, cx, cz, hx, hz) {
  const n = g.attributes.position.count;
  const fl = new Float32Array(n); fl.fill(flow);
  const tk = new Float32Array(n * 4);
  const sh = new Float32Array(n * 2);
  for (let i = 0; i < n; i++) {
    tk[i * 4] = cx; tk[i * 4 + 1] = cz; tk[i * 4 + 2] = hx; tk[i * 4 + 3] = hz;
    sh[i * 2] = shape; sh[i * 2 + 1] = depth;
  }
  g.setAttribute('aFlow', new THREE.BufferAttribute(fl, 1));
  g.setAttribute('aTank', new THREE.BufferAttribute(tk, 4));
  g.setAttribute('aShape', new THREE.BufferAttribute(sh, 2));
  return g;
}

const WATER_RUNS = (function () {
  const R = [
    [PLAN.water.x, -70, PLAN.water.x, 560, PLAN.water.w, 1],   // the main channel
    [PLAN.water.x, 250, 268, 250, 4.6, 1],                     // the eastern branch
  ];
  /* The signature of the reference aerials is not one channel down the middle
     — it is a turquoise rill tracing every public edge, in runs that stop short
     of each other so you can always walk between them. Four of them frame the
     canopy plaza, broken either side of the souq's own axis. */
  const P = PLAN.plaza, sp = PLAN.spineX;
  for (const sx of [-1, 1]) R.push([sx * 118, P.z0 - 6, sx * 118, P.z1 + 6, 3.0, 1]);
  for (const z of [P.z0 - 2, P.z1 + 6]) {
    R.push([-96, z, sp - 11, z, 3.0, 1]);
    R.push([sp + 11, z, 96, z, 3.0, 1]);
  }
  return R;
})();
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
    /* the tank box under a run is 900 mm tall with its top 560 mm below the
       water line — see the ACC.arch box a few lines down, which is the same
       number read off the same place */
    waterAttrs(g, r[5] ? 1 : 0.14, 0.56, 0,
      (x0 + x1) / 2, (z0 + z1) / 2, (x1 - x0) / 2, (z1 - z0) / 2);
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
  WATERMESHES.push(wm);
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
/* ==================================================== SHOP INTERIORS ==
   The souq is 216 metres of shopfront and you walk it at two metres from the
   glass, so what is behind the glass is not set dressing — it is half the
   experience. A lit box with a counter in it is the thing that gives a demo
   away, because a real shop is a floor, a ceiling with a light in it, a back
   wall doing something, and three or four pieces of furniture arranged by
   somebody who wanted to sell you something.

   So every bay is given a trade, and the trade lays itself out. The composer
   works in the room's own frame — `at(across, into, up)` — so a programme can
   say "counter along the left wall, machine on it, two tables in the window"
   without knowing which way the street runs. Everything it places is an
   instanced kit part, because there are two hundred of these rooms.

   Interior light is baked, not lit: eight pooled point lights cannot light two
   hundred rooms, so each room carries a ceiling cove, its pendants' own glow,
   and whatever its trade lights — a pastry case, a gold cabinet, an oven — as
   emissive geometry, plus one practical registered at the opening so the room
   still throws light onto the pavement.                                     */
const SHOP_DEPTH = 3.35;   // the ground floor is hollowed this deep for shops
const TRADES = [
  'cafe', 'restaurant', 'textile', 'grocer', 'gold', 'bakery',
  'perfume', 'books', 'barber', 'pharmacy', 'cafe', 'textile', 'restaurant',
];
const TRADE_LIGHT = {
  cafe: 0xffcf94, restaurant: 0xffb877, textile: 0xffe3c0, grocer: 0xfff0cf,
  gold: 0xffd98a, bakery: 0xffc98a, perfume: 0xffe8d8, books: 0xffdcae,
  barber: 0xf2f0e6, pharmacy: 0xdff0ee,
};
const TRADE_FLOOR = {
  cafe: 0x6d5c46, restaurant: 0x5a3f30, textile: 0xc9bda6, grocer: 0x9c9384,
  gold: 0x3f3a35, bakery: 0xbcae94, perfume: 0xd8d2c6, books: 0x7a5c3c,
  barber: 0xcfc9bc, pharmacy: 0xd4d8d6,
};

const SHOPS = [];        // every fitted room, for QA and for the trade census
function shopInterior(cx, y, cz, ang, w, h, depth, warm) {
  const cs = Math.cos(ang), sn = Math.sin(ang);
  /* the room's own frame: `across` runs along the shopfront, `into` runs away
     from the street, `up` is up. Every piece below is placed in it. */
  const at = (across, into) => [cx + sn * into + cs * across, cz + cs * into - sn * across];
  const trade = TRADES[Math.floor(rnd() * TRADES.length)];
  /* A fitted room is 2,200 triangles and there are eleven hundred of them, and
     an instanced mesh has one bounding sphere for every instance in it — so a
     shop nobody can walk to is 2,200 triangles submitted every frame forever.
     The same rule the planting uses applies here: full fit-out inside the
     walkable core, a lit shell with a window display outside it. Which one a
     bay gets is decided once, at build time, so nothing pops. */
  let nearest = 1e9;
  for (const a2 of NEARFIELD) {
    const d2 = (cx - a2[0]) * (cx - a2[0]) + (cz - a2[1]) * (cz - a2[1]);
    if (d2 < nearest) nearest = d2;
  }
  const fitted = nearest <= 30 * 30;
  const tint = TRADE_LIGHT[trade] || warm || 0xffd6a0;
  const halfW = w / 2;
  /* A room 1.2 m wide and 3.1 m deep is a corridor: from the street you see
     nothing but its two side walls converging. Depth follows width. */
  const D = Math.max(1.5, Math.min(depth, w * 1.35));

  // ---- glazing: nearly clear, because the room behind it is the point
  let p = at(0, 0.05);
  /* the shop window stops 400 mm short of the head and a reeded transom fills
     the rest. It is what lets the room borrow daylight without showing the
     ceiling void, it is on half the shopfronts this district is drawn from,
     and it is the one place a fluted pane reads at street level. */
  const TR = Math.min(0.42, h * 0.16);
  SHOPGLASS.add(G_BOXT, xf(p[0], y, p[1], ang, w, h - TR, 0.05), 0xcfe0ea, S.METAL, 1);
  REEDGLASS.add(G_BOXT, xf(p[0], y + h - TR, p[1], ang, w, TR, 0.05), 0xd8e8e2, S.METAL, 1);
  ACC.fine.add(G_BOXT, xf(p[0], y + h - TR - 0.03, p[1], ang, w, 0.06, 0.15), K.steelDk, S.METAL, 0.8);
  ACC.fine.add(G_BOXT, xf(p[0], y, p[1], ang, 0.10, h, 0.16), K.steelDk, S.METAL, 0.8);
  for (const s of [-1, 1]) {
    const e = at(s * (halfW - 0.05), 0.05);
    ACC.fine.add(G_BOXT, xf(e[0], y, e[1], ang, 0.10, h, 0.16), K.steelDk, S.METAL, 0.8);
  }
  ACC.fine.add(G_BOXT, xf(p[0], y + h - 0.06, p[1], ang, w, 0.12, 0.18), K.steelDk, S.METAL, 0.8);

  // ---- the shell: floor, back wall, side walls, ceiling
  const fp = at(0, D * 0.5);
  inst('i_shopfloor', xf(fp[0], y - 0.015, fp[1], ang, w, 1, D), TRADE_FLOOR[trade] || 0x8a7a62);
  const bp = at(0, D);
  INTERIOR.add(G_BOXT, xf(bp[0], y, bp[1], ang, w, h, 0.14), 0xe0d0b4, S.RENDER, 1.02);
  for (const s of [-1, 1]) {
    const q = at(s * halfW, D * 0.5);
    INTERIOR.add(G_BOXT, xf(q[0], y, q[1], ang, 0.1, h, D), 0xdcc7a6, S.RENDER, 0.94);
  }
  INTERIOR.add(G_BOXT, xf(fp[0], y + h - 0.12, fp[1], ang, w, 0.12, D), 0xd8c6ab, S.RENDER, 0.82);

  /* the cove: a strip of light washing the back wall, which is what actually
     makes a small room read as lit rather than as a glowing rectangle */
  const cvp = at(0, D - 0.34);
  inst('cove', xf(cvp[0], y + h - 0.20, cvp[1], ang, w * 0.94, 1, 1), tint);

  // ---- ceiling pendants, on the room's own rhythm
  const np = Math.max(1, Math.round(w / 1.5));
  for (let i = 0; i < np; i++) {
    const o = -w / 2 + w * (i + 0.5) / np;
    const lp = at(o, D * 0.45 + ((i % 2) - 0.5) * 0.5);
    inst('pendant', xf(lp[0], y + h - 0.12, lp[1], ang), pick([0xc4a06a, 0xb08a52, 0xd8cbb0]));
    inst('pendantglow', xf(lp[0], y + h - 0.12, lp[1], ang), tint);
  }

  // ---- and now the trade lays itself out
  const put = (name, across, into, rot, sx, sy, sz, col) =>
    inst(name, xf(at(across, into)[0], y, at(across, into)[1], ang + (rot || 0),
      sx === undefined ? 1 : sx, sy === undefined ? 1 : sy, sz === undefined ? 1 : sz), col);
  const putY = (name, across, into, up, rot, sx, sy, sz, col) =>
    inst(name, xf(at(across, into)[0], y + up, at(across, into)[1], ang + (rot || 0),
      sx === undefined ? 1 : sx, sy === undefined ? 1 : sy, sz === undefined ? 1 : sz), col);

  /* Every shop gets a window piece, whatever its trade. Standing outside an
     arched reveal you see a cone perhaps forty degrees wide, and everything a
     programme puts against a side wall falls outside it — so if nothing stands
     in the first metre, the shop reads as a lit empty wall no matter how well
     it is fitted out behind. */
  if (trade !== 'textile') {
    const wo = rr(-halfW * 0.28, halfW * 0.28);
    put('i_windisp', wo, 0.72, chance(0.5) ? 0 : Math.PI, Math.min(1.25, w * 0.52), 1, 1, 0xffffff);
    put('windispglow', wo, 0.72, 0, Math.min(1.25, w * 0.52), 1, 1, tint);
  }

  if (!fitted) {
    // the far version: a lit room with something in the window and a counter
    put('i_counter', rr(-halfW * 0.2, halfW * 0.2), D * 0.62, chance(0.5) ? 0 : Math.PI, Math.min(1.4, w * 0.6), 1, 0.9, 0xffffff);
    if (chance(0.5)) putY('i_shelfbay', 0, D - 0.30, 0, 0, w * 0.8, h * 0.44, 1, 0xffffff);
  } else if (trade === 'cafe') {
    const side = chance(0.5) ? -1 : 1;
    put('i_counter', side * (halfW - 0.42), D * 0.62, side * Math.PI / 2, Math.min(2.2, D * 0.62), 1, 0.9, 0xffffff);
    putY('i_espresso', side * (halfW - 0.52), D * 0.52, 0.92, side * Math.PI / 2, 0.9, 0.9, 0.9, 0xffffff);
    putY('i_bottles', side * (halfW - 0.30), D - 0.28, 1.35, 0, w * 0.42, 1, 1, 0xffffff);
    put('i_dispcase', -side * (halfW - 0.55), D * 0.72, 0, Math.min(1.1, w * 0.42), 1, 0.85, 0xffffff);
    put('dispglow', -side * (halfW - 0.55), D * 0.72, 0, Math.min(1.1, w * 0.42), 1, 0.85, 0xfff0d0);
    putY('i_menuboard', side * (halfW - 0.18), D - 0.22, h * 0.52, 0, w * 0.34, 1, 1, 0xffffff);
    for (let i = 0; i < 2; i++) {
      const tx = -side * (halfW * 0.45) + (i - 0.5) * 0.1;
      put('i_table', tx, 0.95 + i * 1.05, 0, 0.78, 0.78, 0.78, pick([0xe8e3d6, 0xd6c6a8]));
      for (let cch = 0; cch < 2; cch++) {
        const a2 = rnd() * 6.28;
        put('i_chair', tx + Math.sin(a2) * 0.62, 0.95 + i * 1.05 + Math.cos(a2) * 0.62, a2 + Math.PI, 0.8, 0.8, 0.8, 0xefeade);
      }
    }
    if (chance(0.7)) put('i_potbush', -side * (halfW - 0.3), 0.5, 0, 0.7, 0.7, 0.7, K.leaf);
  } else if (trade === 'restaurant') {
    const side = chance(0.5) ? -1 : 1;
    put('i_banquette', side * (halfW - 0.34), D * 0.55, side * Math.PI / 2, Math.min(2.4, D * 0.7), 1, 0.9, pick([0x6d3a34, 0x33465a, 0x4a5240]));
    put('i_counter', 0, D - 0.55, Math.PI, w * 0.55, 1, 0.85, 0xffffff);
    putY('i_bottles', 0, D - 0.26, 1.30, 0, w * 0.55, 1, 1, 0xffffff);
    for (let i = 0; i < 2; i++) {
      const tz = 1.0 + i * 1.15;
      put('i_table', side * (halfW - 0.92), tz, 0, 0.72, 0.75, 0.72, 0xe8e3d6);
      put('i_chair', side * (halfW - 1.55), tz, -side * Math.PI / 2, 0.78, 0.78, 0.78, pick([0x5d5148, 0x3f3a33]));
      put('i_platter', side * (halfW - 0.92), tz, 0, 0.7, 0.7, 0.7, 0xffffff);
    }
    put('i_rug', 0, D * 0.4, 0, w * 0.7, 1, D * 0.5, 0xffffff);
  } else if (trade === 'textile') {
    for (const s of [-1, 1]) {
      putY('i_railrack', s * (halfW - 0.42), D * 0.55 + s * 0.25, 0.16, s * Math.PI / 2, Math.min(1.9, D * 0.55), 1, 1, 0xffffff);
    }
    put('i_stack', 0, D * 0.60, 0, w * 0.42, 0.85, 0.8, 0xffffff);
    put('i_mannequin', -halfW * 0.55, 0.62, rnd() * 6.28, 0.95, 0.95, 0.95, pick([0xe4dccc, 0xd8c9b0]));
    if (chance(0.6)) put('i_mannequin', halfW * 0.5, 0.72, rnd() * 6.28, 0.9, 0.9, 0.9, pick([0xd6cbb6, 0xc9bda6]));
    put('i_counter', halfW - 0.55, D - 0.62, 0, Math.min(1.2, w * 0.45), 1, 0.85, 0xffffff);
  } else if (trade === 'grocer') {
    for (let i = 0; i < 2; i++) {
      putY('i_shelfbay', -halfW + 0.55 + i * 1.02, D - 0.30, 0, 0, 1, h * 0.42, 1, 0xffffff);
    }
    for (const s of [-1, 1]) putY('i_shelfbay', s * (halfW - 0.28), D * 0.55, 0, s * Math.PI / 2, Math.min(1.8, D * 0.5), h * 0.40, 1, 0xffffff);
    put('i_crate', -halfW * 0.5, 0.66, rnd() * 6.28, 0.85, 0.85, 0.85, pick([0x9a7444, 0x86643a]));
    put('i_crate', halfW * 0.45, 0.80, rnd() * 6.28, 0.8, 0.75, 0.8, 0x86643a);
    put('i_counter', halfW - 0.62, D * 0.45, 0, Math.min(1.1, w * 0.42), 1, 0.85, 0xffffff);
  } else if (trade === 'gold') {
    // cabinets down both sides and across the back, all of them lit
    for (const s of [-1, 1]) {
      const n2 = 2;
      for (let i = 0; i < n2; i++) {
        const into = D * (0.34 + i * 0.30);
        put('i_dispcase', s * (halfW - 0.32), into, s * Math.PI / 2, Math.min(1.1, D * 0.3), 1, 0.9, 0xffffff);
        put('dispglow', s * (halfW - 0.32), into, s * Math.PI / 2, Math.min(1.1, D * 0.3), 1, 0.9, 0xffe6a8);
      }
    }
    put('i_dispcase', 0, D - 0.42, 0, w * 0.7, 1, 0.9, 0xffffff);
    put('dispglow', 0, D - 0.42, 0, w * 0.7, 1, 0.9, 0xffe6a8);
    put('i_chair', -halfW * 0.3, D * 0.5, rnd() * 6.28, 0.75, 0.75, 0.75, 0x5d5148);
  } else if (trade === 'bakery') {
    put('i_dispcase', 0, 1.05, 0, w * 0.86, 1.05, 0.95, 0xffffff);
    put('dispglow', 0, 1.05, 0, w * 0.86, 1.05, 0.95, 0xffe0b0);
    for (let i = 0; i < 2; i++) putY('i_shelfbay', -halfW + 0.6 + i * 1.05, D - 0.28, 0, 0, 1, h * 0.44, 1, 0xffffff);
    put('i_counter', halfW - 0.6, D * 0.62, 0, Math.min(1.1, w * 0.42), 1, 0.85, 0xffffff);
    // the oven's own glow at the back of the room
    const op = at(-halfW * 0.4, D - 0.20);
    SHOPEMIS.add(G_BOXT, xf(op[0], y + 0.55, op[1], ang, 0.7, 0.5, 0.06), 0xff7a30, 0, 1);
  } else if (trade === 'perfume') {
    for (const s of [-1, 1]) {
      for (let i = 0; i < 3; i++) {
        putY('i_bottles', s * (halfW - 0.24), D * 0.55, 0.55 + i * 0.46, s * Math.PI / 2, Math.min(1.7, D * 0.5), 1, 1, 0xffffff);
      }
    }
    putY('i_bottles', 0, D - 0.24, 1.05, 0, w * 0.8, 1, 1, 0xffffff);
    put('i_counter', 0, D * 0.42, Math.PI, w * 0.5, 1, 0.85, 0xffffff);
    put('dispglow', 0, D * 0.42, Math.PI, w * 0.5, 0.55, 0.7, 0xffe6d4);
  } else if (trade === 'books') {
    for (const s of [-1, 1]) putY('i_shelfbay', s * (halfW - 0.26), D * 0.58, 0, s * Math.PI / 2, Math.min(2.0, D * 0.6), h * 0.46, 1, 0xffffff);
    for (let i = 0; i < 2; i++) putY('i_shelfbay', -halfW + 0.58 + i * 1.05, D - 0.28, 0, 0, 1, h * 0.46, 1, 0xffffff);
    put('i_chair', 0, 1.0, rnd() * 6.28, 0.85, 0.85, 0.85, pick([0x6d3a34, 0x3f4a3a]));
    put('i_table', -halfW * 0.4, 1.6, 0, 0.6, 0.6, 0.6, 0xd6c6a8);
  } else if (trade === 'barber') {
    const side = chance(0.5) ? -1 : 1;
    for (let i = 0; i < 2; i++) {
      put('i_chair', side * (halfW - 0.55), 0.95 + i * 1.10, side * Math.PI / 2, 0.95, 1.05, 0.95, pick([0x2f2a26, 0x3d3630]));
    }
    // the mirror run: a bright wall panel over a shelf of bottles
    for (let i = 0; i < 2; i++) {
      const mp = at(side * (halfW - 0.12), 0.95 + i * 1.10);
      SHOPEMIS.add(G_BOXT, xf(mp[0], y + 0.95, mp[1], ang + side * Math.PI / 2, 0.8, 1.0, 0.04), 0xdfe6ea, 0, 1);
      putY('i_bottles', side * (halfW - 0.22), 0.95 + i * 1.10, 0.86, side * Math.PI / 2, 0.7, 1, 1, 0xffffff);
    }
    put('i_counter', -side * (halfW - 0.55), D - 0.6, 0, Math.min(1.0, w * 0.4), 1, 0.85, 0xffffff);
  } else {  // pharmacy
    for (let i = 0; i < 2; i++) putY('i_shelfbay', -halfW + 0.58 + i * 1.05, D - 0.28, 0, 0, 1, h * 0.46, 1, 0xf2f4f2);
    for (const s of [-1, 1]) putY('i_shelfbay', s * (halfW - 0.26), D * 0.6, 0, s * Math.PI / 2, Math.min(1.8, D * 0.55), h * 0.44, 1, 0xf2f4f2);
    put('i_counter', 0, D * 0.36, Math.PI, w * 0.62, 1, 0.9, 0xeef2f0);
    putY('i_menuboard', 0, D - 0.24, h * 0.55, 0, w * 0.4, 1, 1, 0xffffff);
  }

  /* somebody is in the shop. A lit room with nobody in it reads as closed,
     and every one of these is open. */
  if (chance(0.62)) {
    const who = chance(0.55) ? 'thobe' : 'abaya';
    put(who, rr(-halfW * 0.5, halfW * 0.5), rr(D * 0.35, D * 0.8), rnd() * 6.28, 1, 1, 1,
      who === 'thobe' ? pick([0xf2efe6, 0xe8e2d4]) : pick([0x1c1a1c, 0x241f24]));
  }

  // the light that leaves the shop and lands on the paving
  SHOPS.push({ trade, fitted, x: cx, y, z: cz, ang, w, h, d: D });
  const gp = at(0, -1.35);
  inst('pool', xf3(gp[0], y - 0.10, gp[1], 0, 0, 0, w * 2.2, 1, w * 2.2), tint);
  /* the practical belongs *inside* the room, where the ceiling is. Sitting it
     in front of the glass put a hotspot on the pier instead of light in the
     shop, and at two metres that hotspot is the brightest thing in the frame. */
  const pr = at(0, D * 0.45);
  PRACTICALS.push({ x: pr[0], y: y + h * 0.72, z: pr[1], c: tint, i: 3.6, r: 10 });
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
