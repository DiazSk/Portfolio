import { motion } from "framer-motion";

const SKILLS = [
  {
    category: "Data Platforms & Pipelines",
    items: [
      "Apache Spark (PySpark)", "Apache Airflow", "Apache Kafka", "Apache Flink", "dbt", "Azure Data Factory", "ETL/ELT Pipelines", "RabbitMQ"
    ],
  },
  {
    category: "Storage & Databases",
    items: [
      "PostgreSQL", "MySQL", "MongoDB", "Snowflake", "TimescaleDB", "Redis", "Delta Lake", "DuckDB",
    ],
  },
  {
    category: "Cloud & Infrastructure",
    items: [
      "AWS S3", "AWS Glue", "AWS Redshift", "Azure ADLS Gen2",
      "Azure Databricks", "Vercel", "Terraform", "Docker", "GitHub Actions", "Jenkins",
    ],
  },
  {
    category: "Languages",
    items: ["Python", "SQL", "Java", "TypeScript", "Bash"],
  },
  {
    category: "Product & APIs",
    items: [
      "FastAPI", "Next.js 16", "React 19", "WebSockets", "Tailwind CSS",
    ],
  },
  {
    category: "Observability & Quality",
    items: [
      "Great Expectations", "dbt Tests", "pytest", "Data Lineage", "Data Quality", "Pre-commit Hooks", "Power BI", "Metabase", "Streamlit"
    ],
  },
];

const Skills = () => {
  return (
    <section
      id="skills"
      className="c-space section-spacing border-t"
      style={{ borderColor: "var(--color-border)" }}
    >
      <div className="mx-auto w-full max-w-7xl">
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <p className="text-eyebrow mb-2">Stack</p>
          <h2 className="text-heading">Skills &amp; Technologies</h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {SKILLS.map((group, i) => (
            <motion.div
              key={group.category}
              className="rounded-xl border p-5 h-full"
              style={{
                borderColor: "var(--color-border)",
                background: "var(--color-surface)",
              }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
            >
              <p
                className="mb-3 text-xs font-semibold uppercase tracking-widest"
                style={{ color: "var(--color-ink-muted)" }}
              >
                {group.category}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {group.items.map((skill) => (
                  <span key={skill} className="tech-pill">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
