import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type MouseEvent, type RefObject } from "react";
import { glide } from "./Scroll";
import "./Nav.css";
const EMAIL = "shaikh.zaid@northeastern.edu";
/* em: rough width of the word in em at wdth 70, used only to size it to fit the gap */
/* each item jumps to its section on this page (id = to). Contact falls back to email until the Contact section exists */
const ITEMS: { n: string; w: string; em: number; s: string; to: string; fallback?: string }[] = [{
  n: "01",
  w: "Measured",
  em: 6.2,
  s: "120M+ records · 0 trades missed",
  to: "proof"
}, {
  n: "02",
  w: "Work",
  em: 4.1,
  s: "seven systems · every repo public",
  to: "work"
}, {
  n: "03",
  w: "Beyond",
  em: 5.0,
  s: "AI · product · design engineering",
  to: "beyond"
}, {
  n: "04",
  w: "Off the clock",
  em: 8.8,
  s: "Mumbai → Seattle · football · games · music",
  to: "off-the-clock"
}, {
  n: "05",
  w: "Contact",
  em: 5.4,
  s: EMAIL,
  to: "contact",
  fallback: "mailto:" + EMAIL
}];
const OUT = 1320; /* 1000ms slide + 3 × 60ms stagger + slack */
const FADE = 520; /* the cover dissolving once the strips are home */

export const Nav = ({
  clock,
  heroRef
}: {
  clock: string;
  heroRef: RefObject<HTMLElement | null>;
}) => {
  const [phase, setPhase] = useState<"closed" | "open" | "closing">("closed");
  const [on, setOn] = useState(false);
  const [ready, setReady] = useState(false);
  const [act, setAct] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const [fade, setFade] = useState(false);
  const btn = useRef<HTMLButtonElement>(null);
  const ov = useRef<HTMLDivElement>(null);
  const timers = useRef<number[]>([]);
  const later = (fn: () => void, ms: number) => timers.current.push(window.setTimeout(fn, ms));
  const clear = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };
  const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isOpen = phase === "open";
  const open = () => {
    clear();
    setOn(false);
    setReady(false);
    setAct(null);
    setPhase("open");
  };
  const close = () => {
    clear();
    setOn(false);
    setReady(false);
    setAct(null);
    setPhase("closing");
    /* the strips close back into the portrait, then the whole cover dissolves to whatever is beneath it */
    const t = reduced() ? 260 : OUT - 160;
    later(() => setFade(true), t);
    later(() => {
      setPhase("closed");
      setFade(false);
      btn.current?.focus();
    }, t + FADE);
  };

  /* sub-pixel row offset: offsetTop rounds, which leaves a half-pixel seam between strips */
  const rowTop = (s: HTMLElement) => s.closest<HTMLElement>(".na-row")!.getBoundingClientRect().top - ov.current!.getBoundingClientRect().top;
  /* each strip carries its own copy of the hero, offset so the four reassemble the picture */
  const fill = () => {
    const h = heroRef.current,
      o = ov.current;
    if (!h || !o) return;
    const W = h.clientWidth,
      H = h.clientHeight;
    /* the art and film layers come along so every strip has the landing page's exact red */
    const src = [".ae-bg", ".ae-fx", ".f-name", ".f-fig", ".f-melt"].map(q => h.querySelector<HTMLElement>(q));
    o.querySelectorAll<HTMLElement>(".na-snap").forEach(s => {
      s.replaceChildren();
      s.style.cssText = `width:${W}px;height:${H}px;top:${-rowTop(s).toFixed(2)}px`;
      src.forEach(n => {
        if (!n) return;
        const c = n.cloneNode(true) as HTMLElement;
        c.querySelectorAll(".g-fx, .ae-fl, .ae-vf").forEach(x => x.remove()); /* keep the data layer: the hovered row shows its strip in x-ray */
        c.querySelectorAll(".ae-st").forEach(x => x.classList.remove("rgb", "gl")); /* never freeze a glitch frame into the strips */
        s.appendChild(c);
      });
    });
  };
  /* the strips are windows onto one fixed picture: re-pin each copy to its row every frame, so rows can grow on hover without the picture drifting */
  useEffect(() => {
    if (phase === "closed") return;
    let r = 0;
    const pin = () => {
      r = requestAnimationFrame(pin);
      const snaps = ov.current?.querySelectorAll<HTMLElement>(".na-snap");
      if (!snaps) return;
      const tops = Array.from(snaps, s => -rowTop(s).toFixed(2) + "px");
      snaps.forEach((s, i) => {
        if (s.style.top !== tops[i]) s.style.top = tops[i];
      });
    };
    r = requestAnimationFrame(pin);
    return () => cancelAnimationFrame(r);
  }, [phase]);
  /* layout effect: the copies exist before the overlay's first paint, so opening never flashes an empty frame */
  useLayoutEffect(() => {
    if (phase !== "open") return;
    fill();
    let a = 0,
      b = 0,
      dead = false;
    /* split only once every copied image is decoded, so no strip opens without its picture */
    const imgs = Array.from(ov.current?.querySelectorAll("img") ?? []);
    Promise.race([Promise.all(imgs.map(im => im.decode().catch(() => {}))), new Promise(res => window.setTimeout(res, 250))]).then(() => {
      if (dead) return;
      a = requestAnimationFrame(() => {
        b = requestAnimationFrame(() => setOn(true));
      });
    });
    later(() => setReady(true), reduced() ? 0 : 1250);
    ov.current?.querySelector<HTMLElement>(".na-link")?.focus({
      preventScroll: true
    });
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", key);
    window.addEventListener("resize", fill);
    return () => {
      dead = true;
      cancelAnimationFrame(a);
      cancelAnimationFrame(b);
      window.removeEventListener("keydown", key);
      window.removeEventListener("resize", fill);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);
  useEffect(() => clear, []);
  /* close the slice, then glide to the section once the strips are back; with no such section yet, use the fallback */
  const go = (e: MouseEvent, to: string, fallback?: string) => {
    e.preventDefault();
    const el = document.getElementById(to);
    if (!el && fallback) {
      window.location.href = fallback;
      return;
    }
    close();
    /* never drag the page through thirty screens of scroll-driven sections: jump while the closing slice still
       covers everything, so the cover dissolves onto the section already in place */
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: y, behavior: "instant" as ScrollBehavior });
      history.replaceState(null, "", `#${to}`);
      /* the tall, scroll-driven sections open blank at their very top: as the cover dissolves, the page glides a short
         way in, so the section's first lines write themselves on arrival instead of waiting for the first wheel */
      if (!reduced() && el.offsetHeight > window.innerHeight * 1.5) later(() => glide.to(y + window.innerHeight * .38), OUT - 160);
    }
  };
  /* the bar follows the page: it slides away while you scroll down and comes back the moment you scroll up.
     Past the hero it sits on ink so it reads over the cream sections, and it tells the page (na-shown) so
     Work's telemetry strip can drop below it instead of hiding under it */
  const [hide, setHide] = useState(false);
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    let last = window.scrollY,
      raf = 0;
    const read = () => {
      raf = 0;
      const y = window.scrollY,
        h = heroRef.current?.offsetHeight ?? window.innerHeight;
      if (Math.abs(y - last) > 4) {
        setHide(y > last && y > 80);
        last = y;
      }
      setSolid(y > h - 80);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(read);
    };
    window.addEventListener("scroll", onScroll, {
      passive: true
    });
    read();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [heroRef]);
  const shown = phase !== "closed" || !hide;
  useEffect(() => {
    document.documentElement.classList.toggle("na-shown", shown && solid);
  }, [shown, solid]);
  useEffect(() => () => document.documentElement.classList.remove("na-shown"), []);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
    } catch {
      const t = document.createElement("textarea");
      t.value = EMAIL;
      document.body.appendChild(t);
      t.select();
      document.execCommand("copy");
      t.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };
  return <>
    {phase !== "closed" && <div ref={ov} role="dialog" aria-label="Menu" className={`na-ov${on ? " na-on" : ""}${ready ? " na-ready" : ""}${phase === "closing" ? " na-out" : ""}${fade ? " na-fade" : ""}`}>
      {ITEMS.map((it, i) => <div key={it.n} className="na-row" data-s={i % 2 ? "r" : "l"} data-hot={act === i ? "" : undefined} style={{
        "--i": i,
        "--em": it.em,
        flexGrow: act === i ? 1.5 : 1
      } as CSSProperties} onPointerEnter={e => {
        if (ready && e.pointerType === "mouse") setAct(i);
      }} onPointerLeave={e => {
        if (e.pointerType === "mouse") setAct(a => a === i ? null : a);
      }} onFocus={e => {
        if (ready && e.target.matches(":focus-visible")) setAct(i);
      }} onBlur={() => setAct(a => a === i ? null : a)}>
        <a className="na-link" href={`#${it.to}`} onClick={e => go(e, it.to, it.fallback)}>
          <span className="na-w">{it.n} {it.w}</span>
          <span className="na-s f-mono">{it.s}</span>
        </a>
        {it.to === "contact" && <button type="button" className="na-copy f-mono" onClick={copy}>
          <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><rect x="5" y="5" width="9" height="9" fill="none" stroke="currentColor" strokeWidth="1.5" /><path d="M11 5V2H2v9h3" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>
          <span aria-live="polite">{copied ? "Copied" : "Copy email"}</span>
        </button>}
        <div className="na-pic" aria-hidden="true"><div className="na-snap f-hero open done" /></div>
      </div>)}
    </div>}
    <nav className={`na-bar${shown ? "" : " na-hide"}${solid ? " na-solid" : ""}`} aria-label="Primary">
      <span className="na-mark" role="img" aria-label="ZS">ZS</span>
      <div className="na-right">
        <span className="na-clock f-mono"><span className="na-sea">Seattle </span>{clock} PT</span>
        <button ref={btn} type="button" className="na-btn" aria-label={isOpen ? "Close menu" : "Menu"} aria-expanded={isOpen} onClick={isOpen ? close : open}>
          <svg viewBox="0 0 18 14" width="18" height="14" aria-hidden="true">
            {isOpen ? <path d="M2 1l14 12M16 1L2 13" stroke="currentColor" strokeWidth="2.4" fill="none" /> : <path d="M0 3h18M0 11h18" stroke="currentColor" strokeWidth="2.4" fill="none" />}
          </svg>
          <span className="na-lbl">{isOpen ? "Close" : "Menu"}</span>
        </button>
      </div>
    </nav>
  </>;
};