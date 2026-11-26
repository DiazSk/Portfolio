import { useEffect, useRef, useState, type MouseEvent } from "react";
import { Announce, EMAIL, GITHUB, LINKEDIN, RESUME, reduced, useHold } from "./ContactBits";
import "./K1ContactTheFinalCut.css";

/* K1 · THE FINAL CUT. v1's colours (the hero's red field, gold art screened over it) with v3's type:
   a mono timecode, an italic availability line, and the host set as an outlined credit. The hero opens on a cold-open edit; Contact is the end of the same reel.
   On arrival ~1.2s of hard cuts (public-domain art screened over the red, one word per frame) lands on a
   freeze frame: the email split edge to edge at name scale (Michael Bay Studio, Kevin Hipke). Hold to copy. */
const A = "/assets/site/";
const ART = [
  A + "54c201dbd2b4b97cff3596082d27269b1233ea0cdcbcb40709a26c5cec01435d.webp",
  A + "0dbe48be276704022abe4fb3143dc8581cafca06b7087c602532afb6c9641ff6.webp",
  A + "cc8b082b2891ecfb5105c9dd61e82a2508755eea7888f892d581fa0177e7c657.webp",
  A + "a1de2f18559f540bc9a50ea86cf6dae6784e4f3c8a4718a75ac69dfd4e327c13.webp",
  A + "d52cd9d7c249123b44e5b42a9be57e888440d2051b6a5f7619474edc16ac1b1e.webp",
  A + "429292ae44a6c152f2854c010034d032dcc1657e7df1c596e133f33097eeb057.webp",
  A + "cdbcf20dad39d8489238607cdc500b0ee8746b18827cad0c486baf497a5ba4d1.webp",
];
const WORDS = ["Seven", "systems.", "Every", "repo", "public.", "Your", "move."];
const FRAME = 170;
const [USER, HOST] = EMAIL.split("@");
/* the hold, read as film timecode at 24 fps: 00:00:SS:FF */
const holdTC = (p: number) => { const f = Math.round(p * 1.1 * 24); return `00:00:${String(Math.floor(f / 24)).padStart(2, "0")}:${String(f % 24).padStart(2, "0")}`; };

export const K1ContactTheFinalCut = () => {
  const root = useRef<HTMLElement>(null);
  const timer = useRef<number | undefined>(undefined);
  const [phase, setPhase] = useState<"wait" | "cut" | "freeze">("wait");
  const [i, setI] = useState(0);
  const hold = useHold(1100);
  const [aim, setAim] = useState(false);
  const aimAt = useRef({ x: 0, y: 0 });
  const tip = useRef<HTMLSpanElement>(null);
  const liq = useRef<HTMLSpanElement>(null);
  const target = useRef(0);
  target.current = hold.p;
  /* the liquid: its level eases toward the hold (so it fills, and drains back when you let go), with a moving surface */
  useEffect(() => {
    const el = liq.current; if (!el) return;
    const still = reduced();
    let level = 0, raf = 0, px = 0, py = 0, fresh = true;
    const tick = (t: number) => {
      level += (target.current - level) * (still ? 1 : .14);
      if (level < .002 && target.current === 0) level = 0;
      /* at rest (empty, nothing aimed) there is nothing to draw: skip the per-frame style writes */
      if (level === 0 && target.current === 0 && !tip.current) { raf = requestAnimationFrame(tick); return; }
      const top = (1 - level) * 104 - 2, amp = level > 0 && level < .985 ? 3.2 : 0;
      const pts: string[] = [];
      for (let x = 0; x <= 100; x += 4) {
        const y = top + (still ? 0 : amp * Math.sin(x * .13 + t * .006) + amp * .55 * Math.sin(x * .31 - t * .0045));
        pts.push(`${x}% ${y.toFixed(2)}%`);
      }
      el.style.clipPath = `polygon(${pts.join(",")},100% 100%,0% 100%)`;
      /* the slate label follows the pointer, a touch behind it, like a burn-in tracking the frame */
      const tp = tip.current;
      if (!tp) fresh = true;
      else {
        const { x, y } = aimAt.current;
        if (fresh || still) { px = x; py = y; fresh = false; }
        px += (x - px) * .35; py += (y - py) * .35;
        tp.style.transform = `translate(${px.toFixed(1)}px, ${py.toFixed(1)}px)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  const bubble = hold.state === "done" ? "Copied ✓" : hold.state === "error" ? "Copy failed" : hold.p > 0 ? "Keep holding…" : "Hold to copy";

  const run = () => {
    clearInterval(timer.current);
    if (reduced()) { setPhase("freeze"); return; }
    setI(0); setPhase("cut");
    let k = 0;
    timer.current = window.setInterval(() => {
      k++;
      if (k >= WORDS.length) { clearInterval(timer.current); setPhase("freeze"); } else setI(k);
    }, FRAME);
  };

  useEffect(() => {
    ART.forEach(src => { const im = new Image(); im.src = src; });
    const el = root.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { io.disconnect(); run(); } }, { threshold: .45 });
    io.observe(el);
    return () => { io.disconnect(); clearInterval(timer.current); };
  }, []);

  const tc = `01:00:0${Math.floor(i / 2)}:${String((i * 7) % 24).padStart(2, "0")}`;

  return (
    <div className="kx">
      <section ref={root} id="contact" className={`k1 ${phase}${hold.state !== "idle" ? " " + hold.state : ""}`} aria-label="Contact">
        <div className="k1-field" aria-hidden>
          <img className="k1-art" loading="lazy" decoding="async" src={phase === "cut" ? ART[i % ART.length] : ART[0]} alt="" />
          <div className="k1-vig" />
        </div>

        {phase === "cut" && (
          <div className="k1-cut" aria-hidden>
            <span key={i}>{WORDS[i]}</span>
            <i className="kx-mono">TC {tc}</i>
          </div>
        )}

        <div className="k1-frame">
          <header className="k1-top kx-mono">
            <span><b className="k1-num">05</b> Contact</span>
            <span className="k1-reel">Freeze frame · end of reel</span>
            <button type="button" className="k1-replay" onClick={run}>↻ Replay the cut</button>
          </header>

          <p className="k1-avail">Open to <em>full-time</em> roles in data engineering and AI &amp; product engineering from December 2026.</p>

          <button type="button" className={`k1-mail${aim ? " aim" : ""}`} {...hold.handlers}
            onPointerMove={e => { if (e.pointerType !== "mouse") return; const r = e.currentTarget.getBoundingClientRect(); aimAt.current = { x: e.clientX - r.left, y: e.clientY - r.top }; if (!aim) setAim(true); }}
            onPointerLeave={() => { hold.handlers.onPointerLeave(); setAim(false); }}>
            <span className="k1-l1">{USER}@</span>
            <span className="k1-l2">{HOST}<span ref={liq} className="k1-liq" aria-hidden>{HOST}</span></span>
            <span className="k1-kbd kx-mono">{hold.state === "idle" ? "Press Enter to copy" : bubble}</span>
            {/* touch screens never hover, so the copy cue sits under the address, visible, and confirms in place */}
            <span className={`k1-touch ${hold.state}`} aria-hidden>{hold.state === "done" ? "Copied ✓" : hold.state === "error" ? "Copy failed" : "Tap to copy"}</span>
            {aim && (
              <span ref={tip} className={`k1-tip ${hold.state}${hold.p > 0 && hold.state === "idle" ? " holding" : ""}`} aria-hidden>
                <i className="k1-cross" />
                <span className="k1-slate">
                  <i className="k1-rec" />
                  <b>{hold.state === "done" ? "Copied ✓" : hold.state === "error" ? "Copy failed" : hold.p > 0 ? "Rec" : "Click to copy"}</b>
                  {hold.state === "idle" && hold.p > 0 && <em>{holdTC(hold.p)}</em>}
                </span>
              </span>
            )}
          </button>

          <div className="k1-row">
            <a className="kx-cv" href={RESUME} download>↓ Résumé <small>PDF</small></a>
            <div className="k1-links">
              <a className="kx-link" href={`mailto:${EMAIL}`}>Send an email ↗</a>
              <a className="kx-link" href={LINKEDIN} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
              <a className="kx-link" href={GITHUB} target="_blank" rel="noopener noreferrer">GitHub ↗</a>
            </div>
          </div>
        </div>
        <Announce state={hold.state} />
      </section>
      <Credits />
    </div>
  );
};

/* the footer as end credits: tall enough to read as a section, never a strip you scroll past.
   It carries only what the contact block above does not: the way back up, the page index, and local time. */
const clock = new Intl.DateTimeFormat("en-US", { timeZone: "America/Los_Angeles", hour: "2-digit", minute: "2-digit", hour12: false, timeZoneName: "short" });
const INDEX = [["01", "Measured", "proof"], ["02", "Work", "work"], ["03", "Beyond", "beyond"], ["04", "Off the clock", "off-the-clock"], ["05", "Contact", "contact"]];
const Credits = () => {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => { const id = setInterval(() => setNow(new Date()), 15000); return () => clearInterval(id); }, []);
  const go = (id: string) => (e: MouseEvent) => {
    const el = document.getElementById(id); if (!el) return;
    e.preventDefault(); el.scrollIntoView({ behavior: reduced() ? "auto" : "smooth", block: "start" });
  };
  return (
    <footer className="k1-credits">
      <a className="k1-up" href="#top" onClick={e => { e.preventDefault(); scrollTo({ top: 0, behavior: reduced() ? "auto" : "smooth" }); }}>
        <b aria-hidden>↑</b><span>Back to the top<small>Roll it again from the opening frame</small></span>
      </a>
      <nav className="k1-col" aria-label="Sections">
        <h3>Index</h3>
        {INDEX.map(([n, l, id]) => <a key={id} href={`#${id}`} onClick={go(id)}><i>{n}</i>{l}</a>)}
      </nav>
      <div className="k1-col">
        <h3>Now</h3>
        <p className="k1-now"><b>{clock.format(now).replace(/ (\w+)$/, "")}</b> {clock.formatToParts(now).find(p => p.type === "timeZoneName")?.value} · Seattle</p>
      </div>
      <div className="k1-end">
        <span>© 2026 Zaid Shaikh</span>
        <em aria-hidden>Fin.</em>
      </div>
    </footer>
  );
};
