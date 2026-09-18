import { useState } from "react";
import { resumeData } from "../constants/resumeData";
import CopyEmailButton from "../components/CopyEmailButton";

/* Drop a file at public/assets/portrait.jpg and it appears. Until then the
   panel stays as flat tone, which in a grid like this reads as air rather
   than as a hole. */
const PORTRAIT = "/assets/portrait.jpg";

const CREDENTIALS = [
  {
    label: "MS Computer Science",
    detail: "Northeastern University · Khoury College",
    meta: "2025 — 2026 · 4.0 GPA",
  },
  {
    label: "Graduate Teaching Assistant",
    detail: "Graduate Machine Learning · Northeastern University",
    meta: null,
  },
  {
    label: "Research Co-author",
    detail:
      "The Laundering Effect · cumulative semantic erosion under iterative LLM paraphrasing",
    meta: "36,800+ records",
  },
  {
    label: "Oracle Cloud Infrastructure",
    detail: "Data Science Professional, Certified",
    meta: null,
  },
];

const ROLES = ["Data Engineer", "Analytics Engineer", "Backend SWE / SDE"];

/* Three readings, each already stated elsewhere on the site. The numeral is
   huge and its caption is tiny and pinned to the panel's foot — the scale
   gap inside one panel is the device. */
const STATS = [
  { value: "4.0", note: "GPA · MS Computer Science, Northeastern" },
  { value: "36,800+", note: "Records in the Laundering Effect study" },
  { value: "2 of 5", note: "Hypotheses reported refuted, not buried" },
];

/*
 * Built on aspensearch.com's structure: a hard modular grid of full-bleed
 * panels that butt edge to edge, each carrying exactly one thing, with tiny
 * mono labels naming them and at least one panel left as flat tone for air.
 * The structure is theirs; the palette and the type are this system's — they
 * set a light neutral grotesk on white and mint, this sets heavy condensed
 * Bricolage on near-black and vermilion.
 */
const About = () => {
  const { personal, positions } = resumeData;
  const [hasPortrait, setHasPortrait] = useState(true);

  return (
    <section id="about">
      <div className="panels about-grid">
        {/* ── The section names itself in the margin ──────────── */}
        <div className="panel a-label justify-end">
          <p className="micro sticky-label">About</p>
        </div>

        {/* ── The statement ───────────────────────────────────── */}
        <div className="panel a-statement justify-end">
          <h2 className="on-scroll text-heading max-w-[20ch] text-balance">
            I build the layer between raw data and the millisecond that
            matters.
          </h2>
        </div>

        {/* ── Who, in two paragraphs ──────────────────────────── */}
        <div className="panel a-bio panel-raised gap-5">
          <p
            className="max-w-2xl text-base leading-relaxed md:text-lg"
            style={{ color: "var(--color-ink-secondary)" }}
          >
            {personal.bio}
          </p>
          <p
            className="max-w-2xl text-base leading-relaxed md:text-lg"
            style={{ color: "var(--color-ink-secondary)" }}
          >
            {personal.focus}
          </p>
        </div>

        {/* ── Portrait, or flat tone until the file lands ─────── */}
        {/* Surface tone, not raised: against the raised bio panel next to it
            the same tone merged into one block through the hairline. */}
        <div className="panel a-portrait !p-0">
          {hasPortrait && (
            <img
              src={PORTRAIT}
              alt="Zaid Shaikh"
              loading="lazy"
              onError={() => setHasPortrait(false)}
              className="block h-full w-full object-cover"
            />
          )}
        </div>

        {/* ── The ask, as a field region ──────────────────────── */}
        <div className="panel a-avail panel-field gap-6">
          <p className="micro">Availability</p>

          {/* text-balance because at this column width "Open to full-time
              roles" broke as "Open to full- / time roles". */}
          <p
            className="text-display text-2xl text-balance md:text-3xl"
            style={{ color: "var(--color-field-ink)" }}
          >
            Open to full-time roles
          </p>

          <div className="text-sm leading-relaxed" style={{ color: "#2E1409" }}>
            <p>Starting December 2026, on graduation</p>
            <p>Seattle, WA · open to remote</p>
            <p className="mt-4">{ROLES.join(" · ")}</p>
          </div>

          <div className="mt-auto pt-8">
            <CopyEmailButton />
          </div>
        </div>

        {/* ── Three readings ──────────────────────────────────── */}
        {STATS.map((s, i) => (
          <div key={s.value} className={`panel a-stat${i + 1}`}>
            {/* The documented Metric step and Label step, not a private pair:
                vermilion carries every metric numeral in this system. The
                caption is pinned to the panel's foot, which is the device. */}
            <p className="metric-value">{s.value}</p>
            <p className="text-label mt-auto pt-10">{s.note}</p>
          </div>
        ))}

        {/* ── The record ──────────────────────────────────────── */}
        <div className="panel a-credsl panel-raised">
          <p className="micro sticky-label">Credentials</p>
        </div>

        <div className="panel a-creds panel-raised">
          {CREDENTIALS.map(({ label, detail, meta }, i) => (
            <div
              key={label}
              className="grid grid-cols-1 gap-1 py-5 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-6"
              style={{
                borderTop: i === 0 ? "none" : "1px solid var(--color-border)",
              }}
            >
              <div>
                <p
                  className="text-lg font-medium"
                  style={{ color: "var(--color-ink)", letterSpacing: "-0.01em" }}
                >
                  {label}
                </p>
                <p
                  className="mt-1 text-sm leading-relaxed"
                  style={{ color: "var(--color-ink-muted)" }}
                >
                  {detail}
                </p>
              </div>
              {meta && (
                <p
                  className="tabular whitespace-nowrap text-sm"
                  style={{ color: "var(--color-ink-secondary)" }}
                >
                  {meta}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* ── How I work ──────────────────────────────────────
            Folded into the grid rather than sitting in its own clamped band
            below it, so the section is one continuous set of panels. Each
            stance traces to real work rather than standing as a slogan. */}
        <div className="panel a-workl">
          <p className="micro sticky-label">How I work</p>
        </div>

        <div className="panel a-work">
          {positions.map(({ claim, body }, i) => (
            <div
              key={claim}
              className="grid grid-cols-1 gap-2 py-6 md:grid-cols-[2.5rem_1.1fr_1fr] md:items-baseline md:gap-10"
              style={{
                borderTop: i === 0 ? "none" : "1px solid var(--color-border)",
              }}
            >
              <span className="tabular text-sm" style={{ color: "var(--color-field)" }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-display text-xl md:text-2xl">{claim}</p>
              <p className="text-sm leading-relaxed" style={{ color: "var(--color-ink-muted)" }}>
                {body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
