/* The glide's physics, kept pure so it can be checked without a browser (glide-physics.test.mjs).

   Three layers keep fast scrolling buttery without touching slow scrolling:
   1. soften(): a wheel step up to KNEE px passes through untouched; anything beyond it counts for about a third,
      so a flick adds distance, but not in proportion to how hard the wheel was spun.
   2. the lead cap (in Scroll.ts): the target can sit at most one screen ahead of the page, so a spun wheel never
      queues several screens of travel to catch up on.
   3. advance(): the page chases the target at Lenis's rate (an exponential ease, k = 6/s), but its speed is capped
      and it may only speed up at a set acceleration, so it eases in, cruises at a medium pace, and eases out.
      Slowing down is never limited, which is what keeps it from overshooting. */

export const KNEE = 120; /* px: one ordinary mouse-wheel notch, or any trackpad delta */
export const PAST_KNEE = 0.35; /* how much of a step beyond the knee still counts */

/* per-mode limits, in viewport heights: wheel scrolling is kept to a medium pace; programmatic glides
   (jump to a project, arrive at a section) are allowed to travel faster */
export const LIMITS = {
  wheel: { vmax: 2.4, accel: 9 },
  to: { vmax: 7, accel: 30 },
};

const K = 6; /* 1/s: Lenis's damping (lerp 0.1 per 60th of a second) */

export function soften(d) {
  const a = Math.abs(d);
  return a <= KNEE ? d : Math.sign(d) * (KNEE + (a - KNEE) * PAST_KNEE);
}

export const LEAD = 1; /* viewport heights the target may sit ahead of the page */

/* one wheel event: soften it, add it, then keep the target within LEAD screens of the page and inside the document */
export function push(s, delta, vh, max) {
  const lead = LEAD * vh;
  let t = s.target + soften(delta);
  t = Math.max(s.cur - lead, Math.min(s.cur + lead, t));
  s.target = Math.max(0, Math.min(max, t));
}

/* one frame. s = { cur, v, target }; dt in seconds; vh = viewport height in px. Returns true while moving. */
export function advance(s, dt, vh, mode = "wheel") {
  const { vmax, accel } = LIMITS[mode];
  const diff = s.target - s.cur;
  if (Math.abs(diff) < 0.5 && Math.abs(s.v) < 8) {
    s.cur = s.target;
    s.v = 0;
    return false;
  }
  const cap = vmax * vh;
  let want = diff * K;
  if (want > cap) want = cap;
  else if (want < -cap) want = -cap;
  /* speeding up (same direction, faster) is rate-limited; slowing down or reversing is not */
  const speedingUp = Math.sign(want) === Math.sign(s.v || want) && Math.abs(want) > Math.abs(s.v);
  if (speedingUp) {
    const room = accel * vh * dt;
    s.v += Math.max(-room, Math.min(room, want - s.v));
  } else {
    s.v = want;
  }
  const next = s.cur + s.v * dt;
  /* never step past the target */
  if ((s.target - next) * diff <= 0) {
    s.cur = s.target;
    s.v = 0;
    return false;
  }
  s.cur = next;
  return true;
}
