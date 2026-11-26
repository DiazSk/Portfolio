import { useEffect, useRef, type RefObject } from "react";

export const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

/* while a tall section scrolls past its pinned stage, write its progress (0 → 1) to --p every frame;
   it reads the page position, so it rides the same eased glide as the rest of the page */
export const useScrub = (ref: RefObject<HTMLElement | null>, on?: (p: number) => void) => {
  const cb = useRef(on);
  cb.current = on;
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const phone = matchMedia("(max-width: 760px)");
    let raf = 0, last = -1;
    const tick = () => {
      const r = el.getBoundingClientRect();
      const span = r.height - innerHeight;
      const p = still || phone.matches ? 1 : clamp01(span > 0 ? -r.top / span : 1);
      if (Math.abs(p - last) > 1e-4) {
        last = p;
        el.style.setProperty("--p", p.toFixed(4));
        cb.current?.(p);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [ref]);
};
