import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import "./ContactBits.css";

/* Facts only: the published address and profiles. The résumé PDF is pending from Zaid; drop it at this path. */
export const EMAIL = "shaikh.zaid@northeastern.edu";
export const LINKEDIN = "https://www.linkedin.com/in/zaidshaikhengineer";
export const GITHUB = "https://github.com/DiazSk";
export const RESUME = "/Zaid-Shaikh-Resume.pdf";
export const PHOTO = "/assets/site/d186c6239103fffd146f041d0af58e5cb4fb484743b3663cf7404e53273de76f.webp";
export const reduced = () => typeof matchMedia !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;

/* clipboard API first; iframes and older browsers fall back to a hidden textarea */
export async function copyEmail(): Promise<boolean> {
  try { await navigator.clipboard.writeText(EMAIL); return true; } catch {
    try {
      const ta = document.createElement("textarea");
      ta.value = EMAIL; ta.setAttribute("readonly", ""); ta.style.position = "fixed"; ta.style.opacity = "0";
      document.body.appendChild(ta); ta.select();
      const ok = document.execCommand("copy"); ta.remove(); return ok;
    } catch { return false; }
  }
}

export type CopyState = "idle" | "done" | "error";

/* hold-to-confirm: the ring fills over `ms`, drains if released early; Enter/Space copies at once */
export function useHold(ms = 700) {
  const [p, setP] = useState(0);
  const [state, setState] = useState<CopyState>("idle");
  const raf = useRef(0), pr = useRef(0), busy = useRef(false), reset = useRef<number | undefined>(undefined), down = useRef(0);
  const set = (v: number) => { pr.current = v; setP(v); };
  const fire = async () => {
    busy.current = true; set(1);
    setState((await copyEmail()) ? "done" : "error");
    clearTimeout(reset.current);
    reset.current = window.setTimeout(() => { setState("idle"); set(0); busy.current = false; }, 2000);
  };
  const start = () => {
    if (busy.current) return;
    cancelAnimationFrame(raf.current);
    const t0 = performance.now() - pr.current * ms;
    const f = (n: number) => { const v = Math.min(1, (n - t0) / ms); set(v); if (v < 1) raf.current = requestAnimationFrame(f); else fire(); };
    raf.current = requestAnimationFrame(f);
  };
  const stop = () => {
    if (busy.current) return;
    cancelAnimationFrame(raf.current);
    const from = pr.current, s = performance.now();
    const f = (n: number) => { const v = Math.max(0, from - (n - s) / 380); set(v); if (v > 0) raf.current = requestAnimationFrame(f); };
    raf.current = requestAnimationFrame(f);
  };
  useEffect(() => () => { cancelAnimationFrame(raf.current); clearTimeout(reset.current); }, []);
  const handlers = {
    onPointerDown: (e: PointerEvent) => { if (e.button !== 0) return; e.preventDefault(); down.current = performance.now(); start(); },
    /* a quick press is a click: copy at once (the fill races up); a longer press keeps filling as a hold */
    onPointerUp: () => { if (!busy.current && down.current && performance.now() - down.current < 240) { cancelAnimationFrame(raf.current); fire(); } else stop(); down.current = 0; }, onPointerLeave: stop, onPointerCancel: stop,
    onKeyDown: (e: KeyboardEvent) => { if ((e.key === "Enter" || e.key === " ") && !e.repeat) { e.preventDefault(); if (!busy.current) fire(); } },
    onContextMenu: (e: { preventDefault: () => void }) => e.preventDefault(),
  };
  return { p, state, handlers, fire };
}

export const label = (s: CopyState, idle = "Hold to copy") => s === "done" ? "Copied" : s === "error" ? "Copy failed" : idle;

export const Ring = ({ p, className = "" }: { p: number; className?: string }) => (
  <svg className={`kx-ring ${className}`} viewBox="0 0 100 100" aria-hidden>
    <circle cx="50" cy="50" r="48" className="kx-ring-t" />
    <circle cx="50" cy="50" r="48" className="kx-ring-f" pathLength={1} strokeDasharray="1" strokeDashoffset={1 - p} transform="rotate(-90 50 50)" />
  </svg>
);

/* screen readers hear the result; the address stays visible in the error state so it can be selected by hand */
export const Announce = ({ state }: { state: CopyState }) => (
  <p className="kx-sr" role="status" aria-live="polite">{state === "done" ? `Email address ${EMAIL} copied.` : state === "error" ? `Copy failed. The address is ${EMAIL}.` : ""}</p>
);

export const Footer = () => (
  <footer className="kx-foot">
    <span>© 2026 Zaid Shaikh</span>
    <span>Seattle, WA</span>
    <a href="#top" onClick={e => { e.preventDefault(); scrollTo({ top: 0, behavior: reduced() ? "auto" : "smooth" }); }}>Back to top ↑</a>
  </footer>
);
