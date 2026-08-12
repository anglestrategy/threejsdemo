# DEVIATIONS

Spec deviations, each with a reason and what was built instead.

## 1. Performance is not measurable in this environment

**Spec:** "~60fps on a modern laptop", verification battery run headless.
**Reality:** the container's only WebGL backend is ANGLE/SwiftShader (software). Probe:
`ANGLE (Google, Vulkan 1.3.0 (SwiftShader Device (Subzero)), SwiftShader driver)`. Measured fps
here is 1–10 and says nothing about GPU behaviour.
**Built instead:** the frame budget is tracked through the quantities that actually predict it and
are measurable headless — draw calls, triangles, programs, instance counts per category, and boot
time — all live on the F3 HUD and printed by every `shot.mjs` run, with explicit ceilings recorded
in STATUS.md. Everything repeated is instanced or merged; the district is built lazily and is not
in the map scene at all while the map is showing. Real frame-rate confirmation is the one item
that has to come from the human's machine.

## 2. Terrain is a baked real DEM, not procedural biases

**Spec (Workstream A.4):** "position-aware biases in the existing elevation function".
**Built instead:** a real elevation grid (public terrarium DEM tiles, 760×638 at 3.9 km, embedded
as one 139 KB greyscale PNG data-URI) carries the landform band, and the procedural layer was
re-aimed at the sub-DEM band a 3.9 km grid cannot hold — dune trains in the Nafud / Dahna /
Jafurah / Rub' al Khali with their real bearings, crest ruggedness scaled by real local slope, and
wadi incision.
**Reason:** the objective is "the map accurate to real-life Saudi Arabia". Hand-tuned noise can
only ever approximate the Sarawat, the Tuwaiq cuesta and the flat Gulf shelf that Al Khobar sits
on; the real grid *is* them, costs 181 KB in a 2.9 MB file, and leaves the procedural layer doing
the thing it is actually good at. The named geographic features (spine, Tuwaiq, Dahna, Nafud,
Rub' al Khali, harrat) are still authored in real degrees and still drive albedo and vegetation
masks, so the "position-aware biases" requirement is met — they now bias detail and colour rather
than substituting for landform.
**Constraint check:** no new external file (inline data-URI), no CDN, no build step, still one
runnable HTML. Decoded once at boot via top-level `await` + `createImageBitmap`, with an
`HTMLImageElement` fallback.

## 3. Islands are not modelled

Natural Earth gives Saudi Arabia as a MultiPolygon: one mainland ring plus ten small island rings
(Farasan group, Gulf islets). The engine's SDF/terrain pipeline takes a single ring. The mainland
ring is used; the islands are omitted. They are at most a few pixels at poster distance and none
of the twelve cities is on one.

## 4. The majlis view has no mountains

**Spec (khobar1):** the render puts a mountain silhouette behind the striped tower.
**Built instead:** a flat Gulf horizon behind the tower, and the tower repositioned north-east
of the terrace so the composition faces away from the low sun.
**Reason:** Workstream A puts Al Khobar on the real sabkha shelf at 7 m above sea level, 400 km
from the nearest relief. Painting mountains into its downtown would contradict the map the
visitor has just flown down through. The render's mountains belong to its own site; the tower,
the balustrade, the lanterns and the majlis are what carry that image, and those are all built.

## 5. One canvas ribbon, not a woven catenary

**Spec:** "swaying canvas ribbons overhead".
**Built instead:** four stacked membrane bands per crossing, each a 14-segment sagging strip that
flutters on the FABRIC branch of the wind term.
**Reason:** a true catenary cloth needs a solver or a bone chain; the stacked sagging strips read
the same at street level and cost 14 boxes each.

## 6. Frame cost is bounded by frustum culling alone

No occlusion culling and no geometric LOD: at eye level the whole 940 m spine sits inside the
frustum, so ~5.1 M triangles are submitted per frame in 208 draw calls. Everything repeated is
instanced, every merged quarter is re-indexed into 104 m tiles that share vertex buffers so the
camera and the shadow camera can discard most of them, the shadow box is 108 m at 2048, and the
pixel ratio is capped at 2. LOD for the background fabric is the documented next step; it could
not be validated here because the container has no GPU (see 1).

## 7. No CC0 palm, and no usable CC0 people

**Spec:** real models for vegetation *and* people.

**Built:** vegetation, yes — four Poly Haven scans (§ DELTA round 7). Palms and people, no.

**Reason:** Poly Haven's 521-model CC0 catalogue contains no palm of any species, and no human
figure at all. The palm is the signature planting of this district, so it stays procedural — it
is the one plant where the geometric version was always going to be the closest match, because a
frond *is* a rachis with leaflets on it. For people, the CC0 options are stylised low-poly
character packs; dropping game-jam figures into a photographic street would cost more than the
drums it replaced. The figures remain procedural and are logged as open item 3.

## 8. WebGPURenderer not adopted

**Spec (suggested):** use `THREE.WebGPURenderer` where available.

**Built:** WebGL2 with `THREE.WebGLRenderer`.

**Reason:** the whole look of this district lives in GLSL injected into
`MeshStandardMaterial.onBeforeCompile` — the triplanar surface-relief law, the
irradiance-probe field, the directional height-falloff fog, and the walk cycle
that drives limbs off a fractional surface-class tag. WebGPURenderer does not
run `onBeforeCompile`; it uses TSL/WGSL node materials, so adopting it means
rewriting every one of those from scratch, not flipping a renderer. The gain
would be draw-call submission cost, and this scene is not submission-bound —
it is 10.9 M instanced triangles in ~130 draw calls. The constraint that
actually binds is triangles and shadow-map fill, neither of which WebGPU
changes. Revisit if the material law is ever ported to TSL.

## 9. AgX tone mapping tested and rejected

**Spec (suggested):** `AgXToneMapping` for cinematic highlight handling.

**Built:** ACES Filmic, with `?tone=agx` kept as a live A/B switch.

**Reason:** measured, not asserted — `shots/ab_aces.png` beside
`shots/ab_agx.png` on the canopy hero. AgX is built for scenes whose highlights
would otherwise clip to hue-shifted white. This scene's identity is a saturated
gold canopy at the last of the sun, and AgX rolls exactly that off: the canopy
goes beige, the palms lose their green, and the frame flattens. ACES keeps the
gold. The switch stays so the call can be re-made if the grade ever changes.

## 10. The single-file build is frozen, not maintained

**Spec:** keep `living-map-v2.html` as a legacy fallback if cheap.

**Built:** `build.py --single` still runs, but the served `dist/` build is the
deliverable and the single-file path no longer receives the large assets — the
31 generated GLBs are fetched by URL and cannot be base64'd into a page
without making it a 200 MB parse. Anything that would have compromised the
served build to keep the one-file build working has gone the served build's
way, per the constraint change.

## 11. VSM shadows tested and rejected

**Spec (suggested):** `VSMShadowMap` for cheap soft shadow edges.

**Built:** `PCFShadowMap`, with `?shadow=vsm` kept as a live A/B switch.

**Reason:** measured — `shots/ab_vsm.png` beside `shots/ab_aces.png`. Variance
shadow maps bleed light through thin geometry, and this scene is largely made
of thin geometry: a date palm crown is three hundred bladed leaflets, and the
canopy is a folded panel deck one centimetre thick. Under VSM the crowns lose
their self-shadowing entirely and go flat, and the soffit loses the facet
separation that is the point of folding it. The shadow frustum is already
fitted per frame with texel- and grazing-angle-scaled bias, which is where the
quality was actually coming from.
