/* Run: node src/site/glide-physics.test.mjs
   Simulates a slow wheel and a hard flick at 60fps and checks the glide stays smooth for both. */
import assert from "node:assert/strict";
import { advance, push, soften, LIMITS, KNEE } from "./glide-physics.js";

const VH = 900, MAX = 30 * VH, DT = 1 / 60;

/* events: [frame, deltaY]; returns per-frame positions and speeds */
function run(events, frames = 400, start = 5 * VH) {
  const s = { cur: start, v: 0, target: start };
  const pos = [], speed = [];
  let peakLead = 0;
  for (let f = 0; f < frames; f++) {
    for (const [ef, d] of events) if (ef === f) push(s, d, VH, MAX);
    peakLead = Math.max(peakLead, Math.abs(s.target - s.cur));
    advance(s, DT, VH);
    pos.push(s.cur);
    speed.push(Math.abs(s.v));
  }
  return { pos, speed, end: s.cur, start, peakLead, settled: s.v === 0 && s.cur === s.target };
}

/* slow and ordinary scrolling is untouched: a normal notch keeps its full distance */
assert.equal(soften(100), 100);
assert.equal(soften(-KNEE), -KNEE);
const slow = run([0, 20, 40, 60].map(f => [f, 100]));
assert.equal(Math.round(slow.end - slow.start), 400, "four slow notches travel their full 400px");
assert.ok(slow.settled, "slow scroll comes to rest");

/* a hard flick: 25 big deltas in under half a second */
const flick = run(Array.from({ length: 25 }, (_, i) => [i, 400]));
const cap = LIMITS.wheel.vmax * VH;
assert.ok(Math.max(...flick.speed) <= cap + 1e-6, `speed never exceeds the cap (${cap}px/s)`);
assert.ok(flick.peakLead <= VH + 1e-6, "the target never runs more than one screen ahead");
assert.ok(flick.settled, "the flick comes to rest");

/* smooth: always moving one way, and speed changes by at most the acceleration limit per frame */
for (const r of [slow, flick]) {
  for (let i = 1; i < r.pos.length; i++) assert.ok(r.pos[i] >= r.pos[i - 1] - 1e-9, "never moves backwards");
  for (let i = 1; i < r.speed.length; i++) {
    const rise = r.speed[i] - r.speed[i - 1];
    assert.ok(rise <= LIMITS.wheel.accel * VH * DT + 1e-6, "never jerks forward faster than the acceleration limit");
  }
}

/* the flick is deliberately slower than it was asked to be: 10,000px of input, a bounded trip */
assert.ok(flick.end - flick.start < 25 * 400 * 0.25, "a flick travels far less than its raw input");

console.log("glide physics ok · peak flick speed", Math.round(Math.max(...flick.speed)), "px/s · flick travel", Math.round(flick.end - flick.start), "px");
