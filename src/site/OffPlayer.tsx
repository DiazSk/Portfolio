import { useEffect, useState } from "react";
import { LASTFM } from "./OffPassions";
import "./OffPlayer.css";

/* a turntable (after Carter Ogunsola's radio) that shows what Zaid is listening to, live from Last.fm.
   Display only: the record spins and the needle sits on it while he is playing something right now. */
type Radio = {
  live: boolean;
  ago: string;
  title: string;
  artist: string;
  cover: string;
  top: string;
  plays: number;
};
const FM = (q: string) => fetch(`https://ws.audioscrobbler.com/2.0/?${q}&user=${encodeURIComponent(LASTFM.user)}&api_key=${LASTFM.key}&format=json`).then(r => r.json());
const ago = (uts: number) => {
  const m = Math.max(1, Math.round((Date.now() / 1000 - uts) / 60));
  return m < 60 ? `${m}M AGO` : m < 1440 ? `${Math.round(m / 60)}H AGO` : `${Math.round(m / 1440)}D AGO`;
};
type Track = {
  name: string;
  artist: {
    "#text": string;
  };
  image: {
    "#text": string;
  }[];
  date?: {
    uts: string;
  };
  "@attr"?: {
    nowplaying?: string;
  };
};
const useRadio = () => {
  const [r, setR] = useState<Radio | null>(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    let dead = false;
    const pull = async () => {
      try {
        const week = Math.floor(Date.now() / 1000) - 7 * 86400;
        const [rec, top, wk] = await Promise.all([FM("method=user.getrecenttracks&limit=1"), FM("method=user.gettopartists&period=7day&limit=1"), FM(`method=user.getrecenttracks&limit=1&from=${week}`)]);
        const tr = ([] as Track[]).concat(rec?.recenttracks?.track ?? [])[0];
        if (dead) return;
        if (!tr) {
          setFailed(true);
          return;
        }
        const art = tr.image?.[tr.image.length - 1]?.["#text"] ?? "";
        setR({
          live: tr["@attr"]?.nowplaying === "true",
          ago: tr.date ? ago(Number(tr.date.uts)) : "NOW",
          title: tr.name,
          artist: tr.artist?.["#text"] ?? "",
          cover: art.includes("2a96cbd8b46e442fc41c2b86b821562f") ? "" : art,
          /* Last.fm's blank star placeholder */
          top: top?.topartists?.artist?.[0]?.name ?? "",
          plays: Number(wk?.recenttracks?.["@attr"]?.total ?? 0)
        });
        setFailed(false);
      } catch {
        if (!dead) setFailed(true);
      }
    };
    pull();
    const id = setInterval(pull, 30000);
    return () => {
      dead = true;
      clearInterval(id);
    };
  }, []);
  return {
    r,
    failed
  };
};
export const OffPlayer = () => {
  const {
    r,
    failed
  } = useRadio();
  const on = !!r?.live;
  return <div className="mp">
      <div className={`tt${on ? " on" : ""}`} role="img" aria-label={r ? `${on ? "Listening now" : `Last played ${r.ago.toLowerCase()}`}: ${r.title} by ${r.artist}` : "Turntable"}>
        <div className="tt-deck">
          {[0, 1, 2, 3].map(i => <i key={i} className={`tt-screw sc${i}`} aria-hidden="true" />)}
          <div className="tt-platter">
            <span className="tt-disc" style={r?.cover ? {
            backgroundImage: `url("${r.cover}")`
          } : undefined}>
              <span className="tt-grooves" />
              <span className="tt-label"><i /></span>
            </span>
            <span className="tt-sheen" aria-hidden="true" />
          </div>
          <div className="tt-arm" aria-hidden="true"><i className="tt-base" /><i className="tt-rod" /><i className="tt-head" /></div>
          <span className="tt-speed" aria-hidden="true">33⅓</span>
        </div>
        <div className="tt-info">
          <div className="tt-now">
            <p className="tt-row">
              <span>RADIO::<b>{on ? "ON-AIR" : "OFF-AIR"}</b></span>
              <span className="tt-live"><i />{r ? on ? "NOW" : r.ago : failed ? "—" : "TUNING"}</span>
            </p>
            <b className="tt-title">{r?.title ?? "Nothing on yet"}</b>
            <span className="tt-sub">{r ? r.artist : "Waiting for the next record"}</span>
          </div>
          <div className="tt-side">
            <p><span>ROTATION::</span><b>{r?.top || "—"}</b></p>
            <p><span>7 DAYS::</span><b>{r ? `${r.plays.toLocaleString()} PLAYS` : "—"}</b></p>
          </div>
        </div>
      </div>
      <aside className="mp-side">
        <small>On the deck</small>
        <b>{on ? "Listening now." : "Off air."}</b>
        <span>Live from my Spotify, through Last.fm. When the record spins, I'm listening right now.</span>
      </aside>
    </div>;
};