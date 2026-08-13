#!/usr/bin/env python3
"""Tolerance weld for a GLB, as a preprocessing step before gltf-transform.

meshoptimizer can only collapse an edge that exists. A photogrammetric shrub
is a few hundred thousand leaf shells that never share a vertex, so it has
almost no collapsible edges: the waterside shrub came out of `simplify` at
1.04 M triangles whether it was asked for 40 k or for a million, and its far
level came back byte-identical to its near one. gltf-transform's own `weld`
merges only exactly-coincident vertices, which on scan output is none of them.

This snaps vertices onto a tolerance grid and merges them, which gives the
shells shared vertices and hands the simplifier something to work with.

The tolerance is the whole argument:

  fine (a few mm)   merges only vertices that are genuinely the same point,
                    split by the scanner's own precision. Almost no texture
                    damage. Enough to unlock a 4-5x reduction.
  coarse (cm)       fuses neighbouring leaves into one surface. The texture
                    smears across the merge, which is why this is only ever
                    used for a level that is never seen closer than seventy
                    metres.

UVs and normals are carried from the first vertex landing in each cell, not
resampled spatially — the mistake that shuffled the tram's texture.
"""
import json
import os
import struct
import sys

import numpy as np

CT = {5120: np.int8, 5121: np.uint8, 5122: np.int16, 5123: np.uint16,
      5125: np.uint32, 5126: np.float32}
NC = {'SCALAR': 1, 'VEC2': 2, 'VEC3': 3, 'VEC4': 4}


def read_glb(path):
    with open(path, 'rb') as f:
        f.read(12)
        jl, _ = struct.unpack('<II', f.read(8))
        doc = json.loads(f.read(jl))
        bl, _ = struct.unpack('<II', f.read(8))
        return doc, bytearray(f.read(bl))


def acc_read(doc, buf, i):
    a = doc['accessors'][i]
    bv = doc['bufferViews'][a['bufferView']]
    n, dt = NC[a['type']], CT[a['componentType']]
    off = bv.get('byteOffset', 0) + a.get('byteOffset', 0)
    stride = bv.get('byteStride')
    if stride and stride != n * np.dtype(dt).itemsize:
        raw = np.frombuffer(bytes(buf), dtype=np.uint8,
                            count=stride * a['count'], offset=off)
        raw = raw.reshape(a['count'], stride)[:, :n * np.dtype(dt).itemsize]
        return np.ascontiguousarray(raw).view(dt).reshape(a['count'], n)
    return np.frombuffer(bytes(buf), dtype=dt, count=a['count'] * n,
                         offset=off).reshape(a['count'], n).copy()


def weld_prim(doc, buf, pr, tol):
    at = pr['attributes']
    pos = acc_read(doc, buf, at['POSITION']).astype(np.float32)
    idx = acc_read(doc, buf, pr['indices']).astype(np.int64).reshape(-1, 3)
    keys = np.round(pos / tol).astype(np.int64)
    _, first, inv = np.unique(keys, axis=0, return_index=True, return_inverse=True)
    inv = inv.reshape(-1)
    tri = inv[idx]
    ok = (tri[:, 0] != tri[:, 1]) & (tri[:, 1] != tri[:, 2]) & (tri[:, 0] != tri[:, 2])
    tri = tri[ok]
    out = {}
    for name, ai in at.items():
        out[name] = acc_read(doc, buf, ai)[first]
    return out, tri.astype(np.uint32)


def write_glb(path, prims, mats, images, samplers, textures):
    bins, views, accs, meshes = bytearray(), [], [], []

    def push(a, target=None):
        while len(bins) % 4:
            bins.append(0)
        off = len(bins)
        raw = np.ascontiguousarray(a).tobytes()
        bins.extend(raw)
        v = {'buffer': 0, 'byteOffset': off, 'byteLength': len(raw)}
        if target:
            v['target'] = target
        views.append(v)
        return len(views) - 1

    def add_acc(a, typ, ct, target, minmax=False):
        v = push(a, target)
        rec = {'bufferView': v, 'componentType': ct, 'count': len(a), 'type': typ}
        if minmax:
            rec['min'] = a.min(0).tolist()
            rec['max'] = a.max(0).tolist()
        accs.append(rec)
        return len(accs) - 1

    prim_out = []
    for attrs, tri, mat in prims:
        a = {}
        for name, arr in attrs.items():
            typ = {1: 'SCALAR', 2: 'VEC2', 3: 'VEC3', 4: 'VEC4'}[arr.shape[1]]
            ct = {np.dtype(np.float32): 5126, np.dtype(np.uint16): 5123,
                  np.dtype(np.uint8): 5121, np.dtype(np.uint32): 5125,
                  np.dtype(np.int16): 5122, np.dtype(np.int8): 5120}[arr.dtype]
            a[name] = add_acc(arr, typ, ct, 34962, minmax=(name == 'POSITION'))
        small = attrs['POSITION'].shape[0] <= 65535
        ia = tri.reshape(-1).astype(np.uint16 if small else np.uint32)
        ii = add_acc(ia.reshape(-1, 1), 'SCALAR', 5123 if small else 5125, 34963)
        accs[ii].pop('min', None)
        accs[ii].pop('max', None)
        p = {'attributes': a, 'indices': ii}
        if mat is not None:
            p['material'] = mat
        prim_out.append(p)
    meshes.append({'primitives': prim_out})

    for im in images:
        im['bufferView'] = push(np.frombuffer(im.pop('_data'), np.uint8))
    doc = {'asset': {'version': '2.0', 'generator': 'preweld.py'},
           'scene': 0, 'scenes': [{'nodes': [0]}], 'nodes': [{'mesh': 0}],
           'meshes': meshes, 'accessors': accs, 'bufferViews': views,
           'buffers': [{'byteLength': len(bins)}]}
    if mats:
        doc['materials'] = mats
    if images:
        doc['images'] = images
    if samplers:
        doc['samplers'] = samplers
    if textures:
        doc['textures'] = textures
    js = json.dumps(doc, separators=(',', ':')).encode()
    while len(js) % 4:
        js += b' '
    while len(bins) % 4:
        bins.append(0)
    glb = (struct.pack('<III', 0x46546C67, 2, 12 + 8 + len(js) + 8 + len(bins))
           + struct.pack('<II', len(js), 0x4E4F534A) + js
           + struct.pack('<II', len(bins), 0x004E4942) + bytes(bins))
    open(path, 'wb').write(glb)


def preweld(src, dst, tol):
    doc, buf = read_glb(src)
    prims, before, after = [], 0, 0
    for m in doc.get('meshes', []):
        for pr in m.get('primitives', []):
            if 'indices' not in pr or 'POSITION' not in pr.get('attributes', {}):
                continue
            before += doc['accessors'][pr['indices']]['count'] // 3
            attrs, tri = weld_prim(doc, buf, pr, tol)
            after += len(tri)
            prims.append((attrs, tri, pr.get('material')))
    if not prims:
        return 0, 0
    images = []
    for im in doc.get('images', []):
        bv = doc['bufferViews'][im['bufferView']]
        o = bv.get('byteOffset', 0)
        images.append({'mimeType': im.get('mimeType', 'image/png'),
                       '_data': bytes(buf[o:o + bv['byteLength']])})
    write_glb(dst, prims, doc.get('materials'), images,
              doc.get('samplers'), doc.get('textures'))
    return before, after


if __name__ == '__main__':
    b, a = preweld(sys.argv[1], sys.argv[2], float(sys.argv[3]))
    print('preweld %.4f: %d -> %d tris  (%.1f MB)'
          % (float(sys.argv[3]), b, a, os.path.getsize(sys.argv[2]) / 1048576))
