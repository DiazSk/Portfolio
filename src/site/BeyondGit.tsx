import { useEffect, useRef, type CSSProperties } from "react";
import { BeyondHead, BeyondNote, ROWS, type Case } from "./Beyond";
import { nearScreen } from "./ProofKit";
import "./Beyond.css";
import "./BeyondGit.css";

/* VERSION B2 · THE GIT GRAPH. `git log --graph` for a career: data engineering is `main`, its five builds the
   commits. `beyond` branches off it; each commit there is a role, written as a conventional commit and proven by
   the build in its body. The role still being learned is a staged commit: hollow, on a dashed lane. `main` keeps
   running beside the branch to the bottom, because it is still the main line. No hashes or dates are invented:
   the order follows the Work section, not a claimed timeline. Lanes draw and commits land as the graph scrolls. */
const MAIN = [
  "Medicare Reimbursement Gap Analyzer",
  "NYC Taxi Data Lakehouse",
  "E-commerce Funnel Lakehouse",
  "E-Commerce Data Warehouse (Olist)",
  "Real-Time Cryptocurrency Market Analyzer",
];
const KIND: Record<string, [string, string]> = {
  "AI / LLM engineering": ["feat", "ai"],
  "Product engineering": ["feat", "product"],
  "Design engineering": ["wip", "design"],
  "UI/UX & product design": ["feat", "ui-ux"],
};

type Commit =
  | { lane: "main"; subject: string; pill?: string }
  | { lane: "fork" }
  | { lane: "beyond"; type: string; scope: string; subject: string; role: string; status: string; line: string; href?: string; pill?: string; staged?: boolean; case?: Case };

const COMMITS: Commit[] = [
  ...MAIN.map((s, i): Commit => ({ lane: "main", subject: s, pill: i === MAIN.length - 1 ? "main" : undefined })),
  { lane: "fork" },
  ...ROWS.map((r, k): Commit => ({
    lane: "beyond", type: KIND[r.role][0], scope: KIND[r.role][1], subject: r.via, role: r.role, status: r.status, line: r.line, href: r.href, case: r.case,
    pill: k === ROWS.length - 1 ? "HEAD → beyond" : undefined, staged: r.status === "Learning",
  })),
];

/* a build whose repo is private gets its case on the page instead: native <details>, so it opens by keyboard and
   needs no state; the screenshot loads only when it is opened */
const CaseCard = ({ k, name }: { k: Case; name: string }) => (
  <details className="gg-case">
    <summary><span className="gg-case-o">Open the case</span><span className="gg-case-x">Close the case</span><i aria-hidden>+</i></summary>
    <div className="gg-case-in">
      <div className="gg-case-shot">
        <figure><img src={k.photo} alt={k.alt} loading="lazy" decoding="async" width={1280} height={800} /><figcaption>{name} · demo data</figcaption></figure>
        <ul className="gg-case-facts">{k.facts.map(f => <li key={f}>{f}</li>)}</ul>
      </div>
      <div className="gg-case-txt">
        <dl className="gg-case-dec">
          <div><dt>Chose</dt><dd>{k.chose}</dd></div>
          <div><dt>Over</dt><dd>{k.over}</dd></div>
          <div><dt>Because</dt><dd>{k.because}</dd></div>
          <div><dt>Did</dt><dd><ul className="gg-case-did">{k.did.map(d => <li key={d}>{d}</li>)}</ul></dd></div>
        </dl>
        <p className="gg-case-tech">{k.tech}</p>
      </div>
    </div>
  </details>
);

export const BeyondGit = () => {
  const graph = useRef<HTMLOListElement>(null);
  useEffect(() => {
    const el = graph.current; if (!el) return;
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const near = nearScreen(el);
    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!near.state.on) return;
      const r = el.getBoundingClientRect(), vh = innerHeight;
      if (r.bottom < -vh * .2 || r.top > vh * 1.2) return;
      /* the graph is read as it passes the lower third of the screen: everything above that line is drawn. Progress
         is counted in rows, from each row's real position, so an opened case card (a much taller row) is drawn as
         soon as its top crosses the line instead of when a uniform-height guess says it should be */
      let v = n;
      if (!still) {
        const y = vh * .78, rows = el.children;
        for (let j = 0; j < rows.length; j++) {
          const q = rows[j].getBoundingClientRect();
          if (q.top > y) { v = j; break; }
          if (q.bottom > y) { v = j + Math.min(1, (y - q.top) / Math.min(q.height, 140)); break; }
        }
      }
      el.style.setProperty("--p", (v / n).toFixed(4));
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); near.stop(); };
  }, []);
  const n = COMMITS.length;
  return (
    <section id="beyond" className="bd gg" aria-labelledby="bd-h">
      <BeyondHead tag="git log --graph" />
      <p className="gg-cmd" aria-hidden><b>$</b> git log --graph --oneline main beyond</p>
      <div className="gg-heads" aria-hidden><span>Graph</span><span>Commit</span><span>Proves</span></div>
      <ol ref={graph} className="gg-log" style={{ "--n": n } as CSSProperties} aria-label="Data engineering on main; the second track on the beyond branch">
        {COMMITS.map((c, i) => {
          const st = { "--i": i } as CSSProperties;
          if (c.lane === "fork") return (
            <li key="fork" className="gg-c gg-fork" style={st}>
              <span className="gg-g" aria-hidden><i className="l0" /><svg viewBox="0 0 64 100" preserveAspectRatio="none"><path d="M16 0 V18 C16 56 48 44 48 82 V100" pathLength={1} /></svg></span>
              <code className="gg-note">git checkout -b beyond</code>
            </li>
          );
          if (c.lane === "main") return (
            <li key={c.subject} className={`gg-c gg-main${i === 0 ? " first" : ""}`} style={st}>
              <span className="gg-g" aria-hidden><i className="l0" /><b className="d0" /></span>
              <p className="gg-msg"><span className="gg-type">feat<em>(data)</em>:</span> <b>{c.subject}</b>{c.pill && <span className="gg-pill main">{c.pill}</span>}</p>
              <span className="gg-who">Data engineering</span>
            </li>
          );
          return (
            <li key={c.role} className={`gg-c gg-br s-${c.status.toLowerCase()}${c.staged ? " staged" : ""}`} style={st}>
              <span className="gg-g" aria-hidden><i className="l0" /><i className="l1" /><b className="d1" /></span>
              <div className="gg-body">
                <p className="gg-msg">
                  <span className="gg-type">{c.type}<em>({c.scope})</em>:</span>{" "}
                  {c.href ? <a href={c.href} target="_blank" rel="noreferrer">{c.subject}<i aria-hidden> ↗</i></a> : <b>{c.subject}</b>}
                  {c.pill && <span className="gg-pill head">{c.pill}</span>}
                  {c.staged && <span className="gg-pill staged">staged</span>}
                </p>
                <p className="gg-line">{c.line}</p>
              </div>
              <p className="gg-proof"><span className="gg-role">{c.role}</span><span className="gg-st">{c.status}</span></p>
              {/* its own row under the commit, so the proof stays beside (or, on phones, right under) its commit */}
              {c.case && <CaseCard k={c.case} name={c.subject} />}
            </li>
          );
        })}
      </ol>
      <BeyondNote />
    </section>
  );
};
