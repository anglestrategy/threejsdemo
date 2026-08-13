/* Boot check.
   node tests/boot_check.mjs [query] [base]

   Loads the app and reports the FIRST page error, without waiting for the
   district to finish. A shader typo or a temporal-dead-zone reference throws
   during module init and then the render harness sits for its full five-minute
   ready timeout before telling you — so the cheapest possible check of "does
   this build run at all" used to cost the same as a full render. It costs
   twenty seconds here. Run it before every shot. */
import { chromium } from 'playwright';
const QUERY = process.argv[2] || 'scene=city&nolife=1';
const BASE = process.argv[3] || 'http://localhost:8123/';
const browser = await chromium.launch({
  executablePath: process.env.PW_CHROME || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'],
});
const page = await browser.newPage({ viewport: { width: 640, height: 400 } });
const errs = [];
page.on('pageerror', (e) => errs.push(String(e.stack || e.message).split('\n').slice(0, 4).join('\n')));
page.on('console', (m) => { if (m.type() === 'error') errs.push('console: ' + m.text()); });
await page.goto(BASE + '?' + QUERY, { waitUntil: 'load', timeout: 120000 });
/* long enough for module init, the first GLB fetches and the first shader
   compile — which is where the errors this catches actually happen */
await page.waitForTimeout(+(process.env.BOOT_MS || 45000));
const state = await page.evaluate(() => ({
  ready: !!window.__ready,
  phase: (window.__stats && window.__stats().phase) || null,
}));
await browser.close();
const real = errs.filter((e) => !/404|Failed to load resource/.test(e));
console.log(JSON.stringify({ query: QUERY, ...state, errors: real.slice(0, 6) }, null, 1));
process.exit(real.length ? 1 : 0);
