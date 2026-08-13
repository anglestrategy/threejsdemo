#!/usr/bin/env python3
"""Index a remote zip's members without downloading it.

    python3 gen_zipindex.py <url> <work/zipindex3.json>

The GLB archives in the release are 500-700 MB each and hold a couple of dozen
members, of which the build wants a handful. A zip's central directory is at the
END of the file and every entry in it carries that member's offset and
compressed size, so three HTTP range requests — the EOCD, the directory, then
the member — are enough to pull one 90 MB model out of a 588 MB archive without
touching the other 498.

This existed as a shell one-liner for two archives and was about to be typed a
third time. `gen_props.py` reads whatever indexes are listed in its `ZIPS` map
and remembers which archive each member came from, so adding a batch is: run
this, add one line there.
"""
import json
import os
import struct
import subprocess
import sys


def rng(url, a, b):
    r = subprocess.run(['curl', '-sSL', '-H', 'Range: bytes=%d-%d' % (a, b), url],
                       capture_output=True)
    return r.stdout


def size_of(url):
    """Total size, from a one-byte range request rather than a HEAD.

    A HEAD against a GitHub release asset follows a redirect to object storage
    and comes back `Content-Length: 0` — the length of the redirect body, not of
    the asset. A ranged GET returns `Content-Range: bytes 0-0/<total>`, which is
    the number actually wanted and is one byte of traffic."""
    r = subprocess.run(['curl', '-sSL', '-D', '-', '-o', os.devnull,
                        '-H', 'Range: bytes=0-0', url], capture_output=True, text=True)
    for line in r.stdout.splitlines():
        if line.lower().startswith('content-range:') and '/' in line:
            return int(line.rsplit('/', 1)[1].strip())
    sys.exit('could not read Content-Range for ' + url)


def index(url):
    total = size_of(url)
    # the EOCD is within the last 64 KB unless there is a comment longer than that
    tail = rng(url, max(0, total - 65536), total - 1)
    p = tail.rfind(b'PK\x05\x06')
    if p < 0:
        sys.exit('no EOCD found')
    n_entries, cd_size, cd_off = struct.unpack('<HII', tail[p + 10:p + 20])

    """Archive.3.zip is zip64 and the classic EOCD it still writes carries
    0xFFFFFFFF sentinels instead of the real offsets — the actual values live in
    a Zip64 EOCD record that the locator just before the classic one points at.
    Without this the directory offset reads as 4 GB and the range request comes
    back empty, which looks like a network failure and is not one."""
    q = tail.rfind(b'PK\x06\x07')          # zip64 EOCD locator
    if q >= 0 and (cd_off == 0xFFFFFFFF or n_entries == 0xFFFF or cd_size == 0xFFFFFFFF):
        z64_off = struct.unpack('<Q', tail[q + 8:q + 16])[0]
        z64 = rng(url, z64_off, z64_off + 55)
        if z64[:4] == b'PK\x06\x06':
            n_entries = struct.unpack('<Q', z64[32:40])[0]
            cd_size = struct.unpack('<Q', z64[40:48])[0]
            cd_off = struct.unpack('<Q', z64[48:56])[0]
    cd = rng(url, cd_off, cd_off + cd_size - 1)

    out, off = [], 0
    for _ in range(n_entries):
        if cd[off:off + 4] != b'PK\x01\x02':
            break
        (method, csize, usize, nlen, elen, clen, lho) = struct.unpack(
            '<H', cd[off + 10:off + 12])[0], \
            struct.unpack('<I', cd[off + 20:off + 24])[0], \
            struct.unpack('<I', cd[off + 24:off + 28])[0], \
            struct.unpack('<H', cd[off + 28:off + 30])[0], \
            struct.unpack('<H', cd[off + 30:off + 32])[0], \
            struct.unpack('<H', cd[off + 32:off + 34])[0], \
            struct.unpack('<I', cd[off + 42:off + 46])[0]
        name = cd[off + 46:off + 46 + nlen].decode('utf-8', 'replace')
        extra = cd[off + 46 + nlen:off + 46 + nlen + elen]
        # zip64 extended information: the 0xFFFFFFFF sentinels in the fixed
        # fields mean the real values are in extra field 0x0001, in the order
        # uncompressed, compressed, local-header-offset — each present ONLY if
        # its fixed field was sentinelled, so the parse is positional
        eo = 0
        while eo + 4 <= len(extra):
            hid, hsz = struct.unpack('<HH', extra[eo:eo + 4])
            if hid == 0x0001:
                body, bo = extra[eo + 4:eo + 4 + hsz], 0
                if usize == 0xFFFFFFFF and bo + 8 <= len(body):
                    usize = struct.unpack('<Q', body[bo:bo + 8])[0]; bo += 8
                if csize == 0xFFFFFFFF and bo + 8 <= len(body):
                    csize = struct.unpack('<Q', body[bo:bo + 8])[0]; bo += 8
                if lho == 0xFFFFFFFF and bo + 8 <= len(body):
                    lho = struct.unpack('<Q', body[bo:bo + 8])[0]; bo += 8
                break
            eo += 4 + hsz
        if not name.endswith('/'):
            out.append({'name': os.path.basename(name), 'path': name,
                        'method': method, 'csize': csize, 'usize': usize,
                        'lho': lho})
        off += 46 + nlen + elen + clen
    return out, total


def main():
    if len(sys.argv) < 3:
        sys.exit(__doc__)
    url, dest = sys.argv[1], sys.argv[2]
    entries, total = index(url)
    os.makedirs(os.path.dirname(dest) or '.', exist_ok=True)
    json.dump(entries, open(dest, 'w'), indent=1)
    print('%s  %.1f MB  %d members -> %s'
          % (url.rsplit('/', 1)[-1], total / 1048576, len(entries), dest))
    for e in sorted(entries, key=lambda x: -x['usize']):
        print('  %-64s %7.1f MB' % (e['name'][:64], e['usize'] / 1048576))


main()
