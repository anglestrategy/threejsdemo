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
const FILE = opt('file', 'living-map-v2.html');

const browser = await chromium.launch({
  args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader',
    '--disable-lcd-text', '--force-color-profile=srgb', '--font-render-hinting=none'],
});
const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
const errors = [];
page.on('console', m => { if (m.type() === 'error' || m.type() === 'warning') errors.push(m.type() + ': ' + m.text()); });
page.on('pageerror', e => errors.push('PAGEERROR: ' + (e.stack || e.message)));

const url = 'file://' + path.join(ROOT, FILE) + (query ? (query.startsWith('?') ? query : '?' + query) : '');
const t0 = Date.now();
await page.goto(url, { waitUntil: 'load', timeout: 120000 });
try {
  await page.waitForFunction('window.__ready === true', { timeout: 120000 });
} catch (e) { errors.push('NEVER READY'); }
const bootMs = Date.now() - t0;
await page.waitForTimeout(WAIT);

// frame-rate probe over 2s
const fps = await page.evaluate(() => new Promise(res => {
  const a = window.__frames; setTimeout(() => res((window.__frames - a) / 2), 2000);
}));

fs.mkdirSync(path.join(ROOT, 'shots'), { recursive: true });
await page.screenshot({ path: path.join(ROOT, 'shots', name + '.png'), timeout: 180000 });

let stats = null;
try { stats = await page.evaluate(() => (window.__stats ? window.__stats() : null)); } catch (e) { }
console.log(JSON.stringify({ name, url: url.slice(url.lastIndexOf('/') + 1), bootMs, fps, stats, errors: errors.slice(0, 24) }, null, 1));
await browser.close();
