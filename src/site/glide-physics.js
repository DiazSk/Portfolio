/* How the wheel is shaped before Lenis scrolls it (used by Scroll.ts, checked by glide-physics.test.mjs).

   Lenis eases toward a target at a fixed rate (lerp 0.1 per 60th of a second, about 6/s), the same setting
   landonorris.com runs. Its speed is that rate times how far ahead the target sits, so keeping the target from
   running away is what keeps a hard flick at a medium pace:
   1. soften(): a wheel step up to KNEE px passes through untouched; anything beyond it counts for about a third,
      so a flick adds distance, but not in proportion to how hard the wheel was spun.
   2. shapeWheel(): a soft lead limit. The further ahead the target already is, the less a step in the same
      direction adds, easing to nothing at LEAD screens. There is no wall: the wheel always answers, the page
      keeps gliding, and a reversal always counts in full.
   Slow scrolling (ordinary notches, trackpads) sits far below both and is effectively unchanged. */

export const KNEE = 120; /* px: one ordinary mouse-wheel notch, or any trackpad delta */
export const PAST_KNEE = 0.35; /* how much of a step beyond the knee still counts */
export const LEAD = 0.6; /* viewport heights the target eases toward but never passes */
export const LERP = 0.1; /* Lenis's default, and Lando's */

export function soften(d) {
  const a = Math.abs(d);
  return a <= KNEE ? d : Math.sign(d) * (KNEE + (a - KNEE) * PAST_KNEE);
}

/* the delta Lenis should apply for one wheel event, given how far its target already sits ahead (px) */
export function shapeWheel(delta, ahead, vh) {
  const d = soften(delta);
  if (Math.sign(d) !== Math.sign(ahead) || ahead === 0) return d; /* reversing, or at rest: full step */
  const room = Math.max(0, 1 - Math.abs(ahead) / (LEAD * vh));
  return d * room;
}
