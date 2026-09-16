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
        <h2 className="text-heading mb-4">Stack</h2>
        <p
          className="mb-12 max-w-2xl text-base leading-relaxed"
          style={{ color: "var(--color-ink-secondary)" }}
        >
          Weighted by what carried the six systems above, not by what I have
          touched.
        </p>

        {/* A ruled index, not a grid of identical cards: the category sits in
            a fixed left column so every row scans on one axis. */}
        <div className="flex flex-col">
          {SKILLS.map((group) => (
            <div
              key={group.category}
              className="grid grid-cols-1 gap-3 border-t py-6 md:grid-cols-[220px_1fr] md:gap-8"
              style={{ borderColor: "var(--color-border)" }}
            >
              <h3
                className="text-sm font-medium"
                style={{ color: "var(--color-ink)" }}
              >
                {group.category}
              </h3>
              <div className="flex flex-col gap-2">
                {/* The tools actually load-bearing in the shipped projects
                    carry weight; the rest stay true but stop competing. */}
                <div className="flex flex-wrap gap-1.5">
                  {group.items.slice(0, 4).map((skill) => (
                    <span key={skill} className="tech-pill">
                      {skill}
                    </span>
                  ))}
                </div>
                {group.items.length > 4 && (
                  <p className="tech-plain leading-relaxed">
                    {group.items.slice(4).join(" · ")}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
