export const resumeData = {
  personal: {
    name: "Zaid Shaikh",
    title: "Data Engineer",
    location: "Seattle, WA",
    email: "zaid07sk@gmail.com",
    linkedin: "https://www.linkedin.com/in/zaidshaikhengineer/",
    github: "https://github.com/DiazSk",
    tagline:
      "Architecting resilient data ecosystems and scalable software systems. Committed to building robust underlying architectures that drive real-time stream processing and high-throughput backend platforms.",
    summary:
      "MS Computer Science student at Northeastern University (4.0 GPA) graduating in December 2026. I specialize in designing scalable distributed systems, cloud-native lakehouses, and production-grade pipelines. Beyond simply connecting modern tools, I am deeply committed to building and understanding the foundational architecture of the systems I engineer—whether optimizing low-latency messaging queues, creating multi-hop text generation evaluation harnesses, or deploying exactly-once streaming pipelines. Actively seeking Summer and Fall 2026 Internships, Co-ops, and Full-Time opportunities.",
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
      role: "NLP Research Assistant",
      location: "Seattle, WA",
      startDate: "Jan 2026",
      endDate: "Present",
      description:
        "Conducting NLP research on semantic drift in multi-hop text generation, building evaluation harnesses and statistical validation pipelines for a co-authored COLM 2026 paper.",
      achievements: [
        "Designed an end-to-end evaluation harness in Python for 4,817 source-paraphrase pairs, utilizing Claude Code to accelerate script refactoring and achieving a 0.92 composite correlation across drift dimensions",
        "Engineered a Composite Semantic Drift Score for a co-authored COLM 2026 paper, leveraging Gemini for research synthesis, technical documentation, and cross-functional communication; integrated SBERT, METEOR, and ROUGE-L signals",
        "Validated non-linear semantic drift via paired t-test and Wilcoxon signed-rank scripts, managing large-scale data transformation workflows and performing error analysis across multi-hop text generation chains",
      ],
      technologies: [
        "Python",
        "SBERT",
        "METEOR",
        "ROUGE-L",
        "Claude Code",
        "Gemini",
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
      role: "Technical Lead — CS5200 Database Management Systems",
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
      category: "Cloud Lakehouse",
    },
    {
      name: "NYC Taxi Data Lakehouse",
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
      category: "Cloud & Batch Processing",
    },
    {
      name: "E-Commerce Data Warehouse (Olist)",
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
      category: "Data Warehousing",
    },
    {
      name: "Scalable E-Commerce Analytics Platform",
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
        "Implemented data quality framework with 146 automated dbt tests (96.3% pass rate) and Great Expectations validations",
        "Optimized query performance through B-tree indexing on foreign keys and partial indexes, reducing query time from 4.2s to 1.1s (74% improvement)",
        "Provisioned AWS infrastructure (S3, IAM) with Terraform; CI/CD via GitHub Actions and pre-commit hooks",
      ],
      github:
        "https://github.com/DiazSk/Modern-E-commerce-Analytics-Platform",
      category: "Analytics Engineering",
    },
    {
      name: "Real-Time Cryptocurrency Market Analyzer",
      tagline:
        "Sub-100ms streaming pipeline with Kafka, Flink, and dual-path storage",
      description:
        "Enterprise-grade streaming data pipeline for low-latency financial market analysis. Implements distributed stateful processing with Apache Flink, exactly-once semantics, and a hybrid hot/cold storage architecture using Redis and TimescaleDB. Features real-time anomaly detection, OHLC candlestick generation across parallel time windows, and WebSocket push updates.",
      technologies: [
        "Apache Kafka",
        "Apache Flink (Java)",
        "Redis",
        "PostgreSQL",
        "Docker",
      ],
      highlights: [
        "Achieved 99% polling reduction by engineering a data streaming pipeline with Apache Kafka (Kinesis equivalent) for key-based partitioning and Flink exactly-once processing, replacing 300 REST polls with 2 pub/sub events",
        "Architected a dual-storage system using Redis (NoSQL) cache (<1ms reads) and PostgreSQL + TimescaleDB for time-series analytics, serving 20+ concurrent users with sub-second response times",
        "Architected a microservices backend using RESTful APIs and Celery for distributed task orchestration; containerized services for real-time anomaly detection 5%+ price spikes, OHLC aggregation, and real-time dashboards with 2s refresh; implemented Flink checkpoint recovery at 30s intervals",
        "Implemented system observability by configuring Prometheus and Grafana dashboards to monitor microservice health and pipeline latency",
      ],
      github:
        "https://github.com/DiazSk/Real-Time-Cryptocurrency-Market-Analyzer",
      category: "Stream Processing",
    },
    {
      name: "Chatflow-Messaging-System",
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
      category: "Distributed Systems",
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
    "How do you handle data modeling — star schema vs medallion architecture?",
    "What tools do you use for data visualization and dashboarding (Power BI, Microsoft Fabric)?",
  ],
};