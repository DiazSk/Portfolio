import { useRef } from "react";
import MetricStat from "../components/MetricStat";
import { mySocials } from "../constants";
import { resumeData } from "../constants/resumeData";
import { useMotion, countUp, marquee } from "../lib/motion";

const EMAIL = resumeData.personal.email;
const LIVE = "https://diazsk.github.io/healthcare-lakehouse-azure/";

const METRICS = [
  {
    value: "21,091",
    label: "msg/s sustained",
    context: "Chatflow · Java + RabbitMQ + Redis",
  },
  {
    value: "<100ms",
    label: "end-to-end latency",
    context: "Crypto Analyzer · Kafka + Flink · exactly-once",
  },
  {
    value: "9.66M",
    label: "rows, queryable live",
    context: "Medicare Gap Analyzer · DuckDB-WASM, no backend",
  },
];

/* The strip is the real stack, doubled so the wrap is seamless. */
const STACK = [
  "Apache Kafka", "Apache Flink", "Apache Airflow", "dbt", "PySpark",
  "Delta Lake", "Snowflake", "Terraform", "DuckDB", "Redis", "TimescaleDB",
  "Azure Databricks", "AWS Glue", "PostgreSQL", "Docker",
];

const Hero = () => {
  const root = useRef(null);

  // Reveals are CSS. GSAP owns the marquee and the counters only.
  useMotion(() => {
    countUp(root, ".metric-value", { immediate: true });
    marquee(root, ".marquee-track", { speed: 55 });
  }, root);

  return (
    <section
      id="home"
      ref={root}
      className="flex min-h-screen flex-col justify-center pt-28"
    >
      <div className="c-space mx-auto w-full max-w-7xl">
        {/* Name at poster scale. The pinned world overrides the 6rem cap. */}
        {/* aria-label because the words are split into masked spans for the
            reveal, which leaves the accessible name as "ZaidShaikh". */}
        <h1
          className="text-display"
          style={{ fontSize: "clamp(3.25rem, 13vw, 11rem)" }}
          aria-label="Zaid Shaikh"
        >
          {["Zaid", "Shaikh"].map((word, i) => (
            <span
              key={word}
              className="mr-[0.22em] inline-block overflow-hidden pb-[0.04em] align-bottom"
            >
              <span className="reveal-word inline-block" style={{ "--i": i }}>
                {word}
              </span>
            </span>
          ))}
        </h1>

        <div className="hero-block mt-6 flex flex-wrap items-baseline gap-x-6 gap-y-2" style={{ "--i": 0 }}>
          <p
            className="text-mono text-sm uppercase"
            style={{ color: "var(--color-ink)", letterSpacing: "0.08em" }}
          >
            Data Engineer
          </p>
          <p
            className="text-mono text-sm uppercase"
            style={{ color: "var(--color-ink-muted)", letterSpacing: "0.08em" }}
          >
            Backend Systems Engineer
          </p>
        </div>

        <p
          className="hero-block mt-8 max-w-2xl text-lg leading-relaxed md:text-xl"
          style={{ "--i": 1, color: "var(--color-ink-secondary)" }}
        >
          I build the infrastructure layer: streaming pipelines, distributed
          warehouses, and high-throughput backend systems that process millions
          of records reliably.
        </p>

        {/* The one artifact a reader can open and use right now. */}
        <p className="hero-block mt-6" style={{ "--i": 2 }}>
          <a
            href={LIVE}
            target="_blank"
            rel="noopener noreferrer"
            className="text-mono group inline-flex min-h-7 items-center gap-2 py-1 text-sm uppercase"
            style={{ color: "var(--color-field)", letterSpacing: "0.06em" }}
          >
            <span
              className="inline-block h-2 w-2 shrink-0 rounded-full"
              style={{ background: "var(--color-field)" }}
              aria-hidden="true"
            />
            <span className="underline-offset-4 group-hover:underline">
              Query 9.66M Medicare rows in your browser
            </span>
          </a>
        </p>

        <div className="hero-block mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm" style={{ "--i": 3 }}>
          <span style={{ color: "var(--color-ink)" }}>
            Available full-time from December 2026
          </span>
          <span style={{ color: "var(--color-ink-muted)" }}>Seattle, WA</span>
          <span style={{ color: "var(--color-ink-muted)" }}>
            MS Computer Science, Northeastern
          </span>
        </div>

        {/* ── Metrics ─────────────────────────────────────────── */}
        <div className="metric-grid hero-block mt-16 max-w-4xl">
          {METRICS.map((m) => (
            <MetricStat key={m.value} {...m} />
          ))}
        </div>

        {/* ── Actions ─────────────────────────────────────────── */}
        <div className="hero-block mt-12 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center" style={{ "--i": 4 }}>
          <a
            href={`mailto:${EMAIL}`}
            className="btn-primary justify-center sm:justify-start"
          >
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <rect x="1" y="3" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.6" />
              <path d="M1.8 4.2l5.4 4a1.4 1.4 0 001.6 0l5.4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            {EMAIL}
          </a>
          {mySocials
            .filter((s) => s.name !== "Email")
            .map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost justify-center sm:justify-start"
              >
                {social.name}
              </a>
            ))}
        </div>
      </div>

      {/* ── The stack, running ──────────────────────────────── */}
      <div
        className="mt-20 overflow-hidden border-y py-4"
        style={{ borderColor: "var(--color-border)" }}
        aria-hidden="true"
      >
        <div className="marquee-track flex w-max gap-10">
          {[...STACK, ...STACK].map((item, i) => (
            <span
              key={`${item}-${i}`}
              className="text-mono whitespace-nowrap text-sm uppercase"
              style={{
                color: i % 4 === 0 ? "var(--color-field)" : "var(--color-ink-muted)",
                letterSpacing: "0.08em",
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
