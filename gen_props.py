#!/usr/bin/env python3
"""Intake for the client-supplied GLBs: fetch, reduce, compress, inventory.

WHY THIS WAS REWRITTEN
----------------------
The first version rolled its own decimator: `fast_simplification` for the
triangles, then a cKDTree lookup that gave every surviving vertex the UV of
the nearest *original* vertex. That is wrong, and it is wrong in the worst
possible way — quadric simplification MOVES vertices to optimal positions, so
after a heavy reduction almost no surviving vertex sits where an original one
did, and every one of them took its texel from somewhere else on the sheet.
The tram came back with its window frames smeared across the bodywork. It was
not the triangle count and it was not the texture size — 30 k triangles is
plenty for a tram. It was that the texture had been shuffled.

The fix is to stop hand-rolling it. gltf-transform's `simplify` is
meshoptimizer, which is attribute-aware: it respects UV seams, it never
invents a texture coordinate, and it stops early rather than exceed an error
bound. Every other step is its own tool too —

    weld       merge the split vertices Meshy emits, or the simplifier has
               nothing it is allowed to collapse
    simplify   meshoptimizer, to a per-asset triangle budget
    resize     textures to a per-asset size, not one global ceiling
    webp       q92, visually lossless at these sizes
    meshopt    vertex and index compression, so full-quality assets still
               arrive over the wire at a sane size

BUDGETS
-------
Set from what the asset is and how many of them the plan places, not from a
file-size ceiling — that ceiling is gone. One mosque can afford 400 k
triangles. A solar panel the roofscape puts down 750 times cannot afford a
hundredth of that, and does not need it: it is four flat rectangles.
"""
import json
import os
import struct
import subprocess
import sys

from preweld import preweld

REL = 'https://github.com/anglestrategy/threejsdemo/releases/download/glb/'
ZIP = REL + 'glbs.zip'
OUT = 'dist/assets/props'
TMP = 'work/user'

# more than one archive now: each index entry remembers which zip it came from
ZIPS = {'work/zipindex.json': ZIP,
        'work/zipindex2.json': REL + 'Archive.2.zip',
        'work/zipindex3.json': REL + 'Archive.3.zip'}
ZIDX = {}
for idxf, url in ZIPS.items():
    if os.path.exists(idxf):
        for e in json.load(open(idxf)):
            e['zip'] = url
            ZIDX[e['name']] = e

# (source file, key, triangle budget, texture px, second-LOD budget or 0)
PROPS = [
    # --- heroes: a handful of instances each, so they get real budgets
    ('Meshy_AI_mosque_with_minaret_3_0812054244_image-to-3d-texture.glb',  'mosque',    400000, 4096, 0),
    ('Meshy_AI_arcaded_colonnade_bui_0812054346_image-to-3d-texture.glb',  'arcade',    260000, 4096, 26000),
    ('Meshy_AI_golden_canopy_pavilio_0812060405_image-to-3d-texture.glb',  'canopypav', 220000, 4096, 0),
    ('Meshy_AI_light_rail_tram_3d_0812060436_image-to-3d-texture.glb',     'tram',      240000, 4096, 0),
    ('Meshy_AI_blue_roofed_building__0812060516_image-to-3d-texture.glb',  'bluehall',  240000, 4096, 24000),
    ('Meshy_AI_arcade_shophouse_row__0812060413_image-to-3d-texture.glb',  'shophouse', 200000, 4096, 20000),
    ('Meshy_AI_residential_apartment_0812060442_image-to-3d-texture.glb',  'resblock',  150000, 2048, 15000),
    ('Meshy_AI_roundabout_fountain_p_0812060423_image-to-3d-texture.glb',  'fountain',  120000, 2048, 0),
    ('Meshy_AI_roundabout_obelisk_mo_0812060524_image-to-3d-texture.glb',  'obelisk',    60000, 2048, 0),
    ('Meshy_AI_tram_stop_shelter_3d_0812060457_image-to-3d-texture.glb',   'tramstop',   90000, 2048, 0),
    ('Meshy_AI_small_kiosk_booth_3d_0812060504_image-to-3d-texture.glb',   'kiosk',      60000, 2048, 0),
    # --- near-field props: tens of instances, seen from two metres
    ('Meshy_AI_bicycle_3d_0812052922_image-to-3d-texture.glb',             'bicycle',    45000, 2048, 5000),
    ('Meshy_AI_wooden_bench_3d_0812052914_image-to-3d-texture.glb',        'benchw',     28000, 2048, 3000),
    ('Meshy_AI_trash_recycling_bins__0812052908_image-to-3d-texture.glb',  'bins',       26000, 2048, 3000),
    ('Meshy_AI_small_potted_plants_3_0812052829_image-to-3d-texture.glb',  'pots',       70000, 2048, 3000),
    ('Meshy_AI_rooftop_hammock_3d_0812052837_image-to-3d-texture.glb',     'hammock',    22000, 2048, 2600),
    ('Meshy_AI_ev_charging_station_3_0812052930_image-to-3d-texture.glb',  'evpoint',    24000, 2048, 2600),
    ('Meshy_AI_vine_trellis_panel_3d_0812052859_image-to-3d-texture.glb',  'trellis',    90000, 2048, 4000),
    ('Meshy_AI_waterside_shrubs_3d_0812054531_image-to-3d-texture.glb',    'watershrub', 260000, 2048, 5000),
    ('Meshy_AI_outdoor_carpet_rug_3d_0812054335_image-to-3d-texture.glb',  'carpet',     12000, 2048, 0),
    ('Meshy_AI_string_light_bunting__0812054217_image-to-3d-texture.glb',  'bunting',    12000, 1024, 1600),
    ('Meshy_AI_single_shade_sail_3d_0812060450_image-to-3d-texture.glb',   'sail1',      20000, 2048, 2200),
    ('Meshy_AI_street_bench_3d_0812060429_image-to-3d-texture.glb',        'bench2',     20000, 2048, 2400),
    ('Meshy_AI_majlis_lounge_seating_0812054315_image-to-3d-texture.glb',  'majlisset',  120000, 2048, 6000),
    ('Meshy_AI_palm_tree_masterplan__0812060509_image-to-3d-texture.glb',  'palm2',       40000, 2048, 6000),
    # --- the solar array goes down 750 times: the one budget here set by
    #     arithmetic rather than by how it looks from two metres
    ('Meshy_AI_solar_panel_array_3d_0812052938_image-to-3d-texture.glb',   'solar',       2600, 1024, 700),
    # --- the lagoon set
    ('Meshy_AI__0812054904_texture.glb',                                   'lagoon_a',  150000, 2048, 5000),
    ('Meshy_AI__0812055014_texture.glb',                                   'lagoon_b',  150000, 2048, 8000),
    ('Meshy_AI__0812052843_texture.glb',                                   'extra',     120000, 2048, 6000),
    # --- people: the largest remaining delta in the whole build
    ('models_of_people_x_10_00.glb',                                       'people10',  160000, 4096, 18000),
    ('sitting_people_x_5_11.glb',                                          'people5s',  100000, 4096, 12000),
    # --- the two that were sitting in the release unprocessed. The golden-hour
    #     scene is a furnished interior: the district's shops and majlis are
    #     dressed from a hand-built kit, and this is the first real furniture
    #     in the build.
    ('goldenhourscene_nhp.glb',                                            'ghscene',   400000, 4096, 40000),
    ('model.26.glb',                                                       'diorama',   300000, 4096, 30000),
    # --- street infrastructure. This is the layer that was still hand-built
    #     boxes after the buildings stopped being: every lamppost, bollard and
    #     gully in the district, and the signals it never had at all.
    ('Meshy_AI_street_lamppost_3d_0812130902_image-to-3d-texture.glb',      'lamppost',   36000, 2048, 3600),
    ('Meshy_AI_bollard_traffic_post__0812130956_image-to-3d-texture.glb',   'bollard2',   14000, 2048, 1600),
    ('Meshy_AI_manhole_drain_grate_3_0812130756_image-to-3d-texture.glb',   'grate',       3000, 2048, 500),
    ('Meshy_AI_traffic_signal_pole_3_0812130857_image-to-3d-texture.glb',   'tsignal',    30000, 2048, 3000),
    ('Meshy_AI_pedestrian_signal_pol_0812130836_image-to-3d-texture.glb',   'psignal',    24000, 2048, 2600),
    ('Meshy_AI_curb_gutter_edge_3d_0812130913_image-to-3d-texture.glb',     'kerb',       14000, 2048, 1600),
    ('Meshy_AI_sidewalk_paver_segmen_0812130848_image-to-3d-texture.glb',   'walkseg',     6000, 2048, 900),
    ('Meshy_AI_straight_road_segment_0812130817_image-to-3d-texture.glb',   'roadseg',    24000, 2048, 2600),
    ('Meshy_AI_road_intersection_seg_0812130807_image-to-3d-texture.glb',   'roadx',      36000, 2048, 3600),
    # --- the final batch. Sustainability kit, which is the one theme in the
    #     four SDC renders the district was carrying only as a solar array:
    #     a wind tower, PV over the planters and over a heritage roof, an
    #     electric shuttle. Plus the soft landscape the plaza was short of —
    #     tiered planters, deck benches, market stalls, and a palm that comes
    #     with its own base rather than needing one built under it.
    ('Meshy_AI_solar_wind_tower_3d_0812151559_image-to-3d-texture.glb',    'windtower', 140000, 4096, 14000),
    ('Meshy_AI_solar_roofed_heritage_0812151635_image-to-3d-texture.glb',  'heritage',  240000, 4096, 24000),
    ('Meshy_AI_electric_shuttle_vehi_0812151632_image-to-3d-texture.glb',  'shuttle',   130000, 4096, 13000),
    ('Meshy_AI_market_stall_canopy_3_0812151557_image-to-3d-texture.glb',  'stall',      70000, 2048, 7000),
    ('Meshy_AI_tiered_planter_cluste_0812151630_image-to-3d-texture.glb',  'planters',   70000, 2048, 7000),
    ('Meshy_AI_solar_panel_planter_b_0812151606_image-to-3d-texture.glb',  'pvplanter',  50000, 2048, 5000),
    ('Meshy_AI_wooden_deck_bench_pla_0812151613_image-to-3d-texture.glb',  'deckbench',  34000, 2048, 3600),
    # a scanned palm with its own base: the base is why this gets a budget
    # closer to palm2's than a bench's — the frond crown is most of the mesh
    ('Meshy_AI_palm_tree_on_base_3d_0812151615_image-to-3d-texture.glb',   'palmbase',   60000, 2048, 7000),
]


def rng(url, a, b):
    return subprocess.run(['curl', '-sSL', '-H', 'Range: bytes=%d-%d' % (a, b), url],
                          capture_output=True).stdout


def zfetch(member, dest):
    """Pull one member out of the 706 MB zip with two range requests."""
    import zlib
    e = ZIDX.get(member)
    if not e:
        return False
    zurl = e.get('zip', ZIP)
    lh = rng(zurl, e['lho'], e['lho'] + 29)
    if lh[:4] != b'PK\x03\x04':
        return False
    nl, el = struct.unpack('<HH', lh[26:30])
    off = e['lho'] + 30 + nl + el
    raw = rng(zurl, off, off + e['csize'] - 1)
    if len(raw) < e['csize']:
        return False
    open(dest, 'wb').write(zlib.decompress(raw, -15) if e['method'] == 8 else raw)
    return True


def glb_json(path):
    """Read only a GLB's JSON chunk — the binary may be a hundred megabytes."""
    with open(path, 'rb') as f:
        f.read(12)
        jl, _ = struct.unpack('<II', f.read(8))
        return json.loads(f.read(jl))


def tri_count(doc):
    n = 0
    for m in doc.get('meshes', []):
        for pr in m.get('primitives', []):
            if 'indices' in pr:
                n += doc['accessors'][pr['indices']]['count'] // 3
            elif 'POSITION' in pr.get('attributes', {}):
                n += doc['accessors'][pr['attributes']['POSITION']]['count'] // 3
    return n


def bounds(doc):
    lo, hi = [1e9] * 3, [-1e9] * 3
    for m in doc.get('meshes', []):
        for pr in m.get('primitives', []):
            a = doc['accessors'][pr['attributes']['POSITION']]
            if 'min' not in a:
                continue
            for i in range(3):
                lo[i] = min(lo[i], a['min'][i])
                hi[i] = max(hi[i], a['max'][i])
    return lo, hi


def gt(*args):
    r = subprocess.run(['gltf-transform'] + list(args), capture_output=True, text=True)
    if r.returncode != 0:
        sys.stderr.write((r.stderr or r.stdout)[-1200:])
        raise RuntimeError('gltf-transform ' + args[0] + ' failed')


WELD = {   # key -> (near tolerance, far tolerance) on the 2 m normalised box
    'watershrub': (0.004, 0.030), 'palm2': (0.004, 0.026),
    'lagoon_a': (0.003, 0.022), 'lagoon_b': (0.003, 0.022),
    'extra': (0.003, 0.020), 'majlisset': (0.002, 0.016),
    'trellis': (0.003, 0.020), 'pots': (0.002, 0.016),
    'solar': (0.002, 0.014), 'walkseg': (0.003, 0.020), 'kerb': (0.003, 0.018),
    'grate': (0.002, 0.016), 'roadseg': (0.003, 0.020),
    # final batch: the same rule as the rest — anything scanned with
    #    disconnected leaf or slat shells needs a tolerance weld before the
    #    simplifier has an edge it can collapse. Planters and palms are foliage;
    #    the PV arrays are hundreds of separate panel shells. 
    'planters': (0.003, 0.022), 'palmbase': (0.004, 0.026),
    'pvplanter': (0.002, 0.016), 'stall': (0.002, 0.016),
    'deckbench': (0.002, 0.014), 'windtower': (0.002, 0.016),
}


def reduce_to(src, dst, budget, tex, src_tris, tol=0.0):
    """weld -> simplify -> resize -> webp -> meshopt, in that order.

    Order matters. Welding first is what gives the simplifier edges it is
    allowed to collapse; resizing before compressing means the compressor is
    not spending bits on texels about to be thrown away.
    """
    a, b = TMP + '/_a.glb', TMP + '/_b.glb'
    if tol > 0:
        # snap coincident vertices onto a grid first, or the simplifier has no
        # edges it is allowed to collapse at all (see preweld.py)
        n0, n1 = preweld(src, a, tol)
        print('   preweld %.4f: %d -> %d tris' % (tol, n0, n1), flush=True)
        src, a = a, TMP + '/_c.glb'
        # the ratio is a fraction of what actually enters the simplifier. The
        # coarse weld has already done most of the reduction, so measuring it
        # against the original count applied it twice — the trellis's far level
        # came out at ninety triangles from a four-thousand budget.
        src_tris = max(1, n1)
    gt('weld', src, a)
    ratio = max(0.0, min(1.0, budget / max(1, src_tris)))
    # the error bound is generous on purpose: at these ratios the ratio is the
    # binding constraint, and a tight bound only makes the simplifier stop early
    # Error unconstrained, ratio binding. At 0.02 meshoptimizer refuses to
    #    collapse past what that bound allows, and on a mesh of thousands of
    #    disconnected leaf shells that is barely at all: the waterside shrub
    #    came back at 1.04 M triangles against a 40 k budget, and its "far"
    #    level came back identical. The budgets are deliberate, so the ratio
    #    is what should bind, not a bound tuned for a watertight solid.
    gt('simplify', a, b, '--ratio', '%.6f' % ratio, '--error', '1')
    gt('resize', b, a, '--width', str(tex), '--height', str(tex))
    gt('webp', a, b, '--quality', '92')
    # measured here, before compression: meshopt --level high applies
    #    KHR_mesh_quantization, after which POSITION min/max are integers in
    #    quantized space and the real scale has moved into the node transform.
    #    Reading the bounds off the compressed file gave the tram a height of
    #    10,416 "metres" and the router scaled it to nothing.
    doc = glb_json(b)
    lo, hi = bounds(doc)
    gt('meshopt', b, dst, '--level', 'high')
    return lo, hi, tri_count(doc)


index = {}
if os.path.exists('work/props.json'):
    index = json.load(open('work/props.json'))
only = sys.argv[1:] or None

os.makedirs(OUT, exist_ok=True)
os.makedirs(TMP, exist_ok=True)
RAW = TMP + '/dl.glb'

for fn, key, budget, tex, lod1 in PROPS:
    if only and key not in only:
        continue
    if not only and index.get(key, {}).get('v') == 3 \
            and os.path.exists(os.path.join(OUT, key + '.glb')):
        print('==', key, '(cached)')
        continue
    print('==', key, flush=True)
    ok = zfetch(fn, RAW) if fn in ZIDX else (
        subprocess.run(['curl', '-sSL', '-o', RAW, REL + fn], capture_output=True).returncode == 0
        and os.path.exists(RAW))
    if not ok:
        print('   fetch failed'); continue
    try:
        st = tri_count(glb_json(RAW))
        print('   source %d tris' % st, flush=True)
        dst = os.path.join(OUT, key + '.glb')
        lo, hi, ntri = reduce_to(RAW, dst, budget, tex, st, WELD.get(key, (0, 0))[0])
        rec = {'v': 3, 'file': 'assets/props/%s.glb' % key, 'tris': ntri,
               'w': hi[0] - lo[0], 'height': hi[1] - lo[1], 'depth': hi[2] - lo[2],
               'base': lo[1], 'kb': os.path.getsize(dst) // 1024, 'tex': tex,
               'source': fn, 'src_tris': st}
        if lod1:
            d1 = os.path.join(OUT, key + '_lod1.glb')
            _, _, n1 = reduce_to(RAW, d1, lod1, max(512, tex // 2), st, WELD.get(key, (0, 0))[1])
            rec['lod1'] = {'file': 'assets/props/%s_lod1.glb' % key,
                           'tris': n1, 'kb': os.path.getsize(d1) // 1024}
        index[key] = rec
        print('   -> %d tris, %d KB, %dpx%s' % (rec['tris'], rec['kb'], tex,
              (', lod1 %d tris %d KB' % (rec['lod1']['tris'], rec['lod1']['kb'])) if lod1 else ''),
              flush=True)
    except Exception:
        import traceback
        traceback.print_exc()
    finally:
        for f in (RAW, TMP + '/_a.glb', TMP + '/_b.glb', TMP + '/_c.glb'):
            if os.path.exists(f):
                os.remove(f)

json.dump(index, open('work/props.json', 'w'), indent=1)
tot = sum(v['kb'] for v in index.values()) + sum(
    v['lod1']['kb'] for v in index.values() if 'lod1' in v)
print('props: %d, %.1f MB total' % (len(index), tot / 1024))
