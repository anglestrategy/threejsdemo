"""List a remote zip's contents without downloading it.

A zip's central directory lives at the end of the file, so two range requests
— the tail, then the directory itself — are enough to enumerate every member
and record where its bytes start. 740 MB stays on the server.
"""
import io, json, re, struct, subprocess, sys

import sys
URL = sys.argv[1] if len(sys.argv) > 1 else 'https://github.com/anglestrategy/threejsdemo/releases/download/glb/glbs.zip'


def rng(a, b):
    r = subprocess.run(['curl', '-sSL', '-H', 'Range: bytes=%d-%d' % (a, b), URL],
                       capture_output=True)
    return r.stdout


# HEAD follows a redirect and reports the redirect's length, not the file's;
# a one-byte range request comes back with Content-Range: bytes 0-0/<total>
hdr = subprocess.run(['curl', '-sSL', '-r', '0-0', '-D', '-', '-o', '/dev/null', URL],
                     capture_output=True).stdout
size = int(re.findall(rb'content-range: bytes 0-0/(\d+)', hdr, re.I)[-1])
print('zip %.1f MB' % (size / 1048576))

tail = rng(size - 65600, size - 1)
i = tail.rfind(b'PK\x05\x06')
if i < 0:
    sys.exit('no EOCD — zip64?')
cdn, cdsz, cdoff = struct.unpack('<HII', tail[i + 10:i + 20])
if cdoff == 0xFFFFFFFF or cdn == 0xFFFF:
    j = tail.rfind(b'PK\x06\x06')
    cdn = struct.unpack('<Q', tail[j + 32:j + 40])[0]
    cdsz, cdoff = struct.unpack('<QQ', tail[j + 40:j + 56])
print('%d entries, directory %d bytes at %d' % (cdn, cdsz, cdoff))

cd = rng(cdoff, cdoff + cdsz - 1)
out, p = [], 0
while p < len(cd) - 4 and cd[p:p + 4] == b'PK\x01\x02':
    meth, = struct.unpack('<H', cd[p + 10:p + 12])
    csz, usz = struct.unpack('<II', cd[p + 20:p + 28])
    nl, el, cl = struct.unpack('<HHH', cd[p + 28:p + 34])
    lho, = struct.unpack('<I', cd[p + 42:p + 46])
    name = cd[p + 46:p + 46 + nl].decode('utf-8', 'replace')
    ex = cd[p + 46 + nl:p + 46 + nl + el]
    if csz == 0xFFFFFFFF or usz == 0xFFFFFFFF or lho == 0xFFFFFFFF:
        q = 0
        while q < len(ex) - 4:
            hid, hsz = struct.unpack('<HH', ex[q:q + 4])
            if hid == 1:
                v, k = ex[q + 4:q + 4 + hsz], 0
                if usz == 0xFFFFFFFF: usz = struct.unpack('<Q', v[k:k + 8])[0]; k += 8
                if csz == 0xFFFFFFFF: csz = struct.unpack('<Q', v[k:k + 8])[0]; k += 8
                if lho == 0xFFFFFFFF: lho = struct.unpack('<Q', v[k:k + 8])[0]
                break
            q += 4 + hsz
    out.append({'name': name, 'method': meth, 'csize': csz, 'usize': usz, 'lho': lho})
    p += 46 + nl + el + cl

json.dump(out, open(sys.argv[2] if len(sys.argv) > 2 else 'work/zipindex.json', 'w'), indent=1)
for e in sorted(out, key=lambda e: e['name']):
    if e['name'].endswith('/'):
        continue
    print('  %8.1f MB  m%d  %s' % (e['usize'] / 1048576, e['method'], e['name']))
