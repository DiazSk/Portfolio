import { motion } from "framer-motion";
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
      className="c-space flex min-h-screen flex-col justify-center pt-24 pb-16"
    >
      <motion.div
        className="mx-auto w-full max-w-7xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Eyebrow */}
        <p className="text-eyebrow mb-6">
          Zaid Shaikh · Seattle, WA · Northeastern University
        </p>

        {/* Headline */}
        <h1
          className="max-w-3xl text-4xl font-semibold leading-tight tracking-tight md:text-6xl"
          style={{ color: "var(--color-ink)" }}
        >
          Data Engineer &amp;{" "}
          <br className="hidden md:block" />
          Backend Systems Engineer.
        </h1>

        {/* Availability pill — answers "are they available?" right after the role claim */}
        <div className="mt-4">
          <span
            className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs"
            style={{
              borderColor: "var(--color-border)",
              color: "var(--color-ink-muted)",
            }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
            Available Summer & Fall 2026
          </span>
        </div>

        {/* Declarative sentence */}
        <p
          className="mt-6 max-w-2xl text-lg leading-relaxed md:text-xl"
          style={{ color: "var(--color-ink-secondary)" }}
        >
          I build the infrastructure layer: streaming pipelines, distributed
          warehouses, and high-throughput backend systems that process millions
          of records reliably.
        </p>

        {/* ── Metrics ─────────────────────────────────────────── */}
        <div className="metric-grid mt-14 max-w-3xl">
          {METRICS.map((m) => (
            <MetricStat key={m.value} {...m} />
          ))}
        </div>

        {/* ── Social links ─────────────────────────────────────── */}
        <div className="mt-12 flex flex-wrap items-center gap-4">
          {mySocials.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target={social.href.startsWith("mailto:") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="btn-ghost text-sm"
            >
              <img
                src={social.icon}
                className="h-4 w-4"
                style={{ filter: "brightness(0)" }}
                alt={social.name}
              />
              {social.name === "Email" ? "shaikh.zaid@northeastern.edu" : social.name}
            </a>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
