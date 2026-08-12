import { chromium } from 'playwright';
const b = await chromium.launch({
  executablePath: process.env.PW_CHROME || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  args: ['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader'] });
const p = await b.newPage({ viewport: { width: 600, height: 400 } });
p.on('pageerror', e => console.log('ERR', e.message));
await p.goto('http://localhost:8123/?scene=city&nolife=1', { waitUntil: 'load', timeout: 300000 });
await p.waitForFunction('window.__ready === true', null, { timeout: 300000 });
const r = await p.evaluate(() => window.__scenes.city.debug.furniture());
console.log(r.map(x => `${x.kit}  h${x.h.toFixed(2)} w${x.w.toFixed(2)} d${x.d.toFixed(2)}`).join('\n'));
console.log(r.length, 'furniture kits');
await b.close();
