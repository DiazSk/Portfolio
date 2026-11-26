import { type CSSProperties, type ReactNode } from "react";
import "./OffGames.css";

/* six original Swiss pictograms, one geometric mark per game. These are NOT the games' logos (trademarks);
   each draws a motif the game is known for: wanted stars, a revolver cylinder, a blade across the sun,
   a parachute drop, a crosshair, a grass block */
const star = (cx: number, cy: number, r: number) => {
  let d = "";
  for (let i = 0; i < 10; i++) {
    const a = -Math.PI / 2 + i * Math.PI / 5,
      rr = i % 2 ? r * .42 : r;
    d += (i ? "L" : "M") + (cx + rr * Math.cos(a)).toFixed(1) + " " + (cy + rr * Math.sin(a)).toFixed(1);
  }
  return d + "Z";
};
const ICONS: Record<string, ReactNode> = {
  gta: <>{[22, 50, 78].map((x, i) => <path key={x} d={star(x, 50, 13)} className={i === 2 ? "o" : "f"} />)}</>,
  rdr: <>
    <circle cx="50" cy="62" r="30" className="sun" /><rect x="0" y="62" width="100" height="38" className="bg" />
    <circle cx="50" cy="50" r="24" className="f" />{[0, 1, 2, 3, 4, 5].map(i => {
      const a = i * Math.PI / 3;
      return <circle key={i} cx={50 + 13 * Math.cos(a)} cy={50 + 13 * Math.sin(a)} r="5" className="bg" />;
    })}
    <circle cx="50" cy="50" r="3" className="bg" /><rect x="10" y="80" width="80" height="3" className="f" />
  </>,
  got: <>
    <circle cx="56" cy="44" r="28" className="sun" />
    <g transform="rotate(-38 50 50)"><rect x="8" y="47.5" width="72" height="5" className="f" /><rect x="78" y="44" width="4" height="12" className="f" /><rect x="82" y="48" width="12" height="4" className="f" /></g>
  </>,
  pubg: <>
    <path d="M14 46a36 30 0 0 1 72 0c-6-4-12-4-18 0c-6-4-12-4-18 0c-6-4-12-4-18 0c-6-4-12-4-18 0Z" className="f" />
    {[14, 32, 50, 68, 86].map(x => <line key={x} x1={x} y1="46" x2="50" y2="80" className="s" />)}
    <rect x="42" y="78" width="16" height="14" className="f" />
  </>,
  cod: <>
    <circle cx="50" cy="50" r="30" className="ring" /><circle cx="50" cy="50" r="14" className="ring thin" />
    {[[50, 6, 50, 26], [50, 74, 50, 94], [6, 50, 26, 50], [74, 50, 94, 50]].map(([a, b, c, d], i) => <line key={i} x1={a} y1={b} x2={c} y2={d} className="s thick" />)}
    <circle cx="50" cy="50" r="3.5" className="dot" />
  </>,
  mc: <>{/* an isometric grass block: green top, dirt sides, a stepped grass edge */}
    <polygon points="14,33 50,52 50,90 14,71" className="dirt" />
    <polygon points="50,52 86,33 86,71 50,90" className="dirt2" />
    <polygon points="50,14 86,33 50,52 14,33" className="h" />
    <polygon points="14,33 50,52 50,61 43,57 43,63 35,59 35,53 27,49 27,55 20,51 20,45 14,42" className="h" />
    <polygon points="86,33 50,52 50,61 57,57 57,63 65,59 65,53 73,49 73,55 80,51 80,45 86,42" className="h2" />
  </>
};
/* the key art is Zaid's pick (the studios' and artists' work); the frame around it is the Swiss poster */
const POSTERS: {
  id: string;
  title: string;
  sub: string;
  tone: string;
  img: string;
  at: string;
}[] = [{
  id: "gta",
  title: "GTA",
  sub: "Wanted level",
  tone: "ink",
  img: "/assets/site/d1ceac6a78df07cc5fe42d77e881bfdff1dce58cda857ba54fb4a5eb90ff1a20.jpg",
  at: "50% 30%"
}, {
  id: "rdr",
  title: "RDR 2",
  sub: "Frontier",
  tone: "mustard",
  img: "/assets/site/95d3957055bbf205a5a1556ab3ee82268e5a89160f71077894474167305e3aac.jpg",
  at: "50% 42%"
}, {
  id: "got",
  title: "Ghost of Tsushima",
  sub: "Blade at sunset",
  tone: "paper",
  img: "/assets/site/46da5023cce12a55dc86ddb523326a7f85f361a796586929f0be7afbf5535319.jpg",
  at: "48% 40%"
}, {
  id: "pubg",
  title: "PUBG",
  sub: "Drop zone",
  tone: "blue",
  img: "/assets/site/183921c04d22ad814233403ea4bb68ae6f3ad57dea1e7c2a02a6059ea20dc3fd.jpg",
  at: "38% 28%"
}, {
  id: "cod",
  title: "Call of Duty",
  sub: "Sights up",
  tone: "hot",
  img: "/assets/site/0a2c2192259592c117f1013a06495feed9c7ac19282f63d44fbba954c90e3c36.jpg",
  at: "50% 32%"
}, {
  id: "mc",
  title: "Minecraft",
  sub: "Block by block",
  tone: "green",
  img: "/assets/site/373c0d7dd79d0efd55b3915b3a3602fb662c46083b9de8031622c3795088c890.jpg",
  at: "34% 48%"
}];
export const OffGames = () => <ul className="gp" aria-label="Games I've played">
    {POSTERS.map((p, i) => <li key={p.id} className={`gp-t t-${p.tone}`} style={{
    "--k": i
  } as CSSProperties}>
        <span className="gp-head">
          <span className="gp-n">03.{i + 1}</span>
          <svg className="gp-ic" viewBox="0 0 100 100" aria-hidden="true">{ICONS[p.id]}</svg>
        </span>
        <span className="gp-img"><img src={p.img} alt={`${p.title} key art`} loading="lazy" style={{
        objectPosition: p.at
      }} /></span>
        <span className="gp-foot">
          <span className="gp-sub">{p.sub}</span>
          <b className="gp-title">{p.title}</b>
        </span>
      </li>)}
  </ul>;