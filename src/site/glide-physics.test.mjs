/* Run: node src/site/glide-physics.test.mjs
   Simulates Lenis's easing (its frame-rate-independent damp at lerp 0.1) fed by shapeWheel(), at 60fps,
   for a slow wheel and a hard flick, and checks slow scrolling is untouched while a flick stays at a medium pace. */
import assert from "node:assert/strict";
import { shapeWheel, soften, KNEE, LEAD, LERP } from "./glide-physics.js";

const VH = 900, DT = 1 / 60;
const damp = (x, y, lambda, dt) => x + (y - x) * (1 - Math.exp(-lambda * dt)); /* Lenis's damp() */

function run(events, frames = 300) {
  let cur = 0, target = 0, peakLead = 0, peakV = 0, backwards = false;
  for (let f = 0; f < frames; f++) {
    for (const [ef, d] of events) if (ef === f) target += shapeWheel(d, target - cur, VH);
    peakLead = Math.max(peakLead, Math.abs(target - cur));
    const next = damp(cur, target, LERP * 60, DT);
    peakV = Math.max(peakV, Math.abs(next - cur) / DT);
    if (next < cur - 1e-9) backwards = true;
    cur = next;
  }
  return { travel: cur, peakLead, peakV, backwards };
}

/* ordinary notches pass untouched */
assert.equal(soften(100), 100);
assert.equal(soften(-KNEE), -KNEE);
const slow = run([0, 20, 40, 60].map(f => [f, 100]));
assert.ok(Math.abs(slow.travel - 400) < 1, "four slow notches travel their full 400px");
assert.ok(slow.peakLead < LEAD * VH, "slow scrolling never reaches the lead cap");

/* a hard flick: 25 big deltas in under half a second */
const flick = run(Array.from({ length: 25 }, (_, i) => [i, 400]));
assert.ok(flick.peakLead <= LEAD * VH + 1e-6, "the target never runs more than LEAD screens ahead");
const ceiling = LEAD * VH * LERP * 60;
assert.ok(flick.peakV <= ceiling * 1.01, `peak speed stays near the ${Math.round(ceiling)}px/s ceiling`);
assert.ok(flick.travel < 25 * 400 * 0.2, "a flick travels far less than its raw 10,000px of input");
assert.ok(!slow.backwards && !flick.backwards, "never moves backwards");

console.log("glide ok · flick peak", Math.round(flick.peakV), "px/s · travel", Math.round(flick.travel), "px · slow peak", Math.round(slow.peakV), "px/s");
