#!/usr/bin/env python3
"""Bake a real elevation grid for the Kingdom into the plane projection.

Source: public terrarium DEM tiles (z=7, ~1.2 km/px) already in work/dem/.
Output: work/relief.json  { nx, ny, x0, y0, x1, y1, max, png }  where png is a
grayscale data-URI whose red channel is height / max, sqrt-companded.
Also writes refs/ksa_relief_reference.png — the truth image the rendered map
is judged against in the map-truth check.
"""
import base64
import io
import json
import math
import os

from PIL import Image

Z = 7
X0, X1, Y0, Y1 = 76, 83, 51, 58
N = 256
W_ = (X1 - X0 + 1) * N
H_ = (Y1 - Y0 + 1) * N
big = Image.new('RGB', (W_, H_))
for tx in range(X0, X1 + 1):
    for ty in range(Y0, Y1 + 1):
        im = Image.open('work/dem/%d_%d.png' % (tx, ty)).convert('RGB')
        big.paste(im, ((tx - X0) * N, (ty - Y0) * N))
px = big.load()


def tile_lonlat_to_px(lon, lat):
    n = 2 ** Z
    x = (lon + 180.0) / 360.0 * n
    lr = math.radians(lat)
    y = (1.0 - math.asinh(math.tan(lr)) / math.pi) / 2.0 * n
    return (x - X0) * N, (y - Y0) * N


def elev_at(lon, lat):
    fx, fy = tile_lonlat_to_px(lon, lat)
    fx = min(max(fx, 0), W_ - 1.001); fy = min(max(fy, 0), H_ - 1.001)
    x0, y0 = int(fx), int(fy)
    tx, ty = fx - x0, fy - y0
    def h(x, y):
        r, g, b = px[x, y]
        return r * 256 + g + b / 256.0 - 32768.0
    a = h(x0, y0) * (1 - tx) + h(x0 + 1, y0) * tx
    c = h(x0, y0 + 1) * (1 - tx) + h(x0 + 1, y0 + 1) * tx
    return a * (1 - ty) + c * ty


MAP = json.loads(open('work/map_const.js').read()[len('const MAP = '):-1])
G = MAP['geo']
W, H = MAP['W'], MAP['H']
PAD = 190          # matches the SDF pad in the app


def px2lon(x): return x / (G['kx'] * G['sx']) + G['lon0']
def py2lat(y): return G['lat0'] - y / G['sx']


NX, NY = 760, 638
x0, y0, x1, y1 = -PAD, -PAD, W + PAD, H + PAD
MAXH = 3200.0
grid = []
for j in range(NY):
    row = []
    py = y0 + (y1 - y0) * j / (NY - 1)
    for i in range(NX):
        pxx = x0 + (x1 - x0) * i / (NX - 1)
        e = elev_at(px2lon(pxx), py2lat(py))
        row.append(max(0.0, min(MAXH, e)))
    grid.append(row)
print('sampled %dx%d  spacing %.2f plane units (%.1f km)'
      % (NX, NY, (x1 - x0) / NX, (x1 - x0) / NX / G['sx'] * 111))

img = Image.new('L', (NX, NY))
ip = img.load()
for j in range(NY):
    for i in range(NX):
        ip[i, j] = int(round(math.sqrt(grid[j][i] / MAXH) * 255))
buf = io.BytesIO()
img.save(buf, format='PNG', optimize=True)
raw = buf.getvalue()
print('PNG %d bytes -> base64 %d KB' % (len(raw), len(base64.b64encode(raw)) // 1024))

out = {'nx': NX, 'ny': NY, 'x0': x0, 'y0': y0, 'x1': x1, 'y1': y1, 'max': MAXH,
       'png': 'data:image/png;base64,' + base64.b64encode(raw).decode('ascii')}
json.dump(out, open('work/relief.json', 'w'))

# ------------------------------------------------- reference relief image
import re
ring = [(float(a), float(b)) for a, b in re.findall(r'([-\d.]+),([-\d.]+)', MAP['d'])]
RW, RH = 1000, int(round(H))
ref = Image.new('RGB', (RW, RH), (10, 16, 28))
rp = ref.load()
SUN = (-0.86, -0.30)          # matches the app's sun azimuth in plane space


def gh(i, j):
    return grid[min(max(j, 0), NY - 1)][min(max(i, 0), NX - 1)]


def inside(x, y):
    c = False
    n = len(ring)
    j = n - 1
    for i in range(n):
        xi, yi = ring[i]; xj, yj = ring[j]
        if (yi > y) != (yj > y) and x < (xj - xi) * (y - yi) / (yj - yi) + xi:
            c = not c
        j = i
    return c


sx = (x1 - x0) / (NX - 1); sy = (y1 - y0) / (NY - 1)
for py_ in range(RH):
    for pxx in range(RW):
        gi = (pxx - x0) / sx; gj = (py_ - y0) / sy
        i, j = int(gi), int(gj)
        e = gh(i, j)
        dzdx = (gh(i + 1, j) - gh(i - 1, j)) / (2 * sx / G['sx'] * 111000)
        dzdy = (gh(i, j + 1) - gh(i, j - 1)) / (2 * sy / G['sx'] * 111000)
        sh = max(0.0, min(1.0, 0.52 + 4.6 * (-dzdx * SUN[0] - dzdy * SUN[1])))
        t = min(1.0, e / 2400.0)
        r = 74 + 150 * t ** 0.6; g = 62 + 120 * t ** 0.75; b = 48 + 76 * t
        if e < 5:
            r, g, b = 22, 40, 66
            sh = 1.0
        if not inside(pxx, py_):
            r, g, b = (r * 0.20 + 14, g * 0.20 + 22, b * 0.20 + 36)
            sh = 1.0
        rp[pxx, py_] = (int(min(255, r * sh)), int(min(255, g * sh)), int(min(255, b * sh)))
os.makedirs('refs', exist_ok=True)
ref.save('refs/ksa_relief_reference.png')
print('reference relief -> refs/ksa_relief_reference.png')

for nm, lat, lon in [('Abha/Sawda', 18.27, 42.37), ('Taif', 21.28, 40.42),
                     ('Madinah', 24.47, 39.61), ('Riyadh', 24.71, 46.68),
                     ('Al Khobar', 26.28, 50.21), ('Hail', 27.52, 41.70),
                     ('Tabuk', 28.38, 36.56), ('Buraydah', 26.33, 43.97),
                     ('Jizan', 16.89, 42.55), ('Najran', 17.49, 44.13),
                     ('Nafud centre', 28.4, 41.0), ('Rub al Khali', 19.5, 50.0),
                     ('Tuwaiq crest', 24.55, 46.05), ('Al Baha', 20.01, 41.47),
                     ('Arar', 30.98, 41.04), ('Dumat', 29.81, 39.87),
                     ('Al Ahsa', 25.36, 49.57)]:
    print('   %-14s %6.0f m' % (nm, elev_at(lon, lat)))
