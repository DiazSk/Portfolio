import { resumeData } from "../constants/resumeData";
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

/* The standfirst claims these are weighted by what carried the six systems.
   That claim has to be true, so the split is computed from those projects'
   own `technologies` lists rather than from source order. */
const SHIPPED = resumeData.projects.flatMap((p) => p.technologies);

const norm = (v) => v.toLowerCase().replace(/[()]/g, "").replace(/\s+/g, " ").trim();

const carriedAProject = (skill) => {
  const a = norm(skill);
  return SHIPPED.some((tech) => {
    const b = norm(tech);
    if (a === b) return true;
    // substring only for names long enough to be unambiguous, so "SQL"
    // does not match "PostgreSQL" while "PySpark" still matches
    // "Apache Spark (PySpark)"
    const [short, long] = a.length <= b.length ? [a, b] : [b, a];
    return short.length >= 4 && long.includes(short);
  });
};

const Skills = () => {
  return (
    <section
      id="skills"
      className="field-surface c-space section-spacing"
    >
      <div className="mx-auto w-full max-w-7xl">
        <h2 className="on-scroll text-heading mb-4">Stack</h2>
        <p
          className="mb-12 max-w-2xl text-base leading-relaxed"
          style={{ color: "#2E1409" }}
        >
          Highlighted tools are the ones that actually carried the six systems
          above; the rest of the stack sits alongside them.
        </p>

        {/* A ruled index, not a grid of identical cards: the category sits in
            a fixed left column so every row scans on one axis. */}
        <div className="flex flex-col">
          {SKILLS.map((group) => (
            <div
              key={group.category}
              className="on-scroll grid grid-cols-1 gap-3 border-t py-6 md:grid-cols-[260px_1fr] md:gap-8"
              style={{ borderColor: "rgba(10,9,8,0.28)" }}
            >
              <h3
                className="text-display text-2xl uppercase md:text-4xl"
                style={{ color: "var(--color-field-ink)", lineHeight: 0.95 }}
              >
                {group.category}
              </h3>
              <div className="flex flex-col gap-2">
                {/* The tools actually load-bearing in the shipped projects
                    carry weight; the rest stay true but stop competing. */}
                <div className="flex flex-wrap gap-1.5">
                  {group.items.filter(carriedAProject).map((skill, i) => (
                    <span key={skill} className={`tech-pill chip-in s${i % 6}`}>
                      {skill}
                    </span>
                  ))}
                </div>
                {group.items.some((i) => !carriedAProject(i)) && (
                  <p className="tech-plain leading-relaxed">
                    {group.items.filter((i) => !carriedAProject(i)).join(" · ")}
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
