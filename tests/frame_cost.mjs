/* Frame cost.
   node tests/frame_cost.mjs [base]

   What the renderer actually pays per frame, from viewpoints a walker
   occupies — as opposed to what the scene contains.

   These are different numbers, and confusing them is a real failure mode this
   project already hit: the instance gate measured 457 M triangles in the scene
   and that reads as catastrophic, but the scene total is only the frame cost
   when nothing culls. Conversely a healthy scene total means nothing if every
   copy of every prop lives in one district-wide InstancedMesh, which is culled
   as a unit and therefore never culled at all.

   So this gate stands at real viewpoints and asks the renderer.

   It boots ONCE and moves the camera with debug.sim rather than reloading per
   viewpoint. A district boot is minutes on a software rasteriser; six of them
   is an hour, and a gate nobody can afford to run is not a gate. sim() takes
   its yaw and pitch in radians. */
import { chromium } from 'playwright';

const GATE_TMO = +(process.env.GATE_MS || 1500000);
const BASE = process.argv[2] || 'http://localhost:8123/';
const D = Math.PI / 180;

/* Where a viewer actually stands: the composed plaza from two angles, the
   souq spine, the canopy plaza, a boulevard, and one aerial that sees most
   of the plan at once — the worst case for culling. */
const VIEWS = [
  ['downtown plaza',   [220, 3, 234, 180 * D, -2 * D]],
  ['plaza looking N',  [220, 3, 200, 0, 2 * D]],
  ['souq spine',       [4, 3, 240, 0, 0]],
  ['canopy plaza',     [0, 3, 20, 180 * D, 0]],
  ['boulevard',        [-88, 3, 104, 90 * D, 0]],
  ['aerial',           [120, 150, 120, 200 * D, -40 * D]],
];

const browser = await chromium.launch({
  executablePath: process.env.PW_CHROME || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'],
});
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
const errs = [];
page.on('pageerror', (e) => errs.push(String(e.message)));

/* The `cam=` parameter is what actually enters the district. `scene=city`
   alone does nothing: main.js only calls SCENES.city.enter() inside the
   branch guarded by QA.cam, so a load without it leaves the app on the relief
   map with the district built but never rendered — and debug.sim then moves a
   camera belonging to a scene that is not on screen. That produced six
   byte-identical readings of the MAP and read as "culling rejects nothing".
   The assertion below exists so this gate can never quietly measure the wrong
   scene again. */
const start = VIEWS[0][1];
await page.goto(`${BASE}?scene=city&nolife=0&cam=${start[0]},${start[1]},${start[2]},`
  + `${(start[3] / D).toFixed(1)},${(start[4] / D).toFixed(1)}`,
{ waitUntil: 'load', timeout: GATE_TMO });
await page.waitForFunction('window.__ready === true', null, { timeout: GATE_TMO });

const inCity = await page.evaluate(() => !!(window.__scenes && window.__scenes.city
  && window.__hudInfo !== undefined ? true : document.body.dataset.scene !== 'map'));
const poseNow = await page.evaluate(() => window.__pose());
if (!poseNow || poseNow.mode === undefined) {
  console.error('NOT IN THE DISTRICT: __pose() returned', JSON.stringify(poseNow));
  console.error('the district was never entered, so any number below would be the map');
  await browser.close();
  process.exit(2);
}
void inCity;

const rows = [];
for (const [name, pose] of VIEWS) {
  await page.evaluate((p) => {
    window.__scenes.city.debug.sim([], 1 / 60, 1, p);
  }, pose);
  // several frames so the reading is a settled frame at the new pose, not the
  // one still being drawn from the old one
  /* Wait for the renderer to actually finish a NEW frame at the new pose.
     A fixed sleep is not enough: one frame of this district on a software
     rasteriser takes longer than any sleep worth writing, so a timed wait
     reads the frame drawn at the PREVIOUS camera position. That is what
     produced three byte-identical readings and read as "nothing culls". */
  {
    const f0 = await page.evaluate(() => window.__perf().frame);
    await page.waitForFunction((f) => window.__perf().frame > f + 1, f0, { timeout: GATE_TMO, polling: 500 });
  }
  const p = await page.evaluate(() => (window.__perf ? window.__perf() : null));
  rows.push(p ? { name, ...p } : { name, calls: -1, triangles: -1 });
}
await browser.close();

console.log('viewpoint             draws    tris/frame');
for (const r of rows) {
  console.log(r.name.padEnd(21), String(r.calls).padStart(5),
    (r.triangles / 1e6).toFixed(1).padStart(9) + ' M');
}
const worst = rows.reduce((a, b) => (b.triangles > a.triangles ? b : a), rows[0]);
/* A modern GPU draws a few million triangles a frame comfortably and tens of
   millions with effort. Past 40 M this is not a walkable demo any more,
   whatever it looks like in a still. */
const LIMIT = 40e6;
const ok = worst.triangles > 0 && worst.triangles < LIMIT;
console.log('\n' + JSON.stringify({
  worst: worst.name, worstTris: worst.triangles, worstCalls: worst.calls,
  limit: LIMIT, errs: errs.slice(0, 5), PASS: ok,
}, null, 1));
process.exit(ok ? 0 : 1);
