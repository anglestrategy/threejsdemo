# DELTA — in-engine vs the SDC renders

Method: render the closest matching in-engine shot, place it beside the render,
list the ten most visually significant differences ranked by impact, fix the top
three, re-render. Frames live in `shots/`; the combined sheet is
`shots/four_frame_test.png`.

---

## Round 1 — souq eye-level vs `madinah2`  (shot 3)

| # | delta | status |
|---|---|---|
| 1 | Shop interiors read as dark voids behind reflective glass, not lit rooms | **fixed** — dedicated near-clear shopfront glass + a hotter interior material + a light pool on the pavement in front of every shop |
| 2 | Value structure inverted: everything bright, no dark frame, no warm accents | **fixed** — sun dropped to 11°, dusk dome, warm bounce raised, ambient cooled |
| 3 | No street trees framing the view | **fixed** — the spine now carries a continuous avenue at 7.5–11.5 m with 1.3–1.8× crowns |
| 4 | Shopfront arch heads read as tilted slabs stuck to the wall | **fixed** — rebuilt as a corbelled Najdi head cut out of the masonry |
| 5 | Ashlar coursing ran at ~1 m; real Najdi coursing is 200–450 mm | **fixed** — course 0.225 m, block 0.42–0.84 m |
| 6 | Timber eaves on every frontage read as a repeating sawtooth | **fixed** — eaves on 55% of frontages, shallower projection, brackets every fifth rafter |
| 7 | Figures read as flat slabs with two red rectangles for a shemagh | **fixed** — reshaped with shoulders, a falling shemagh and a forward lean |
| 8 | Café furniture sat against the wall where the eye never finds it | **fixed** — spill pushed 1.4–2.6 m into the street |
| 9 | Foreground still empty in the lowest third of the frame | open |
| 10 | Merchandise and figures not visible inside the shops | partial — a counter and shelf stacks are modelled; no figures inside |

## Round 2 — aerial masterplan vs `madinah1`  (shot 6)

| # | delta | status |
|---|---|---|
| 1 | The canopy rendered as a black rectangle from every angle | **fixed** — the deck was wound inside-out; every gold facet faced down |
| 2 | Metals rendered black — no environment to reflect | **fixed** — a PMREM environment baked from the dusk sky plus a warm ground hemisphere |
| 3 | Water channels invisible — the paving was laid straight over them | **fixed** — water is planned first and every paver cuts round it, refining any cell that straddles an edge |
| 4 | Bookmark drowned in haze at 300 m | **fixed** — fog 0.0030 → 0.00058, apron enlarged to 3.8 km, fog colour matched to the sky's horizon band so the edge dissolves |
| 5 | Canopy soffit a flat brown ceiling | **fixed** — the soffit is folded downward too, so column uplights break it into lit facets |
| 6 | Green roofs barely register from the air | partial — planted beds and roof trees exist; they want more area and stronger colour |
| 7 | Colour hierarchy weaker than the render (which has red brick, white banding, dark glass, teal water all reading at once) | partial |
| 8 | No cars on the boulevards | open |
| 9 | The plaza is less densely furnished than the render's | partial |
| 10 | The district edge grades out but has no equivalent of the render's wadi/park landscape | open |

## Round 3 — majlis terrace vs `khobar1`  (shot 4)

| # | delta | status |
|---|---|---|
| 1 | The bookmark looked straight into the low sun | **fixed** — the striped tower moved north-east so the composition faces away from it |
| 2 | Adjacent blocks overlapped the majlis block; a wall cut the frame in half | **fixed** — plot rejection is by rectangle overlap, not centre distance |
| 3 | Roof plant, tanks and a stair head sat on the majlis terrace | **fixed** — the majlis block opts out of the roofscape |
| 4 | Terrace deck read as a black floor | **fixed** — lighter paving surface plus ten lantern pools |
| 5 | Emissive panels read as white-painted panels rather than lights | **fixed** — emissive materials take radiance from the instance colour and drop their own diffuse to 8% |
| 6 | The family group is much smaller in frame than the render's | open — the render is a portrait; ours is a wide |
| 7 | No mountains behind the tower | **won't fix** — Al Khobar is on a flat sabkha shelf; a mountain skyline there would contradict Workstream A |
| 8 | String lights read as dots rather than a warm garland | partial |
| 9 | The brick blind arcade is coarser than the render's | partial |
| 10 | The heritage timber door and neon are on the far side of the block from this view | open |

## Round 4 — courtyard pool vs `khobar2`  (shot 5)

| # | delta | status |
|---|---|---|
| 1 | The pool rendered as a black rectangle — the tank box was capped above its own water line | **fixed** |
| 2 | The court was 160 × 150 m; the render's is an intimate room | **fixed** — 116 × 104 m with the colonnade pulled in to 14 m from the edge |
| 3 | Louvre fins projected into the building instead of out of it | **fixed** |
| 4 | The colonnade's reveals were unlit black slots | **fixed** — lit interiors behind the glazing, with a practical per bay |
| 5 | The gold sculpture read as a solid cylinder | **fixed** — 44 ribs with air between them |
| 6 | Paving reads violet-cool where the render is warm travertine | partial — the warm bounce was raised; the shadowed ground is still cooler than the render |
| 7 | Foreground has no café furniture | open |
| 8 | No people in the court | partial — walkers path through it; none are seated in frame |
| 9 | The office tower's glass podium does not reflect the court | open |
| 10 | The pergola walk is off-frame from this bookmark | open |

---

## Self-score (10 = passes a one-second glance against the render, 7 = clearly
synthetic but the same class of image, 4 = good hobby demo)

| row | score | what raises this by 2 |
|---|---|---|
| masterplan coherence | 7 | give each zone a distinct block depth and street width; add a landscaped wadi edge |
| architectural fidelity vs renders | 5 | window/door proportions per storey; deeper reveals; real corner returns on parapets |
| material richness | 6 | a second albedo band on stone (patch repairs, staining round downpipes); glazing bars |
| street-level dressing density | 5 | dress the first 8 m in front of the camera in every bookmark: litter, drain lines, A-boards, spilled seating |
| light transport | 7 | area-light the shopfronts rather than point lights; contact-shadow the furniture |
| atmosphere & grade | 7 | a graded sky mask per bookmark; deeper indigo in the top third |
| life & motion | 5 | figures need arms that swing and groups that stand in twos and threes, not singles on rails |
| map geographic truth | 9 | islands; a per-region albedo pass tied to the DEM's own slope |
| navigation feel | 8 | head-bob easing on stairs; a short settle when walk mode engages |
| performance | — | not measurable here (see DEVIATIONS 1) |

Cheapest two implemented this round: the emissive-radiance fix (light transport)
and the aerial fog/altitude fix (atmosphere & grade).
