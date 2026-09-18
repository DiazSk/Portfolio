import { useRef } from "react";
import MetricStat from "../components/MetricStat";
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

/* The frame. Role, location and availability sit on the viewport's bottom edge
   instead of stacked under the name — the device in 10 of the 15 award-winning
   first viewports measured for this build. It reads as tabular metadata, which
   is what earns it the mono face, and it sits below the name rather than above
   it, so the No Kicker Rule still holds. */
const FRAME = [
  "Data Engineer · Backend Systems Engineer",
  "Seattle, WA · Available December 2026",
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
  // The counters wait for scroll now: the metric row sits past the fold.
  useMotion(() => {
    countUp(root, ".metric-value");
    marquee(root, ".marquee-track", { speed: 55 });
  }, root);

  return (
    <section id="home" ref={root}>
      {/* The first viewport is its own box. With the metric row inside one
          min-h-screen column it climbed back above the fold as soon as the
          content summed past 100vh; this makes the band the fold. */}
      <div className="flex min-h-screen flex-col pt-24">
        {/* ── The statement: four blocks, nothing else ───────────
            The measured median across 15 admired first viewports is four. Two
            role lines and a three-line claim are now one sentence, and the
            metadata moved down to the frame. */}
        <div className="c-space mx-auto my-auto w-full max-w-7xl">
          {/* Name at poster scale. The pinned world overrides the 6rem cap. */}
          {/* aria-label because the words are split into masked spans for the
              reveal, which leaves the accessible name as "ZaidShaikh". */}
          {/* hero-lift is the one moving foreground layer on the page. */}
          <h1
            className="hero-lift text-display"
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

          {/* Role and claim fused into one sentence rather than stacked as
              three separate elements — the rauno.me device. */}
          <p
            className="hero-block mt-8 max-w-2xl text-xl leading-relaxed md:text-2xl"
            style={{ "--i": 0, color: "var(--color-ink-secondary)" }}
          >
            I&apos;m a data engineer building the infrastructure layer —
            streaming pipelines, distributed warehouses, and high-throughput
            backend systems that move millions of records reliably.
          </p>

          {/* The one artifact a reader can open and use right now, and the one
              number left above the fold — inside a sentence, not broken out as
              a statistic. */}
          <p className="hero-block mt-8" style={{ "--i": 1 }}>
            <a
              href={LIVE}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex min-h-7 items-center gap-2 py-1 text-base font-extrabold uppercase"
              style={{
                color: "var(--color-field)",
                fontFamily: "var(--font-display)",
                fontVariationSettings: '"wdth" 82',
                letterSpacing: "0.005em",
              }}
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

          {/* One action. GitHub and LinkedIn live in the footer. */}
          <div className="hero-block mt-8" style={{ "--i": 2 }}>
            <a href={`mailto:${EMAIL}`} className="btn-primary">
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <rect x="1" y="3" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.6" />
                <path d="M1.8 4.2l5.4 4a1.4 1.4 0 001.6 0l5.4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
              {EMAIL}
            </a>
          </div>
        </div>

        {/* ── The frame ─────────────────────────────────────────── */}
        <div className="c-space mx-auto w-full max-w-7xl">
          <div
            className="hero-block text-label flex flex-wrap justify-between gap-x-8 gap-y-1 border-t pt-4"
            style={{ "--i": 3, borderColor: "var(--color-border)" }}
          >
            {FRAME.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </div>
        </div>

        {/* ── The stack, running ──────────────────────────────────
            A field band at display scale closes the first viewport, so the
            field is a region here and not a colour on some numerals. */}
        <div className="field-band mt-6 py-5" aria-hidden="true">
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

      {/* ── Metrics: the reward for the first scroll ─────────────
          Past the band, so they sit outside the first viewport but still at
          rest — not behind an interaction, and still the loudest row on the
          page once you reach them. */}
      <div className="c-space mx-auto w-full max-w-7xl">
        <div className="metric-grid on-scroll mt-20 max-w-4xl md:mt-28">
          {METRICS.map((m) => (
            <MetricStat key={m.value} {...m} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
