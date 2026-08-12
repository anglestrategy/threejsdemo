#!/usr/bin/env python3
"""Assemble the deliverable into dist/ — a served build, not a single file.

The single-file constraint is gone, and with it the reason every texture was
512 and every model was decimated to four figures. Assets now ship as real
files fetched at runtime, so their size is a bandwidth question rather than a
parse-time one, and the app can start before they have all arrived.

    dist/index.html          the shell and the import map
    dist/vendor/*.js         three.js and its addons, as modules
    dist/app.js              the assembled application
    dist/assets/*.json       payloads: models, panels, textures, relief, images

`python3 build.py --single` still writes the old one-file build for handing
someone a demo on a USB stick; everything large is dropped from it.
"""
import base64
import json
import os
import re
import shutil
import subprocess
import sys
import tempfile

ROOT = os.path.dirname(os.path.abspath(__file__))
p = lambda *a: os.path.join(ROOT, *a)
SINGLE = '--single' in sys.argv

head = open(p('src/shell_head.html'), encoding='utf-8').read()
tail = open(p('src/shell_tail.html'), encoding='utf-8').read()
mods = json.load(open(p('src/vendor_mods.json'), encoding='utf-8'))
main = open(p('src/main.js'), encoding='utf-8').read()

if '/*@IMAGES@*/' not in main:
    sys.exit('main.js is missing the /*@IMAGES@*/ marker')

if '/*@DISTRICT@*/' in main:
    d = open(p('src/district.js'), encoding='utf-8').read()
    if '/*@DISTRICT_CONTENT@*/' in d:
        parts = sorted(f for f in os.listdir(p('src')) if f.startswith('district_content'))
        d = d.replace('/*@DISTRICT_CONTENT@*/',
                      '\n'.join(open(p('src', f), encoding='utf-8').read() for f in parts))
    main = main.replace('/*@DISTRICT@*/', d)

# every large payload, by the marker that stands in for it
PAYLOADS = [
    ('/*@IMAGES@*/',   'images',   'src/images.json'),
    ('/*@TEXTURES@*/', 'textures', 'work/textures.json'),
    ('/*@RELIEF@*/',   'relief',   'work/relief.json'),
    ('/*@PANELS@*/',   'panels',   'work/mashrabiya_imp.json'),
    ('/*@MODELS@*/',   'models',   'work/models.json'),
]


def check(js):
    with tempfile.NamedTemporaryFile('w', suffix='.mjs', delete=False, encoding='utf-8') as tf:
        tf.write(re.sub(r'^import .*$', '', js, flags=re.M))
        tmp = tf.name
    r = subprocess.run(['node', '--check', tmp], capture_output=True, text=True)
    os.unlink(tmp)
    if r.returncode != 0:
        sys.stderr.write(r.stderr)
        sys.exit('SYNTAX ERROR in the assembled module — not written')


if SINGLE:
    for marker, _, path in PAYLOADS:
        if marker in main:
            main = main.replace(marker, open(p(path), encoding='utf-8').read().strip())
    check(main)
    mods['__main__'] = base64.b64encode(main.encode('utf-8')).decode('ascii')
    out = head + 'var MODS = ' + json.dumps(mods) + ';' + tail
    dest = p('living-map-v2.html')
    open(dest, 'w', encoding='utf-8').write(out)
    print('living-map-v2.html  %.2f MB (single file)' % (len(out) / 1048576))
    sys.exit(0)

# ---- served build ---------------------------------------------------------
dist = p('dist')
# clear the contents, never the directory itself: a dev server has dist/ as its
# working directory and rmtree pulls the floor out from under it mid-session
os.makedirs(p('dist/vendor'), exist_ok=True)
os.makedirs(p('dist/assets'), exist_ok=True)
for sub in ('vendor', 'assets'):
    for f in os.listdir(p('dist', sub)):
        # assets/props/ holds real GLB files written by gen_props.py, which is a
        # separate and much slower pipeline: clear what this script emits, not
        # what it does not own
        if os.path.isfile(p('dist', sub, f)):
            os.remove(p('dist', sub, f))

sizes = []
for marker, name, path in PAYLOADS:
    if marker not in main:
        continue
    raw = open(p(path), encoding='utf-8').read().strip()
    open(p('dist/assets/%s.json' % name), 'w', encoding='utf-8').write(raw)
    # fetched at module scope: the app already runs inside a top-level await
    main = main.replace(marker, "await (await fetch('assets/%s.json')).json()" % name)
    sizes.append((name, len(raw)))

check(main)
open(p('dist/app.js'), 'w', encoding='utf-8').write(main)

# the prop index is fetched by URL rather than inlined, because the GLBs it
# points at are already real files next to it
if os.path.exists(p('work/props.json')):
    shutil.copyfile(p('work/props.json'), p('dist/assets/props.json'))
    nprops = len(json.load(open(p('work/props.json'), encoding='utf-8')))
    pdir = p('dist/assets/props')
    pbytes = sum(os.path.getsize(os.path.join(pdir, f)) for f in os.listdir(pdir)) \
        if os.path.isdir(pdir) else 0
    sizes.append(('props (%d GLB)' % nprops, pbytes))

imports = {}
for key, b64 in mods.items():
    fn = key.replace('/', '__') + ('' if key.endswith('.js') else '.js')
    open(p('dist/vendor', fn), 'wb').write(base64.b64decode(b64))
    imports[key] = './vendor/' + fn

shell = head.split('<script>')[0] if '<script>' in head else head
# the shell keeps everything up to the loader; the loader becomes an import map
idx = head.rfind('<script>')
shell = head[:idx] if idx > 0 else head
shell += ('<script type="importmap">' + json.dumps({'imports': imports}) + '</script>\n'
          '<script type="module" src="./app.js"></script>\n</body>\n</html>\n')
open(p('dist/index.html'), 'w', encoding='utf-8').write(shell)

# ---- the WebGPU / TSL build ----------------------------------------------
# Standing beside the WebGL2 build rather than replacing it — see WEBGPU_PLAN.md.
# This ran as loose shell commands for a while, which meant the only copy of the
# probe page and the vendored WebGPU modules lived in dist/, and dist/ is
# ignored: one container restart from gone.
gmods = json.load(open(p('src/vendor_gpu.json'), encoding='utf-8'))
if os.path.isdir(p('dist/gpuvendor')):
    shutil.rmtree(p('dist/gpuvendor'))
os.makedirs(p('dist/gpu'), exist_ok=True)
for f in os.listdir(p('dist/gpu')):
    if os.path.isfile(p('dist/gpu', f)):
        os.remove(p('dist/gpu', f))

# vendor_gpu.json keys are already dist-relative paths that mirror the package's
# own layout, so every RELATIVE import inside a vendored module resolves to the
# same place it did in the tarball. That is not tidiness: an import map cannot
# remap a relative specifier, and the flat `addons__Name.js` scheme this
# replaces produced 404s that all looked like missing modules and none were.
for key, b64 in gmods.items():
    dst = p('dist', key)
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    open(dst, 'wb').write(base64.b64decode(b64))

# ONE url per module instance. `three` and `three/webgpu` were once two
# byte-identical copies under two paths; a browser instantiates a module once
# per URL, so TSL's `currentStack` — which Fn() sets and every assign reads —
# existed twice, and MeshStandardNodeMaterial's whole lighting model wrote into
# a stack the builder never read. Everything rendered black.
gimports = {
    'three': './gpuvendor/three.js',
    'three/webgpu': './gpuvendor/three.js',
    'three/tsl': './gpuvendor/three.tsl.js',
    'three/addons/': './gpuvendor/jsm/',      # prefix map: one entry, no traps
}

for f in os.listdir(p('src/gpu')):
    if f.endswith('.js'):
        shutil.copyfile(p('src/gpu', f), p('dist/gpu', f))

for page in ('gpuprobe.html', 'gpuscene.html'):
    src_html = open(p('src', page), encoding='utf-8').read()
    src_html = re.sub(r'<script type="importmap">.*?</script>',
                      '<script type="importmap">'
                      + json.dumps({'imports': gimports}) + '</script>',
                      src_html, count=1, flags=re.S)
    open(p('dist', page), 'w', encoding='utf-8').write(src_html)

total = sum(os.path.getsize(os.path.join(r, f))
            for r, _, fs in os.walk(dist) for f in fs)
src_only = re.sub(r'data:image/\w+;base64,[A-Za-z0-9+/=]+', '<img>', main)
print('dist/  %.2f MB total   app.js %d KB   (app source %d lines)'
      % (total / 1048576, os.path.getsize(p('dist/app.js')) // 1024,
         src_only.count('\n') + 1))
for name, n in sizes:
    print('   assets/%-9s %7d KB' % (name + '.json', n // 1024))
