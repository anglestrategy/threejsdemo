#!/usr/bin/env python3
"""Measure SHIMMER: how much a frame changes for a sub-pixel camera move.

    python3 tests/shimmer_metric.py on_a.png on_b.png off_a.png off_b.png

Aliasing is not "high-frequency energy" — real detail has that too, and a
measure that cannot tell them apart rewards blurring. Aliasing is the image
CHANGING when it should not: move the camera by half a pixel and a properly
filtered surface changes by half a pixel's worth, while a point-sampled one
redraws its whole pattern from a new set of random samples. That difference is
the shimmer you see when you walk, and it is directly measurable from two
stills.

So: render each build twice, 26 mm apart along the camera's right — half a
pixel at sixty metres for this frame — and compare |a - b|.

Reported per horizontal band, because the effect is distance-dependent and that
is the check on the fix: the far band must fall a lot and the near band must
hold. A filter that flattens both is blurring, and blurring the near field is a
worse fault than the shimmer it removes.
"""
import sys
import numpy as np
from PIL import Image

LUM = np.array([0.2126, 0.7152, 0.0722])
BANDS = {'near': (0.80, 0.94), 'mid': (0.66, 0.79), 'far': (0.52, 0.65)}


def lum(path):
    return (np.asarray(Image.open(path).convert('RGB'), dtype=np.float64) / 255.0) @ LUM


def delta(pa, pb):
    a, b = lum(pa), lum(pb)
    if a.shape != b.shape:
        raise SystemExit('frames differ in size: %s vs %s' % (a.shape, b.shape))
    d = np.abs(a - b)
    h, w = d.shape
    out = {}
    for k, (y0, y1) in BANDS.items():
        out[k] = float(d[int(h * y0):int(h * y1), int(w * 0.06):int(w * 0.94)].mean())
    return out


def main():
    if len(sys.argv) < 5:
        print(__doc__)
        return 2
    on = delta(sys.argv[1], sys.argv[2])
    off = delta(sys.argv[3], sys.argv[4])
    print('mean |frame(x) - frame(x + 26 mm)| on luminance, 0..1')
    print(f'{"band":6} {"band-limited":>14} {"point-sampled":>15} {"change":>9}')
    for k in ('near', 'mid', 'far'):
        ch = (on[k] - off[k]) / off[k] * 100.0 if off[k] else 0.0
        print(f'{k:6} {on[k]:14.5f} {off[k]:15.5f} {ch:+8.1f}%')
    print()
    print('Lower is less shimmer. Expect far to fall clearly and near to hold.')
    return 0


if __name__ == '__main__':
    sys.exit(main())
