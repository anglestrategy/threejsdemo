#!/usr/bin/env python3
"""Assemble living-map-v2.html from src/.

src/shell_head.html  – everything up to `var MODS = `
src/vendor_mods.json – three.js + addons, already base64
src/main.js          – the app source (editable); `/*@IMAGES@*/` is replaced
src/images.json      – the four embedded SDC renders as data URIs
src/shell_tail.html  – the module-loader bootstrap

Deliverable is exactly one self-contained file that runs from file://.
"""
import base64
import json
import os
import re
import sys

ROOT = os.path.dirname(os.path.abspath(__file__))
p = lambda *a: os.path.join(ROOT, *a)

head = open(p('src/shell_head.html'), encoding='utf-8').read()
tail = open(p('src/shell_tail.html'), encoding='utf-8').read()
mods = json.load(open(p('src/vendor_mods.json'), encoding='utf-8'))
main = open(p('src/main.js'), encoding='utf-8').read()
images = open(p('src/images.json'), encoding='utf-8').read().strip()

if '/*@IMAGES@*/' not in main:
    sys.exit('main.js is missing the /*@IMAGES@*/ marker')
main = main.replace('/*@IMAGES@*/', images)

if '/*@DISTRICT@*/' in main:
    d = open(p('src/district.js'), encoding='utf-8').read()
    if '/*@DISTRICT_CONTENT@*/' in d:
        parts = sorted(f for f in os.listdir(p('src')) if f.startswith('district_content'))
        d = d.replace('/*@DISTRICT_CONTENT@*/',
                      '\n'.join(open(p('src', f), encoding='utf-8').read() for f in parts))
    main = main.replace('/*@DISTRICT@*/', d)

if '/*@RELIEF@*/' in main:
    main = main.replace('/*@RELIEF@*/', open(p('work/relief.json'), encoding='utf-8').read().strip())

mods['__main__'] = base64.b64encode(main.encode('utf-8')).decode('ascii')
out = head + 'var MODS = ' + json.dumps(mods) + ';' + tail
dest = p(sys.argv[1] if len(sys.argv) > 1 else 'living-map-v2.html')
open(dest, 'w', encoding='utf-8').write(out)

src_only = re.sub(r'data:image/jpeg;base64,[A-Za-z0-9+/=]+', '<jpeg>', main)
print('%s  %.2f MB   (app source %d lines / %d KB)'
      % (os.path.basename(dest), len(out) / 1048576,
         src_only.count('\n') + 1, len(src_only) // 1024))
