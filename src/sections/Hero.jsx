import { useRef } from "react";
import { resumeData } from "../constants/resumeData";
import { useMotion, countUp, marquee } from "../lib/motion";

const EMAIL = resumeData.personal.email;
const LIVE = "https://diazsk.github.io/healthcare-lakehouse-azure/";

/*
 * Each measurement carries the thing it was measured against, because a
 * number on its own is a claim and a number against a baseline is evidence —
 * which is what position 03 on the About page commits to. Every figure here
 * is already in resumeData's decision logs; nothing is derived for effect.
 */
const METRICS = [
  {
    value: "21,091",
    unit: "msg/s sustained",
    source: "Chatflow · zero loss across 1M messages",
    gain: "42× the design it replaced",
    scale: [
      { label: "Write-through, capped by MySQL's 2–5ms insert latency", read: "~500/s", pct: 2.4, dim: true },
      { label: "Write-behind, worker threads with adaptive JDBC batching", read: "21,091/s", pct: 100 },
    ],
  },
  {
    value: "<100ms",
    unit: "end-to-end latency",
    source: "Crypto Analyzer · exactly-once",
    gain: "Kafka ingestion to rendered browser UI",
    path: ["Kafka", "Flink · OHLC windows", "Redis · sub-1ms", "FastAPI · WebSocket", "Browser"],
  },
  {
    value: "9.66M",
    unit: "rows, queryable live",
    source: "Medicare Gap Analyzer · DuckDB-WASM, no backend",
    gain: "No server to expire",
    scale: [
      { label: "Downloaded up front — covers every panel", read: "3.7 MB", pct: 7.1 },
      { label: "Detail tier, read by HTTP range requests, never downloaded", read: "52 MB", pct: 100, dim: true },
    ],
  },
];

/* The strip is the real stack, doubled so the wrap is seamless. */
const STACK = [
  "Apache Kafka", "Apache Flink", "Apache Airflow", "dbt", "PySpark",
  "Delta Lake", "Snowflake", "Terraform", "DuckDB", "Redis", "TimescaleDB",
  "Azure Databricks", "AWS Glue", "PostgreSQL", "Docker",
];

/*
 * The first viewport is one gesture: the whole screen is the field and the
 * name is set to the exact width of it. That is the composition every
 * award-winning hero I looked at shares — white-desert.com crops ANTARCTICA
 * against the viewport, warmnfuzzy.tv floods the screen with one colour,
 * aspensearch.com divides it into full-bleed panels. None of them centres a
 * padded column, which is what this hero used to be and why it never held
 * anyone's eye. Everything that is not the name sits on an edge.
 */
const Hero = () => {
  const root = useRef(null);

  // Reveals are CSS. GSAP owns the marquee and the counters only.
  // The counters wait for scroll: the metric row sits past the field.
  useMotion(() => {
    countUp(root, ".metric-value");
    marquee(root, ".marquee-track", { speed: 55 });
  }, root);

  return (
    <div ref={root}>
      {/* ── The field ──────────────────────────────────────────── */}
      <section
        id="home"
        className="field-surface hero-field relative flex min-h-screen flex-col justify-center overflow-hidden pt-16"
      >
        <div className="overflow-hidden">
          {/* hero-lift is the one moving foreground layer on the page. */}
          <h1 className="hero-lift">
            <span className="reveal-word hero-name" style={{ "--i": 0 }}>
              Zaid Shaikh
            </span>
          </h1>
        </div>

        {/* The corner readings: role, availability, the live artifact. */}
        <div className="c-space absolute inset-x-0 bottom-10">
          <div
            className="mb-4 h-px w-full"
            style={{ background: "rgba(10,9,8,0.25)" }}
            aria-hidden="true"
          />
          <div className="hero-meta flex flex-wrap justify-between gap-x-8 gap-y-2">
            <p>
              Data Engineer · Backend Systems
              <br />
              Seattle, WA · Available December 2026
              <br />
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            </p>
            <p className="sm:text-right">
              <a href={LIVE} target="_blank" rel="noopener noreferrer">
                Query 9.66M Medicare rows →
              </a>
              <br />
              MS Computer Science, Northeastern
            </p>
          </div>
        </div>
      </section>

      {/* ── The ground picks the page back up ──────────────────── */}
      <div className="c-space mx-auto w-full max-w-7xl pt-20 pb-4 md:pt-28">
        <p
          className="on-scroll max-w-2xl text-xl leading-relaxed md:text-2xl"
          style={{ color: "var(--color-ink-secondary)" }}
        >
          I&apos;m a data engineer building the infrastructure layer — streaming
          pipelines, distributed warehouses, and high-throughput backend systems
          that move millions of records reliably.
        </p>

        <div className="mt-20 border-t" style={{ borderColor: "var(--color-border-strong)" }}>
          <h2 className="text-label mt-8 mb-10">How these were measured</h2>

          {METRICS.map((m, i) => (
            <div
              key={m.value}
              className="grid grid-cols-1 gap-x-10 gap-y-5 border-b py-8 md:grid-cols-[2.5rem_minmax(14rem,1fr)_1.6fr]"
              style={{ borderColor: "var(--color-border)" }}
            >
              <span className="tabular text-sm" style={{ color: "var(--color-field)" }}>
                {String(i + 1).padStart(2, "0")}
              </span>

              <div>
                <p className="metric-value">{m.value}</p>
                <p className="text-label mt-2">{m.unit}</p>
                <p className="mt-1 text-xs" style={{ color: "var(--color-ink-muted)" }}>
                  {m.source}
                </p>
              </div>

              <div className="flex flex-col justify-center gap-4">
                {m.scale?.map((row) => (
                  <div key={row.read}>
                    <div className="mb-1.5 flex items-baseline justify-between gap-4">
                      <span className="text-xs" style={{ color: "var(--color-ink-secondary)" }}>
                        {row.label}
                      </span>
                      <span
                        className="tabular shrink-0 text-sm"
                        style={{ color: row.dim ? "var(--color-ink-muted)" : "var(--color-field)" }}
                      >
                        {row.read}
                      </span>
                    </div>
                    <span className={row.dim ? "gauge gauge-dim" : "gauge"}>
                      <i style={{ width: `${row.pct}%` }} />
                    </span>
                  </div>
                ))}

                {m.path && (
                  <ol className="flex flex-wrap items-center gap-x-3 gap-y-2">
                    {m.path.map((stage, j) => (
                      <li key={stage} className="flex items-center gap-3">
                        {j > 0 && (
                          <span
                            className="h-px w-5"
                            style={{ background: "var(--color-border-strong)" }}
                            aria-hidden="true"
                          />
                        )}
                        <span className="text-label" style={{ color: "var(--color-ink-secondary)" }}>
                          {stage}
                        </span>
                      </li>
                    ))}
                  </ol>
                )}

                <p className="text-xs" style={{ color: "var(--color-ink-muted)" }}>
                  {m.gain}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── The stack, running ──────────────────────────────────
          A thin field band after the dark block, so the two field regions are
          separated by ground rather than merging into one mass. */}
      <div className="field-band mt-16 py-5" aria-hidden="true">
        <div className="marquee-track flex w-max items-center gap-8">
          {[...STACK, ...STACK].map((item, i) => (
            <span key={`${item}-${i}`} className="flex items-center gap-8">
              <span className="marquee-item">{item}</span>
              <span className="marquee-dot marquee-item">/</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
