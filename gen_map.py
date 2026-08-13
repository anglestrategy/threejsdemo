#!/usr/bin/env python3
"""Regenerate the MAP constant from Natural Earth 10m admin-0.

Projection: plate carree with a cos(mid-lat) x-scale, W normalised to 1000.
Emits {d, W, H, pts} exactly as the original plus `k`, a per-vertex coast
classification (0 inland border, 1 Red Sea, 2 Arabian Gulf) derived from the
real distance to neighbouring countries rather than from a bbox heuristic.
"""
import json
import math
import sys

NE = 'work/ne10.geojson'
data = json.load(open(NE))

sau = None
others = []
for f in data['features']:
    p = f['properties']
    g = f['geometry']
    polys = g['coordinates'] if g['type'] == 'MultiPolygon' else [g['coordinates']]
    if p.get('ADM0_A3') == 'SAU':
        sau = max(polys, key=lambda poly: len(poly[0]))[0]
    else:
        # only neighbours matter; keep anything inside a generous Arabia box
        for poly in polys:
            ring = poly[0]
            lo = min(x for x, y in ring); hi = max(x for x, y in ring)
            la = min(y for x, y in ring); lb = max(y for x, y in ring)
            if hi < 30 or lo > 62 or lb < 10 or la > 38:
                continue
            others.append((p.get('NAME'), ring))

assert sau, 'Saudi Arabia not found'
if sau[0] == sau[-1]:
    sau = sau[:-1]
print('mainland ring', len(sau), 'neighbour rings', len(others))


# ---------------------------------------------------------------- simplify
def dp(pts, eps):
    """Douglas-Peucker on an open polyline."""
    if len(pts) < 3:
        return pts
    keep = [False] * len(pts)
    keep[0] = keep[-1] = True
    stack = [(0, len(pts) - 1)]
    while stack:
        a, b = stack.pop()
        ax, ay = pts[a]; bx, by = pts[b]
        dx, dy = bx - ax, by - ay
        l2 = dx * dx + dy * dy
        best, bi = -1.0, -1
        for i in range(a + 1, b):
            px, py = pts[i]
            if l2 == 0:
                d = math.hypot(px - ax, py - ay)
            else:
                t = max(0.0, min(1.0, ((px - ax) * dx + (py - ay) * dy) / l2))
                d = math.hypot(px - ax - t * dx, py - ay - t * dy)
            if d > best:
                best, bi = d, i
        if best > eps:
            keep[bi] = True
            stack.append((a, bi)); stack.append((bi, b))
    return [p for p, k in zip(pts, keep) if k]


TARGET = 470
lo, hi = 0.0002, 0.6
for _ in range(64):
    eps = (lo + hi) / 2
    # split the closed ring at its westernmost point so DP sees an open line
    iw = min(range(len(sau)), key=lambda i: sau[i][0])
    rot = sau[iw:] + sau[:iw]
    simp = dp(rot + [rot[0]], eps)[:-1]
    if len(simp) > TARGET:
        lo = eps
    else:
        hi = eps
print('simplified to', len(simp), 'eps=%.5f deg (~%.1f km)' % (eps, eps * 111))

lons = [p[0] for p in simp]; lats = [p[1] for p in simp]
LON0, LON1 = min(lons), max(lons)
LAT0, LAT1 = max(lats), min(lats)      # LAT0 = north
MIDLAT = (LAT0 + LAT1) / 2
KX = math.cos(math.radians(MIDLAT))
print('bbox lon %.3f..%.3f  lat %.3f..%.3f  midlat %.2f  kx %.4f'
      % (LON0, LON1, LAT1, LAT0, MIDLAT, KX))

W = 1000.0
SX = W / ((LON1 - LON0) * KX)
H = (LAT0 - LAT1) * SX
print('W %.1f  H %.1f  scale %.3f plane-units/deg' % (W, H, SX))


def proj(lon, lat):
    return ((lon - LON0) * KX * SX, (LAT0 - lat) * SX)


# --------------------------------------------------- coast classification
def seg_dist2(px, py, ax, ay, bx, by):
    dx, dy = bx - ax, by - ay
    l2 = dx * dx + dy * dy
    t = 0.0 if l2 == 0 else max(0.0, min(1.0, ((px - ax) * dx + (py - ay) * dy) / l2))
    qx, qy = ax + t * dx, ay + t * dy
    return (px - qx) ** 2 + (py - qy) ** 2


# bucket every neighbour segment on a 0.5-degree grid for a fast nearest query
CELL = 0.5
buckets = {}
for name, ring in others:
    for i in range(len(ring) - 1):
        ax, ay = ring[i][:2]; bx, by = ring[i + 1][:2]
        x0 = int(min(ax, bx) / CELL) - 1; x1 = int(max(ax, bx) / CELL) + 1
        y0 = int(min(ay, by) / CELL) - 1; y1 = int(max(ay, by) / CELL) + 1
        for gx in range(x0, x1 + 1):
            for gy in range(y0, y1 + 1):
                buckets.setdefault((gx, gy), []).append((ax, ay, bx, by))

NEAR = 0.09          # deg ~10 km: closer than this to another country = land border


def is_coast(lon, lat):
    gx, gy = int(lon / CELL), int(lat / CELL)
    best = 1e9
    for dx in (-1, 0, 1):
        for dy in (-1, 0, 1):
            for s in buckets.get((gx + dx, gy + dy), ()):
                best = min(best, seg_dist2(lon, lat, *s))
                if best < NEAR * NEAR:
                    return False
    return best > NEAR * NEAR


kinds = []
for lon, lat in simp:
    if not is_coast(lon, lat):
        kinds.append(0)
    elif lon < 45.0:
        kinds.append(1)                  # Red Sea + Gulf of Aqaba
    else:
        kinds.append(2)                  # Arabian Gulf
print('coast vertices  red=%d gulf=%d inland=%d'
      % (kinds.count(1), kinds.count(2), kinds.count(0)))

# ------------------------------------------------------------------ cities
CITIES = [
    ('Al Khobar',       26.2794, 50.2083, 1),
    ('Madinah',         24.4686, 39.6142, 1),
    ('Al Ahsa',         25.3647, 49.5686, 0),
    ('Buraydah',        26.3260, 43.9750, 0),
    ('Hail',            27.5236, 41.6957, 0),
    ('Taif',            21.2751, 40.4158, 0),
    ('Arar',            30.9753, 41.0381, 0),
    ('Dumat Al Jandal', 29.8117, 39.8683, 0),
    ('Tabuk',           28.3838, 36.5550, 0),
    ('Al Baha',         20.0129, 41.4677, 0),
    ('Jizan',           16.8892, 42.5511, 0),
    ('Najran',          17.4917, 44.1322, 0),
]

pts = []
for name, lat, lon, lit in CITIES:
    x, y = proj(lon, lat)
    pts.append({'name': name, 'x': round(x, 1), 'y': round(y, 1), 'lit': lit,
                'lon': lon, 'lat': lat})

d = 'M' + 'L'.join('%.1f,%.1f' % proj(lon, lat) for lon, lat in simp) + 'Z'
MAP = {'d': d, 'W': round(W, 1), 'H': round(H, 1),
       'pts': [{k: v for k, v in p.items() if k != 'lon' and k != 'lat'} for p in pts],
       'k': ''.join(str(k) for k in kinds),
       'geo': {'lon0': round(LON0, 6), 'lat0': round(LAT0, 6),
               'kx': round(KX, 6), 'sx': round(SX, 6)}}

out = 'const MAP = ' + json.dumps(MAP, separators=(',', ':')) + ';'
open('work/map_const.js', 'w').write(out)
print('MAP constant %d chars -> work/map_const.js' % len(out))
for p in pts:
    print('   %-16s %7.1f %7.1f   (%.4fN %.4fE)' % (p['name'], p['x'], p['y'], p['lat'], p['lon']))

# sanity: some known landmarks in plane space, for the terrain author
for nm, lat, lon in [('Riyadh', 24.71, 46.68), ('Jeddah', 21.49, 39.19),
                     ('Abha', 18.22, 42.51), ('Dammam', 26.43, 50.11),
                     ('Qatar tip', 26.15, 51.20), ('Nafud c.', 28.4, 41.0),
                     ('RubAlKhali c.', 19.5, 50.0), ('Aqaba', 29.4, 34.95)]:
    x, y = proj(lon, lat)
    print('   ~%-14s %7.1f %7.1f' % (nm, x, y))
