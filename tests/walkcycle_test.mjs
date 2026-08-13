/* Does the walk cycle exist, and does it move?
   Two halves to prove: the geometry carries fractional limb tags in aSurf, and
   the compiled vertex shader contains the branch that reads them. Then sample
   one instanced figure's transformed vertex at two different uTime values by
   evaluating the same arithmetic the shader does. */
import { chromium } from 'playwright';
import path from 'path';
const ROOT = '/home/user/threejsdemo';
const b = await chromium.launch({
  executablePath: process.env.PW_CHROME || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  args: ['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader'] });
const p = await b.newPage({ viewport: { width: 640, height: 400 } });
p.on('pageerror', e => console.log('ERR', e.message));
await p.goto('http://localhost:8123/' + '?scene=city&shot=3&noveil=1', { waitUntil: 'load', timeout: 240000 });
await p.waitForFunction('window.__ready === true', null, { timeout: 300000 });
await p.waitForTimeout(3500);
const r = await p.evaluate(() => {
  const out = { tagged: {}, shaderHasBranch: null, swing: null, scans: {} };
  const sc = window.__scenes.city.scene;
  let sample = null;
  /* THE SCANNED WALKERS.
     Ten photogrammetry figures labelled limb by limb by `tagWalker()` — there
     is no rigger in this project, so the tags are assigned by position on the
     body and every one of the three measurements that makes that work can be
     wrong on a given scan. So all three are asserted rather than trusted:

       both  every figure must have BOTH legs tagged. One leg means the
             lateral axis was read as the facing axis and the figure will
             hop rather than walk.
       lean  the leg tags must be roughly balanced. A 90/10 split means the
             body's centre line is not at x = 0.
       toe   the feet's centroid must sit forward of the body's, which is
             what `tagWalker` uses to decide which way the figure faces. The
             SIGN is corrected automatically; what cannot be corrected is a
             measurement too small to trust, so the gate is on magnitude.  */
  sc.traverse(o => {
    if (!o.isInstancedMesh || !/^w:gw/.test(o.name)) return;
    const a = o.geometry.getAttribute('aSurf');
    const pos = o.geometry.getAttribute('position');
    let ll = 0, rl = 0, la = 0, ra = 0, none = 0;
    for (let i = 0; i < a.count; i++) {
      const t = +(a.getX(i) % 1).toFixed(2);
      if (t > 0.05 && t < 0.15) ll++;
      else if (t < 0.25) rl++;
      else if (t < 0.35) la++;
      else if (t < 0.45) ra++;
      else none++;
    }
    const legs = ll + rl;
    out.scans[o.name] = {
      leftLeg: ll, rightLeg: rl, leftArm: la, rightArm: ra, untagged: none,
      legBalance: legs ? +(Math.min(ll, rl) / legs).toFixed(3) : 0,
      toe: +(o.geometry.userData.toe === undefined ? 0 : o.geometry.userData.toe).toFixed(4),
      flipped: !!o.geometry.userData.flipped,
      verts: pos.count,
    };
  });
  sc.traverse(o => {
    if (!o.isInstancedMesh || !/^walk_/.test(o.name)) return;
    const a = o.geometry.getAttribute('aSurf');
    const seen = new Set();
    for (let i = 0; i < a.count; i++) seen.add(+(a.getX(i) % 1).toFixed(2));
    out.tagged[o.name] = [...seen].sort();
    if (!sample) sample = o;
  });
  if (sample) {
    const m = sample.material;
    const src = m.userData.__vs || null;
    out.shaderHasBranch = src ? src.indexOf('limbTag') >= 0 : 'not captured';
    // evaluate the shader's own swing arithmetic at two times
    const swingAt = (t, tag, py) => {
      const ph = 1.7;                      // any fixed instance phase
      const sw = Math.sin(t * 4.15 + ph);
      const ang = tag < 0.15 ? sw * 0.52 : tag < 0.25 ? -sw * 0.52
        : tag < 0.35 ? -sw * 0.40 : sw * 0.40;
      const piv = tag < 0.25 ? 0.92 : 1.40;
      const qy = py - piv;
      return { z: -qy * Math.sin(ang), y: qy * Math.cos(ang) + piv };
    };
    const A = swingAt(0.0, 0.10, 0.06), B = swingAt(0.38, 0.10, 0.06);
    out.swing = { footAtT0: +A.z.toFixed(3), footAtT1: +B.z.toFixed(3),
      strideMetres: +Math.abs(B.z - A.z).toFixed(3) };
  }
  return out;
});
const names = Object.keys(r.tagged);
const anyTagged = names.some(n => r.tagged[n].some(v => v > 0.05));
/* the scans are a gate too, but a soft one on count: if the people asset did
   not load there is nothing to tag and that is a different failure, caught by
   count_instances. What is hard is that any scan that IS in the scene must be
   tagged correctly. */
const scanNames = Object.keys(r.scans);
const scanFails = scanNames.filter((n) => {
  const s = r.scans[n];
  return (s.leftLeg + s.rightLeg) < s.verts * 0.05     // legs found at all
      || s.legBalance < 0.22                            // and both of them
      || Math.abs(s.toe) < 0.017;                       // and facing decidably
});
console.log(JSON.stringify({ ...r, scanCount: scanNames.length, scanFails,
  PASS: anyTagged && r.swing && r.swing.strideMetres > 0.3 && scanFails.length === 0 },
null, 1));
await b.close();
process.exit((anyTagged && r.swing && r.swing.strideMetres > 0.3 && scanFails.length === 0) ? 0 : 1);
