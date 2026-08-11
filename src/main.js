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

const MAP = {"d":"M0.0,208.7L2.6,205.4L4.0,205.7L3.6,204.1L4.5,203.7L4.8,200.5L5.5,200.9L4.8,200.1L6.8,197.5L11.0,187.1L9.8,180.0L12.6,171.4L12.8,168.3L12.0,167.7L13.5,164.4L13.3,160.2L16.0,150.5L17.5,149.5L17.9,144.2L68.5,152.6L71.1,152.1L90.4,136.8L102.3,118.1L137.5,110.7L146.0,93.2L161.8,84.5L138.0,58.0L113.3,32.8L208.4,6.6L217.7,0.0L277.8,10.5L356.2,54.2L393.4,84.7L480.4,152.0L559.4,159.2L567.8,157.5L610.5,162.8L616.1,174.5L617.6,181.7L621.7,186.8L658.0,186.4L660.9,188.5L661.5,192.9L661.1,194.1L659.7,194.4L662.8,193.4L662.2,198.0L666.8,203.3L665.9,206.9L668.4,212.2L675.0,214.2L672.7,216.6L679.3,223.6L678.9,226.6L677.3,228.7L678.1,224.8L677.9,224.1L675.6,227.3L676.6,224.4L676.0,223.5L674.4,229.2L675.9,228.0L676.1,230.8L677.3,229.8L678.2,232.1L679.2,230.8L679.1,233.1L678.2,233.3L678.9,234.8L676.9,234.8L678.8,235.1L680.2,233.7L679.7,236.0L680.8,236.9L680.9,235.0L683.4,234.3L687.5,237.1L687.9,237.7L687.0,238.3L687.7,238.6L688.3,237.6L696.3,238.3L699.4,241.5L699.7,243.3L698.4,241.9L697.4,243.1L694.8,242.8L693.5,243.7L692.4,242.8L690.6,243.7L694.7,246.1L696.3,244.4L697.4,245.1L695.8,246.9L695.5,249.4L698.1,248.0L699.7,248.7L700.2,255.9L701.0,255.8L701.3,257.1L702.5,255.3L704.5,256.0L703.8,258.2L702.3,258.3L702.7,258.9L704.2,259.7L705.6,258.0L705.4,259.2L709.8,259.7L708.1,257.5L709.4,256.8L710.8,257.6L712.1,256.5L712.0,261.2L718.1,268.8L726.3,273.8L731.1,274.9L735.7,280.8L739.9,284.1L740.1,285.4L736.8,282.8L733.5,282.3L732.7,279.8L731.8,281.0L732.5,289.0L733.8,293.0L735.1,294.6L741.5,297.7L742.7,301.8L742.4,308.7L741.0,310.4L740.6,309.3L739.7,310.1L739.1,316.8L737.7,313.3L733.9,308.2L731.2,311.4L732.9,314.7L731.9,315.6L731.9,318.6L733.4,318.5L733.5,316.8L737.2,319.3L738.4,321.8L737.5,323.1L738.0,325.6L744.1,335.4L744.6,337.9L743.1,335.0L739.2,332.6L739.4,334.3L741.0,335.7L741.7,335.0L748.9,345.7L750.1,346.8L749.6,344.6L750.5,344.1L751.8,346.6L754.8,348.0L757.1,354.4L756.9,358.0L758.4,361.7L759.1,367.9L761.2,368.6L763.8,371.8L764.7,375.3L766.9,376.9L768.5,384.5L769.7,385.0L770.7,384.0L774.2,389.7L776.5,392.3L778.8,393.3L784.4,393.7L790.1,390.3L792.6,390.3L794.4,391.0L793.6,392.7L794.2,395.9L798.3,391.8L798.6,390.0L803.5,392.5L800.9,394.0L798.6,397.4L795.8,399.5L793.1,406.8L796.2,407.3L799.4,406.0L802.6,406.7L806.9,409.5L807.1,416.2L808.0,418.8L852.9,477.3L855.0,478.5L974.7,494.6L978.6,490.3L999.5,525.7L1000.0,528.1L968.7,631.3L826.3,683.4L691.0,703.4L686.6,705.0L645.1,727.5L617.9,763.2L610.3,782.5L597.6,790.0L588.5,789.5L578.0,774.0L576.2,773.0L557.8,775.6L515.4,771.1L505.6,765.6L502.9,765.0L478.2,764.8L474.2,766.2L466.7,765.5L457.6,767.0L454.6,766.2L451.6,769.4L447.7,768.1L443.5,771.6L442.5,771.0L442.2,768.9L434.7,768.9L427.5,762.2L423.2,760.4L419.7,760.2L414.5,763.4L407.9,770.3L410.6,771.3L412.0,773.1L411.9,774.2L407.5,776.4L405.7,782.8L406.5,786.8L405.4,792.0L407.0,795.9L410.1,797.9L408.1,801.0L408.6,804.8L404.1,804.3L401.8,811.4L395.6,814.4L395.2,817.6L390.1,820.0L390.3,815.8L387.2,810.9L387.6,804.4L386.0,802.4L386.4,801.3L382.8,796.9L379.9,796.0L378.3,793.6L379.0,791.4L378.4,787.1L376.9,785.4L373.8,784.7L372.1,779.2L369.5,777.8L370.8,781.0L369.9,781.6L369.8,786.0L366.9,763.7L359.3,757.6L357.0,753.3L355.1,753.3L346.4,744.6L342.5,743.9L337.3,737.3L337.1,734.7L333.3,730.2L333.7,729.3L331.8,725.3L329.9,725.0L330.5,724.3L329.7,723.4L328.5,723.6L329.2,721.1L327.5,720.7L325.8,710.8L322.0,705.6L318.2,704.4L315.1,698.9L316.9,691.8L313.2,689.8L311.6,686.5L313.5,679.7L308.4,676.6L307.0,673.6L306.8,669.4L303.0,665.3L302.2,661.3L303.2,659.4L302.5,656.8L297.3,654.7L293.7,651.5L295.4,651.9L295.5,647.1L293.0,642.7L288.7,641.8L288.8,643.6L282.7,635.8L283.0,633.1L278.8,630.6L276.3,627.8L272.5,626.4L268.7,622.6L269.0,621.8L265.5,620.7L261.6,616.6L257.3,617.2L253.0,615.1L254.8,617.6L246.3,612.8L237.1,601.5L238.4,600.4L236.0,598.9L233.6,594.3L234.2,592.2L231.9,591.6L232.9,592.6L231.9,592.3L230.3,590.9L230.3,588.7L231.9,589.7L231.5,588.0L229.7,587.0L229.6,588.0L227.2,586.2L226.3,584.9L226.4,583.7L227.2,584.4L226.9,583.2L224.3,583.0L221.5,575.8L218.4,573.4L217.6,570.3L218.3,569.1L214.0,562.6L218.3,558.0L217.7,552.6L216.9,550.9L215.9,552.1L214.6,549.0L213.8,543.0L215.3,540.1L215.0,539.5L213.3,541.3L207.8,531.0L206.9,526.7L208.2,525.2L210.4,526.9L212.3,520.2L212.4,519.1L211.4,520.9L211.1,520.1L212.1,514.7L216.9,506.0L215.6,505.2L214.7,507.7L213.5,507.9L214.0,498.5L209.5,489.3L210.8,487.0L207.6,483.7L208.8,488.1L205.5,483.1L203.1,477.9L204.5,478.6L206.0,482.1L207.8,482.6L208.5,481.7L205.1,476.7L200.7,475.0L199.7,472.8L200.9,470.8L200.6,467.1L199.6,467.7L195.5,460.7L191.2,445.3L189.3,445.6L191.0,447.8L188.3,446.6L188.3,444.1L186.2,441.3L184.2,434.1L181.7,432.5L180.0,429.6L171.5,424.1L166.5,419.2L164.9,419.3L159.6,415.6L161.9,414.2L159.8,414.4L160.2,412.1L158.5,412.9L158.8,415.1L156.3,415.0L147.3,407.7L144.9,408.2L145.1,409.9L140.0,408.9L135.6,403.7L135.1,402.0L135.5,400.9L136.8,401.7L136.9,399.9L126.1,384.4L126.0,381.2L123.7,381.2L122.3,378.5L125.6,378.8L127.4,377.5L128.5,372.6L126.7,361.6L120.2,354.0L118.1,348.9L118.9,348.3L116.1,345.0L112.2,337.1L109.6,335.7L106.6,331.3L105.5,331.2L105.4,333.3L101.1,330.2L99.2,325.0L101.3,321.6L100.8,317.5L98.2,315.6L93.2,314.4L92.1,312.9L82.4,292.8L78.7,286.1L72.4,279.5L69.3,271.5L68.4,271.7L63.6,266.7L58.4,259.2L58.9,256.7L57.5,254.4L46.8,242.9L44.5,238.3L44.0,234.4L39.0,226.2L37.0,224.9L35.6,221.0L31.9,216.5L28.0,214.1L31.1,212.9L30.6,211.7L28.0,211.6L22.7,208.4L21.2,208.7L21.7,209.4L20.2,208.6L16.9,210.5L13.6,210.1L13.0,210.9L12.8,209.4L13.9,208.7L12.5,208.5L11.0,210.9L10.4,210.5L11.7,208.7L9.4,209.7L6.5,207.3L3.5,209.4L4.5,210.9L1.9,213.0L1.6,209.6L0.1,209.7Z","W":1000.0,"H":820.0,"pts":[{"name":"Al Khobar","x":742.3,"y":304.2,"lit":1},{"name":"Madinah","x":239.3,"y":398.4,"lit":1},{"name":"Al Ahsa","x":711.9,"y":351.8,"lit":0},{"name":"Buraydah","x":446.3,"y":301.7,"lit":0},{"name":"Hail","x":338.1,"y":239.4,"lit":0},{"name":"Taif","x":277.4,"y":564.7,"lit":0},{"name":"Arar","x":306.9,"y":59.7,"lit":0},{"name":"Dumat Al Jandal","x":251.4,"y":120.3,"lit":0},{"name":"Tabuk","x":94.1,"y":194.6,"lit":0},{"name":"Al Baha","x":327.3,"y":630.4,"lit":0},{"name":"Jizan","x":378.8,"y":793.1,"lit":0},{"name":"Najran","x":453.8,"y":761.7,"lit":0}],"k":"111111111111111111000000000000000000000000222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222220000000000000020222222000000000000000000000000000000000000000000000000000000000111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111011","geo":{"lon0":34.572765,"lat0":32.121348,"kx":0.91179,"sx":52.065257}};
const IMG = /*@IMAGES@*/;

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
/* ------------------------------------------------------------- QA / params *
   Every authored view in this file is addressable from the URL so a headless
   shot can be reproduced exactly:
     ?seed=N            world seed (default 20260811 — identical world reload)
     ?scene=map|city    boot straight into the map or into the district
     ?shot=1..6         jump to an authored bookmark
     ?cam=x,y,z,yaw,pitch  explicit pose (map: yaw/pitch orbit the target)
     ?nolife=1 ?noveil=1 ?fast=1   QA switches
   Key P prints the live pose, F3 toggles the debug HUD.                      */
const QP = new URLSearchParams(location.search);
const QA = {
  seed: QP.has('seed') ? (parseInt(QP.get('seed'), 10) || 0) : 20260811,
  scene: QP.get('scene') || 'map',
  shot: QP.has('shot') ? parseInt(QP.get('shot'), 10) : 0,
  cam: QP.has('cam') ? QP.get('cam').split(',').map(Number) : null,
  hud: QP.get('hud') === '1',
  noveil: QP.get('noveil') === '1',
  nolife: QP.get('nolife') === '1',
  walk: QP.get('walk') === '1',
  flat: QP.get('flat') === '1',   // drop the plinth tilt for the map-truth check
  grade: QP.get('grade') !== '0',
};
const SEED = QA.seed;
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

/* --- geographic frame ------------------------------------------------------
   The outline is Natural Earth 10m admin-0, plate carree with a cos(mid-lat)
   x-scale. Everything downstream that needs to know *where in the Kingdom* it
   is — the Hejaz spine, the Tuwaiq scarp, the Nafud and the Rub' al Khali —
   is authored in real degrees and projected through ll(), so the terrain is
   checkable against an atlas rather than against a memory of one.           */
const GEO = MAP.geo;
const ll = (lon, lat) => [(lon - GEO.lon0) * GEO.kx * GEO.sx, (GEO.lat0 - lat) * GEO.sx];
const llx = (lon) => (lon - GEO.lon0) * GEO.kx * GEO.sx;
const lly = (lat) => (GEO.lat0 - lat) * GEO.sx;
const px2lon = (px) => px / (GEO.kx * GEO.sx) + GEO.lon0;
const py2lat = (py) => GEO.lat0 - py / GEO.sx;

// --- coast classification -------------------------------------------------
// Per-vertex, baked from the real distance to every neighbouring country's
// boundary: 0 = inland border, 1 = Red Sea / Gulf of Aqaba, 2 = Arabian Gulf.
const SEG_KIND = new Uint8Array(N);
(function classify() {
  const k = MAP.k || '';
  for (let i = 0; i < N; i++) SEG_KIND[i] = k.charCodeAt(i) - 48 || 0;
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

/* ========================================================= 1b. REAL RELIEF
   The Kingdom's actual topography, sampled from public terrarium DEM tiles at
   ~3.9 km and companded into one greyscale PNG (sqrt of height / 3200 m). It
   is the landform truth: where the Sarawat stands, how the Tuwaiq arcs, how
   flat the Gulf shelf under Al Khobar really is. Everything procedural below
   it is sub-DEM detail — dune trains, crest ruggedness, wadi incision — which
   is exactly the band a 3.9 km grid cannot carry.
   ========================================================================= */
const RELIEF = /*@RELIEF@*/;
const RELIEF_G = await (async function loadRelief() {
  const { nx, ny, png } = RELIEF;
  let data = null;
  try {
    const bmp = await createImageBitmap(await (await fetch(png)).blob());
    const cv = document.createElement('canvas'); cv.width = nx; cv.height = ny;
    const cx = cv.getContext('2d', { willReadFrequently: true });
    cx.drawImage(bmp, 0, 0);
    data = cx.getImageData(0, 0, nx, ny).data;
    bmp.close && bmp.close();
  } catch (e) {
    // older engines: HTMLImageElement round-trip
    const img = new Image();
    await new Promise((res, rej) => { img.onload = res; img.onerror = rej; img.src = png; });
    const cv = document.createElement('canvas'); cv.width = nx; cv.height = ny;
    const cx = cv.getContext('2d');
    cx.drawImage(img, 0, 0);
    data = cx.getImageData(0, 0, nx, ny).data;
  }
  const out = new Float32Array(nx * ny);
  const k = RELIEF.max / (255 * 255);
  for (let i = 0; i < nx * ny; i++) { const v = data[i * 4]; out[i] = v * v * k; }
  return out;
})();
mark('relief');
const R_SX = (RELIEF.nx - 1) / (RELIEF.x1 - RELIEF.x0);
const R_SY = (RELIEF.ny - 1) / (RELIEF.y1 - RELIEF.y0);
// real elevation in metres at a plane coordinate
function realElev(px, py) {
  const fx = clamp((px - RELIEF.x0) * R_SX, 0, RELIEF.nx - 1.001);
  const fy = clamp((py - RELIEF.y0) * R_SY, 0, RELIEF.ny - 1.001);
  const x0 = fx | 0, y0 = fy | 0, tx = fx - x0, ty = fy - y0;
  const i0 = y0 * RELIEF.nx + x0, i1 = i0 + RELIEF.nx;
  return mix(mix(RELIEF_G[i0], RELIEF_G[i0 + 1], tx),
    mix(RELIEF_G[i1], RELIEF_G[i1 + 1], tx), ty);
}
// local gradient magnitude in metres per plane unit — drives ruggedness
function realSlope(px, py) {
  const d = 2.2;
  return Math.hypot(realElev(px + d, py) - realElev(px - d, py),
    realElev(px, py + d) - realElev(px, py - d)) / (2 * d);
}

/* ============================================================== 2. ELEVATION
   Every landform below is authored in real degrees and projected. North to
   south: the Midian highlands behind Aqaba, the Hejaz escarpment behind
   Madinah, the Sarawat rising to the Asir at 3000 m behind Abha. Inland: the
   Great Nafud, the Ad-Dahna sand arc, the west-facing Tuwaiq cuesta through
   the Najd, and the Rub' al Khali filling the south-east quarter. East: the
   flat sabkha shelf that carries Al Khobar down to the Gulf.
   ========================================================================= */
// Sarawat / Hejaz-Asir crest, north to south (lon, lat)
const SPINE = [
  [35.30, 29.45], [35.55, 28.65], [36.10, 27.85], [36.75, 27.05], [37.35, 26.35],
  [38.00, 25.60], [38.55, 24.85], [39.15, 24.05], [39.75, 23.15], [40.20, 22.20],
  [40.50, 21.35], [40.90, 20.60], [41.40, 19.90], [42.00, 19.20], [42.55, 18.60],
  [42.90, 18.05], [43.30, 17.55], [43.60, 17.15],
].map(([lo, la]) => ll(lo, la));
const spineInfo = (px, py) => polyInfo(SPINE, px, py);

function spineX(py) {
  if (py <= SPINE[0][1]) return SPINE[0][0];
  for (let i = 0; i + 1 < SPINE.length; i++) {
    const a = SPINE[i], b = SPINE[i + 1];
    if (py <= b[1]) return mix(a[0], b[0], (py - a[1]) / (b[1] - a[1]));
  }
  return SPINE[SPINE.length - 1][0];
}
/* --- named landforms, all authored in degrees ---------------------------- */
// distance / along-track / side for any projected polyline
function polyInfo(poly, px, py) {
  let best = Infinity, bt = 0, bside = 1, acc = 0, total = 0, bacc = 0;
  for (let i = 0; i + 1 < poly.length; i++) total += Math.hypot(poly[i + 1][0] - poly[i][0], poly[i + 1][1] - poly[i][1]);
  for (let i = 0; i + 1 < poly.length; i++) {
    const a = poly[i], b = poly[i + 1];
    const dx = b[0] - a[0], dy = b[1] - a[1];
    const seg = Math.hypot(dx, dy), l2 = dx * dx + dy * dy;
    let t = clamp(((px - a[0]) * dx + (py - a[1]) * dy) / l2, 0, 1);
    const d = Math.hypot(px - (a[0] + t * dx), py - (a[1] + t * dy));
    if (d < best) {
      best = d; bacc = acc + t * seg;
      bside = (dx * (py - a[1]) - dy * (px - a[0])) > 0 ? 1 : -1;
    }
    acc += seg;
  }
  bt = total > 0 ? bacc / total : 0;
  return { d: best, t: bt, side: bside };
}
const asPoly = (a) => a.map(([lo, la]) => ll(lo, la));

// Jabal Tuwayq: a west-facing cuesta arcing through the Najd
const TUWAIQ = asPoly([
  [44.55, 26.40], [45.05, 25.75], [45.60, 25.10], [46.00, 24.55], [46.15, 23.90],
  [46.00, 23.20], [45.75, 22.45], [45.35, 21.60], [44.95, 20.75], [44.60, 20.20],
]);
// Ad-Dahna: the narrow sand arc linking the Nafud to the Rub' al Khali
const DAHNA = asPoly([
  [44.60, 27.85], [45.10, 26.70], [45.85, 25.55], [46.60, 24.30], [47.40, 23.20],
  [48.40, 22.30], [49.40, 21.60],
]);
// isolated massifs (lon, lat, radius in km, amplitude)
const MASSIF = [
  [35.55, 28.55, 150, 0.50],   // Jabal al-Lawz / Midian, behind the Gulf of Aqaba
  [37.40, 26.85, 105, 0.20],   // Harrat Uwayrid
  [41.45, 27.45, 100, 0.40],   // Jabal Aja, above Hail
  [42.35, 27.15, 62, 0.26],    // Jabal Salma
  [39.95, 25.70, 80, 0.22],    // Harrat Khaybar
  [39.85, 23.10, 95, 0.24],    // Harrat Rahat, south of Madinah
  [38.85, 24.60, 60, 0.26],    // Jabal Radwa, behind Yanbu
  [42.70, 18.45, 150, 0.46],   // Asir high plateau, Jabal Sawda
  [44.35, 17.95, 120, 0.26],   // eastern Asir shoulder above Najran
  [45.60, 25.10, 170, 0.10],   // Najd swells west of Riyadh
  [43.90, 26.30, 130, 0.09],   // Qassim rise
].map(([lo, la, rkm, amp]) => {
  const p = ll(lo, la);
  return [p[0], p[1], rkm * GEO.sx / 111.0, amp];
});
const KM = GEO.sx / 111.0;             // plane units per kilometre (~0.469)
// basalt lava fields west of the Najd (lon, lat, rlon, rlat) — the harrat read
// near-black from the air and are the strongest albedo landmark in the Hejaz
const HARRAT = [
  [39.90, 23.10, 0.62, 0.85],   // Harrat Rahat, running south from Madinah
  [39.95, 25.70, 0.58, 0.55],   // Harrat Khaybar
  [37.45, 26.90, 0.62, 0.52],   // Harrat Uwayrid
  [41.10, 22.75, 0.55, 0.42],   // Harrat Nawasif
  [36.60, 29.20, 0.55, 0.40],   // Harrat ar-Rahah
];

const ELEV_MAX = 17.4;     // world units for elevation 1.0  ( = 3000 m )
const CLIFF = 7.6;         // world units the edge falls away
const METRE = 1 / 3000;    // metres -> elevation units

/* --- sand-sea masks, shared by the relief detail and the albedo pass ----- */
function sandMasks(px, py) {
  const lon = px2lon(px), lat = py2lat(py);
  const nafud = 1 - sstep(0.62, 1.06, Math.hypot((lon - 41.05) / 2.45, (lat - 28.35) / 1.30));
  const rak = 1 - sstep(0.55, 1.05, Math.hypot((lon - 50.6) / 5.30, (lat - 19.7) / 2.95));
  const jaf = 1 - sstep(0.60, 1.10, Math.hypot((lon - 50.3) / 1.10, (lat - 24.3) / 2.05));
  const dh = polyInfo(DAHNA, px, py);
  const dahna = Math.exp(-Math.pow(dh.d / 13, 1.7)) * sstep(0.0, 0.04, dh.t) * sstep(1.0, 0.95, dh.t);
  return { nafud, rak, jaf, dahna, lon, lat };
}

/* raw elevation, 0..~1.0 where 1.0 = 3000 m.
   Band 1 (landform): the real DEM.
   Band 2 (sub-DEM):  dune trains, crest ruggedness, wadi incision — the
                      3-8 km detail a 3.9 km grid smooths away.               */
function rawElev(px, py) {
  const m = realElev(px, py);
  let e = m * METRE;
  const sm = sandMasks(px, py);
  const slope = realSlope(px, py);          // metres per plane unit

  /* ---- dune trains. Each sand sea has its own bearing and wavelength, and
          each is a real, mappable orientation: the Nafud's ridges run
          WNW-ESE, the Rub' al Khali's megadunes SW-NE, the Dahna's arc
          runs with the belt, the Jafurah's run nearly north-south.        */
  const duneN = Math.pow(0.5 + 0.5 * Math.sin((px * 0.86 + py * 0.52) * 0.058 + 3.0 * fbm(px * 0.006, py * 0.006, 2)), 1.3);
  const duneR = Math.pow(0.5 + 0.5 * Math.sin((px * 0.88 - py * 0.47) * 0.031 + 2.6 * fbm(px * 0.003 + 7, py * 0.003, 2)), 1.5);
  const duneD = Math.pow(0.5 + 0.5 * Math.sin((px * 0.30 + py * 0.95) * 0.082 + 2.4 * fbm(px * 0.008, py * 0.008, 2)), 1.4);
  const duneJ = Math.pow(0.5 + 0.5 * Math.sin((px * 0.20 + py * 0.98) * 0.052 + 2.0 * fbm(px * 0.006 + 3, py * 0.006, 2)), 1.3);
  e += 230 * METRE * sm.nafud * duneN;
  e += 320 * METRE * sm.rak * duneR;
  e += 95 * METRE * sm.rak * Math.pow(0.5 + 0.5 * Math.sin((px * 0.72 - py * 0.69) * 0.082 + 2.0 * fbm(px * 0.007 + 2, py * 0.007, 2)), 1.4);
  e += 130 * METRE * sm.dahna * duneD;
  e += 105 * METRE * sm.jaf * duneJ;
  const sandAny = clamp(sm.nafud + sm.rak + sm.dahna + sm.jaf, 0, 1);

  /* ---- crest ruggedness: the DEM knows where the Sarawat is but not how
          serrated it is at 1 km. Amplitude follows the real local slope, so
          the Najd stays a plateau and the Asir stays a saw.                */
  const rug = sstep(9, 62, slope) * (1 - 0.75 * sandAny);
  e += 235 * METRE * rug * (ridged(px * 0.052 - 5, py * 0.052 + 2, 3) - 0.46);
  e += 120 * METRE * rug * fbm(px * 0.031 + 3, py * 0.031 + 9, 3);

  /* ---- wadi incision along the drainage lines of the escarpment */
  const wad = ridged(px * 0.021 + 21, py * 0.021 - 13, 2);
  e -= 190 * METRE * Math.pow(clamp(wad, 0, 1), 5) * sstep(7, 34, slope) * (1 - sandAny);

  // ---- the last, tiny band: grain the mesh can just about carry
  e += 26 * METRE * fbm(px * 0.13, py * 0.13, 2) * (0.30 + 0.70 * sstep(4, 40, slope));

  return Math.max(e, 0.0015);
}

// world height, coast-clipped
function heightAt(px, py, dIn) {
  const d = dIn === undefined ? sdfAt(px, py) : dIn;
  let e = rawElev(px, py);
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
renderer.info.autoReset = false;              // the HUD wants whole-frame totals
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
WORLD.rotation.x = QA.flat ? 0 : 0.185;
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
    for (let pass = 0; pass < 3; pass++) {
      tmp.set(hArr);
      for (let j = 1; j < ny - 1; j++) {
        for (let i = 1; i < nx - 1; i++) {
          const k = j * nx + i;
          const l = tmp[k - 1], r = tmp[k + 1], u = tmp[k - nx], dn = tmp[k + nx];
          const gx = (r - l) * 0.5 / cellW, gz = (dn - u) * 0.5 / cellW;
          const g = Math.hypot(gx, gz);
          const w = 0.62 * sstep(0.72, 2.20, g);
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
    const lon = px2lon(px), lat = py2lat(py);
    // the green shoulder is the Asir, not the whole spine: Abha gets terraced
    // juniper, Tabuk gets bare rock
    const highland = Math.exp(-Math.pow(s.d / 70, 1.5)) * sstep(0.42, 0.80, s.t);

    // ---- albedo
    tmp.copy(A.sandLo).lerp(A.sandHi, sstep(0.03, 0.34, e));
    // Empty Quarter + Jafurah + Dahna: bright warm sand
    const rak = 1 - sstep(0.55, 1.05, Math.hypot((lon - 50.6) / 5.30, (lat - 19.7) / 2.95));
    const dahnaM = Math.exp(-Math.pow(polyInfo(DAHNA, px, py).d / 14, 1.7));
    tmp.lerp(A.dune, clamp(rak * 0.70 + dahnaM * 0.55, 0, 0.85));
    // the Nafud's red sand, and the rust of the northern Hisma
    const nafM = 1 - sstep(0.60, 1.08, Math.hypot((lon - 41.05) / 2.45, (lat - 28.35) / 1.30));
    tmp.lerp(A.rust, clamp(nafM * 0.62 + dahnaM * 0.34 + sstep(30.4, 32.2, lat) * 0.42, 0, 0.85));
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
    tmp.lerp(A.night, sstep(620, 1000, px) * 0.10);
    // the harrat lava fields west of the Tuwaiq read almost black from the air
    for (const hp of HARRAT) {
      tmp.lerp(A.basalt, (1 - sstep(0.55, 1.02, Math.hypot((lon - hp[0]) / hp[2], (lat - hp[1]) / hp[3]))) * 0.58);
    }
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
    const dayI = 0.88 + 0.12 * sstep(940, 170, px);
    const sunI = 1.30 * Math.pow(nd, 0.95) * sh * dayI;
    lit.r += sunCol.r * sunI; lit.g += sunCol.g * sunI; lit.b += sunCol.b * sunI;
    const skyI = skyT * ao * 0.34 * (1 + 0.55 * Math.max(nx_, 0)) * (0.72 + 0.28 * dayI);
    lit.r += skyCol.r * skyI; lit.g += skyCol.g * skyI; lit.b += skyCol.b * skyI;
    const rimI = Math.pow(sstep(0.50, 0.97, nd), 1.9) * sh * 0.34 * dayI;
    lit.r += rim.r * rimI; lit.g += rim.g * rimI; lit.b += rim.b * rimI;
    const bo = clamp(-nx_ * 0.5 + 0.2, 0, 1) * ao;
    lit.r += bounce.r * bo * 0.26; lit.g += bounce.g * bo * 0.26; lit.b += bounce.b * bo * 0.26;
    // ambient floor so nothing goes to pure black
    lit.r += 0.046; lit.g += 0.055; lit.b += 0.082;

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
    const lon = px2lon(px), lat = py2lat(py);
    w = Math.max(w, 0.34 * Math.exp(-d / 40));             // coastal strips
    // the settled corridors: Jeddah-Makkah-Madinah in the Hejaz, the Riyadh
    // spine down the Tuwaiq, the Qassim belt, the Dammam-Hofuf conurbation
    w = Math.max(w, 0.30 * Math.exp(-Math.abs(d - 26) / 34) * sstep(44.5, 42.0, lon));
    w = Math.max(w, 0.34 * Math.exp(-polyInfo(TUWAIQ, px, py).d / 28) * sstep(20.4, 21.6, lat));
    w = Math.max(w, 0.30 * Math.exp(-Math.hypot((lon - 43.9) / 1.5, (lat - 26.2) / 1.1)));
    w = Math.max(w, 0.42 * Math.exp(-Math.hypot((lon - 49.9) / 1.3, (lat - 25.6) / 1.2)));
    const rak = 1 - sstep(0.50, 1.00, Math.hypot((lon - 50.6) / 5.30, (lat - 19.7) / 2.95));
    const nafM = 1 - sstep(0.60, 1.05, Math.hypot((lon - 41.05) / 2.45, (lat - 28.35) / 1.30));
    w *= 1 - 0.93 * rak;                                   // the Empty Quarter is empty
    w *= 1 - 0.80 * nafM;                                  // so is the Great Nafud
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
const renderPass = new RenderPass(scene, camera);
composer.addPass(renderPass);
/* Bloom law taken from the gold-standard worlds: LOW strength, HIGH threshold —
   only genuinely over-bright pixels bloom, and they bloom gently. The previous
   0.58 / 0.70 pair (a low threshold with high strength) is what smeared the
   beacons into white. */
const BLOOM_MAP = { s: 0.40, r: 0.62, t: 1.02 };
const bloom = new UnrealBloomPass(new THREE.Vector2(innerWidth, innerHeight), BLOOM_MAP.s, BLOOM_MAP.r, BLOOM_MAP.t);
composer.addPass(bloom);

const GradeShader = {
  uniforms: {
    tDiffuse: { value: null }, uTime: { value: 0 },
    uVig: { value: 0.92 }, uDim: { value: 0 },
    uRes: { value: new THREE.Vector2(1, 1) },
    uVeil: { value: 0 }, uCity: { value: 0 },
  },
  vertexShader: `varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);} `,
  fragmentShader: `
    uniform sampler2D tDiffuse; uniform float uTime,uVig,uDim,uVeil,uCity; uniform vec2 uRes;
    varying vec2 vUv;
    float vh(vec2 p){ return fract(sin(dot(p,vec2(41.3,289.1)))*43758.5453); }
    float vnz(vec2 p){ vec2 i=floor(p),f=fract(p); f=f*f*(3.0-2.0*f);
      return mix(mix(vh(i),vh(i+vec2(1,0)),f.x),mix(vh(i+vec2(0,1)),vh(i+vec2(1,1)),f.x),f.y); }
    float vfb(vec2 p){ float s=0.0,a=0.5; for(int i=0;i<4;i++){ s+=a*vnz(p); p*=2.07; a*=0.53; } return s; }
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
      // split tone: cool shadows, warm highlights. The district grade lifts
      // the warm end further and lets the shadows go violet rather than grey.
      float l = dot(c, vec3(0.2126,0.7152,0.0722));
      c += mix(vec3(-0.010,0.002,0.030), vec3(0.004,-0.004,0.040), uCity)*(1.0-smoothstep(0.0,0.28,l));
      c += mix(vec3(0.028,0.008,-0.014), vec3(0.048,0.018,-0.020), uCity)*smoothstep(0.35,1.0,l);
      c = mix(c, c*vec3(1.035,1.005,0.955), uCity);
      // vignette
      float v = smoothstep(1.16, uVig*0.36, r*1.32);
      c *= mix(0.60, 1.0, v);
      c *= 1.0-uDim*0.42;
      // fine grain keeps the gradients from banding
      float g = fract(sin(dot(uv*uRes+uTime, vec2(12.9898,78.233)))*43758.5453);
      c += (g-0.5)*0.0075;
      /* the dive veil: the beacon's own glare, thickened into a moving mist.
         It is a warm sheet with structure, not a white fade — the district is
         built behind it. */
      if (uVeil > 0.001) {
        float m = vfb(uv*vec2(3.1,2.2) + vec2(uTime*0.10, -uTime*0.16));
        float m2 = vfb(uv*vec2(7.5,5.4) - vec2(uTime*0.22, uTime*0.07));
        float rad = 1.0 - smoothstep(0.02, 0.78, r);
        float body = clamp(uVeil*1.28 - 0.10, 0.0, 1.0);
        float dens = clamp(body*(0.52 + 0.72*rad) + (m*0.55 + m2*0.34 - 0.34)*body*1.25, 0.0, 1.0);
        vec3 mist = mix(vec3(1.00,0.86,0.66), vec3(1.0,0.97,0.92), dens);
        c = mix(c, mist, dens);
        c += vec3(0.34,0.22,0.10)*pow(body,2.0)*rad;
      }
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
  'Arar': [40, -30], 'Dumat Al Jandal': [-76, -40], 'Tabuk': [-18, 14], 'Al Baha': [-34, 20],
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
  cityMode: document.getElementById('cityModeLabel'),
  cityHint: document.getElementById('cityHint'),
  cityBack: document.getElementById('cityBack'),
  cityToggle: document.getElementById('cityToggle'),
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
    if (c.name === ENTERABLE) html += `<button class="p-enter" id="enterBtn">Enter the Downtown</button>`;
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
  ui.panel.querySelector('#ctaBtn').addEventListener('click', () => showToast());
  const eb = ui.panel.querySelector('#enterBtn');
  if (eb) eb.addEventListener('click', () => enterDowntown());
}

let toastTimer = 0;
function showToast(msg) {
  ui.toast.textContent = (typeof msg === 'string' && msg) ? msg : 'Coming with launch';
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
const ENTERABLE = 'Al Khobar';
function enterDowntown() {
  if (!SCENES.city) return;
  CITY_RETURN.pos.copy(camera.position); CITY_RETURN.tgt.copy(controls.target);
  document.body.classList.remove('panel-open');
  activeCity = null; dimTarget = 0;
  CITIES.forEach(x => x.labelEl.classList.remove('muted'));
  ui.toast.classList.remove('show');
  SCENES.city.enter({});
}
window.__enterDowntown = enterDowntown;
addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  if (sceneState === 'city') { if (!document.pointerLockElement) SCENES.city.exit(); return; }
  if (activeCity) closeCity();
});

window.__openCity = (n) => openCity(n);
window.__flyTo = (n) => { const c = CITIES.find(x => x.name === n); if (c) { const s = cityShot(c, false); flyTo(s.pos, s.tgt, 1200); } };
window.__closePanel = closeCity;
window.__home = () => flyTo(POSTER.pos.clone(), POSTER.tgt.clone(), 1200);
window.__wide = () => flyTo(new THREE.Vector3(-34, 214, 214), new THREE.Vector3(4, 0, -6), 1200);
window.__cam = (p, t, d) => flyTo(new THREE.Vector3(p[0], p[1], p[2]), new THREE.Vector3(t[0], t[1], t[2]), d || 1000);

/* ========================================================= 14b. QA HARNESS
   Authored viewpoints, a URL grammar that can reach any of them, a pose
   printer and a hidden counter HUD. Everything a headless shot needs.      */
const SHOTS = [
  { id: 1, name: 'map poster', scene: 'map', pos: [-72, 66, 206], tgt: [4, 3, -6] },
  { id: 2, name: 'canopy hero', scene: 'city', pos: [21, 5.4, -44], yaw: 4, pitch: 7.5, mode: 'fly' },
  { id: 3, name: 'souq eye-level', scene: 'city', pos: [4, 1.68, 178], yaw: 0, pitch: 3, mode: 'walk' },
  { id: 4, name: 'majlis terrace', scene: 'city', pos: [150, 14.3, 235], yaw: 28, pitch: -1, mode: 'walk' },
  { id: 5, name: 'courtyard pool', scene: 'city', pos: [-224, 1.68, 198], yaw: -14, pitch: 5, mode: 'walk' },
  { id: 6, name: 'aerial masterplan', scene: 'city', pos: [258, 168, -228], yaw: -44, pitch: -25, mode: 'fly' },
];
const SHOT_BY_ID = {}; for (const s of SHOTS) SHOT_BY_ID[s.id] = s;

/* map-scene pose helper: a pose is (position, yaw, pitch); the orbit target is
   inferred 90 units down the view ray so OrbitControls stays consistent.   */
function mapPoseTo(pos, yaw, pitch, dist) {
  const y = THREE.MathUtils.degToRad(yaw), p = THREE.MathUtils.degToRad(pitch);
  const dir = new THREE.Vector3(Math.sin(y) * Math.cos(p), Math.sin(p), Math.cos(y) * Math.cos(p));
  return new THREE.Vector3().copy(pos).add(dir.multiplyScalar(dist || 90));
}
function mapPoseOf() {
  const d = new THREE.Vector3().subVectors(controls.target, camera.position);
  const dist = d.length(); d.normalize();
  return {
    pos: camera.position.toArray().map(v => +v.toFixed(1)),
    yaw: +(THREE.MathUtils.radToDeg(Math.atan2(d.x, d.z))).toFixed(1),
    pitch: +(THREE.MathUtils.radToDeg(Math.asin(clamp(d.y, -1, 1)))).toFixed(1),
    dist: +dist.toFixed(1),
  };
}

/* the district registers itself here once it exists; until it does, the map
   is the only scene and city shots resolve to the Al Khobar approach.      */
const SCENES = { map: { name: 'map' } };
let sceneState = 'map';
/* where the map camera was standing when the visitor dived, so the way back
   returns to exactly the frame they left */
const CITY_RETURN = { pos: new THREE.Vector3(), tgt: new THREE.Vector3() };

function goShot(id, instant) {
  const s = SHOT_BY_ID[id];
  if (!s) return false;
  if (s.scene === 'city') {
    if (SCENES.city) { SCENES.city.goShot(s, instant); return true; }
    const c = CITIES.find(x => x.name === 'Al Khobar');
    const sh = cityShot(c, false);
    if (instant) { camera.position.copy(sh.pos); controls.target.copy(sh.tgt); controls.update(); }
    else flyTo(sh.pos, sh.tgt, 1200);
    return true;
  }
  if (sceneState !== 'map' && SCENES.city) SCENES.city.exit(true);
  const pos = new THREE.Vector3().fromArray(s.pos);
  const tgt = s.tgt ? new THREE.Vector3().fromArray(s.tgt)
    : mapPoseTo(pos, s.yaw, s.pitch, s.dist);
  if (instant) { camera.position.copy(pos); controls.target.copy(tgt); controls.update(); }
  else flyTo(pos, tgt, 1400);
  return true;
}
window.__shot = goShot;
window.__pose = () => (sceneState === 'city' && SCENES.city ? SCENES.city.pose() : mapPoseOf());

addEventListener('keydown', (e) => {
  if (e.key === 'p' || e.key === 'P') {
    const p = window.__pose();
    const line = sceneState === 'city'
      ? `{ pos: [${p.pos}], yaw: ${p.yaw}, pitch: ${p.pitch}, mode: '${p.mode}' }`
      : `{ pos: [${p.pos}], tgt: [${controls.target.toArray().map(v => +v.toFixed(1))}] }   // yaw ${p.yaw} pitch ${p.pitch} dist ${p.dist}`;
    console.log('POSE ' + sceneState + '  ' + line);
    showToast('Camera pose copied to console');
    try { navigator.clipboard && navigator.clipboard.writeText(line); } catch (err) { }
  }
  if (e.key === 'F3') { e.preventDefault(); hud.toggle(); }
});

/* ------------------------------------------------------------- debug HUD */
const hud = (function () {
  const el = document.createElement('div');
  el.style.cssText = 'position:fixed;left:14px;top:14px;z-index:90;font:11px/1.55 ui-monospace,SFMono-Regular,Menlo,monospace;' +
    'color:#cfe6ff;background:rgba(6,14,26,.82);border:1px solid rgba(120,170,220,.25);border-radius:8px;' +
    'padding:9px 12px;white-space:pre;pointer-events:none;display:none;backdrop-filter:blur(6px);letter-spacing:.02em';
  document.body.appendChild(el);
  let on = QA.hud, acc = 0, frames = 0, fps = 0;
  el.style.display = on ? 'block' : 'none';
  return {
    get on() { return on; },
    toggle() { on = !on; el.style.display = on ? 'block' : 'none'; },
    tick(dt, extra) {
      if (!on) return;
      acc += dt; frames++;
      if (acc < 0.35) return;
      fps = frames / acc; acc = 0; frames = 0;
      const info = renderer.info;
      const lines = [
        `fps ${fps.toFixed(0).padStart(3)}   scene ${sceneState}`,
        `draws ${String(info.render.calls).padStart(5)}  tris ${(info.render.triangles / 1000).toFixed(0)}k`,
        `progs ${String(info.programs ? info.programs.length : 0).padStart(5)}  geo ${info.memory.geometries}  tex ${info.memory.textures}`,
      ];
      if (extra) for (const k in extra) lines.push(`${k.padEnd(11)} ${extra[k]}`);
      el.textContent = lines.join('\n');
    },
  };
})();
window.__hud = hud;
window.__scenes = SCENES;
ui.cityBack.addEventListener('click', () => { if (SCENES.city) SCENES.city.exit(); });
ui.cityToggle.addEventListener('click', () => {
  if (SCENES.city) SCENES.city.setMode(SCENES.city.nav.mode === 'fly' ? 'walk' : 'fly');
});

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
  if (!hit) return;
  const name = hit.object.userData.city.name;
  /* the destination city dives on the second click — the first still opens the
     panel, so the renders and the story are never skipped past */
  if (name === ENTERABLE && activeCity && activeCity.name === name) enterDowntown();
  else openCity(name);
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

/*@DISTRICT@*/

/* --------------------------------------------------------- QA boot routing */
let qaFree = false;
(function qaBoot() {
  if (QA.cam && QA.cam.length >= 3) {
    // an explicit pose overrides the map's authored orbit envelope
    qaFree = true;
    controls.minPolarAngle = 0.001; controls.maxPolarAngle = Math.PI * 0.4995;
    controls.minDistance = 2; controls.maxDistance = 2600;
    const pos = new THREE.Vector3(QA.cam[0], QA.cam[1], QA.cam[2]);
    if (QA.scene === 'city' && SCENES.city) {
      SCENES.city.enter({ instant: true, pose: { pos: QA.cam.slice(0, 3), yaw: QA.cam[3] || 0, pitch: QA.cam[4] || 0, mode: QA.walk ? 'walk' : 'fly' } });
    } else {
      camera.position.copy(pos);
      controls.target.copy(mapPoseTo(pos, QA.cam[3] || 0, QA.cam[4] || -20, QA.cam[5] || 90));
      controls.update();
    }
    hideIntro(); markIdle();
    return;
  }
  if (QA.shot) { goShot(QA.shot, true); hideIntro(); markIdle(); return; }
  if (QA.scene === 'city' && SCENES.city) { SCENES.city.enter({ instant: true }); hideIntro(); markIdle(); }
})();

/* ================================================================ 15. LOOP */
const clock = new THREE.Clock();
window.__frames = 0;
let sph = new THREE.Spherical();

function animate() {
  requestAnimationFrame(animate);
  const dt = Math.min(clock.getDelta(), 0.1);
  const t = clock.elapsedTime;
  renderer.info.reset();

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

  if (SCENES.city) SCENES.city.update(dt, t);
  const onMap = sceneState === 'map' && !(SCENES.city && SCENES.city.diving);

  // clamp pan to the map
  if (onMap && !qaFree) {
    controls.target.x = clamp(controls.target.x, -160, 160);
    controls.target.z = clamp(controls.target.z, -135, 135);
    controls.target.y = clamp(controls.target.y, -8, 34);
  }
  if (onMap) controls.update();

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
  if (!hoverLock && onMap) {
    if (ptr.x > -5) {
      raycaster.setFromCamera(ptr, camera);
      const hit = raycaster.intersectObjects(pickables, false)[0];
      setHover(hit ? hit.object.userData.city : null);
    } else setHover(null);
  }

  // label scale / fade / collision culling
  if (onMap) {
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
  } else if (sceneState === 'city') {
    for (const c of CITIES) c.labelObj.visible = false;
  }

  composer.render();
  if (sceneState !== 'city') labelRenderer.render(scene, camera);
  hud.tick(dt, SCENES.city && SCENES.city.hudInfo ? SCENES.city.hudInfo() : null);
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
