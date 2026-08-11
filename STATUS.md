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
| `build.py` · `gen_map.py` · `gen_relief.py` | assemble · regenerate MAP · bake relief |
| `shot.mjs` | headless screenshot harness (Playwright + chromium) |
| `tests/dive_test.mjs` · `tests/walk_test.mjs` · `tests/sweep_test.mjs` | transition, walk and collision-sweep gates — `node tests/<name>.mjs` |
| `refs/` | the four renders as PNG + the relief truth image |
| `shots/` | every verification frame, the contact sheet and the four-frame test |

Build: `python3 build.py`. Shoot: `node shot.mjs <name> "<query>" [--w --h --wait]`.
Gates: `node tests/dive_test.mjs` · `node tests/walk_test.mjs` · `node tests/sweep_test.mjs`.
`work/` holds only regenerable intermediates (DEM tiles, decoded vendor modules) and is not tracked;
`gen_map.py` and `gen_relief.py` rebuild everything in it.

## QA grammar

`?seed=N` · `?scene=map|city` · `?shot=1..6` · `?cam=x,y,z,yaw,pitch[,dist]`
`?hud=1` · `?flat=1` (drop the plinth tilt, for map-truth) · `?noveil=1` · `?nolife=1` · `?walk=1`
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
| p6 | file size | 3.12 MB |
| p6 | app source | 6,158 lines / 469 KB |
| p6 | boot to `__ready` (map only, headless swiftshader) | ~3.3 s |
| p6 | district build (blocking, headless) | ~2.2 s, hidden inside the 3.35 s dive veil |
| p6 | draw calls / triangles, souq eye-level | 208 / 5.12 M |
| p6 | draw calls / triangles, aerial masterplan | 370 / 5.80 M |
| p6 | colliders / platforms / walkers / string bulbs | 464 / 15 / 108 / ~250 |
| p6 | canopy panels | 1,084 folded triangles + fascia + frame + 3-armed columns |

Frame rate is not measurable in this container — see DEVIATIONS 1. The numbers
above are the measurable proxies. The remaining lever, and the honest next
optimisation, is geometric LOD for the background fabric: at eye level the whole
940 m spine is inside the frustum with no occlusion culling.

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
- **P6 closed.** Life (108 walkers, seated groups, birds, jets, wind), the golden-into-
  blue grade, IBL from the sky, and the full battery. Contact sheet:
  `shots/contact_sheet.png`. Four-frame test: `shots/four_frame_test.png`.

## Known open items (ranked, for the next session)

1. Geometric LOD for the background fabric — the only remaining real frame-cost lever.
2. Near-field dressing in the first 8 m of every bookmark (litter, drain lines,
   A-boards, spilled seating); this is the largest remaining visual delta.
3. Figures: swinging arms, and groups standing in twos and threes rather than singles.
4. Cars on the boulevards.
5. Shopfront interiors want figures and richer merchandise.
