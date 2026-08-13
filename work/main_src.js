/* ===========================================================================
   SDC · THE LIVING MAP  —  «لكل مدينة حكاية» / Every City Has a Story
   Kingdom of Saudi Arabia at dusk as one living relief model.
   =========================================================================== */

import * as THREE from 'three';
import { OrbitControls } from 'addons/OrbitControls.js';
import { CSS2DRenderer, CSS2DObject } from 'addons/CSS2DRenderer.js';
import { EffectComposer } from 'addons/EffectComposer.js';
import { RenderPass } from 'addons/RenderPass.js';
import { UnrealBloomPass } from 'addons/UnrealBloomPass.js';
import { ShaderPass } from 'addons/ShaderPass.js';
import { OutputPass } from 'addons/OutputPass.js';
import { FXAAShader } from 'addons/FXAAShader.js';

const MAP = {"d":"M825.9,684.9L814.6,686.6L803.8,688.2L791.6,690.0L776.9,692.2L765.4,693.8L748.6,696.3L733.6,698.5L719.5,700.6L705.3,702.7L693.3,704.5L686.1,706.6L677.7,711.0L664.7,718.0L651.5,725.0L644.9,728.7L637.7,738.1L634.1,742.8L627.4,751.4L622.4,757.9L616.6,765.6L614.0,772.6L610.1,783.2L606.7,785.9L601.0,789.3L595.9,791.8L587.8,791.5L583.4,784.9L578.4,778.0L576.0,775.2L574.0,775.0L565.9,775.9L556.2,777.0L544.9,775.9L531.7,774.5L519.3,773.3L513.2,772.4L505.1,767.9L503.1,767.0L500.9,766.8L491.4,766.6L481.8,766.5L472.3,768.0L463.2,767.4L453.8,768.2L450.3,770.0L446.7,769.9L444.3,771.4L442.5,772.1L439.9,770.8L437.0,771.1L432.7,770.0L429.8,767.1L427.2,764.4L424.5,763.0L421.4,762.2L418.7,762.1L415.2,763.7L413.2,765.3L407.9,770.3L407.7,772.1L410.1,775.1L409.2,776.6L406.2,778.4L405.3,783.2L404.8,785.8L404.3,792.1L405.7,797.0L407.5,798.9L407.7,801.0L406.7,805.3L403.8,806.6L401.7,810.6L400.3,812.5L398.1,814.7L389.2,821.9L388.7,817.7L386.0,811.5L385.8,807.1L384.4,802.7L382.0,799.4L377.6,796.0L377.1,791.2L373.8,786.4L369.5,782.6L367.0,775.7L365.2,766.3L353.8,754.1L339.4,742.9L334.9,736.5L327.7,723.5L324.1,713.3L314.6,701.5L314.2,697.0L312.7,691.4L310.4,685.3L309.2,680.4L299.5,659.1L296.4,655.8L293.7,651.0L293.0,647.3L292.1,645.3L285.4,641.8L278.9,632.9L259.9,618.6L250.5,617.3L243.2,612.2L237.7,605.5L231.8,594.1L221.6,581.8L213.0,564.2L215.8,557.8L215.6,553.3L212.8,545.7L209.9,539.9L207.9,534.4L209.6,526.4L210.1,517.6L211.8,512.9L213.0,507.7L211.5,497.3L208.6,491.8L208.9,488.0L205.7,486.2L202.9,482.2L205.7,482.2L200.7,476.6L198.8,473.6L196.9,465.9L194.5,460.1L186.8,446.9L183.0,438.9L174.7,428.5L165.6,420.8L159.9,417.4L157.2,414.2L152.4,414.1L147.3,409.5L143.7,409.4L139.2,408.7L133.9,399.9L129.5,391.8L121.9,381.1L123.8,378.3L126.0,373.8L125.0,367.9L123.8,363.9L120.5,356.5L109.6,338.3L106.7,335.6L102.1,332.5L99.3,324.6L97.9,317.5L90.4,314.1L77.7,288.5L70.2,279.6L67.3,273.6L58.7,263.7L54.6,253.8L45.9,244.8L38.4,229.1L26.9,213.4L21.9,210.6L10.1,209.6L5.0,208.4L0.3,211.8L0.0,207.5L3.3,201.4L7.7,188.7L8.7,177.6L15.9,144.6L26.0,146.3L34.4,147.7L46.6,149.8L59.2,151.9L66.6,153.1L69.0,152.6L79.3,144.5L88.5,137.2L94.0,128.3L99.3,119.6L101.7,117.8L109.9,116.3L122.9,113.7L135.8,111.1L136.6,110.3L139.7,103.3L143.5,94.5L144.3,93.6L145.2,92.7L154.5,87.8L159.9,84.8L152.1,76.0L144.5,67.7L136.1,58.3L129.1,51.1L118.3,40.2L111.5,33.1L123.6,29.7L136.8,26.1L150.2,22.4L166.3,17.9L178.8,14.5L197.6,9.3L206.7,6.8L208.4,6.2L215.4,0.0L226.0,1.7L242.0,4.3L257.4,6.8L273.6,9.7L278.9,12.1L294.5,20.8L304.8,26.5L316.6,33.2L331.5,41.5L341.6,47.2L354.8,54.5L364.9,62.9L377.9,73.4L392.0,85.0L403.6,94.1L419.7,106.5L435.6,118.7L451.0,130.8L463.5,140.4L479.1,152.5L480.5,153.0L496.2,154.3L517.6,156.2L539.0,158.0L558.4,159.8L566.8,158.0L575.9,159.1L588.2,160.7L595.5,161.7L609.6,163.6L613.9,171.5L615.4,177.1L616.8,182.5L620.9,187.4L630.5,187.3L638.9,187.2L649.3,187.0L657.7,186.9L660.3,191.8L661.5,196.7L666.4,208.3L673.5,217.4L675.0,220.6L676.2,225.6L675.0,227.5L674.5,229.6L679.6,234.6L688.4,238.7L691.6,239.8L695.4,241.7L692.5,244.5L697.6,251.2L703.4,257.9L709.8,259.5L718.3,269.7L731.0,276.3L738.9,285.0L738.2,285.2L735.8,284.3L733.0,283.1L732.2,284.2L732.2,287.8L733.0,292.1L737.0,295.8L740.6,298.4L742.0,303.5L739.0,314.3L738.2,314.3L736.3,313.3L734.2,313.2L733.2,313.8L735.6,321.6L737.8,327.6L740.8,332.3L743.2,339.2L745.0,342.1L753.4,349.6L755.8,355.7L758.2,367.2L763.4,373.6L766.3,378.6L770.0,382.7L772.4,388.4L775.9,392.9L777.7,393.9L780.3,394.4L783.7,394.4L787.7,393.3L792.0,392.2L795.4,394.4L798.8,394.1L799.1,396.2L796.9,399.0L794.0,406.1L798.1,407.3L801.9,407.8L804.8,409.0L806.3,409.0L806.3,410.4L806.5,417.2L807.5,419.8L809.2,422.0L811.8,425.5L814.4,428.9L817.1,432.3L819.7,435.7L822.3,439.1L825.0,442.6L827.6,445.9L830.1,449.4L832.7,452.8L835.4,456.3L838.0,459.6L840.6,463.0L843.3,466.5L845.9,469.9L848.5,473.3L851.0,476.7L853.3,479.5L857.2,480.1L858.6,480.3L862.2,480.7L867.6,481.5L875.0,482.4L883.6,483.6L893.2,484.9L903.4,486.2L914.0,487.7L924.7,489.1L934.8,490.5L944.3,491.8L953.1,492.9L960.3,493.9L965.9,494.7L969.5,495.1L970.7,495.3L974.5,495.8L975.2,495.6L978.4,491.5L981.8,497.4L984.8,502.3L988.7,509.1L993.0,516.2L997.1,523.0L1000.0,528.2L998.5,533.4L996.7,539.2L995.0,544.9L993.2,550.7L991.4,556.5L989.7,562.3L988.0,568.1L986.3,573.8L984.4,579.6L982.7,585.4L981.0,591.2L979.3,596.9L977.6,602.7L975.9,608.5L974.0,614.3L972.3,620.0L970.5,625.8L968.5,632.8L963.4,634.6L955.3,637.6L947.1,640.6L938.9,643.5L930.7,646.6L922.4,649.6L914.4,652.6L906.2,655.6L897.9,658.6L889.7,661.6L881.5,664.5L873.5,667.5L865.2,670.5L857.0,673.5L848.8,676.5L840.8,679.5L832.5,682.5L825.9,684.9Z","W":1000,"H":821.9,"pts":[{"name":"Al Khobar","x":741.2,"y":304.9,"lit":1},{"name":"Madinah","x":237.5,"y":399.4,"lit":1},{"name":"Al Ahsa","x":712.2,"y":351.9,"lit":0},{"name":"Buraydah","x":444.9,"y":302.3,"lit":0},{"name":"Hail","x":336.5,"y":240.3,"lit":0},{"name":"Taif","x":276.1,"y":566.3,"lit":0},{"name":"Arar","x":304.6,"y":59.8,"lit":0},{"name":"Dumat Al Jandal","x":249.9,"y":120.8,"lit":0},{"name":"Tabuk","x":92.9,"y":195.4,"lit":0},{"name":"Al Baha","x":326,"y":632,"lit":0},{"name":"Jizan","x":377.4,"y":794.8,"lit":0},{"name":"Najran","x":457.3,"y":759.3,"lit":0}]};
const IMG = {"khobar1": "data:image/jpeg;base64,<<STRIPPED>>", "khobar2": "data:image/jpeg;base64,<<STRIPPED>>", "madinah1": "data:image/jpeg;base64,<<STRIPPED>>", "madinah2": "data:image/jpeg;base64,<<STRIPPED>>"};

/* ------------------------------------------------------------------ palette */
const P = {
  void:      0x06121f,
  navy:      0x142a4b,
  navyDeep:  0x0a1a30,
  amber:     0xe8a25b,
  rose:      0xc96f5e,
  sandLo:    0x8a6f52,
  sandHi:    0xc9a97c,
  rust:      0x7a4a3a,
  sage:      0x5d7263,
  mint:      0x7bdeca,
  beacon:    0xffe9c4,
  haze:      0x203c5c,
};
const C = (h) => new THREE.Color(h);

/* --------------------------------------------------------------- seeded rng */
function mulberry32(a) {
  return function () {
    a |= 0; a = a + 0x6D2B79F5 | 0;
    let t = Math.imul(a ^ a >>> 15, 1 | a);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}
const SEED = 20260811;
const T0 = performance.now(); const TM = {}; const mark = (k) => { TM[k] = Math.round(performance.now() - T0); };
const rng = mulberry32(SEED);

/* ------------------------------------------------------- simplex noise (2D) */
const NoiseGen = (function () {
  const r = mulberry32(SEED ^ 0x9e3779b9);
  const perm = new Uint8Array(512), p = new Uint8Array(256);
  for (let i = 0; i < 256; i++) p[i] = i;
  for (let i = 255; i > 0; i--) { const j = (r() * (i + 1)) | 0; const t = p[i]; p[i] = p[j]; p[j] = t; }
  for (let i = 0; i < 512; i++) perm[i] = p[i & 255];
  const grad = [[1,1],[-1,1],[1,-1],[-1,-1],[1,0],[-1,0],[0,1],[0,-1]];
  const F2 = 0.5 * (Math.sqrt(3) - 1), G2 = (3 - Math.sqrt(3)) / 6;
  function noise(xin, yin) {
    const s = (xin + yin) * F2;
    let i = Math.floor(xin + s), j = Math.floor(yin + s);
    const t = (i + j) * G2;
    const X0 = i - t, Y0 = j - t;
    const x0 = xin - X0, y0 = yin - Y0;
    let i1, j1;
    if (x0 > y0) { i1 = 1; j1 = 0; } else { i1 = 0; j1 = 1; }
    const x1 = x0 - i1 + G2, y1 = y0 - j1 + G2;
    const x2 = x0 - 1 + 2 * G2, y2 = y0 - 1 + 2 * G2;
    i &= 255; j &= 255;
    let n = 0;
    let t0 = 0.5 - x0 * x0 - y0 * y0;
    if (t0 > 0) { const g = grad[perm[i + perm[j]] & 7]; t0 *= t0; n += t0 * t0 * (g[0] * x0 + g[1] * y0); }
    let t1 = 0.5 - x1 * x1 - y1 * y1;
    if (t1 > 0) { const g = grad[perm[i + i1 + perm[j + j1]] & 7]; t1 *= t1; n += t1 * t1 * (g[0] * x1 + g[1] * y1); }
    let t2 = 0.5 - x2 * x2 - y2 * y2;
    if (t2 > 0) { const g = grad[perm[i + 1 + perm[j + 1]] & 7]; t2 *= t2; n += t2 * t2 * (g[0] * x2 + g[1] * y2); }
    return 70 * n;
  }
  return noise;
})();
const nz = NoiseGen;
function fbm(x, y, oct, gain = 0.5, lac = 2.02) {
  let a = 1, f = 1, s = 0, na = 0;
  for (let i = 0; i < oct; i++) { s += a * nz(x * f, y * f); na += a; a *= gain; f *= lac; }
  return s / na;
}
function ridged(x, y, oct) {
  let a = 1, f = 1, s = 0, na = 0;
  for (let i = 0; i < oct; i++) { s += a * (1 - Math.abs(nz(x * f, y * f))); na += a; a *= 0.5; f *= 2.03; }
  return s / na;
}
const clamp = (v, a, b) => v < a ? a : v > b ? b : v;
function sstep(a, b, x) { const t = clamp((x - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); }
const mix = (a, b, t) => a + (b - a) * t;

/* ============================================================== 1. GEOMETRY
   Parse the Kingdom outline, build an exact signed-distance field, and
   classify which stretches of coast face the Red Sea and which the Gulf.
   ========================================================================= */
const W = MAP.W, H = MAP.H;
const SCALE = 0.2;                                   // plane units -> world
const CX = W / 2, CY = H / 2;
const px2wx = (px) => (px - CX) * SCALE;
const py2wz = (py) => (py - CY) * SCALE;

const RING = (function parsePath(d) {
  const pts = [];
  const re = /([ML])\s*(-?[\d.]+)[,\s]+(-?[\d.]+)/g;
  let m;
  while ((m = re.exec(d))) pts.push([parseFloat(m[2]), parseFloat(m[3])]);
  // drop duplicate closing point
  if (pts.length > 1) {
    const a = pts[0], b = pts[pts.length - 1];
    if (Math.abs(a[0] - b[0]) < 1e-6 && Math.abs(a[1] - b[1]) < 1e-6) pts.pop();
  }
  return pts;
})(MAP.d);
const N = RING.length;

// --- coast classification -------------------------------------------------
// walk the ring; the stretch between the westernmost vertex (Gulf of Aqaba)
// and the southernmost vertex (Yemen border) that keeps to the west is the
// Red Sea coast. The Gulf coast is the eastern run around the max-x vertex.
const SEG_KIND = new Uint8Array(N);   // 0 = inland border, 1 = Red Sea, 2 = Gulf
(function classify() {
  let iW = 0, iS = 0, iE = 0;
  for (let i = 0; i < N; i++) {
    if (RING[i][0] < RING[iW][0]) iW = i;
    if (RING[i][1] > RING[iS][1]) iS = i;
    if (RING[i][0] > RING[iE][0]) iE = i;
  }
  // two candidate runs from iW to iS
  const runA = [], runB = [];
  for (let i = iW; ; i = (i + 1) % N) { runA.push(i); if (i === iS) break; }
  for (let i = iW; ; i = (i - 1 + N) % N) { runB.push(i); if (i === iS) break; }
  const avgX = (r) => r.reduce((s, i) => s + RING[i][0], 0) / r.length;
  const red = avgX(runA) < avgX(runB) ? runA : runB;
  for (const i of red) if (RING[i][0] < 540) SEG_KIND[i] = 1;
  // Gulf: eastern seaboard band around iE
  for (let k = -140; k <= 140; k++) {
    const i = (iE + k + N * 2) % N;
    const x = RING[i][0], y = RING[i][1];
    if (x > 605 && y > 190 && y < 420) SEG_KIND[i] = 2;
  }
})();

/* ---- SDF raster ---------------------------------------------------------- */
const PAD = 190;                     // plane units of surround
const RX0 = -PAD, RY0 = -PAD, RX1 = W + PAD, RY1 = H + PAD;
const GW = 600, GH = Math.round(GW * (RY1 - RY0) / (RX1 - RX0));
const cellX = (RX1 - RX0) / GW, cellY = (RY1 - RY0) / GH;
const SDF = new Float32Array(GW * GH);      // signed distance, + inside
const SEA = new Float32Array(GW * GH);      // 0 void, 1 red sea, 2 gulf
const RED_A = new Float32Array(GW * GH);
const GULF_A = new Float32Array(GW * GH);

// segment bucket grid for fast nearest-segment queries
const BW = 42, BH = 36;
const buckets = new Array(BW * BH);
for (let i = 0; i < BW * BH; i++) buckets[i] = [];
(function fillBuckets() {
  const bx = (x) => clamp(Math.floor((x - RX0) / (RX1 - RX0) * BW), 0, BW - 1);
  const by = (y) => clamp(Math.floor((y - RY0) / (RY1 - RY0) * BH), 0, BH - 1);
  for (let i = 0; i < N; i++) {
    const a = RING[i], b = RING[(i + 1) % N];
    const x0 = bx(Math.min(a[0], b[0])), x1 = bx(Math.max(a[0], b[0]));
    const y0 = by(Math.min(a[1], b[1])), y1 = by(Math.max(a[1], b[1]));
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) buckets[y * BW + x].push(i);
  }
})();

function nearestSeg(px, py) {
  const bxf = (px - RX0) / (RX1 - RX0) * BW, byf = (py - RY0) / (RY1 - RY0) * BH;
  const cxi = clamp(Math.floor(bxf), 0, BW - 1), cyi = clamp(Math.floor(byf), 0, BH - 1);
  let best = Infinity, bestI = 0;
  const MAXRING = 7;
  for (let ring = 0; ring <= MAXRING; ring++) {
    // once we have a candidate closer than the ring's guaranteed reach, stop
    if (best < Infinity) {
      const reach = (ring - 1) * Math.min((RX1 - RX0) / BW, (RY1 - RY0) / BH);
      if (reach > 0 && best <= reach * reach) break;
    }
    for (let y = cyi - ring; y <= cyi + ring; y++) {
      if (y < 0 || y >= BH) continue;
      for (let x = cxi - ring; x <= cxi + ring; x++) {
        if (x < 0 || x >= BW) continue;
        if (ring > 0 && Math.abs(x - cxi) !== ring && Math.abs(y - cyi) !== ring) continue;
        const list = buckets[y * BW + x];
        for (let k = 0; k < list.length; k++) {
          const i = list[k], a = RING[i], b = RING[(i + 1) % N];
          const dx = b[0] - a[0], dy = b[1] - a[1];
          const l2 = dx * dx + dy * dy || 1e-9;
          let t = ((px - a[0]) * dx + (py - a[1]) * dy) / l2;
          t = t < 0 ? 0 : t > 1 ? 1 : t;
          const qx = a[0] + t * dx - px, qy = a[1] + t * dy - py;
          const d2 = qx * qx + qy * qy;
          if (d2 < best) { best = d2; bestI = i; }
        }
      }
    }
  }
  if (best === Infinity) return { d: 260, i: bestI };
  return { d: Math.min(Math.sqrt(best), 260), i: bestI };
}

function insidePoly(px, py) {
  let inside = false;
  for (let i = 0, j = N - 1; i < N; j = i++) {
    const a = RING[i], b = RING[j];
    if (((a[1] > py) !== (b[1] > py)) &&
        (px < (b[0] - a[0]) * (py - a[1]) / (b[1] - a[1]) + a[0])) inside = !inside;
  }
  return inside;
}

mark('parse');
(function buildSDF() {
  // scanline inside-mask
  const insideMask = new Uint8Array(GW * GH);
  const xs = [];
  for (let gy = 0; gy < GH; gy++) {
    const py = RY0 + (gy + 0.5) * cellY;
    xs.length = 0;
    for (let i = 0, j = N - 1; i < N; j = i++) {
      const a = RING[i], b = RING[j];
      if ((a[1] > py) !== (b[1] > py)) xs.push((b[0] - a[0]) * (py - a[1]) / (b[1] - a[1]) + a[0]);
    }
    xs.sort((p, q) => p - q);
    for (let k = 0; k + 1 < xs.length; k += 2) {
      let g0 = Math.ceil((xs[k] - RX0) / cellX - 0.5), g1 = Math.floor((xs[k + 1] - RX0) / cellX - 0.5);
      g0 = Math.max(0, g0); g1 = Math.min(GW - 1, g1);
      for (let gx = g0; gx <= g1; gx++) insideMask[gy * GW + gx] = 1;
    }
  }
  for (let gy = 0; gy < GH; gy++) {
    const py = RY0 + (gy + 0.5) * cellY;
    for (let gx = 0; gx < GW; gx++) {
      const px = RX0 + (gx + 0.5) * cellX;
      const ns = nearestSeg(px, py);
      const idx = gy * GW + gx;
      const ins = insideMask[idx] === 1;
      SDF[idx] = ins ? ns.d : -ns.d;
      SEA[idx] = SEG_KIND[ns.i];
      if (!ins) {
        if (SEG_KIND[ns.i] === 1) RED_A[idx] = 1;
        else if (SEG_KIND[ns.i] === 2) GULF_A[idx] = 1;
      }
    }
  }
})();

// kind of the nearest boundary run: 0 inland border, 1 Red Sea, 2 Gulf
function kindAt(px, py) {
  const gx = clamp(Math.round((px - RX0) / cellX - 0.5), 0, GW - 1);
  const gy = clamp(Math.round((py - RY0) / cellY - 0.5), 0, GH - 1);
  return SEA[gy * GW + gx];
}
mark('sdf');
// soften the sea-region borders so no hard classification seam is visible
(function blurSeaMasks() {
  const tmp = new Float32Array(GW * GH);
  for (const F of [RED_A, GULF_A]) {
    for (let pass = 0; pass < 2; pass++) {
      for (let y = 0; y < GH; y++) for (let x = 0; x < GW; x++) {
        let sum = 0, n = 0;
        for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
          const yy = y + dy, xx = x + dx;
          if (yy < 0 || yy >= GH || xx < 0 || xx >= GW) continue;
          sum += F[yy * GW + xx]; n++;
        }
        tmp[y * GW + x] = sum / n;
      }
      F.set(tmp);
    }
  }
})();
mark('blur');
function sdfAt(px, py) {
  const fx = clamp((px - RX0) / cellX - 0.5, 0, GW - 1.001);
  const fy = clamp((py - RY0) / cellY - 0.5, 0, GH - 1.001);
  const x0 = fx | 0, y0 = fy | 0, tx = fx - x0, ty = fy - y0;
  const i0 = y0 * GW + x0, i1 = i0 + GW;
  return mix(mix(SDF[i0], SDF[i0 + 1], tx), mix(SDF[i1], SDF[i1 + 1], tx), ty);
}

/* ============================================================== 2. ELEVATION
   Hejaz/Asir spine along the west, Najd plateau centre, Nafud dunes north,
   Rub' al Khali ridges south-east, flat low Gulf coast east.
   ========================================================================= */
const SPINE = [[86,152],[120,206],[155,262],[186,320],[214,378],[240,436],[262,492],[278,548],[298,606],[325,662],[354,718],[386,776],[414,812]];
const SPINE_LEN = (function () {
  const cum = [0];
  for (let i = 1; i < SPINE.length; i++) {
    const dx = SPINE[i][0] - SPINE[i - 1][0], dy = SPINE[i][1] - SPINE[i - 1][1];
    cum.push(cum[i - 1] + Math.hypot(dx, dy));
  }
  return cum;
})();
const SPINE_TOTAL = SPINE_LEN[SPINE_LEN.length - 1];

function spineInfo(px, py) {
  let best = Infinity, bt = 0, bside = 1;
  for (let i = 0; i + 1 < SPINE.length; i++) {
    const a = SPINE[i], b = SPINE[i + 1];
    const dx = b[0] - a[0], dy = b[1] - a[1];
    const l2 = dx * dx + dy * dy;
    let t = ((px - a[0]) * dx + (py - a[1]) * dy) / l2;
    t = clamp(t, 0, 1);
    const qx = a[0] + t * dx, qy = a[1] + t * dy;
    const d = Math.hypot(px - qx, py - qy);
    if (d < best) {
      best = d; bt = (SPINE_LEN[i] + t * Math.hypot(dx, dy)) / SPINE_TOTAL;
      const cross = dx * (py - a[1]) - dy * (px - a[0]);
      bside = cross > 0 ? 1 : -1;   // +1 east of spine, -1 west
    }
  }
  return { d: best, t: bt, side: bside };
}

function spineX(py) {
  if (py <= SPINE[0][1]) return SPINE[0][0];
  for (let i = 0; i + 1 < SPINE.length; i++) {
    const a = SPINE[i], b = SPINE[i + 1];
    if (py <= b[1]) return mix(a[0], b[0], (py - a[1]) / (b[1] - a[1]));
  }
  return SPINE[SPINE.length - 1][0];
}
// isolated massifs so the interior is not one single ridge
const MASSIF = [
  [138, 158, 124, 0.58],   // Midian / Tabuk highlands
  [330, 238, 92, 0.46],    // Jebel Shammar (Hail)
  [470, 706, 132, 0.44],   // eastern Asir shoulder / Najran
  [566, 452, 168, 0.19],   // Najd swells
  [300, 448, 98, 0.28],    // Harrat volcanic field east of Madinah
  [408, 336, 120, 0.16],   // Qassim rise
];

const ELEV_MAX = 15.8;     // world units for elevation 1.0
const CLIFF = 7.6;         // world units the edge falls away

// raw elevation 0..~1.35 in plane space (ignores coast clipping)
function rawElev(px, py) {
  const sp = spineInfo(px, py);
  const sx = spineX(py);
  const dxE = px - sx;                       // + east of the spine

  // ---- regional base: high shoulder just east of the spine, sinking to the Gulf
  let base;
  if (dxE >= 0) base = 0.315 * Math.exp(-dxE / 430);
  else base = 0.315 * Math.exp(dxE / 62);
  base *= 0.80 + 0.42 * fbm(px * 0.0040 + 11, py * 0.0040 - 4, 3);

  // ---- Hejaz / Asir spine: modest north, towering in the south-west
  let amp = 0.36 + 0.42 * sstep(0.08, 0.76, sp.t);
  amp -= 0.24 * sstep(0.90, 1.0, sp.t);
  amp *= 0.88 + 0.24 * fbm(px * 0.0072, py * 0.0072, 3);
  const halfW = sp.side < 0 ? 62 : 74;
  const gauss = Math.exp(-Math.pow(sp.d / halfW, sp.side < 0 ? 1.7 : 1.15));
  // along-strike undulation: distinct massifs separated by passes
  const undul = 0.58 + 0.52 * (0.5 + 0.5 * Math.sin(sp.t * 27.0 + 2.2 * fbm(px * 0.0055, py * 0.0055, 2)));
  // broad articulated crest
  const crest = 0.58 + 0.56 * ridged(px * 0.0105, py * 0.0105, 3);
  let ridge = amp * gauss * undul * crest;
  const westF = sp.side < 0 ? gauss : 0;
  // parallel fold ranges stepping east off the main crest
  for (let k = 1; k <= 3; k++) {
    const off = k * 40;
    const dd = Math.abs(sp.d - off);
    const sub = amp * (0.34 - k * 0.06) * Math.exp(-Math.pow(dd / (23 + k * 7), 1.4));
    ridge += (sp.side > 0 ? sub : sub * 0.22) * (0.55 + 0.70 * ridged(px * 0.026 + k * 9, py * 0.021, 3));
  }

  // ---- massifs
  let mass = 0, massN = -1;
  for (let i = 0; i < MASSIF.length; i++) {
    const m = MASSIF[i];
    const dd = Math.hypot(px - m[0], py - m[1]) / m[2];
    if (dd > 2.1) continue;
    if (massN < 0) massN = 0.62 + 0.66 * ridged(px * 0.019, py * 0.019, 3);
    mass += m[3] * Math.exp(-Math.pow(dd, 1.8)) * massN;
  }

  // ---- Tuwaiq escarpment: a long north-south scarp through the centre
  const scarpX = 512 + 62 * Math.sin((py - 180) / 260) + 24 * fbm(py * 0.010, 3.3, 2);
  const scarp = 0.155 * sstep(scarpX + 18, scarpX - 10, px) * sstep(110, 250, py) * sstep(790, 640, py);

  // ---- Nafud sand seas (north)
  const nafud = sstep(340, 165, py) * sstep(150, 310, px);
  const nafudR = 0.090 * nafud * Math.pow(0.5 + 0.5 * Math.sin((px * 0.60 + py * 0.92) * 0.030 + 3 * fbm(px * 0.0038, py * 0.0038, 2)), 1.3);

  // ---- Rub' al Khali linear dunes (south-east)
  const rak = sstep(430, 600, px) * sstep(450, 610, py);
  const rakD = 0.105 * rak * Math.pow(0.5 + 0.5 * Math.sin((px * 0.92 - py * 0.50) * 0.021 + 2.6 * fbm(px * 0.0030 + 7, py * 0.0030, 2)), 1.4);

  let e = base * (1 - 0.42 * rak) + ridge + mass + scarp + nafudR + rakD;

  // ---- relief detail, scaled so plains stay calm and mountains stay rugged
  const rough = sstep(0.14, 0.62, e) * (1 - 0.55 * westF);
  e += 0.125 * fbm(px * 0.0050 + 3, py * 0.0050 + 9, 4) * (0.40 + 0.85 * rough);
  e += 0.032 * (ridged(px * 0.015 - 5, py * 0.015 + 2, 3) - 0.44) * rough;
  e += 0.008 * fbm(px * 0.020, py * 0.020, 2);

  // ---- wadi drainage
  const wad = ridged(px * 0.0115 + 21, py * 0.0115 - 13, 2);
  e -= 0.075 * Math.pow(clamp(wad, 0, 1), 5) * sstep(0.04, 0.28, e);

  return Math.max(e, 0.005);
}

// world height, coast-clipped
function heightAt(px, py, dIn) {
  const d = dIn === undefined ? sdfAt(px, py) : dIn;
  let e = rawElev(px, py);
  // coastal plain: wide on the Gulf side, narrow Tihamah on the Red Sea side
  const plainW = mix(52, 108, sstep(430, 780, px));
  e *= 0.14 + 0.86 * sstep(0, plainW, d);
  e *= sstep(0.0, 3.6, d);                 // meets sea level exactly at the coast
  let y = e * ELEV_MAX;
  if (d < 0) {
    const t = sstep(0, -8.5, d);
    const broad = 0.86 + 0.22 * fbm(px * 0.022, py * 0.022, 2);
    y = -(CLIFF * t * broad) - clamp(-d, 0, 26) * 0.055;
  }
  return y;
}

/* ---- one shared height grid: the terrain mesh grid doubles as the raster the
        baked shadow / sky-occlusion marchers read from ---------------------- */
let HG = null, HGnx = 0, HGny = 0, HGx0 = 0, HGx1 = 1, HGy0 = 0, HGy1 = 1;
function hRaster(px, py) {
  const fx = clamp((px - HGx0) / (HGx1 - HGx0) * (HGnx - 1), 0, HGnx - 1.001);
  const fy = clamp((py - HGy0) / (HGy1 - HGy0) * (HGny - 1), 0, HGny - 1.001);
  const x0 = fx | 0, y0 = fy | 0, tx = fx - x0, ty = fy - y0;
  const i0 = y0 * HGnx + x0, i1 = i0 + HGnx;
  const v = mix(mix(HG[i0], HG[i0 + 1], tx), mix(HG[i1], HG[i1 + 1], tx), ty);
  return v > 0 ? v : 0;
}

/* --------------------------------------------------------------- sun & light */
// low sunset sun, west by north-west
const SUN = new THREE.Vector3(-0.930, 0.212, -0.300).normalize();
const SUN_PLANE = { x: -0.930, y: -0.300 };            // toward the sun in plane space
const SUN_SLOPE = SUN.y / Math.hypot(SUN.x, SUN.z);    // world rise per world run

function sunShadow(px, py, h) {
  let step = 1.3, dist = 0, pen = 0;
  for (let k = 0; k < 46; k++) {
    dist += step; step *= 1.10;
    if (dist > 300) break;
    const sx = px + SUN_PLANE.x * dist, sy = py + SUN_PLANE.y * dist;
    if (sx < 0 || sx > W || sy < 0 || sy > H) break;
    const need = h + dist * SCALE * SUN_SLOPE;
    const hh = hRaster(sx, sy);
    if (hh > need) pen = Math.max(pen, (hh - need) / (1.1 + dist * 0.02));
  }
  return clamp(1 - pen * 2.4, 0.0, 1);
}

const AO_DIRS = [];
for (let i = 0; i < 6; i++) AO_DIRS.push([Math.cos(i / 6 * Math.PI * 2), Math.sin(i / 6 * Math.PI * 2)]);
function skyView(px, py, h) {
  let occ = 0;
  for (let a = 0; a < AO_DIRS.length; a++) {
    const dv = AO_DIRS[a];
    let step = 2.2, dist = 0, maxTan = 0;
    for (let k = 0; k < 6; k++) {
      dist += step; step *= 1.5;
      const sx = px + dv[0] * dist, sy = py + dv[1] * dist;
      if (sx < 0 || sx > W || sy < 0 || sy > H) break;
      const dh = hRaster(sx, sy) - h;
      if (dh > 0) maxTan = Math.max(maxTan, dh / (dist * SCALE));
    }
    occ += maxTan / (1 + maxTan);
  }
  return clamp(1 - occ / AO_DIRS.length * 1.15, 0.12, 1);
}

/* ============================================================== 3. RENDERER */
const app = document.getElementById('app');
const scene = new THREE.Scene();
scene.background = null;
const FOGD = 0.00175;
scene.fog = new THREE.FogExp2(0x203c5c, FOGD);

const camera = new THREE.PerspectiveCamera(40, innerWidth / innerHeight, 1.2, 4400);
const POSTER = {
  pos: new THREE.Vector3(-72, 66, 206),
  tgt: new THREE.Vector3(4, 3.0, -6),
};
camera.position.copy(POSTER.pos);

const renderer = new THREE.WebGLRenderer({ antialias: false, powerPreference: 'high-performance', stencil: false });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.setSize(innerWidth, innerHeight);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.00;
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.setClearColor(0x04101c, 1);
app.appendChild(renderer.domElement);

const labelRenderer = new CSS2DRenderer();
labelRenderer.setSize(innerWidth, innerHeight);
labelRenderer.domElement.className = 'lbl-layer';
app.appendChild(labelRenderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.copy(POSTER.tgt);
controls.enableDamping = true;
controls.dampingFactor = 0.048;
controls.rotateSpeed = 0.40;
controls.zoomSpeed = 0.62;
controls.panSpeed = 0.55;
controls.screenSpacePanning = false;
controls.minDistance = 44;
controls.maxDistance = 380;
controls.minPolarAngle = 0.30;
controls.maxPolarAngle = 1.362;      // ~12 degrees above the horizon
controls.update();

/* lights (used by the standard-material props: seas, halos are unlit) */
const hemi = new THREE.HemisphereLight(0x27466e, 0x1a1207, 0.55);
scene.add(hemi);
const sunLight = new THREE.DirectionalLight(0xffc189, 1.15);
sunLight.position.copy(SUN).multiplyScalar(400);
scene.add(sunLight);
const fill = new THREE.DirectionalLight(0x5f86bb, 0.30);
fill.position.set(220, 120, -260);
scene.add(fill);

/* ============================================================== 4. SKY DOME */
const SKY_R = 1900;
const skyMat = new THREE.ShaderMaterial({
  side: THREE.BackSide, depthWrite: false, fog: false,
  uniforms: {
    uZenith: { value: C(0x061225) }, uMid: { value: C(0x11304e) },
    uTeal: { value: C(0x1d5560) }, uAmber: { value: C(P.amber) },
    uRose: { value: C(P.rose) }, uVoid: { value: C(P.void) },
    uSunAz: { value: new THREE.Vector3(SUN.x, 0, SUN.z).normalize() },
    uTime: { value: 0 },
  },
  vertexShader: `varying vec3 vD; void main(){ vD = normalize(position); gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.0);} `,
  fragmentShader: `
    varying vec3 vD;
    uniform vec3 uZenith,uMid,uTeal,uAmber,uRose,uVoid,uSunAz; uniform float uTime;
    float h21(vec2 p){ return fract(sin(dot(p,vec2(41.3,289.1)))*43758.5453); }
    void main(){
      vec3 d = normalize(vD);
      float y = d.y;
      float up = clamp(y,0.0,1.0);
      vec3 c = mix(uMid, uZenith, pow(up,0.68));
      // teal transition band just above the horizon
      c = mix(c, uTeal, pow(1.0-clamp(y*3.4,0.0,1.0), 2.4)*0.60);
      // sunset band, strongest toward the sun azimuth
      float az = clamp(dot(normalize(vec3(d.x,0.0,d.z)), uSunAz),0.0,1.0);
      float band = exp(-pow(max(y,-0.05)*5.0,1.42));
      float glow = band * (0.56 + 0.62*pow(az,1.9));
      vec3 warm = mix(mix(uTeal*1.5,uRose,0.55), uAmber, pow(az,1.25)*0.80 + 0.10);
      c = mix(c, warm, clamp(glow*0.86,0.0,0.94));
      // a tight hot line right on the horizon
      float lip = exp(-pow(abs(y)*34.0,1.25)) * pow(az,3.2);
      c += uAmber*lip*0.72;
      // below the horizon fades to the night void
      c = mix(c, uVoid*1.25, smoothstep(0.0,-0.16,y));
      c += (h21(gl_FragCoord.xy*0.37)-0.5)*0.012;
      gl_FragColor = vec4(c,1.0);
    }`,
});
const sky = new THREE.Mesh(new THREE.SphereGeometry(SKY_R, 60, 40), skyMat);
sky.renderOrder = -10;
scene.add(sky);

/* ---------------------------------------------------------------- 5. STARS */
function makeStars() {
  const n = 3400, band = 1100;
  const total = n + band;
  const pos = new Float32Array(total * 3), col = new Float32Array(total * 3);
  const size = new Float32Array(total), ph = new Float32Array(total);
  const warm = C(0xffd9a8), cool = C(0xbcd6ff), white = C(0xf2f6ff);
  const R = SKY_R * 0.86;
  let k = 0;
  const put = (dir, s, cc) => {
    pos[k * 3] = dir.x * R; pos[k * 3 + 1] = dir.y * R; pos[k * 3 + 2] = dir.z * R;
    col[k * 3] = cc.r; col[k * 3 + 1] = cc.g; col[k * 3 + 2] = cc.b;
    size[k] = s; ph[k] = rng() * 100; k++;
  };
  for (let i = 0; i < n; i++) {
    const u = rng() * 2 - 1, th = rng() * Math.PI * 2;
    const y = Math.abs(u) * 0.98 + 0.02;
    const r = Math.sqrt(1 - y * y);
    const dir = new THREE.Vector3(Math.cos(th) * r, y, Math.sin(th) * r);
    const t = rng();
    const cc = t > 0.86 ? warm.clone().lerp(white, rng()) : t > 0.55 ? cool.clone().lerp(white, rng() * 0.7) : white;
    // stars thin out near the bright horizon
    const s = (1.05 + rng() * rng() * 4.0) * (0.52 + 0.48 * sstep(0.02, 0.40, y));
    put(dir, s, cc);
  }
  // a faint milky band
  const axis = new THREE.Vector3(0.42, 0.66, -0.62).normalize();
  const e1 = new THREE.Vector3(1, 0, 0).cross(axis).normalize();
  const e2 = axis.clone().cross(e1).normalize();
  for (let i = 0; i < band; i++) {
    const a = rng() * Math.PI * 2;
    const spread = (rng() + rng() + rng() - 1.5) * 0.20;
    const dir = e1.clone().multiplyScalar(Math.cos(a)).add(e2.clone().multiplyScalar(Math.sin(a)))
      .add(axis.clone().multiplyScalar(spread)).normalize();
    if (dir.y < 0.05) { i--; continue; }
    put(dir, 0.8 + rng() * 1.5, C(0xd8e2f5).lerp(warm, rng() * 0.3));
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  g.setAttribute('aCol', new THREE.BufferAttribute(col, 3));
  g.setAttribute('aSize', new THREE.BufferAttribute(size, 1));
  g.setAttribute('aPh', new THREE.BufferAttribute(ph, 1));
  const m = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, depthTest: false,
    blending: THREE.AdditiveBlending, fog: false,
    uniforms: { uTime: { value: 0 }, uPx: { value: renderer.getPixelRatio() } },
    vertexShader: `
      attribute vec3 aCol; attribute float aSize, aPh; uniform float uTime, uPx;
      varying vec3 vC; varying float vA;
      void main(){
        vC = aCol;
        float tw = 0.62 + 0.38*sin(uTime*0.85 + aPh*6.2831) * (0.5+0.5*sin(uTime*0.31+aPh*3.1));
        vA = tw;
        vec4 mv = modelViewMatrix*vec4(position,1.0);
        gl_Position = projectionMatrix*mv;
        gl_PointSize = aSize*uPx*(0.9+0.5*tw);
      }`,
    fragmentShader: `
      varying vec3 vC; varying float vA;
      void main(){
        vec2 q = gl_PointCoord-0.5; float r = length(q);
        float a = smoothstep(0.5,0.06,r);
        gl_FragColor = vec4(vC, a*vA*1.35);
      }`,
  });
  const pts = new THREE.Points(g, m);
  pts.frustumCulled = false;
  pts.renderOrder = -9;
  return { pts, m };
}
const stars = makeStars();
scene.add(stars.pts);

/* The relief is displayed like a museum model on an inclined plinth: a small
   backward tilt lets a low camera read the whole Kingdom and still keep the
   dusk horizon and stars in frame. */
const WORLD = new THREE.Group();
WORLD.rotation.x = 0.185;
scene.add(WORLD);
mark('scene');
const toWorld = (v) => WORLD.localToWorld(v.clone());

/* ============================================================ 6. VOID FLOOR */
const VOID_R = 460;
const voidFloor = new THREE.Mesh(
  new THREE.CircleGeometry(VOID_R, 96),
  new THREE.ShaderMaterial({
    fog: false, depthWrite: false, transparent: true,
    uniforms: { uVoid: { value: C(P.void) }, uHaze: { value: C(0x27466b) }, uNavy: { value: C(0x0a1c30) } },
    vertexShader: `varying vec2 vP; void main(){ vP = position.xy; gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.0);} `,
    fragmentShader: `
      varying vec2 vP; uniform vec3 uVoid,uHaze,uNavy;
      void main(){
        float r = length(vP)/460.0;
        vec3 c = mix(uVoid, uNavy, smoothstep(0.03,0.30,r));
        c = mix(c, uHaze, pow(smoothstep(0.30,0.85,r),1.8)*0.22);
        float a = 1.0-smoothstep(0.34,0.86,r);
        gl_FragColor = vec4(c,a);
      }`,
  })
);
voidFloor.rotation.x = -Math.PI / 2;
voidFloor.position.y = -CLIFF - 3.0;
voidFloor.renderOrder = -8;
voidFloor.visible = false;

/* coastal mist: a soft haze band hugging the shoreline, warm to the west */
let groundMistMat = null;
function buildGroundMist() {
  groundMistMat = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide,
    uniforms: {
      uSDF: { value: seaTex }, uTime: { value: 0 },
      uR0: { value: new THREE.Vector2(RX0, RY0) }, uR1: { value: new THREE.Vector2(RX1, RY1) },
      uWarm: { value: C(0xd6884e) }, uCool: { value: C(0x2c5a80) }, uDim: { value: 0 },
    },
    vertexShader: `varying vec3 vP; void main(){ vP=position; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);} `,
    fragmentShader: `
      precision highp float;
      varying vec3 vP; uniform sampler2D uSDF; uniform vec2 uR0,uR1;
      uniform vec3 uWarm,uCool; uniform float uTime,uDim;
      float h(vec2 p){ return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453); }
      float vn(vec2 p){ vec2 i=floor(p),f=fract(p); f=f*f*(3.0-2.0*f);
        return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y); }
      float fb(vec2 p){ float s=0.0,a=0.5; for(int i=0;i<3;i++){ s+=a*vn(p); p*=2.1; a*=0.5;} return s; }
      void main(){
        vec2 pl = vec2(vP.x/0.2+500.0, -vP.y/0.2+410.95);
        vec2 uv = (pl-uR0)/(uR1-uR0);
        float d = texture2D(uSDF, uv).r;
        float off = max(-d, 0.0);
        float inl = max(d, 0.0);
        float band = exp(-off/24.0) * exp(-inl/4.0);
        float n = 0.55+0.75*fb(vec2(pl.x,pl.y)*0.028 + vec2(uTime*0.030,-uTime*0.018));
        float w = smoothstep(240.0,-120.0, pl.x);
        float a = band*n*0.135*(1.0-uDim*0.5);
        gl_FragColor = vec4(mix(uCool,uWarm,w), a);
      }`,
  });
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry((RX1 - RX0) * SCALE, (RY1 - RY0) * SCALE, 1, 1), groundMistMat);
  mesh.rotation.x = -Math.PI / 2;
  mesh.position.set(px2wx((RX0 + RX1) / 2), 2.0, py2wz((RY0 + RY1) / 2));
  mesh.renderOrder = 13;
  WORLD.add(mesh);
}

/* ================================================================ 7. TERRAIN */
const TSEG_X = 560, TSEG_Y = Math.round(TSEG_X * H / W);
const terrain = (function buildTerrain() {
  const nx = TSEG_X + 1, ny = TSEG_Y + 1;
  const MARGIN = 16;                                 // plane units of skirt
  const x0 = -MARGIN, x1 = W + MARGIN, y0 = -MARGIN, y1 = H + MARGIN;
  const pos = new Float32Array(nx * ny * 3);
  const col = new Float32Array(nx * ny * 3);
  const dArr = new Float32Array(nx * ny);
  const pxArr = new Float32Array(nx * ny), pyArr = new Float32Array(nx * ny);

  const hArr = new Float32Array(nx * ny);
  for (let j = 0; j < ny; j++) {
    const py = y0 + (y1 - y0) * j / TSEG_Y;
    for (let i = 0; i < nx; i++) {
      const px = x0 + (x1 - x0) * i / TSEG_X;
      const k = j * nx + i;
      pxArr[k] = px; pyArr[k] = py;
      const d = sdfAt(px, py);
      dArr[k] = d;
      hArr[k] = heightAt(px, py, d);
    }
  }
  // ---- slope-weighted relaxation: removes grid-frequency noise energy from
  //      steep faces (the 'drapery' artefact) while leaving plains untouched
  {
    const cellW = (x1 - x0) / TSEG_X * SCALE;
    const tmp = new Float32Array(nx * ny);
    for (let pass = 0; pass < 6; pass++) {
      tmp.set(hArr);
      for (let j = 1; j < ny - 1; j++) {
        for (let i = 1; i < nx - 1; i++) {
          const k = j * nx + i;
          const l = tmp[k - 1], r = tmp[k + 1], u = tmp[k - nx], dn = tmp[k + nx];
          const gx = (r - l) * 0.5 / cellW, gz = (dn - u) * 0.5 / cellW;
          const g = Math.hypot(gx, gz);
          const w = 0.84 * sstep(0.38, 1.35, g);
          if (w > 0.002) hArr[k] = tmp[k] + w * ((l + r + u + dn) * 0.25 - tmp[k]);
        }
      }
    }
  }
  // publish as the shared height raster for the light bake
  HG = hArr; HGnx = nx; HGny = ny; HGx0 = x0; HGx1 = x1; HGy0 = y0; HGy1 = y1;
  for (let j = 0; j < ny; j++) {
    for (let i = 0; i < nx; i++) {
      const k = j * nx + i;
      pos[k * 3] = px2wx(pxArr[k]);
      pos[k * 3 + 1] = hArr[k];
      pos[k * 3 + 2] = py2wz(pyArr[k]);
    }
  }
  // index, dropping triangles wholly outside the skirt
  const idx = [];
  for (let j = 0; j < TSEG_Y; j++) {
    for (let i = 0; i < TSEG_X; i++) {
      const a = j * nx + i, b = a + 1, c = a + nx, e = c + 1;
      const lim = -13.5;
      if (dArr[a] < lim && dArr[b] < lim && dArr[c] < lim && dArr[e] < lim) continue;
      idx.push(a, c, b, b, c, e);
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  g.setIndex(idx);
  g.computeVertexNormals();
  const nrm = g.attributes.normal.array;

  /* ---------------- vertex colour: albedo x baked sun/sky/AO -------------- */
  const A = {
    sandLo: C(0x84684c), sandHi: C(0xcbab7c), rust: C(0x8a4630), sage: C(0x4f6f5c),
    coast: C(0xbba98d), rock: C(0x94806a), peak: C(0xc7b295), cliff: C(0x33241d),
    dune: C(0xd6b384), basalt: C(0x453b33), sabkha: C(0xb9c3bd), night: C(0x6f7c8c),
  };
  const sunCol = C(0xffe3c6), skyCol = C(0x466fa6), bounce = C(0x7a4d29), rim = C(0xffab5e);
  const tmp = new THREE.Color(), lit = new THREE.Color();
  const nMax = nx * ny;
  for (let k = 0; k < nMax; k++) {
    const px = pxArr[k], py = pyArr[k], d = dArr[k];
    const y = pos[k * 3 + 1];
    const e = clamp(y / ELEV_MAX, 0, 1.3);
    const ny_ = nrm[k * 3 + 1];
    const slope = clamp(1 - ny_, 0, 1);
    const s = spineInfo(px, py);
    const highland = Math.exp(-Math.pow(s.d / 150, 1.5)) * sstep(0.24, 0.66, s.t);

    // ---- albedo
    tmp.copy(A.sandLo).lerp(A.sandHi, sstep(0.03, 0.34, e));
    // Empty Quarter dunes: bright warm sand
    const rak = sstep(430, 610, px) * sstep(450, 620, py);
    tmp.lerp(A.dune, rak * 0.70);
    // northern rust
    tmp.lerp(A.rust, sstep(360, 40, py) * 0.82);
    // south-west green highlands
    tmp.lerp(A.sage, clamp(highland * sstep(0.10, 0.34, e), 0, 1) * 1.0);
    // rock / peaks
    tmp.lerp(A.rock, sstep(0.46, 0.76, e) * 0.80);
    tmp.lerp(A.peak, sstep(0.82, 1.15, e) * 0.72);
    // pale coastal rim / sabkha salt flats — only where the border is a sea
    const kd = kindAt(px, py);
    if (kd > 0) {
      tmp.lerp(A.coast, sstep(30, 2, d) * 0.72);
      if (kd > 1) tmp.lerp(A.sabkha, sstep(26, 3, d) * sstep(0.10, 0.02, e) * 0.62);
    }
    tmp.lerp(A.night, sstep(560, 980, px) * 0.24);
    // steep faces darken to rock
    tmp.lerp(A.basalt, sstep(0.34, 0.85, slope) * 0.60);
    // grain
    const gr = 0.90 + 0.20 * fbm(px * 0.055 + 40, py * 0.055, 3) + 0.06 * fbm(px * 0.31, py * 0.31, 2);
    tmp.multiplyScalar(gr);
    if (d < 0) tmp.copy(A.cliff).multiplyScalar((0.55 + 0.45 * fbm(px * 0.09, py * 0.09, 3)) * (kindAt(px, py) > 0 ? 1.0 : 0.72));

    // ---- baked light
    const nx_ = nrm[k * 3], nz_ = nrm[k * 3 + 2];
    const nd = Math.max(0, nx_ * SUN.x + ny_ * SUN.y + nz_ * SUN.z);
    const sh = d > 0 ? sunShadow(px, py, Math.max(y, 0)) : 0.10;
    const ao = d > 0 ? skyView(px, py, Math.max(y, 0)) : 0.22;
    const skyT = 0.5 + 0.5 * ny_;
    lit.set(0, 0, 0);
    const dayI = 0.78 + 0.22 * sstep(940, 170, px);
    const sunI = 1.16 * Math.pow(nd, 0.95) * sh * dayI;
    lit.r += sunCol.r * sunI; lit.g += sunCol.g * sunI; lit.b += sunCol.b * sunI;
    const skyI = skyT * ao * 0.34 * (1 + 0.55 * Math.max(nx_, 0)) * (0.72 + 0.28 * dayI);
    lit.r += skyCol.r * skyI; lit.g += skyCol.g * skyI; lit.b += skyCol.b * skyI;
    const rimI = Math.pow(sstep(0.50, 0.97, nd), 1.9) * sh * 0.34 * dayI;
    lit.r += rim.r * rimI; lit.g += rim.g * rimI; lit.b += rim.b * rimI;
    const bo = clamp(-nx_ * 0.5 + 0.2, 0, 1) * ao;
    lit.r += bounce.r * bo * 0.26; lit.g += bounce.g * bo * 0.26; lit.b += bounce.b * bo * 0.26;
    // ambient floor so nothing goes to pure black
    lit.r += 0.032; lit.g += 0.042; lit.b += 0.070;

    col[k * 3] = tmp.r * lit.r; col[k * 3 + 1] = tmp.g * lit.g; col[k * 3 + 2] = tmp.b * lit.b;
  }
  g.setAttribute('color', new THREE.BufferAttribute(col, 3));
  g.computeBoundingSphere();

  const mat = new THREE.ShaderMaterial({
    uniforms: {
      uFogColor: { value: C(P.haze) }, uFogD: { value: FOGD },
      uSun: { value: SUN.clone() }, uSunCol: { value: C(0xffcc9a) },
      uBeaconPos: { value: [new THREE.Vector3(), new THREE.Vector3()] },
      uBeaconCol: { value: [C(0xffcda0), C(0xffcda0)] },
      uBeaconInt: { value: [0, 0] },
      uContour: { value: 0.017 }, uMint: { value: C(P.mint) },
      uDim: { value: 0 }, uTime: { value: 0 },
    },
    vertexShader: `
      attribute vec3 color;
      varying vec3 vC; varying vec3 vN; varying vec3 vW; varying float vD;
      void main(){
        vC = color; vN = normalize(normalMatrix*normal);
        vec4 wp = modelMatrix*vec4(position,1.0); vW = wp.xyz;
        vec4 mv = viewMatrix*wp; vD = -mv.z;
        gl_Position = projectionMatrix*mv;
      }`,
    fragmentShader: `
      precision highp float;
      varying vec3 vC; varying vec3 vN; varying vec3 vW; varying float vD;
      uniform vec3 uFogColor,uSun,uSunCol,uMint; uniform float uFogD,uContour,uDim,uTime;
      uniform vec3 uBeaconPos[2]; uniform vec3 uBeaconCol[2]; uniform float uBeaconInt[2];
      float h2(vec2 p){ return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453); }
      float vn2(vec2 p){ vec2 i=floor(p),f=fract(p); f=f*f*(3.0-2.0*f);
        return mix(mix(h2(i),h2(i+vec2(1,0)),f.x),mix(h2(i+vec2(0,1)),h2(i+vec2(1,1)),f.x),f.y); }
      float fbm2(vec2 p){ float s=0.0,a=0.5; for(int i=0;i<3;i++){ s+=a*vn2(p); p*=2.07; a*=0.5;} return s; }
      void main(){
        vec3 c = vC;
        vec3 N = normalize(vN);
        // micro relief that only pays for itself when the camera is close
        float mz = 1.0-smoothstep(50.0,200.0,vD);
        if (mz > 0.01) {
          vec2 q = vW.xz*1.55;
          float e0 = fbm2(q), ex = fbm2(q+vec2(0.42,0.0)), ez = fbm2(q+vec2(0.0,0.42));
          N = normalize(N + vec3(-(ex-e0)*2.6, 0.0, -(ez-e0)*2.6)*mz);
          float sd = max(dot(N, uSun), 0.0);
          c *= mix(1.0, 0.70+0.95*sd, mz*0.50);
        }
        // grazing sunset sheen picks out the ridge lines
        vec3 V = normalize(cameraPosition - vW);
        float sp = pow(max(dot(reflect(-uSun,N),V),0.0), 22.0);
        c += uSunCol*sp*0.085;
        // faint cartographic contours - a designed national map
        float fr = fract(vW.y*0.30);
        float dl = min(fr, 1.0-fr)*2.0;
        float w = 0.10 + 0.55*smoothstep(50.0,300.0,vD);
        float line = 1.0-smoothstep(0.0,w,dl);
        c += uMint*line*uContour*smoothstep(0.02,0.30,N.y)*(1.0-smoothstep(120.0,320.0,vD));
        // warm spill from the living beacons
        for(int i=0;i<2;i++){
          float dd = length(vW.xz-uBeaconPos[i].xz);
          float f = exp(-dd/13.0)*0.85 + exp(-dd/34.0)*0.30;
          c += uBeaconCol[i]*f*uBeaconInt[i]*(0.35+0.65*max(N.y,0.0));
        }
        c *= 1.0-uDim;
        float f = 1.0-exp(-pow(uFogD*vD,2.0));
        c = mix(c, uFogColor, clamp(f,0.0,1.0));
        gl_FragColor = vec4(c,1.0);
      }`,
  });
  const mesh = new THREE.Mesh(g, mat);
  mesh.name = 'terrain';
  return { mesh, mat };
})();
mark('terrain');
WORLD.add(terrain.mesh);

/* underside cap so grazing angles never see through the relief */
(function baseCap() {
  const shape = new THREE.Shape(RING.map(p => new THREE.Vector2(px2wx(p[0]), py2wz(p[1]))));
  const g = new THREE.ShapeGeometry(shape);
  const m = new THREE.MeshBasicMaterial({ color: 0x081627, side: THREE.DoubleSide, fog: true });
  const mesh = new THREE.Mesh(g, m);
  mesh.rotation.x = Math.PI / 2;
  mesh.position.y = -CLIFF - 1.4;
  WORLD.add(mesh);
})();

/* ================================================================== 8. SEAS */
const seaTex = (function () {
  const data = new Uint16Array(GW * GH * 4);
  const hf = THREE.DataUtils.toHalfFloat;
  for (let i = 0; i < GW * GH; i++) {
    data[i * 4] = hf(SDF[i]);
    data[i * 4 + 1] = hf(RED_A[i]);
    data[i * 4 + 2] = hf(GULF_A[i]);
    data[i * 4 + 3] = hf(1);
  }
  const t = new THREE.DataTexture(data, GW, GH, THREE.RGBAFormat, THREE.HalfFloatType);
  t.minFilter = t.magFilter = THREE.LinearFilter;
  t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping;
  t.needsUpdate = true;
  return t;
})();

const seaMat = new THREE.ShaderMaterial({
  transparent: true, depthWrite: false, side: THREE.DoubleSide,
  uniforms: {
    uSDF: { value: seaTex }, uTime: { value: 0 },
    uR0: { value: new THREE.Vector2(RX0, RY0) }, uR1: { value: new THREE.Vector2(RX1, RY1) },
    uDeep: { value: C(0x06172a) }, uShelf: { value: C(0x0f3d52) },
    uGulf: { value: C(0x1a6479) },
    uSun: { value: SUN.clone() }, uGlint: { value: C(0xffb677) },
    uMint: { value: C(P.mint) }, uAmber: { value: C(P.amber) },
    uFogColor: { value: C(P.haze) }, uFogD: { value: FOGD },
    uDim: { value: 0 },
  },
  vertexShader: `
    varying vec3 vW; varying float vD;
    void main(){
      vec4 wp = modelMatrix*vec4(position,1.0); vW = wp.xyz;
      vec4 mv = viewMatrix*wp; vD = -mv.z;
      gl_Position = projectionMatrix*mv;
    }`,
  fragmentShader: `
    precision highp float;
    varying vec3 vW; varying float vD;
    uniform sampler2D uSDF; uniform float uTime,uFogD,uDim;
    uniform vec2 uR0,uR1;
    uniform vec3 uDeep,uShelf,uGulf,uSun,uGlint,uMint,uAmber,uFogColor;
    float h(vec2 p){ return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453); }
    float vn(vec2 p){ vec2 i=floor(p),f=fract(p); f=f*f*(3.0-2.0*f);
      return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y); }
    float fb(vec2 p){ float s=0.0,a=0.5; for(int i=0;i<4;i++){ s+=a*vn(p); p*=2.03; a*=0.5;} return s; }
    void main(){
      // world -> plane space
      vec2 pl = vec2(vW.x/0.2+500.0, vW.z/0.2+410.95);
      vec2 uv = (pl-uR0)/(uR1-uR0);
      vec4 s = texture2D(uSDF, uv);
      float d = s.r;             // + inside land
      float redA = s.g, gulfA = s.b;
      if(d > -0.30) discard;     // land
      float out_ = -d;           // distance offshore, plane units
      float sea = clamp(max(redA, gulfA)*1.35, 0.0, 1.0);
      if(sea < 0.03) discard;
      bool gulf = gulfA > redA;

      float t = uTime;
      // moving ripple field
      vec2 q = vW.xz*0.16;
      float rip = fb(q + vec2(t*0.055, -t*0.032)) + 0.55*fb(q*2.7 - vec2(t*0.09,t*0.05));
      float nrmx = fb(q+vec2(0.07,0.0)+vec2(t*0.055,-t*0.032)) - fb(q-vec2(0.07,0.0)+vec2(t*0.055,-t*0.032));
      float nrmz = fb(q+vec2(0.0,0.07)+vec2(t*0.055,-t*0.032)) - fb(q-vec2(0.0,0.07)+vec2(t*0.055,-t*0.032));
      vec3 N = normalize(vec3(-nrmx*2.6, 1.0, -nrmz*2.6));

      vec3 base = gulf ? uGulf : uShelf;
      vec3 c = mix(base, uDeep, smoothstep(4.0, 76.0, out_));
      c *= 0.78 + 0.38*rip;

      // sun glint path on the Red Sea, cooler broken glitter in the Gulf
      vec3 V = normalize(cameraPosition - vW);
      vec3 Rf = reflect(-normalize(uSun), N);
      float spec = pow(max(dot(Rf,V),0.0), gulf? 90.0 : 46.0);
      float glintMask = gulf ? 0.7 : 1.0;
      c += (gulf? mix(uMint,uGlint,0.42) : uGlint) * spec * (gulf?1.9:2.3) * glintMask;
      // broad specular sheen
      float sheen = pow(max(dot(Rf,V),0.0), 7.0);
      c += uGlint*sheen*(gulf?0.06:0.20);

      // coastal glow line + slow map-like swell bands parallel to the coast
      float glow = exp(-out_/2.6);
      vec3 glowC = gulf ? mix(uMint,uAmber,0.30) : mix(uAmber,uMint,0.28);
      c += glowC*glow*0.62;
      float bands = 0.5+0.5*sin(out_*0.16 - t*0.34 + rip*1.4);
      c += glowC*pow(bands,9.0)*0.022*exp(-out_/64.0);

      float a = 0.94 * sea * smoothstep(0.0,2.0,out_) * (1.0-smoothstep(38.0,160.0,out_));
      c *= 1.0-uDim;
      float f = 1.0-exp(-pow(uFogD*vD,2.0));
      c = mix(c, uFogColor, clamp(f,0.0,1.0));
      gl_FragColor = vec4(c, a);
    }`,
});
const sea = new THREE.Mesh(new THREE.PlaneGeometry((RX1 - RX0) * SCALE, (RY1 - RY0) * SCALE, 1, 1), seaMat);
sea.rotation.x = -Math.PI / 2;
sea.position.set(px2wx((RX0 + RX1) / 2), -0.12, py2wz((RY0 + RY1) / 2));
sea.renderOrder = 1;
WORLD.add(sea);
buildGroundMist();

/* ======================================================== 9. SETTLEMENT GLIMMER */
const CITIES = MAP.pts.map(p => ({ ...p }));
const META = {"Al Khobar": {"ar": "الخبر", "prop": "A City of Coastal Shimmering Lights", "propAr": "مدينة الأضواء الساحلية المتلألئة", "story": "Evenings by the water, streets that stay awake, and a downtown that gives the Gulf back to its city."}, "Madinah": {"ar": "المدينة المنورة", "prop": "The City of Light", "propAr": "مدينة النور", "story": "A downtown worthy of the City of Light: calm streets, warm stone, and life that gathers after maghrib."}, "Al Ahsa": {"ar": "الأحساء", "prop": "An Ancient Oasis City", "propAr": "مدينة الواحة العريقة"}, "Buraydah": {"ar": "بريدة", "prop": "The Fertile Heart of Agriculture", "propAr": "القلب الزراعي الخصيب"}, "Hail": {"ar": "حائل", "prop": "The Bride of the North", "propAr": "عروس الشمال"}, "Taif": {"ar": "الطائف", "prop": "City of Roses", "propAr": "مدينة الورد"}, "Arar": {"ar": "عرعر", "prop": "The Hidden Gem", "propAr": "الجوهرة المخفية"}, "Dumat Al Jandal": {"ar": "دومة الجندل", "prop": "A City of Ancient Trade", "propAr": "مدينة التجارة القديمة"}, "Tabuk": {"ar": "تبوك", "prop": "An Ancient Caravan City", "propAr": "مدينة القوافل العريقة"}, "Al Baha": {"ar": "الباحة", "prop": "The Gateway", "propAr": "البوابة"}, "Jizan": {"ar": "جازان", "prop": "The Red Sea's Jewel", "propAr": "جوهرة البحر الأحمر"}, "Najran": {"ar": "نجران", "prop": "A City of Timeless Heritage", "propAr": "مدينة التراث الخالد"}};
CITIES.forEach(c => Object.assign(c, META[c.name]));
CITIES.forEach(c => {
  c.wx = px2wx(c.x); c.wz = py2wz(c.y);
  c.wy = Math.max(heightAt(c.x, c.y), 0.12);
  c.pos = new THREE.Vector3(c.wx, c.wy, c.wz);
});

const glimmer = (function () {
  const target = 4600;
  const pos = [], col = [], size = [], ph = [];
  const warmA = C(0xffd8a0), warmB = C(0xffeccd), pale = C(0xcbb996), coolm = C(0x9fe8d8), blue = C(0x9dc0e0);
  let guard = 0;
  while (pos.length / 3 < target && guard++ < target * 60) {
    const px = rng() * W, py = rng() * H;
    const d = sdfAt(px, py);
    if (d < 3) continue;
    let w = 0.055;
    let nearLit = 0, nearAny = 0;
    for (const c of CITIES) {
      const dd = Math.hypot(px - c.x, py - c.y);
      const f = Math.exp(-dd / (c.lit ? 46 : 30));
      if (c.lit) nearLit = Math.max(nearLit, f);
      nearAny = Math.max(nearAny, f * (c.lit ? 1 : 0.62));
      w = Math.max(w, f * (c.lit ? 1.0 : 0.60));
    }
    w = Math.max(w, 0.34 * Math.exp(-d / 40));             // coastal strips
    w = Math.max(w, 0.26 * Math.exp(-Math.abs(d - 90) / 70) * sstep(400, 250, px)); // Hejaz corridor
    const rak = sstep(430, 610, px) * sstep(450, 620, py);
    w *= 1 - 0.93 * rak;                                   // the Empty Quarter is empty
    if (rng() > w) continue;
    const y = Math.max(heightAt(px, py), 0.05) + 0.10;
    pos.push(px2wx(px), y, py2wz(py));
    const t = rng();
    let cc;
    if (nearLit > 0.3) cc = warmA.clone().lerp(warmB, rng());
    else if (nearAny > 0.25) cc = pale.clone().lerp(warmA, rng() * 0.8);
    else cc = t > 0.86 ? coolm.clone() : t > 0.72 ? blue.clone() : pale.clone().lerp(warmA, rng() * 0.45);
    const dim = 0.44 + 0.66 * Math.max(nearAny, 0.30);
    cc.multiplyScalar(dim);
    col.push(cc.r, cc.g, cc.b);
    size.push((0.9 + rng() * rng() * 3.0) * (0.7 + 0.9 * nearAny));
    ph.push(rng() * 100);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('aCol', new THREE.Float32BufferAttribute(col, 3));
  g.setAttribute('aSize', new THREE.Float32BufferAttribute(size, 1));
  g.setAttribute('aPh', new THREE.Float32BufferAttribute(ph, 1));
  const m = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    uniforms: {
      uTime: { value: 0 }, uPx: { value: renderer.getPixelRatio() },
      uFogD: { value: FOGD }, uDim: { value: 0 },
    },
    vertexShader: `
      attribute vec3 aCol; attribute float aSize,aPh;
      uniform float uTime,uPx; varying vec3 vC; varying float vA;
      void main(){
        vec4 mv = modelViewMatrix*vec4(position,1.0);
        float dist = -mv.z;
        float tw = 0.55+0.45*sin(uTime*1.15+aPh*6.2831)*(0.6+0.4*sin(uTime*0.43+aPh*2.3));
        vC = aCol; vA = tw*(1.0-smoothstep(300.0,470.0,dist));
        gl_Position = projectionMatrix*mv;
        gl_PointSize = max(aSize*uPx*(150.0/dist)*(0.75+0.5*tw), 0.9*uPx);
      }`,
    fragmentShader: `
      varying vec3 vC; varying float vA; uniform float uDim;
      void main(){
        vec2 q = gl_PointCoord-0.5; float r=length(q);
        float a = smoothstep(0.5,0.04,r);
        gl_FragColor = vec4(vC*(1.0-uDim*0.7), a*vA);
      }`,
  });
  const pts = new THREE.Points(g, m);
  pts.renderOrder = 3;
  return { pts, m, count: pos.length / 3 };
})();
mark('glimmer');
WORLD.add(glimmer.pts);

/* ============================================================= 10. MARKERS */
/* --- soft-sprite factory ------------------------------------------------- *
   One canvas factory for every glow in the world. The alpha PROFILE and the
   colour RAMP are supplied separately, so a marker can go warm-white in the
   core and amber at the falloff without ever touching pure white — which is
   what made the old beacons read as rocket exhaust. Peak alpha is always
   below 1 so the additive stack has headroom before the bloom threshold.   */
function softSprite(size, alphaFn, rampFn) {
  const cv = document.createElement('canvas'); cv.width = cv.height = size;
  const ctx = cv.getContext('2d');
  const img = ctx.createImageData(size, size);
  const c = new THREE.Color();
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const u = x / (size - 1) * 2 - 1, v = y / (size - 1) * 2 - 1;
      const d = Math.min(Math.sqrt(u * u + v * v), 1);
      const a = clamp(alphaFn(d, u, v), 0, 1);
      rampFn(c, d);
      const i = (y * size + x) * 4;
      img.data[i] = (c.r * 255) | 0; img.data[i + 1] = (c.g * 255) | 0;
      img.data[i + 2] = (c.b * 255) | 0; img.data[i + 3] = (a * 255) | 0;
    }
  }
  ctx.putImageData(img, 0, 0);
  const t = new THREE.CanvasTexture(cv);
  t.colorSpace = THREE.SRGBColorSpace;
  t.needsUpdate = true;
  return t;
}
// warm core -> amber falloff. Wide soft body + tight core in one profile.
const RAMP_WARM = (c, d) => { c.setHex(0xfff4de).lerp(C(0xffb063), Math.pow(clamp(d * 1.45, 0, 1), 0.85)); };
const RAMP_AMBER = (c, d) => { c.setHex(0xffcf9a).lerp(C(0xd8804e), Math.pow(clamp(d * 1.2, 0, 1), 0.9)); };
const RAMP_MINT = (c, d) => { c.setHex(0xcdfaee).lerp(C(0x53bda9), Math.pow(clamp(d * 1.35, 0, 1), 0.85)); };
const RAMP_MINTD = (c, d) => { c.setHex(0x9fe8d8).lerp(C(0x3d8f86), Math.pow(clamp(d * 1.2, 0, 1), 0.9)); };

const TEX_CORE = softSprite(128,
  (d) => Math.pow(1 - d, 2.7) * 0.60 + Math.pow(1 - d, 7.5) * 0.34, RAMP_WARM);
const TEX_HALO = softSprite(192,
  (d) => Math.pow(1 - d, 2.2) * 0.30 + Math.pow(1 - d, 4.6) * 0.16, RAMP_AMBER);
// a third, very wide, very faint shell: the layer that makes the glow read as air
const TEX_BLOOMSHELL = softSprite(160,
  (d) => Math.pow(1 - d, 1.7) * 0.155, RAMP_AMBER);
const TEX_MINT = softSprite(128,
  (d) => Math.pow(1 - d, 2.5) * 0.62 + Math.pow(1 - d, 7.0) * 0.28, RAMP_MINT);
const TEX_MINTHALO = softSprite(160,
  (d) => Math.pow(1 - d, 2.0) * 0.26 + Math.pow(1 - d, 4.4) * 0.12, RAMP_MINTD);
// flat ground halo: a soft annulus so every waiting city is countable from the
// poster distance, where a small upright ember alone is only a few pixels.
// A wide, flat, low-amplitude annulus — a pool of light on the ground, not a
// selection circle. The ring term is deliberately broad (gaussian sigma ~0.4)
// and carries less weight than the central fill.
const TEX_GHALO = softSprite(192, (d) => {
  const ring = Math.exp(-Math.pow(Math.abs(d - 0.50) * 2.3, 1.7));
  const fill = Math.exp(-Math.pow(d * 1.7, 2.0)) * 0.62;
  return (ring * 0.30 + fill) * (1 - sstep(0.80, 1.0, d));
}, RAMP_MINTD);
const TEX_GHALO_W = softSprite(192, (d) => {
  const ring = Math.exp(-Math.pow(Math.abs(d - 0.46) * 2.2, 1.7));
  const fill = Math.exp(-Math.pow(d * 1.6, 2.0)) * 0.70;
  return (ring * 0.26 + fill) * (1 - sstep(0.80, 1.0, d));
}, RAMP_AMBER);
// thin translucent wisp, stretched by the sprite scale rather than the texture
const TEX_WISP = softSprite(160, (d, u, v) => {
  let a = sstep(1.0, 0.02, d);
  const n = fbm(u * 3.1 + 17, v * 3.1 - 4, 4) * 0.5 + 0.5;
  a *= 0.28 + 0.95 * n;
  return Math.pow(clamp(a, 0, 1), 1.55) * 0.92;
}, (c) => c.setHex(0xffffff));

const markerGroup = new THREE.Group();
WORLD.add(markerGroup);
const pickables = [];
const pickMat = new THREE.MeshBasicMaterial({ visible: false });

/* --- the beacon shaft ----------------------------------------------------- *
   A shaft of dusk light, not a lamp. Built as crossed soft blades (so it reads
   from any heading without a silhouette edge) whose alpha is the product of
   five soft terms — across, along, shimmer, view-alignment and a near-lens
   guard. The `along` term fades at BOTH ends, which is what removes the hard
   bright disc where the old cylinder met the ground. Colour runs warm-white in
   the first fifth and amber above it; nothing in here can reach pure white. */
const SHAFT_H = 40;
function shaftGeometry(blades, hMul) {
  const parts = [];
  for (let i = 0; i < blades; i++) {
    const w = (7.4 + (i % 2) * 4.4) * hMul;
    const h = SHAFT_H * (0.82 + (i % 3) * 0.11) * hMul;
    const g = new THREE.PlaneGeometry(w, h, 1, 14);
    // offset each blade laterally so no two alpha peaks coincide on the axis —
    // three centred blades summed to a hard bright line up the middle
    g.translate((i - (blades - 1) / 2) * w * 0.19, h / 2, 0);
    g.rotateY(i / blades * Math.PI);
    const n = g.attributes.position.count;
    const ph = new Float32Array(n); ph.fill(i * 0.37 + 0.11);
    g.setAttribute('aPh', new THREE.BufferAttribute(ph, 1));
    parts.push(g);
  }
  // merge by hand (no BufferGeometryUtils in the addon set)
  let total = 0, idxTotal = 0;
  for (const g of parts) { total += g.attributes.position.count; idxTotal += g.index.count; }
  const pos = new Float32Array(total * 3), uv = new Float32Array(total * 2);
  const phA = new Float32Array(total), idx = new Uint32Array(idxTotal);
  let vo = 0, io = 0;
  for (const g of parts) {
    const p = g.attributes.position.array, u = g.attributes.uv.array, a = g.attributes.aPh.array;
    pos.set(p, vo * 3); uv.set(u, vo * 2); phA.set(a, vo);
    const gi = g.index.array;
    for (let k = 0; k < gi.length; k++) idx[io + k] = gi[k] + vo;
    vo += g.attributes.position.count; io += gi.length;
  }
  const out = new THREE.BufferGeometry();
  out.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  out.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
  out.setAttribute('aPh', new THREE.BufferAttribute(phA, 1));
  out.setIndex(new THREE.BufferAttribute(idx, 1));
  out.computeBoundingSphere();
  return out;
}

const shaftMat = () => new THREE.ShaderMaterial({
  transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide,
  uniforms: {
    uTime: { value: 0 }, uWarm: { value: C(0xffeed2) }, uAmber: { value: C(0xe89a58) },
    uInt: { value: 1 }, uDim: { value: 0 }, uNear: { value: 1 },
  },
  vertexShader: `
    attribute float aPh;
    varying vec2 vUv; varying vec3 vW; varying float vPh; varying float vD;
    void main(){
      vUv = uv; vPh = aPh;
      vec4 wp = modelMatrix*vec4(position,1.0); vW = wp.xyz;
      vec4 mv = viewMatrix*wp; vD = -mv.z;
      gl_Position = projectionMatrix*mv;
    }`,
  fragmentShader: `
    precision highp float;
    varying vec2 vUv; varying vec3 vW; varying float vPh; varying float vD;
    uniform float uTime,uInt,uDim,uNear; uniform vec3 uWarm,uAmber;
    void main(){
      // soft across the blade — no silhouette edge anywhere
      float ac = 1.0 - abs(vUv.x-0.5)*2.0;
      // a shallow notch at the very centre keeps the overlapping blades from
      // summing into a hard core line
      float across = pow(ac, 1.55) * (1.0 - 0.24*smoothstep(0.86,1.0,ac));
      // fades in off the ground AND out at the top: both ends are soft
      float up = vUv.y;
      float along = smoothstep(0.0,0.085,up) * pow(1.0-up,1.42) * (1.0-smoothstep(0.74,1.0,up));
      // a slow shimmer travelling up the shaft
      float sh = 0.80 + 0.20*sin(up*6.5 - uTime*0.55 + vPh*19.0)
                      + 0.10*sin(up*15.0 + uTime*0.92 + vPh*8.0);
      // intensity flicker: compound low-amplitude sines, never a strobe
      float flick = 0.93 + 0.045*sin(uTime*1.55 + vPh*3.1) + 0.028*sin(uTime*2.9 + vPh*1.7);
      // don't smear across the lens when the camera flies in
      float guard = smoothstep(6.0, 46.0, vD);
      vec3 c = mix(uWarm, uAmber, smoothstep(0.02,0.55,up));
      float a = across*along*max(sh,0.0)*flick*uInt*guard
              * (0.52+0.48*uNear) * (1.0-uDim*0.55);
      gl_FragColor = vec4(c, a*0.40);
    }`,
});

const ringMat = (color, op) => new THREE.ShaderMaterial({
  transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide,
  uniforms: { uTime: { value: 0 }, uCol: { value: C(color) }, uOp: { value: op }, uPhase: { value: 0 }, uDim: { value: 0 } },
  vertexShader: `varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);} `,
  fragmentShader: `
    varying vec2 vUv; uniform float uTime,uOp,uPhase,uDim; uniform vec3 uCol;
    void main(){
      float r = length(vUv-0.5)*2.0;
      float t = fract(uTime*0.24+uPhase);
      float rad = 0.15+0.85*t;
      float band = exp(-pow(abs(r-rad)*13.0,1.7));
      float fade = (1.0-t)*(1.0-t);
      float inner = exp(-pow(r*2.2,2.4))*0.35;
      float a = (band*fade*0.9+inner)*uOp*(1.0-uDim*0.5)*smoothstep(1.02,0.90,r);
      gl_FragColor = vec4(uCol*(1.0+band*0.8), a);
    }`,
});

function cityLightCluster(c, count, radius, warm) {
  const pos = [], col = [], size = [], ph = [];
  const a1 = warm ? C(0xffd79a) : C(0xa9e9dc), a2 = warm ? C(0xfff2d8) : C(0xd7f6ee);
  for (let i = 0; i < count; i++) {
    const a = rng() * Math.PI * 2, r = (0.10 + 0.90 * Math.pow(rng(), 0.5)) * radius;
    const px = c.x + Math.cos(a) * r / SCALE, py = c.y + Math.sin(a) * r / SCALE;
    if (sdfAt(px, py) < 1) continue;
    pos.push(px2wx(px), Math.max(heightAt(px, py), 0.05) + 0.13, py2wz(py));
    const cc = a1.clone().lerp(a2, rng()).multiplyScalar(warm ? (0.72 + 0.58 * (1 - r / radius)) : 0.44);
    col.push(cc.r, cc.g, cc.b);
    size.push((warm ? 1.0 : 0.85) + rng() * rng() * (warm ? 3.0 : 1.6));
    ph.push(rng() * 100);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('aCol', new THREE.Float32BufferAttribute(col, 3));
  g.setAttribute('aSize', new THREE.Float32BufferAttribute(size, 1));
  g.setAttribute('aPh', new THREE.Float32BufferAttribute(ph, 1));
  const pts = new THREE.Points(g, glimmer.m.clone());
  pts.material.uniforms = THREE.UniformsUtils.clone(glimmer.m.uniforms);
  pts.renderOrder = 4;
  return pts;
}

const clusterMats = [];
CITIES.forEach((c, ci) => {
  const grp = new THREE.Group();
  grp.position.copy(c.pos);
  markerGroup.add(grp);
  c.grp = grp;

  const lit = !!c.lit;

  // ground glow
  const gg = new THREE.Mesh(new THREE.PlaneGeometry(lit ? 15 : 10, lit ? 15 : 10),
    new THREE.MeshBasicMaterial({
      map: lit ? TEX_HALO : TEX_MINTHALO, transparent: true, depthWrite: false,
      blending: THREE.AdditiveBlending, opacity: lit ? 0.95 : 0.6, color: 0xffffff,
    }));
  gg.rotation.x = -Math.PI / 2; gg.position.y = 0.22; gg.renderOrder = 5;
  grp.add(gg); c.groundGlow = gg;

  /* a soft ground halo ring lying on the terrain. At the poster distance an
     upright ember is only a few pixels; the ring gives every waiting city a
     countable footprint without brightening the marker itself. */
  const hr = new THREE.Mesh(new THREE.PlaneGeometry(lit ? 18 : 17, lit ? 18 : 17),
    new THREE.MeshBasicMaterial({
      map: lit ? TEX_GHALO_W : TEX_GHALO, transparent: true, depthWrite: false,
      blending: THREE.AdditiveBlending, opacity: lit ? 0.34 : 0.62,
    }));
  hr.rotation.x = -Math.PI / 2; hr.position.y = 0.16; hr.renderOrder = 4;
  grp.add(hr); c.haloRing = hr;

  // pulsing ring(s)
  const rings = [];
  const nRings = lit ? 2 : 1;
  for (let i = 0; i < nRings; i++) {
    const m = ringMat(lit ? 0xffd6a0 : P.mint, lit ? 0.62 : 0.30);
    m.uniforms.uPhase.value = i / nRings;
    const r = new THREE.Mesh(new THREE.PlaneGeometry(lit ? 34 : 13, lit ? 34 : 13), m);
    r.rotation.x = -Math.PI / 2; r.position.y = 0.26 + i * 0.02; r.renderOrder = 6;
    grp.add(r); rings.push(m);
  }
  c.rings = rings;

  // core + halo sprites
  const core = new THREE.Sprite(new THREE.SpriteMaterial({
    map: lit ? TEX_CORE : TEX_MINT, transparent: true, depthWrite: false,
    blending: THREE.AdditiveBlending, color: 0xffffff, opacity: lit ? 0.86 : 0.85,
  }));
  core.scale.setScalar(lit ? 7.2 : 3.4);
  core.position.y = lit ? 1.5 : 0.9;
  core.renderOrder = 8;
  grp.add(core); c.core = core;

  const halo = new THREE.Sprite(new THREE.SpriteMaterial({
    map: lit ? TEX_HALO : TEX_MINTHALO, transparent: true, depthWrite: false,
    blending: THREE.AdditiveBlending, opacity: lit ? 0.85 : 0.45,
  }));
  halo.scale.setScalar(lit ? 17 : 8);
  halo.position.y = lit ? 2.6 : 1.1;
  halo.renderOrder = 7;
  grp.add(halo); c.halo = halo;

  // third shell: very wide, very faint — the layer that reads as lit air
  if (lit) {
    const shell = new THREE.Sprite(new THREE.SpriteMaterial({
      map: TEX_BLOOMSHELL, transparent: true, depthWrite: false,
      blending: THREE.AdditiveBlending, opacity: 0.46,
    }));
    shell.scale.setScalar(34);
    shell.position.y = 5.0;
    shell.renderOrder = 6;
    grp.add(shell); c.shell = shell;
  }

  if (lit) {
    // two crossed-blade shafts: a tight inner one and a wide, fainter skirt
    const sm = shaftMat();
    const inner = new THREE.Mesh(shaftGeometry(3, 1.0), sm);
    inner.renderOrder = 9;
    grp.add(inner);
    c.shaftMat = sm;
    const sm2 = shaftMat();
    sm2.uniforms.uInt.value = 0.40;
    sm2.uniforms.uWarm.value = C(0xffdcae);
    sm2.uniforms.uAmber.value = C(0xd08a55);
    const outer = new THREE.Mesh(shaftGeometry(3, 2.15), sm2);
    outer.rotation.y = 0.52;
    outer.scale.y = 0.62;
    outer.renderOrder = 9;
    grp.add(outer);
    c.shaftMat2 = sm2;
  }

  // city light cluster
  const cluster = cityLightCluster(c, lit ? 900 : 140, lit ? 12.5 : 4.2, lit);
  WORLD.add(cluster);
  clusterMats.push(cluster.material);
  c.cluster = cluster;

  // pick target
  const pick = new THREE.Mesh(new THREE.SphereGeometry(lit ? 6.5 : 4.6, 8, 6), pickMat);
  pick.position.copy(c.pos); pick.position.y += lit ? 2.0 : 1.2;
  pick.userData.city = c;
  WORLD.add(pick); pickables.push(pick);
});

const LIT = CITIES.filter(c => c.lit);
WORLD.updateMatrixWorld(true);
CITIES.forEach(c => { c.wpos = toWorld(c.pos); });
terrain.mat.uniforms.uBeaconPos.value = [LIT[0].wpos.clone(), LIT[1].wpos.clone()];

/* ================================================= 10b. DOWNTOWN MASSING
   At the two lit cities only: an abstract district being born. One shared box
   geometry, ~100 instances, heights biased so most blocks are low and a few
   towers carry the silhouette, clustered on a rotated street grid with a
   radial density falloff around the beacon. The windows are not geometry —
   they are an occupancy grid in the fragment shader, correlated per floor and
   per column so it reads as a building rather than as noise. Negligible at map
   distance (one draw call, ~1.2k triangles), legible at fly-to distance.    */
const massing = (function buildMassing() {
  const mats = [];
  const PLAZA = 1.5;                 // keep a clear apron around the beacon
  for (const c of LIT) {
    /* push the district centre inland along the coast normal so a coastal city
       like Al Khobar does not hang its towers over the cliff lip */
    const gd = 3.0;
    const gxs = (sdfAt(c.x + gd, c.y) - sdfAt(c.x - gd, c.y)) / (2 * gd);
    const gys = (sdfAt(c.x, c.y + gd) - sdfAt(c.x, c.y - gd)) / (2 * gd);
    const gl = Math.hypot(gxs, gys) || 1;
    const inland = clamp(1 - sdfAt(c.x, c.y) / 26, 0, 1) * 16;   // plane units
    const ox = gxs / gl * inland, oy = gys / gl * inland;
    const gridA = rng() * Math.PI;   // the district's street bearing
    const R = 8.6;                   // district radius, world units
    const target = 50;
    const baseY = Math.max(heightAt(c.x + ox, c.y + oy), 0.05);
    let placed = 0, guard = 0;
    while (placed < target && guard++ < target * 90) {
      // sample on a loose rotated grid so blocks line up into streets
      const gx = Math.round((rng() * 2 - 1) * 6) * 1.20 + (rng() - 0.5) * 0.30;
      const gz = Math.round((rng() * 2 - 1) * 6) * 1.55 + (rng() - 0.5) * 0.34;
      const lx = gx * Math.cos(gridA) - gz * Math.sin(gridA);
      const lz = gx * Math.sin(gridA) + gz * Math.cos(gridA);
      const rad = Math.hypot(lx, lz);
      if (rad < PLAZA || rad > R) continue;
      // density falls off outward: a dense core thinning into the desert
      if (rng() > 1.0 - Math.pow(rad / R, 2.1) * 0.62) continue;
      const px = c.x + ox + lx / SCALE, py = c.y + oy + lz / SCALE;
      if (sdfAt(px, py) < 6.0) continue;
      const gy = Math.max(heightAt(px, py), 0.05);
      /* A district occupies one terrace. Without these two rejections the
         Madinah blocks marched down the Hejaz escarpment and read as scattered
         debris rather than as a downtown. */
      if (Math.abs(gy - baseY) > 1.9) continue;
      const sd = 1.6;                                   // plane units
      const sx = (heightAt(px + sd, py) - heightAt(px - sd, py)) / (2 * sd * SCALE);
      const sz = (heightAt(px, py + sd) - heightAt(px, py - sd)) / (2 * sd * SCALE);
      if (Math.hypot(sx, sz) > 0.34) continue;           // no building on a slope
      // most blocks low, a few towers — and the tallest cluster near the core
      const coreF = 1 - sstep(0.0, R, rad);
      const h = 0.85 + Math.pow(rng(), 2.2) * (2.0 + 3.3 * coreF);
      const w = 0.98 + rng() * 1.25, d = 0.98 + rng() * 1.25;
      const m = new THREE.Matrix4();
      m.compose(
        new THREE.Vector3(px2wx(px), gy + h / 2, py2wz(py)),
        new THREE.Quaternion().setFromEuler(new THREE.Euler(0, gridA + (rng() - 0.5) * 0.16, 0)),
        new THREE.Vector3(w, h, d));
      mats.push(m);
      placed++;
      // a setback storey on the taller blocks: silhouette variety for free
      if (h > 3.6 && rng() < 0.55) {
        const h2 = h * (0.22 + rng() * 0.26);
        const m2 = new THREE.Matrix4();
        m2.compose(
          new THREE.Vector3(px2wx(px), gy + h + h2 / 2, py2wz(py)),
          new THREE.Quaternion().setFromEuler(new THREE.Euler(0, gridA, 0)),
          new THREE.Vector3(w * 0.58, h2, d * 0.58));
        mats.push(m2);
      }
    }
  }

  const mat = new THREE.MeshStandardMaterial({
    color: 0xc4ac86, roughness: 0.86, metalness: 0.0,
  });
  mat.userData.u = { uTime: { value: 0 }, uDim: { value: 0 } };
  mat.onBeforeCompile = (sh) => {
    sh.uniforms.uTime = mat.userData.u.uTime;
    sh.uniforms.uDim = mat.userData.u.uDim;
    sh.vertexShader = `
      varying vec3 vLP; varying vec3 vON; varying vec3 vWN; varying float vSeed;
    ` + sh.vertexShader
      .replace('#include <begin_vertex>', `#include <begin_vertex>
        vON = normalize(normal);
        vec3 isc = vec3(1.0); float sd = 0.0;
        #ifdef USE_INSTANCING
          isc = vec3(length(instanceMatrix[0].xyz), length(instanceMatrix[1].xyz), length(instanceMatrix[2].xyz));
          sd = instanceMatrix[3].x*0.317 + instanceMatrix[3].z*0.713 + instanceMatrix[3].y*0.131;
        #endif
        vLP = position * isc;
        vSeed = sd;
        #ifdef USE_INSTANCING
          vWN = normalize(mat3(modelMatrix) * (mat3(instanceMatrix) * normal));
        #else
          vWN = normalize(mat3(modelMatrix) * normal);
        #endif`);
    sh.fragmentShader = `
      varying vec3 vLP; varying vec3 vON; varying vec3 vWN; varying float vSeed;
      uniform float uTime, uDim;
      vec3 vEmitB;
      float bh11(float p){ p=fract(p*0.1031); p*=p+33.33; p*=p+p; return fract(p); }
      float bh21(vec2 p){ vec3 q=fract(vec3(p.xyx)*0.1031); q+=dot(q,q.yzx+33.33); return fract((q.x+q.y)*q.z); }
    ` + sh.fragmentShader
      .replace('void main() {', `void main(){ vEmitB = vec3(0.0);`)
      .replace('#include <color_fragment>', `#include <color_fragment>
      {
        float seed = vSeed;
        float ax = abs(vON.x) > 0.5 ? vLP.z : vLP.x;
        float up = vLP.y;
        float faceId = abs(vON.x) > 0.5 ? (vON.x>0.0?1.0:2.0) : (vON.z>0.0?3.0:4.0);
        vec3 alb = diffuseColor.rgb;
        // warm stone, tinted per block so the district is not one colour
        float ht = bh11(seed*3.71+1.7);
        vec3 tone = ht<0.34 ? vec3(1.02,0.94,0.80)
                  : (ht<0.66 ? vec3(0.92,0.84,0.72) : vec3(1.00,0.86,0.68));
        alb *= tone * (0.86 + 0.28*bh21(vec2(ax*3.1, up*3.1)));
        // storey lines and bay joints. The window cell is deliberately coarse:
        // finer than this and it aliases into perforated brick at fly-to range
        // instead of reading as individual lit windows.
        float FH2 = 0.36, WW2 = 0.27;
        float jy = abs(fract(up/FH2) - 0.5);
        alb *= 1.0 - smoothstep(0.44,0.5,jy)*0.30;
        if (abs(vON.y) < 0.55) {
          vec2 cell = floor(vec2(ax/WW2, up/FH2));
          vec2 f = fract(vec2(ax/WW2, up/FH2));
          float h  = bh21(cell + vec2(seed*0.37, seed*0.71) + faceId*13.7);
          float hf = bh21(vec2(cell.y, 7.3) + seed*0.19);   // per-floor correlation
          float hc = bh21(vec2(cell.x, 3.1) + seed*0.53);   // per-column correlation
          float occ = 0.34 + 0.28*bh11(seed*2.7);
          float litv = h*0.55 + hf*0.28 + hc*0.17;
          float frame = step(0.20,f.x)*step(f.x,0.82)*step(0.22,f.y)*step(f.y,0.78);
          float pickv = bh21(cell.yx*1.31 + seed*0.9);
          vec3 lc = pickv<0.58 ? vec3(1.00,0.80,0.52)
                  : (pickv<0.90 ? vec3(1.00,0.92,0.74) : vec3(0.55,0.92,0.86));
          float pulse = 0.88 + 0.12*sin(uTime*0.6 + bh21(cell+seed)*28.0);
          float e = (litv < occ ? 1.0 : 0.0) * frame * pulse;
          vEmitB = lc * e * 1.30 * (1.0-uDim*0.55);
          alb = mix(alb*0.92, alb*0.62 + lc*0.16, e);
        } else {
          // roofs: a touch brighter than the walls with a parapet rim, so a
          // block never reads as an open crate seen from above
          float rim = smoothstep(0.34,0.48,max(abs(vLP.x),abs(vLP.z))/max(length(vLP.xz),0.001));
          alb *= 1.06 + 0.12*rim;
        }
        /* Fake environment light, the neon-rain idea: a dusk sky above, a warm
           sand bounce below and the sunset's own wash from the west. Without
           this the district reads as a black scab against the lit sand from any
           heading the three scene lights do not happen to favour. */
        vec3 N = normalize(vWN);
        vec3 env = vec3(0.0);
        env += vec3(0.135,0.168,0.245) * max(N.y, 0.0);          // dusk sky
        env += vec3(0.150,0.126,0.098) * (0.30 + 0.70*max(-N.y, 0.0));  // sand bounce
        env += vec3(0.215,0.148,0.092) * max(dot(N, vec3(-0.93,0.21,-0.30)), 0.0);
        env += vec3(0.058,0.062,0.080);                          // ambient floor
        vEmitB += alb * env * 1.30 * (1.0-uDim*0.45);
        diffuseColor.rgb = alb;
      }`)
      .replace('#include <emissivemap_fragment>', `#include <emissivemap_fragment>
        totalEmissiveRadiance += vEmitB;`);
  };
  mat.customProgramCacheKey = () => 'massing';

  const geo = new THREE.BoxGeometry(1, 1, 1);
  const im = new THREE.InstancedMesh(geo, mat, mats.length);
  for (let i = 0; i < mats.length; i++) im.setMatrixAt(i, mats[i]);
  im.instanceMatrix.needsUpdate = true;
  im.frustumCulled = false;
  WORLD.add(im);
  return { im, mat, count: mats.length };
})();
mark('massing');

/* =============================================================== 11. CLOUDS */
/* Nine thin wisps that actually sit BETWEEN the camera and the relief.
   The previous pass laid them flat (rotation.x = -PI/2), so a high camera saw
   them edge-on and they disappeared from every frame. These are camera-facing
   sprites at relief height: six veiling wisps in normal blending (they occlude,
   which is what makes them read as cloud rather than as glow) and three thin
   high ones in additive that catch the last of the sunset from the west.     */
const clouds = [];
(function makeWisps() {
  const veil = 6, lit = 3;
  for (let i = 0; i < veil + lit; i++) {
    const isLit = i >= veil;
    const w = isLit ? (150 + rng() * 130) : (110 + rng() * 150);
    const h = w * (isLit ? 0.075 + rng() * 0.055 : 0.13 + rng() * 0.10);
    // west-side wisps take the warm sunset, east-side ones stay in dusk blue
    const warmth = rng();
    const tint = isLit
      ? C(0xe8b98a).lerp(C(0xc98a72), warmth * 0.5)
      : C(0x5d7fa6).lerp(C(0xc9a58c), Math.pow(warmth, 1.4) * 0.62);
    const m = new THREE.SpriteMaterial({
      map: TEX_WISP, transparent: true, depthWrite: false, fog: false,
      color: tint, opacity: isLit ? 0.20 + rng() * 0.10 : 0.30 + rng() * 0.16,
      blending: isLit ? THREE.AdditiveBlending : THREE.NormalBlending,
    });
    const s = new THREE.Sprite(m);
    s.scale.set(w, h, 1);
    s.position.set(-300 + rng() * 660, isLit ? 62 + rng() * 44 : 22 + rng() * 34,
      -220 + rng() * 460);
    s.renderOrder = isLit ? 11 : 12;
    scene.add(s);
    clouds.push({
      mesh: s, speed: (isLit ? 0.9 : 0.5) + rng() * 0.7, w,
      baseY: s.position.y, baseOp: m.opacity, ph: rng() * 100,
    });
  }
})();

/* ========================================================= 12. POSTPROCESS */
const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));
/* Bloom law taken from the gold-standard worlds: LOW strength, HIGH threshold —
   only genuinely over-bright pixels bloom, and they bloom gently. The previous
   0.58 / 0.70 pair (a low threshold with high strength) is what smeared the
   beacons into white. */
const bloom = new UnrealBloomPass(new THREE.Vector2(innerWidth, innerHeight), 0.40, 0.62, 1.02);
composer.addPass(bloom);

const GradeShader = {
  uniforms: {
    tDiffuse: { value: null }, uTime: { value: 0 },
    uVig: { value: 0.92 }, uDim: { value: 0 },
    uRes: { value: new THREE.Vector2(1, 1) },
  },
  vertexShader: `varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);} `,
  fragmentShader: `
    uniform sampler2D tDiffuse; uniform float uTime,uVig,uDim; uniform vec2 uRes;
    varying vec2 vUv;
    void main(){
      vec2 uv = vUv;
      vec2 d = uv-0.5;
      float r = length(d);
      // gentle chromatic separation at the frame edge
      float ca = 0.0016*r*r;
      vec3 c;
      c.r = texture2D(tDiffuse, uv - d*ca).r;
      c.g = texture2D(tDiffuse, uv).g;
      c.b = texture2D(tDiffuse, uv + d*ca).b;
      // split tone: cool shadows, warm highlights
      float l = dot(c, vec3(0.2126,0.7152,0.0722));
      c += vec3(-0.010,0.002,0.030)*(1.0-smoothstep(0.0,0.28,l));
      c += vec3(0.028,0.008,-0.014)*smoothstep(0.35,1.0,l);
      // vignette
      float v = smoothstep(1.16, uVig*0.36, r*1.32);
      c *= mix(0.60, 1.0, v);
      c *= 1.0-uDim*0.42;
      // fine grain keeps the gradients from banding
      float g = fract(sin(dot(uv*uRes+uTime, vec2(12.9898,78.233)))*43758.5453);
      c += (g-0.5)*0.0075;
      gl_FragColor = vec4(c,1.0);
    }`,
};
const grade = new ShaderPass(GradeShader);
composer.addPass(grade);
composer.addPass(new OutputPass());
const fxaa = new ShaderPass(FXAAShader);
composer.addPass(fxaa);

function setSizes() {
  const w = innerWidth, h = innerHeight, pr = renderer.getPixelRatio();
  camera.aspect = w / h; camera.updateProjectionMatrix();
  renderer.setSize(w, h);
  composer.setSize(w, h);
  labelRenderer.setSize(w, h);
  bloom.resolution.set(w, h);
  fxaa.material.uniforms.resolution.value.set(1 / (w * pr), 1 / (h * pr));
  grade.uniforms.uRes.value.set(w, h);
}
setSizes();
addEventListener('resize', setSizes);

/* ================================================================ 13. LABELS */
const LBL_OFF = {
  'Al Ahsa': [52, 40], 'Taif': [-38, 24], 'Buraydah': [10, -22], 'Hail': [16, -26],
  'Arar': [46, -26], 'Dumat Al Jandal': [-62, -20], 'Tabuk': [-18, 14], 'Al Baha': [-34, 20],
  'Najran': [34, 16], 'Jizan': [16, -20], 'Al Khobar': [0, -4], 'Madinah': [-6, -2],
};
CITIES.forEach(c => {
  const el = document.createElement('div');
  el.className = 'city-label' + (c.lit ? ' is-lit' : '');
  el.innerHTML = `<div class="cl-in">` +
    (c.lit ? `<div class="cl-badge">NOW LIVE</div>` : '') +
    `<div class="cl-ar" dir="rtl" lang="ar">${c.ar}</div>` +
    `<div class="cl-en">${c.name}</div>` +
    `<div class="cl-prop">${c.prop}</div>` +
    `<div class="cl-stem"></div></div>`;
  const obj = new CSS2DObject(el);
  const off = LBL_OFF[c.name] || [0, 0];
  obj.position.set(px2wx(c.x + off[0]), c.wy + (c.lit ? 18.0 : 3.4), py2wz(c.y + off[1]));
  obj.center.set(0.5, 1);
  WORLD.add(obj);
  c.labelEl = el; c.labelObj = obj; c.wlabel = null;
});

WORLD.updateMatrixWorld(true);
CITIES.forEach(c => { c.wlabel = toWorld(c.labelObj.position); });

/* ============================================================ 14. UI / PANEL */
const ui = {
  title: document.getElementById('titleLockup'),
  hint: document.getElementById('hint'),
  panel: document.getElementById('panel'),
  scrim: document.getElementById('scrim'),
  toast: document.getElementById('toast'),
  legend: document.getElementById('legend'),
};

const RENDERS = {
  'Al Khobar': [
    { src: IMG.khobar1, cap: 'Official SDC render' },
    { src: IMG.khobar2, cap: 'Official SDC render' },
  ],
  'Madinah': [
    { src: IMG.madinah1, cap: 'Official SDC render' },
    { src: IMG.madinah2, cap: 'Official SDC render' },
  ],
};

let activeCity = null;
let dimT = 0, dimTarget = 0;

function buildPanel(c) {
  const lit = !!c.lit;
  const imgs = RENDERS[c.name] || [];
  let html = '';
  html += `<button class="p-close" aria-label="Close">&#215;</button>`;
  html += `<div class="p-scroll">`;
  html += `<div class="p-kicker">${lit ? 'DOWNTOWN · NOW LIVE' : 'DOWNTOWN · IN PREPARATION'}</div>`;
  html += `<h1 class="p-ar" dir="rtl" lang="ar">${c.ar}</h1>`;
  html += `<div class="p-en">${c.name}</div>`;
  html += `<div class="p-rule ${lit ? 'warm' : ''}"></div>`;
  html += `<div class="p-prop">${c.prop}</div>`;
  html += `<div class="p-prop-ar" dir="rtl" lang="ar">${c.propAr}</div>`;
  if (lit && imgs.length) {
    html += `<div class="p-figs">`;
    for (const im of imgs) {
      html += `<figure class="p-fig"><img src="${im.src}" alt="${c.name} downtown render"><figcaption>${im.cap}</figcaption></figure>`;
    }
    html += `</div>`;
    html += `<div class="p-story">${c.story}</div>`;
    html += `<div class="p-meta"><div><span>DISTRICT</span><b>Downtown ${c.name}</b></div><div><span>STATUS</span><b class="live">Lights on</b></div></div>`;
    html += `<button class="p-cta" id="ctaBtn">Register Your Interest</button>`;
  } else {
    html += `<div class="p-plate"><div class="p-plate-ar" dir="rtl" lang="ar">${c.ar}</div>` +
            `<div class="p-plate-em"></div><div class="p-plate-cap">Downtown in preparation</div></div>`;
    html += `<div class="p-soon">The story of ${c.name} begins soon.</div>`;
    html += `<div class="p-soon-ar" dir="rtl" lang="ar">حكاية ${c.ar} تبدأ قريباً.</div>`;
    html += `<div class="p-note">One of twelve downtowns. Two are lit tonight.</div>`;
    html += `<div class="p-meta"><div><span>DISTRICT</span><b>Downtown ${c.name}</b></div><div><span>STATUS</span><b>In preparation</b></div></div>`;
    html += `<button class="p-cta ghost" id="ctaBtn">Notify Me</button>`;
  }
  html += `<a class="p-back" href="#" id="backLink">&#8592; Back to the Kingdom</a>`;
  html += `</div>`;
  ui.panel.innerHTML = html;
  ui.panel.classList.toggle('waiting', !lit);
  ui.panel.querySelector('.p-close').addEventListener('click', closeCity);
  ui.panel.querySelector('#backLink').addEventListener('click', (e) => { e.preventDefault(); closeCity(); });
  ui.panel.querySelector('#ctaBtn').addEventListener('click', showToast);
}

let toastTimer = 0;
function showToast() {
  ui.toast.textContent = 'Coming with launch';
  ui.toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => ui.toast.classList.remove('show'), 2400);
}

/* --------------------------------------------------------- camera tweening */
const tween = { active: false, t: 0, dur: 1200, p0: new THREE.Vector3(), p1: new THREE.Vector3(), t0: new THREE.Vector3(), t1: new THREE.Vector3() };
const easeIO = (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

function flyTo(pos, tgt, dur = 1250) {
  tween.p0.copy(camera.position); tween.p1.copy(pos);
  tween.t0.copy(controls.target); tween.t1.copy(tgt);
  tween.t = 0; tween.dur = dur; tween.active = true;
}

function cityShot(c, withPanel) {
  const dist = c.lit ? 98 : 84;
  const el = c.lit ? 0.40 : 0.60;
  const az = c.lit ? -2.30 : -2.05;                 // look from the south-west
  const dir = new THREE.Vector3(Math.cos(az) * Math.cos(el), Math.sin(el), Math.sin(az) * Math.cos(el));
  const tgt = c.wpos.clone(); tgt.y += c.lit ? 7 : 3;
  /* coastal waiting cities sat with half the frame full of empty sea — push the
     look-at point inland along the coast normal so the relief fills the shot */
  if (!c.lit) {
    const gd = 3.0;
    const gxs = (sdfAt(c.x + gd, c.y) - sdfAt(c.x - gd, c.y)) / (2 * gd);
    const gys = (sdfAt(c.x, c.y + gd) - sdfAt(c.x, c.y - gd)) / (2 * gd);
    const gl = Math.hypot(gxs, gys) || 1;
    const inl = clamp(1 - sdfAt(c.x, c.y) / 40, 0, 1) * 22;      // plane units
    const iw = toWorld(new THREE.Vector3(px2wx(c.x + gxs / gl * inl), c.wy,
      py2wz(c.y + gys / gl * inl)));
    tgt.x = iw.x; tgt.z = iw.z;
  }
  const pos = tgt.clone().add(dir.multiplyScalar(dist));
  if (withPanel) {
    // shift framing so the beacon sits left of the panel
    const right = new THREE.Vector3().subVectors(pos, tgt).normalize().cross(new THREE.Vector3(0, 1, 0)).normalize();
    const visW = 2 * dist * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.aspect;
    const shift = visW * (Math.min(430, innerWidth * 0.34) / innerWidth) * 0.62;
    tgt.add(right.clone().multiplyScalar(-shift));
    pos.add(right.clone().multiplyScalar(-shift));
  }
  return { pos, tgt };
}

function openCity(name, instant = false) {
  const c = CITIES.find(x => x.name === name);
  if (!c) return;
  activeCity = c;
  buildPanel(c);
  const shot = cityShot(c, true);
  if (instant) { camera.position.copy(shot.pos); controls.target.copy(shot.tgt); controls.update(); }
  else flyTo(shot.pos, shot.tgt, c.lit ? 1350 : 1150);
  document.body.classList.add('panel-open');
  dimTarget = 1;
  CITIES.forEach(x => x.labelEl.classList.toggle('muted', x !== c));
  hideIntro();
}
function closeCity() {
  activeCity = null;
  document.body.classList.remove('panel-open');
  dimTarget = 0;
  CITIES.forEach(x => x.labelEl.classList.remove('muted'));
  flyTo(POSTER.pos.clone(), POSTER.tgt.clone(), 1500);
  ui.toast.classList.remove('show');
}
ui.scrim.addEventListener('click', closeCity);
addEventListener('keydown', (e) => { if (e.key === 'Escape' && activeCity) closeCity(); });

window.__openCity = (n) => openCity(n);
window.__flyTo = (n) => { const c = CITIES.find(x => x.name === n); if (c) { const s = cityShot(c, false); flyTo(s.pos, s.tgt, 1200); } };
window.__closePanel = closeCity;
window.__home = () => flyTo(POSTER.pos.clone(), POSTER.tgt.clone(), 1200);
window.__wide = () => flyTo(new THREE.Vector3(-34, 214, 214), new THREE.Vector3(4, 0, -6), 1200);
window.__cam = (p, t, d) => flyTo(new THREE.Vector3(p[0], p[1], p[2]), new THREE.Vector3(t[0], t[1], t[2]), d || 1000);

/* ------------------------------------------------------------------- hover */
const raycaster = new THREE.Raycaster();
const ptr = new THREE.Vector2(-10, -10);
let hovered = null;
renderer.domElement.addEventListener('pointermove', (e) => {
  ptr.x = (e.clientX / innerWidth) * 2 - 1;
  ptr.y = -(e.clientY / innerHeight) * 2 + 1;
  markIdle();
});
renderer.domElement.addEventListener('pointerleave', () => { ptr.set(-10, -10); });

function setHover(c) {
  if (hovered === c) return;
  if (hovered) hovered.labelEl.classList.remove('hover');
  hovered = c;
  if (hovered) hovered.labelEl.classList.add('hover');
  renderer.domElement.style.cursor = hovered ? 'pointer' : 'grab';
}
window.__hover = (n) => {
  const c = CITIES.find(x => x.name === n);
  if (!c) return;
  setHover(c);
  hoverLock = c;
};
let hoverLock = null;

let downXY = null;
renderer.domElement.addEventListener('pointerdown', (e) => { downXY = [e.clientX, e.clientY]; markIdle(); });
renderer.domElement.addEventListener('pointerup', (e) => {
  if (!downXY) return;
  const moved = Math.hypot(e.clientX - downXY[0], e.clientY - downXY[1]);
  downXY = null;
  if (moved > 6) return;
  ptr.x = (e.clientX / innerWidth) * 2 - 1;
  ptr.y = -(e.clientY / innerHeight) * 2 + 1;
  raycaster.setFromCamera(ptr, camera);
  const hit = raycaster.intersectObjects(pickables, false)[0];
  if (hit) openCity(hit.object.userData.city.name);
});
renderer.domElement.addEventListener('wheel', markIdle, { passive: true });

/* ------------------------------------------------------------------- intro */
let introDone = false;
function hideIntro() {
  if (introDone) return;
  introDone = true;
  ui.hint.classList.add('fade');
}
setTimeout(() => { ui.title.classList.add('in'); }, 380);
setTimeout(() => { ui.hint.classList.add('in'); }, 1900);
setTimeout(() => { ui.legend.classList.add('in'); }, 2300);

/* --------------------------------------------------------------- idle drift */
let lastInput = performance.now();
let idleActive = false;
let engaged = false;
function markIdle() {
  lastInput = performance.now(); idleActive = false;
  if (!engaged) { engaged = true; document.body.classList.add('engaged'); hideIntro(); }
}
controls.addEventListener('start', markIdle);

/* ================================================================ 15. LOOP */
const clock = new THREE.Clock();
window.__frames = 0;
let sph = new THREE.Spherical();

function animate() {
  requestAnimationFrame(animate);
  const dt = Math.min(clock.getDelta(), 0.1);
  const t = clock.elapsedTime;

  // tween
  if (tween.active) {
    tween.t += dt * 1000;
    const k = easeIO(clamp(tween.t / tween.dur, 0, 1));
    camera.position.lerpVectors(tween.p0, tween.p1, k);
    controls.target.lerpVectors(tween.t0, tween.t1, k);
    if (tween.t >= tween.dur) tween.active = false;
    markIdle();
  }

  // idle cinematic drift
  if (!tween.active && performance.now() - lastInput > 20000) {
    idleActive = true;
    const off = new THREE.Vector3().subVectors(camera.position, controls.target);
    sph.setFromVector3(off);
    sph.theta += dt * 0.019;
    sph.phi += Math.sin(t * 0.07) * dt * 0.004;
    off.setFromSpherical(sph);
    camera.position.copy(controls.target).add(off);
  }

  // clamp pan to the map
  controls.target.x = clamp(controls.target.x, -160, 160);
  controls.target.z = clamp(controls.target.z, -135, 135);
  controls.target.y = clamp(controls.target.y, -8, 34);
  controls.update();

  // dim during panel
  dimT += (dimTarget - dimT) * Math.min(1, dt * 4.2);
  const dimV = dimT * 0.34;
  terrain.mat.uniforms.uDim.value = dimV;
  seaMat.uniforms.uDim.value = dimV;
  glimmer.m.uniforms.uDim.value = dimT * 0.5;
  grade.uniforms.uDim.value = dimT * 0.55;
  renderer.toneMappingExposure = 1.00 - dimT * 0.12;

  // animated uniforms
  skyMat.uniforms.uTime.value = t;
  stars.m.uniforms.uTime.value = t;
  seaMat.uniforms.uTime.value = t;
  if (groundMistMat) { groundMistMat.uniforms.uTime.value = t; groundMistMat.uniforms.uDim.value = dimT; }
  glimmer.m.uniforms.uTime.value = t;
  grade.uniforms.uTime.value = t;
  terrain.mat.uniforms.uTime.value = t;
  massing.mat.userData.u.uTime.value = t;
  massing.mat.userData.u.uDim.value = dimT;
  for (const m of clusterMats) { m.uniforms.uTime.value = t; m.uniforms.uDim.value = dimT * 0.35; }

  // beacons breathe
  CITIES.forEach((c, i) => {
    const ph = i * 1.7;
    const breathe = 0.5 + 0.5 * Math.sin(t * (c.lit ? 0.62 : 0.44) + ph);
    const hov = (hovered === c ? 1 : 0);
    const act = (activeCity === c ? 1 : 0);
    const boost = 1 + hov * 0.32 + act * 0.28;
    const cd = camera.position.distanceTo(c.wpos);
    const near = clamp((cd - 40) / 150, 0.30, 1);
    /* the ground pool is a poster-distance device: it makes all twelve cities
       countable from far away and gets out of the way once you fly in, where a
       ring on the terrain would read as game UI. */
    const ringVis = clamp((cd - 66) / 96, 0, 1);
    if (c.lit) {
      // the core is deliberately SMALLER and dimmer close up: at fly-to range
      // the district and the shaft carry the shot, not a hot sprite
      c.core.scale.setScalar((1.9 + 3.6 * near + breathe * 1.2 * near) * boost);
      c.core.material.opacity = (0.22 + 0.54 * near) * (0.94 + 0.06 * breathe);
      // the lit pair must always out-read the ten waiting embers, from every
      // angle — including from above, where a vertical shaft is foreshortened
      // to nothing and only the halo shells carry the beacon
      c.halo.scale.setScalar((7 + 11 * near + breathe * 4.4 * near) * boost);
      c.halo.material.opacity = (0.31 + breathe * 0.13) * boost * (0.46 + 0.54 * near);
      c.shell.scale.setScalar((24 + 18 * near + breathe * 5.5) * boost);
      c.shell.material.opacity = (0.42 + breathe * 0.13) * (0.38 + 0.62 * near);
      c.groundGlow.material.opacity = (0.30 + breathe * 0.09) * (0.06 + 0.94 * near);
      // the lit cities are announced by their shaft, not by a ground ring
      c.haloRing.material.opacity = (0.15 + breathe * 0.05) * ringVis;
      c.shaftMat.uniforms.uTime.value = t;
      c.shaftMat.uniforms.uNear.value = near;
      c.shaftMat.uniforms.uInt.value = (0.96 + breathe * 0.16) * boost;
      c.shaftMat.uniforms.uDim.value = dimT;
      c.shaftMat2.uniforms.uTime.value = t;
      c.shaftMat2.uniforms.uNear.value = near;
      c.shaftMat2.uniforms.uInt.value = (0.38 + breathe * 0.10) * boost;
      c.shaftMat2.uniforms.uDim.value = dimT;
    } else {
      const wn = clamp((cd - 34) / 130, 0.34, 1);
      c.core.scale.setScalar((1.5 + 2.7 * wn + breathe * 1.1 * wn) * boost);
      c.core.material.opacity = (0.54 + 0.40 * wn) * (0.7 + 0.3 * boost);
      c.halo.scale.setScalar((4.0 + 7.0 * wn + breathe * 2.8 * wn) * boost);
      c.halo.material.opacity = (0.32 + breathe * 0.18) * boost * (0.44 + 0.56 * wn);
      c.groundGlow.material.opacity = (0.38 + breathe * 0.20) * (0.30 + 0.70 * wn);
      // the mint footprint: does its counting job at poster distance, then
      // fades away before it can read as a selection ring
      c.haloRing.material.opacity = (0.34 + breathe * 0.08) * ringVis * boost;
    }
    c.rings.forEach(m => { m.uniforms.uTime.value = t; m.uniforms.uDim.value = dimV; });
  });
  // terrain beacon spill
  LIT.forEach((c, i) => {
    const breathe = 0.5 + 0.5 * Math.sin(t * 0.62 + CITIES.indexOf(c) * 1.7);
    terrain.mat.uniforms.uBeaconInt.value[i] = (0.42 + breathe * 0.12) * (activeCity === c ? 1.25 : 1) * (1 - dimT * 0.25);
  });

  // wisps drift: slow lateral travel, a long vertical breath, and an opacity
  // swell so they thicken and thin as they cross the frame
  for (const cl of clouds) {
    cl.mesh.position.x += cl.speed * dt * 1.7;
    if (cl.mesh.position.x > 400) cl.mesh.position.x = -400;
    cl.mesh.position.y = cl.baseY + Math.sin(t * 0.055 + cl.ph) * 3.4;
    cl.mesh.material.opacity = cl.baseOp * (0.72 + 0.28 * Math.sin(t * 0.085 + cl.ph * 1.7))
      * (1 - dimT * 0.45);
  }

  // hover raycast (cheap: 12 spheres)
  if (!hoverLock) {
    if (ptr.x > -5) {
      raycaster.setFromCamera(ptr, camera);
      const hit = raycaster.intersectObjects(pickables, false)[0];
      setHover(hit ? hit.object.userData.city : null);
    } else setHover(null);
  }

  // label scale / fade / collision culling
  const camPos = camera.position;
  const order = CITIES.slice().sort((a, b) =>
    (b.lit - a.lit) || (camPos.distanceTo(a.wpos) - camPos.distanceTo(b.wpos)));
  const boxes = [];
  const pv = new THREE.Vector3();
  for (const c of order) {
    const d = camPos.distanceTo(c.wpos);
    const s = clamp(1.16 - (d - 55) / 300, 0.62, 1.18);
    const near = clamp(1 - (d - 230) / 200, 0.20, 1);
    c.labelEl.style.setProperty('--s', s.toFixed(3));
    c.labelEl.style.setProperty('--o', near.toFixed(3));
    pv.copy(c.wlabel || c.wpos).project(camera);
    const sxp = (pv.x * 0.5 + 0.5) * innerWidth, syp = (-pv.y * 0.5 + 0.5) * innerHeight;
    const hw = (c.lit ? 84 : 46) * s, hh = (c.lit ? 40 : 17) * s;
    let ok = d < 500 && pv.z < 1 && (activeCity ? c === activeCity : true);
    if (ok) {
      for (const b of boxes) {
        if (Math.abs(sxp - b[0]) < hw + b[2] && Math.abs(syp - b[1]) < hh + b[3]) { ok = false; break; }
      }
    }
    if (ok) boxes.push([sxp, syp, hw, hh]);
    c.labelObj.visible = ok;
  }

  composer.render();
  labelRenderer.render(scene, camera);
  window.__frames++;
}
animate();

/* boot: reveal once the first frames are on screen */
requestAnimationFrame(() => requestAnimationFrame(() => {
  document.body.classList.add('ready');
  window.__ready = true;
}));

mark('boot');
window.__stats = () => ({ glimmer: glimmer.count, timing: TM,
  tris: Object.values(scene.children).length, terrainTris: terrain.mesh.geometry.index.count / 3 });
window.__timing = TM;
