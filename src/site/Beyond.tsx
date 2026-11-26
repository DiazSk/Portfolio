import { useEffect, useRef, useState } from "react";
import "./Beyond.css";

/* 03 · BEYOND THE PIPELINE. The parked Departure Board, used for the second track: each role is a destination,
   "proven by" names the build that earns it, and the status is honest about which are shipped and which are
   still being learned. Every line is from Zaid or from the project data; nothing is claimed without a build. */
export type Status = "Shipped" | "Shipping" | "Learning";
export type Row = { role: string; via: string; href?: string; line: string; status: Status };
export const ROWS: Row[] = [
  { role: "AI / LLM engineering", via: "TripMate", href: "https://github.com/DiazSk/tripmate", status: "Shipped",
    line: "An AI trip planner that checks its plan against real forecast, holiday and opening-hours data, with every model call traced." },
  { role: "Product engineering", via: "Chatflow · TripMate", href: "https://github.com/DiazSk/chatflow-messaging-system", status: "Shipped",
    line: "Two products shipped end to end: a messaging system that handles 21,091 msg/s, and an AI planner in Next.js." },
  { role: "Design engineering", via: "This site", status: "Shipping",
    line: "Explored through dozens of directions in MagicPath, then built into one system with Claude Code." },
  { role: "UI/UX & product design", via: "Figma · MagicPath", status: "Learning",
    line: "Learning to design like a UI/UX designer, practising on my own products." },
];

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
/* split-flap: every letter tumbles through the alphabet and lands left to right */
const Flap = ({ text, go, delay }: { text: string; go: boolean; delay: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const chars = text.toUpperCase().split("");
  useEffect(() => {
    const cells = ref.current ? Array.from(ref.current.querySelectorAll("i")) : [];
    if (!go) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      cells.forEach((c, j) => { c.textContent = chars[j]; });
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      let busy = false;
      cells.forEach((c, j) => {
        const ch = chars[j];
        if (!/[A-Z0-9]/.test(ch)) { c.textContent = ch; return; }
        if (now - t0 < delay + 320 + j * 34) { busy = true; c.textContent = GLYPHS[(Math.random() * GLYPHS.length) | 0]; }
        else c.textContent = ch;
      });
      if (busy) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [go]);
  /* tiles are grouped by word so a line only ever breaks between words */
  const words = text.toUpperCase().split(" ");
  return (
    <span ref={ref} className="bd-flap" aria-label={text}>
      {words.map((w, wi) => (
        <span key={wi} className="bd-word">
          {w.split("").map((_, j) => <i key={j} aria-hidden>{go ? "" : " "}</i>)}
          {wi < words.length - 1 && <i aria-hidden className="sp">{" "}</i>}
        </span>
      ))}
    </span>
  );
};

/* shared by every version: the chapter bar, the headline and the intro */
export const BeyondHead = ({ tag }: { tag: string }) => <>
  <header className="bd-top"><span><b className="bd-num">03</b> Beyond the pipeline</span><span>{tag}</span></header>
  <div className="bd-intro">
    <h2 id="bd-h">Beyond the <em>pipeline.</em></h2>
    <p>Data engineering is the job I'm going for first. I also build the products around the data: TripMate was my first product built with Claude Code, and since then I've been shipping apps end to end and learning to design them.</p>
  </div>
</>;
export const BeyondNote = () => <p className="bd-note">You're looking at the latest one: this site, designed in MagicPath and built with Claude Code.</p>;

export const Beyond = () => {
  const board = useRef<HTMLDivElement>(null);
  const [go, setGo] = useState(false);
  useEffect(() => {
    const el = board.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setGo(true); io.disconnect(); } }, { threshold: .25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <section id="beyond" className="bd" aria-labelledby="bd-h">
      <BeyondHead tag="Departures · from Dec 2026" />
      <div ref={board} className="bd-board" role="table" aria-label="Roles, and the builds that prove them">
        <div className="bd-row bd-cols" role="row">
          <span role="columnheader">Role</span><span role="columnheader">Proven by</span><span role="columnheader">Status</span>
        </div>
        {ROWS.map((r, i) => (
          <div key={r.role} className={`bd-row s-${r.status.toLowerCase()}`} role="row">
            <span role="cell" className="bd-role"><Flap text={r.role} go={go} delay={i * 260} /></span>
            <span role="cell" className="bd-via">
              {r.href ? <a href={r.href} target="_blank" rel="noreferrer">{r.via}<i aria-hidden> ↗</i></a> : <b>{r.via}</b>}
              <small>{r.line}</small>
            </span>
            <span role="cell" className="bd-status"><Flap text={r.status} go={go} delay={i * 260 + 500} /></span>
          </div>
        ))}
      </div>
      <BeyondNote />
    </section>
  );
};
