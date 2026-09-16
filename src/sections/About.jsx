import { resumeData } from "../constants/resumeData";
import CopyEmailButton from "../components/CopyEmailButton";

const CREDENTIALS = [
  {
    label: "MS Computer Science",
    detail: "Northeastern University · 4.0 GPA · Dec 2026",
  },
  {
    label: "Graduate Teaching Assistant",
    detail: "Graduate Machine Learning · Northeastern University",
  },
  {
    label: "Research Co-author",
    detail: "The Laundering Effect · COLM 2026 (under review)",
  },
  {
    label: "Oracle Cloud Infrastructure",
    detail: "Data Science Professional, Certified",
  },
];

const About = () => {
  const { personal } = resumeData;

  return (
    <section
      id="about"
      className="c-space section-spacing border-t"
      style={{ borderColor: "var(--color-border)" }}
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-[3fr_2fr]">
          {/* ── Left column ─────────────────────────────────── */}
          <div>
            <h2 className="text-heading mb-6">
              I build the layer between raw data and the millisecond that
              matters.
            </h2>

            <p
              className="max-w-2xl text-base leading-relaxed"
              style={{ color: "var(--color-ink-secondary)" }}
            >
              {personal.summary}
            </p>

            {/* Credentials */}
            <div className="mt-10 flex flex-col">
              {CREDENTIALS.map(({ label, detail }, i) => (
                <div
                  key={label}
                  className={`flex flex-col gap-0.5 py-4 ${i !== 0 ? "border-t" : ""}`}
                  style={{ borderColor: "var(--color-border)" }}
                >
                  <span
                    className="text-sm font-medium"
                    style={{ color: "var(--color-ink)" }}
                  >
                    {label}
                  </span>
                  <span
                    className="text-sm"
                    style={{ color: "var(--color-ink-muted)" }}
                  >
                    {detail}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right column ────────────────────────────────── */}
          <div>
            <div
              className="rounded-xl border p-6"
              style={{
                background: "var(--color-surface-raised)",
                borderColor: "var(--color-border)",
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
                className="mb-6 flex flex-col gap-1.5 text-sm"
                style={{ color: "var(--color-ink-secondary)" }}
              >
                <span>Starting December 2026, on graduation</span>
                <span>Seattle, WA · open to remote</span>
              </div>

              <CopyEmailButton />
            </div>

            {/* Role targets */}
            <div className="mt-4 flex flex-col gap-2">
              {["Data Engineer", "Analytics Engineer", "Backend SWE / SDE"].map(
                (role) => (
                  <div
                    key={role}
                    className="flex items-center gap-3 rounded-lg border px-4 py-3 text-sm"
                    style={{
                      borderColor: "var(--color-border)",
                      color: "var(--color-ink-secondary)",
                    }}
                  >
                    <span
                      className="h-1 w-1 shrink-0 rounded-full"
                      style={{ background: "var(--color-ink-muted)" }}
                      aria-hidden="true"
                    />
                    {role}
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
