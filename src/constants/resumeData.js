export const resumeData = {
  personal: {
    name: "Zaid Shaikh",
    title: "Data Engineer",
    location: "Seattle, WA",
    email: "shaikh.zaid@northeastern.edu",
    linkedin: "https://www.linkedin.com/in/zaidshaikhengineer/",
    github: "https://github.com/DiazSk",
    tagline:
      "Architecting resilient data ecosystems and scalable software systems. Committed to building robust underlying architectures that drive real-time stream processing and high-throughput backend platforms.",
    summary:
      "MS Computer Science at Northeastern University (4.0 GPA, December 2026), serving as a Graduate Teaching Assistant for the Machine Learning course and co-authoring a paper under review at COLM 2026. My work spans the full data stack: Medallion lakehouses ingesting 9.6M records on Azure, streaming backends sustaining 21,091 msg/s with exactly-once Flink semantics, and full-stack terminals closing the Kafka-to-browser gap in under 100ms. I build systems where every architectural layer is a deliberate decision, optimized for throughput, correctness, and the engineers who maintain them.",
    yearsOfExperience: 0,
    availability: "Summer & Fall 2026 | Full-Time",
    phone: "+1(206) 843-6128",
    universityEmail: "shaikh.zaid@northeastern.edu",
  },

  education: [
    {
      institution: "Northeastern University",
      college: "Khoury College of Computer Sciences",
      location: "Seattle, WA",
      degree: "Master of Science in Computer Science",
      gpa: "4.0/4.0",
      startDate: "Jan 2025",
      endDate: "Dec 2026",
      relevantCourses: [
        "Database Management Systems",
        "Algorithms",
        "Building Scalable Distributed Systems",
        "Machine Learning",
        "Natural Language Processing",
        "Programming Design Paradigms",
      ],
    },
    {
      institution: "St. Francis Institute of Technology",
      location: "Mumbai, India",
      degree: "Bachelor of Engineering in Computer Engineering",
      specialization: "AI/ML",
      graduationDate: "May 2024",
      relevantCourses: [
        "Object Oriented Programming",
        "Data Structures",
        "Machine Learning",
        "Software Engineering",
      ],
    },
  ],

  experience: [
    {
      company: "Northeastern University, Khoury College of Computer Sciences",
      role: "Research Co-author",
      location: "Seattle, WA",
      startDate: "Fall 2025",
      endDate: "Present",
      description:
        "Co-authoring The Laundering Effect (COLM 2026, under review) under faculty advisement, formalizing cumulative semantic erosion under iterative LLM paraphrasing. Extended from an NLP course group project into a full research contribution.",
      achievements: [
        "Contributed to a 3-phase evaluation pipeline processing 36,800+ records across two corpora (PADBen: 16,232 sentence-level records; Ship of Theseus: 20,595 paragraph-level records, 7 domains) through corpus standardization, multi-hop paraphrasing chains, and composite metric computation",
        "Implemented the Composite Semantic Drift Score (SDS: weighted SBERT / METEOR / ROUGE-L) across iterative paraphrase trajectories, quantifying a data quality failure mode — the Boiling Frog Effect — where cumulative drift reached 189-331% above the per-hop safety threshold while individual-step signals appeared clean",
        "Ran statistical analysis (paired t-tests, Wilcoxon signed-rank tests) validating the Distance Effect Gap: SBERT cosine remained high (0.60-0.87) while lexical overlap collapsed to 20-39% word survival across the full paraphrase trajectory",
      ],
      technologies: [
        "Python",
        "SBERT",
        "METEOR",
        "ROUGE-L",
        "DIPPER",
        "GPT-4",
        "Statistical Analysis",
      ],
    },
    {
      company: "Northeastern University",
      role: "Data Engineering Graduate Student",
      location: "Seattle, WA",
      startDate: "Jan 2025",
      endDate: "Present",
      description:
        "Building end-to-end data engineering systems spanning batch processing, real-time streaming, and cloud-native data platforms with production-grade testing and infrastructure as code.",
      achievements: [
        "Built 4 production-grade data platforms processing 4M+ records across batch and streaming workloads using Airflow, dbt, Kafka, Flink, and AWS",
        "Designed lakehouse and star schema data models with SCD Type 2 tracking, dimensional modeling, and automated data quality frameworks",
        "Delivered a real-time streaming pipeline with Apache Kafka and Flink achieving sub-100ms end-to-end latency and exactly-once semantics",
        "Implemented 146+ automated dbt tests and Great Expectations validations with 96.3% pass rate across pipeline stages",
        "Provisioned and managed cloud infrastructure using Terraform (S3, Glue, IAM) with Docker Compose for local development environments",
        "Optimized SQL query performance by up to 90% through B-tree indexing, CTE refactoring, and window function optimization",
      ],
      technologies: [
        "Apache Airflow",
        "dbt",
        "Apache Kafka",
        "Apache Flink",
        "PostgreSQL",
        "AWS (S3, Glue, Redshift)",
        "Terraform",
        "Docker",
        "Python",
        "SQL",
        "PySpark",
      ],
    },
    {
      company: "Northeastern University",
      role: "Technical Lead, CS5200 Database Management Systems",
      location: "Seattle, WA",
      startDate: "Spring 2025",
      endDate: "Spring 2025",
      description:
        "Led a team project on database design, mentoring students on SQL optimization and data integrity best practices.",
      achievements: [
        "Mentored 3 students on database design, SQL optimization, and data integrity patterns",
        "Conducted code reviews ensuring proper normalization (3NF) and efficient query patterns",
        "Led Git workflows and project management achieving on-time delivery",
      ],
      technologies: ["PostgreSQL", "SQL", "Git"],
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
        "Azure Data Factory",
        "ETL/ELT Pipelines",
        "Data Modeling",
        "Dimensional Modeling",
        "Star Schema",
        "Medallion Architecture",
        "Data Lineage",
      ],
    },
    {
      category: "Databases & Storage",
      items: [
        "PostgreSQL",
        "TimescaleDB",
        "DuckDB",
        "Snowflake",
        "Redis",
        "AWS S3",
        "ADLS Gen2",
        "Delta Lake",
      ],
    },
    {
      category: "Cloud & DevOps",
      items: [
        "AWS (S3, Glue, Redshift, IAM)",
        "Azure (ADLS Gen2, Data Factory, Databricks, Key Vault)",
        "Terraform",
        "Docker",
        "Docker Compose",
        "Git",
        "GitHub Actions",
        "CI/CD Pipelines",
      ],
    },
    {
      category: "Testing & Quality",
      items: ["dbt Tests", "Great Expectations", "pytest", "Pre-commit Hooks"],
    },
    {
      category: "Visualization & BI",
      items: [
        "Power BI",
        "Microsoft Fabric",
        "Metabase",
        "marimo",
        "Streamlit",
        "FastAPI",
        "WebSocket",
      ],
    },
  ],

  projects: [
    {
      name: "Healthcare Data Lakehouse on Azure",
      category: "Data Engineering",
      outcomeStatement:
        "Processed 80GB of Medicare reimbursement data across three quality layers with zero loss during ingestion failures, delivering a 35% reduction in Databricks compute cost.",
      primaryMetric: { value: "9.6M", label: "records · 80GB · Azure Medallion" },
      decisionLog: {
        chose: "Delta Lake with ACID transactions on ADLS Gen2",
        over: "raw Parquet files in ADLS Gen2",
        because:
          "Medicare data required reprocessing capability: schema evolution without rewriting the full pipeline when upstream sources changed, and time-travel semantics for audit compliance.",
      },
      tagline:
        "Azure-native Medicare reimbursement lakehouse processing 9.6M JSON records and 80GB of raw volume",
      description:
        "End-to-end Azure data lakehouse for Medicare reimbursement analytics. Orchestrates ingestion of 80GB raw JSON via Azure Data Factory into ADLS Gen2, transforms 9.6M records through Azure Databricks PySpark notebooks following the Medallion architecture (Bronze → Silver → Gold) on Delta Lake with ACID guarantees, and serves analytics through a Microsoft Fabric Lakehouse and Power BI dashboards.",
      technologies: [
        "Microsoft Azure",
        "Azure Data Factory",
        "Azure Databricks",
        "ADLS Gen2",
        "Delta Lake",
        "PySpark",
        "Python",
        "SQL",
        "Microsoft Fabric",
        "Power BI",
        "Azure Key Vault",
      ],
      highlights: [
        "Architected a highly available data pipeline processing 9.6 million JSON records and 80GB of raw volume by orchestrating Azure Data Factory, Databricks, and PySpark into a structured Medallion architecture (Bronze → Silver → Gold)",
        "Reduced Databricks cluster compute costs by 35% across all analytical workloads by enforcing 10-minute auto-termination policies and applying strict vertical column pruning during big data reads",
        "Hardened cloud access using Azure Key Vault, Service Principals, OAuth 2.0, and Personal Access Tokens under the Principle of Least Privilege for ADLS Gen2 and Databricks integrations",
        "Engineered a Delta Lake architecture with ACID transactions, explicit schema casting, and multiline JSON (NDJSON) parsing to enable reliable, reproducible analytics on Medicare reimbursement data",
        "Modeled a Star Schema in the Gold layer and built a presentation layer in Microsoft Fabric (Lakehouse mapping, SQL analytics endpoint) with Power BI dashboards (Dataflow Gen2, DirectQuery, Power Query Online) featuring geographic choropleth heatmaps, clustered bar charts, and KPI cards",
        "Built ADF Copy Activities and Web Activities (with pagination) for incremental ingestion, landing raw JSON, then materializing curated Parquet/Delta tables for downstream analytics",
      ],
      github: "https://github.com/DiazSk/healthcare-lakehouse-azure",
    },
    {
      name: "NYC Taxi Data Lakehouse",
      category: "Data Engineering",
      outcomeStatement:
        "Ingested 100GB+ of NYC taxi trip data through serverless Spark on AWS with 96.8% data retention, fully reproducible across environments via Terraform IaC.",
      primaryMetric: { value: "2.8M", label: "clean records · 96.8% retention" },
      decisionLog: {
        chose: "AWS Glue (serverless managed Spark) for ETL",
        over: "AWS Athena querying raw S3 Parquet directly with no ETL layer",
        because: "Athena's $5/TB scan cost compounds across every dbt model run on 100GB+ of raw Parquet; Glue runs deduplication, schema normalization, and null-handling once at ingest, producing the 96.8% retention rate as a durable, guaranteed fact rather than a per-query assumption, at the cost of an explicit ETL step.",
      },
      tagline: "Cloud-native lakehouse processing 2.8M+ taxi records on AWS",
      description:
        "Production-ready data engineering platform implementing a Lakehouse Architecture on AWS. Processes 100GB+ of NYC TLC trip data through serverless PySpark jobs on AWS Glue, with Terraform-managed infrastructure and dbt analytics models.",
      technologies: [
        "Terraform",
        "AWS S3",
        "AWS Glue",
        "Apache Airflow",
        "PySpark",
        "dbt",
        "Docker",
      ],
      highlights: [
        "Provisioned AWS cloud infrastructure (S3 data lake, Glue serverless Spark jobs, IAM roles) using Terraform IaC, enabling reproducible deployments across environments",
        "Processed 100GB+ (Parquet) NYC taxi trip records through PySpark ETL on AWS Glue with quality filters, achieving 96.8% data retention (2.8M → 2.75M clean records) partitioned by year/month",
        "Automated daily batch pipeline via Airflow DAG with GlueJobOperator; built dbt analytics layer (staging view + 3 mart tables) with data quality tests on distance, duration, and passenger ranges",
      ],
      github: "https://github.com/DiazSk/nyc-taxi-data-lakehouse",
    },
    {
      name: "E-Commerce Data Warehouse (Olist)",
      category: "Analytics Engineering",
      outcomeStatement:
        "Centralized 14 heterogeneous sources into a star-schema warehouse, achieving 90% SQL query latency reduction by eliminating 30-column wide-table joins.",
      primaryMetric: { value: "90%", label: "query latency reduction" },
      decisionLog: {
        chose: "A strict star schema with two distinct grain-specific fact tables (orders vs. items)",
        over: "A fully normalized snowflake schema or a single denormalized wide table",
        because: "A snowflake schema would introduce excessive join latency for read-heavy OLAP queries, while combining grains into a single fact table would cause double-counting in aggregations. The star schema traded storage redundancy for a 90% query latency reduction.",
      },
      tagline:
        "Medallion Architecture warehouse integrating 14 data sources with 1.6M records",
      description:
        "Full-scale data warehousing solution using Brazilian e-commerce data. Implements Medallion Architecture (Bronze → Silver → Gold) with star schema modeling, Docker containerization, Apache Airflow orchestration, and 3 external API integrations for data enrichment.",
      technologies: [
        "Python",
        "PostgreSQL",
        "Snowflake",
        "Apache Airflow",
        "Docker",
        "marimo",
      ],
      highlights: [
        "Designed a Medallion-architecture data warehouse (Bronze → Silver → Gold), centralizing 14 sources (11 CSVs, 3 APIs) for revenue analytics on 1.6M+ records with a star schema design of 5 dimensions, 2 facts, and 1 bridge table",
        "Reduced SQL query latency by 90% (5–10s to <1s) through query tuning, refactoring joins, and data normalization for wide tables from 30+ to 13 columns",
        "Migrated the full automated cloud data pipelines from PostgreSQL to Snowflake cloud DWH, leveraged AI-assisted coding tools for rapid development of Python-based data transformations and stored procedures",
      ],
      github: "https://github.com/DiazSk/sql-data-warehouse-project",
    },
    {
      name: "Scalable E-Commerce Analytics Platform",
      category: "Analytics Engineering",
      outcomeStatement:
        "Built end-to-end pipeline from 3 enterprise sources through a dbt analytics layer with 146 automated tests with SCD Type 2 tracking for full historical accuracy.",
      primaryMetric: { value: "146", label: "automated dbt tests" },
      decisionLog: {
        chose: "SCD Type 2 dimensional modeling for the customer dimension",
        over: "SCD Type 1 (overwrite current state)",
        because: "Historical attribution was a hard business requirement for segment-specific customer lifetime value (CLV) analysis; the ability to perform point-in-time querying justified the 2-3x storage footprint increase.",
      },
      tagline:
        "End-to-end pipeline with Airflow, dbt, AWS S3, and 146 automated tests",
      description:
        "Modern analytics platform demonstrating enterprise data engineering patterns. Ingests data from 3 enterprise sources (transactional DB, REST API, clickstream events), lands to AWS S3 Data Lake, and transforms through dbt with SCD Type 2 dimensional modeling and comprehensive data quality testing.",
      technologies: [
        "Apache Airflow",
        "dbt",
        "PostgreSQL",
        "AWS S3",
        "Terraform",
        "Docker",
        "Great Expectations",
        "Metabase",
        "Python",
      ],
      highlights: [
        "Built end-to-end pipeline ingesting from 3 enterprise systems (PostgreSQL DB, REST API, clickstream events) processing 66K+ records",
        "Designed ETL/ELT workflows using Airflow (3 DAGs) with incremental extraction patterns and date-partitioned S3 Data Lake landing",
        "Built and validated dimensional models in dbt: 4 staging → 4 dimension tables (including SCD Type 2) → 1 fact table → analytics mart",
        "Implemented data quality framework with 146 automated dbt tests and Great Expectations validations across all pipeline stages",
        "Optimized query performance through B-tree indexing on foreign keys and partial indexes, reducing query time from 4.2s to 1.1s (74% improvement)",
        "Provisioned AWS infrastructure (S3, IAM) with Terraform; CI/CD via GitHub Actions and pre-commit hooks",
      ],
      github: "https://github.com/DiazSk/Modern-E-commerce-Analytics-Platform",
    },
    {
      name: "Real-Time Cryptocurrency Market Analyzer",
      category: "Systems Engineering",
      outcomeStatement:
        "Built an end-to-end real-time market analytics platform: a Java/Flink streaming pipeline with exactly-once fault tolerance feeds a dual-path storage layer (sub-1ms Redis hot path + TimescaleDB cold analytics), surfaced through a production-ready Next.js 16 terminal. Closes the loop from Kafka ingestion to rendered browser UI in under 100ms.",
      primaryMetric: { value: "<100ms", label: "Kafka-to-browser latency · exactly-once · dual-path storage" },
      decisionLog: {
        chose: "Redis hot path + PostgreSQL/TimescaleDB cold analytics",
        over: "single PostgreSQL instance for all read traffic",
        because:
          "Redis delivers sub-1ms reads for live WebSocket subscriptions without competing with analytical queries; TimescaleDB's continuous aggregates and time-series compression handle 90-day aggregate retention, matching query latency requirements to storage cost at each tier.",
      },
      tagline:
        "Sub-100ms streaming pipeline with Kafka, Flink, and dual-path storage, surfaced through a Next.js 16 terminal",
      description:
        "Full-stack real-time market analytics platform. A Java/Apache Flink streaming pipeline with exactly-once semantics aggregates OHLC candlesticks over Kafka topics, persisted via a dual-path storage layer (Redis hot path + PostgreSQL/TimescaleDB cold analytics), and surfaced through a Python/FastAPI backend and a Next.js 16 + TypeScript terminal with WebSocket push updates.",
      technologies: [
        "Apache Kafka",
        "Apache Flink (Java)",
        "Next.js 16",
        "TypeScript",
        "React 19",
        "FastAPI",
        "Redis",
        "PostgreSQL",
        "TimescaleDB",
        "Docker Compose",
      ],
      highlights: [
        "Engineered a Java/Apache Flink streaming pipeline with exactly-once semantics enforced via Chandy-Lamport distributed snapshots (60-second checkpoint interval), aggregating multi-asset OHLC candlesticks across multiple time windows over Kafka topics configured with EXACTLY_ONCE producer delivery; every aggregated tick is fault-tolerant and replayable on failure.",
        "Implemented a dual-path storage architecture: Redis serving the hot path at sub-1ms read latency for live WebSocket subscriptions, and PostgreSQL/TimescaleDB handling cold analytics with 7-day raw tick retention and 90-day aggregate retention, isolating live query traffic from analytical workloads at each storage tier.",
        "Built a Python/FastAPI backend with asyncpg connection pooling and redis.asyncio, exposing 7 REST endpoints and a WebSocket endpoint that pushes Flink pipeline output to connected clients, eliminating client-side polling and fitting the full Kafka-to-Flink-to-Redis-to-WebSocket path within the sub-100ms latency budget.",
        "Shipped a 3-route Next.js 16 terminal (live dashboard, paginated screener, coin detail) with a deliberate Server/Client split: market overview tiles rendered as async Server Components with 60s ISR caching, live price widgets isolated as Client Components with WebSocket subscriptions, reactive state confined to the components that own real-time data.",
        "Enforced end-to-end type safety across 7 REST endpoints and 5 WebSocket message shapes via Zod-derived TypeScript schemas in strict mode, propagating typed errors through TanStack Query boundaries and a custom WebSocket hook with exponential-backoff reconnect and 25s heartbeat.",
      ],
      github: "https://github.com/DiazSk/Real-Time-Cryptocurrency-Market-Analyzer",
    },
    {
      name: "Chatflow Messaging System",
      category: "Backend SWE",
      outcomeStatement:
        "Sustained 21,091 msg/s with zero data loss across 1M messages via write-behind persistence; CQRS isolation prevented write-side failures from starving read queries.",
      primaryMetric: { value: "21,091", label: "msg/s · zero data loss · 1M messages" },
      decisionLog: {
        chose: "Write-behind persistence with in-memory batching (2k-5k rows/commit)",
        over: "Write-through synchronous per-message inserts",
        because: "Write-through coupled consumption speed to MySQL's 2-5ms insert latency, capping throughput at ~500 msg/s; write-behind decoupled them, unlocking 21,091 msg/s from RabbitMQ while accepting a mitigated crash-loss window.",
      },
      tagline:
        "High-throughput messaging architecture handling 21,091 msg/s with CQRS read/write separation",
      description:
        "A high-throughput, low-latency messaging architecture handling 21,091 msg/s with CQRS-style read/write separation and write-behind persistence.",
      technologies: [
        "Java",
        "RabbitMQ",
        "Redis",
        "MySQL",
        "WebSockets",
        "AWS EC2",
      ],
      highlights: [
        "Engineered a write-behind persistence pipeline sustaining throughput of 21,091 msg/s with zero data loss across 1M messages by chaining an in-memory blocking queue to dedicated worker threads with adaptive JDBC batch sizing and multi-value insert rewriting",
        "Optimized read-path latency to 13ms at 1M-row scale against a 100ms SLO target by implementing a two-tier caching hierarchy (local memory and Redis with active invalidation) and a mutex-based stampede guard to strictly cap concurrent database queries",
        "Architected a CQRS-style read/write separation that survived a 60-minute endurance test at full load by partitioning HikariCP into isolated reader and writer pools bound to a circuit breaker, preventing write-side failures from starving read queries",
      ],
      github: "https://github.com/DiazSk/chatflow-messaging-system",
    },
  ],

  targetRole: {
    title: "Data Engineer | SWE/SDE Backend | Analytics Engineer | BI Engineer",
    type: "Internship / Co-op / Full-Time",
    location: "Remote or Seattle, WA",
    availability:
      "Summer & Fall 2026 (Internship/Co-op) | Full-Time (Post-Graduation)",
    industries: [
      "FinTech",
      "E-Commerce",
      "Cloud Data Platforms",
      "Big Tech",
    ],
    pitch:
      "I am actively seeking Summer/Fall 2026 internships and co-ops, as well as Full-Time opportunities, where I can contribute to high-impact distributed systems and cloud-native infrastructure. I bring hands-on experience building both scalable software backends and complex data platforms, always prioritizing clean architecture, automated testing, and infrastructure as code.",
    strengths: [
      "End-to-end pipeline development (ingestion → transformation → serving)",
      "Both batch (Airflow + dbt) and streaming (Kafka + Flink) architectures",
      "Cloud infrastructure with Terraform and AWS",
      "Data quality engineering with automated testing frameworks",
      "SQL optimization and dimensional data modeling",
    ],
  },

  suggestedQuestions: [
    "What kind of data engineering roles are you looking for?",
    "Tell me about your Airflow + dbt analytics platform",
    "How did you optimize SQL query performance by 90%?",
    "What is your streaming experience with Kafka and Flink?",
    "How do you approach data quality and testing in pipelines?",
    "Tell me about your NYC Taxi cloud data lakehouse on AWS",
    "Walk me through your Azure healthcare lakehouse with ADF and Databricks",
    "How did you cut Databricks compute costs by 35%?",
    "How did you implement exactly-once semantics in your streaming pipeline?",
    "What is your experience with infrastructure as code (Terraform)?",
    "How do you handle data modeling: star schema vs medallion architecture?",
    "What tools do you use for data visualization and dashboarding (Power BI, Microsoft Fabric)?",
  ],
};