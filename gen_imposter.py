#!/usr/bin/env python3
"""Bake a flat generated panel into a two-triangle alpha-cutout imposter.

A mashrabiya is 22,000 triangles of real lattice and the district wants two
hundred and sixty of them. But it is a *flat* thing: seen from more than a
couple of metres, a quad carrying the panel's own colour with its own holes
punched out of the alpha is indistinguishable from the geometry, at two
triangles instead of twenty-two thousand.

There is no renderer here, so this rasterises the panel itself: an orthographic
z-buffer down the panel's thin axis, barycentric interpolation of the UVs, and
a lookup into the panel's own base colour map. Alpha is simply coverage.
"""
import base64, io, json, struct, sys
import numpy as np
from PIL import Image

SRC = sys.argv[1]
RES = int(sys.argv[2]) if len(sys.argv) > 2 else 768
NAME = sys.argv[3] if len(sys.argv) > 3 else 'panel'
OUT = sys.argv[4] if len(sys.argv) > 4 else 'work/imposter.json'

f = open(SRC, 'rb'); struct.unpack('<III', f.read(12))
jl, _ = struct.unpack('<II', f.read(8)); doc = json.loads(f.read(jl))
bl, _ = struct.unpack('<II', f.read(8)); buf = f.read(bl)


def acc(i):
    a = doc['accessors'][i]; bv = doc['bufferViews'][a['bufferView']]
    nc = {'SCALAR': 1, 'VEC2': 2, 'VEC3': 3, 'VEC4': 4}[a['type']]
    dt = {5120: np.int8, 5121: np.uint8, 5122: np.int16, 5123: np.uint16,
          5125: np.uint32, 5126: np.float32}[a['componentType']]
    off = bv.get('byteOffset', 0) + a.get('byteOffset', 0)
    return np.frombuffer(buf, dtype=dt, count=a['count'] * nc, offset=off).reshape(a['count'], nc)


pr = doc['meshes'][0]['primitives'][0]
pos = acc(pr['attributes']['POSITION']).astype(np.float64)
uv = acc(pr['attributes']['TEXCOORD_0']).astype(np.float64)
idx = acc(pr['indices']).astype(np.int64).reshape(-1, 3)
lo, hi = pos.min(0), pos.max(0)
ext = hi - lo
thin = int(np.argmin(ext))                       # the axis to look down
ax, ay = [k for k in (0, 1, 2) if k != thin]
if ext[ay] < ext[ax]:
    ax, ay = ay, ax
print('panel %.2f x %.2f x %.2f, looking down axis %d' % (ext[0], ext[1], ext[2], thin))

src = doc['materials'][0]['pbrMetallicRoughness']['baseColorTexture']
bvi = doc['bufferViews'][doc['images'][doc['textures'][src['index']]['source']]['bufferView']]
o0 = bvi.get('byteOffset', 0)
tex = np.asarray(Image.open(io.BytesIO(buf[o0:o0 + bvi['byteLength']])).convert('RGB'))
th, tw = tex.shape[:2]

W = RES
H = int(round(RES * ext[ay] / max(ext[ax], 1e-6)))
zbuf = np.full((H, W), -1e30)
out = np.zeros((H, W, 4), np.uint8)

sx = (W - 1) / ext[ax]
sy = (H - 1) / ext[ay]
P = np.stack([(pos[:, ax] - lo[ax]) * sx, (pos[:, ay] - lo[ay]) * sy, pos[:, thin]], 1)

for t in idx:
    a, b, c = P[t[0]], P[t[1]], P[t[2]]
    x0 = max(0, int(np.floor(min(a[0], b[0], c[0])))); x1 = min(W - 1, int(np.ceil(max(a[0], b[0], c[0]))))
    y0 = max(0, int(np.floor(min(a[1], b[1], c[1])))); y1 = min(H - 1, int(np.ceil(max(a[1], b[1], c[1]))))
    if x1 < x0 or y1 < y0:
        continue
    den = (b[1] - c[1]) * (a[0] - c[0]) + (c[0] - b[0]) * (a[1] - c[1])
    if abs(den) < 1e-12:
        continue
    ys, xs = np.mgrid[y0:y1 + 1, x0:x1 + 1]
    w0 = ((b[1] - c[1]) * (xs - c[0]) + (c[0] - b[0]) * (ys - c[1])) / den
    w1 = ((c[1] - a[1]) * (xs - c[0]) + (a[0] - c[0]) * (ys - c[1])) / den
    w2 = 1.0 - w0 - w1
    m = (w0 >= -1e-6) & (w1 >= -1e-6) & (w2 >= -1e-6)
    if not m.any():
        continue
    z = w0 * a[2] + w1 * b[2] + w2 * c[2]
    sel = m & (z > zbuf[y0:y1 + 1, x0:x1 + 1])
    if not sel.any():
        continue
    u = w0 * uv[t[0], 0] + w1 * uv[t[1], 0] + w2 * uv[t[2], 0]
    v = w0 * uv[t[0], 1] + w1 * uv[t[1], 1] + w2 * uv[t[2], 1]
    tu = np.clip((u * tw).astype(int), 0, tw - 1)
    tv = np.clip((v * th).astype(int), 0, th - 1)
    sub = out[y0:y1 + 1, x0:x1 + 1]
    sub[sel, :3] = tex[tv[sel], tu[sel]]
    sub[sel, 3] = 255
    zb = zbuf[y0:y1 + 1, x0:x1 + 1]
    zb[sel] = z[sel]

out = out[::-1]                                   # image space is y-down
cov = (out[:, :, 3] > 0).mean()
print('baked %dx%d, %.1f%% covered' % (W, H, cov * 100))
# bleed the colour into the transparent side so mip-mapping does not fringe
rgb = out[:, :, :3].astype(np.float32)
al = (out[:, :, 3] > 0)
for _ in range(4):
    nb = np.zeros_like(rgb); cnt = np.zeros(al.shape, np.float32)
    for dy, dx in ((1, 0), (-1, 0), (0, 1), (0, -1)):
        r = np.roll(np.roll(rgb, dy, 0), dx, 1); a2 = np.roll(np.roll(al, dy, 0), dx, 1)
        nb += r * a2[..., None]; cnt += a2
    fill = (~al) & (cnt > 0)
    rgb[fill] = nb[fill] / cnt[fill][..., None]
    al = al | fill
out[:, :, :3] = np.clip(rgb, 0, 255).astype(np.uint8)

img = Image.fromarray(out, 'RGBA')
b = io.BytesIO(); img.save(b, 'WEBP', quality=88, method=6)
png = b.getvalue()
print('imposter texture %d KB' % (len(png) // 1024))
json.dump({NAME: {'tex': 'data:image/webp;base64,' + base64.b64encode(png).decode(),
                  'w': float(ext[ax]), 'h': float(ext[ay]), 'd': float(ext[thin]),
                  'credit': 'user-generated panel, baked to an alpha imposter'}},
          open(OUT, 'w'))
Image.fromarray(out, 'RGBA').save('shots/_imposter_%s.png' % NAME)
print('->', OUT)
