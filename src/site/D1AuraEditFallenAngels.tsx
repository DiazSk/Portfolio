import { useEffect, useRef, useState } from "react";
import { nearScreen } from "./ProofKit";
import "./D1AuraEditFallenAngels.css";
import { Nav } from "./Nav";
const wanderer = "/assets/site/54c201dbd2b4b97cff3596082d27269b1233ea0cdcbcb40709a26c5cec01435d.webp";
const greatWave = "/assets/site/0dbe48be276704022abe4fb3143dc8581cafca06b7087c602532afb6c9641ff6.webp";
const albatross = "/assets/site/cdbcf20dad39d8489238607cdc500b0ee8746b18827cad0c486baf497a5ba4d1.webp";
const turnerStorm = "/assets/site/cc8b082b2891ecfb5105c9dd61e82a2508755eea7888f892d581fa0177e7c657.webp";
const monkSea = "/assets/site/d52cd9d7c249123b44e5b42a9be57e888440d2051b6a5f7619474edc16ac1b1e.webp";
const paradiso31 = "/assets/site/a1de2f18559f540bc9a50ea86cf6dae6784e4f3c8a4718a75ac69dfd4e327c13.webp";
const paradiso28 = "/assets/site/3bd220d4302fbb7889e75bccd214991d0f32b6af94dfcc5a5d5cabc244769860.webp";
const nike = "/assets/site/429292ae44a6c152f2854c010034d032dcc1657e7df1c596e133f33097eeb057.webp";
const dataUrl = "/assets/site/c48814d9d67a095878241ce9d26e8733abf13e8df7188eaad6d69535ed7055b6.webp";
const photoUrl = "/assets/site/d186c6239103fffd146f041d0af58e5cb4fb484743b3663cf7404e53273de76f.webp";

/* the Creation of Adam hands are the freeze frame of the cold open, so they stay out of the shuffle */
const REST = [greatWave, albatross, turnerStorm, monkSea, paradiso31, paradiso28, nike];
const ART = [wanderer, ...REST];
const F = 1000 / 60; /* one frame */
const BEAT = [120, 110, 170, 110, 120, 210, 115, 110, 160]; /* two fast, one held… */
const FREEZE = 440;
const FLASH_GAP = 340; /* photosensitivity: never more than 3 flashes a second */
const rnd = (a: number, b: number) => a + Math.random() * (b - a);
const clamp01 = (u: number) => Math.min(1, Math.max(0, u));
const shuffle = <T,>(a: T[]) => {
  const b = [...a];
  for (let i = b.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [b[i], b[j]] = [b[j], b[i]];
  }
  return b;
};
type Shot = {
  src: string;
  fx: number;
  fy: number;
  flip: number;
  z: number;
};
const shot = (src: string, z0 = 1.05, z1 = 1.25): Shot => ({
  src,
  fx: rnd(22, 78),
  fy: rnd(18, 70),
  flip: Math.random() < 0.4 ? -1 : 1,
  z: rnd(z0, z1)
});
type Seg = {
  a: number;
  b: number;
  kind: "black" | "flash" | "shot";
  s?: Shot;
  rgb?: boolean;
  freeze?: boolean;
};
const buildCold = () => {
  const order = [...shuffle(REST), REST[Math.floor(Math.random() * REST.length)], wanderer];
  const segs: Seg[] = [];
  let t = 120,
    lastFlash = -1e9;
  segs.push({
    a: 0,
    b: t,
    kind: "black"
  });
  order.forEach((src, i) => {
    const freeze = i === order.length - 1;
    if (t - lastFlash >= FLASH_GAP) {
      segs.push({
        a: t,
        b: t + 2 * F,
        kind: "flash"
      });
      lastFlash = t;
      t += 2 * F;
    }
    const d = freeze ? FREEZE : BEAT[i % BEAT.length];
    segs.push({
      a: t,
      b: t + d,
      kind: "shot",
      s: shot(src),
      rgb: i === 2 || i === 6,
      freeze
    });
    t += d;
  });
  return {
    segs,
    total: t
  };
};
const still = <div className="ae-st">
    <i className="ae-b" />
    <span className="ae-ch r"><i /></span>
    <span className="ae-ch c"><i /></span>
    <span className="ae-sl"><i /></span>
    <span className="ae-sl"><i /></span>
    <span className="ae-sl"><i /></span>
  </div>;
export const D1AuraEditFallenAngels = () => {
  const hero = useRef<HTMLElement>(null);
  const [clock, setClock] = useState("--:--");
  useEffect(() => {
    const h = hero.current;
    if (!h) return;
    const q = <T extends HTMLElement,>(s: string) => h.querySelector<T>(s)!;
    const bg = q(".ae-bg"),
      bgSt = q(".ae-bg .ae-st"),
      cut = q(".ae-cut"),
      cutSt = q(".ae-cut .ae-st"),
      wf = q(".ae-wf"),
      fl = q(".ae-fl"),
      scan = q(".ae-scan"),
      gr = q(".ae-gr"),
      vf = q(".ae-vf");
    const slices = Array.from(bgSt.querySelectorAll<HTMLElement>(".ae-sl"));
    const paint = (st: HTMLElement, s: Shot) => st.querySelectorAll<HTMLElement>("i").forEach(i => {
      i.style.backgroundImage = `url("${s.src}")`;
      i.style.backgroundPosition = `${s.fx.toFixed(1)}% ${s.fy.toFixed(1)}%`;
    });
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let cur = shot(wanderer, 1.04, 1.04);
    paint(bgSt, cur);
    if (reduced) {
      bgSt.style.transform = "scale(1.04)";
      h.classList.add("open", "done");
      return;
    }

    /* ---- state ---- */
    const cold = buildCold();
    let phase: "wait" | "cold" | "landed" = "wait",
      clk = 0,
      coldAt = 0,
      doneAt = Infinity,
      lastNow = performance.now(),
      raf = 0,
      frame = 0,
      shown: Shot | null = null;
    /* landed */
    let hold = rnd(1800, 3200),
      prog = 0,
      age = 0,
      lastFlash = -1e9,
      flashOn = false,
      glFrames = 0,
      rgbFrames = 0,
      spd = 0,
      px = -1,
      py = -1,
      pt = 0,
      inside = false,
      frozen = false,
      drift = [rnd(-1, 1), rnd(-1, 1)];
    const land = (instant: boolean) => {
      phase = "landed";
      cut.classList.add("gone");
      h.classList.add("open");
      if (instant) h.classList.add("done");else doneAt = clk + 800;
      age = 0;
      prog = 0;
    };
    const skip = () => {
      if (phase !== "landed") land(true);
    };
    const cutBg = () => {
      let src = cur.src;
      while (src === cur.src) src = ART[Math.floor(Math.random() * ART.length)];
      cur = shot(src, 1, 1);
      paint(bgSt, cur);
      hold = rnd(1800, 3200);
      prog = 0;
      age = 0;
      drift = [rnd(-1, 1), rnd(-1, 1)];
      if (clk - lastFlash >= FLASH_GAP) {
        fl.style.opacity = ".35";
        flashOn = true;
        lastFlash = clk;
      }
      if (Math.random() < 0.25) glFrames = 3;
    };
    const near = nearScreen(h);
    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      const dt = Math.min(50, now - lastNow);
      lastNow = now;
      /* the art keeps cutting only while the hero is anywhere near the screen; far below, it holds its frame */
      if (!near.state.on && !h.querySelector(".na-ov")) return;
      if (document.hidden || h.querySelector(".na-ov")) {
        /* frozen for the whole menu, closing included, so the strips land on exactly the frame they left */
        if (frozen) {
          frozen = false;
          vf.classList.remove("on");
        }
        return;
      }
      clk += dt;
      frame++;
      if (phase === "cold") {
        const e = clk - coldAt;
        if (e >= cold.total) land(false);else {
          const seg = cold.segs.find(s => e < s.b)!;
          wf.style.opacity = seg.kind === "flash" ? "1" : "0";
          if (seg.kind === "shot" && seg.s) {
            if (shown !== seg.s) {
              shown = seg.s;
              paint(cutSt, seg.s);
            }
            const u = (e - seg.a) / (seg.b - seg.a);
            const m = seg.freeze ? 1 + 0.1 * Math.exp(-u * 5) : 1; /* the impact */
            cutSt.style.transform = `scale(${(seg.s.z * m).toFixed(4)}) scaleX(${seg.s.flip})`;
            cutSt.classList.toggle("rgb", !!seg.rgb && e - seg.a < 2 * F);
            cutSt.classList.add("on");
          } else cutSt.classList.remove("on");
        }
      }
      if (phase !== "landed") return;
      if (clk >= doneAt) {
        h.classList.add("done");
        doneAt = Infinity;
      }

      /* scrub: horizontal speed shortens the hold down to 250ms and smears the bg, then coasts back */
      spd *= Math.pow(0.9, dt / F);
      const k = clamp01(spd / 2.2);
      if (!frozen) {
        const eff = hold - (hold - 250) * k;
        prog += dt / eff;
        age += dt;
        if (prog >= 1) cutBg();
      }
      if (flashOn && clk - lastFlash >= F) {
        fl.style.opacity = "0";
        flashOn = false;
      }
      const pu = clamp01(age / 420),
        punch = 1 + 0.08 * Math.pow(1 - pu, 3),
        kb = clamp01(age / hold);
      bgSt.style.transform = `translate(${(drift[0] * kb).toFixed(3)}%,${(drift[1] * kb).toFixed(3)}%) scale(${((1.04 + 0.02 * kb) * punch).toFixed(4)}) scaleX(${cur.flip})`;
      bg.style.transform = "";
      bg.style.filter = "";

      /* freeze frame when the cursor sits on his face */
      const W = h.clientWidth,
        H = h.clientHeight;
      const onFace = inside && px > W * 0.35 && px < W * 0.65 && py < H * 0.65;
      if (onFace !== frozen) {
        frozen = onFace;
        vf.classList.toggle("on", frozen);
      }
      bgSt.classList.toggle("rgb", rgbFrames > 0);
      if (rgbFrames > 0) rgbFrames--;
      if (glFrames > 0) {
        slices.forEach(s => {
          const t = rnd(0, 86),
            hh = rnd(4, 14);
          s.style.clipPath = `inset(${t.toFixed(1)}% 0 ${(100 - t - hh).toFixed(1)}% 0)`;
          s.style.transform = `translateX(${rnd(-48, 48).toFixed(0)}px)`;
        });
        glFrames--;
        bgSt.classList.add("gl");
      } else bgSt.classList.remove("gl");

      /* film finish: grain shifts and the scanlines flicker every other frame */
      if (frame % 2 === 0) {
        gr.style.transform = `translate(${rnd(-50, 50).toFixed(0)}px,${rnd(-50, 50).toFixed(0)}px)`;
        scan.style.opacity = rnd(0.03, 0.06).toFixed(3);
      }
    };
    const onMove = (e: PointerEvent) => {
      const b = h.getBoundingClientRect();
      const x = e.clientX - b.left,
        y = e.clientY - b.top;
      if (px >= 0 && e.timeStamp > pt) spd += (Math.abs(x - px) / Math.max(8, e.timeStamp - pt) - spd) * 0.35;
      px = x;
      py = y;
      pt = e.timeStamp;
      inside = !(e.target as Element | null)?.closest?.("nav, [role=dialog]");
    };
    const onLeave = () => {
      inside = false;
    };
    h.addEventListener("pointerdown", skip);
    window.addEventListener("keydown", skip);
    h.addEventListener("pointermove", onMove);
    h.addEventListener("pointerleave", onLeave);

    /* preload everything, black until then, at most 1.2s */
    let dead = false;
    const loads = [...ART, photoUrl].map(src => new Promise<void>(res => {
      const im = new Image();
      im.onload = im.onerror = () => res();
      im.src = src;
    }));
    Promise.race([Promise.all(loads), new Promise(res => window.setTimeout(res, 1200))]).then(() => {
      if (dead) return;
      if (phase === "wait") {
        phase = "cold";
        coldAt = clk;
      }
      lastNow = performance.now();
      raf = requestAnimationFrame(tick);
    });
    return () => {
      dead = true;
      cancelAnimationFrame(raf);
      near.stop();
      h.removeEventListener("pointerdown", skip);
      window.removeEventListener("keydown", skip);
      h.removeEventListener("pointermove", onMove);
      h.removeEventListener("pointerleave", onLeave);
    };
  }, []);
  useEffect(() => {
    const f = new Intl.DateTimeFormat("en-US", {
      timeZone: "America/Los_Angeles",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false
    });
    const tick = () => setClock(f.format(new Date()));
    tick();
    const id = window.setInterval(tick, 15000);
    return () => window.clearInterval(id);
  }, []);
  return <div className="f-root">
      <header ref={hero} className="f-hero">
        <h1 className="f-name">Zaid Shaikh</h1>
        <div className="ae-bg" aria-hidden="true">{still}</div>
        <div className="ae-fx" aria-hidden="true">
          <i className="ae-fl" />
          <i className="ae-scan" />
          <i className="ae-gr" />
          <i className="ae-vig" />
        </div>
        <div className="f-fig">
          <img src={photoUrl} alt="Portrait of Zaid Shaikh in dark sunglasses and a black t-shirt" width={1500} height={1350} />
          <div className="f-data" aria-hidden="true"><img src={dataUrl} alt="" width={1500} height={1350} /></div>
          <div className="ae-vf" aria-hidden="true"><i className="tl" /><i className="tr" /><i className="bl" /><i className="br" /></div>
        </div>
        <div className="f-melt" />
        <p className="f-name">Data engineer who also builds AI products. Seattle, full-time from December 2026.</p>
        <div className="ae-cut" aria-hidden="true">
          {still}
          <i className="ae-wf" />
        </div>
        <button type="button" className="f-skip f-mono">Skip intro</button>
        <Nav clock={clock} heroRef={hero} />
      </header>
    </div>;
};