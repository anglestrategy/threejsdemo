#!/usr/bin/env python3
"""Delete the black membranes an image-to-3D generator stretches across holes.

    python3 gen_fixblack.py work/gen/*.glb          # report only
    python3 gen_fixblack.py --write work/gen/*.glb  # and fix

THE FAULT. A generator reconstructs a surface from images. Where the object
has a HOLE — the middle of a ring, the gaps in a lattice, the space under an
arch — there is nothing to reconstruct, and rather than leave the boundary
open it stretches a flat sheet across the opening and paints it black, because
black is what its own depth-carving left there. On a woven ring sculpture the
result is a wheel with a solid black disc where the sky should be. It is not a
lighting artefact, it is not inverted winding, and it is not a thumbnail
problem: the geometry is really there and it will really occlude the street
behind it.

WHY THE OTHER TESTS MISS IT. `tests/glb_black.py` checks winding against the
shading normal and the albedo histogram. A cap passes both: its winding is
consistent, its normals are fine, and its texels are a small fraction of a
texture that is otherwise correctly lit. Nothing is malformed. There is simply
a surface that should not exist.

THE TEST THAT CATCHES IT. Three conditions together, and all three are needed
because each one alone deletes something real:

  black     every corner of the triangle samples under 2% luminance in the
            base colour texture. Alone this would eat tyres, a black steel
            bench frame and a cast lamp post.
  flat      the connected run of black triangles varies by less than 12
            degrees in normal. Alone this would eat any dark flat panel — and
            a tyre or a lamp post fails it, which is the point.
  large     the run is at least 0.8% of the mesh and at least 150 triangles.
            A cap spans an opening; incidental black is speckle.

WHAT IT DOES. Rewrites the INDEX buffer only. Vertices, normals, uvs, joints,
weights, textures and every accessor but one are left byte-for-byte alone, so
a rigged figure stays rigged and nothing else can drift. The dropped triangles
leave their vertices behind unreferenced, which costs a few kilobytes and
avoids a re-index that could break the skin.
"""
import io
import json
import os
import struct
import sys

import numpy as np

CT = {5120: 'i1', 5121: 'u1', 5122: 'i2', 5123: 'u2', 5125: 'u4', 5126: 'f4'}
NC = {'SCALAR': 1, 'VEC2': 2, 'VEC3': 3, 'VEC4': 4, 'MAT4': 16}
BLACK = 0.02        # luminance below which a texel is "the generator gave up"
FLAT = 0.978        # cos(12 deg)
MINFRAC = 0.008
MINTRI = 150


def read_glb(path):
    raw = open(path, 'rb').read()
    assert raw[:4] == b'glTF'
    off = 12
    js = None
    bins = None
    while off < len(raw):
        ln, ty = struct.unpack('<II', raw[off:off + 8])
        data = raw[off + 8:off + 8 + ln]
        if ty == 0x4E4F534A:
            js = json.loads(data)
        elif ty == 0x004E4942:
            bins = bytearray(data)
        off += 8 + ln
    return js, bins


def write_glb(path, d, b):
    js = json.dumps(d, separators=(',', ':')).encode()
    js += b' ' * ((4 - len(js) % 4) % 4)
    bn = bytes(b) + b'\x00' * ((4 - len(b) % 4) % 4)
    total = 12 + 8 + len(js) + 8 + len(bn)
    out = bytearray()
    out += b'glTF' + struct.pack('<II', 2, total)
    out += struct.pack('<II', len(js), 0x4E4F534A) + js
    out += struct.pack('<II', len(bn), 0x004E4942) + bn
    open(path, 'wb').write(bytes(out))


def acc(d, b, i):
    a = d['accessors'][i]
    bv = d['bufferViews'][a['bufferView']]
    off = bv.get('byteOffset', 0) + a.get('byteOffset', 0)
    n = a['count'] * NC[a['type']]
    return np.frombuffer(bytes(b), dtype=CT[a['componentType']], count=n,
                         offset=off).reshape(a['count'], NC[a['type']])


def base_image(d, b, prim):
    """the base-colour image for this primitive, as a float luminance array"""
    mi = prim.get('material')
    if mi is None:
        return None
    m = d['materials'][mi]
    pbr = m.get('pbrMetallicRoughness', {})
    ti = pbr.get('baseColorTexture', {}).get('index')
    if ti is None:
        return None
    src = d['textures'][ti].get('source')
    if src is None:
        return None
    im = d['images'][src]
    if 'bufferView' not in im:
        return None
    bv = d['bufferViews'][im['bufferView']]
    raw = bytes(b)[bv.get('byteOffset', 0):bv.get('byteOffset', 0) + bv['byteLength']]
    try:
        from PIL import Image
        a = np.asarray(Image.open(io.BytesIO(raw)).convert('RGB'), dtype=np.float32) / 255.0
    except Exception:
        return None
    return a @ np.array([0.2126, 0.7152, 0.0722], dtype=np.float32)


def components(T, keep, nv):
    """connected runs of flagged triangles, joined through shared vertices"""
    idx = np.nonzero(keep)[0]
    if not len(idx):
        return []
    parent = list(range(len(idx)))

    def find(x):
        while parent[x] != x:
            parent[x] = parent[parent[x]]
            x = parent[x]
        return x

    seen = {}
    for k, t in enumerate(idx):
        for v in T[t]:
            v = int(v)
            if v in seen:
                a, bb = find(seen[v]), find(k)
                if a != bb:
                    parent[a] = bb
            else:
                seen[v] = k
    groups = {}
    for k in range(len(idx)):
        groups.setdefault(find(k), []).append(idx[k])
    return list(groups.values())


def fix(path, write):
    d, b = read_glb(path)
    name = os.path.basename(path)
    if not d or b is None:
        print('%-18s unreadable' % name)
        return 0
    removed = 0
    kept = 0
    for m in d.get('meshes', []):
        for pr in m['primitives']:
            at = pr['attributes']
            if 'indices' not in pr or 'POSITION' not in at or 'NORMAL' not in at:
                continue
            if 'TEXCOORD_0' not in at:
                continue
            lum = base_image(d, b, pr)
            if lum is None:
                continue
            P = acc(d, b, at['POSITION']).astype(np.float32)
            N = acc(d, b, at['NORMAL']).astype(np.float32)
            UV = acc(d, b, at['TEXCOORD_0']).astype(np.float32)
            I = acc(d, b, pr['indices']).reshape(-1).astype(np.int64)
            T = I.reshape(-1, 3)
            kept += len(T)

            h, w = lum.shape
            u = np.clip((UV[:, 0] % 1.0) * (w - 1), 0, w - 1).astype(np.int32)
            v = np.clip((1.0 - UV[:, 1] % 1.0) * (h - 1), 0, h - 1).astype(np.int32)
            vl = lum[v, u]
            black = (vl[T] < BLACK).all(1)
            if not black.any():
                continue

            drop = np.zeros(len(T), dtype=bool)
            for comp in components(T, black, len(P)):
                if len(comp) < MINTRI or len(comp) < MINFRAC * len(T):
                    continue
                n = N[T[comp]].reshape(-1, 3)
                n = n / np.maximum(np.linalg.norm(n, axis=1, keepdims=True), 1e-9)
                mean = n.mean(0)
                mean /= max(np.linalg.norm(mean), 1e-9)
                if float((n @ mean).mean()) < FLAT:
                    continue                      # curved: a real black object
                drop[comp] = True
            if not drop.any():
                continue
            removed += int(drop.sum())
            if not write:
                continue
            newI = T[~drop].reshape(-1).astype(np.uint32)
            off = len(b)
            b += newI.tobytes()
            d['bufferViews'].append({'buffer': 0, 'byteOffset': off,
                                     'byteLength': len(newI) * 4,
                                     'target': 34963})
            d['accessors'].append({'bufferView': len(d['bufferViews']) - 1,
                                   'componentType': 5125, 'count': int(len(newI)),
                                   'type': 'SCALAR'})
            pr['indices'] = len(d['accessors']) - 1
    if removed:
        if write:
            d['buffers'][0]['byteLength'] = len(b)
            write_glb(path, d, b)
        print('%-18s %s %d of %d triangles (%.1f%%) — a capped opening' % (
            name, 'REMOVED' if write else 'would remove', removed, kept,
            removed / max(kept, 1) * 100))
    else:
        print('%-18s no capped openings' % name)
    return removed


write = '--write' in sys.argv
files = [a for a in sys.argv[1:] if a != '--write']
tot = sum(fix(f, write) for f in files)
print('\n%d triangles %s' % (tot, 'removed' if write else 'would be removed'))
