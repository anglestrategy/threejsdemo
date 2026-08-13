#!/usr/bin/env python3
"""Why is this generated model black in places?

    python3 tests/glb_black.py work/gen/art_ring.glb [...]

Three different faults make an image-to-3D model show black patches, they look
identical in a thumbnail, and only one of them is the thumbnail's fault. This
tells them apart by measurement instead of by eye:

  1. INVERTED WINDING. A triangle wound the wrong way is lit from behind and
     goes black. Generated meshes get this on thin and concave features —
     which is exactly what a woven ring and a branch nest are.

     Detected PER TRIANGLE, by asking whether the winding disagrees with the
     shading normal the file itself supplies: cross(b-a, c-a) against the mean
     of the three vertex normals. That is precisely the condition under which
     a front-face-culled renderer drops the triangle and a lit one shades it
     from behind, and it is local, so it does not care how concave the object
     is.

     An earlier version of this test compared each normal against the
     direction from the CENTROID, which is a convexity test wearing an
     inversion test's clothes: it scored 13-37% on every asset here including
     a car (wheel wells) and a tree (inner canopy), all of them correct. The
     number it produced was real and the conclusion drawn from it was not.

     Fixable here: DoubleSide (the model material already sets it) plus
     recomputed normals at intake.

  2. BLACK TEXELS IN THE ALBEDO. The generator paints what it could see and
     leaves what it could not — the inside of a ring, the gaps in a lattice —
     near black, and that darkness is then baked into the map. Detected from
     the albedo histogram: a healthy studio-lit texture has almost nothing
     under 3% luminance. Fixable here, and worth fixing: lift the near-black
     texels toward the texture's own median rather than clamping, so the
     cavity reads as shadow rather than as a hole.

  3. THE PREVIEW'S OWN LIGHTING. One key light and no ambient makes every
     cavity black in the thumbnail and nothing at all is wrong with the model.
     This is the null result: normals fine, histogram fine.

Reports all three per file, and says which one it is.
"""
import json
import os
import struct
import sys

import numpy as np


def chunks(path):
    with open(path, 'rb') as f:
        f.read(12)
        js = None
        bin_ = None
        while True:
            hdr = f.read(8)
            if len(hdr) < 8:
                break
            ln, ty = struct.unpack('<II', hdr)
            data = f.read(ln)
            if ty == 0x4E4F534A:
                js = json.loads(data)
            elif ty == 0x004E4942:
                bin_ = data
    return js, bin_


CT = {5120: 'i1', 5121: 'u1', 5122: 'i2', 5123: 'u2', 5125: 'u4', 5126: 'f4'}
NC = {'SCALAR': 1, 'VEC2': 2, 'VEC3': 3, 'VEC4': 4, 'MAT4': 16}


def acc(d, b, i):
    a = d['accessors'][i]
    bv = d['bufferViews'][a['bufferView']]
    off = bv.get('byteOffset', 0) + a.get('byteOffset', 0)
    n = a['count'] * NC[a['type']]
    arr = np.frombuffer(b, dtype=CT[a['componentType']], count=n, offset=off)
    return arr.reshape(a['count'], NC[a['type']])


def report(path):
    d, b = chunks(path)
    name = os.path.basename(path)
    if not d or not b:
        print('%-16s could not read' % name)
        return

    # ---- 1. winding vs shading normal, per triangle
    flipped = 0
    total = 0
    vol = 0.0
    for m in d.get('meshes', []):
        for pr in m['primitives']:
            at = pr['attributes']
            if 'NORMAL' not in at or 'POSITION' not in at or 'indices' not in pr:
                continue
            P = acc(d, b, at['POSITION']).astype(np.float64)
            N = acc(d, b, at['NORMAL']).astype(np.float64)
            I = acc(d, b, pr['indices']).astype(np.int64).reshape(-1)
            if len(I) % 3:
                continue
            T = I.reshape(-1, 3)
            a0, b0, c0 = P[T[:, 0]], P[T[:, 1]], P[T[:, 2]]
            fn = np.cross(b0 - a0, c0 - a0)
            ln = np.linalg.norm(fn, axis=1, keepdims=True)
            ok = ln[:, 0] > 1e-12
            vn = (N[T[:, 0]] + N[T[:, 1]] + N[T[:, 2]]) / 3.0
            dp = (fn[ok] / ln[ok] * vn[ok]).sum(1)
            flipped += int((dp < -0.2).sum())
            total += int(ok.sum())
            # signed volume: negative means the whole mesh is inside out
            vol += float((a0 * np.cross(b0, c0)).sum() / 6.0)
    frac = flipped / total if total else 0.0

    # ---- 2. albedo histogram
    dark = None
    med = None
    for im in d.get('images', []):
        if 'bufferView' not in im:
            continue
        bv = d['bufferViews'][im['bufferView']]
        raw = b[bv.get('byteOffset', 0):bv.get('byteOffset', 0) + bv['byteLength']]
        try:
            from PIL import Image
            import io
            a = np.asarray(Image.open(io.BytesIO(raw)).convert('RGB'), dtype=np.float64) / 255.0
        except Exception:
            continue
        lum = a @ np.array([0.2126, 0.7152, 0.0722])
        d0 = float((lum < 0.03).mean())
        if dark is None or d0 > dark:
            dark = d0
            med = float(np.median(lum))

    verdict = "clean — the black is the PREVIEW'S LIGHTING, not the model"
    if vol < 0:
        verdict = 'WHOLE MESH INSIDE OUT (signed volume negative)'
    elif frac > 0.02:
        verdict = 'INVERTED WINDING on %.1f%% of triangles' % (frac * 100)
    elif dark is not None and dark > 0.06 and med is not None and med > 0.18:
        # a genuinely dark material (a black car) is not a fault; a dark
        # PATCH inside an otherwise mid-toned texture is
        verdict = 'BLACK TEXELS BAKED INTO THE ALBEDO (%.0f%% under 3%%)' % (dark * 100)
    print('%-18s flipped %5.2f%%  vol %s  albedo<3%% %s  median %s  -> %s' % (
        name, frac * 100,
        '+' if vol >= 0 else '-',
        ('%5.1f%%' % (dark * 100)) if dark is not None else '  n/a',
        ('%.2f' % med) if med is not None else ' n/a',
        verdict))


for f in sys.argv[1:]:
    report(f)
