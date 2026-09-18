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

        <div className="metric-grid mt-16 max-w-4xl">
          {METRICS.map((m) => (
            <MetricStat key={m.value} {...m} />
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
