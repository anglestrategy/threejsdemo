# STATUS — SDC Living Map v2

Durable working memory. Deliverable: `living-map-v2.html` (single file, file://).

## Workspace

| path | role |
|---|---|
| `living-map-demo.html` | untouched copy of the upload (read-only, `chmod 444`) |
| `living-map-v2.html` | **the deliverable** — assembled by `build.py`, never hand-edited |
| `src/main.js` | app source (editable). Markers: `/*@IMAGES@*/ /*@RELIEF@*/ /*@DISTRICT@*/` |
| `src/district.js` | the Al Khobar downtown module, spliced at `/*@DISTRICT@*/` |
| `src/shell_head.html`, `src/shell_tail.html` | HTML shell + module loader |
| `src/vendor_mods.json` | three.js r185 + addons, base64, untouched |
| `src/images.json` | the four embedded SDC renders |
| `work/relief.json` | baked real DEM (PNG data-URI) |
| `build.py` | assembles the single file; verified byte-identical to the upload before edits |
| `gen_map.py` | regenerates MAP from Natural Earth 10m |
| `gen_relief.py` | bakes the real elevation grid + `refs/ksa_relief_reference.png` |
| `shot.mjs` | headless screenshot harness (Playwright + chromium) |
| `refs/` | the four renders as PNG + the relief truth image |
| `shots/` | every verification frame |

Build: `python3 build.py` → prints size + source line count.
Shoot: `node shot.mjs <name> "<query>" [--w 1400 --h 786 --wait 4000]`.

## QA grammar

`?seed=N` · `?scene=map|city` · `?shot=1..6` · `?cam=x,y,z,yaw,pitch[,dist]`
`?hud=1` · `?flat=1` (drop the plinth tilt, for map-truth) · `?noveil=1` · `?nolife=1` · `?walk=1`
Key **P** prints/copies the pose · **F3** toggles the counter HUD.

## Bookmarks

1 map poster · 2 canopy hero · 3 souq eye-level · 4 majlis terrace · 5 courtyard pool · 6 aerial masterplan

## Measurements

| date | what | value |
|---|---|---|
| p0 | build reproduces upload byte-identically | yes (2,762,906 B) |
| p0 | app source | 2,102 lines / 96 KB before edits |
| p1 | Natural Earth mainland ring | 1,997 pts → 471 after Douglas–Peucker (ε 0.0127° ≈ 1.4 km) |
| p1 | projection | plate carrée, cos(24.25°) x-scale, W 1000 → H 820, 52.065 plane-units/deg |
| p1 | coast classification | 242 Red Sea, 132 Gulf, 97 inland — from real distance to neighbour polygons |
| p1 | baked DEM | 760×638 @ 1.82 plane units (3.9 km), PNG 139,648 B → 181 KB base64 |
| p1 | file size | 2.89 MB |
| p1 | boot (headless swiftshader) | ~3.3 s to `__ready` |

## City coordinates (verified, used in MAP.pts)

Al Khobar 26.2794N 50.2083E · Madinah 24.4686/39.6142 · Al Ahsa (Hofuf) 25.3647/49.5686 ·
Buraydah 26.3260/43.9750 · Hail 27.5236/41.6957 · Taif 21.2751/40.4158 · Arar 30.9753/41.0381 ·
Dumat Al Jandal 29.8117/39.8683 · Tabuk 28.3838/36.5550 · Al Baha 20.0129/41.4677 ·
Jizan 16.8892/42.5511 · Najran 17.4917/44.1322

All twelve match the brief's list to <5 km except Najran, where the brief's 17.57/44.23 is ~13 km
north-east of the city; the verified 17.4917/44.1322 is used.

## Phase log

- **P0 closed.** Renders extracted to `refs/`. Build pipeline byte-verified. Harness runs
  headless chromium (SwiftShader — see DEVIATIONS on fps). QA params, pose printer, F3 HUD live.
- **P1 closed.** Map regenerated from Natural Earth; terrain now sits on a real baked DEM with
  procedural sub-DEM detail. Map-truth check: `shots/map_truth_compare.png`.
