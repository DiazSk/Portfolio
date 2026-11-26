import { useEffect, useRef, type CSSProperties } from "react";
import "./Intertitle.css";

/* INTERTITLE: a silent-film title card between two sections. One sentence, alone, in the serif italic; its words
   surface one by one as the card scrolls up to centre, then it lets go. No number, no headline, no graphic: it is
   a breath between sections, on the surface of the section it follows. The second line carries the red. */
type Props = { lines: [string, string]; tone: "ink" | "paper" };
export const Intertitle = ({ lines, tone }: Props) => {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { el.style.setProperty("--p", "1"); return; }
    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      const r = el.getBoundingClientRect(), vh = innerHeight;
      if (r.bottom < -vh * .2 || r.top > vh * 1.2) return;
      /* 0 as the card enters at the bottom, 1 once its centre reaches the middle of the screen */
      el.style.setProperty("--p", Math.max(0, Math.min(1, (vh - r.top) / (vh / 2 + r.height / 2))).toFixed(4));
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  const words = lines.map(l => l.split(" "));
  const total = words.flat().length;
  let k = 0;
  return (
    <section ref={ref} className={`itl itl-${tone}`} aria-label={lines.join(" ")} style={{ "--n": total } as CSSProperties}>
      <p className="itl-card" aria-hidden>
        {words.map((ws, li) => (
          <span key={li} className={`itl-line l${li}`}>
            {ws.map(w => <span key={k} className="itl-w" style={{ "--i": k++ } as CSSProperties}>{w} </span>)}
          </span>
        ))}
      </p>
    </section>
  );
};
