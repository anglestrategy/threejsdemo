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
