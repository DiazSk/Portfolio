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
 * Zaid asked for a GSAP-driven reveal across the whole Stack section, so
 * GSAP's remit here is now three things: the marquee, the counters, and
 * stackReveal. That is a deliberate widening of the rule in DESIGN.md, not
 * an accident — and it is done with fromTo plus immediateRender: false, never
 * gsap.from, because gsap.from is what left text permanently invisible the
 * first time round.
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

/**
 * One scrubbed timeline across the whole Stack section.
 *
 * This is the thing CSS view() timelines cannot do: a single sequence whose
 * progress is the section's scroll progress, so the rows resolve in order as
 * you pass through it and unwind if you scroll back up. Per-element CSS
 * timelines each start from their own position and cannot be sequenced
 * against each other.
 *
 * fromTo with immediateRender: false throughout. A gsap.from here would
 * write opacity 0 into the DOM the moment it is created, and an interrupted
 * context would leave the section invisible — which has already happened
 * twice on this page.
 */
export function stackReveal(scope) {
  const mm = gsap.matchMedia();
  mm.add(MOTION_OK, (ctx) => {
    if (ctx.conditions.reduce) return;
    const root = scope.current;
    const rows = root ? [...root.querySelectorAll(".stack-row")] : [];
    if (!rows.length) return;

    const parts = rows.map((row) => ({
      rule: row.querySelector(".stack-rule"),
      head: row.querySelector(".stack-head"),
      chips: [...row.querySelectorAll(".tech-pill")],
      plain: row.querySelector(".tech-plain"),
    }));

    /* gsap.set for the start state, not gsap.from and not fromTo with
       immediateRender: false. fromTo defers its start state until the tween
       actually plays, so with a scrubbed timeline everything sat visible at
       progress 0 and the section did nothing. gsap.set applies now and is
       undone by ctx.revert(), so an interrupted context restores the markup
       rather than stranding it invisible — which is the failure gsap.from
       caused here the first time. */
    for (const { rule, head, chips, plain } of parts) {
      if (rule) gsap.set(rule, { scaleX: 0 });
      if (head) gsap.set(head, { x: -28, autoAlpha: 0 });
      if (chips.length) gsap.set(chips, { y: 14, autoAlpha: 0 });
      if (plain) gsap.set(plain, { autoAlpha: 0 });
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: root,
        /* end at "bottom bottom", not "bottom 70%": the later end put
           progress 1 where the section's top had already left the viewport,
           so the last row could not be read at the same time as the first.
           This way the timeline is complete exactly when the whole section
           is on screen. */
        start: "top 85%",
        end: "bottom bottom",
        scrub: 0.6,
      },
    });

    parts.forEach(({ rule, head, chips, plain }, i) => {
      const at = i === 0 ? 0 : "<+=0.35";
      if (rule) tl.to(rule, { scaleX: 1, duration: 0.5, ease: "none" }, at);
      if (head) tl.to(head, { x: 0, autoAlpha: 1, duration: 0.6, ease: EASE }, rule ? "<+=0.1" : at);
      if (chips.length) {
        tl.to(chips, { y: 0, autoAlpha: 1, duration: 0.5, ease: EASE, stagger: 0.07 }, "<+=0.12");
      }
      if (plain) tl.to(plain, { autoAlpha: 1, duration: 0.4 }, "<+=0.2");
    });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, scope);
  return () => mm.revert();
}

/**
 * The project track: pin the wrapper, translate the panels.
 *
 * Gated to >=768px with motion allowed. Below that, or under reduced motion,
 * matchMedia never runs this and the track stays what it is in CSS — a
 * natively swipeable row. That is the fallback, not a second code path.
 *
 * The horizontal tween must use ease "none" or scroll position and panel
 * position stop agreeing, which is the documented way to get this wrong.
 */
export function horizontalTrack(scope, { onProgress } = {}) {
  const mm = gsap.matchMedia();
  mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
    const wrap = scope.current?.querySelector(".h-wrap");
    const track = wrap?.querySelector(".h-track");
    if (!wrap || !track) return;

    /* Tell CSS the native overflow is off before anything is measured. */
    wrap.classList.add("is-pinned");
    const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);
    if (!distance()) {
      wrap.classList.remove("is-pinned");
      return;
    }

    const tween = gsap.to(track, {
      x: () => -distance(),
      ease: "none",
      scrollTrigger: {
        trigger: wrap,
        pin: true,
        start: "top top",
        end: () => "+=" + distance(),
        scrub: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => onProgress?.(self.progress),
      },
    });

    /* Known gap, recorded rather than papered over: while the track is
       pinned, Tab can move focus to a panel that is off-screen. `overflow:
       clip` above stops the browser revealing it by scrolling the wrapper,
       which was corrupting the pin, but nothing yet scrolls the page to
       follow the focus. Two attempts at that failed — scrollBy inside the
       focusin handler was undone by the browser's own adjustment, and a
       deferred one did not fire at all. The fix is a pair of prev/next
       controls that move the page by one panel, which is testable; until
       that exists this track is mouse-and-touch first. */

    return () => {
      wrap.classList.remove("is-pinned");
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, scope);
  return () => mm.revert();
}
