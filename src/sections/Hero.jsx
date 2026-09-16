import MetricStat from "../components/MetricStat";
import { mySocials } from "../constants";

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
    value: "9.6M",
    label: "records processed",
    context: "Healthcare Lakehouse · Azure Medallion",
  },
];

const Hero = () => {
  return (
    <section
      id="home"
      className="c-space flex min-h-screen flex-col justify-center pt-28 pb-20"
    >
      <div className="mx-auto w-full max-w-7xl">
        {/* Name and claim first. */}
        <h1
          className="text-4xl font-semibold md:text-6xl"
          style={{ color: "var(--color-ink)", letterSpacing: "-0.04em", lineHeight: 1.05 }}
        >
          Zaid Shaikh
        </h1>

        <p
          className="mt-3 text-xl font-medium md:text-2xl"
          style={{ color: "var(--color-ink-secondary)", letterSpacing: "-0.02em" }}
        >
          Data Engineer &amp; Backend Systems Engineer
        </p>

        <p
          className="mt-7 max-w-2xl text-base leading-relaxed md:text-lg"
          style={{ color: "var(--color-ink-secondary)" }}
        >
          I build the infrastructure layer: streaming pipelines, distributed
          warehouses, and high-throughput backend systems that process millions
          of records reliably.
        </p>

        {/* Availability + location, the two facts a recruiter checks next */}
        <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
          <span className="inline-flex items-center gap-2">
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: "var(--color-accent)" }}
              aria-hidden="true"
            />
            <span style={{ color: "var(--color-ink)" }}>
              Available full-time from December 2026
            </span>
          </span>
          <span style={{ color: "var(--color-ink-muted)" }}>Seattle, WA</span>
          <span style={{ color: "var(--color-ink-muted)" }}>
            MS Computer Science, Northeastern
          </span>
        </div>

        {/* ── Metrics ─────────────────────────────────────────── */}
        <div className="metric-grid mt-16 max-w-3xl">
          {METRICS.map((m) => (
            <MetricStat key={m.value} {...m} />
          ))}
        </div>

        {/* ── Social links ─────────────────────────────────────── */}
        <div className="mt-12 flex flex-wrap items-center gap-3">
          {mySocials.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target={social.href.startsWith("mailto:") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="btn-ghost text-sm"
            >
              {social.name === "Email"
                ? "shaikh.zaid@northeastern.edu"
                : social.name}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
