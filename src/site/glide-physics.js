/* How the wheel is shaped before Lenis scrolls it (used by Scroll.ts, checked by glide-physics.test.mjs).

   Lenis eases toward a target at a fixed rate (lerp 0.1 per 60th of a second, so about 6/s). Its speed is therefore
   that rate times how far ahead the target sits. Keeping the target close keeps the speed bounded:
   1. soften(): a wheel step up to KNEE px passes through untouched; anything beyond it counts for about a third,
      so a hard flick adds distance, but not in proportion to how hard the wheel was spun.
   2. shapeWheel(): the target may sit at most LEAD screens ahead of the page, so a spun wheel never queues
      screens of travel, and the cruise speed tops out near LEAD * 6 = 2.4 screens a second.
   Slow scrolling (ordinary notches, trackpads) stays under both limits and is not changed at all. */

export const KNEE = 120; /* px: one ordinary mouse-wheel notch, or any trackpad delta */
export const PAST_KNEE = 0.35; /* how much of a step beyond the knee still counts */
export const LEAD = 0.4; /* viewport heights the target may run ahead of the page */
export const LERP = 0.1; /* Lenis's own default */

export function soften(d) {
  const a = Math.abs(d);
  return a <= KNEE ? d : Math.sign(d) * (KNEE + (a - KNEE) * PAST_KNEE);
}

/* the delta Lenis should apply for one wheel event, given how far its target already sits ahead (px) */
export function shapeWheel(delta, ahead, vh) {
  const lead = LEAD * vh;
  const d = soften(delta);
  return Math.max(-lead - ahead, Math.min(lead - ahead, d));
}
