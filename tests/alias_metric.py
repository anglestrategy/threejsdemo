#!/usr/bin/env python3
"""Measure aliasing in a rendered frame, near band versus far band.

    python3 tests/alias_metric.py shots/bl_on.png shots/bl_off.png

The band-limiting is judged by a claim that can be wrong, so it is measured
rather than admired: *high-frequency energy in the far field must fall, and
high-frequency energy in the near field must not*. A filter that lowers both is
not filtering, it is blurring, and blurring the near field is a worse fault
than the shimmer it fixes.

The measure is the mean absolute Laplacian on the luminance — the energy at the
one-pixel scale, which is exactly the scale that cannot be reconstructed and can
only alias. Bands are horizontal strips of the frame: in a street-level shot the
ground runs from the bottom of the frame (near) to the horizon (far), so a strip
near the bottom is a few metres away and a strip just under the horizon is a
hundred, with the same material in both.
"""
import sys
import numpy as np
from PIL import Image

LUM = np.array([0.2126, 0.7152, 0.0722])


def bands(path):
    im = np.asarray(Image.open(path).convert('RGB'), dtype=np.float64) / 255.0
    y = im @ LUM
    h, w = y.shape
    # Laplacian, 4-neighbour
    lap = np.abs(4 * y[1:-1, 1:-1] - y[:-2, 1:-1] - y[2:, 1:-1]
                 - y[1:-1, :-2] - y[1:-1, 2:])
    # the frame's own furniture (title, footer bar) is not the scene
    def strip(a, b):
        return lap[int(h * a):int(h * b), int(w * 0.06):int(w * 0.94)]
    return {
        'near': float(strip(0.80, 0.92).mean()),   # a few metres of ground
        'mid': float(strip(0.68, 0.78).mean()),    # tens of metres
        'far': float(strip(0.58, 0.66).mean()),    # approaching the horizon
    }


def main():
    if len(sys.argv) < 3:
        print(__doc__)
        return 2
    a, b = sys.argv[1], sys.argv[2]
    A, B = bands(a), bands(b)
    print(f'{"band":6} {"A: " + a.split("/")[-1]:>24} {"B: " + b.split("/")[-1]:>24}   change')
    worst = None
    for k in ('near', 'mid', 'far'):
        d = (A[k] - B[k]) / B[k] * 100.0
        print(f'{k:6} {A[k]:24.5f} {B[k]:24.5f}   {d:+7.1f}%')
        if k == 'far':
            worst = d
    print()
    print('A is the band-limited build, B is ?nobl=1. Expect far to fall '
          'clearly and near to hold.')
    return 0 if worst is not None else 1


if __name__ == '__main__':
    sys.exit(main())
