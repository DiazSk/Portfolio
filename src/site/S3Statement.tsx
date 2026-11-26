import { useEffect, useRef, type CSSProperties } from "react";
import { nearScreen } from "./ProofKit";
import "./S3Statement.css";
const EMAIL = "shaikh.zaid@northeastern.edu";
const DASH = "https://diazsk.github.io/medicare-reimbursement-gap-analyzer/";

/* one word per entry; em words are the serif italic pair */
/* broken by phrase, so every line reads on its own: subject / what it ships / why */
const LINES: {
  w: string;
  em?: boolean;
}[][] = [[{
  w: "Every"
}, {
  w: "pipeline"
}, {
  w: "I"
}, {
  w: "build"
}], [{
  w: "ships"
}, {
  w: "with"
}, {
  w: "the"
}, {
  w: "number",
  em: true
}], [{
  w: "that"
}, {
  w: "decided",
  em: true
}, {
  w: "it."
}]];
const N = LINES.flat().length;
const READ: [string, string][] = [["Role", "Data Engineer"], ["Based", "Seattle, WA"], ["Available", "Full-time from Dec 2026"], ["Studying", "MS CS, Northeastern · 4.0"]];
const Arrow = () => <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
    <path d="M4 12L12 4M6 4h6v6" fill="none" stroke="currentColor" strokeWidth="1.6" />
  </svg>;
const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
export const Statement = () => {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const words = Array.from(el.querySelectorAll<HTMLElement>(".s3-w"));
    const lines = Array.from(el.querySelectorAll<HTMLElement>(".s3-ln"));
    const meter = el.querySelector<HTMLElement>(".s3-pc")!;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("still", "end");
      words.forEach(w => w.style.setProperty("--q", "1"));
      return;
    }

    /* scroll-scrubbed: the stage is pinned while the section scrolls past, and each word fills in turn */
    let raf = 0,
      sm = 0,
      target = 0,
      last = -1;
    const read = () => {
      const r = el.getBoundingClientRect(),
        span = r.height - window.innerHeight;
      target = clamp01(-r.top / Math.max(1, span));
    };
    const loop = () => {
      raf = requestAnimationFrame(loop);
      sm += (target - sm) * 0.14; /* a light lerp so wheel steps glide instead of jump */
      if (Math.abs(target - sm) < 0.0004) sm = target;
      if (sm === last) return;
      last = sm;
      const p = clamp01(sm / 0.82); /* the line is complete at 82%, the rest is the landing */
      words.forEach((w, k) => w.style.setProperty("--q", clamp01(p * N - k).toFixed(3)));
      lines.forEach((l, i) => l.style.setProperty("--dx", `${((i % 2 ? 1 : -1) * (1 - sm) * 3).toFixed(3)}vw`));
      el.style.setProperty("--p", sm.toFixed(4));
      meter.textContent = String(Math.round(p * 100)).padStart(3, "0");
      el.classList.toggle("end", sm > 0.84);
    };
    const near = nearScreen(el);
    const on = () => { if (near.state.on) read(); };
    read();
    raf = requestAnimationFrame(loop);
    window.addEventListener("scroll", on, {
      passive: true
    });
    window.addEventListener("resize", on);
    return () => {
      cancelAnimationFrame(raf);
      near.stop();
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
    };
  }, []);
  let k = 0;
  return <section ref={root} className="s3" aria-labelledby="s3-say">
      <div className="s3-stage">
        <h2 id="s3-say" className="s3-say" aria-label="Every pipeline I build ships with the number that decided it.">
          {LINES.map((ln, i) => <span key={i} className="s3-ln" aria-hidden="true">
              {ln.map(p => {
            const idx = k++;
            return <span key={idx} className={`s3-w${p.em ? " em" : ""}`} style={{
              "--k": idx
            } as CSSProperties}>
                    <span className="o">{p.w}</span>
                    <span className="f">{p.w}</span>
                  </span>;
          })}
            </span>)}
        </h2>

        <div className="s3-meter" aria-hidden="true">
          <i><b /></i>
          <span className="s3-pc">000</span>
        </div>

        <div className="s3-land">
          <dl className="s3-read">
            {READ.map(([a, b], i) => <div key={a} style={{
            "--i": i
          } as CSSProperties}>
                <dt>{a}</dt>
                <dd>{b}</dd>
              </div>)}
          </dl>
          <div className="s3-act">
            <a className="s3-btn" href={`mailto:${EMAIL}`}>Email me</a>
            <a className="s3-link" href={DASH} target="_blank" rel="noopener noreferrer">
              Query 9.66M rows in your browser <Arrow />
            </a>
          </div>
        </div>
      </div>
    </section>;
};