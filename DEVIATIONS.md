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
