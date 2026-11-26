import { useEffect } from "react";
import Lenis from "lenis";
import { shapeWheel, LERP } from "./glide-physics.js";

/* THE PAGE'S ONE SCROLL ENGINE: Lenis, the library Lando Norris's site runs on. Every section reads the native scroll
   position; only Lenis moves it. On a fine pointer the wheel is smoothed, shaped first by glide-physics.js so slow
   scrolling is untouched and fast scrolling is held to a medium pace. Touch, keys and the scrollbar stay native.
   Sections steer it through `glide`: to() glides to a position, hold pauses the page while a panel or sheet owns the
   wheel (those panels keep scrolling natively; Lenis is told to leave them alone). */
const reducedMotion = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const OWNS_WHEEL = ".w-panel, .ax-sheet";

let lenis: Lenis | null = null;

export const glide = {
  to: (y: number) => {
    if (lenis) lenis.scrollTo(y, { lerp: LERP });
    else window.scrollTo({ top: y, behavior: "smooth" });
  },
  set hold(on: boolean) {
    if (!lenis) return;
    if (on) lenis.stop();
    else lenis.start();
  },
  get hold() {
    return !!lenis?.isStopped;
  },
};

export function useGlide() {
  useEffect(() => {
    if (reducedMotion() || !matchMedia("(pointer: fine)").matches) return;
    const l = new Lenis({
      lerp: LERP,
      smoothWheel: true,
      /* panels and sheets scroll themselves, even while the page is held */
      prevent: node => !!node.closest?.(OWNS_WHEEL),
      /* shape each wheel step before Lenis applies it: soften flicks, keep the target close */
      virtualScroll: data => {
        if (data.event.type.includes("wheel")) {
          data.deltaY = shapeWheel(data.deltaY, l.targetScroll - l.animatedScroll, window.innerHeight);
        }
        return true;
      },
    });
    lenis = l;
    let raf = requestAnimationFrame(function frame(t) {
      l.raf(t);
      raf = requestAnimationFrame(frame);
    });
    return () => {
      cancelAnimationFrame(raf);
      l.destroy();
      lenis = null;
    };
  }, []);
}
