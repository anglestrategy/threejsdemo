/* ==========================================================================
   THE POST STACK.

   This file is the reason the whole port exists. Everything else in `src/gpu/`
   is a translation of something the WebGL2 build already did; these four nodes
   are things it could not do at all.

   The chain, in order, and why each one is in it:

   1. **GTAO** — ground-truth ambient occlusion. The district's contact
      shadows currently come from a baked probe field, which is right at the
      scale of a street and blind at the scale of a kerb. GTAO is what puts the
      dark line where a column meets its plinth.

   2. **SSGI** — screen-space global illumination. One bounce. This is the term
      that makes a sunlit travertine wall throw warm light onto the paving in
      front of it, which is visible in all four SDC renders and in none of the
      WebGL2 screenshots. Denoised, because raw SSGI at this ray count is
      unusable.

   3. **TRAA** — temporal reprojection anti-aliasing. The actual reason for
      WebGPU. This scene is sub-pixel geometric detail: a date palm at eighty
      metres is three hundred bladed leaflets, a mashrabiya screen is a
      thousand 18 mm members. MSAA does nothing for that (it is not an edge
      problem, it is a sampling problem) and supersampling at 1.3x costs 1.7x
      the fill for a worse result. TRAA accumulates over frames and resolves it
      for roughly the cost of one extra buffer.

   4. **bloom**, then **the colour script**. Bloom before the grade, always:
      bloom is a lens artefact and happens in linear light before any
      photographic decision, and putting it after the grade blooms the graded
      colour rather than the light that caused it.

   ---- the MRT ------------------------------------------------------------
   GTAO wants depth and view normals, SSGI wants depth, normals and beauty,
   TRAA wants beauty, depth and velocity. So the scene pass writes four
   targets rather than one, and every node reads from that single pass. The
   alternative — a pass per consumer — is three extra full-scene renders.

   ---- what is verifiable here -------------------------------------------
   This container can create a WebGPU device and then loses it (swiftshader),
   so all of this is verified on the WebGL2 backend, where the TSL compiles to
   GLSL and the passes still run. `csm` is the exception: `CSMShadowNode` is
   WebGPU-only by construction, so the WebGL2 path takes a single well-fitted
   shadow camera instead and the cascade split is the one thing only real
   hardware can sign off. That is stated rather than implied — see
   DEVIATIONS.md.
   ========================================================================== */

import { RenderPipeline } from 'three/webgpu';
import {
  pass, mrt, output, normalView, velocity, vec4,
} from 'three/tsl';
import { traa } from 'three/addons/tsl/display/TRAANode.js';
import { ao } from 'three/addons/tsl/display/GTAONode.js';
import { ssgi } from 'three/addons/tsl/display/SSGINode.js';
import { bloom } from 'three/addons/tsl/display/BloomNode.js';
import { colorScript } from './grade.js';

/* Almost every knob on these nodes is a `uniform(...)` node, not a number, so
   Object.assign onto the node replaces the uniform with a plain value and the
   next build dies on `this.sliceCount.toConst is not a function`. Write through
   `.value` when the target is a uniform and assign only when it is not — which
   is the difference between `resolutionScale` (a plain number, read at resize)
   and `radius` (a uniform, read every frame). */
function tune(node, params) {
  for (const [k, v] of Object.entries(params)) {
    const cur = node[k];
    if (cur && cur.isNode && 'value' in cur) cur.value = v;
    else node[k] = v;
  }
  return node;
}

export const POST = {
  ao: { distanceExponent: 1.0, distanceFallOff: 1.0, radius: 0.4, scale: 1.1, thickness: 1.0 },
  ssgi: { sliceCount: 2, stepCount: 8, useScreenSpaceSampling: true },
  bloom: { strength: 0.32, radius: 0.55, threshold: 0.85 },
};

/**
 * @param renderer  WebGPURenderer
 * @param scene     Scene
 * @param camera    PerspectiveCamera
 * @param opts.webgpu  true when the real backend came up; gates the nodes that
 *                     need it, so the WebGL2 fallback still produces a frame
 */
export function buildPost(renderer, scene, camera, opts = {}) {
  const scenePass = pass(scene, camera);
  scenePass.setMRT(mrt({
    output,
    normal: normalView,        // `transformedNormalView` is the r183 spelling
    velocity,
  }));

  const beauty = scenePass.getTextureNode('output');
  const depth = scenePass.getTextureNode('depth');
  const normal = scenePass.getTextureNode('normal');
  const vel = scenePass.getTextureNode('velocity');

  const nodes = {};
  let chain = beauty;

  /* GTAO multiplies rather than replaces: it is an occlusion term on the
     indirect light the probe field already provides, not a substitute for it.
     Multiplying the beauty is a cheat compared with feeding aoNode per
     material, but the probe field is what carries the colour of the bounce and
     GTAO only carries its absence, so the cheat is the correct one here. */
  if (opts.ao !== false) {
    const aoNode = tune(ao(depth, normal, camera), POST.ao);
    nodes.ao = aoNode;
    /* `.r`, and the swizzle is the whole point: GTAO writes occlusion into a
       single channel, so multiplying the RGBA beauty by the raw texture node
       multiplies green and blue by zero. The frame comes out pure red with the
       geometry still legible through it — which looks like a colour-space bug
       and is not one. Alpha is carried through untouched for the same reason. */
    const occ = aoNode.getTextureNode().r;
    chain = vec4(chain.rgb.mul(occ), chain.a);
  }

  /* SSGI is WebGPU-only in practice, and the failure is silent enough to be
     worth naming: its render target is `UnsignedInt101111Type` (RG11B10F), and
     three only checks for `rg11b10ufloat-renderable` when the backend IS
     WebGPU. On the WebGL2 fallback the target is created anyway, the driver
     here cannot render to that format, and the node returns a uniform
     vec3(1,0,0) — the whole frame comes out flat red with the geometry faintly
     legible through it, which reads like a colour-space bug and is not one.

     So it is gated rather than fixed: a fix would mean a lower-precision
     target, and the point of a GI buffer is precision. `?ssgi=1` forces it on
     for a look on real hardware. */
  const wantSSGI = opts.ssgi === true || (opts.ssgi !== false && opts.webgpu);
  if (wantSSGI) {
    const gi = tune(ssgi(chain, depth, normal, camera), POST.ssgi);
    nodes.ssgi = gi;
    chain = gi;
  } else if (opts.ssgi !== false) {
    nodes.ssgiSkipped = 'needs the WebGPU backend (RG11B10F render target)';
  }

  /* TRAA last among the spatial effects and before bloom: it has to resolve
     the same buffer the eye judges, and running bloom first would smear the
     jitter into the halo where no reprojection can take it back out. */
  if (opts.traa !== false) {
    nodes.traa = traa(chain, depth, vel, camera);
    chain = nodes.traa;
  }

  if (opts.bloom !== false) {
    const b = bloom(chain, POST.bloom.strength, POST.bloom.radius, POST.bloom.threshold);
    nodes.bloom = b;
    chain = chain.add(b);
  }

  const grade = colorScript(vec4(chain));
  nodes.grade = grade;

  const post = new RenderPipeline(renderer);
  post.outputNode = grade.node;

  return { post, scenePass, nodes, setTime: grade.setTime };
}
