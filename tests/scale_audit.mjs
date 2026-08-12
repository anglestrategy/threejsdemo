/* Scale audit.
   node tests/scale_audit.mjs

   Boots the district and reads the real world-space size of every instanced
   object off its instance matrices, then diffs the ones whose true size is
   known — a door is 2.1 m, a person is 1.7, a bollard is 0.95 — against what
   the world actually built. Scale is the one error that is invisible by eye:
   a district uniformly a third too big looks completely convincing until
   something of known size stands in it. FAIL on anything outside tolerance. */
import { chromium } from 'playwright';

const BASE = process.argv[2] || 'http://localhost:8123/';

/* what the reference renders and ordinary reality say these should be, in
   metres of height unless noted. Tolerance is generous: this is looking for
   category errors, not for centimetres. */
const EXPECT = {
  thobe: [1.70, 0.14], abaya: [1.66, 0.14], child: [1.15, 0.25],
  sit_thobe: [1.25, 0.20], sit_abaya: [1.22, 0.20],
  walk_thobe: [1.70, 0.14], walk_abaya: [1.66, 0.14],
  bench: [0.88, 0.22], 'p:benchw:0': [0.88, 0.22],
  bollard: [0.95, 0.25], chair: [0.90, 0.20], table: [0.75, 0.20],
  streetlight: [5.00, 0.30], planter: [0.60, 0.35],
  'p:bicycle:0': [1.05, 0.30], 'p:bins:0': [1.15, 0.30],
  'p:tram:0': [3.60, 0.25], 'p:kiosk:0': [3.00, 0.30],
  palm_l0: [11.0, 0.25], palm_l1: [11.0, 0.25],
  door: [2.20, 0.30], lowtable: [0.42, 0.35], cushion: [0.53, 0.30],
};

const browser = await chromium.launch({
  executablePath: process.env.PW_CHROME || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'],
});
const page = await browser.newPage({ viewport: { width: 900, height: 600 } });
const errs = [];
page.on('pageerror', (e) => errs.push(String(e.message)));
await page.goto(BASE + '?scene=city&nolife=0', { waitUntil: 'load', timeout: 300000 });
await page.waitForFunction('window.__ready === true', null, { timeout: 300000 });

const sizes = await page.evaluate(() => (window.__scenes && window.__scenes.city ? window.__scenes.city.debug.sizes() : {}));
await browser.close();

const rows = Object.entries(sizes).sort((a, b) => b[1].n - a[1].n);
const fails = [];
console.log('  count   h      w      d     name                 expected');
for (const [name, s] of rows) {
  const e = EXPECT[name];
  let note = '';
  if (e) {
    const off = Math.abs(s.h - e[0]) / e[0];
    note = e[0].toFixed(2) + (off > e[1] ? '  <-- ' + (s.h / e[0]).toFixed(2) + 'x' : '  ok');
    if (off > e[1]) fails.push({ name, got: s.h, want: e[0], ratio: +(s.h / e[0]).toFixed(2) });
  }
  console.log(String(s.n).padStart(7), String(s.h).padStart(6), String(s.w).padStart(6),
    String(s.d).padStart(6), '  ' + name.padEnd(20), note);
}
console.log('\n' + JSON.stringify({ measured: rows.length, fails, errs: errs.slice(0, 6),
  PASS: fails.length === 0 }, null, 1));
process.exit(fails.length ? 1 : 0);
