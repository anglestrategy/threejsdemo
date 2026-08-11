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
