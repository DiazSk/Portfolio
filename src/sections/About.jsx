import { useState } from "react";
import { resumeData } from "../constants/resumeData";
import CopyEmailButton from "../components/CopyEmailButton";

/* WebP at 900x1350, q82 — 43 KB against the 2.1 MB PNG it replaced, and
   41.1 dB PSNR once cover-cropped to the 686x786 the panel actually renders
   at DPR2, so the saving is invisible. WebP needs no fallback here: this
   build already ships overflow: clip, container queries, :has() and
   animation-timeline, every one of which landed later than WebP did.

   Replace the file and the panel picks it up; remove it and the grid drops
   the column rather than showing a hole. */
const PORTRAIT = "/assets/portrait.webp";

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
    label: "BE Computer Engineering",
    detail: "St. Francis Institute of Technology · Mumbai, India",
    meta: "2020 — 2024",
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
      <div className={`panels about-grid${hasPortrait ? "" : " no-portrait"}`}>
        {/* ── The section names itself in the margin ──────────── */}
        <div className="panel a-label justify-end">
          <p className="micro sticky-label">About</p>
        </div>

        {/* ── The statement ───────────────────────────────────── */}
        <div className="panel panel-reveal a-statement justify-end">
          <h2 className="on-scroll text-heading max-w-[20ch] text-balance">
            I build the layer between raw data and the millisecond that
            matters.
          </h2>
        </div>

        {/* ── Who, in two paragraphs ──────────────────────────── */}
        <div className="panel panel-reveal r1 a-bio panel-raised gap-5">
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

        {/* ── Portrait ────────────────────────────────────────
            The panel only exists if the file does. An empty panel here read
            as a black rectangle rather than as air, so the grid drops the
            column and the bio widens into it instead. */}
        {hasPortrait && (
          <div className="panel a-portrait !p-0">
            <img
              src={PORTRAIT}
              alt="Zaid Shaikh"
              loading="lazy"
              onError={() => setHasPortrait(false)}
              className="block h-full w-full object-cover"
            />
          </div>
        )}

        {/* ── Three readings ──────────────────────────────────────
            The first runs as a field panel: the section's second vermilion
            region, at the opposite end of its row from Availability so the two
            bookend the band with two dark panels between them. The middle slot
            was tried first and reads worse — vermilion, dark, vermilion
            alternates, and the one panel between them looks like a hole rather
            than air. A metric panel and not a credential because vermilion
            already carries every numeral here, so a whole field panel inverts
            that pair rather than inventing a rule; the eight record panels are
            a uniform family and colouring one of them would have nothing
            behind it.

            These sit above the ask in source order even though the desktop
            grid places both by name and does not care: the single mobile
            column follows the DOM, and with the ask first the two field panels
            butted into one unbroken 510px block of vermilion. */}
        {STATS.map((s, i) => (
          <div
            key={s.value}
            className={`panel panel-reveal r${i} a-stat${i + 1}${i === 0 ? " panel-field" : ""}`}
          >
            {/* The documented Metric step and Label step, not a private pair:
                vermilion carries every metric numeral in this system. The
                caption is pinned to the panel's foot, which is the device. */}
            <p className="metric-value">{s.value}</p>
            <p className="text-label mt-auto pt-10">{s.note}</p>
          </div>
        ))}

        {/* ── The ask, as a field region ──────────────────────── */}
        <div className="panel panel-reveal r2 a-avail panel-field gap-6">
          <p className="micro">Availability</p>

          {/* text-balance because at this column width "Open to full-time
              roles" broke as "Open to full- / time roles". */}
          <p
            className="text-display text-2xl text-balance md:text-3xl"
            style={{ color: "var(--color-field-ink)" }}
          >
            Open to full-time roles
          </p>

          <div className="text-sm leading-relaxed" style={{ color: "var(--color-field-ink-secondary)" }}>
            <p>Starting December 2026, on graduation</p>
            <p>Seattle, WA · open to remote</p>
            <p className="mt-4">{ROLES.join(" · ")}</p>
          </div>

          <div className="mt-auto pt-8">
            <CopyEmailButton />
          </div>
        </div>

        {/* ── The record ──────────────────────────────────────── */}
        <div className="panel a-credsl panel-raised">
          <p className="micro sticky-label">Credentials</p>
        </div>

        {CREDENTIALS.map(({ label, detail, meta }, i) => (
          <div
            key={label}
            className={`panel panel-reveal panel-min a-cred${i + 1} justify-between gap-6 ${
              i === 0 || i === 3 ? "panel-raised" : ""
            } r${i % 3}`}
          >
            <div>
              <p
                className="text-lg font-medium"
                style={{ color: "var(--color-ink)", letterSpacing: "-0.01em" }}
              >
                {label}
              </p>
              <p
                className="mt-2 text-sm leading-relaxed"
                style={{ color: "var(--color-ink-muted)" }}
              >
                {detail}
              </p>
            </div>
            {meta && (
              <p className="text-label" style={{ color: "var(--color-ink-secondary)" }}>
                {meta}
              </p>
            )}
          </div>
        ))}

        {/* ── How I work ──────────────────────────────────────
            Folded into the grid rather than sitting in its own clamped band
            below it, so the section is one continuous set of panels. Each
            stance traces to real work rather than standing as a slogan. */}
        <div className="panel a-workl">
          <p className="micro sticky-label">How I work</p>
        </div>

        {positions.map(({ claim, body }, i) => (
          <div
            key={claim}
            className={`panel panel-reveal panel-min a-pos${i + 1} gap-5 ${
              i === 1 || i === 2 ? "panel-raised" : ""
            } r${(i + 1) % 3}`}
          >
            <span className="tabular text-sm" style={{ color: "var(--color-field)" }}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <p className="text-display text-xl md:text-2xl">{claim}</p>
            <p
              className="mt-auto max-w-[46ch] text-sm leading-relaxed"
              style={{ color: "var(--color-ink-muted)" }}
            >
              {body}
            </p>
          </div>
        ))}

      </div>
    </section>
  );
};

export default About;
