#!/usr/bin/env python3
"""Reduce a generated GLB (Tripo/Meshy) to something embeddable, and report
what it actually is. These come back as one welded blob with lighting baked
into a single albedo — useful as a hero object, useless as architecture you
walk through — so the first job is to see it."""
import base64, io, json, struct, sys
import numpy as np
from PIL import Image
import fast_simplification

SRC = sys.argv[1] if len(sys.argv) > 1 else 'work/user/model26.glb'
TARGET = int(sys.argv[2]) if len(sys.argv) > 2 else 60000
TEX = int(sys.argv[3]) if len(sys.argv) > 3 else 1024

f = open(SRC, 'rb')
struct.unpack('<III', f.read(12))
jl, _ = struct.unpack('<II', f.read(8))
doc = json.loads(f.read(jl))
bl, _ = struct.unpack('<II', f.read(8))
buf = f.read(bl)


def acc(i):
    a = doc['accessors'][i]
    bv = doc['bufferViews'][a['bufferView']]
    nc = {'SCALAR': 1, 'VEC2': 2, 'VEC3': 3, 'VEC4': 4}[a['type']]
    dt = {5120: np.int8, 5121: np.uint8, 5122: np.int16, 5123: np.uint16,
          5125: np.uint32, 5126: np.float32}[a['componentType']]
    off = bv.get('byteOffset', 0) + a.get('byteOffset', 0)
    return np.frombuffer(buf, dtype=dt, count=a['count'] * nc, offset=off).reshape(a['count'], nc)


pr = doc['meshes'][0]['primitives'][0]
pos = acc(pr['attributes']['POSITION']).astype(np.float32)
uv = acc(pr['attributes']['TEXCOORD_0']).astype(np.float32) if 'TEXCOORD_0' in pr['attributes'] else None
nrm = acc(pr['attributes']['NORMAL']).astype(np.float32) if 'NORMAL' in pr['attributes'] else None
idx = acc(pr['indices']).astype(np.uint32).reshape(-1, 3)
lo, hi = pos.min(0), pos.max(0)
print('source %d tris / %d verts' % (len(idx), len(pos)))
print('bbox  %.2f x %.2f x %.2f  (metres if Y-up)' % tuple(hi - lo))
print('centre', np.round((hi + lo) / 2, 2))

p, i2 = pos, idx
while len(i2) > TARGET:
    red = min(0.94, max(0.05, 1.0 - TARGET / len(i2)))
    p, i2 = fast_simplification.simplify(p, i2.astype(np.uint32), red)
    i2 = i2.reshape(-1, 3)
print('reduced to %d tris / %d verts' % (len(i2), len(p)))

from scipy.spatial import cKDTree
_, near = cKDTree(pos).query(p, workers=-1)
uv2 = uv[near] if uv is not None else np.zeros((len(p), 2), np.float32)
nr2 = nrm[near] if nrm is not None else np.zeros((len(p), 3), np.float32)

im = doc['images'][0]
bv = doc['bufferViews'][im['bufferView']]
raw = buf[bv['byteOffset']:bv['byteOffset'] + bv['byteLength']]
img = Image.open(io.BytesIO(raw)).convert('RGB').resize((TEX, TEX), Image.LANCZOS)
b = io.BytesIO(); img.save(b, 'WEBP', quality=82, method=6)
tex = b.getvalue()
print('texture %d -> %d KB webp @ %d' % (len(raw) // 1024, len(tex) // 1024, TEX))

bins, views, accs = bytearray(), [], []
def push(a, t=None):
    off = len(bins); r = a.tobytes(); bins.extend(r)
    while len(bins) % 4: bins.append(0)
    v = {'buffer': 0, 'byteOffset': off, 'byteLength': len(r)}
    if t: v['target'] = t
    views.append(v); return len(views) - 1

vp = push(p.astype(np.float32), 34962); vn = push(nr2.astype(np.float32), 34962)
vu = push(uv2.astype(np.float32), 34962)
small = len(p) <= 65535
vi = push(i2.reshape(-1).astype(np.uint16 if small else np.uint32), 34963)
vt = push(np.frombuffer(tex, np.uint8))
accs = [
    {'bufferView': vp, 'componentType': 5126, 'count': len(p), 'type': 'VEC3',
     'min': p.min(0).tolist(), 'max': p.max(0).tolist()},
    {'bufferView': vn, 'componentType': 5126, 'count': len(nr2), 'type': 'VEC3'},
    {'bufferView': vu, 'componentType': 5126, 'count': len(uv2), 'type': 'VEC2'},
    {'bufferView': vi, 'componentType': 5123 if small else 5125, 'count': i2.size, 'type': 'SCALAR'},
]
out = {'asset': {'version': '2.0', 'generator': 'gen_userglb.py'},
       'scene': 0, 'scenes': [{'nodes': [0]}], 'nodes': [{'mesh': 0, 'name': 'LOD0'}],
       'meshes': [{'primitives': [{'attributes': {'POSITION': 0, 'NORMAL': 1, 'TEXCOORD_0': 2},
                                   'indices': 3, 'material': 0}]}],
       'materials': [{'name': 'tripo', 'doubleSided': True,
                      'pbrMetallicRoughness': {'baseColorTexture': {'index': 0},
                                               'metallicFactor': 0.0, 'roughnessFactor': 0.92}}],
       'textures': [{'sampler': 0, 'source': 0}],
       'images': [{'mimeType': 'image/webp', 'bufferView': vt}],
       'samplers': [{'magFilter': 9729, 'minFilter': 9987, 'wrapS': 10497, 'wrapT': 10497}],
       'accessors': accs, 'bufferViews': views, 'buffers': [{'byteLength': len(bins)}]}
js = json.dumps(out, separators=(',', ':')).encode()
while len(js) % 4: js += b' '
glb = (struct.pack('<III', 0x46546C67, 2, 12 + 8 + len(js) + 8 + len(bins))
       + struct.pack('<II', len(js), 0x4E4F534A) + js
       + struct.pack('<II', len(bins), 0x004E4942) + bytes(bins))
open('work/user/model26_lod.glb', 'wb').write(glb)
json.dump({'user_model': {'glb': base64.b64encode(glb).decode(), 'tris': len(i2),
                          'height': float(hi[1] - lo[1]), 'base': float(lo[1]),
                          'radius': float(max(hi[0] - lo[0], hi[2] - lo[2]) / 2),
                          'credit': 'user-generated (Tripo)'}},
          open('work/usermodels.json', 'w'))
print('-> work/user/model26_lod.glb  %d KB' % (len(glb) // 1024))
