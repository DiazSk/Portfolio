import { useEffect } from "react";
import { advance, push } from "./glide-physics.js";

/* THE PAGE'S ONE SCROLL ENGINE. Every section reads the native scroll position; only this module moves it.
   The wheel sets a target and the page eases toward it (Lenis's damping, frame-rate independent), with the speed-adaptive
   limits in glide-physics.js: slow scrolling is untouched, fast scrolling is held to a medium pace. Keys, scrollbar and touch
   stay native. Any section can steer it (glide.to) or hold it still while a panel or sheet owns the wheel (glide.hold). */
const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
const reducedMotion = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

/* one scroll for the whole page: every wheel step is eased into the same glide, so nothing scrolls differently */
export const glide = {
  to: (y: number) => window.scrollTo({
    top: y,
    behavior: "smooth"
  }),
  hold: false
};

  /* the page-wide glide: the wheel moves a target, the page eases toward it every frame (Lenis-style) */
export function useGlide() {
  useEffect(() => {
    if (reducedMotion() || !window.matchMedia("(pointer: fine)").matches) return;
    const s = { cur: window.scrollY, v: 0, target: window.scrollY };
    let raf = 0,
      last = 0,
      mode: "wheel" | "to" = "wheel";
    const max = () => document.documentElement.scrollHeight - window.innerHeight;
    /* one frame of the glide, at the real frame time */
    const tick = (now: number) => {
      const dt = last ? Math.min(0.05, (now - last) / 1000) : 1 / 60;
      last = now;
      const moving = advance(s, dt, window.innerHeight, mode);
      window.scrollTo(0, s.cur);
      raf = moving ? requestAnimationFrame(tick) : 0;
      if (!raf) last = 0;
    };
    const wheel = (e: WheelEvent) => {
      if (e.ctrlKey) return;
      if (glide.hold) {
        /* a panel is open: it scrolls natively and contains its overscroll; everywhere else the page holds */
        if (!(e.target as Element).closest?.(".w-panel, .ax-sheet")) e.preventDefault();
        return;
      }
      e.preventDefault();
      const d = e.deltaMode === 1 ? e.deltaY * 32 : e.deltaMode === 2 ? e.deltaY * window.innerHeight : e.deltaY;
      mode = "wheel";
      push(s, d, window.innerHeight, max());
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const onScroll = () => {
      if (!raf) { s.target = s.cur = window.scrollY; s.v = 0; }
    };
    glide.to = (y: number) => {
      mode = "to";
      s.target = clamp(y, 0, max());
      if (!raf) raf = requestAnimationFrame(tick);
    };
    window.addEventListener("wheel", wheel, {
      passive: false
    });
    window.addEventListener("scroll", onScroll, {
      passive: true
    });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("wheel", wheel);
      window.removeEventListener("scroll", onScroll);
      glide.to = (y: number) => window.scrollTo({
        top: y,
        behavior: "smooth"
      });
    };
  }, []);
}
