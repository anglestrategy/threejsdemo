#!/usr/bin/env python3
"""Rewrite the ASSET INVENTORY section of STATUS.md from work/props.json.

The inventory has to be generated, not typed. Thirty-one assets go through the
intake with per-asset budgets and LOD chains, and a hand-maintained table is
wrong the first time a budget changes — which is exactly when someone would be
reading it to find out why a prop looks the way it does.
"""
import json
import os

DESC = {
    'mosque': 'jamaa with dome and minaret — the district landmark',
    'arcade': 'two-storey arcaded colonnade block — street wall',
    'canopypav': 'golden canopy pavilion — over the tram stop',
    'tram': 'articulated light-rail vehicle',
    'tramstop': 'tram platform shelter',
    'bluehall': 'blue-roofed hall with planted walls',
    'shophouse': 'arcaded shophouse row',
    'resblock': 'residential apartment block',
    'fountain': 'roundabout fountain bowl',
    'obelisk': 'roundabout obelisk monument',
    'kiosk': 'small kiosk booth',
    'bicycle': 'parked bicycle', 'benchw': 'wooden street bench',
    'bins': 'bank of three recycling bins', 'pots': 'small potted plants',
    'hammock': 'rooftop hammock', 'evpoint': 'EV charging station',
    'solar': 'rooftop photovoltaic array', 'trellis': 'vine trellis panel',
    'watershrub': 'waterside shrub clump', 'carpet': 'outdoor carpet / rug',
    'bunting': 'string-light bunting', 'sail1': 'single shade sail',
    'bench2': 'street bench (variant)', 'majlisset': 'majlis lounge seating',
    'palm2': 'date palm', 'lagoon_a': 'slender lagoon-scene tree',
    'lagoon_b': 'lagoon-scene structure', 'extra': 'lagoon-scene rock mass',
    'people10': 'ten standing figures', 'people5s': 'five seated figures',
    'mashrabiya': 'teak mashrabiya screen panel',
}
# kits that are generated but deliberately not routed, and why
UNROUTED = {
    'palm2': 'crown with no trunk; decimates to a low bush. The procedural '
             'date palm reads better and carries a real LOD chain.',
    'bench2': 'thin frame; reads worse than benchw.',
    'majlisset': 'shape did not survive reduction in the first intake — '
                 're-check against the new UV-correct pipeline.',
    'extra': 'unclassified rock mass; no sited use yet.',
    'lagoon_b': 'unclassified structure; no sited use yet.',
}

idx = json.load(open('work/props.json'))
routed = set()
for f in os.listdir('src'):
    if f.startswith('district_content'):
        src = open(os.path.join('src', f), encoding='utf-8').read()
        for k in idx:
            if "'" + k + "'" in src and 'routeProp(' in src:
                routed.add(k)

rows = []
tot_kb = 0
for k in sorted(idx, key=lambda x: -idx[x]['tris']):
    v = idx[k]
    kb = v['kb'] + (v.get('lod1', {}).get('kb', 0))
    tot_kb += kb
    lod = ('%d' % v['lod1']['tris']) if 'lod1' in v else '—'
    used = 'yes' if k in routed and k not in UNROUTED else 'no'
    rows.append('| `%s` | %s | %s | %s | %d px | %.1f MB | %s |' % (
        k, DESC.get(k, '—'), '{:,}'.format(v['tris']), lod, v.get('tex', 0),
        kb / 1024, used))

body = [
    '## Asset inventory — client-supplied GLBs',
    '',
    'Fetched from the repository release `glb` (some as members of `glbs.zip`,',
    'pulled out with HTTP range requests rather than downloading 706 MB).',
    'All are client-generated from this project\'s own renders via Meshy/Tripo;',
    'the client owns them, so no third-party licence applies. Regenerate the',
    'whole set with `python3 gen_props.py`, one with `python3 gen_props.py <key>`,',
    'and this table with `python3 gen_inventory.py`.',
    '',
    'Intake per asset: `weld -> simplify -> resize -> webp q92 -> meshopt`,',
    'all via gltf-transform. The simplifier is meshoptimizer and is',
    'attribute-aware — it respects UV seams and never invents a texture',
    'coordinate. Budgets are set from what the asset is and how many of them',
    'the plan places, not from a file-size ceiling.',
    '',
    '| key | what it is | tris | LOD1 | texture | size | sited |',
    '|---|---|---|---|---|---|---|',
] + rows + [
    '',
    '**%d assets, %.1f MB served.**' % (len(idx), tot_kb / 1024),
    '',
    'Generated but not sited, and why:',
    '',
] + ['- `%s` — %s' % (k, r) for k, r in UNROUTED.items() if k in idx]

md = open('STATUS.md', encoding='utf-8').read()
MARK = '## Asset inventory — client-supplied GLBs'
if MARK in md:
    head = md[:md.index(MARK)]
    rest = md[md.index(MARK):]
    nxt = rest.find('\n## ', 1)
    tail = rest[nxt:] if nxt > 0 else ''
    md = head + '\n'.join(body) + '\n' + tail
else:
    md = md.rstrip() + '\n\n' + '\n'.join(body) + '\n'
open('STATUS.md', 'w', encoding='utf-8').write(md)
print('STATUS.md inventory: %d assets, %.1f MB' % (len(idx), tot_kb / 1024))
