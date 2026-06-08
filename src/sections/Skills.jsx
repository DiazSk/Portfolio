import { motion } from "framer-motion";

const SKILLS = [
  {
    category: "Data Orchestration",
    items: [
      "Apache Airflow", "Apache Kafka", "Apache Flink", "dbt",
      "Azure Data Factory", "ETL/ELT Pipelines", "Medallion Architecture",
    ],
  },
  {
    category: "Storage & Databases",
    items: [
      "PostgreSQL", "TimescaleDB", "Snowflake", "Redis",
      "Delta Lake", "DuckDB", "AWS S3", "ADLS Gen2",
    ],
  },
  {
    category: "Cloud & Infrastructure",
    items: [
      "AWS (S3, Glue, Redshift, IAM)",
      "Azure (ADLS Gen2, Databricks, Data Factory, Key Vault)",
      "Terraform", "Docker", "GitHub Actions", "CI/CD Pipelines",
    ],
  },
  {
    category: "Languages",
    items: ["Python", "SQL", "Java"],
  },
  {
    category: "Testing & Quality",
    items: ["dbt Tests", "Great Expectations", "pytest", "Pre-commit Hooks"],
  },
  {
    category: "Visualization & APIs",
    items: ["Power BI", "Microsoft Fabric", "Metabase", "FastAPI", "Streamlit"],
  },
  {
    category: "Frontend & Full-Stack",
    items: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS", "shadcn/ui", "Zod", "WebSockets"],
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

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SKILLS.map((group, i) => (
            <motion.div
              key={group.category}
              className="rounded-xl border p-5"
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
