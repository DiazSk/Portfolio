import { useRef, type CSSProperties, type ReactNode } from "react";
import { useScrub } from "./ProofKit";
import { MOCK, PH } from "./OffPhotos";
import { FOOTBALL, GEAR, TRAVEL } from "./OffPassions";
import { OffGames } from "./OffGames";
import { OffPlayer } from "./OffPlayer";
import "./OffSwiss.css";

/* OC6 · SWISS: a twelve-column grid that runs sideways as the page scrolls down. Every panel keeps the grid;
   inside it the giant word, the index and the photos each travel at their own rate */
type K = keyof typeof PH;
const Img = ({
  k,
  cls = ""
}: {
  k: K;
  cls?: string;
}) => <figure className={`sw-ph ${cls}`}><img src={PH[k](900)} alt="" loading="lazy" />{MOCK(k) && <i>Mockup</i>}</figure>;
/* the path, from resumeData (education, experience, availability) */
const PATH: [string, string, string][] = [["2020 – 2024", "BE Computer Engineering (AI/ML)", "St. Francis Institute of Technology · Mumbai"], ["2025 – 2026", "MS Computer Science · 4.0", "Northeastern University, Khoury College · Seattle"], ["Spring 2025", "Technical Lead, CS5200", "Database Management Systems · Northeastern"], ["Fall 2025 –", "Co-author, The Laundering Effect", "Faculty-advised research · Northeastern"], ["Now", "TA, graduate Machine Learning", "Northeastern · Seattle"], ["Dec 2026", "Available full-time", "Data, AI & product engineering · remote or Seattle"]];
const PANELS: {
  id: string;
  word: string;
  label: string;
  body: ReactNode;
}[] = [{
  id: "00",
  word: "Zaid",
  label: "From Mumbai · based in Seattle",
  body: <>
      <div className="sw-story">
        <p className="sw-storyh">From Mumbai. <em>Based in Seattle.</em></p>
        <p className="sw-storyp">I came to this work from Mumbai, where I took a BE in Computer Engineering. Now I'm finishing an MS in Computer Science at Northeastern in Seattle, and teaching the graduate Machine Learning course as a TA. Off the clock, it's six things.</p>
      </div>
      <ol className="sw-path">
        {PATH.map(([when, what, where]) => <li key={what}><span>{when}</span><b>{what}</b><small>{where}</small></li>)}
      </ol>
      <ol className="sw-next">{["Football", "Travel", "Games", "Gym", "Music", "Tech"].map((x, i) => <li key={x}><b>{String(i + 1).padStart(2, "0")}</b>{x}</li>)}</ol>
    </>
}, {
  id: "01",
  word: "Football",
  label: "Real Madrid",
  body: <>
      <Img k="siu" cls="c-tall" />
      <dl className="sw-facts">{FOOTBALL.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
      <Img k="stadium" cls="c-small" />
    </>
}, {
  id: "02",
  word: "Travel",
  label: `${TRAVEL.length}+ places`,
  body: <>
      <Img k="seattle" cls="c-wide" />
      <Img k="mumbai" cls="c-sq a" />
      <Img k="dubai" cls="c-sq b" />
      <ul className="sw-places">{TRAVEL.map(t => <li key={t.place}><b>{t.place}</b><span>{t.note ?? t.region}</span></li>)}<li><b>And more</b><span>India</span></li></ul>
    </>
}, {
  id: "03",
  word: "Games",
  label: "Played · six posters",
  body: <OffGames />
}, {
  id: "04",
  word: "Gym",
  label: "Off the clock",
  body: <Img k="gym" cls="c-wide" />
}, {
  id: "05",
  word: "Music",
  label: "Now playing · live from Last.fm",
  body: <OffPlayer />
}, {
  id: "06",
  word: "Tech",
  label: "The setup",
  body: <>
      <Img k="mac" cls="c-wide" />
      <ul className="sw-gear">{GEAR.map(g => <li key={g}>{g}</li>)}</ul>
    </>
}];
export const OffSwiss = () => {
  const root = useRef<HTMLElement>(null);
  useScrub(root);
  return <section ref={root} id="off-the-clock" className="sw" aria-label="Off the clock" style={{
    "--n": PANELS.length
  } as CSSProperties}>
      <div className="sw-stage">
        <div className="sw-track">
          {PANELS.map((p, i) => <article key={p.id} className={`sw-panel p${p.id}`} style={{
          "--i": i
        } as CSSProperties}>
              <header className="sw-head"><span>{p.id}</span><span>{p.label}</span><span><b className="sw-sec">04</b> Off the clock</span></header>
              <span className="sw-num" aria-hidden="true">{p.id}</span>
              <h3 className="sw-word">{p.word}</h3>
              <div className="sw-body">{p.body}</div>
            </article>)}
        </div>
        <div className="sw-rule" aria-hidden="true"><i /></div>
      </div>
    </section>;
};