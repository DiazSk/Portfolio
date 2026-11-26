/* Run: node src/site/glide-physics.test.mjs
   Simulates Lenis's easing (its frame-rate-independent damp at lerp 0.1) fed by shapeWheel(), at 60fps, for a
   slow wheel, a brisk steady scroll and a hard flick, and checks the glide stays smooth and answers every step. */
import assert from "node:assert/strict";
import { shapeWheel, soften, KNEE, LEAD, LERP } from "./glide-physics.js";

const VH = 900, DT = 1 / 60;
const damp = (x, y, lambda, dt) => x + (y - x) * (1 - Math.exp(-lambda * dt)); /* Lenis's damp() */

function run(events, frames = 360) {
  let cur = 0, target = 0, peakLead = 0, peakV = 0, backwards = false, dead = 0;
  for (let f = 0; f < frames; f++) {
    for (const [ef, d] of events) if (ef === f) {
      const add = shapeWheel(d, target - cur, VH);
      if (Math.abs(add) < 1) dead++;
      target += add;
    }
    peakLead = Math.max(peakLead, Math.abs(target - cur));
    const next = damp(cur, target, LERP * 60, DT);
    peakV = Math.max(peakV, Math.abs(next - cur) / DT);
    if (next < cur - 1e-9) backwards = true;
    cur = next;
  }
  return { travel: cur, peakLead, peakV, backwards, dead };
}

/* ordinary notches pass untouched, and slow scrolling keeps (nearly) its full distance */
assert.equal(soften(100), 100);
assert.equal(soften(-KNEE), -KNEE);
const slow = run([0, 20, 40, 60].map(f => [f, 100]));
assert.ok(slow.travel > 380, `four slow notches travel ~400px (got ${Math.round(slow.travel)})`);

/* a brisk steady scroll: a notch every 3 frames for 3 seconds; every notch must still move the page */
const brisk = run(Array.from({ length: 60 }, (_, i) => [i * 3, 100]));
assert.equal(brisk.dead, 0, "no wheel step is ever thrown away");

/* a hard flick: 25 big deltas in under half a second */
const flick = run(Array.from({ length: 25 }, (_, i) => [i, 400]));
assert.ok(flick.peakLead < LEAD * VH, "the target eases toward the lead limit but never reaches it");
assert.ok(flick.peakV < LEAD * VH * LERP * 60, "so a flick's speed stays under the ceiling");
assert.ok(flick.travel < 25 * 400 * 0.2, "a flick travels far less than its raw 10,000px of input");
for (const r of [slow, brisk, flick]) assert.ok(!r.backwards, "never moves backwards");

console.log(`glide ok · slow ${Math.round(slow.travel)}px · brisk peak ${Math.round(brisk.peakV)}px/s · flick peak ${Math.round(flick.peakV)}px/s, travel ${Math.round(flick.travel)}px`);
