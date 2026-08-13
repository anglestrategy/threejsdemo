/* Which post node turns the frame red. One flag at a time, sampled off the PNG
   in three channels — an average would have hidden the whole fault. */
import { execFileSync } from 'child_process';
import { readFileSync } from 'fs';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { PNG } = require('pngjs');
const CASES = [
  ['grade only', 'ao=0&ssgi=0&traa=0&bloom=0'],
  ['+ao',        'ssgi=0&traa=0&bloom=0'],
  ['+ssgi',      'ao=0&traa=0&bloom=0'],
  ['+traa',      'ao=0&ssgi=0&bloom=0'],
  ['+bloom',     'ao=0&ssgi=0&traa=0'],
];
for (const [name, q] of CASES) {
  const tag = 'pb_' + name.replace(/[^a-z0-9]+/gi, '_');
  let raw = '';
  try {
    raw = execFileSync('node', ['shot.mjs', tag,
      'view=street&forcegl=1&frames=3&' + q, '--w', '640', '--h', '360',
      '--wait', '900', '--base', 'http://localhost:8123/gpuscene.html'],
      { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
  } catch (e) { raw = String(e.stdout || '') + String(e.stderr || ''); }
  let errs = [];
  try { errs = (JSON.parse(raw).errors || []).filter(s => !/willReadFrequently|favicon|404 \(File/.test(s)); } catch { errs = ['died']; }
  const img = PNG.sync.read(readFileSync('shots/' + tag + '.png'));
  const pt = (fx, fy) => {
    const o = (img.width * Math.round(img.height * fy) + Math.round(img.width * fx)) << 2;
    return [img.data[o], img.data[o + 1], img.data[o + 2]].join(',');
  };
  console.log(name.padEnd(12), 'sky', pt(0.62, 0.16).padEnd(12),
    'paving', pt(0.45, 0.82).padEnd(12), 'brick', pt(0.93, 0.45).padEnd(12),
    errs.length ? '!! ' + errs[0].slice(0, 60) : '');
}
