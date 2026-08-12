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
- [~] **3 — the material.** `src/gpu/material.js`. Compiles, links and renders
      with no page errors — and comes out **black**. See "Step 3: black
      panels" below. This is where the port actually is.
- [ ] 4 — CSM, then TRAA
- [ ] 5 — SSGI, GTAO
- [ ] 6 — walk cycle, water, planar reflection
- [ ] 7 — colour script + post stack, then the six-bookmark side-by-side

**Everything through step 2 is syntax-checked and unverified in-scene.** Nothing
is wired into a material yet, so none of it has rendered a pixel. That is stated
plainly rather than implied, and step 3 is where it stops being true.

## Step 3: black panels — an open, reproducible fault

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
