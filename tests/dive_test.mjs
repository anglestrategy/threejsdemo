import { chromium } from 'playwright';
import path from 'path'; import { fileURLToPath } from 'url'; import fs from 'fs';
const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const b = await chromium.launch({ args: ['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader'] });
const p = await b.newPage({ viewport: { width: 640, height: 360 } });
const errs = [];
p.on('pageerror', e => errs.push('PAGEERROR ' + (e.stack||e.message).slice(0,300)));
p.on('console', m => { if (m.type()==='error') errs.push('ERR ' + m.text().slice(0,200)); });
await p.goto('http://localhost:8123/', { waitUntil: 'load' });
await p.waitForFunction('window.__ready === true', { timeout: 120000 });
await p.waitForTimeout(1500);
const snap = async (tag) => {
  const st = await p.evaluate(() => ({
    scene: window.__pose ? (window.__hud, document.body.className) : '',
    pose: window.__pose(),
    cities: (window.__stats && window.__stats().glimmer) || 0,
  }));
  fs.mkdirSync(path.join(ROOT,'shots'),{recursive:true});
  await p.screenshot({ path: path.join(ROOT,'shots','dive_'+tag+'.png'), timeout: 180000 });
  return st;
};
const log = [];
log.push(['start', await snap('0start')]);
for (let i = 1; i <= 3; i++) {
  await p.evaluate(() => window.__enterDowntown());
  await p.waitForTimeout(4000);
  if (i === 1) await snap('1mid');
  await p.waitForTimeout(26000);
  log.push(['in'+i, await snap(i+'in')]);
  await p.evaluate(() => window.__closeCity ? 0 : 0);
  await p.keyboard.press('Escape');
  await p.waitForTimeout(26000);
  log.push(['out'+i, await snap(i+'out')]);
}
// map interactions must still work after three dives
const hoverOk = await p.evaluate(() => { window.__hover('Taif'); return true; });
await p.evaluate(() => window.__openCity('Madinah'));
await p.waitForTimeout(1800);
log.push(['panel', await snap('4panel')]);
const panelText = await p.evaluate(() => document.getElementById('panel').textContent.slice(0,60));
const imgs = await p.evaluate(() => document.querySelectorAll('#panel img').length);
await p.evaluate(() => window.__closePanel());
await p.waitForTimeout(1600);
log.push(['home', await snap('5home')]);
console.log(JSON.stringify({ log, panelText, panelImgs: imgs, hoverOk, errs }, null, 1));
await b.close();
