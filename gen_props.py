#!/usr/bin/env python3
"""Fetch every generated prop from the release, reduce it, and pack it as an
asset the district can instance.

Meshy returns ~95 MB and two million triangles for a bicycle, with a 4k PBR set.
None of that is wrong — it is just not what a prop seen from two metres in a
scene with a thousand other things in it needs. Each comes down to a few
thousand triangles and a 1k set, and is written straight into dist/assets/props
as a real file, because there is no longer any reason to base64 it into the page.
"""
import io, json, os, struct, subprocess, sys
import numpy as np
from PIL import Image
from scipy.spatial import cKDTree
import fast_simplification

REL = 'https://github.com/anglestrategy/threejsdemo/releases/download/glb/'
OUT = 'dist/assets/props'
TMP = 'work/user/dl.glb'

# file -> (key, triangle budget, texture size, what it is for)
PROPS = [
    ('Meshy_AI_bicycle_3d_0812052922_image-to-3d-texture.glb',        'bicycle',  7000,  1024),
    ('Meshy_AI_wooden_bench_3d_0812052914_image-to-3d-texture.glb',   'benchw',   2600,  1024),
    ('Meshy_AI_trash_recycling_bins__0812052908_image-to-3d-texture.glb', 'bins',   4000,  1024),
    ('Meshy_AI_small_potted_plants_3_0812052829_image-to-3d-texture.glb', 'pots',  2600,  1024),
    ('Meshy_AI_rooftop_hammock_3d_0812052837_image-to-3d-texture.glb', 'hammock',  2600,  1024),
    ('Meshy_AI_ev_charging_station_3_0812052930_image-to-3d-texture.glb', 'evpoint', 2600, 1024),
    ('Meshy_AI_solar_panel_array_3d_0812052938_image-to-3d-texture.glb', 'solar',  900,  1024),
    ('Meshy_AI_vine_trellis_panel_3d_0812052859_image-to-3d-texture.glb', 'trellis', 5000, 1024),
    ('Meshy_AI__0812052843_texture.glb',                              'extra',    16000,  1024),
    # the lagoon set
    ('Meshy_AI_mosque_with_minaret_3_0812054244_image-to-3d-texture.glb',  'mosque',   60000, 2048),
    ('Meshy_AI_arcaded_colonnade_bui_0812054346_image-to-3d-texture.glb',  'arcade',   45000, 2048),
    ('Meshy_AI_majlis_lounge_seating_0812054315_image-to-3d-texture.glb',  'majlisset', 16000, 1024),
    ('Meshy_AI_outdoor_carpet_rug_3d_0812054335_image-to-3d-texture.glb',  'carpet',    4000, 1024),
    ('Meshy_AI_string_light_bunting__0812054217_image-to-3d-texture.glb',  'bunting',   1400, 1024),
    ('Meshy_AI_waterside_shrubs_3d_0812054531_image-to-3d-texture.glb',    'watershrub', 9000, 1024),
    ('Meshy_AI__0812054904_texture.glb',                                   'lagoon_a',  6000, 1024),
    ('Meshy_AI__0812055014_texture.glb',                                   'lagoon_b',  24000, 1024),
]


def read_glb(path):
    f = open(path, 'rb')
    struct.unpack('<III', f.read(12))
    jl, _ = struct.unpack('<II', f.read(8))
    doc = json.loads(f.read(jl))
    bl, _ = struct.unpack('<II', f.read(8))
    return doc, f.read(bl)


def acc(doc, buf, i):
    a = doc['accessors'][i]; bv = doc['bufferViews'][a['bufferView']]
    nc = {'SCALAR': 1, 'VEC2': 2, 'VEC3': 3, 'VEC4': 4}[a['type']]
    dt = {5120: np.int8, 5121: np.uint8, 5122: np.int16, 5123: np.uint16,
          5125: np.uint32, 5126: np.float32}[a['componentType']]
    off = bv.get('byteOffset', 0) + a.get('byteOffset', 0)
    return np.frombuffer(buf, dtype=dt, count=a['count'] * nc, offset=off).reshape(a['count'], nc)


def weld(p, i2, tol):
    """Snap vertices to a tolerance grid and merge them.

    A scanned shrub is a few thousand leaf shells that never touch, and QEM
    cannot collapse an edge that does not exist. Welding on a grid gives the
    shells shared vertices, after which the whole clump decimates as one."""
    keys = np.round(p / tol).astype(np.int64)
    _, first, inv = np.unique(keys, axis=0, return_index=True, return_inverse=True)
    i3 = inv.reshape(-1)[i2]
    ok = (i3[:, 0] != i3[:, 1]) & (i3[:, 1] != i3[:, 2]) & (i3[:, 0] != i3[:, 2])
    return p[first].astype(np.float32), i3[ok].astype(np.uint32)


def build(key, budget, tex, doc, buf):
    pr = doc['meshes'][0]['primitives'][0]
    pos = acc(doc, buf, pr['attributes']['POSITION']).astype(np.float32)
    uv = acc(doc, buf, pr['attributes']['TEXCOORD_0']).astype(np.float32) \
        if 'TEXCOORD_0' in pr['attributes'] else np.zeros((len(pos), 2), np.float32)
    nrm = acc(doc, buf, pr['attributes']['NORMAL']).astype(np.float32) \
        if 'NORMAL' in pr['attributes'] else np.zeros_like(pos)
    idx = acc(doc, buf, pr['indices']).astype(np.uint32).reshape(-1, 3)
    lo, hi = pos.min(0), pos.max(0)
    print('   %d tris, %.2f x %.2f x %.2f m' % (len(idx), *(hi - lo)))
    p, i2 = pos, idx
    # a mesh made of many disconnected shells has a floor it cannot decimate
    # past, and the loop would grind against it forever. When a full pass buys
    # less than 2%, weld and try again — a little coarser each round.
    tol = 0.0
    while len(i2) > budget:
        before = len(i2)
        red = min(0.94, max(0.05, 1.0 - budget / len(i2)))
        p, i2 = fast_simplification.simplify(p, i2.astype(np.uint32), red)
        i2 = i2.reshape(-1, 3)
        if len(i2) > before * 0.98:
            tol = 0.0015 if tol == 0.0 else tol * 2.4
            if tol > 0.06:
                print('   floor at %d tris' % len(i2))
                break
            n0 = len(i2)
            p, i2 = weld(p, i2, tol)
            print('   weld %.4f: %d -> %d tris' % (tol, n0, len(i2)))
    _, near = cKDTree(pos).query(p, workers=-1)
    uv2, nr2 = uv[near], nrm[near]

    mat0 = doc['materials'][0]
    pbr0 = mat0.get('pbrMetallicRoughness', {})
    slots = []

    def slot(name, ref, size, q):
        if not ref:
            return
        src = doc['textures'][ref['index']]['source']
        bv = doc['bufferViews'][doc['images'][src]['bufferView']]
        o0 = bv.get('byteOffset', 0)
        im = Image.open(io.BytesIO(buf[o0:o0 + bv['byteLength']])).convert('RGB')
        im = im.resize((size, size), Image.LANCZOS)
        b = io.BytesIO(); im.save(b, 'WEBP', quality=q, method=6)
        slots.append((name, b.getvalue()))
    slot('base', pbr0.get('baseColorTexture'), tex, 92)
    slot('mr', pbr0.get('metallicRoughnessTexture'), tex // 2, 88)
    slot('normal', mat0.get('normalTexture'), tex // 2, 93)

    bins, views, accs = bytearray(), [], []

    def push(a, t=None):
        off = len(bins); r = a.tobytes(); bins.extend(r)
        while len(bins) % 4:
            bins.append(0)
        v = {'buffer': 0, 'byteOffset': off, 'byteLength': len(r)}
        if t:
            v['target'] = t
        views.append(v); return len(views) - 1

    vp = push(p.astype(np.float32), 34962); vn = push(nr2.astype(np.float32), 34962)
    vu = push(uv2.astype(np.float32), 34962)
    small = len(p) <= 65535
    vi = push(i2.reshape(-1).astype(np.uint16 if small else np.uint32), 34963)
    tv = [(nm, push(np.frombuffer(t, np.uint8))) for nm, t in slots]
    accs = [
        {'bufferView': vp, 'componentType': 5126, 'count': len(p), 'type': 'VEC3',
         'min': p.min(0).tolist(), 'max': p.max(0).tolist()},
        {'bufferView': vn, 'componentType': 5126, 'count': len(nr2), 'type': 'VEC3'},
        {'bufferView': vu, 'componentType': 5126, 'count': len(uv2), 'type': 'VEC2'},
        {'bufferView': vi, 'componentType': 5123 if small else 5125, 'count': i2.size, 'type': 'SCALAR'},
    ]
    ix = {nm: n for n, (nm, _) in enumerate(tv)}
    M = {'name': key, 'doubleSided': True,
         'pbrMetallicRoughness': {'metallicFactor': 0.0, 'roughnessFactor': 0.9}}
    if 'base' in ix:
        M['pbrMetallicRoughness']['baseColorTexture'] = {'index': ix['base']}
    if 'mr' in ix:
        M['pbrMetallicRoughness']['metallicRoughnessTexture'] = {'index': ix['mr']}
        M['pbrMetallicRoughness'].pop('roughnessFactor', None)
        M['pbrMetallicRoughness'].pop('metallicFactor', None)
    if 'normal' in ix:
        M['normalTexture'] = {'index': ix['normal']}
    out = {'asset': {'version': '2.0', 'generator': 'gen_props.py'},
           'scene': 0, 'scenes': [{'nodes': [0]}], 'nodes': [{'mesh': 0, 'name': 'LOD0'}],
           'meshes': [{'primitives': [{'attributes': {'POSITION': 0, 'NORMAL': 1, 'TEXCOORD_0': 2},
                                       'indices': 3, 'material': 0}]}],
           'materials': [M],
           'textures': [{'sampler': 0, 'source': n} for n in range(len(tv))],
           'images': [{'mimeType': 'image/webp', 'bufferView': v} for _, v in tv],
           'samplers': [{'magFilter': 9729, 'minFilter': 9987, 'wrapS': 10497, 'wrapT': 10497}],
           'accessors': accs, 'bufferViews': views, 'buffers': [{'byteLength': len(bins)}]}
    js = json.dumps(out, separators=(',', ':')).encode()
    while len(js) % 4:
        js += b' '
    glb = (struct.pack('<III', 0x46546C67, 2, 12 + 8 + len(js) + 8 + len(bins))
           + struct.pack('<II', len(js), 0x4E4F534A) + js
           + struct.pack('<II', len(bins), 0x004E4942) + bytes(bins))
    os.makedirs(OUT, exist_ok=True)
    open(os.path.join(OUT, key + '.glb'), 'wb').write(glb)
    return {'file': 'assets/props/%s.glb' % key, 'tris': int(len(i2)),
            'w': float(hi[0] - lo[0]), 'height': float(hi[1] - lo[1]),
            'depth': float(hi[2] - lo[2]), 'base': float(lo[1]),
            'kb': len(glb) // 1024}


index = {}
if os.path.exists('work/props.json'):
    index = json.load(open('work/props.json'))
for fn, key, budget, tex in PROPS:
    if key in index and os.path.exists(os.path.join(OUT, key + '.glb')):
        print('==', key, '(cached)'); continue
    print('==', key)
    r = subprocess.run(['curl', '-sSL', '-o', TMP, REL + fn], capture_output=True)
    if r.returncode != 0 or not os.path.exists(TMP):
        print('   fetch failed'); continue
    try:
        doc, buf = read_glb(TMP)
        index[key] = build(key, budget, tex, doc, buf)
        print('   -> %d tris, %d KB' % (index[key]['tris'], index[key]['kb']))
    except Exception as e:
        import traceback; traceback.print_exc()
    finally:
        if os.path.exists(TMP):
            os.remove(TMP)
json.dump(index, open('work/props.json', 'w'), indent=1)
print('props: %d, %d KB total' % (len(index), sum(v['kb'] for v in index.values())))
