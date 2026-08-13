/* Headless screenshot harness.
   node shot.mjs <name> <query> [--w 1400] [--h 786] [--wait 3500] [--file living-map-v2.html]
   Writes shots/<name>.png and prints console errors + __stats(). */
import { chromium } from 'playwright';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
const name = args[0] || 'shot';
const query = args[1] && !args[1].startsWith('--') ? args[1] : '';
const opt = (k, d) => { const i = args.indexOf('--' + k); return i >= 0 ? args[i + 1] : d; };
const W = +opt('w', 1400), H = +opt('h', 786);
const WAIT = +opt('wait', 4000);
const FILE = opt('file', '');
const BASE = opt('base', 'http://localhost:8123/');

/* `--webgpu` swaps the GL flags for the set that actually exposes an adapter
   here. The default `--use-gl=angle --use-angle=swiftshader` gives WebGL2 and
   NO `navigator.gpu` adapter at all, which is why the WebGPU backend looked
   unavailable in this container and the whole port was being verified on the
   WebGL2 fallback — with TRAA, SSGI, GTAO and CSM, the entire reason for the
   move, unverifiable. `--use-webgpu-adapter=swiftshader` with Vulkan enabled
   returns an adapter. Slow, but it renders and it is the real backend. */
/* One timeout for the whole harness, and it is a real limit rather than a
   round number: the district is a software rasteriser's worst case and it grew
   again with the generated set. At 1400x786 the SCREENSHOT alone — not the
   boot, the single frame draw — went past five minutes and the harness threw
   with the page perfectly healthy behind it, which reads exactly like a hang
   and is not one. `--tmo N` overrides in seconds. */
const TMO = (+opt('tmo', 900)) * 1000;
const WEBGPU = args.includes('--webgpu');
const browser = await chromium.launch({
  executablePath: process.env.PW_CHROME || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  args: (WEBGPU
    ? ['--enable-unsafe-webgpu', '--enable-unsafe-swiftshader',
      '--use-webgpu-adapter=swiftshader', '--enable-features=Vulkan']
    : ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'])
    .concat(['--disable-lcd-text', '--force-color-profile=srgb',
      '--font-render-hinting=none']),
});
const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
const errors = [];
page.on('console', m => { if (m.type() === 'error' || m.type() === 'warning') errors.push(m.type() + ': ' + m.text()); });
page.on('pageerror', e => errors.push('PAGEERROR: ' + (e.stack || e.message)));

/* the deliverable is served now, not opened from disk: assets are real files
   fetched at runtime, which is the whole reason they can be full resolution. */
const url = (FILE ? 'file://' + path.join(ROOT, FILE) : BASE)
  + (query ? (query.startsWith('?') ? query : '?' + query) : '');
const t0 = Date.now();
await page.goto(url, { waitUntil: 'load', timeout: TMO });
try {
  await page.waitForFunction('window.__ready === true', null, { timeout: TMO });
} catch (e) { errors.push('NEVER READY'); }
const bootMs = Date.now() - t0;
await page.waitForTimeout(WAIT);

// frame-rate probe over 2s
const fps = await page.evaluate(() => new Promise(res => {
  const a = window.__frames; setTimeout(() => res((window.__frames - a) / 2), 2000);
}));

fs.mkdirSync(path.join(ROOT, 'shots'), { recursive: true });
await page.screenshot({ path: path.join(ROOT, 'shots', name + '.png'), timeout: TMO });

let stats = null;
try { stats = await page.evaluate(() => (window.__stats ? window.__stats() : null)); } catch (e) { }
let extra = null;
try { extra = await page.evaluate(() => (window.__water ? window.__water() : null)); } catch (e) { }
console.log(JSON.stringify({ name, url: url.slice(url.lastIndexOf('/') + 1), bootMs, fps, stats, water: extra, errors: errors.slice(0, 24) }, null, 1));
await browser.close();
