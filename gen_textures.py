#!/usr/bin/env python3
"""Pack the CC0 detail textures the district samples for photographic micro
detail. Source: Poly Haven (CC0). Two families only — a weathered plaster that
carries pores, cracks and staining for every mineral surface, and a plank set
for timber. Each becomes a 512 diffuse and a 512 map with the normal in RG and
roughness in B, so the whole pack is four samplers.

The procedural surface law still owns the meso band (coursing, brick beds,
flag joints) because that has to line up with the architecture. These carry
the band below it, which is the one procedural noise cannot fake.
"""
import base64
import io
import json
import os

from PIL import Image

SRC = 'work/tex'
OUT = {}
SIZE = 2048


def load(name, suffix):
    # 2k source where it exists, 1k otherwise
    for res in ('2k', '1k'):
        p2 = os.path.join(SRC, '%s_%s_%s.jpg' % (name, suffix, res))
        if os.path.exists(p2):
            return Image.open(p2)
    raise FileNotFoundError(name + ' ' + suffix)


def pack(key, name, diff_q=92, nrm_q=95):
    d = load(name, 'diff').convert('RGB').resize((SIZE, SIZE), Image.LANCZOS)
    nrm = load(name, 'nor_gl').convert('RGB').resize((SIZE, SIZE), Image.LANCZOS)
    a = load(name, 'arm').convert('RGB').resize((SIZE, SIZE), Image.LANCZOS)
    nr, ng, _ = nrm.split()
    _, ar, _ = a.split()
    packed = Image.merge('RGB', (nr, ng, ar))

    px = d.load()
    tot = 0.0
    cnt = 0
    for y in range(0, SIZE, 4):
        for x in range(0, SIZE, 4):
            for c in px[x, y]:
                v = c / 255.0
                tot += v / 12.92 if v <= 0.04045 else ((v + 0.055) / 1.055) ** 2.4
            cnt += 3
    mean = tot / cnt

    bd, bn = io.BytesIO(), io.BytesIO()
    d.save(bd, 'WEBP', quality=diff_q, method=6)
    packed.save(bn, 'WEBP', quality=nrm_q, method=6)
    OUT[key] = {
        'diff': 'data:image/webp;base64,' + base64.b64encode(bd.getvalue()).decode(),
        'nrm': 'data:image/webp;base64,' + base64.b64encode(bn.getvalue()).decode(),
        'mean': round(mean, 4),
        'credit': name + ' (Poly Haven, CC0)',
    }
    print('%-8s %-22s diff %6d B  nrm %6d B  mean %.3f'
          % (key, name, len(bd.getvalue()), len(bn.getvalue()), mean))


pack('stone', 'clay_plaster')
pack('timber', 'dark_wooden_planks')

json.dump(OUT, open('work/textures.json', 'w'))
total = sum(len(v['diff']) + len(v['nrm']) for v in OUT.values())
print('pack %d KB of base64' % (total // 1024))
