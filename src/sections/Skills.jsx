import { useRef } from "react";
import { resumeData } from "../constants/resumeData";
import { useMotion, stackReveal } from "../lib/motion";
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
  const root = useRef(null);

  // GSAP owns this section: one timeline scrubbed by the section's own
  // scroll progress, which per-element CSS timelines cannot be sequenced into.
  useMotion(() => stackReveal(root), root);

  return (
    <section
      id="skills"
      ref={root}
      /* Not section-spacing: at py-24/32 plus 24px row padding the
             section measured 1121px against a 946px viewport, so the first
             and last rows could never be read together. */
      className="field-surface c-space py-16 md:py-20"
    >
      <div className="mx-auto w-full max-w-7xl">
        {/* Head and lede share a row rather than stacking: stacked they cost
            ~84px of height, which is the difference between the six rows
            fitting one viewport and not on a shorter laptop window. */}
        <div className="mb-8 grid grid-cols-1 items-end gap-4 md:grid-cols-[auto_1fr] md:gap-10">
          <h2 className="on-scroll text-heading">Stack</h2>
          <p
            className="max-w-xl text-base leading-relaxed md:pb-2"
            style={{ color: "var(--color-field-ink-secondary)" }}
          >
            Highlighted tools are the ones that actually carried the six systems
            above; the rest of the stack sits alongside them.
          </p>
        </div>

        {/* A ruled index, not a grid of identical cards: the category sits in
            a fixed left column so every row scans on one axis. */}
        <div className="flex flex-col">
          {SKILLS.map((group) => (
            <div
              key={group.category}
              className="stack-row relative grid grid-cols-1 gap-3 py-4 md:grid-cols-[260px_1fr] md:gap-8"
            >
              {/* A real element, not a border: a border cannot be drawn on. */}
              <span
                className="stack-rule absolute inset-x-0 top-0 h-px origin-left"
                style={{ background: "rgba(10,9,8,0.28)" }}
                aria-hidden="true"
              />
              <h3
                className="stack-head text-display text-2xl uppercase md:text-3xl"
                style={{ color: "var(--color-field-ink)", lineHeight: 0.95 }}
              >
                {group.category}
              </h3>
              <div className="flex flex-col gap-2">
                {/* The tools actually load-bearing in the shipped projects
                    carry weight; the rest stay true but stop competing. */}
                <div className="flex flex-wrap gap-1.5">
                  {group.items.filter(carriedAProject).map((skill) => (
                    <span key={skill} className="tech-pill">
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
