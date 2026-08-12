/* Every axis of the controller, asserted against expected world motion.
   Facing +Z (yaw 0) in a right-handed Y-up frame: forward is +Z and right is
   -X. The navigator is stepped by a fixed dt rather than by wall clock — a
   wall-clock test of a controller only measures the frame rate of the machine
   running it. */
import { chromium } from 'playwright';
import path from 'path'; import { fileURLToPath } from 'url';
const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const b = await chromium.launch({ args: ['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader'] });
const p = await b.newPage({ viewport: { width: 460, height: 260 } });
const errs = []; p.on('pageerror', e => errs.push(String(e).slice(0,200)));
await p.goto('http://localhost:8099/' + '?scene=city&noveil=1&walk=1', { waitUntil: 'load' });
await p.waitForFunction('window.__ready === true', { timeout: 180000 });

const out = await p.evaluate(() => {
  const d = window.__scenes.city.debug;
  const START = [4, 1.68, 150, 0, 0];
  const res = { axis: {}, look: {} };
  const dir = (dx, dz) => (Math.abs(dx) > Math.abs(dz) ? (dx > 0 ? '+X' : '-X') : (dz > 0 ? '+Z' : '-Z'));
  for (const [key, want] of [['f','+Z'],['b','-Z'],['l','+X'],['r','-X']]) {
    const e = d.sim([key], 1/60, 120, START);
    const dx = e.x - START[0], dz = e.z - START[2];
    res.axis[key] = { want, got: dir(dx, dz), dx: +dx.toFixed(2), dz: +dz.toFixed(2),
      ok: want === dir(dx, dz) && Math.hypot(dx, dz) > 0.5 };
  }
  // fly mode: E up, Q down, and forward follows the pitch
  window.__scenes.city.setMode('fly', true);
  const up = d.sim(['up'], 1/60, 90, [4, 40, 150, 0, 0]);
  const dn = d.sim(['dn'], 1/60, 90, [4, 40, 150, 0, 0]);
  const pitchFwd = d.sim(['f'], 1/60, 90, [4, 60, 150, 0, -0.7]);
  res.fly = { upRises: up.y > 40.5, downFalls: dn.y < 39.5, pitchedForwardDescends: pitchFwd.y < 59 };
  window.__scenes.city.setMode('walk', true);
  // look: a fixed travel is a fixed rotation, right is right, down is down
  d.sim([], 1/60, 1, START);
  const a1 = d.look(200, 0, 40);
  d.sim([], 1/60, 1, START);
  const a2 = d.look(200, 0, 40);
  d.sim([], 1/60, 1, START);
  const a3 = d.look(0, 120, 40);
  const deg = (r) => +(r * 180 / Math.PI).toFixed(2);
  res.look = {
    right_turns_right: a1.yaw > 0, deg1: deg(a1.yaw), deg2: deg(a2.yaw),
    expected: deg(200 * 0.0023), repeatable: Math.abs(a1.yaw - a2.yaw) < 1e-6,
    down_looks_down: a3.pitch < 0,
  };
  // a settled view must not drift
  const s0 = d.sim([], 1/60, 1, START).yaw;
  const s1 = d.sim([], 1/60, 300, null).yaw;
  res.look.drift_deg = deg(s1 - s0);
  // frame-rate independence: the same travel at 20 fps and 144 fps
  d.sim([], 1/60, 1, START); const slow = d.look(200, 0, 12);
  d.sim([], 1/144, 1, START); const fast = d.look(200, 0, 200);
  res.look.rateIndependent = Math.abs(slow.tYaw - fast.tYaw) < 1e-9;
  return res;
});
out.errs = errs;
out.PASS = Object.values(out.axis).every(a => a.ok)
  && out.fly.upRises && out.fly.downFalls && out.fly.pitchedForwardDescends
  && out.look.right_turns_right && out.look.down_looks_down && out.look.repeatable
  && Math.abs(out.look.drift_deg) < 0.05 && out.look.rateIndependent;
console.log(JSON.stringify(out, null, 1));
await b.close();
