import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/*
 * One motion system for the whole page.
 *
 * Two rules make this safe, and both were learned the hard way:
 *
 * 1. Entrance reveals live in CSS, not here. gsap.from() applies its start
 *    state immediately, so an interrupted tween can leave text permanently
 *    invisible — StrictMode's double-invoked effects did exactly that. CSS
 *    animations cannot be orphaned that way. GSAP owns only what CSS cannot
 *    do: a scroll-velocity marquee and counters that format real numbers.
 * 2. Reduced motion is the absence of the animation, not a second code path.
 *    gsap.matchMedia() reverts whatever it created when its condition stops
 *    matching, so there is nothing to keep in sync.
 *
 * Deliberately does not use @gsap/react's useGSAP: that package resolves its
 * own React instance against React 19 and throws "Invalid hook call". The
 * official GSAP React skill sanctions gsap.context() inside useEffect with
 * ctx.revert() on cleanup, which is what useMotion does.
 */

export const EASE = "power3.out";

const MOTION_OK = {
  reduce: "(prefers-reduced-motion: reduce)",
  ok: "(prefers-reduced-motion: no-preference)",
};

/** Web fonts change metrics, so positions measured before they land are wrong. */
if (typeof document !== "undefined" && document.fonts) {
  document.fonts.ready.then(() => ScrollTrigger.refresh());
}

function scrolled(el, start = "top 90%") {
  return { trigger: el, start, once: true };
}

/**
 * A marquee that drifts and leans into scroll direction.
 * The track must contain its content twice so the wrap is seamless.
 */
export function marquee(scope, selector, { speed = 50 } = {}) {
  const mm = gsap.matchMedia();
  mm.add(MOTION_OK, (ctx) => {
    if (ctx.conditions.reduce) return;
    const track = scope.current?.querySelector(selector);
    if (!track) return;

    const half = track.scrollWidth / 2;
    if (!half) return;

    const drift = gsap.to(track, {
      x: -half,
      duration: half / speed,
      ease: "none",
      repeat: -1,
      modifiers: { x: (x) => `${gsap.utils.wrap(-half, 0, parseFloat(x))}px` },
    });

    const st = ScrollTrigger.create({
      trigger: scope.current,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        const v = Math.abs(gsap.utils.clamp(-3, 3, self.getVelocity() / 500));
        gsap.to(drift, { timeScale: 1 + v, duration: 0.4, overwrite: true });
      },
    });

    return () => {
      drift.kill();
      st.kill();
    };
  }, scope);
  return () => mm.revert();
}

/**
 * Numerals counting to their real value.
 *
 * Splits into prefix + number + suffix so "<100ms", "9.66M", "90%" and
 * "21,091" all survive. A digits-only replace fails on grouped numbers — it
 * strips the comma and can no longer match the original string — and corrupts
 * prefixed ones into "<0ms". The authored text is restored exactly on
 * completion, and is never cleared before the tween actually plays.
 *
 * The authored value is cached on the element the first time it is seen.
 * Without that this is not idempotent: StrictMode reverts the first context
 * mid-tween, leaving "0" in the DOM, and the second pass reads that "0" as
 * the target and counts 0 to 0 — the numbers stuck at 0, <0ms and 0.00M
 * permanently. Same failure mode as the entrance reveals, one layer over.
 *
 * Scoped with querySelectorAll rather than gsap.utils.toArray, which ignores
 * the context scope and was reaching every .metric-value on the page,
 * including the project cards.
 */
export function countUp(scope, selector, { immediate = false } = {}) {
  const mm = gsap.matchMedia();
  mm.add(MOTION_OK, (ctx) => {
    if (ctx.conditions.reduce) return;
    const els = scope.current ? [...scope.current.querySelectorAll(selector)] : [];
    els.forEach((el) => {
      if (!el.dataset.countTo) el.dataset.countTo = el.textContent;
      const final = el.dataset.countTo;
      const parts = final.match(/^([^\d]*)([\d,]+(?:\.\d+)?)(.*)$/);
      if (!parts) return;
      const [, prefix, numStr, suffix] = parts;
      const target = parseFloat(numStr.replace(/,/g, ""));
      if (!Number.isFinite(target)) return;
      const decimals = (numStr.split(".")[1] || "").length;
      const grouped = numStr.includes(",");
      const fmt = (v) =>
        grouped ? Math.round(v).toLocaleString("en-US") : v.toFixed(decimals);

      const obj = { v: 0 };
      gsap.to(obj, {
        v: target,
        duration: 1.2,
        ease: "power2.out",
        delay: immediate ? 0.5 : 0,
        immediateRender: false,
        scrollTrigger: immediate ? undefined : scrolled(el, "top 95%"),
        onUpdate: () => {
          el.textContent = prefix + fmt(obj.v) + suffix;
        },
        onComplete: () => {
          el.textContent = final;
        },
      });
    });
  }, scope);
  return () => mm.revert();
}

/**
 * Runs GSAP setup scoped to `ref`, reverting everything on unmount.
 * Equivalent to useGSAP({ scope }) without the extra dependency.
 */
export function useMotion(setup, ref) {
  useEffect(() => {
    if (!ref.current) return undefined;
    const ctx = gsap.context(setup, ref);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

export { gsap, ScrollTrigger };
