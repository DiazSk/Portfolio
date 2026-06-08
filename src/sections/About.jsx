import { motion } from "framer-motion";
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
    label: "NLP Research Assistant",
    detail: "COLM 2026 co-author · Semantic Drift in Multi-hop LLMs",
  },
  {
    label: "Oracle Cloud Infrastructure",
    detail: "Data Science Professional, Certified",
  },
];

const About = () => {
  const { personal } = resumeData;

  return (
    <section id="about" className="c-space section-spacing border-t" style={{ borderColor: "var(--color-border)" }}>
      <div className="mx-auto w-full max-w-7xl">
        <motion.div
          className="grid grid-cols-1 gap-16 md:grid-cols-[3fr_2fr]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
        >
          {/* ── Left column ─────────────────────────────────── */}
          <div>
            <p className="text-eyebrow mb-4">About</p>
            <h2 className="text-heading mb-6">
              I build the layer between raw data and the millisecond that matters.
            </h2>

            <p className="text-base leading-relaxed" style={{ color: "var(--color-ink-secondary)" }}>
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
                  <span className="text-sm font-medium" style={{ color: "var(--color-ink)" }}>
                    {label}
                  </span>
                  <span className="text-sm" style={{ color: "var(--color-ink-muted)" }}>
                    {detail}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right column ────────────────────────────────── */}
          <div>
            {/* Availability card */}
            <div
              className="rounded-xl border p-6"
              style={{
                background: "var(--color-surface-raised)",
                borderColor: "var(--color-border)",
              }}
            >
              <p
                className="mb-1 text-xs font-semibold uppercase tracking-widest"
                style={{ color: "var(--color-ink-muted)" }}
              >
                Availability
              </p>
              <p
                className="mb-4 text-lg font-semibold"
                style={{ color: "var(--color-ink)" }}
              >
                Open to opportunities.
              </p>

              <div
                className="mb-6 flex flex-col gap-1 text-sm"
                style={{ color: "var(--color-ink-secondary)" }}
              >
                <span>Summer &amp; Fall 2026: Internship / Co-op</span>
                <span>Full-Time: Post-graduation, Dec 2026</span>
                <span>Seattle, WA · Remote</span>
              </div>

              <CopyEmailButton />
            </div>

            {/* Role targets */}
            <div className="mt-6 flex flex-col gap-2">
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
                      className="h-1.5 w-1.5 rounded-full shrink-0"
                      style={{ background: "var(--color-ink)" }}
                      aria-hidden="true"
                    />
                    {role}
                  </div>
                )
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
