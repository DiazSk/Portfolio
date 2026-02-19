export const resumeData = {
  personal: {
    name: "Zaid Shaikh",
    title: "Data Engineer",
    location: "Seattle, WA",
    email: "zaid07sk@gmail.com",
    linkedin: "https://www.linkedin.com/in/zaidshaikhscientist/",
    github: "https://github.com/DiazSk",
    tagline:
      "I build production-grade data platforms with Apache Airflow, Kafka, Flink, dbt, and Terraform.",
    summary:
      "I am an MS Computer Science student at Northeastern University focused on Data Engineering. I build scalable batch and streaming pipelines, optimize data systems for reliability and cost, and ship production-ready platforms with measurable business impact.",
    yearsOfExperience: 3,
  },

  experience: [
    {
      company: "Northeastern University Projects",
      role: "Data Engineering Graduate Student",
      location: "Seattle, WA",
      startDate: "2024",
      endDate: "Present",
      description:
        "Building end-to-end data engineering systems for analytics, streaming, and decision intelligence workloads.",
      achievements: [
        "Built a modern analytics platform processing 66K+ records with Airflow, dbt, PostgreSQL, and AWS S3",
        "Improved analytical query performance by 67% with dimensional modeling and SQL optimization",
        "Delivered a real-time crypto analyzer with Kafka + Flink and sub-100ms pipeline latency",
        "Implemented production-grade testing with 96.3% pass rate across transformation and data quality checks",
      ],
      technologies: [
        "Apache Airflow",
        "dbt",
        "PostgreSQL",
        "Kafka",
        "Flink",
        "SQL",
        "Python",
        "Terraform",
      ],
    },
  ],

  skills: [
    {
      category: "Languages",
      items: ["Python", "SQL", "Java"],
    },
    {
      category: "Data Engineering",
      items: [
        "Apache Airflow",
        "Apache Spark (PySpark)",
        "dbt",
        "Apache Kafka",
        "Apache Flink",
        "ETL/ELT Pipelines",
        "Data Modeling",
        "Data Lineage",
      ],
    },
    {
      category: "Databases",
      items: ["PostgreSQL", "DuckDB", "Snowflake (transferable)", "Redis"],
    },
    {
      category: "Cloud & DevOps",
      items: [
        "AWS (S3, Glue, Redshift)",
        "Terraform",
        "Docker",
        "Git",
        "GitHub",
        "CI/CD Pipelines",
      ],
    },
    {
      category: "Testing & Quality",
      items: ["dbt tests", "Great Expectations", "pytest"],
    },
  ],

  projects: [
    {
      name: "Modern E-Commerce Analytics Platform",
      description:
        "Designed a production-ready analytics stack with orchestrated ingestion, transformations, and warehouse modeling.",
      technologies: ["Airflow", "dbt", "PostgreSQL", "AWS S3", "Terraform"],
      highlights: [
        "66K+ records processed",
        "96.3% test pass rate",
        "67% query optimization",
      ],
    },
    {
      name: "Real-Time Cryptocurrency Market Analyzer",
      description:
        "Built a low-latency stream processing pipeline for live market analytics and candlestick generation.",
      technologies: ["Kafka", "Flink", "Redis", "PostgreSQL", "FastAPI"],
      highlights: [
        "Sub-100ms end-to-end latency",
        "Exactly-once processing semantics",
        "99% reduction in Redis operations",
      ],
    },
  ],

  targetRole: {
    title: "Data Engineering Intern / Co-op",
    type: "Internship",
    location: "Remote or Seattle",
    industries: ["FinTech", "E-commerce", "Cloud Data Platforms"],
    pitch:
      "I am looking for Summer 2026 internship or co-op opportunities where I can contribute to high-impact data platforms and real-time analytics systems.",
  },

  suggestedQuestions: [
    "What kind of data engineering roles are you looking for?",
    "Tell me about your Airflow + dbt project",
    "How did you optimize query performance by 67%?",
    "What is your streaming experience with Kafka and Flink?",
    "How do you approach production reliability in data pipelines?",
  ],
};
