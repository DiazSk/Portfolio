import { useEffect, useRef, type RefObject } from "react";

export const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

/* is this element within a screen of the viewport? An IntersectionObserver keeps the answer, so per-frame loops can
   skip all DOM work while their section is far away. Reading layout every frame just to learn "off screen" is what
   made a dozen loops force a dozen style and layout passes per frame. */
export function nearScreen(el: Element) {
  const state = { on: true };
  const io = new IntersectionObserver(([e]) => { state.on = e.isIntersecting; }, { rootMargin: "100% 0px 100% 0px" });
  io.observe(el);
  return { state, stop: () => io.disconnect() };
}

/* while a tall section scrolls past its pinned stage, write its progress (0 → 1) to --p every frame;
   it reads the page position, so it rides the same eased glide as the rest of the page */
export const useScrub = (ref: RefObject<HTMLElement | null>, on?: (p: number) => void, writeVar = true) => {
  const cb = useRef(on);
  cb.current = on;
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const phone = matchMedia("(max-width: 760px)");
    let raf = 0, last = -1;
    const near = nearScreen(el);
    const tick = () => {
      if (!near.state.on) { raf = requestAnimationFrame(tick); return; }
      const r = el.getBoundingClientRect();
      const span = r.height - innerHeight;
      const p = still || phone.matches ? 1 : clamp01(span > 0 ? -r.top / span : 1);
      if (Math.abs(p - last) > 1e-4) {
        last = p;
        if (writeVar) el.style.setProperty("--p", p.toFixed(4));
        cb.current?.(p);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); near.stop(); };
  }, [ref]);
};
