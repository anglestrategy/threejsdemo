# STATUS — SDC Living Map v2

Durable working memory. Deliverable: `living-map-v2.html` (single file, runs from `file://`).

## Workspace

| path | role |
|---|---|
| `living-map-demo.html` | untouched copy of the upload (read-only, `chmod 444`) |
| `living-map-v2.html` | **the deliverable** — assembled by `build.py`, never hand-edited |
| `src/main.js` | map + core app source. Markers: `/*@IMAGES@*/ /*@RELIEF@*/ /*@DISTRICT@*/` |
| `src/district.js` | district scene, materials, navigation, transition. Marker: `/*@DISTRICT_CONTENT@*/` |
| `src/district_content_1..5.js` | foundation · buildings · set pieces · kit of parts · dressing + life |
| `src/shell_head.html`, `src/shell_tail.html` | HTML shell + module loader |
| `src/vendor_mods.json` | three.js r185 + addons, base64, untouched |
| `src/images.json` | the four embedded SDC renders |
| `work/relief.json` | baked real DEM (PNG data-URI) |
| `work/models.json` | the four reduced CC0 scans, one base64 GLB each |
| `build.py` · `gen_map.py` · `gen_relief.py` | assemble · regenerate MAP · bake relief |
| `gen_textures.py` · `gen_models.py` · `gen_modelview.py` | pack detail textures · reduce and repack the scans · contact-sheet the scans |
| `shot.mjs` | headless screenshot harness (Playwright + chromium) |
| `tests/dive_test.mjs` · `tests/walk_test.mjs` · `tests/sweep_test.mjs` · `tests/controls_test.mjs` | transition, walk, collision-sweep and look-model gates — `node tests/<name>.mjs` |
| `refs/` | the four renders as PNG + the relief truth image |
| `shots/` | every verification frame, the contact sheet and the four-frame test |

Build: `python3 build.py`. Shoot: `node shot.mjs <name> "<query>" [--w --h --wait]`.
Gates: `node tests/dive_test.mjs` · `node tests/walk_test.mjs` · `node tests/sweep_test.mjs`.
`work/` holds only regenerable intermediates (DEM tiles, decoded vendor modules) and is not tracked;
`gen_map.py` and `gen_relief.py` rebuild everything in it.

## QA grammar

`?seed=N` · `?scene=map|city` · `?shot=1..6` · `?cam=x,y,z,yaw,pitch[,dist]`
`?hud=1` · `?flat=1` (drop the plinth tilt, for map-truth) · `?noveil=1` · `?nolife=1` · `?walk=1`
`?norefl=1` (no planar reflection) · `?noshadow=1` (no shadow map) · `?nodof=1` · `?grade=0`
Key **P** prints/copies the pose · **F3** toggles the counter HUD · **F** toggles fly/walk · **Esc** back to the map.
Yaw 0 = looking toward +Z in both scenes, so a pose is portable.

## Bookmarks

| # | name | pose |
|---|---|---|
| 1 | map poster | map, the original designed intro shot |
| 2 | canopy hero | `21, 5.4, -44` yaw 4 pitch 7.5 fly |
| 3 | souq eye-level | `4, 1.68, 178` yaw 0 pitch 3 walk |
| 4 | majlis terrace | `150, 14.3, 235` yaw 28 pitch −1 walk |
| 5 | courtyard pool | `-224, 1.68, 198` yaw −14 pitch 5 walk |
| 6 | aerial masterplan | `258, 168, -228` yaw −44 pitch −25 fly |

## Measurements

| when | what | value |
|---|---|---|
| p0 | build reproduces the upload byte-identically | yes (2,762,906 B) |
| p0 | app source before edits | 2,102 lines / 96 KB |
| p1 | Natural Earth mainland ring | 1,997 pts → 471 after Douglas–Peucker (ε 0.0127° ≈ 1.4 km) |
| p1 | projection | plate carrée, cos(24.25°) x-scale, W 1000 → H 820, 52.065 plane-units/deg |
| p1 | coast classification | 242 Red Sea, 132 Gulf, 97 inland, from real neighbour-country distance |
| p1 | baked DEM | 760×638 @ 1.82 plane units (3.9 km), PNG 139,648 B → 181 KB base64 |
| p2 | dive in/out ×3 | no state corruption; return pose identical to departure pose; panel keeps both photos; hover/click/legend intact |
| p2 | collision sweep | 337,448 resolved steps over the whole plan, 3 residual corner leaks (0.0009%), now impossible — a step that still lands inside is refused |
| p2 | walk probe | 244 samples, 0 inside a building, 0 floating off the ground |
| p11 | file size | 5.26 MB |
| p6 | app source | 6,158 lines / 469 KB |
| p6 | boot to `__ready` (map only, headless swiftshader) | ~3.3 s |
| p6 | district build (blocking, headless) | ~2.2 s, hidden inside the 3.35 s dive veil |
| p6 | draw calls / triangles, souq eye-level | 208 / 5.12 M |
| p7 | look model | 200 px drag → 26.28° / 26.36° (expected 26.36°); drift after 2.5 s = 0.07° |
| p6 | draw calls / triangles, aerial masterplan | 370 / 5.80 M |
| p6 | colliders / platforms / walkers / string bulbs | 468 / 15 / 108 / ~250 |
| p7 | scanned plants | `island_tree_01` 1,599,403 -> 9,200 / 3,200 tris · `quiver_tree_01` 3,599 / 1,199 · `shrub_02` 3,242 / 704 · `potted_plant_01` 1,493 |
| p7 | hero trees / fabric trees | 68 near-field at 9,200 · 538 at 3,200 |
| p7 | instanced triangles, aerial | 5.37 M in 73 instanced meshes (was 4.68 M in 58, with procedural plants) |
| p7 | `roofbush` | 4,029 x 80 tris = 322 k (was 4,133 x 448 = 1.85 M) |
| p8 | reflection target | half canvas, capped 1120x700, HalfFloat; mirror camera far 340 m |
| p9 | shadow map | 4096, one cascade, half-box 34 m walking to 420 m from altitude |
| p9 | sun | 20 deg WSW (was 12); key 2.35, sky fill 0.54, ground bounce 0.74, shadow intensity 0.92 |
| p9 | map boot after all three | 3.13 s (was 2.9 s) |
| p10 | focus pull | ray-marched against the district's own ground and colliders, clamped 3.5-48 m |
| p11 | near-field dressing | 1,122 props on 18 anchors, 4,029 litter scraps |
| p11 | instanced triangles, aerial | 5.97 M in 74 instanced meshes |
| p15 | instanced triangles, aerial | 8.10 M in 104 meshes (interiors, skyline, roofscape, green) |
| p15 | fog | directional, warm toward the sun and blue away, density 0.00034 (was 0.00058 flat) |
| p15 | skyline | towers 1.1-2.25 km, clustered toward the coast; sky dome 3.3 km, camera far 3.4 km |
| p11 | collision sweep after dressing | 337,960 steps, 6 stuck (0.0018%), 468 colliders, 15 platforms |
| p6 | canopy panels | 1,084 folded triangles + fascia + frame + 3-armed columns |

Frame rate is not measurable in this container — see DEVIATIONS 1. The numbers
above are the measurable proxies. The remaining lever, and the honest next
optimisation, is geometric LOD for the background fabric: at eye level the whole
940 m spine is inside the frustum with no occlusion culling.

## Third-party assets

| asset | source | licence | used for |
|---|---|---|---|
| `clay_plaster` (diff, nor_gl, arm) | [Poly Haven](https://polyhaven.com/a/clay_plaster) | CC0 | the photographic micro band on every mineral surface |
| `dark_wooden_planks` (diff, nor_gl, arm) | [Poly Haven](https://polyhaven.com/a/dark_wooden_planks) | CC0 | the same band on timber |
| `island_tree_01` (model) | [Poly Haven](https://polyhaven.com/a/island_tree_01) | CC0 | the shade tree and the roof tree |
| `quiver_tree_01` (model) | [Poly Haven](https://polyhaven.com/a/quiver_tree_01) | CC0 | the courtyard accent and the yucca |
| `shrub_02` (model) | [Poly Haven](https://polyhaven.com/a/shrub_02) | CC0 | massed low planting in the near field |
| `potted_plant_01` (model) | [Poly Haven](https://polyhaven.com/a/potted_plant_01) | CC0 | the potted planting at cafes and the majlis |

Both are downscaled to 512, repacked (normal in RG, roughness in B) and embedded
as data URIs by `gen_textures.py` — 265 KB of base64 for the pair. CC0 needs no
attribution; it is recorded here because a deliverable should always say where
its pixels came from. Everything else in the file is generated.

## City coordinates (verified, used in MAP.pts)

Al Khobar 26.2794N 50.2083E · Madinah 24.4686/39.6142 · Al Ahsa (Hofuf) 25.3647/49.5686 ·
Buraydah 26.3260/43.9750 · Hail 27.5236/41.6957 · Taif 21.2751/40.4158 · Arar 30.9753/41.0381 ·
Dumat Al Jandal 29.8117/39.8683 · Tabuk 28.3838/36.5550 · Al Baha 20.0129/41.4677 ·
Jizan 16.8892/42.5511 · Najran 17.4917/44.1322

All twelve match the brief's list to <5 km except Najran, where the brief's
17.57/44.23 is ~13 km north-east of the city; the verified value is used.

## The district, as built

Local metres, origin at the canopy plaza, +Z north, +X east, sun 11° WSW.

- **PUBLIC** — a 208 × 178 m golden canopy: 1,084 shallow-folded gold triangles over a
  chord frame on tapered columns with three-armed capitals, two rectangular voids
  planted with palms, a perimeter fascia, and a plaza of planting beds, benches,
  café clusters and lit bollards. West of it, seven tensile sails over a jet basin.
- **RETAIL** — a 216 m pedestrian souq spine that kinks, lined with 1–3 storey blocks:
  corbelled Najdi shopfront heads, lit rooms behind near-clear glass, timber eaves,
  mashrabiya and shutters above, an avenue of trees, café spill, canvas ribbons
  overhead, and the tapered sandstone watchtower closing the axis at z = 356.
- **ENTERTAINMENT** — a brick quarter of 2–5 storey blocks with crenellated parapets and
  blind arcades, the walk-up majlis terrace (white zigzag balustrade, string lights,
  hurricane lanterns, sadu rug, floor cushions, low table, potted palms) and the
  striped brick tower on the skyline at (258, 374).
- **COMMERCIAL** — mid-rise offices in vertical timber louvres over glass with white slab
  bands and planted balcony bands, a travertine colonnade with lit reveals, a
  reflecting pool ringed with 26 jets, the fluted gold sculpture, wire chairs and a
  pergola walk.
- **RESIDENTIAL** — courtyard blocks north, south and west, green roofs, balconies,
  palm-lined streets, grading out through an older low fabric to a perimeter road
  and a 3.8 km desert apron.
- Water: a 630 m north-south channel with an eastern branch, six road bridges and
  five footbridges; every paver cuts round it.

## Phase log

- **P0 closed.** Renders extracted to `refs/`. Build pipeline byte-verified against the
  upload. Headless harness. QA params, pose printer, F3 HUD, six bookmarks.
- **P1 closed.** Map regenerated from Natural Earth; terrain on a baked real DEM with
  procedural sub-DEM detail. Gate: `shots/map_truth_compare.png`.
- **P2 closed.** District scene, fly/walk navigation, cinematic dive. Gates: dive ×3
  clean, collision sweep clean.
- **P3 closed.** Masterplan, five zones, street network, water. Gate: aerial delta loop.
- **P4 closed.** Canopy, both watchtowers, majlis, colonnade court, sail court, each
  through its own delta loop (DELTA.md rounds 1–4).
- **P5 closed.** Dressing and the material law: triplanar macro/meso/micro bands per
  surface class, light pools, roofscapes, planting, street kit.
- **P7.** Structural pass: procedural relief on every surface class, a depth-only
  AO pass, and the navigation rewrite (mouse look had never been attached).
  Gate: `tests/controls_test.mjs`. See DELTA.md round 5.
- **P6 closed.** Life (108 walkers, seated groups, birds, jets, wind), the golden-into-
  blue grade, IBL from the sky, and the full battery. Contact sheet:
  `shots/contact_sheet.png`. Four-frame test: `shots/four_frame_test.png`.
- **P8 closed.** Real plants: four reduced CC0 photogrammetry scans replace the
  procedural planting, with build-time LOD. Planar reflection on every water
  surface. The sun's shadow map, which had never been switched on, and the
  re-light around it. Depth of field with a ray-marched focus pull. Near-field
  dressing on eighteen anchors. See DELTA rounds 7-11. Contact sheet:
  `shots/contact_sheet.png`.

## Known open items (ranked, for the next session)

1. Geometric LOD for the *built* fabric — the vegetation now has it (build-time, distance to the
   walkable core); the buildings do not.
2. Figures: still tapered drums. No CC0 human mesh of adequate quality exists
   (DEVIATIONS 7); the honest fix is a proper procedural humanoid with a walk
   pose, instanced. This is now the largest remaining visual delta.
3. Open plazas get less from the dressing pass than streets do, because the
   pass keys off walls. The courtyard and the canopy plaza want their own rule:
   clusters around the pool edge and the column line.
4. Cars on the boulevards.
5. Shopfront interiors want figures and richer merchandise.

## Asset inventory — client-supplied GLBs

Fetched from the repository release `glb` (some as members of `glbs.zip`,
pulled out with HTTP range requests rather than downloading 706 MB).
All are client-generated from this project's own renders via Meshy/Tripo;
the client owns them, so no third-party licence applies. Regenerate the
whole set with `python3 gen_props.py`, one with `python3 gen_props.py <key>`,
and this table with `python3 gen_inventory.py`.

Intake per asset: `weld -> simplify -> resize -> webp q92 -> meshopt`,
all via gltf-transform. The simplifier is meshoptimizer and is
attribute-aware — it respects UV seams and never invents a texture
coordinate. Budgets are set from what the asset is and how many of them
the plan places, not from a file-size ceiling.

| key | what it is | tris | LOD1 | texture | size | sited |
|---|---|---|---|---|---|---|
| `mosque` | jamaa with dome and minaret — the district landmark | 399,994 | — | 4096 px | 7.9 MB | yes |
| `diorama` | district diorama from the original render | 299,992 | 29954 | 4096 px | 4.4 MB | no |
| `arcade` | two-storey arcaded colonnade block — street wall | 259,998 | 25996 | 4096 px | 7.0 MB | yes |
| `watershrub` | waterside shrub clump | 251,544 | 3958 | 2048 px | 2.4 MB | yes |
| `tram` | articulated light-rail vehicle | 240,000 | — | 4096 px | 4.9 MB | yes |
| `bluehall` | blue-roofed hall with planted walls | 239,988 | 23998 | 4096 px | 10.5 MB | yes |
| `canopypav` | golden canopy pavilion — over the tram stop | 219,996 | — | 4096 px | 9.8 MB | yes |
| `shophouse` | arcaded shophouse row | 199,998 | 19998 | 4096 px | 11.1 MB | yes |
| `people10` | ten standing figures | 190,709 | 62197 | 4096 px | 22.4 MB | yes |
| `lagoon_b` | vernacular block, arcaded ground floor | 149,976 | 7862 | 2048 px | 3.5 MB | yes |
| `resblock` | residential apartment block | 149,964 | 18806 | 2048 px | 4.2 MB | yes |
| `lagoon_a` | slender street tree | 148,564 | 4728 | 2048 px | 2.3 MB | yes |
| `ghscene` | furnished residential interior — 30 pieces of real furniture | 144,542 | 45574 | 4096 px | 50.1 MB | yes |
| `fountain` | roundabout fountain bowl | 119,996 | — | 2048 px | 1.8 MB | yes |
| `majlisset` | majlis lounge seating | 119,992 | 5984 | 2048 px | 3.6 MB | yes |
| `extra` | three-storey vernacular building | 119,533 | 5762 | 2048 px | 3.5 MB | yes |
| `people5s` | five seated figures | 99,995 | 12199 | 4096 px | 4.4 MB | yes |
| `tramstop` | tram platform shelter | 89,998 | — | 2048 px | 2.3 MB | yes |
| `trellis` | vine trellis panel | 89,298 | 3368 | 2048 px | 2.4 MB | yes |
| `pots` | small potted plants | 68,892 | 2940 | 2048 px | 1.7 MB | yes |
| `kiosk` | small kiosk booth | 60,000 | — | 2048 px | 1.5 MB | yes |
| `obelisk` | roundabout obelisk monument | 59,998 | — | 2048 px | 1.8 MB | yes |
| `bicycle` | parked bicycle | 44,998 | 6440 | 2048 px | 2.8 MB | yes |
| `palm2` | date palm | 37,548 | 5510 | 2048 px | 1.9 MB | yes |
| `benchw` | wooden street bench | 28,000 | 3000 | 2048 px | 1.1 MB | yes |
| `bins` | bank of three recycling bins | 26,000 | 3000 | 2048 px | 1.3 MB | yes |
| `evpoint` | EV charging station | 24,000 | 2598 | 2048 px | 2.5 MB | yes |
| `hammock` | rooftop hammock | 22,000 | 3216 | 2048 px | 2.3 MB | yes |
| `sail1` | single shade sail | 20,000 | 2200 | 2048 px | 0.6 MB | yes |
| `bench2` | street bench (variant) | 19,998 | 2400 | 2048 px | 0.7 MB | yes |
| `carpet` | outdoor carpet / rug | 12,000 | — | 2048 px | 3.1 MB | yes |
| `bunting` | string-light bunting | 11,998 | 1600 | 1024 px | 0.5 MB | yes |
| `solar` | rooftop photovoltaic array | 2,598 | 648 | 1024 px | 0.7 MB | yes |

**33 assets, 180.8 MB served.**

Generated but not sited: none — every asset in the release is placed.

