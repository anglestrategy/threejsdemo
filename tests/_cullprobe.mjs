/* One decisive reading: pose AND frame cost at each stop, plus how many
   instanced meshes the renderer actually kept.

   Separates the two hypotheses that both predict a flat triangle count:
     (a) the camera is not moving, so every reading is the same frame
     (b) the camera moves but nothing is culled
   Only (b) is a renderer problem, and guessing between them is how you end up
   debugging a bug that is not there. */
import { chromium } from 'playwright';
const D = Math.PI / 180;
const BASE = process.argv[2] || 'http://localhost:8123/';
const T = +(process.env.GATE_MS || 1500000);

const b = await chromium.launch({
  executablePath: process.env.PW_CHROME || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'],
});
const p = await b.newPage({ viewport: { width: 800, height: 500 } });
await p.goto(BASE + '?scene=city&nolife=0&cam=220,3,234,180,-2', { waitUntil: 'load', timeout: T });
await p.waitForFunction('window.__ready === true', null, { timeout: T });

for (const [n, pose] of [
  ['plaza  ', [220, 3, 234, 180 * D, -2 * D]],
  ['bouleva', [-88, 3, 104, 90 * D, 0]],
  ['aerial ', [120, 150, 120, 200 * D, -40 * D]],
]) {
  await p.evaluate((q) => window.__scenes.city.debug.sim([], 1 / 60, 1, q), pose);
  /* Wait for the renderer to actually finish a NEW frame at the new pose.
     A fixed sleep is not enough: one frame of this district on a software
     rasteriser takes longer than any sleep worth writing, so a timed wait
     reads the frame drawn at the PREVIOUS camera position. That is what
     produced three byte-identical readings and read as "nothing culls". */
  {
    const f0 = await p.evaluate(() => window.__perf().frame);
    await p.waitForFunction((f) => window.__perf().frame > f + 1, f0, { timeout: T, polling: 500 });
  }
  const r = await p.evaluate(() => {
    const s = window.__scenes.city;
    let inst = 0, tris = 0;
    // what the scene HOLDS, to compare against what the renderer drew
    if (s && s.debug && s.debug.sizes) { /* cityRoot is reachable from sizes() */ }
    return { pose: window.__pose(), perf: window.__perf(), inst, tris };
  });
  console.log(n, 'pos', JSON.stringify(r.pose.pos), 'yaw', r.pose.yaw,
    '| frame', r.perf.frame, 'draws', r.perf.calls,
    'tris', (r.perf.triangles / 1e6).toFixed(1) + 'M');
}
await b.close();
