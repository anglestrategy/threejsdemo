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

---

## Round 5 — the structural pass (all four frames)

The first four rounds fixed placement, composition and construction bugs. This
round went after the three things that made every frame read as a model rather
than a place.

| # | delta | what changed |
|---|---|---|
| 1 | **Every surface was a flat plane with a painted pattern.** The material modulated albedo and roughness only, so a wall of ashlar had no more relief than a wall of paint. This was the single largest tell in every frame. | The surface law now owns a real height field per class — recessed joints, proud blocks, brick beds, board grooves, travertine pores, flag edges, weave. It is sampled three times per fragment and its gradient bends the shading normal through a world-space triplanar frame. Albedo and roughness are derived from the same field, so the recesses are dark and matt exactly where they are recessed, and the relief fades out between 26 and 95 m so it never aliases. |
| 2 | **Nothing touched anything.** Chairs floated on paving, piers met walls with no seam, a colonnade was a row of pale rectangles. | A depth-only ambient occlusion pass: the composer's own render target now carries a depth texture, the pass reconstructs view position and a normal from its derivatives and samples a golden-angle spiral with a per-pixel rotation. Sixteen samples, no blur, no second geometry pass. The darkening is tinted violet-warm, never grey. |
| 3 | **Mouse look did nothing at all.** The pointer handlers were written and never attached, so the view could only be moved by the URL. Under them sat an impulse-into-angular-velocity model that would have drifted after the mouse stopped and changed sensitivity with frame rate. | Handlers attached. Look is now direct: a pixel is a fixed number of radians applied to a target angle the camera chases on a 28 ms constant. Measured: 200 px of drag gives 26.28° and 26.36° on two consecutive drags against an expected 26.36°, and the view drifts 0.07° in the 2.5 s after the mouse stops. Captured and dragged looking use opposite conventions, both correct. Wheel sets speed, R levels the horizon, and the build now syntax-checks the assembled module so a stray paren cannot ship. |
| 4 | Tree crowns were smooth spheres — a silhouette the eye rejects instantly | 74 overlapping tilted leaf clumps on a lumpy shell; palm fronds grew leaflets, so their edge is a comb rather than a plank |
| 5 | Figures were boxes | robes are stacks of eight-sided tapered drums with shoulders and a falling shemagh |
| 6 | Shopfronts had nothing outside them | crates, cloth rails, A-boards and rolled mats on the pavement; stone drain channels in both gutters |
| 7 | Paving flags were 1.2 m | 0.5–0.8 m, with the joint relief carrying them |

Still open, in order: near-field dressing in the lowest third of every frame,
seated groups and figures with swinging arms, cars on the boulevards, and
geometric LOD.

---

## Round 6 — the light field

| # | delta | what changed |
|---|---|---|
| 1 | **Ambient was a constant.** A hemisphere light gives every point in the district the same sky, so an arcade soffit, a shaded courtyard and the middle of an open plaza all got the same fill. In a real place ambient light is a *field* — dim and warm under a canopy, bright and blue in the open, tinted by whatever wall you are standing next to. That constant is most of what separates "lit by three lights" from "rendered". | The district now bakes an irradiance field: a 15 m × 7.5 m probe grid over the whole plan, five levels high, each probe casting a 26-ray cosine-weighted hemisphere against the same occluder boxes the AO bake uses. Rays that escape collect the sky in their own direction from the dome's own colour function; rays that hit collect one bounce off what they hit. Two RGBA `Data3DTexture`s sampled trilinearly, folded straight into the material's `irradiance` at `lights_fragment_begin`. About a second at build time, two samplers, two fetches per fragment. The constant hemisphere dropped from 0.26 to 0.06 and the environment from 0.82 to 0.42, because the field now does that work and would otherwise be counted three times. |
| 2 | Detail textures repainted the palette orange | only the value passes through, with a quarter of the hue |
| 3 | Detail normalisation was computed in sRGB and applied in linear, darkening every surface roughly threefold | the normalising mean is now the linear mean |

## On the two things offered

**The SPZ.** Decoded: SPZ v2, 1,920,000 splats, SH degree 0, 36.5 MB raw. It does
not contain a district. Median splat scale is 1.5 mm — it is a point cloud, not a
set of splats with area — mean saturation is 0.16, and the geometry renders as a
soft blob with radial streaks and no walls, no ground plane and no structures
(`shots/spz_a.png`, `shots/spz_c.png`). Even a good splat scene would be the
wrong tool here: splats carry baked radiance, so they cannot be relit, cannot
receive the sun, cannot cast a shadow and cannot be collided with — the district
has to be walkable and has to sit under one sky with everything else.

**WebGPU.** Declined, with the constraint formally lifted and considered. Moving
to `WebGPURenderer` means rewriting every shader in the file into TSL — the
surface law, the emissive materials, the water, the sky dome, the terrain, the
glimmer points, the beacon shafts, the AO pass, the grade, the veil — which is
the entire rendering layer of a 6,500-line file, at high regression risk, for
zero pixels of quality on its own. What WebGPU actually buys is compute shaders
and cheaper draw submission; at eye level this scene submits 5.1 M triangles in
214 draws, so draw submission is nowhere near the limit. The gap to a
triple-A look is content and lighting technique — models, density, indirect
light, shadows, post — every one of which is reachable on WebGL2. It would also
cost compatibility for a file that must open from `file://` anywhere.

---

## Round 7 — real plants

| # | delta | what changed |
|---|---|---|
| 1 | **The trees were the weakest thing in the file.** Bark is not a noise function and a canopy is not 74 tilted planes; at three metres the procedural tree was the one object that gave the whole district away. | Four CC0 photogrammetry scans from Poly Haven now stand in for the shade tree, the roof tree, the shrub, the courtyard accent and the potted plant — `island_tree_01`, `quiver_tree_01`, `shrub_02`, `potted_plant_01` — reduced offline and carried inline as GLB (1.17 MB of base64 for the four). `GLTFLoader` joins the embedded addon set. |
| 2 | Poly Haven ships photogrammetry density: `island_tree_01` is **1,599,403 triangles** across a 60 MB buffer, of which 1,060,032 are 44,168 individual leaves at 24 triangles each. Quadric decimation cannot touch that — a collapse cannot cross a component boundary, so 44,168 leaves have a hard floor of two triangles each, and pushed past it the mesh comes back as brown slivers. | `gen_models.py` runs **two** reducers. Leaves become cards: each surviving component collapses to one quad, placed by the least-squares affine map from its own UV box into its own tangent plane, so the leaf keeps its exact atlas cell, size and orientation and its shape still comes from the alpha channel. Which leaves survive is decided per angular bin around the crown centroid, biased to the outer shell, then the survivors are grown about their own centroids to put the optical density back. Everything woody goes through iterated QEM, thinned by component count first. The hero tree lands at 9,200 triangles — a 174× reduction that still reads as a plane tree. |
| 3 | The discriminator between the two reducers cannot be the material flag. `shrub_02` is one `MASK` material covering both the leaves and the twigs they hang on, and flattening a twig gives a brown ribbon. | Components are classified by planarity — a leaf card's third singular value is a fraction of its second, a twig's is its radius. A cutout primitive only takes the card path when 60% of a sample is planar; and a cutout material is never quadric-collapsed, because a leaf that loses two of its four corners is a spike. |
| 4 | Poly Haven declares `quiver_tree_01_leaf` as `BLEND` but ships no alpha map, and ships its real cutouts as **16-bit** greyscale PNG, which Pillow's `convert('L')` clips instead of scaling — every leaf fell below the cutoff and the shrub rendered as bare stems. | A material counts as a cutout only when the alpha map actually exists; 16-bit masks are rescaled, not clipped. Cutouts ship as `MASK`, never `BLEND` — an alpha-sorted leaf card flickers as you walk past it. |
| 5 | 445 trees at 9,200 triangles is 4.1 M triangles for the trees alone. | Two levels of detail per asset, as separate meshes in the same GLB sharing one set of textures, and the level is chosen **when the district is built** from the instance's distance to the walkable core — so it is free at runtime and nothing ever pops. 68 trees stand in the near field at 9,200; the other 538 fill the fabric at 3,200. |
| 6 | Paying for it. `roofbush` was 4,133 instances of a 448-triangle blob — **1.85 M triangles**, the largest single bill in the district, for roof scenery only ever seen from the aerial shot, and more than every tree in the plan put together. | The roof version is now four low-poly blobs instead of seven: 80 triangles, 322 k total. That one change funds the entire scanned kit; the district went from 4.68 M instanced triangles to 5.37 M while replacing every visible plant. |
| 7 | Scanned materials have to stand in the same light as everything else. | `makeModelMaterial` keeps the scan's own albedo, normal and roughness, drops the triplanar law entirely, and injects the same irradiance-field lookup and the same wind term — with the sway keyed on height above the instance base *and* distance from its trunk, so the bole stays put and the outer crown is what moves. Every probe-lit material now registers in `PROBE_MATS`, so one bake binds them all. |
| 8 | Vertex data. | Normals ride as signed bytes and UVs as normalised unsigned shorts under `KHR_mesh_quantization`, indices as `uint16` where the primitive fits; textures are WebP — a leaf atlas with its cutout is 90 KB as RGBA WebP against 260 KB as RGBA PNG. |

---

## Round 8 — the water reflects

| # | delta | what changed |
|---|---|---|
| 1 | **Still water that does not reflect is a painted floor.** The 630 m channel, the reflecting pool and the sail basin are three of the best moves in the plan and all three read as flat cyan slabs: a Fresnel wash toward a constant sky colour, with nothing of the district in them. | One mirrored render per frame into a half-resolution `HalfFloatType` target, taken about the plane of whichever water body is nearest, with the water shader projecting that target and the ripple normal displacing the lookup. |
| 2 | Geometry below the surface must not appear in its own reflection. | Lengyel's oblique near plane: the mirror camera's clip plane is folded into its projection matrix so the near plane lies exactly on the water. No global clipping planes, so no material recompiles. |
| 3 | Mirroring a camera reverses handedness, and getting that wrong gives a laterally flipped image that looks almost, but not quite, right. | The up vector is reflected along with the position and the target, not just the rotation. |
| 4 | A second full render of a 5.4 M triangle scene is not free. | The mirror camera's far plane is 340 m against the eye camera's 1,900, so the 104 m tiles mostly cull out — at this fog density anything past 340 m was a flat wash anyway, which is what the Fresnel sky fallback already gives. Shadow map regeneration is suppressed for the pass, and the pass is skipped entirely unless a water body's box is inside the eye frustum, within 300 m, and below the camera. `?norefl=1` turns it off. |
| 5 | Water sampling the target it is being drawn into is a feedback loop, and the driver says so, loudly, once per draw. | Every water mesh registers in `WATERMESHES` and is hidden for the mirror pass. |
| 6 | The tank colour was wrong for a mirror. A still architectural pool is dark — what you see in it *is* the reflection — but the shader mixed toward a bright swimming-pool turquoise regardless. | The base colour now scales with the surface's own flow value: the moving channel keeps its turquoise, the still tanks go dark and let the mirror carry them. The reflected mix runs to 0.965 at grazing angles and falls back to the sky term where the reflection ray leaves the target, so an off-screen fragment degrades instead of smearing the edge texel. |
| 7 | Displacement has to shrink with distance. | A metre of ripple offset is a whole reflected tower at fifty metres and invisible at two, so the wobble scales as `1/(1+0.16d)`. |

---

## Round 9 — the sun had never cast a shadow

| # | delta | what changed |
|---|---|---|
| 1 | **`renderer.shadowMap.enabled` was never set.** The district's sun had `castShadow = true`, a shadow camera, a bias, a normal bias and a box refitted around the viewer every single frame — and none of it drew anything, because the renderer's shadow map was switched off. Every dark edge in the district up to this round came from baked vertex occlusion, the depth-only AO pass and the probe field. The sun itself cast nothing. That is most of what was flat about it. | Shadows on. One directional shadow map at 4096. |
| 2 | Then the whole district went dark, correctly. At the authored sun elevation of **12°**, a ray from the light to any point at street level crosses three hundred metres of building — so with shadows on, everything below roof level really is occluded, everywhere, and the district reads as one flat blue shadow. Physically right, artistically dead. | The sun rises to **20°**, same azimuth. Streets now take long raking shadows, the west faces keep the gold, and the canopy throws a real 33 m shadow across its own plaza. |
| 3 | Then a whole quarter still lost the sun from the air. Not occlusion — **acne**. A 20° sun on a flat roof has a depth slope of 1/tan 20°, nearly three depth units per texel, so a bias tuned at the 1.7 cm walking texel fails wholesale at the 17 cm aerial one, and the failure reads as lost sunlight rather than as speckle. | Both biases now scale with the texel: `bias = -(0.30 + 3.6·texel)/range`, `normalBias = 3.6·texel`. |
| 4 | One cascade or several. | One, sized to what the camera can actually see: 34 m half-box walking (1.7 cm a texel — the shadow of a chair leg), opening to 420 m from altitude (20 cm a texel, which at 168 m up is a third of a pixel). The box is aimed where the camera looks, not where it stands, because from the air the district you can see is ahead of you. A second cascade would have bought nothing here and cost a third full pass over 5.4 M triangles on top of the mirror pass. |
| 5 | Outside the box every fragment is reported lit, so the box drew a hard line across the district wherever it ended. | The shadow fades to lit over the last 5.5% of the map in each axis. |
| 6 | r185's PCF kernel is a five-tap Vogel disk. Five taps is enough for a sharp shadow and visibly blotchy for a soft one, and this district wants soft. | Twelve taps, same rotation, same structure — patched into `ShaderChunk.shadowmap_pars_fragment` once at boot. |
| 7 | The mirror pass suppresses shadow-map regeneration, which on the very first frame means binding a default texture to a shadow sampler — a driver error, once per draw call. | It only suppresses the update once a shadow map exists. |
| 8 | Re-balance: real shadows changed every value that had been tuned without them. | Key 1.95 → 2.35, sky counter-fill 0.40 → 0.54, ground bounce 0.62 → 0.74, and `shadow.intensity` 0.92 rather than 1.0 — a shadow at this hour is filled by a whole sky, and the pillar is that nothing here ever goes to a grey void. |

`?noshadow=1` turns the whole thing off, which is how rounds 2 and 3 above were diagnosed.

---

## Round 10 — depth

| # | delta | what changed |
|---|---|---|
| 1 | Every frame was sharp from the paving under your feet to the watchtower 350 m away, which is the one thing no camera has ever done. | A depth-of-field pass, reading the depth texture the AO pass already keeps — so the circle of confusion costs one more buffer that was already there. |
| 2 | Cheap DOF smears a sharp foreground over a blurred background. | It is a gather, not a scatter: each pixel walks a 22-tap golden-angle disc the size of its own blur and accepts a neighbour only if that neighbour's *own* circle of confusion is wide enough to have reached it, or if the neighbour lies behind. |
| 3 | The first CoC model was linear in distance, and racked the whole frame to mush the moment the focus went long: focused at 200 m, a doorway at 8 m blurred as hard as a hand at 1 m. | The near side is the real thin-lens term, in reciprocal distance. The far side stays linear and is capped at half the maximum, because a distant street should soften, not dissolve. |
| 4 | Focus. A constant is dead and a frame average hunts. | The district raymarches the view ray against its own ground and colliders and pulls focus toward what the camera is pointed at, damped — fast in, slow out, like a lens. And it marches a **second ray seven degrees below** the first, taking the nearer hit: looking level along a street the centre ray runs to the horizon, and focusing at two hundred metres throws the ground you are standing on out of focus, which is not what anyone pointing a camera down a street would do. Clamped to 3.5–48 m. |

`?nodof=1` turns it off.

---

## Round 11 — the first eight metres

| # | delta | what changed |
|---|---|---|
| 1 | The gap between a model and a place is the first eight metres. A block, a kerb and a tree are the same in both; what is only in the real one is the crate left against a shopfront, the A-board turned to catch the street, the drift of leaves in the lee of a step, the chair pulled out of line. | A near-field dressing pass over eighteen anchors — the canopy plaza, the souq spine end to end, the colonnade court, the channel walk and the majlis terrace. |
| 2 | None of that can be hand-authored across a 940 m district, and scattering it everywhere buys detail nobody is close enough to read. | It is placed by asking the collision world the same two questions a person would: *is this ground I could stand on*, and *is there a wall within arm's reach*. The wall probe sweeps outward in rings and returns a direction and a distance, and the prop is then slid in to 45–85 cm of the frontage it belongs to, facing out. Nothing lands inside a building or in the water, because the test that keeps the walker out is the test that places them. |
| 3 | A crate in the middle of the road is not dressing, it is litter of the wrong kind. | Anything a shop puts out — crates, cloth rails, A-boards, rolled mats, baskets, planters, bins — only ever goes against a frontage. The open middle of a street gets what actually belongs there: a chair pulled out of line, and what blows about. |
| 4 | Litter is not evenly distributed. Wind piles it against whatever stops it. | `litterDrift` clusters scraps in the lee of the wall the prop was found by, running along it, lying flat with a curl. Two triangles each, one instanced draw for the lot. |
| 5 | The first version buried everything: paving sits 6 to 24 cm above the terrain it is laid on, and the dressing was placed on the terrain. | `dressY` returns the platform level where there is one and the terrain plus the paving lift where there is not. |
| 6 | The first litter read as black shards — holes in the paving rather than leaves. | Smaller, and in dry-leaf, dust and pale-paper tones. At dusk a dark scrap is a hole. |

---

## Round 12 — you can see into the shops

| # | delta | what changed |
|---|---|---|
| 1 | The souq is 216 m of shopfront walked at two metres from the glass, and behind every pane was a lit box: a flat emissive back wall, a counter and three shelf boxes. A lit box is the thing that gives a demo away, because a real shop is a floor, a ceiling with a light in it, a back wall doing something, and furniture arranged by somebody who wanted to sell you something. | Every bay is now given a **trade**, and the trade lays itself out. Ten of them — cafe, restaurant, textile, grocer, gold, bakery, perfume, books, barber, pharmacy — each with its own light temperature, floor, and fit-out. 1,152 rooms. |
| 2 | A programme cannot be authored in world coordinates when it has to work on both sides of a street. | The composer works in the room's own frame, `at(across, into)`, so a programme says "counter along the left wall, machine on it, two tables in the window" without knowing which way the street runs. |
| 3 | The fittings have to be instanced — there are two hundred rooms in the walkable core alone — but a chair on the pavement and a chair in a cafe are the same geometry under different skies, and an instanced mesh has exactly one material. | Every part a shop can contain is registered a second time under an `i_` name against the interior material: same buffers, no extra geometry, and none of them casts into the shadow map, because the sun never gets in. |
| 4 | **A room the sun never enters has no light in it.** Eight pooled point lights cannot light two hundred rooms, and the first version came out as furniture silhouetted against a glowing wall. | `uRoomAdd`: a constant warm irradiance folded into the material — the ceiling, as a number rather than as lights. The emissive elements then only have to be *fittings* (a cove, a pendant's own glow, a lit display deck, an oven), at a fraction of the intensity, instead of doing all the lighting and blowing out at two metres. |
| 5 | The practical that throws shop light onto the pavement sat 60 cm *in front* of the glass, which put a hotspot on the pier instead of light in the shop — and at two metres that hotspot was the brightest thing in the frame. | It moved inside, to where the ceiling is. |
| 6 | Standing outside an arched reveal you see a cone about forty degrees wide, so everything a programme puts against a side wall falls outside it and the shop reads as a lit empty wall however well it is fitted. | Every trade now gets a **window display** in the first metre — a plinth with product on it and its own under-glow — which is the piece of a shop anyone standing outside actually looks at. |
| 7 | A shelf of primaries reads as a toy shop whatever the trade is meant to be. | The stock palette is muted into the district's own. |
| 8 | 1,152 fitted rooms is 2.55 M triangles, and an instanced mesh has one bounding sphere for every instance in it — so a shop nobody can walk to is submitted every frame forever. | The planting's rule, applied to interiors: full fit-out within 30 m of the walkable core, a lit shell with a window display and a counter outside it. 8.52 M back down to 7.28 M. |
| 9 | Walking the souq, the mirror pass was still firing for a channel forty metres away behind two hundred metres of building. | The reflection range now scales with camera height: 70 m + 2.6 × altitude, capped at 300. |

---

## Round 13 — the people

| # | delta | what changed |
|---|---|---|
| 1 | **The figures were the last thing giving the district away.** A stack of tapered drums with a hem 800 mm across and no legs: at street level a hundred of them read as traffic cones, and nothing about them moved except the whole body sliding along its path. | Rebuilt to a real skeleton — feet at 0, knee at 0.48, hip at 0.92, shoulder at 1.42, crown at 1.74 — with legs, feet, upper and lower arms, hands, a neck, and a head that sits on it. |
| 2 | A hundred people need a walk cycle, and a walk cycle normally needs a skeleton, a bone palette and per-vertex weights — none of which an instanced mesh has. | The limb tag rides in the **fractional part of the surface class**: `.1` and `.2` are the legs, `.3` and `.4` the arms. The surface law reads `floor(aSurf)` and the walk cycle reads `fract(aSurf)`, so it costs no attribute, no memory and no second draw. Each limb swings about its own pivot in the instance's local frame, phased from the instance's own position — which the walker rewrites every frame, so no two people are ever in step. |
| 3 | A robe has no legs to swing. | Its skirt is split into two overlapping panels tagged as legs, so the hem opens and closes as the legs pass each other — which is what a thobe actually does when someone walks in it. |
| 4 | Everyone was in a thobe or an abaya. Downtown Al Khobar is not a uniform. | Five walking types now: thobe with ghutra and igal, abaya with hijab, two western-dress variants with trousers and visible shoes, and children. Roughly a third, a third, a quarter, the rest. |
| 5 | True black lost the whole figure at dusk. | The abaya is a very dark warm grey with a blue rim off the sky, not black. |

---

## Round 14 — why nobody could see into any of them

Round 12 fitted out eleven hundred rooms and not one of them was ever visible.
Two things were in the way, and both had been there from the beginning.

| # | delta | what changed |
|---|---|---|
| 1 | **The shopfront glass was a mirror.** `metalness 0.30, roughness 0.05, envMapIntensity 0.75` — at dusk that returns a flat sheet of sky and nothing behind it can be seen at all, whatever is in there. Every "lit box" and every "flat pale panel" in the last three rounds was the sky, reflected. | A real shop window in the evening is the opposite: the room is brighter than the street, so transmission wins and the reflection is a faint veil. Metalness 0.02, environment 0.13, opacity 0.085. |
| 2 | **The building was solid.** `block()` built "the solid core: you never see through the openings into daylight" as one box at a 0.62 m inset running the full height — so every fitted room was constructed three metres inside a solid mass. | The ground floor is hollowed to the depth of a shop. `elevation` fills that gap back in on any side that turns out not to have a shopfront, stopping short of the corners — a slab run to the full length of a blank end wall buries every shop at both ends of the street face. |
| 3 | **The interior material never had its uniforms bound.** `cityMat` and `cityIntMat` returned the same `customProgramCacheKey`, so three shared one compiled program between them — and a shared program means the second material's `onBeforeCompile` never runs, so its uniform objects are never bound and it silently uses the first material's. The room light had been switched off since the hour it was written. | The cache key carries the variant. |
| 4 | A room 1.2 m wide and 3.1 m deep is a corridor, and a room deeper than half its block meets the shop on the other side. | Depth now follows both: `min(depth, w × 1.35)` and never more than the block can give. |
| 5 | A shopkeeper stacks crates beside the glass, never across it. | The dressing pass rejects any prop that would stand in a glazed bay. |
| 6 | None of this was measurable, which is why it survived three rounds of looking at screenshots. | `tests/shop_visibility.mjs` stands where a person would in front of a sample of fitted rooms, rays past the mullion, and reports what stops the ray and how far past the glass it got. `?shop=N` puts the camera in front of the Nth fitted shop so a trade can be inspected without hunting for coordinates. **69% of fitted rooms now read past the glass**, against none before. |

---

## Round 15 — the aerial

The note was that from the air it looked depressing and bland, and it did. Four
reasons, all of them fixable, none of them about triangle count.

| # | delta | what changed |
|---|---|---|
| 1 | **One fog colour paints the whole horizon the same beige.** Distance is not one colour: looking west into the last of the sun it is warm, looking anywhere else at this hour it is deep blue. A single `FogExp2` colour cannot do that, so everything past two hundred metres turned to the same haze and the district read as a model under a dust sheet. | Fog is now directional — `mix(cool, warm, pow(dot(viewDir, sun), 1.8))` — injected into every district material and the water. The sky's horizon does the same thing, warm only where the sun went down. Density dropped from 0.00058 to 0.00034, because the haze was doing work the sky should do. |
| 2 | **Nothing between the last block and the sky.** | A skyline: towers from 1.1 to 2.25 km out, clustered toward the coast the way the real Al Khobar is, with setbacks, crowns, masts and aircraft lights. Their value sits close to the fog they are seen through — a distant city is almost entirely aerial perspective, and painted any darker it reads as black cardboard, which is exactly what the first attempt looked like. The sky dome went from 1.4 km to 3.3 km and the camera's far plane with it. |
| 3 | **From two hundred metres up you do not see a street, a shopfront or a person — you see roofs.** Every roof was a bare tan slab with a grey box on it. | The roofscape now carries the aerial: planted terraces with a real green plate, pergolas (the most legible thing on a roof from the air — a striped dark rectangle), photovoltaic arrays in deep blue, bougainvillea over the pergola frames, and a table and chairs where someone would sit. Green roofs went from 45% to 78% of blocks. |
| 4 | **One note of sand.** Every reference for this place is stone *and* deep green *and* one strong flowering colour. | `buildGreen`: lawn panels and hedge lines in the public rooms, and 460 bougainvillea placed on the walls they would actually climb, found the same way the dressing pass finds a frontage. |

| 5 | The green cost more than every tree in the district. A bougainvillea built from thirty-five 64-sided spheres is 2,240 triangles, and at 693 instances that was 1.55 M — the aerial gained 2 M triangles, of which three quarters were shrubs nobody looks at from closer than two metres. | Twenty-sided blobs at the same silhouette, and sixteen bracts instead of twenty-two: 580 triangles apiece, 402 k in total. 9.33 M back to 8.10 M. |

**On generated 3D models.** A 1.9 M-triangle Tripo GLB of one of the renders
came back as a single welded blob — one mesh, one material, the lighting baked
into the albedo — a diorama of the district rather than a building. It reads
well and it is the right reference for form, but it cannot be walked into, lit
by this scene's sun, or collided with. The useful ask from those tools is a
*component*: a dome, a minaret, a wind tower, a mashrabiya panel, an arcade
bay. `gen_userglb.py` takes any such GLB, decimates it and repacks it.

## Round 16 — generated props, and the aerial again

Seventeen assets generated from this project's own renders came back as ~2 M
triangles each with 4k PBR sets, delivered as GitHub release assets. `gen_props.py`
fetches, reduces and repacks each one into `dist/assets/props/<key>.glb`, and
`routeProp` registers it under a kit name — where the name already exists the
prop takes it over, so every bench in the district was upgraded without touching
one placement.

| # | delta | what changed |
|---|---|---|
| 1 | **QEM cannot collapse an edge that does not exist.** A scanned shrub is a few thousand leaf shells that never touch, so decimation hit a floor at 132 k triangles and the loop ground against it — one prop spent forty-five minutes at 100% CPU with no stall guard. | When a full pass buys less than 2%, weld the vertices onto a tolerance grid and try again, a little coarser each round. 132 k → 9 k. The guard is what makes the loop terminate at all. |
| 2 | **Budget is a question about instance count, not file size.** The solar array was reduced to 10 k triangles, which is modest — until the roofscape placed 1,353 of them. That one prop was 13.5 M triangles, more than the entire district. | Per-prop budgets set from how many of each the plan actually places: 900 for the panel, 2,600 for the bench, 60 k for the one mosque. 27.2 M back to 10.8 M. |
| 3 | **A "bins" asset is a bank of three, not one bin**, and it had taken over the kit name that every street corner places by the dozen. Walking the court you were surrounded by two-metre stacks of them. | It is `binbank` now, placed sparingly; `bin` is the hand-built single bin again. The majlis lounge set did not survive its own decimation — 16 k triangles of brown rubble — and was dropped for the hand-built cushions. |
| 4 | **A single fog density cannot serve both views.** Tuned for eye level it left the desert at full contrast out to its own geometric edge, so the world ended in a hard brown line; raised enough to dissolve that edge, it greyed out the whole district seen from three hundred metres up. | Haze now falls off with altitude — an exponential atmosphere of 150 m scale height, sampled at both ends of the ray. The apron is 90% dissolved at its edge, the district is 4% hazed at 300 m, and the towers finally have the depth cue that says two kilometres. |
| 5 | **The desert was a 3.8 km plane at 63 m per quad carrying one sine wave** — from the air, a sheet of mud. | 5.2 km at 26 m per quad, with wind-aligned barchan dunes ridged across the prevailing WSW and asymmetric along it, a slow two-kilometre swell, and three ground types instead of one: pale salt sabkha, warm aeolian sand, dark gravel serir, chosen by a slow field and reinforced by height. |
| 6 | **The wide shot had no focal point, and the water court was 164 by 162 metres of paving with seven sails on it.** | A jamaa on a travertine podium closes the court's north head — 38 m to the top of the minaret, the only thing in the plan taller than its own quarter — with steps, a walkable ramp, a riwaq on three sides, and floodlights on the facade. The court below it is now a walled garden on the mosque's axis: two date allées running its full length, planting beds between them and the riwaq, majlis rugs under the sails, string lights, and an arcaded street wall of eight generated colonnade blocks where there had been nothing at all. |

## Round 17 — the masterplan set

Twelve more assets arrived, generated from the two site aerials rather than
from a street-level render, and delivered as one 706 MB zip. A zip's central
directory lives at its end, so `work/ziplist.py` reads the tail, and
`gen_props.py` pulls each member out with two range requests and inflates it —
the other 600 MB never crosses the wire.

| # | delta | what changed |
|---|---|---|
| 1 | **The canopy was a very large parasol over nothing.** The aerials show what it is actually for: a light rail runs the length of the main boulevard underneath it, with a centre platform where the canopy is widest. | `buildTransit` lays the alignment down the median of Canopy Boulevard — track slab, four rails, sleepers where a walker can see them, catenary masts with the wire between them — a 68 m travertine platform with tactile edge strips, three shelters, kiosks, benches and bins, the gold pavilion over the stop, and four vehicles standing on it. The canopy's footprint already spans z=104, so the tram runs in its shade for the whole width of the plaza, exactly as drawn. |
| 2 | **The signature of both aerials is a turquoise rill tracing every public edge**, not one channel down the middle. | Four more water runs frame the canopy plaza, broken either side of the souq's axis so you can always walk between them, and the water itself went from a dark harbour green to a Gulf turquoise. |
| 3 | **No arrival monument.** | The roundabout from the second aerial, at West Avenue × South Boulevard: a raised paved island the roads pass around, a 28 m water bowl with a circular water disc and twenty-six jets in it, a 12 m obelisk standing in the middle, ten uplights and a ring of date palms. |
| 4 | **Two of the twelve were generated but are not routed.** The palm is a crown with no trunk — it decimates to a low bush — and the street bench is a thin frame that reads worse than the wooden one already in the kit. | Both stay in `work/props.json` and out of `defineKit`. The hand-built palm and `benchw` keep their places. Recording it here rather than deleting them, because the next batch may supersede either. |
