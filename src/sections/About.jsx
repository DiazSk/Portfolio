import { useState } from "react";
import { resumeData } from "../constants/resumeData";
import CopyEmailButton from "../components/CopyEmailButton";

/* Drop a file at public/assets/portrait.jpg and it appears. Until then the
   frame removes itself rather than showing a broken image or a fake avatar. */
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

const About = () => {
  const { personal, positions } = resumeData;
  const [hasPortrait, setHasPortrait] = useState(true);

  return (
    <section
      id="about"
      className="c-space section-spacing border-t"
      style={{ borderColor: "var(--color-border)" }}
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[3fr_2fr] md:gap-16">
          {/* ── Left ────────────────────────────────────────── */}
          <div>
            <h2 className="on-scroll text-heading mb-8 max-w-[18ch] text-balance">
              I build the layer between raw data and the millisecond that
              matters.
            </h2>

            {/* Two paragraphs, each with one job. Neither restates the
                hero's metrics — the first viewport already owns those. */}
            <p
              className="max-w-2xl text-base leading-relaxed"
              style={{ color: "var(--color-ink-secondary)" }}
            >
              {personal.bio}
            </p>
            <p
              className="mt-5 max-w-2xl text-base leading-relaxed"
              style={{ color: "var(--color-ink-secondary)" }}
            >
              {personal.focus}
            </p>

            {/* Credentials as a ruled record, not a list of equal rows */}
            <div className="mt-14 border-t" style={{ borderColor: "var(--color-border)" }}>
              {CREDENTIALS.map(({ label, detail, meta }) => (
                <div
                  key={label}
                  className="grid grid-cols-1 gap-1 border-b py-5 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-6"
                  style={{ borderColor: "var(--color-border)" }}
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
          </div>

          {/* ── Right ───────────────────────────────────────── */}
          <div className="flex flex-col gap-6">
            {hasPortrait && (
              <div
                className="overflow-hidden border"
                style={{
                  borderColor: "var(--color-border-strong)",
                  background: "var(--color-surface-raised)",
                }}
              >
                <img
                  src={PORTRAIT}
                  alt="Zaid Shaikh"
                  loading="lazy"
                  onError={() => setHasPortrait(false)}
                  className="block aspect-[4/5] w-full object-cover"
                />
              </div>
            )}

            <div
              className="border p-6"
              style={{
                background: "var(--color-surface-raised)",
                borderColor: "var(--color-border-strong)",
              }}
            >
              <div className="mb-4 flex items-center gap-2">
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: "var(--color-accent)" }}
                  aria-hidden="true"
                />
                <p
                  className="text-lg font-semibold"
                  style={{ color: "var(--color-ink)" }}
                >
                  Open to full-time roles
                </p>
              </div>

              <div
                className="mb-5 flex flex-col gap-1.5 text-sm"
                style={{ color: "var(--color-ink-secondary)" }}
              >
                <span>Starting December 2026, on graduation</span>
                <span>Seattle, WA · open to remote</span>
              </div>

              <p
                className="mb-6 text-sm leading-relaxed"
                style={{ color: "var(--color-ink-muted)" }}
              >
                {ROLES.join(" · ")}
              </p>

              <CopyEmailButton />
            </div>
          </div>
        </div>

        {/* ── How I work: the section's point of view, full width ──
            Each stance traces to real work rather than standing as a slogan. */}
        <div
          className="mt-20 border-t pt-10"
          style={{ borderColor: "var(--color-border-strong)" }}
        >
          <h3 className="text-label mb-8">How I work</h3>

          {positions.map(({ claim, body }, i) => (
            <div
              key={claim}
              className="grid grid-cols-1 gap-2 border-b py-6 md:grid-cols-[2.5rem_1.1fr_1fr] md:items-baseline md:gap-10"
              style={{ borderColor: "var(--color-border)" }}
            >
              <span
                className="tabular text-sm"
                style={{ color: "var(--color-field)" }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-display text-xl md:text-2xl">{claim}</p>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--color-ink-muted)" }}
              >
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
