/* Frame cost.
   node tests/frame_cost.mjs [base]

   What the renderer actually pays per frame, from viewpoints a walker
   occupies — as opposed to what the scene contains.

   These are different numbers, and confusing them is a real failure mode this
   project already hit: the instance-count gate measured 457 M triangles in the
   scene and that reads as catastrophic, but the scene total is only the frame
   cost when nothing culls. Conversely a healthy scene total means nothing if
   every instance of every prop lives in one district-wide InstancedMesh, which
   is culled as a unit and therefore never culled at all.

   So this gate stands at real viewpoints and asks the renderer. */
import { chromium } from 'playwright';

const GATE_TMO = +(process.env.GATE_MS || 1500000);
const BASE = process.argv[2] || 'http://localhost:8123/';

/* Where a viewer actually stands: the composed plaza, the souq spine, the
   canopy plaza, and one wide shot from the air that sees most of the plan. */
const VIEWS = [
  ['downtown plaza', '220,3,234,180,-2'],
  ['plaza, looking N', '220,3,200,0,2'],
  ['souq spine', '4,3,240,0,0'],
  ['canopy plaza', '0,3,20,180,0'],
  ['boulevard', '-88,3,104,90,0'],
  ['aerial', '120,150,120,200,-40'],
];

const browser = await chromium.launch({
  executablePath: process.env.PW_CHROME || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'],
});
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
const errs = [];
page.on('pageerror', (e) => errs.push(String(e.message)));

const rows = [];
for (const [name, cam] of VIEWS) {
  await page.goto(`${BASE}?scene=city&cam=${cam}&nolife=0`, { waitUntil: 'load', timeout: GATE_TMO });
  await page.waitForFunction('window.__ready === true', null, { timeout: GATE_TMO });
  // let a few frames go by so the reported numbers are a settled frame
  await page.waitForTimeout(2500);
  const p = await page.evaluate(() => (window.__perf ? window.__perf() : null));
  if (p) rows.push({ name, ...p });
  else rows.push({ name, calls: -1, triangles: -1 });
}
await browser.close();

console.log('viewpoint            draws    tris/frame');
for (const r of rows) {
  console.log(r.name.padEnd(20), String(r.calls).padStart(6),
    (r.triangles / 1e6).toFixed(1).padStart(9) + ' M');
}
const worst = rows.reduce((a, b) => (b.triangles > a.triangles ? b : a), rows[0]);
/* A modern GPU draws a few million triangles a frame comfortably and tens of
   millions with effort. Past 40 M the district is not a walkable demo any
   more, whatever it looks like in a still. */
const LIMIT = 40e6;
console.log('\n' + JSON.stringify({
  worst: worst.name, worstTris: worst.triangles, worstCalls: worst.calls,
  limit: LIMIT, errs: errs.slice(0, 5), PASS: worst.triangles > 0 && worst.triangles < LIMIT,
}, null, 1));
process.exit(worst.triangles > 0 && worst.triangles < LIMIT ? 0 : 1);
