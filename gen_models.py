#!/usr/bin/env python3
"""Fetch, reduce and repack CC0 vegetation from Poly Haven into embeddable GLBs.

Poly Haven's models are photogrammetry density — `island_tree_01` is 1.6 M
triangles across a 60 MB buffer, and 1.06 M of those triangles are 44,168
individual leaves at 24 triangles each. Quadric decimation is the right tool for
the trunk and the branches and the wrong tool for the leaves: a leaf is already
a card, so the only honest reduction is to throw cards away and flatten the ones
that survive.

So two reducers.

* **Cards.** For an alpha-cutout material whose components are small planar
  patches, each surviving component collapses to a single quad. The quad is the
  image of the component's UV bounding box under the least-squares affine map
  from UV to the component's own tangent plane — so the leaf keeps its exact
  place in the atlas, its exact size and its exact orientation, and its shape
  still comes from the alpha channel. Which components survive is decided per
  angular bin around the crown centroid, biased to the outer shell, because an
  interior leaf is never seen. The survivors are then scaled about their own
  centroids to put back some of the optical density that was dropped.
* **Everything else.** Quadric error metrics, iterated until the primitive is
  at or under its share of the budget, with normals and UVs resampled from the
  original by nearest neighbour.

Textures come down at 1k, are downscaled and re-encoded as WebP — a leaf atlas
with its cutout is 90 KB as RGBA WebP against 260 KB as RGBA PNG, and the whole
deliverable is one file that has to load over `file://`. Where a material is a
cutout, Poly Haven's separate alpha map is merged back into the base colour and
the material is switched from BLEND to MASK, because a leaf card sorted by
transparency is a leaf card that flickers.

Output: work/models.json — one base64 GLB per model, with its triangle count,
its authored height and its credit line.
"""
import base64
import io
import json
import os
import struct
import subprocess
import sys

import numpy as np
from PIL import Image
from scipy.sparse import coo_matrix
from scipy.sparse.csgraph import connected_components
from scipy.spatial import cKDTree

import fast_simplification

CACHE = 'work/models'
RES = '1k'

# name -> (triangle budget, leaf-card budget, what the district uses it for)
# Solid primitives divide what is left over by the square root of their source
# count, not by the count itself: a trunk is one twentieth of a photogrammetry
# tree's triangles and rather more than one twentieth of what you look at.
# name -> ([(tri budget, leaf-card budget) per level of detail], role)
# Two levels where the district plants hundreds: the hero stands in the near
# field of a bookmark, the coarse one fills the fabric behind it. Which one an
# instance gets is decided at build time by distance, so nothing ever pops.
MODELS = {
    'island_tree_01':  ([(9200, 3200), (3200, 700)], 'shade tree'),
    'quiver_tree_01':  ([(3600, 0),    (1200, 0)],   'desert tree'),
    'shrub_02':        ([(4400, 0),    (1500, 0)],   'shrub'),
    'potted_plant_01': ([(2200, 600)],               'potted plant'),
}

# base colour is the only map where the extra pixels are visible at street
# distance; the normal and the ARM ride at half that.
TEX_BASE, TEX_AUX, TEX_LEAF = 256, 192, 384

RNG = np.random.default_rng(0x5D0C17)


def fetch(url, dest):
    if os.path.exists(dest) and os.path.getsize(dest) > 0:
        return dest
    os.makedirs(os.path.dirname(dest), exist_ok=True)
    r = subprocess.run(['curl', '-sS', '-f', '-o', dest, url], capture_output=True)
    if r.returncode != 0:
        if os.path.exists(dest):
            os.remove(dest)
        raise RuntimeError('fetch failed %s: %s' % (url, r.stderr.decode()[:160]))
    return dest


def files_index(name):
    """Poly Haven's file index. The gltf's relative image URIs only resolve
    through this — the textures live under a different path than the gltf."""
    p = '%s/%s.files.json' % (CACHE, name)
    if not os.path.exists(p):
        fetch('https://api.polyhaven.com/files/%s' % name, p)
    return json.load(open(p))


def alpha_url(files, base_uri):
    """The cutout for a base colour map, if the asset ships one. Poly Haven
    names it by the material prefix — `..._leaves_diff_1k.jpg` pairs with the
    `leaves_alpha` key, and a single-material asset pairs with `Alpha`."""
    stem = os.path.basename(base_uri)
    for key in files:
        k = key.lower()
        if not k.endswith('alpha'):
            continue
        pre = key[:-6].lower().strip('_')
        if pre in ('', 'Alpha'.lower()) or ('_%s_' % pre) in stem.lower():
            for res in (RES, '2k', '4k'):
                got = files[key].get(res, {})
                for fmt in ('png', 'jpg'):
                    if fmt in got:
                        return got[fmt]['url']
    return None


def accessor(gltf, buf, idx):
    a = gltf['accessors'][idx]
    bv = gltf['bufferViews'][a['bufferView']]
    ncomp = {'SCALAR': 1, 'VEC2': 2, 'VEC3': 3, 'VEC4': 4}[a['type']]
    dt = {5120: np.int8, 5121: np.uint8, 5122: np.int16, 5123: np.uint16,
          5125: np.uint32, 5126: np.float32}[a['componentType']]
    off = bv.get('byteOffset', 0) + a.get('byteOffset', 0)
    stride = bv.get('byteStride')
    if stride and stride != ncomp * np.dtype(dt).itemsize:
        out = np.empty((a['count'], ncomp), dtype=dt)
        for i in range(a['count']):
            out[i] = np.frombuffer(buf, dtype=dt, count=ncomp, offset=off + i * stride)
        return out
    arr = np.frombuffer(buf, dtype=dt, count=a['count'] * ncomp, offset=off)
    return arr.reshape(a['count'], ncomp)


def components(pos, idx):
    n = len(pos)
    r = np.concatenate([idx[:, 0], idx[:, 1], idx[:, 2]])
    c = np.concatenate([idx[:, 1], idx[:, 2], idx[:, 0]])
    a = coo_matrix((np.ones(len(r), np.int8), (r, c)), shape=(n, n))
    ncc, lab = connected_components(a, directed=False)
    return ncc, lab


def pick_shell(cen, tris, keep_n, bins=(14, 7)):
    """Choose which components survive. Bin them by direction from the crown
    centroid, give every bin a quota proportional to its population, and inside
    a bin prefer the outermost — an interior leaf is occluded by definition.
    A fifth of each quota is drawn at random from the rest so the crown does not
    become a hollow shell where it happens to be thin."""
    mid = cen.mean(0)
    d = cen - mid
    rad = np.linalg.norm(d, axis=1) + 1e-9
    az = ((np.arctan2(d[:, 2], d[:, 0]) + np.pi) / (2 * np.pi) * bins[0]).astype(int) % bins[0]
    el = np.clip(((d[:, 1] / rad + 1) * 0.5 * bins[1]).astype(int), 0, bins[1] - 1)
    key = az * bins[1] + el
    frac = min(1.0, keep_n / max(1, len(cen)))
    keep = []
    for b in np.unique(key):
        m = np.nonzero(key == b)[0]
        q = int(round(len(m) * frac))
        if q <= 0:
            q = 1 if RNG.random() < len(m) * frac else 0
        if q <= 0:
            continue
        order = m[np.argsort(-rad[m])]
        outer = max(1, int(q * 0.8))
        keep.append(order[:outer])
        rest = order[outer:]
        if len(rest) and q > outer:
            keep.append(RNG.choice(rest, size=min(len(rest), q - outer), replace=False))
    return np.concatenate(keep) if keep else np.array([], int)


def pick_solid(sizes, cen, keep_n):
    """Which twigs survive. Three quarters by triangle count — a photogrammetry
    branch set subdivides in proportion to thickness, so the biggest components
    are the structural limbs — and a quarter drawn from the rest by direction,
    so the tracery does not all come from one side."""
    if keep_n >= len(sizes):
        return np.arange(len(sizes))
    big = int(keep_n * 0.75)
    order = np.argsort(-sizes)
    keep = list(order[:big])
    rest = order[big:]
    if len(rest) and keep_n > big:
        keep += list(rest[pick_shell(cen[rest], sizes[rest], keep_n - big)])
    return np.unique(np.array(keep, int))


def submesh(pos, nrm, uv, idx, lab, comps):
    """Rebuild a primitive from a subset of its connected components."""
    want = np.zeros(lab.max() + 1, bool)
    want[comps] = True
    tri = idx[want[lab[idx[:, 0]]]]
    used = np.unique(tri)
    remap = np.full(len(pos), -1, np.int64)
    remap[used] = np.arange(len(used))
    return pos[used], nrm[used], uv[used], remap[tri].astype(np.uint32)


def planar_frac(pos, lab, comps, sample=48):
    """How much of a component set is flat. A leaf card's third singular value
    is a fraction of its second; a twig's is its radius, the same as its second.
    This is what separates `island_tree_01_leaves`, which is 44,168 leaf cards,
    from `shrub_02`, which is 464 whole twigs with the leaves attached."""
    pick = comps if len(comps) <= sample else RNG.choice(comps, sample, replace=False)
    flat = 0
    for cid in pick:
        v = np.nonzero(lab == cid)[0]
        if len(v) < 4:
            continue
        s = np.linalg.svd(pos[v] - pos[v].mean(0), compute_uv=False)
        flat += s[2] <= 0.55 * s[1]
    return flat / max(1, len(pick))


def reduce_solid(pos, nrm, uv, idx, lab, sizes, comps, cen, target, collapse=True):
    """Bring a set of components down to a triangle target. Quadric collapse
    cannot cross a component boundary, so a set of 8,357 twigs has a floor of
    two triangles each however hard it is pushed — and pushed past that floor
    the twigs come back as long degenerate slivers. So thin the set by count
    first, and only then collapse what is left.

    `collapse=False` for a cutout material: those components carry their leaves
    as part of the same mesh, and a leaf that loses two of its four corners is
    a brown spike. Those are thinned by count alone."""
    src = submesh(pos, nrm, uv, idx, lab, comps) if len(comps) < len(sizes) \
        else (pos, nrm, uv, idx)
    if len(src[3]) <= target:
        return src
    if not collapse:
        # dropping by count overshoots, because the components kept first are
        # the biggest ones. Converge instead of estimating once.
        keep_n, cur = len(comps), src
        for _ in range(6):
            if len(cur[3]) <= target:
                break
            keep_n = max(4, int(keep_n * target / len(cur[3]) * 0.92))
            # by direction, not by size: thinning a leafy shrub by triangle
            # count keeps four fat twigs and throws the silhouette away.
            cur = submesh(pos, nrm, uv, idx, lab,
                          comps[pick_shell(cen, sizes[comps], keep_n)])
        return cur
    keep_n = len(comps)
    best = qem(*src, target)
    for _ in range(4):
        if len(best[3]) <= target * 1.2 or keep_n <= 6:
            break
        keep_n = max(6, int(keep_n * target / (len(best[3]) * 1.6)))
        cut = submesh(pos, nrm, uv, idx, lab, comps[pick_solid(sizes[comps], cen, keep_n)])
        best = qem(*cut, target) if len(cut[3]) > target else cut
    return best


def cardify(pos, nrm, uv, idx, lab, comps, grow):
    """Collapse each component to one quad in its own tangent plane, spanning
    its UV bounding box. Two triangles, exact atlas coordinates, real size and
    real orientation; the silhouette still comes from the alpha channel."""
    P, N, U, I = [], [], [], []
    tri_lab = lab[idx[:, 0]]
    for cid in comps:
        v = np.nonzero(lab == cid)[0]
        if len(v) < 4:
            continue
        p, u = pos[v], uv[v]
        cp, cu = p.mean(0), u.mean(0)
        # tangent frame: the two dominant directions of the patch
        _, _, vt = np.linalg.svd(p - cp, full_matrices=False)
        T, B, nz = vt[0], vt[1], vt[2]
        loc = np.stack([(p - cp) @ T, (p - cp) @ B], 1)
        lo, hi = u.min(0), u.max(0)
        box = np.array([[lo[0], lo[1]], [hi[0], lo[1]], [hi[0], hi[1]], [lo[0], hi[1]]], np.float32)
        # least-squares affine  uv -> local 2D, then send the uv box through it
        A = np.concatenate([u - cu, np.ones((len(u), 1))], 1)
        M, *_ = np.linalg.lstsq(A, loc, rcond=None)
        q2 = np.concatenate([box - cu, np.ones((4, 1))], 1) @ M
        # a near-degenerate patch makes that fit ill-conditioned and the quad
        # comes back as a huge sliver. When it does, fall back to the patch's
        # own principal extents, which cannot be wrong by more than a rotation.
        # (checked before the grow, so the test is against the source patch)
        ext = loc.max(0) - loc.min(0)
        if not np.all(np.isfinite(q2)) or \
                (q2.max(0) - q2.min(0)).max() > 2.4 * max(ext.max(), 1e-6):
            mid = (loc.max(0) + loc.min(0)) * 0.5
            q2 = np.array([[-1, -1], [1, -1], [1, 1], [-1, 1]], np.float32) * ext * 0.5 + mid
        q2 = (q2 - q2.mean(0)) * grow + q2.mean(0)
        q3 = cp + q2[:, :1] * T + q2[:, 1:2] * B
        fn = nrm[v].mean(0)
        fn = nz if np.linalg.norm(fn) < 1e-5 else fn / np.linalg.norm(fn)
        if fn @ nz < 0:
            nz = -nz
        base = len(P)
        P.extend(q3)
        N.extend([fn] * 4)
        U.extend(box)
        I.extend([base, base + 1, base + 2, base, base + 2, base + 3])
    if not P:
        return None
    return (np.array(P, np.float32), np.array(N, np.float32),
            np.array(U, np.float32), np.array(I, np.uint32).reshape(-1, 3))


def qem(pos, nrm, uv, idx, target):
    """Iterated quadric decimation. One call caps out around 98.5% so a 500 k
    primitive needs several passes to reach four figures. Attributes are
    resampled from the original by nearest neighbour afterwards, which is exact
    wherever the collapse kept an original vertex and close enough everywhere
    else."""
    src, sn, su = pos.copy(), nrm, uv
    p, i = pos, idx
    for _ in range(6):
        if len(i) <= target:
            break
        red = min(0.97, max(0.02, 1.0 - target / len(i)))
        p, i = fast_simplification.simplify(p, i.astype(np.uint32), red)
        i = i.reshape(-1, 3)
    tree = cKDTree(src)
    _, near = tree.query(p, workers=-1)
    return (p.astype(np.float32), sn[near].astype(np.float32),
            su[near].astype(np.float32), i.astype(np.uint32))


def encode(path, size, alpha_path=None, quality=80):
    im = Image.open(path).convert('RGB')
    im = im.resize((size, size), Image.LANCZOS)
    if alpha_path:
        al = Image.open(alpha_path)
        if al.mode in ('I;16', 'I;16B', 'I', 'F'):
            # Poly Haven ships its cutouts as 16-bit greyscale, and Pillow's
            # convert('L') on those clips instead of scaling — every leaf comes
            # out below the alpha cutoff and the plant renders as bare stems.
            a = np.asarray(al).astype(np.float32)
            al = Image.fromarray(np.clip(a / max(a.max(), 1e-6) * 255, 0, 255).astype(np.uint8), 'L')
        else:
            al = al.convert('L')
        im = im.convert('RGBA')
        im.putalpha(al.resize((size, size), Image.LANCZOS))
    b = io.BytesIO()
    im.save(b, 'WEBP', quality=quality, method=6)
    return b.getvalue(), 'image/webp'


def parse(name):
    print('==', name)
    files = files_index(name)
    entry = files['gltf'][RES]['gltf']
    g = json.load(open(fetch(entry['url'], '%s/%s.gltf' % (CACHE, name))))
    inc = entry['include']
    binuri = g['buffers'][0]['uri']
    buf = open(fetch(inc[binuri]['url'], '%s/%s' % (CACHE, binuri)), 'rb').read()

    # a material is a cutout only if the asset actually ships the alpha map.
    # `quiver_tree_01_leaf` is declared BLEND and has none — its blades are
    # solid geometry, and flattening them to quads would give opaque rectangles.
    cutout = set()
    for mi, m in enumerate(g['materials']):
        if m.get('alphaMode') not in ('MASK', 'BLEND'):
            continue
        slot = m.get('pbrMetallicRoughness', {}).get('baseColorTexture')
        if slot and alpha_url(files, g['images'][g['textures'][slot['index']]['source']]['uri']):
            cutout.add(mi)

    prims = [pr for mesh in g['meshes'] for pr in mesh['primitives']]
    total = sum(g['accessors'][p['indices']]['count'] // 3 for p in prims)

    # classify first: the two budgets have to be divided by the triangles that
    # actually land in each path, not by material flags.
    parsed, leaf_total, solid_total = [], 0, 0
    for pr in prims:
        mat = pr.get('material', 0)
        pos = accessor(g, buf, pr['attributes']['POSITION']).astype(np.float32)
        nrm = accessor(g, buf, pr['attributes']['NORMAL']).astype(np.float32) \
            if 'NORMAL' in pr['attributes'] else np.zeros_like(pos)
        uv = accessor(g, buf, pr['attributes']['TEXCOORD_0']).astype(np.float32) \
            if 'TEXCOORD_0' in pr['attributes'] else np.zeros((len(pos), 2), np.float32)
        idx = accessor(g, buf, pr['indices']).astype(np.uint32).reshape(-1, 3)
        ncc, lab = components(pos, idx)
        sizes = np.bincount(lab[idx[:, 0]], minlength=ncc)
        live = np.nonzero(sizes > 0)[0]
        cards = (mat in cutout and len(live) >= 40
                 and np.median(sizes[live]) <= 700
                 and planar_frac(pos, lab, live) >= 0.6)
        leaf_total += len(idx) if cards else 0
        parsed.append((mat, pos, nrm, uv, idx, lab, sizes, live, cards))

    print('   source %d tris in %d primitives (%d as cards)' % (total, len(prims), leaf_total))
    return parsed, cutout, g, inc, files


def reduce_to(parsed, cutout, budget, leaf_budget):
    # totals are per level: with no card budget a cutout primitive falls back to
    # the solid path and has to be counted there instead.
    leaf_total = max(1, sum(len(p[4]) for p in parsed if p[8] and leaf_budget > 0))
    solid_total = max(1.0, sum(np.sqrt(len(p[4])) for p in parsed
                               if not (p[8] and leaf_budget > 0)))
    solid_budget = max(400, budget - leaf_budget * 2)
    out_prims = []
    for mat, pos, nrm, uv, idx, lab, sizes, live, cards in parsed:
        cards = cards and leaf_budget > 0
        src_tris = len(idx)
        if cards:
            keep_n = max(8, int(round(leaf_budget * src_tris / leaf_total)))
            cen = np.zeros((len(live), 3), np.float32)
            for j, cid in enumerate(live):
                cen[j] = pos[lab == cid].mean(0)
            sel = live[pick_shell(cen, sizes[live], keep_n)]
            # a cutout material covers the twigs as well as the leaves —
            # `shrub_02` maps both into one atlas. Flattening a tube turns it
            # into a brown ribbon, so only genuinely planar patches become
            # cards; the rest keep their geometry and go through the collapser.
            flat, tube = [], []
            for cid in sel:
                v = np.nonzero(lab == cid)[0]
                s = np.linalg.svd(pos[v] - pos[v].mean(0), compute_uv=False)
                (flat if len(v) >= 4 and s[2] <= 0.55 * s[1] else tube).append(cid)
            grow = float(np.clip(np.sqrt(len(live) / max(1, len(flat))), 1.0, 3.1))
            r = cardify(pos, nrm, uv, idx, lab, flat, grow) if flat else None
            tubes = 0
            if tube:
                cap = max(len(tube) * 12, int(leaf_budget * 0.6 * len(tube) / max(1, len(sel))))
                t = reduce_solid(pos, nrm, uv, idx, lab, sizes, np.array(tube, int),
                                 cen[np.searchsorted(live, tube)], cap, collapse=False)
                tubes = len(t[3])
                out_prims.append({'pos': t[0], 'nrm': t[1], 'uv': t[2],
                                  'idx': t[3].reshape(-1).astype(np.uint32), 'mat': mat})
            print('      mat %d cards: %d comps -> %d flat (grow %.2f) + %d twig, %d -> %d tris'
                  % (mat, len(live), len(flat), grow, len(tube), src_tris,
                     (len(r[3]) if r else 0) + tubes))
            if r is None:
                continue
            pos, nrm, uv, idx = r
        else:
            target = max(200, int(round(solid_budget * np.sqrt(src_tris) / solid_total)))
            if src_tris > target:
                cen = np.zeros((len(live), 3), np.float32)
                for j, cid in enumerate(live):
                    cen[j] = pos[lab == cid].mean(0)
                pos, nrm, uv, idx = reduce_solid(pos, nrm, uv, idx, lab, sizes, live, cen,
                                                 target, collapse=mat not in cutout)
            print('      mat %d solid: %d -> %d tris (%d comps in)' % (mat, src_tris, len(idx), len(live)))

        ln = np.linalg.norm(nrm, axis=1, keepdims=True)
        nrm = np.where(ln > 1e-6, nrm / np.maximum(ln, 1e-6), np.array([0, 1, 0], np.float32))
        out_prims.append({'pos': pos.astype(np.float32), 'nrm': nrm.astype(np.float32),
                          'uv': uv.astype(np.float32), 'idx': idx.reshape(-1).astype(np.uint32),
                          'mat': mat})
    return out_prims


def pack(name, g, inc, files, cutout, lods, kind):
    # ---- textures
    images, textures, materials, blobs = [], [], [], []
    seen = {}

    def add_image(uri, size, alpha=None, quality=80):
        key = (uri, size, alpha)
        if key in seen:
            return seen[key]
        src = fetch(inc[uri]['url'], '%s/%s' % (CACHE, os.path.basename(uri)))
        ap = None
        if alpha:
            try:
                ap = fetch(alpha, '%s/%s' % (CACHE, os.path.basename(alpha)))
            except Exception as e:
                print('      (no alpha: %s)' % e)
        data, mime = encode(src, size, ap, quality)
        blobs.append(data)
        images.append({'mimeType': mime, 'bufferView': -len(blobs)})
        textures.append({'sampler': 0, 'source': len(images) - 1})
        seen[key] = len(textures) - 1
        return seen[key]

    def uri_of(slot):
        return g['images'][g['textures'][slot['index']]['source']]['uri']

    for mi, m in enumerate(g['materials']):
        pbr = m.get('pbrMetallicRoughness', {})
        out = {'name': m.get('name', 'm%d' % mi), 'doubleSided': True,
               'pbrMetallicRoughness': {'metallicFactor': 0.0, 'roughnessFactor': 1.0}}
        leaf = mi in cutout
        if 'baseColorTexture' in pbr:
            uri = uri_of(pbr['baseColorTexture'])
            au = alpha_url(files, uri) if leaf else None
            t = add_image(uri, TEX_LEAF if leaf else TEX_BASE, au, 84 if leaf else 80)
            out['pbrMetallicRoughness']['baseColorTexture'] = {'index': t}
            if au:
                out['alphaMode'] = 'MASK'
                out['alphaCutoff'] = 0.4
        # a leaf card is flat: its normal map is noise at this size, and its
        # roughness is a constant. Only the solid materials carry them.
        if not leaf:
            if 'normalTexture' in m:
                out['normalTexture'] = {'index': add_image(uri_of(m['normalTexture']), TEX_AUX, quality=88)}
            if 'metallicRoughnessTexture' in pbr:
                t = add_image(uri_of(pbr['metallicRoughnessTexture']), TEX_AUX, quality=78)
                out['pbrMetallicRoughness']['metallicRoughnessTexture'] = {'index': t}
                out['occlusionTexture'] = {'index': t}
        else:
            out['pbrMetallicRoughness']['roughnessFactor'] = 0.86
        materials.append(out)

    # ---- binary chunk
    bins, views, accs, gprims = bytearray(), [], [], []

    def push(arr, target=None):
        off = len(bins)
        raw = arr.tobytes()
        bins.extend(raw)
        while len(bins) % 4:
            bins.append(0)
        v = {'buffer': 0, 'byteOffset': off, 'byteLength': len(raw)}
        if target:
            v['target'] = target
        views.append(v)
        return len(views) - 1

    meshes, levels = [], []
    for li, prims_l in enumerate(lods):
      gprims = []
      for p in prims_l:
        # normals ride as signed bytes and UVs as unsigned shorts (both
        # normalised, both four-byte aligned without padding), which is a third
        # off the vertex buffer for detail no one can see at street distance.
        nq = np.rint(np.clip(p['nrm'], -1, 1) * 127).astype(np.int8)
        tight = float(p['uv'].min()) >= -1e-4 and float(p['uv'].max()) <= 1.0 + 1e-4
        uq = np.rint(np.clip(p['uv'], 0, 1) * 65535).astype(np.uint16) if tight else p['uv']
        small = len(p['pos']) <= 65535
        iq = p['idx'].astype(np.uint16 if small else np.uint32)
        vp = push(p['pos'], 34962); vn = push(nq, 34962); vu = push(uq, 34962)
        vi = push(iq, 34963)
        accs += [
            {'bufferView': vp, 'componentType': 5126, 'count': len(p['pos']), 'type': 'VEC3',
             'min': p['pos'].min(0).tolist(), 'max': p['pos'].max(0).tolist()},
            {'bufferView': vn, 'componentType': 5120, 'normalized': True,
             'count': len(nq), 'type': 'VEC3'},
            {'bufferView': vu, 'componentType': 5123 if tight else 5126,
             'normalized': bool(tight), 'count': len(uq), 'type': 'VEC2'},
            {'bufferView': vi, 'componentType': 5123 if small else 5125,
             'count': len(iq), 'type': 'SCALAR'},
        ]
        n = len(accs)
        gprims.append({'attributes': {'POSITION': n - 4, 'NORMAL': n - 3, 'TEXCOORD_0': n - 2},
                       'indices': n - 1, 'material': p['mat']})
      meshes.append({'name': 'LOD%d' % li, 'primitives': gprims})
      levels.append(sum(len(p['idx']) for p in prims_l) // 3)
    for bi, b in enumerate(blobs):
        v = push(np.frombuffer(b, np.uint8))
        for im in images:
            if im['bufferView'] == -(bi + 1):
                im['bufferView'] = v

    doc = {
        'asset': {'version': '2.0', 'generator': 'gen_models.py / Poly Haven CC0'},
        'extensionsUsed': ['KHR_mesh_quantization'],
        'extensionsRequired': ['KHR_mesh_quantization'],
        'scene': 0,
        'scenes': [{'nodes': list(range(len(meshes)))}],
        'nodes': [{'mesh': i, 'name': 'LOD%d' % i} for i in range(len(meshes))],
        'meshes': meshes, 'materials': materials,
        'textures': textures, 'images': images,
        'samplers': [{'magFilter': 9729, 'minFilter': 9987, 'wrapS': 10497, 'wrapT': 10497}],
        'accessors': accs, 'bufferViews': views, 'buffers': [{'byteLength': len(bins)}],
    }
    js = json.dumps(doc, separators=(',', ':')).encode()
    while len(js) % 4:
        js += b' '
    glb = (struct.pack('<III', 0x46546C67, 2, 12 + 8 + len(js) + 8 + len(bins))
           + struct.pack('<II', len(js), 0x4E4F534A) + js
           + struct.pack('<II', len(bins), 0x004E4942) + bytes(bins))
    p0 = lods[0]
    lo = min(p['pos'][:, 1].min() for p in p0)
    hi = max(p['pos'][:, 1].max() for p in p0)
    rad = max(float(np.abs(p['pos'][:, [0, 2]]).max()) for p in p0)
    print('   -> LODs %s tris, %.2f m tall, r %.2f m, textures %d KB, GLB %d KB'
          % (levels, hi - lo, rad, sum(len(b) for b in blobs) // 1024, len(glb) // 1024))
    return {'glb': base64.b64encode(glb).decode(), 'tris': levels[0], 'lods': levels,
            'height': round(float(hi - lo), 3), 'base': round(float(lo), 3),
            'radius': round(rad, 3), 'kind': kind,
            'credit': '%s (Poly Haven, CC0)' % name}


if __name__ == '__main__':
    out = {}
    for name, (budgets, kind) in MODELS.items():
        try:
            parsed, cutout, g, inc, files = parse(name)
            lods = [reduce_to(parsed, cutout, b, l) for b, l in budgets]
            out[name] = pack(name, g, inc, files, cutout, lods, kind)
        except Exception as e:
            import traceback; traceback.print_exc()
            print('   SKIP %s: %s' % (name, e))
    json.dump(out, open('work/models.json', 'w'))
    tot = sum(len(v['glb']) for v in out.values())
    print('pack: %d models, %d KB of base64' % (len(out), tot // 1024))
