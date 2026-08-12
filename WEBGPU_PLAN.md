# WebGPU / TSL rebuild

Standing beside the WebGL2 build, not replacing it. `dist/` keeps working the
whole way; the WebGPU build comes up alongside it and only becomes the
deliverable when it is better on a side-by-side.

## Why

One thing WebGL2 genuinely cannot give this scene: **TRAA**, and with it SSGI.
`TRAANode` and the good SSGI implementations are TSL nodes. This scene is
sub-pixel geometric detail — a date palm at eighty metres is three hundred
bladed leaflets — and supersampling at 1.3x is 1.7x the fill for a worse
result. Everything else on the usual WebGL-vs-WebGPU table is irrelevant here:
this scene is 189 draw calls, and the bottleneck is 34 M triangles and
shadow-map fill, neither of which the API changes.

## What carries over untouched

The renderer-agnostic majority of the work:

- `gen_props.py` intake (weld → simplify → resize → webp → meshopt), `preweld.py`
- the 42-asset library and `work/props.json`
- `PLAN`, the road grid, the scan fabric, reservations, all placement
- `shot.mjs`, every gate in `tests/`, the QA URL grammar, the six bookmarks
- the scale audit and `?ruler=1`
- `gen_inventory.py`, STATUS/DELTA/DEVIATIONS

## What has to be rewritten in TSL

Everything currently injected through `onBeforeCompile`, in dependency order:

1. **the surface law** — triplanar relief height field, normal bending,
   per-class coursing. Biggest piece; everything visible depends on it.
2. **the irradiance probe field** — two Data3DTextures added into indirect.
3. **directional height-falloff fog** — mix(cool, warm) by view-sun dot,
   density scaled by an exponential atmosphere.
4. **the walk cycle** — limbs driven off `fract(aSurf)` tags.
5. **planar reflection** — mirrored camera with Lengyel oblique near-plane clip.
6. **emissive / glass / water materials.**

## Order

0. renderer + scene up, assets loading, one bookmark rendering (no surface law)
1. surface law
2. probes + fog
3. shadows (CSM), then TRAA
4. SSGI, GTAO
5. walk cycle, water, reflection
6. colour script + post stack
7. side-by-side against the WebGL2 build on all six bookmarks; switch only if better

## Step 0 result — the foundation works, with one environment caveat

`dist/gpuprobe.html` stands up `WebGPURenderer`, loads a meshopt-compressed
asset from the shipped library through the vendored GLTFLoader, and renders it.
Run it with `node tests/_gpu.mjs` (WebGPU) or `node tests/_gpu.mjs "?forcegl=1"`
(WebGL2 backend).

**WebGPU initialises in this container** — the probe reports `renderer: WebGPU`,
not a fallback — but rendering then throws:

    createView: Failed to read the 'swizzle' property from
    GPUTextureViewDescriptor: not of type GPUTextureComponentSwizzle

That is version skew between three r185's `WebGPUBackend._getRenderPassDescriptor`
and this container's Chromium/Dawn, not anything in this build. **On the
WebGL2 backend the same page renders clean: `ok: true`, no page errors.**

So the working method is: author in TSL, verify headless on the WebGL2 backend
(TSL compiles to GLSL there), and let real hardware take the WebGPU path. Every
screenshot gate keeps working. What cannot be verified here is anything
WebGPU-exclusive at runtime — compute passes, and possibly TRAA/SSGI if their
nodes require the WebGPU backend. That has to be checked node by node rather
than assumed, and any node that will not run on the WebGL2 backend is a thing
only the human's machine can sign off.

Three vendoring traps, all fixed, all of which fail as bare 404s:
- GLTFLoader imports `../utils/BufferGeometryUtils.js` and `SkeletonUtils.js`
  by *relative* path; an import map cannot remap a relative specifier, so they
  are served at `dist/utils/` where the resolution actually lands.
- `three.webgpu.js` imports `./three.core.js` beside itself.
- the TSL display nodes import both `three/tsl` and `three/webgpu`.

## Progress

- [x] **0 — foundation.** `src/vendor_gpu.json` (14 modules), `dist/gpuprobe.html`,
      `tests/_gpu.mjs`. WebGPU initialises here but r185's backend trips this
      Chromium's Dawn on a `swizzle` descriptor; the WebGL2 backend renders
      clean, so that is the headless verification path.
- [x] **1 — surface law.** `src/gpu/surface.js`. Height field branched by
      surface class over a triplanar world coordinate, plus the triplanar
      frame and the relief normal. Carries every measured scale correction.
- [x] **2 — probes + fog.** `src/gpu/atmosphere.js`. Trilinear probe sampling
      split by hemisphere, and directional fog whose density falls off with
      altitude. The probe *bake* is plain JavaScript against the occluder
      boxes and is renderer-agnostic — it is not ported, it is reused.
- [x] **3 — the material.** `src/gpu/material.js`. All eleven surface classes
      light, with the per-class relief visible in the readings. Four faults,
      none of them in the surface law: a duplicated three.js module instance,
      TSL hoisting a shared var's init into the first `If` branch, `fogNode`
      replacing the fragment rather than modifying it, and `uniform()` needing
      a `Color`/`Vector3` rather than a hex Number. See "Bisect attempt 7".
- [ ] 4 — CSM, then TRAA
- [ ] 5 — SSGI, GTAO
- [ ] 6 — walk cycle, water, planar reflection
- [ ] 7 — colour script + post stack, then the six-bookmark side-by-side

## Step 3: black panels — RESOLVED at attempt 7

Seven attempts, and the record of all of them is kept below rather than
summarised away: five of the seven narrowed onto something that turned out to
be false, and a plan file that only records the successful path invites the
same wrong turns next time. Read the last section first; the earlier ones are
there so their hypotheses are not re-tried.

**Every reading taken before attempt 7 is void**, because the duplicated module
instance made the material's behaviour depend on build order rather than on the
node graph. That is why the earlier tables disagree with one another.

The original statement of the fault follows.

### The fault as first stated

`dist/gpuprobe.html?forcegl=1&panels=1` stands eleven panels, one per surface
class, in front of the tram. The stock glTF material on the tram renders
correctly in the same frame; every panel using `makeCityMaterial` renders
black. No page errors, no failed requests, the node graph compiles and links.

**Ruled out.** The first hypothesis was that `reliefNormal` returned a
tangent-space perturbation assigned straight to `normalNode` without the
triplanar world frame the GLSL rebuilt with Tw/Bw. That was a real defect and
is fixed — `triplanarFrame` is added and the perturbation is now returned in
world space — but the panels are still black, so it was **not** the cause.

**Still open, in the order worth testing.** Each is a one-line probe: replace
the node with a constant and see if the panel lights.

1. `vertexColor()` — the panels set a `color` attribute directly. If TSL's
   accessor expects the material's `vertexColors` plumbing rather than a raw
   attribute, `colorNode` multiplies by zero and everything downstream is
   black. **Test:** `mat.colorNode = vec3(0.8)`.
2. `attribute('aSurf', 'float')` — if the attribute does not resolve, the
   class is garbage and `srfH` may fall through to a branch that returns 0.
   **Test:** `const surfClass = float(4)`.
3. `mat.outputNode` — `output` may be the pre-lighting fragment rather than
   the lit result, in which case the fog mix is discarding the shading.
   **Test:** delete `outputNode` entirely.
4. `roughnessNode`/`normalNode` interaction — least likely, since a wrong
   normal darkens rather than blackens.

The bisect is cheap and mechanical; it was not run only because this session
ran out of working context, not because it is hard. **Do 1 through 3 in order
before touching anything else.**

The WebGL2 build is untouched and remains the deliverable.

### Bisect attempt 1 — the measurement was wrong, the fault is still open

`tests/_bisect.mjs` ran all five cases (baseline, each candidate bypassed, all
three bypassed) and every one returned **0 for all eleven samples** — including
the samples that fall on the tram, which demonstrably renders in the same
frame. That is not a black material; it is a broken readback.

Cause: the probe sampled the canvas with `ctx.drawImage`. A WebGL drawing
buffer is not readable after the frame is composited, and WebGPURenderer's
WebGL2 backend does not honour `preserveDrawingBuffer` (tried; no change).

So **the three candidates remain untested.** Nothing was learned about the
material, and the earlier note must not be read as having narrowed it.

The tool is rewritten to sample the PNG `shot.mjs` writes, which is the same
image a human looks at and is known good. It needs `pngjs` (`npm i pngjs`) to
auto-sample; without it, it still writes five comparable screenshots to
`shots/bisect_*.png`. Run it first next pass.

### Bisect attempt 2 — the tool works, and the fault is bounded

Two harness faults had to be cleared first, both self-inflicted and both worth
recording because they cost a whole pass:

- `npm i pngjs --no-save` **removed playwright**. There was no `package.json`,
  so npm had nothing to preserve. There is one now, listing only the dev
  harness — the build itself has no npm dependencies, three.js is vendored.
- reinstalling pulled a newer playwright whose browser build (1234) does not
  match the container's pre-installed Chromium (1194). Every launcher now
  passes `executablePath` at the shipped binary rather than downloading a
  second browser into an image that already has one. `PW_CHROME` overrides it.

With a PNG readback and a working harness, the signal is clean:

| case | sample |
|---|---|
| `plain` — stock `MeshStandardNodeMaterial`, nothing of ours | **17** |
| `all off` — every one of our nodes bypassed | **17** |
| baseline, `noNormal`, `noRough`, `flatColor`, `fixedClass`, `noOutput` | **0** |

So the probe scene, its lights, the geometry and the winding are all fine — a
stock material lights those panels. **The fault is ours, and it is not any
single node**: disabling normal alone, roughness alone, colour alone or output
alone each still reads 0. Only turning *everything* off recovers.

That pattern points at something shared rather than at any one node, and there
is exactly one shared thing: `surfClass`, `uv`, `dist` and `h` are declared
with `.toVar()` at **function scope in `makeCityMaterial`, outside any `Fn()`**.
A TSL var belongs to the node function that consumes it; hoisting one and
feeding it into several independent graphs is not the same as a GLSL local, and
is the most likely reason every graph that touches them collapses.

**Next action, and it is a small one:** move those four declarations inside the
`Fn()` bodies that use them — each graph computes its own — and re-run
`node tests/_bisect.mjs`. If `baseline` reads non-zero, step 3 is done.

### Bisect attempt 3 — isolated. Two faults, and the surface law is not one.

The shared-`.toVar()` hypothesis from attempt 2 was **wrong**. The vars were
localised into each `Fn()` body — which is better code and stays — and
`baseline` still read 0. Recorded as disproved so it does not get re-tried.

Switching one node back on at a time from the state that works:

| case | sample | verdict |
|---|---|---|
| all off | 17 | — |
| **+ normalNode** | **0** | **broken** |
| + roughnessNode | 17 | fine |
| **+ outputNode (fog)** | **0** | **broken** |
| + vertexColor() | 17 | fine |
| + real `aSurf` attribute | 17 | fine |

**What this clears.** `srfH` is fine — both roughness and colour call it and
both light. The triplanar uv is fine. `attribute('aSurf')` resolves. The whole
surface law, which was the biggest and most feared piece of the port, works.

**Fault 1 — `normalNode`.** `reliefNormal` returns a **world-space** normal
(that was deliberate: the GLSL bent it in world space and the earlier fix added
the triplanar frame to keep it that way). three's node material almost certainly
wants `normalNode` in **view space**. Next action: transform it —
`.transformDirection(cameraViewMatrix)` — or assign the world-space value to
`normalWorld`'s slot instead. One line, then re-run the bisect.

**Fault 2 — `outputNode`.** The fog mix. Two candidates, in order: `output` may
not be the lit fragment at that point in the graph, in which case the mix
discards the shading; or `directionalFog()` is still called at function scope
and returns a node consumed inside an `Fn()` — the same hoisting shape that was
just ruled out for the others, but it has not been ruled out *here*. Next
action: build the fog inside the `outputNode` `Fn()`, and if that does not do
it, apply fog through `scene.fogNode` instead of on the material.

Neither is speculative any more — each has a named suspect and a one-line test.

### Bisect attempt 4 — both guesses wrong; then read the source

Two one-line fixes were tried and both failed:

- `normalNode` transformed world -> view with `transformDirection(cameraViewMatrix)`: still 0.
- the fog node rebuilt inside its own `outputNode` `Fn()`: still 0.

That is four passes on step 3 that bounded the fault and built the tooling but
did not move it, and the reason is worth naming: **I was guessing at TSL's
contract instead of reading it.** Two hypotheses, both plausible, both wrong,
both costing a full verify cycle.

Reading `three.webgpu.js` answers it directly:

    21712:  return this.normalNode ? vec3( this.normalNode ) : materialNormal;
    16566:  * material.normalNode = normalMap( texture( normalTex ) );

`normalNode` substitutes for `materialNormal` and the documented way to feed it
is **`normalMap( … )`**, whose input is a **tangent-space** normal. So the very
first version — `reliefNormal` returning a tangent-space perturbation — had the
right space, and both "fixes" since (the hand-built triplanar world frame, then
the view transform) moved it further from what the material wants.

**Next action, evidence-based this time:** feed the tangent-space perturbation
through `normalMap()` — `mat.normalNode = normalMap(pn)` where `pn` is what
`reliefNormal` produced *before* the frame was applied. Keep `triplanarFrame`
in `surface.js` (it is still needed by anything that wants the world normal,
and it is correct), but do not apply it here.

For `outputNode`, do the same before touching it: grep the build for how
`outputNode` is consumed rather than guessing a third time.

**Method note for this file, because it cost four passes:** when a node does
not behave, read `three.webgpu.js` for how the library consumes that property
*before* forming a hypothesis. The source is vendored at
`/tmp/twg/package/build/three.webgpu.js` and re-extractable from the npm
tarball; `grep -n "<property>" ` answers most of these in one command.

### Bisect attempt 5 — fault 2 fixed from the source; fault 1 narrowed again

Reading the build instead of guessing paid immediately.

**Fault 2 — FIXED.** `three.webgpu.js`:

    const isCustomOutput = this.outputNode !== null;
    if ( isCustomOutput ) resultNode = this.outputNode;

`outputNode` **replaces** the material's whole result; it does not receive the
lit fragment. Mixing fog into it discarded every bit of shading, which is
exactly the black. Fog is off the material entirely and is now a scene-level
node — `scene.fogNode = cityFogNode()`. `+output(fog)` went 0 -> 17.

**Fault 1 — still 0, and narrowed.** `normalNode` now goes through
`normalMap(...)` fed a tangent-space perturbation, which is what 21712/16566
say it wants, and `reliefNormal` was split so it returns that space again
(`reliefNormalWorld` keeps the framed world version for other consumers). Still
black.

Remaining suspect, and it is a good one: **`normalMap()` needs a tangent
frame**, and the probe panels are `BoxGeometry` with no tangents computed. In
the WebGL2 build this never came up because the GLSL built its own frame from
the triplanar branch and never asked the geometry for one.

Next actions, in order:
1. `g.computeTangents()` on the probe panels (needs index + uv + normal — the
   panels are `toNonIndexed()`, so index them first) and re-run.
2. If that lights them, the district's own geometry needs the same, which is a
   real decision rather than a detail: the merged accumulators do not carry
   tangents today. Either compute them at merge time, or keep the world-space
   path (`reliefNormalWorld`) and find the node property that accepts a world
   normal — grep first.

### Bisect attempt 6 — fault 1 localised to reliefNormal's arithmetic

Tangents on the probe panels did **not** fix it (`computeTangents()` on an
indexed BoxGeometry — kept anyway, it is correct). So the tangent-frame theory
is disproved too.

The discriminator that settled it, one flag:

| case | sample |
|---|---|
| `normalMap(vec3(0,0,1))` — flat, through the same node | **17** |
| `normalMap(reliefNormal(...))` — the real perturbation | **0** |

**`normalMap` works.** The fault is what `reliefNormal` returns.

That is a small function and `srfH` inside it is already proven good — colour
and roughness both call it and both light. So the fault is in the six lines
around it. In order of suspicion:

1. `.normalize()` on a vector that can be degenerate. If the gradient is zero
   and the z term is scaled oddly the result is 0/0.
2. `k = amp * fade / e` — division by `e`, which is `0.006 + dist*0.00035`.
   Fine at eye level, but `dist` inside a `normalMap` input graph may not be
   what it is elsewhere; if it resolves to 0 the division is by 0.006 (safe),
   if it resolves to something huge, k collapses.
3. the three `srfH` calls each carry `If/ElseIf` ladders with `.toVar()`, and
   nested control flow inside a node consumed by `normalMap` is the one shape
   here that has no equivalent in the working cases — colour and roughness
   each call `srfH` **once**, at the top level of their own `Fn`.

**Next actions, cheapest first.** Return early from `reliefNormal` at each
stage and re-run: (a) `return vec3(0,0,1)` — proves the wrapper; (b) return the
gradient without `.normalize()`; (c) return with one `srfH` call instead of
three (drop the central difference, use a constant gradient). Whichever step
turns 0 into 17 names the line.

Suspect 3 is the interesting one: if nested `If` ladders cannot be consumed by
`normalMap`, the fix is to compute the three heights in a plain `Fn` that
returns them, and do the differencing outside — which is a structural change to
`reliefNormal` rather than a one-liner, and worth knowing before writing it.

### Bisect attempt 7 — SOLVED. Two real faults, and neither was in the port.

Both were found by reading rather than guessing, and one method change found
them: **the harness was passing `stdio: 'ignore'`.** Six attempts of "black or
not black" when the page had been printing the answer to the console the whole
time and the harness was discarding it. That word is gone and the first error
now prints beside every reading.

**Fault A — three.js was instantiated twice.** The first line of the console:

    THREE.TSL: No stack defined for assign operation.
      at MeshStandardNodeMaterial.setupDiffuseColor (three__webgpu.js:21635)
      at GLSLNodeBuilder.prebuild                   (three.js:53542)

Two different files in one stack. `dist/gpuvendor/three.js` and
`three__webgpu.js` were **byte-identical copies** (same md5) served at two URLs,
because the import map pointed `three` at one and `three/webgpu` at the other.
A browser instantiates a module once per URL, so `currentStack` — which `Fn()`
sets and every `assign` reads — existed twice. The renderer's NodeBuilder set
it in one module's scope; `MeshStandardNodeMaterial`'s whole lighting model
ran in the other, found `null`, and built to nothing. Twenty-odd assigns
discarded, silently, per material.

Fix: one entry per module instance. `three/webgpu` now resolves to
`./gpuvendor/three.js` and the duplicate file is deleted. **Rule: never map a
package to two paths.** Every reading taken before this is void, which is why
the earlier tables disagree with each other.

**Fault B — TSL emits a shared var's initialisation at its FIRST USE, and the
first use was inside a branch.** With the module unified, the picture was clean
and damning: `plain` and `all off` lit at 176, and the moment `colorNode` came
on **only panel 0** survived — class 0 is the `If` body, classes 1–10 are the
`ElseIf` bodies.

Dumping the generated fragment shader (`tests/_shaderdump.mjs`, via
`renderer.debug.getShaderAsync`) showed it outright:

    if ( ( cls < 0.5 ) ) {
        normalView  = NORMAL_normalView;                      // <- in here
        normalWorld = normalize( vec4( normalView, 0 ) * cameraViewMatrix );
        uv = ...;                                             // triplanarUV
    } else if ( ( cls < 1.5 ) ) {
        normalWorld = normalize( vec4( normalView, 0 ) * cameraViewMatrix );
                              //   ^ never assigned on this path

`q` arrives as `triplanarUV(positionWorld, normalWorld)` and its first use was
inside branch 0, so the builder pinned `normalWorld`'s (and `normalView`'s)
initialisation there. Every other branch normalised a zero vector, got NaN,
and NaN albedo reads as a black panel.

Fix: `srfH`, `triplanarUV`, `triplanarFrame` and `reliefNormalStaged` all
materialise their parameters with `.toVar()` **above** their first `If`.

> **Rule, and it generalises to every branching node in this port: an `Fn` that
> branches must materialise its parameters before its first `If`.** Otherwise
> the first branch captures their initialisation and the rest read
> uninitialised memory. This is the single most expensive thing learned in the
> port and it is not in the docs.

**Fault C — `scene.fogNode` is the fragment, not a modifier.** Found the same
way (21903):

    output.assign( outputNode );           // the lit result goes in here
    outputNode = vec4( fogNode.toVar() );  // and the fog node REPLACES it

Returning `vec4(colour, factor)` painted flat fog over the whole frame. The fog
node has to read the lit fragment back off the `output` accessor and return the
finished vec4; `fog(colour, factor)` is three's own helper that does the mix,
so `directionalFog()` now supplies its two halves and returns `fog(...)`.

**Fault D — `uniform()` infers its type from the JS value.** A raw `0x7286a8`
is a Number, read as a float, and then `Uniform "null" not implemented`. Hex
colours have to arrive as `Color` and directions as `Vector3`.

**`normalMap()` was the wrong door all along**, and reading 16626 says why:

    let normalMap = this.node.mul( 2.0 ).sub( 1.0 );

it expects a *packed* 0..1 texel and unpacks it, then puts the result through
`TBNViewMatrix`, which wants a geometry tangent attribute the instanced city
meshes do not carry. `normalNode` on its own is consumed in place of
`materialNormal`, whose default is `normalView` — a plain signed **view-space**
normal. So the world-space triplanar frame the WebGL2 build already builds is
right, and the only thing the port adds is `.transformDirection(cameraViewMatrix)`.

**Result — step 3 is done.** All eleven classes light, with per-class variation
visible in the readings (BRICK reads darker than RENDER because of the mortar
recess, which is the surface law working):

| case | reading across the eleven class panels |
|---|---|
| plain (stock material) | 177 … 176 |
| all off | 176 … 175 |
| + colorNode | 162 149 155 159 159 155 157 163 160 155 160 |
| + roughnessNode | same |
| + relief normal (full) | 164 148 134 156 156 155 159 161 160 151 159 |
