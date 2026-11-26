import { useEffect, useRef, useState, type CSSProperties } from "react";
import { LAYERS, SHORT, TOOLS, pad2, plural, tool } from "./KitData";
import { nearScreen } from "./ProofKit";
import "./WK7StackSwissAxis.css";
import { glide } from "./Scroll";

/* WK7 · SWISS AXIS, with poster stickers: every logo a cut-out (circle, square, diamond, arch, quarter, pill) sized by its
   builds, with a misregistered print shadow, flying in and out with the scroll; flat red shapes drift behind each layer.
   Original note: The kit as a scroll-driven Swiss poster, vertical and built on one axis, so it never reads like OC6's
   horizontal grid. Moodboard: Bleibtgleich (a single hairline axis everything hangs from; the wordmark ghosted and split
   across the bottom corners), Kevin Hipke / Michael Bay Studio (type split to both edges), Carter (motion tied to the scroll),
   and Lando's Lenis smooth scroll. The 21 splits apart along the axis; a red square rides down it, turning once per layer;
   each layer's tools fly out from the axis as you reach them. JS only writes a progress value per block; CSS does the rest. */
const ORDER = ["lang", "stream", "compute", "store", "ship", "apps"];
const LINE: Record<string, string> = {
  lang: "What every build is written in.", stream: "Events in motion, between services and to the browser.",
  compute: "Batch and transform, from raw to modelled.", store: "Where the rows land and get queried.",
  ship: "Scheduled, containerised, provisioned as code.", apps: "The product surface, and the model behind it.",
};
const SHAPES = ["circle", "square", "diamond", "arch", "quarter", "pill"];
const SLOTS = [{ x: 4, y: 6, r: -8 }, { x: 50, y: 0, r: 7 }, { x: 24, y: 50, r: -3 }, { x: 64, y: 44, r: 11 }];
const SIZE = (n: number) => (n >= 3 ? "l" : n === 2 ? "m" : "s");
const DE = TOOLS.filter(t => t.group === "de").length;
const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const clamp = (v: number) => Math.min(1, Math.max(0, v));

export const WK7StackSwissAxis = () => {
  const root = useRef<HTMLElement>(null);
  const [open, setOpen] = useState<string | null>(null);
  const [at, setAt] = useState(0);
  /* the sheet: closed, open, or closing (kept mounted for its exit) */
  const [sheet, setSheet] = useState<false | "open" | "closing">(false);
  const [near, setNear] = useState(false);
  const sheetRef = useRef(false);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  sheetRef.current = !!sheet;
  const shut = useRef<number | undefined>(undefined);
  const closeSheet = () => { setSheet(s => (s === "open" ? "closing" : s)); clearTimeout(shut.current); shut.current = window.setTimeout(() => setSheet(false), reduced() ? 0 : 420); };

  useEffect(() => {
    const el = root.current; if (!el) return;
    if (reduced()) { el.classList.add("still"); return; }

    /* Lenis, in a few lines: the wheel sets a target, the page eases toward it. Keys, scrollbar and touch stay native. */
    let target = scrollY, y = scrollY, wheeling = 0, raf = 0;
    const max = () => document.documentElement.scrollHeight - innerHeight;
    const wheel = (e: WheelEvent) => {
      /* while the sheet is up, the page behind stays put: only the sheet itself scrolls */
      if (sheetRef.current) { if (!(e.target as Element | null)?.closest?.(".ax-sheet")) e.preventDefault(); return; }
      if (e.ctrlKey || Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      e.preventDefault();
      const d = e.deltaMode === 1 ? e.deltaY * 32 : e.deltaY;
      target = Math.max(0, Math.min(max(), target + d));
      wheeling = performance.now();
    };
    /* on the assembled page Work's glide drives the wheel for every section; this one only reads the scroll */
    void wheel;

    let blocks: { n: HTMLElement; top: number; h: number; kind: string; last?: string }[] = [];
    let vh = innerHeight;
    const measure = () => {
      vh = innerHeight;
      blocks = [...el.querySelectorAll<HTMLElement>("[data-sc]")].map(n => { const b = n.getBoundingClientRect(); return { n, top: b.top + scrollY, h: b.height, kind: n.dataset.sc! }; });
    };
    measure();
    const ro = new ResizeObserver(measure); ro.observe(el);
    const count = el.querySelector<HTMLElement>(".ax-count");
    let last = -1, lastO = "";
    const near = nearScreen(el);

    const tick = () => {
      if (performance.now() - wheeling < 900) {
        y += (target - y) * .1;
        if (Math.abs(target - y) < .4) y = target;
        scrollTo(0, y);
      } else { y = target = scrollY; }
      /* measured live every frame: on a long page the sections above keep settling (images, fonts, pinned stages),
         so positions cached at load drift and every animation fires early */
      if (!near.state.on) { raf = requestAnimationFrame(tick); return; } /* far off screen: no DOM work at all */
      vh = innerHeight;
      /* every read first, then every write: interleaving them forced a full style and layout pass per block per frame */
      const R = el.getBoundingClientRect();
      const rects = blocks.map(b => b.n.getBoundingClientRect());
      let now = 0;
      blocks.forEach((b, k) => {
        const top = rects[k].top;
        b.h = rects[k].height;
        const p = b.kind === "intro" ? clamp(-top / (b.h - vh)) : b.kind === "outro" ? clamp((vh - top) / b.h) : clamp((vh - top) / (vh + b.h));
        const v = p.toFixed(4);
        if (b.last !== v) { b.last = v; b.n.style.setProperty("--p", v); } /* unchanged (off-screen blocks sit at 0 or 1): skip the restyle */
        if (b.kind === "intro" && count) { const c = pad2(Math.round(p * 21)); if (count.textContent !== c) count.textContent = c; }
        if (b.kind === "layer" && top < vh * .7) now = Number(b.n.dataset.i) + 1;
      });
      const o = clamp(-R.top / Math.max(1, R.height - vh)).toFixed(4);
      if (o !== lastO) { lastO = o; el.style.setProperty("--o", o); }
      if (now !== last) { last = now; setAt(now); }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); near.stop(); removeEventListener("wheel", wheel); };
  }, []);

  useEffect(() => {
    const k = (e: KeyboardEvent) => { if (e.key === "Escape") { if (sheetRef.current) closeSheet(); else setOpen(null); } };
    addEventListener("keydown", k); return () => removeEventListener("keydown", k);
  }, []);

  /* the "all 21" button shows only while the poster is on screen */
  useEffect(() => {
    const el = root.current; if (!el) return;
    /* only over the layers: the opening and the close each have their own "see all" button,
       and corner type (the meta, the ghosted wordmark) the square would cover */
    const zone = [...el.querySelectorAll(".ax-layers")];
    const seen = new Set<Element>();
    const io = new IntersectionObserver(es => { es.forEach(e => (e.isIntersecting ? seen.add(e.target) : seen.delete(e.target))); setNear(seen.size > 0); }, { threshold: 0, rootMargin: "-40% 0px -45% 0px" });
    zone.forEach(z => io.observe(z)); return () => io.disconnect();
  }, []);
  /* the sheet: lock the page behind it, focus its close, give focus back on close */
  useEffect(() => { glide.hold = !!sheet; }, [!!sheet]);
  useEffect(() => {
    if (!sheet) { opener.current?.focus({ preventScroll: true }); return; } /* hand focus back without jumping the page */
    /* no overflow lock: on a page whose body scrolls, that resets the scroll to the top. The wheel handler and
       overscroll-behavior keep the page still instead, and the scrollbar never disappears, so nothing shifts. */
    closeBtn.current?.focus({ preventScroll: true });
  }, [!!sheet]);
  const openSheet = (e: { currentTarget: HTMLElement }) => { opener.current = e.currentTarget; setOpen(null); clearTimeout(shut.current); setSheet("open"); };

  return (
    <section ref={root} id="stack" className="ax" aria-labelledby="ax-h">
      {/* 1 · the 21 splits along the axis */}
      <div className="ax-intro" data-sc="intro">
        <div className="ax-stage">
          <p className="ax-c tl">Zaid Shaikh<br />Data engineer · Seattle</p>
          <p className="ax-c tr"><b className="ax-num">02</b> Work · the kit<br />Stack · 2026</p>
          <p className="ax-c bl">Scroll<br /><b className="ax-count">00</b> / 21</p>
          <button type="button" className="ax-c ax-skip" onClick={openSheet}>Or see all 21 at once <b>⊞</b></button>
          <p className="ax-c br">Seven builds<br />Every repo public</p>
          <span className="ax-d two" aria-hidden>2</span>
          <span className="ax-d one" aria-hidden>1</span>
          <h2 id="ax-h" className="ax-title">
            <span style={{ "--k": 0 } as CSSProperties}>Twenty-one tools,</span>
            <span style={{ "--k": 1 } as CSSProperties}>six layers,</span>
            <span style={{ "--k": 2 } as CSSProperties}><em>one axis.</em></span>
          </h2>
          <span className="ax-sq" aria-hidden />
          <dl className="ax-split">
            <div><dt>Data engineering</dt><dd>{pad2(DE)}</dd></div>
            <div><dt>Software &amp; AI</dt><dd>{pad2(TOOLS.length - DE)}</dd></div>
          </dl>
        </div>
      </div>

      {/* 2 · six layers hang off the axis, alternating sides */}
      <div className="ax-layers">
        <div className="ax-axis" aria-hidden><span className="ax-mark"><b>{pad2(at)}</b><i>/06</i></span></div>
        {ORDER.map(k => LAYERS.find(l => l.k === k)!).map((l, i) => {
          const sel = l.tools.includes(open ?? "") ? tool(open!) : null;
          return (
            <article key={l.k} className={`ax-layer ${i % 2 ? "r" : "l"}`} data-sc="layer" data-i={i} aria-labelledby={`ax-${l.k}`}
              style={{ "--dir": i % 2 ? 1 : -1 } as CSSProperties}>
              <span className={`ax-shape sh${i % 3}`} aria-hidden />
              <div className="ax-head">
                <span className="ax-big" aria-hidden>{pad2(i + 1)}</span>
                <div className="ax-collage" aria-hidden>
                  {l.tools.map(tool).map((t, j) => {
                    const sl = SLOTS[j], side = j % 2 ? 1 : -1;
                    return (
                      <span key={t.name} className={`ax-stk ${SHAPES[(i * 2 + j) % 6]} ${SIZE(t.used.length)}${open === t.name ? " on" : ""}${(i + j) % 2 ? " ink" : ""}`}
                        style={{ "--j": j, "--x": `${sl.x}%`, "--y": `${sl.y}%`, "--r": `${sl.r}deg`, "--fx": `${side * (280 + j * 70)}px`, "--fy": `${(j - 1.5) * 150}px`,
                          "--fr": `${side * 140}deg`, "--ex": `${-side * (200 + j * 50)}px` } as CSSProperties}>
                        <span className="ax-stk-b" />
                        <span className="ax-stk-f">{t.logos.length ? t.logos.map(src => <img key={src} src={src} alt="" draggable={false} loading="lazy" decoding="async" />) : <b>{t.sym}</b>}</span>
                      </span>
                    );
                  })}
                </div>
                <h3 id={`ax-${l.k}`}>{l.name}</h3>
                <p>{LINE[l.k]}</p>
              </div>
              <ul className="ax-tools">
                {l.tools.map(tool).map((t, j) => (
                  <li key={t.name} style={{ "--j": j } as CSSProperties}>
                    <button type="button" className={open === t.name ? "on" : ""} aria-pressed={open === t.name} onClick={() => setOpen(o => (o === t.name ? null : t.name))}>
                      <span className="ax-dot" aria-hidden />
                      <span className="ax-name">{t.name}<sup>{t.used.length}</sup></span>
                    </button>
                    {sel?.name === t.name && <p className="ax-builds" aria-live="polite">{plural(t.used.length, "build")} · {t.used.map(u => SHORT[u]).join(" · ")}</p>}
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>

      {/* 3 · the close: the line converges, the wordmark ghosts into the corners */}
      <div className="ax-outro" data-sc="outro">
        <p className="ax-close" aria-label="Every one shipped."><span aria-hidden>Eve<span className="ax-kern">r</span>y one</span><span aria-hidden><em>shipped.</em></span></p>
        <p className="ax-ghost" aria-hidden><span>Twenty</span><span>one</span></p>
        <button type="button" className="ax-again" onClick={openSheet}><span>See the whole kit on one sheet</span><b>⊞</b></button>
        <p className="ax-note">Superscript = builds shipped with the tool · grouped by layer, not alphabet · click a tool for its builds</p>
      </div>

      <button type="button" className={`ax-all${near && !sheet ? " show" : ""}`} onClick={openSheet} aria-hidden={!near} tabIndex={near ? 0 : -1}>
        <b>⊞</b><span>All 21</span>
      </button>

      {/* the whole kit on one Swiss index sheet: six columns, one per layer, everything visible at once */}
      {sheet && <div className={`ax-scrim${sheet === "closing" ? " out" : ""}`} onClick={closeSheet} aria-hidden />}
      {sheet && (
        <div className={`ax-sheet${sheet === "closing" ? " out" : ""}`} role="dialog" aria-modal="true" aria-labelledby="ax-sheet-h">
          <header className="ax-sheet-top">
            <h2 id="ax-sheet-h"><b>21</b> tools · <em>all at once.</em></h2>
            <p>Six layers · {pad2(DE)} data engineering · {pad2(TOOLS.length - DE)} software &amp; AI · superscript = builds</p>
            <button ref={closeBtn} type="button" className="ax-close-btn" onClick={closeSheet}>Close <kbd>Esc</kbd> ✕</button>
          </header>
          <div className="ax-sheet-grid">
            {ORDER.map(k => LAYERS.find(l => l.k === k)!).map((l, i) => (
              <section key={l.k} className="ax-sheet-col" style={{ "--c": i } as CSSProperties} aria-labelledby={`axs-${l.k}`}>
                <h3 id={`axs-${l.k}`}><i>{pad2(i + 1)}</i>{l.name}<b>{pad2(l.tools.length)}</b></h3>
                <ul>
                  {l.tools.map(tool).map(t => (
                    <li key={t.name}>
                      <button type="button" className={open === t.name ? "on" : ""} aria-pressed={open === t.name} onClick={() => setOpen(o => (o === t.name ? null : t.name))}>
                        <span className={`ax-logo sm${t.logos.length > 1 ? " two" : ""}`}>{t.logos.length ? t.logos.map(src => <img key={src} src={src} alt="" draggable={false} loading="lazy" decoding="async" />) : <b>{t.sym}</b>}</span>
                        <span>{t.name}<sup>{t.used.length}</sup></span>
                      </button>
                      {open === t.name && <p className="ax-sheet-b">{t.used.map(u => SHORT[u]).join(" · ")}</p>}
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
