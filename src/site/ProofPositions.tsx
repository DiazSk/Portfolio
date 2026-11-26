import { useRef, type CSSProperties } from "react";
import { useScrub } from "./ProofKit";
import "./ProofPositions.css";

/* the four positions from the resume data, broken so each line reads on its own; *word* is the serif italic */
/* each claim carries one giant number as its proof; none repeats a number already on a Work card.
   from → to is the count it runs as the chapter arrives ("trades missed" counts down to zero) */
type Metric = {
  from: number;
  to: number;
  suf: string;
  label: string;
};
const CLAIMS: {
  lines: string[];
  receipt: string;
  tag: string;
  fs: number;
  m: Metric;
}[] = [{
  lines: ["Every architectural", "layer is a", "*deliberate* decision."],
  tag: "Design",
  fs: 8.2,
  m: {
    from: 0,
    to: 120,
    suf: "M+",
    label: "Records processed across 6 platforms, batch and streaming"
  },
  receipt: "Optimized for throughput, correctness, and the engineers who maintain it afterwards."
}, {
  lines: ["Decisions", "*over*", "tools."],
  tag: "Judgement",
  fs: 12.5,
  m: {
    from: 99,
    to: 0,
    suf: "",
    label: "Trades missed. 0 duplicates across 8 pairs, gap-tracked"
  },
  receipt: "Any two candidates list Airflow and Kafka. The difference is why one was chosen over the other, and what it cost."
}, {
  lines: ["A measurement is only", "*evidence* if you can", "say how it was taken."],
  tag: "Measurement",
  fs: 7.2,
  m: {
    from: 0,
    to: 41,
    suf: "%",
    label: "How high my own panel read, caught by the parity suite"
  },
  receipt: "A parity suite on the Medicare project caught one of my own panels reading 41% high. It looked entirely plausible."
}, {
  lines: ["When a result", "does not hold up,", "*say so.*"],
  tag: "Honesty",
  fs: 8.8,
  m: {
    from: 0,
    to: 2,
    suf: "/5",
    label: "Hypotheses refuted, and published as refuted"
  },
  receipt: "Two of five hypotheses in that analysis were refuted, and the published dashboard reports them as refuted."
}];
const pad2 = (n: number) => String(n).padStart(2, "0");
const Line = ({
  s
}: {
  s: string;
}) => <>{s.split(/(\*[^*]+\*)/).map((part, k) => part.startsWith("*") ? <em key={k}>{part.slice(1, -1)}</em> : part)}</>;
export const ProofPositions = () => {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  /* split the scroll into four chapters: which one is up, and how far into it we are */
  useScrub(root, p => {
    const s = stage.current;
    if (!s) return;
    const x = p * CLAIMS.length;
    const i = Math.min(CLAIMS.length - 1, Math.floor(x));
    s.dataset.i = String(i);
    const q = Math.min(1, x - i);
    s.style.setProperty("--q", q.toFixed(4));
    /* the active chapter's number counts over the first 40% of it, easing out */
    const el = s.querySelector<HTMLElement>(`.ps-ch[data-k="${i}"] .ps-n`);
    if (el) {
      const {
        from,
        to
      } = CLAIMS[i].m;
      const e = 1 - Math.pow(1 - Math.min(1, q / .4), 3);
      el.textContent = String(Math.round(from + (to - from) * e));
    }
  });
  return <section ref={root} id="proof" className="ps" aria-label="Positions">
      <div ref={stage} className="ps-stage" data-i="0">
        <header className="ps-top">
          <span><b>01</b> Measured</span>
          <span className="ps-ticks" aria-hidden="true">{CLAIMS.map((_, i) => <i key={i} style={{
            "--k": i
          } as CSSProperties} />)}</span>
        </header>
        {CLAIMS.map((c, i) => <article key={i} className="ps-ch" data-k={i}>
            <h3 className="ps-claim" style={{
          "--fs": c.fs
        } as CSSProperties}>
              {c.lines.map((l, j) => <span key={j} className="ps-line" style={{
            "--l": j
          } as CSSProperties}>
                  <span className="ps-txt"><Line s={l} /></span><i className="ps-wipe" aria-hidden="true" />
                </span>)}
            </h3>
            <div className="ps-foot">
              <p className="ps-receipt"><small>{pad2(i + 1)} · Receipt · {c.tag}</small>{c.receipt}</p>
              <p className="ps-metric">
                <span className="u-sr">{`${c.m.to}${c.m.suf}: ${c.m.label}`}</span>
                <b aria-hidden="true"><span className="ps-n">{c.m.to}</span>{c.m.suf.startsWith("/") ? <><i className="ps-sl">/</i>{c.m.suf.slice(1)}</> : c.m.suf}</b>
                <small aria-hidden="true">{c.m.label}</small>
              </p>
            </div>
          </article>)}
      </div>
    </section>;
};