#!/usr/bin/env python3
"""Vendor three.js and the TSL node modules the WebGPU build needs.

    python3 gen_vendor_gpu.py [--tgz /tmp/three-0.185.0.tgz]

Writes `src/vendor_gpu.json`: {dist-relative path: base64}. `build.py` decodes
it into `dist/gpuvendor/` and writes the import map.

Two decisions here, both bought with debugging time:

**The directory structure is preserved.** The first version flattened every
example module to `addons__Name.js` and mapped each one by name. That works
right up until a module imports a sibling by *relative* path — GLTFLoader does,
`../utils/BufferGeometryUtils.js` — because an import map cannot remap a
relative specifier. It resolves against the importer's own URL, so the file has
to physically be there. Flattening produced a class of 404s that all looked
like missing modules and none of which were. Mirroring `examples/jsm/` under
`gpuvendor/jsm/` and mapping the single prefix `three/addons/` makes every
relative import resolve by construction, and the trap cannot recur.

**One URL per module instance.** `three`, `three/webgpu` and the `TSL` re-export
all resolve to the same `gpuvendor/three.js`. They used to be two byte-identical
copies at two paths, and a browser instantiates a module once *per URL*: TSL's
`currentStack` — which `Fn()` sets and every `assign` reads — existed twice, so
`MeshStandardNodeMaterial`'s entire lighting model wrote into a stack the
builder never read and silently built to nothing. Everything rendered black.
That is the single most expensive bug in this port and it was one import-map
line.
"""
import base64
import json
import os
import re
import subprocess
import sys
import tempfile

ROOT = os.path.dirname(os.path.abspath(__file__))
p = lambda *a: os.path.join(ROOT, *a)

TGZ = '/tmp/three-0.185.0.tgz'
if '--tgz' in sys.argv:
    TGZ = sys.argv[sys.argv.index('--tgz') + 1]

# The roots of the closure. Everything these reach by relative import comes
# along; bare `three*` specifiers are the import map's job.
ROOTS = [
    'examples/jsm/loaders/GLTFLoader.js',
    'examples/jsm/controls/OrbitControls.js',
    'examples/jsm/renderers/CSS2DRenderer.js',
    'examples/jsm/libs/meshopt_decoder.module.js',
    # cascaded shadows — WebGPU-only, and the reason the district's 400 m
    # streets can hold a 2 cm shadow at the near cascade
    'examples/jsm/csm/CSMShadowNode.js',
    # the post stack: TRAA is why this port exists at all
    'examples/jsm/tsl/display/TRAANode.js',
    'examples/jsm/tsl/display/SSGINode.js',
    'examples/jsm/tsl/display/GTAONode.js',
    'examples/jsm/tsl/display/BloomNode.js',
    'examples/jsm/tsl/display/SMAANode.js',
    'examples/jsm/tsl/display/DenoiseNode.js',
    'examples/jsm/tsl/display/DepthOfFieldNode.js',
    'examples/jsm/tsl/display/SharpenNode.js',
    'examples/jsm/tsl/display/Lut3DNode.js',
    # every shopfront and streetlight is a point light after dusk; forward+
    # clustering is what makes that a scene rather than a slideshow
    'examples/jsm/tsl/lighting/ClusteredLightsNode.js',
]

BUILD = {
    'gpuvendor/three.js': 'build/three.webgpu.js',
    'gpuvendor/three.core.js': 'build/three.core.js',
    'gpuvendor/three.tsl.js': 'build/three.tsl.js',
}

IMPORT_RE = re.compile(
    r"""(?:^|\n)\s*(?:import|export)\b[^;\n]*?\bfrom\s*['"]([^'"]+)['"]"""
    r"""|import\s*\(\s*['"]([^'"]+)['"]\s*\)""", re.M)


def patch_swizzle(data):
    """Drop `swizzle` from three's reusable GPUTextureViewDescriptor.

    This is the one patch applied to the vendored build, and it is what makes
    the WebGPU backend usable at all in this container. r185's descriptor sets

        this.swizzle = 'rgba';

    and hands the object straight to `GPUTexture.createView()`. Chromium 141's
    Dawn validates every own property of that dictionary and rejects a string
    where it wants a `GPUTextureComponentSwizzle`:

        createView: Failed to read the 'swizzle' property from
        GPUTextureViewDescriptor: not of type GPUTextureComponentSwizzle

    which killed every WebGPU frame and forced the whole port to be verified on
    the WebGL2 backend — i.e. with TRAA, SSGI, GTAO and CSM, the entire reason
    for the move, unverifiable.

    Removing it is a no-op semantically. `'rgba'` is the identity swizzle, the
    property is written in exactly two places (the constructor and `reset()`)
    and read nowhere, three never requests the `texture-component-swizzle`
    feature that would give it meaning, and a browser that does support the
    feature applies the identity by default when the key is absent. So this
    changes nothing on hardware that works and unblocks hardware that does not.

    Reversible by deleting this function; verified by `tests/_gpu.mjs` reporting
    `renderer: WebGPU` with no page errors.
    """
    src = data.decode('utf-8')
    n = src.count("this.swizzle = 'rgba';")
    if n == 0:
        return data            # upstream dropped it; nothing to do
    if n != 2:
        sys.exit('swizzle patch: expected 2 sites, found %d — read the build '
                 'before widening this' % n)
    src = src.replace("this.swizzle = 'rgba';",
                      "// swizzle removed at vendor time — see gen_vendor_gpu.py")
    return src.encode('utf-8')


def main():
    tmp = tempfile.mkdtemp(prefix='twg')
    subprocess.check_call(['tar', 'xzf', TGZ, '-C', tmp])
    pkg = os.path.join(tmp, 'package')
    if not os.path.isdir(pkg):
        sys.exit('unexpected tarball layout under ' + tmp)

    out = {}
    for dest, src in BUILD.items():
        data = open(os.path.join(pkg, src), 'rb').read()
        if dest.endswith('three.js'):
            data = patch_swizzle(data)
        out[dest] = base64.b64encode(data).decode()

    seen, queue = set(), list(ROOTS)
    missing = []
    while queue:
        rel = queue.pop()
        if rel in seen:
            continue
        seen.add(rel)
        full = os.path.join(pkg, rel)
        if not os.path.isfile(full):
            missing.append(rel)
            continue
        src = open(full, encoding='utf-8').read()
        # dist path mirrors examples/jsm/… as gpuvendor/jsm/…, so every relative
        # import in the file resolves to the same place it did in the package
        out['gpuvendor/' + rel.replace('examples/', '', 1)] = \
            base64.b64encode(src.encode()).decode()
        for m in IMPORT_RE.finditer(src):
            spec = m.group(1) or m.group(2)
            if spec.startswith('.'):
                queue.append(os.path.normpath(os.path.join(os.path.dirname(rel), spec)))
            elif spec.startswith('three/addons/'):
                queue.append('examples/jsm/' + spec[len('three/addons/'):])
            # bare `three`, `three/tsl`, `three/webgpu` are import-map entries

    if missing:
        sys.exit('unresolved imports:\n  ' + '\n  '.join(sorted(missing)))

    json.dump(out, open(p('src/vendor_gpu.json'), 'w', encoding='utf-8'))
    n = os.path.getsize(p('src/vendor_gpu.json'))
    print('src/vendor_gpu.json  %d modules  %.1f MB' % (len(out), n / 1048576))
    for k in sorted(out):
        if 'jsm/' in k:
            print('   ' + k)


main()
