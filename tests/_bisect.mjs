/* Bisect for the black-panel fault.
   node tests/_bisect.mjs

   Two things this harness learned the hard way, both worth keeping:

   1. It samples the PNG shot.mjs writes rather than reading the canvas back.
      The first version used ctx.drawImage on the WebGL canvas and got zeros
      for every sample INCLUDING the tram, which demonstrably renders — a
      WebGL drawing buffer is not readable after compositing, and
      WebGPURenderer's WebGL2 backend does not honour preserveDrawingBuffer.
      That measurement was invalid, so it proved nothing about the material.

   2. It does not throw the console away. The original passed
      `stdio: 'ignore'`, and that single word cost most of this bisect: the
      page prints THREE's own diagnostics and shot.mjs relays them, and the
      actual fault — two copies of three.js instantiated from two URLs, so the
      lighting model's assigns landed in a different module's `currentStack`
      and the whole model built to nothing — was in the text being discarded.
      Errors are counted now and the first one prints beside the reading. */
import { execFileSync } from 'child_process';
import { readFileSync } from 'fs';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { PNG } = (() => { try { return require('pngjs'); } catch { return {}; } })();

const W = 900, H = 500;

/* Where the eleven panels land at this camera and this frame size. The row
   spans x = -13.5..13.5 m at 24 m under a 38 deg vertical fov, which is
   +-0.906 of the half-width; the panel centres sit 0.72 deg below the view
   axis. Guessed sample positions used to drift off the 2.4 m panels into the
   0.3 m gaps between them, which reads as black for a reason that has nothing
   to do with the material. */
const SX = (i) => 0.047 + i * 0.0906;
const SY = 0.518;

/* one flag at a time, from the state that works up to the whole law */
const CASES = [
  ['plain',             '&plain=1'],
  ['all off',           '&cn=1&n=1&r=1'],
  ['+color flat',       '&c=1&s=1&n=1&r=1'],
  ['+color real',       '&n=1&r=1'],
  ['+rough',            '&n=1'],
  ['+normal const',     '&nc=1'],
  ['stage1 const',      '&ns=1'],
  ['stage2 no-norm',    '&ns=2'],
  ['stage3 one-srfH',   '&ns=3'],
  ['full reliefNormal', ''],
  ['+fog',              '&fog=1'],
];

for (const [name, q] of CASES) {
  const tag = 'bisect_' + name.replace(/[^a-z0-9]+/gi, '_');
  let raw = '';
  try {
    raw = execFileSync('node', ['shot.mjs', tag, 'forcegl=1&panels=1' + q,
      '--w', String(W), '--h', String(H), '--wait', '1500',
      '--base', 'http://localhost:8123/gpuprobe.html'],
      { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
  } catch (e) { raw = String(e.stdout || '') + String(e.stderr || ''); }
  let errs = [];
  /* favicon.ico is a permanent 404 on this dev server and it used to be the
     line printed beside every reading, hiding the real errors behind it */
  try {
    errs = (JSON.parse(raw).errors || [])
      .filter(s => !/willReadFrequently|favicon|404 \(File not found\)/.test(s));
  } catch { errs = ['shot.mjs died']; }
  const note = errs.length ? '  !! ' + errs[0].split('\n')[0].slice(0, 78) : '';
  if (!PNG) { console.log(name.padEnd(18), 'wrote shots/' + tag + '.png', note); continue; }
  const img = PNG.sync.read(readFileSync('shots/' + tag + '.png'));
  const out = [];
  for (let i = 0; i < 11; i++) {
    // 5x5 block mean, so one joint pixel does not stand in for a panel
    const cx = Math.round(img.width * SX(i)), cy = Math.round(img.height * SY);
    let s = 0;
    for (let dy = -2; dy <= 2; dy++) for (let dx = -2; dx <= 2; dx++) {
      const o = (img.width * (cy + dy) + cx + dx) << 2;
      s += (img.data[o] + img.data[o + 1] + img.data[o + 2]) / 3;
    }
    out.push(Math.round(s / 25));
  }
  console.log(name.padEnd(18), JSON.stringify(out), note);
}
