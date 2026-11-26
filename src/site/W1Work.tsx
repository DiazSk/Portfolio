import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { PROJECTS, type Project } from "./W1Data";
import { nearScreen } from "./ProofKit";
import "./W1Work.css";
import { glide } from "./Scroll";
type Pt = [number, number];
type View = [number, number, number]; /* centre x, centre y, visible world width */

/* the chapter's one line language: a polyline whose every corner is cut at 45 degrees */
const chamfer = (pts: Pt[], r: number) => {
  let d = `M${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
  for (let i = 1; i < pts.length - 1; i++) {
    const [ax, ay] = pts[i - 1],
      [bx, by] = pts[i],
      [cx, cy] = pts[i + 1];
    const l1 = Math.hypot(bx - ax, by - ay),
      l2 = Math.hypot(cx - bx, cy - by);
    if (l1 < 0.5 || l2 < 0.5) {
      d += ` L${bx.toFixed(1)} ${by.toFixed(1)}`;
      continue;
    }
    const k = Math.min(r, l1 / 2, l2 / 2);
    d += ` L${(bx - (bx - ax) / l1 * k).toFixed(1)} ${(by - (by - ay) / l1 * k).toFixed(1)}`;
    d += ` L${(bx + (cx - bx) / l2 * k).toFixed(1)} ${(by + (cy - by) / l2 * k).toFixed(1)}`;
  }
  const z = pts[pts.length - 1];
  return d + ` L${z[0].toFixed(1)} ${z[1].toFixed(1)}`;
};
const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const smooth = (t: number) => t * t * (3 - 2 * t);
const inOut = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
const ramp = (v: number, a: number, b: number) => smooth(clamp((v - a) / (b - a), 0, 1));
const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const isPhone = () => window.matchMedia("(max-width: 760px)").matches;
const pad2 = (n: number) => String(n).padStart(2, "0");

/* van Wijk & Nuij's smooth zoom and pan (the curve d3.interpolateZoom uses): a move between two views
   pulls back mid-flight and settles in, which is what makes the camera feel like it flies rather than slides */
const fly = (p0: View, p1: View, rho = Math.SQRT2) => {
  const [x0, y0, w0] = p0,
    [x1, y1, w1] = p1;
  const dx = x1 - x0,
    dy = y1 - y0,
    d2 = dx * dx + dy * dy,
    r2 = rho * rho,
    r4 = r2 * r2;
  if (d2 < 1e-6) {
    const S = Math.log(w1 / w0) / rho;
    return (t: number): View => [x0 + t * dx, y0 + t * dy, w0 * Math.exp(rho * t * S)];
  }
  const d1 = Math.sqrt(d2);
  const b0 = (w1 * w1 - w0 * w0 + r4 * d2) / (2 * w0 * r2 * d1),
    b1 = (w1 * w1 - w0 * w0 - r4 * d2) / (2 * w1 * r2 * d1);
  const q0 = Math.log(Math.sqrt(b0 * b0 + 1) - b0),
    q1 = Math.log(Math.sqrt(b1 * b1 + 1) - b1),
    S = (q1 - q0) / rho;
  return (t: number): View => {
    const s = t * S,
      c0 = Math.cosh(q0),
      u = w0 / (r2 * d1) * (c0 * Math.tanh(rho * s + q0) - Math.sinh(q0));
    return [x0 + u * dx, y0 + u * dy, w0 * c0 / Math.cosh(rho * s + q0)];
  };
};


/* MOCKUP photographs for the design preview only (Unsplash, hotlinked), in PROJECTS order.
   A project's own `photo` replaces its mockup the moment it exists. */
const MOCK = ["photo-1629410484397-a4dcd74088a0", "photo-1500298281307-dcc46bf727d8", "photo-1685640206182-c51b8aa9b686", "photo-1553413077-190dd305871c", "photo-1589560989620-61bf48e97abb", "photo-1558494949-ef010cbdcc31", "photo-1516546453174-5e1098a4b4af"];
export const photoOf = (p: Project, i: number, w = 1400) => p.photo ?? `https://images.unsplash.com/${MOCK[i % MOCK.length]}?auto=format&fit=crop&w=${w}&q=75`;

/* packets: small squares riding the drawn part of the path */
const ridePackets = (path: SVGPathElement, packets: SVGRectElement[], from: number, to: number, t: number, speed: number) => {
  const span = to - from,
    gap = 170;
  packets.forEach((p, i) => {
    if (span < 40) {
      p.style.opacity = "0";
      return;
    }
    const s = from + (t * speed + i * gap) % span;
    const pt = path.getPointAtLength(s);
    p.setAttribute("x", (pt.x - 5).toFixed(1));
    p.setAttribute("y", (pt.y - 5).toFixed(1));
    p.style.opacity = "1";
  });
};
export const Arrow = ({
  dir = "ne"
}: {
  dir?: "ne" | "l" | "r";
}) => <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
    {dir === "ne" && <path d="M4 12L12 4M6 4h6v6" fill="none" stroke="currentColor" strokeWidth="1.6" />}
    {dir === "l" && <path d="M13 8H3M7 4L3 8l4 4" fill="none" stroke="currentColor" strokeWidth="1.6" />}
    {dir === "r" && <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.6" />}
  </svg>;

/* the project's pipeline, top to bottom: one node per stage, straight connectors, and the one stage the
   build's decision lives in marked in the one heat (it ties the diagram back to "The decision" above it) */
const FOCAL: Record<string, string> = {
  "Medicare Gap Analyzer": "Serve", "NYC Taxi Lakehouse": "ETL", "Funnel Lakehouse": "Model", "Olist Warehouse": "Gold",
  "Crypto Market Analyzer": "Process", "Chatflow": "Persist", "TripMate": "Model"
};
const Flow = ({
  p
}: {
  p: Project;
}) => <ol className="w-flow" aria-label={`${p.short} pipeline, ${p.arch.length} stages, top to bottom`}>
    {p.arch.map((a, k) => {
    const f = FOCAL[p.short] === a.stage;
    return <li key={a.stage} className={`w-fn${f ? " f" : ""}`}>
          <span className="w-fn-ix">{pad2(k + 1)}</span>
          <span className="w-fn-b"><b>{a.stage}</b>{a.items.map(it => <em key={it}>{it}</em>)}</span>
          {f && <span className="w-fn-d">The decision</span>}
        </li>;
  })}
  </ol>;

/* the SIU on real footage: Real Madrid C.F., "All 48 goals of Cristiano Ronaldo (2014-15)", CC BY 3.0 via Wikimedia Commons; looping animated WebP */
/* or, with `photo`, a still the page supplies (no credit line: source unknown) */
const SiuFigure = ({
  photo
}: {
  photo?: string;
}) => <figure className="w-figbox">
    <img className={`w-fig ${photo ? "w-photo" : "w-gif"}`} src={photo ?? "/assets/site/771d49a422d936f28200d54081d1aaf259eb2e5fccdc1c7c8caf075dce1bbe6c.webp"} alt="Cristiano Ronaldo's SIU celebration" draggable={false} />
    {!photo && <figcaption className="w-fig-cr">Video: Real Madrid C.F. · CC BY 3.0 · Wikimedia Commons</figcaption>}
  </figure>;

/* ---------- layouts ---------- */
/* the line layout says it in three words; the wrap layout says the whole sentence, one word per project */
const WORDS: Record<"line" | "wrap", string[]> = {
  line: ["Follow", "the", "data."],
  wrap: ["Follow", "the", "data.", "{siu}", "systems,", "one", "line."] /* {siu}: the figure stands in for "seven" */
};
type Box = {
  x: number;
  y: number;
  w: number;
  h: number;
  ly?: number;
}; /* ly: where the line crosses a poster */
type Item = {
  kind: "word";
  k: number;
  exit: "left" | "right";
} | {
  kind: "post";
  i: number;
  from: "left" | "right";
};
type Placed = {
  frames: Box[];
  posts: Box[];
  order: Item[];
  wholeView: (f: Box) => View;
};

/* LINE: the words stacked down the left and right edges, then one straight line of posters that snakes back once */
const layLine = (vw: number, vh: number, gl: number, fs: {
  w: number;
  h: number;
}[], ps: {
  w: number;
  h: number;
}[]): Placed => {
  const HANG = [0.34, 0.66, 0.42, 0.6, 0.38, 0.62, 0.46],
    GAPS = [0.44, 0.62, 0.36, 0, 0.56, 0.4, 0];
  const f0 = {
    x: gl,
    y: vh * 0.45,
    ...fs[0]
  };
  const f1 = {
    x: vw - gl - fs[1].w,
    y: f0.y + f0.h + vh * 0.42,
    ...fs[1]
  };
  const f2 = {
    x: gl,
    y: f1.y + f1.h + vh * 0.42,
    ...fs[2]
  };
  const L1 = f2.y + f2.h + vh * 0.62,
    posts: Box[] = [];
  let x = vw * 0.3;
  for (let i = 0; i < 4; i++) {
    posts.push({
      x,
      y: L1 - ps[i].h * HANG[i],
      ly: L1,
      ...ps[i]
    });
    x += ps[i].w + GAPS[i] * vw;
  }
  const xr1 = posts[3].x + posts[3].w,
    bot1 = Math.max(...posts.map(q => q.y + q.h));
  const L2 = bot1 + vh * 0.32 + Math.max(...ps.slice(4).map((q, k) => q.h * HANG[4 + k]));
  x = xr1;
  for (let i = 4; i < ps.length; i++) {
    posts.push({
      x: x - ps[i].w,
      y: L2 - ps[i].h * HANG[i],
      ly: L2,
      ...ps[i]
    });
    x = x - ps[i].w - GAPS[i] * vw;
  }
  return {
    frames: [f0, f1, f2],
    posts,
    order: [{
      kind: "word",
      k: 0,
      exit: "left"
    }, {
      kind: "word",
      k: 1,
      exit: "left"
    }, {
      kind: "word",
      k: 2,
      exit: "left"
    }, ...posts.map((_, i) => ({
      kind: "post" as const,
      i,
      from: (i < 4 ? "left" : "right") as "left" | "right"
    }))],
    /* the words are composed for the screen, so a whole word is seen at the screen's own scale */
    wholeView: f => [vw / 2, f.y + f.h / 2, vw]
  };
};

/* WRAP: the sentence and the projects interleave, word then poster, two pairs to a row,
   read left to right like lines of text; every row starts at a slightly different indent */
const layWrap = (vw: number, vh: number, gl: number, fs: {
  w: number;
  h: number;
}[], ps: {
  w: number;
  h: number;
}[]): Placed => {
  const gx = vw * 0.1,
    gy = vh * 0.5,
    INDENT = [0, 0.16, 0.05, 0.28],
    LIFT = [-0.06, 0.05, 0.02, -0.04, 0.07, -0.03, 0.04];
  const frames: Box[] = [],
    posts: Box[] = [],
    order: Item[] = [];
  let y = vh * 0.5;
  for (let r = 0, k = 0; k < fs.length; r++) {
    let x = gl + vw * INDENT[r % INDENT.length],
      rowBottom = y;
    for (let c = 0; c < 2 && k < fs.length; c++, k++) {
      const f = {
          x,
          y: 0,
          ...fs[k]
        },
        p = {
          x: 0,
          y: 0,
          ...ps[k]
        };
      const mid = y + Math.max(f.h, p.h) / 2;
      f.y = mid - f.h / 2;
      p.x = f.x + f.w + gx * 0.8;
      p.y = mid - p.h / 2 + vh * LIFT[k % LIFT.length];
      frames.push(f);
      posts.push(p);
      order.push({
        kind: "word",
        k,
        exit: "right"
      }, {
        kind: "post",
        i: k,
        from: "left"
      });
      rowBottom = Math.max(rowBottom, f.y + f.h, p.y + p.h);
      x = p.x + p.w + gx;
    }
    y = rowBottom + gy;
  }
  return {
    frames,
    posts,
    order,
    /* the plane is wider than the screen, so a whole word is framed on its own */
    wholeView: f => [f.x + f.w / 2, f.y + f.h / 2, Math.max(f.w * 1.3, f.h * 1.7 * vw / vh)]
  };
};
type Seg = {
  a: number;
  b: number;
  at: (s: number) => View;
};
type Geo = {
  L: number;
  Lp: number;
  Lw: number;
  segs: Seg[];
  last: View;
  over: View;
  chars: {
    el: HTMLElement;
    L: number;
  }[];
  figs: {
    el: SVGSVGElement;
    a: number;
    b: number;
  }[];
  posts: (Box & {
    mid: number;
    enter: number;
  })[];
};

/* ---------- the detail panel: opens beside its poster, inside the stage, and scrolls on its own ---------- */
const Panel = ({
  i,
  onClose,
  onStep
}: {
  i: number;
  onClose: () => void;
  onStep: (d: number) => void;
}) => {
  const p = PROJECTS[i];
  const box = useRef<HTMLElement>(null);
  const back = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    box.current?.scrollTo({
      top: 0
    });
    back.current?.focus({
      preventScroll: true
    });
  }, [i]);
  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onStep(1);
      if (e.key === "ArrowLeft") onStep(-1);
    };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [onClose, onStep]);
  return <aside ref={box} className="w-panel" role="dialog" aria-modal="false" aria-labelledby="w-pn-h">
      <div className="w-pn-bar">
        <button ref={back} type="button" className="w-pn-back" onClick={onClose}><Arrow dir="l" /> Back<span className="w-pn-bx"> to the line</span></button>
        <span className="w-pn-ix">P·{pad2(i + 1)} / {pad2(PROJECTS.length)}</span>
        <span className="w-pn-nav">
          <button type="button" onClick={() => onStep(-1)} disabled={i === 0} aria-label="Previous project"><Arrow dir="l" /></button>
          <button type="button" onClick={() => onStep(1)} disabled={i === PROJECTS.length - 1} aria-label="Next project"><Arrow dir="r" /></button>
        </span>
      </div>
      <div className="w-pn-body" key={i}>
        <span className="w-pn-cat">{p.category}</span>
        <h3 id="w-pn-h" className="w-pn-h">{p.name}</h3>
        <p className="w-pn-tag">{p.tagline}</p>
        <figure className="w-pn-fig">
          <img src={photoOf(p, i, 1200)} alt="" />
          <figcaption>{p.photo ? p.short : "Mockup photo · project images to come"}</figcaption>
        </figure>
        <div className="w-pn-met"><b>{p.metric.value}</b><span>{p.metric.label}</span></div>
        <section className="w-pn-sec">
          <h4>The decision</h4>
          <p className="w-pn-chose">{p.decision.chose}</p>
          <p className="w-pn-row"><span>Over</span><s>{p.decision.over}</s></p>
          <p className="w-pn-row"><span>Because</span>{p.decision.because}</p>
        </section>
        <section className="w-pn-sec">
          <h4>The pipeline</h4>
          <Flow p={p} />
        </section>
        <section className="w-pn-sec">
          <h4>What it did</h4>
          <ol className="w-pn-hl">{p.highlights.map((h, k) => <li key={h}><b>{pad2(k + 1)}</b><p>{h}</p></li>)}</ol>
        </section>
        <section className="w-pn-sec">
          <h4>Built with</h4>
          <p className="w-pn-tech">{p.tech.join(" / ")}</p>
        </section>
        <div className="w-pn-act">
          <a className="w-pn-btn" href={p.github} target="_blank" rel="noopener noreferrer">Read the repo <Arrow /></a>
          {p.live && <a className="w-pn-link" href={p.live} target="_blank" rel="noopener noreferrer">Open the live dashboard <Arrow /></a>}
        </div>
        {i < PROJECTS.length - 1 ? <button type="button" className="w-pn-next" onClick={() => onStep(1)}>
            <span>Next on the line</span><b>{PROJECTS[i + 1].short}</b><Arrow dir="r" />
          </button> : <button type="button" className="w-pn-next end" onClick={onClose}>
            <span>End of the line · {PROJECTS.length} of {PROJECTS.length}</span><b>Back to the line</b><Arrow dir="l" />
          </button>}
      </div>
    </aside>;
};

/* ---------- the journey: one pinned stage, one camera on a keyframed track, one line ---------- */
const Journey = ({
  layout,
  siuPhoto
}: {
  layout: "line" | "wrap";
  siuPhoto?: string;
}) => {
  const run = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const world = useRef<HTMLDivElement>(null);
  const svg = useRef<SVGSVGElement>(null);
  const path = useRef<SVGPathElement>(null);
  const tip = useRef<SVGCircleElement>(null);
  const pk = useRef<SVGRectElement[]>([]);
  const geo = useRef<Geo | null>(null);
  const [runH, setRunH] = useState(9000);
  const [ver, setVer] = useState(0);
  const [open, setOpen] = useState<number | null>(null);
  const openRef = useRef<number | null>(null);
  const ovRef = useRef(0); /* how far the camera is into the overview */
  openRef.current = open;
  useLayoutEffect(() => {
    const st = stage.current,
      w = world.current,
      p = path.current,
      sv = svg.current;
    if (!st || !w || !p || !sv) return;
    const build = () => {
      if (isPhone()) return;
      const vw = st.clientWidth,
        vh = st.clientHeight,
        gl = clamp(vw * 0.05, 20, 80);
      const fr = Array.from(w.querySelectorAll<HTMLElement>(".w-frame"));
      const els = Array.from(w.querySelectorAll<HTMLElement>(".w-post"));
      const lay = (layout === "wrap" ? layWrap : layLine)(vw, vh, gl, fr.map(f => ({
        w: f.offsetWidth,
        h: f.offsetHeight
      })), els.map(e => ({
        w: e.offsetWidth,
        h: e.offsetHeight
      })));
      lay.frames.forEach((b, i) => {
        fr[i].style.left = `${b.x}px`;
        fr[i].style.top = `${b.y}px`;
      });
      lay.posts.forEach((b, i) => {
        els[i].style.left = `${b.x}px`;
        els[i].style.top = `${b.y}px`;
      });
      const sub = w.querySelector<HTMLElement>(".w-sub")!;
      const lastF = lay.frames[lay.frames.length - 1];
      sub.style.left = `${layout === "wrap" ? lastF.x : vw - gl - sub.offsetWidth}px`;
      sub.style.top = `${layout === "wrap" ? lastF.y + lastF.h + 24 : lastF.y + lastF.h - sub.offsetHeight}px`;
      const all = [...lay.frames, ...lay.posts];
      const W = Math.max(...all.map(b => b.x + b.w)) + vw * 0.4,
        H = Math.max(...all.map(b => b.y + b.h)) + vh;
      w.style.width = `${W}px`;
      w.style.height = `${H}px`;
      sv.setAttribute("width", String(W));
      sv.setAttribute("height", String(H));
      sv.setAttribute("viewBox", `0 0 ${W} ${H}`);

      /* route: words are traced (top edge carries the letters), posters are entered at one side and left at the other */
      const pts: Pt[] = [[lay.frames[0].x, 0]],
        marks: {
          kind: string;
          idx: number;
          pts: Pt[];
        }[] = [];
      let cur: Pt = pts[0],
        dropFirst = false,
        heading: "l" | "r" = "r";
      const go = (q: Pt) => {
        pts.push(q);
        cur = q;
      };
      lay.order.forEach(it => {
        if (it.kind === "word") {
          const f = lay.frames[it.k];
          const ym = cur[1] < f.y - 60 ? (cur[1] + f.y) / 2 : f.y - 80;
          go([cur[0], ym]);
          go([f.x, ym]);
          const m = {
            kind: "word",
            idx: it.k,
            pts: [[f.x, f.y], [f.x + f.w, f.y], [f.x + f.w, f.y + f.h]] as Pt[]
          };
          go([f.x, f.y]);
          go([f.x + f.w, f.y]);
          go([f.x + f.w, f.y + f.h]);
          if (it.exit === "left") {
            go([f.x, f.y + f.h]);
            m.pts.push([f.x, f.y + f.h]);
          }
          /* leaving bottom-left, the line must drop before it turns, or it would run back along the frame it just drew */
          dropFirst = it.exit === "left";
          heading = it.exit === "left" ? "l" : "r";
          marks.push(m);
        } else {
          const q = lay.posts[it.i],
            cy = q.ly ?? q.y + q.h / 2;
          const ex: Pt = it.from === "left" ? [q.x, cy] : [q.x + q.w, cy];
          const room = it.from === "left" ? ex[0] - cur[0] : cur[0] - ex[0];
          if (dropFirst) {
            go([cur[0], cy]);
            go(ex);
          } else {
            /* keep travelling the way the line is heading; if the next poster is behind it, go round the outside */
            const ahead = it.from === "left" && heading === "r" || it.from === "right" && heading === "l";
            const xm = ahead && room > 80 ? (cur[0] + ex[0]) / 2 : it.from === "left" ? Math.min(cur[0], ex[0]) - 90 : Math.max(cur[0], ex[0]) + 90;
            go([xm, cur[1]]);
            go([xm, cy]);
            go(ex);
          }
          dropFirst = false;
          heading = it.from === "left" ? "r" : "l";
          const out: Pt = it.from === "left" ? [q.x + q.w, cy] : [q.x, cy];
          marks.push({
            kind: "post",
            idx: it.i,
            pts: [ex, out]
          });
          go(out);
        }
      });
      go([cur[0] + (layout === "wrap" ? 220 : -280), cur[1]]);
      go([cur[0], H - 20]);
      p.setAttribute("d", chamfer(pts, 30));
      const L = p.getTotalLength();
      p.style.strokeDasharray = `${L}`;

      /* sample the route once and find every milestone as the nearest sample, walking forward */
      const N = Math.ceil(L / 3),
        sx = new Float32Array(N + 1),
        sy = new Float32Array(N + 1);
      for (let k = 0; k <= N; k++) {
        const q = p.getPointAtLength(k / N * L);
        sx[k] = q.x;
        sy[k] = q.y;
      }
      const len = (k: number) => k / N * L;
      let ki = 0;
      const near = (q: Pt) => {
        let best = ki,
          bd = Infinity;
        for (let k = ki; k <= N; k++) {
          const d = Math.hypot(sx[k] - q[0], sy[k] - q[1]);
          if (d < bd) {
            bd = d;
            best = k;
          } else if (bd < 40 && d > bd + 160) break;
        }
        ki = best;
        return best;
      };
      const wordAt: {
          a: number;
          t: number;
          b: number;
        }[] = [],
        postAt: {
          a: number;
          b: number;
        }[] = [];
      marks.forEach(m => {
        if (m.kind === "word") wordAt[m.idx] = {
          a: near(m.pts[0]),
          t: near(m.pts[1]),
          b: near(m.pts[m.pts.length - 1])
        };else postAt[m.idx] = {
          a: near(m.pts[0]),
          b: near(m.pts[1])
        };
      });
      const chars = fr.flatMap((f, fi) => Array.from(f.querySelectorAll<HTMLElement>(".w-ch")).map(ch => {
        const cx = lay.frames[fi].x + ch.offsetLeft + ch.offsetWidth * 0.5,
          y0 = lay.frames[fi].y;
        let k = wordAt[fi].a;
        while (k < wordAt[fi].t && !(Math.abs(sy[k] - y0) < 3 && sx[k] >= cx)) k++;
        return {
          el: ch,
          L: len(k)
        };
      }));
      const posts = lay.posts.map((q, i) => ({
        ...q,
        enter: len(postAt[i].a),
        mid: (len(postAt[i].a) + len(postAt[i].b)) / 2
      }));

      /* the camera track, Bîrkar-style: stations joined by flights; while a word's letters land the camera rides the pen */
      const segs: Seg[] = [];
      const hold = (a: number, b: number, v: View) => {
        if (b > a) segs.push({
          a,
          b,
          at: () => v
        });
      };
      const flyTo = (a: number, b: number, v0: View, v1: View) => {
        if (b > a) {
          const f = fly(v0, v1);
          segs.push({
            a,
            b,
            at: s => f(inOut((s - a) / (b - a)))
          });
        }
      };
      const wz = vw / 1.65;
      const penView = (f: Box, x: number): View => [clamp(x - wz * 0.08, f.x + wz / 2 - 60, Math.max(f.x + wz / 2 - 60, f.x + f.w - wz / 2 + 60)), f.y + f.h / 2, wz];
      let s0 = 0,
        v0: View = lay.wholeView(lay.frames[0]);
      lay.order.forEach(it => {
        if (it.kind === "word") {
          const f = lay.frames[it.k],
            m = wordAt[it.k],
            whole = lay.wholeView(f);
          const La = len(m.a),
            Lt = len(m.t),
            Lb = len(m.b);
          const inA = Math.max(s0, La - 320);
          if (s0 === 0 && it.k === 0) hold(0, inA, whole);else flyTo(s0, inA, v0, whole);
          flyTo(inA, La, whole, penView(f, f.x));
          segs.push({
            a: La,
            b: Lt,
            at: s => {
              const q = p.getPointAtLength(s);
              return penView(f, q.x);
            }
          });
          const back = Math.min(Lb, Lt + 420);
          flyTo(Lt, back, penView(f, f.x + f.w), whole);
          hold(back, Lb, whole);
          s0 = Lb;
          v0 = whole;
        } else {
          const q = posts[it.i];
          const pv: View = [q.x + q.w / 2, q.y + q.h / 2, Math.max(q.w * 1.24, q.h * 1.34 * vw / vh)];
          const hw = q.w * 0.3;
          flyTo(s0, q.mid - hw, v0, pv);
          hold(q.mid - hw, q.mid + hw, pv);
          s0 = q.mid + hw;
          v0 = pv;
        }
      });
      const Lp = s0 + 200;
      hold(s0, Lp, v0);
      const bx0 = Math.min(...all.map(b => b.x)) - 120,
        by0 = Math.min(...(layout === "wrap" ? all : lay.posts).map(b => b.y)) - 140;
      const bx1 = Math.max(...all.map(b => b.x + b.w)) + 120,
        by1 = Math.max(...all.map(b => b.y + b.h)) + 120;
      const over: View = [(bx0 + bx1) / 2, (by0 + by1) / 2, Math.max(bx1 - bx0, (by1 - by0) * vw / (vh - 150))];
      const figs = fr.flatMap((f, fi) => {
        const el = f.querySelector<SVGSVGElement>(".w-fig");
        return el ? [{
          el,
          a: len(wordAt[fi].a),
          b: len(wordAt[fi].b)
        }] : [];
      });
      geo.current = {
        L,
        Lp,
        Lw: len(wordAt[wordAt.length - 1].b),
        segs,
        last: v0,
        over,
        chars,
        figs,
        posts
      };
      setRunH(Math.round(Lp * 0.32 / 0.84 + vh)); /* unified pass: about 45% less scroll for the same line */
      setVer(v => v + 1);
    };
    build();
    document.fonts?.ready.then(() => build());
    const ro = new ResizeObserver(() => build());
    ro.observe(st);
    return () => ro.disconnect();
  }, [layout]);
  useEffect(() => {
    const r0 = run.current,
      st = stage.current,
      w = world.current,
      p = path.current,
      tp = tip.current;
    if (!r0 || !st || !w || !p || !tp || !geo.current || isPhone()) return;
    const reduced = reducedMotion();
    const els = Array.from(w.querySelectorAll<HTMLElement>(".w-post"));
    const ticks = Array.from(st.querySelectorAll<HTMLElement>(".w-tick"));
    const fill = st.querySelector<HTMLElement>(".w-rail-f")!;
    const hud = st.querySelector<HTMLElement>(".w-hud")!;
    let raf = 0,
      openE = 0,
      ov: ((t: number) => View) | null = null,
      ovFrom: View | null = null;
    const oc = {
      x: NaN,
      y: NaN,
      z: NaN
    };
    const inView = nearScreen(r0);
    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (!inView.state.on && openRef.current === null) return;
      const g = geo.current!;
      const vw = st.clientWidth,
        vh = st.clientHeight;
      const r = r0.getBoundingClientRect();
      /* on the full page, sit idle while the whole Work run is off screen (unless a project panel is open) */
      if (openRef.current === null && (r.bottom < -innerHeight || r.top > innerHeight * 1.5)) return;
      const pr = clamp(-r.top / Math.max(1, r.height - vh), 0, 1);
      openE += ((openRef.current !== null ? 1 : 0) - openE) * 0.1;

      /* scroll → distance along the line; the final stretch of scroll flies out to the whole plane */
      const o = ramp(pr, 0.84, 0.97);
      const s = pr < 0.84 ? pr / 0.84 * g.Lp : lerp(g.Lp, g.L, o);
      const t = p.getPointAtLength(Math.min(s, g.L));
      const sv = Math.min(s, g.Lp);
      const seg = g.segs.find(q => sv >= q.a && sv <= q.b) ?? g.segs[g.segs.length - 1];
      let v = seg.at(sv);
      if (o > 0) {
        if (ovFrom !== g.last) {
          ovFrom = g.last;
          ov = fly(g.last, g.over);
        }
        v = ov!(inOut(o));
      }

      /* with a panel open the camera frames the open poster, scaled to fit the room left of the panel */
      const pw = Math.min(640, vw * 0.46),
        oi = openRef.current;
      if (oi !== null) {
        const q = g.posts[oi];
        const fit = Math.min(1, (vw - pw - 120) / q.w, (vh - 140) / q.h);
        oc.x = isNaN(oc.x) ? q.x + q.w / 2 : lerp(oc.x, q.x + q.w / 2, 0.1);
        oc.y = isNaN(oc.y) ? q.y + q.h / 2 : lerp(oc.y, q.y + q.h / 2, 0.1);
        oc.z = isNaN(oc.z) ? fit : lerp(oc.z, fit, 0.1);
      }
      const ue = isNaN(oc.x) ? 0 : openE;
      const Z = lerp(vw / v[2], isNaN(oc.z) ? 1 : oc.z, ue);
      const cx = lerp(v[0], oc.x || 0, ue),
        cy = lerp(v[1], oc.y || 0, ue);
      if (oi === null && openE < 0.01) {
        oc.x = NaN;
        oc.y = NaN;
        oc.z = NaN;
      }
      const ax = lerp(vw / 2, (vw - pw) / 2, ue);
      const tx = ax - cx * Z,
        ty = vh / 2 - cy * Z;
      w.style.transform = `translate3d(${tx.toFixed(2)}px,${ty.toFixed(2)}px,0) scale(${Z.toFixed(4)})`;
      st.style.setProperty("--bx", `${(tx * 0.5).toFixed(1)}px`);
      st.style.setProperty("--by", `${(ty * 0.5).toFixed(1)}px`);
      st.style.setProperty("--o", o.toFixed(3));
      ovRef.current = o;
      p.style.strokeDashoffset = (g.L - Math.min(s, g.L)).toFixed(1);
      tp.setAttribute("cx", t.x.toFixed(1));
      tp.setAttribute("cy", t.y.toFixed(1));
      tp.style.opacity = String(1 - o);

      /* a letter rises the moment the pen passes its ink */
      g.chars.forEach(c => c.el.style.setProperty("--c", clamp((s - c.L + 30) / 70, 0, 1).toFixed(3)));
      g.figs.forEach(f => f.el.style.setProperty("--d", clamp((s - f.a + 60) / (f.b - f.a), 0, 1).toFixed(3)));
      let best = 0,
        near = Infinity;
      els.forEach((el, i) => {
        const q = g.posts[i],
          d = Math.abs(s - q.mid);
        if (d < near) {
          near = d;
          best = i;
        }
        const f = Math.max(smooth(clamp(1 - d / (q.w * 0.95), 0, 1)), o);
        el.style.setProperty("--f", f.toFixed(3));
        el.style.setProperty("--r", Math.max(clamp((s - q.enter + q.w * 0.5) / (q.w * 0.45), 0, 1), o).toFixed(3));
        el.classList.toggle("lit", f > 0.7);
      });
      const inPlane = near < g.posts[best].w * 1.2 || s > g.posts[0].enter - 200;
      st.classList.toggle("plane", inPlane);
      st.classList.toggle("ov", o > 0.6);
      fill.style.transform = `scaleX(${clamp((s - g.posts[0].enter) / Math.max(1, g.Lp - g.posts[0].enter), 0, 1).toFixed(4)})`;
      ticks.forEach((tk, i) => tk.classList.toggle("on", inPlane && i === best && o < 0.5));
      hud.textContent = o > 0.5 ? `LINE::WHOLE · ${PROJECTS.length} SYSTEMS · SCALE::1:${(1 / Z).toFixed(2)}` : inPlane ? `LINE::P·${pad2(best + 1)}/${pad2(PROJECTS.length)} · ${PROJECTS[best].category}` : `FOLLOW::THE DATA · ZOOM::${Z.toFixed(2)}×`;
      if (!reduced) ridePackets(p, pk.current, Math.max(0, s - 1800), Math.min(s, g.L), now / 1000, 200);
    };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); inView.stop(); };
  }, [ver]);

  /* move the page so the chosen poster sits under the camera */
  const goTo = (i: number) => {
    const r0 = run.current,
      st = stage.current,
      g = geo.current;
    if (!r0 || !st || !g || isPhone()) return;
    const top = r0.getBoundingClientRect().top + window.scrollY;
    glide.to(top + g.posts[i].mid / g.Lp * 0.84 * (r0.offsetHeight - st.clientHeight));
  };
  /* on the line, opening a poster brings the page to it; in the overview the page stays put,
     so Back returns to the whole map instead of leaving you somewhere down the line */
  const inOverview = () => ovRef.current > 0.5;
  const show = (i: number) => {
    if (!inOverview()) goTo(i);
    setOpen(i);
  };
  const step = (d: number) => setOpen(o => {
    if (o === null) return o;
    const n = Math.min(PROJECTS.length - 1, Math.max(0, o + d));
    if (n === o) return o;
    if (!inOverview()) goTo(n);
    return n;
  });

  /* while a panel is open the page holds still: the wheel reaches only the panel (see the glide) */
  useEffect(() => {
    if (open === null) return;
    glide.hold = true;
    return () => {
      glide.hold = false;
    };
  }, [open === null]);
  return <div ref={run} className="w-run" style={{
    height: runH
  }}>
      <div ref={stage} className={`w-stage L-${layout}${open !== null ? " open" : ""}`}>
        <div ref={world} className="w-world">
          <svg ref={svg} className="w-dag" aria-hidden="true">
            <path ref={path} className="w-pipe" />
            {Array.from({
            length: 12
          }, (_, i) => <rect key={i} ref={n => {
            if (n) pk.current[i] = n;
          }} className="w-pk" width="10" height="10" />)}
            <circle ref={tip} className="w-tip" r="10" />
          </svg>
          <div className="w-words" aria-hidden="true">
            {WORDS[layout].map((wd, i) => <span key={wd} className={`w-frame f${i}${wd.endsWith(".") ? " it" : ""}${wd === "{siu}" ? " fig" : ""}`}>
                {wd === "{siu}" ? <SiuFigure photo={siuPhoto} /> : <span className="w-word">{Array.from(wd).map((ch, k) => <span key={k} className="w-ch">{ch}</span>)}</span>}
              </span>)}
          </div>
          <p className="w-sub">Seven systems, every repo public. The line runs through each one; open any poster for the decision behind it.</p>
          {PROJECTS.map((p, i) => <button key={p.name} type="button" className={`w-post v${i % 3}${open === i ? " cur" : ""}`} onClick={() => show(i)} onFocus={e => {
          if (e.currentTarget.matches(":focus-visible")) goTo(i);
        }} aria-label={`${p.name}. ${p.metric.value} ${p.metric.label}. Open the details.`}>
            
              <span className="w-p-img">
                <img src={photoOf(p, i)} alt="" loading="lazy" />
                {!p.photo && <em className="w-p-mock">Mockup photo</em>}
              </span>
              <span className="w-p-body">
                <span className="w-p-top"><b>P·{pad2(i + 1)}</b><span>{p.category}</span></span>
                <span className="w-p-title">{p.short.split(" ").map((wd, k) => <span key={k}>{wd}</span>)}</span>
                <span className="w-p-story">
                  <span className="w-p-k">Chose</span>
                  <span className="w-p-chose">{p.decision.chose}</span>
                  <span className="w-p-k o">Over</span>
                  <span className="w-p-over"><s>{p.decision.over}</s></span>
                </span>
                <span className="w-p-met"><b>{p.metric.value}</b><small>{p.metric.label}</small></span>
                <span className="w-p-open">Open the details <Arrow dir="r" /></span>
              </span>
            </button>)}
        </div>
        {/* the telemetry strip: the readout and the project index share one bar at the top edge,
            where the posters never land; a hot hairline along its foot fills as the line is travelled */}
        <div className="w-strip">
          <span className="w-hud" aria-hidden="true">FOLLOW::THE DATA</span>
          <nav className="w-rail" aria-label="Projects">
            {PROJECTS.map((p, i) => <button key={p.name} type="button" className="w-tick" onClick={() => goTo(i)} aria-label={`${p.short}, ${p.metric.value} ${p.metric.label}`}>
                <i>{pad2(i + 1)}</i><b>{p.short.slice(0, 3).toUpperCase()}</b><span>{p.short}</span><em>{p.metric.value}</em>
              </button>)}
          </nav>
          <i className="w-rail-t" aria-hidden="true"><b className="w-rail-f" /></i>
        </div>
        {open !== null && <button type="button" className="w-shade" aria-label="Back to the line" onClick={() => setOpen(null)} />}
        {open !== null && <Panel i={open} onClose={() => setOpen(null)} onStep={step} />}
      </div>
    </div>;
};
/* ---------- the breaker after Work: seven of seven, every repo public, each one a link ---------- */
const repoOf = (u: string) => u.replace("https://github.com/", "");
const Odo = ({
  n,
  late
}: {
  n: number;
  late?: boolean;
}) => <span className={`w-odo${late ? " late" : ""}`} aria-hidden="true">
    <span>{Array.from({
      length: n + 1
    }, (_, k) => <span key={k}>{k}</span>)}</span>
  </span>;
const RepoRow = ({
  list,
  dir
}: {
  list: Project[];
  dir: "l" | "r";
}) => <div className={`w-rw-row ${dir}`}>
    <div className="w-rw-track">
      {[0, 1].map(c => <span key={c} className="w-rw-set" aria-hidden={c === 1 ? true : undefined}>
          {list.map(p => <a key={p.github} href={p.github} target="_blank" rel="noopener noreferrer" tabIndex={c === 1 ? -1 : undefined}>{repoOf(p.github)}<Arrow /></a>)}
        </span>)}
    </div>
  </div>;
const RepoWall = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [lit, setLit] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setLit(true);
        io.disconnect();
      }
    }, {
      threshold: 0.35
    });
    io.observe(el);
    /* scrolling pushes the rows faster for a moment, then they ease back */
    let last = window.scrollY,
      boost = 0,
      raf = 0;
    const rows = () => el.getAnimations({
      subtree: true
    }).filter(a => (a as CSSAnimation).animationName === "w-rw-run");
    const tick = () => {
      boost *= 0.92;
      rows().forEach(a => {
        a.playbackRate = 1 + boost;
      });
      raf = boost > 0.02 ? requestAnimationFrame(tick) : 0;
    };
    const onScroll = () => {
      boost = Math.min(5, boost + Math.abs(window.scrollY - last) / 50);
      last = window.scrollY;
      if (!raf) raf = requestAnimationFrame(tick);
    };
    window.addEventListener("scroll", onScroll, {
      passive: true
    });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
  return <div ref={ref} className={`w-rw${lit ? " lit" : ""}`}>
      <RepoRow list={PROJECTS} dir="l" />
      <div className="w-rw-core">
        <b className="w-rw-num" role="img" aria-label={`${PROJECTS.length} of ${PROJECTS.length}`}><Odo n={PROJECTS.length} /><i>/</i><Odo n={PROJECTS.length} late /></b>
        <p>Every repository is public.</p>
        <a href="https://github.com/DiazSk" target="_blank" rel="noopener noreferrer">All of them on GitHub <Arrow /></a>
      </div>
      <RepoRow list={[...PROJECTS].reverse()} dir="r" />
    </div>;
};
export const Work = ({
  layout = "line",
  siuPhoto
}: {
  layout?: "line" | "wrap";
  siuPhoto?: string;
}) => {
  return <section id="work" className="w1" aria-labelledby="w-work-h">
      <h2 id="w-work-h" className="w-sr">Work. Follow the data: seven systems, every repo public.</h2>
      <Journey layout={layout} siuPhoto={siuPhoto} />
      <RepoWall />
    </section>;
};