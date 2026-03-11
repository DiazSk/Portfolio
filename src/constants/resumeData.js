export const resumeData = {
  personal: {
    name: "Zaid Shaikh",
    title: "Data Engineer",
    location: "Seattle, WA",
    email: "zaid07sk@gmail.com",
    linkedin: "https://www.linkedin.com/in/zaidshaikhscientist/",
    github: "https://github.com/DiazSk",
    tagline:
      "I build production-grade data platforms — batch pipelines with Airflow & dbt, streaming systems with Kafka & Flink, and cloud infrastructure with Terraform & AWS.",
    summary:
      "MS Computer Science student at Northeastern University (4.0 GPA) specializing in Data Engineering. I design scalable batch and streaming pipelines, build cloud-native data lakehouses, and ship production-ready platforms with automated testing, infrastructure as code, and measurable business impact. My projects process millions of records across real-time and batch workloads using modern data stack tools.",
    yearsOfExperience: 3,
    availability: "Summer 2026 (April - September)",
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
        "Distributed Systems",
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
        "ETL/ELT Pipelines",
        "Data Modeling",
        "Dimensional Modeling",
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
      ],
    },
    {
      category: "Cloud & DevOps",
      items: [
        "AWS (S3, Glue, Redshift, IAM)",
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
      category: "Visualization & APIs",
      items: ["Metabase", "marimo", "Streamlit", "FastAPI", "WebSocket"],
    },
  ],

  projects: [
    {
      name: "NYC Taxi Data Lakehouse",
      tagline: "Cloud-native lakehouse processing 2.8M+ taxi records on AWS",
      description:
        "Production-ready data engineering platform implementing a Lakehouse Architecture on AWS. Processes 100GB+ of NYC TLC trip data through serverless PySpark jobs on AWS Glue, with Terraform-managed infrastructure and dbt analytics models.",
      technologies: [
        "AWS S3",
        "AWS Glue",
        "PySpark",
        "Terraform",
        "Apache Airflow",
        "dbt",
        "DuckDB",
        "Docker",
        "marimo",
        "Python",
      ],
      highlights: [
        "Processed 2.8M+ taxi trip records through serverless PySpark on AWS Glue with only 3.19% data loss from quality filters",
        "Provisioned all cloud infrastructure (S3, Glue, IAM) via Terraform for reproducible deployments",
        "Built dbt analytics models (staging → daily/hourly/monthly marts) with DuckDB query engine",
        "Orchestrated automated daily ETL pipeline via Apache Airflow with retry logic and verbose logging",
        "Implemented 6-step Spark data quality pipeline: column standardization, null filtering, duration calculation, quality filters, speed derivation, and partitioning",
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
        "PostgreSQL",
        "Apache Airflow",
        "Docker",
        "Python",
        "marimo",
        "DuckDB",
        "SQL",
      ],
      highlights: [
        "Architected Medallion Architecture integrating 14 data sources (11 CSVs + 3 external APIs) processing 1.6M records into a star schema with 5 dimensions, 2 facts, and 1 bridge table",
        "Optimized SQL query performance from 5–10 seconds to <1 second (90% improvement) through join refactoring, CTEs, and window functions",
        "Integrated 3 external APIs (currency rates, holidays, weather) to enrich analytics with R$15.8M (~$4.9M USD) in revenue insights",
        "Reduced technical debt by refactoring wide tables from 30+ to 13 essential columns (57% reduction) based on downstream query analysis",
        "Delivered interactive dashboards using marimo with DuckDB queries; containerized full stack with Docker Compose (3 services)",
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
        "TimescaleDB",
        "FastAPI",
        "WebSocket",
        "Docker",
        "Streamlit",
        "Python",
      ],
      highlights: [
        "Built streaming pipeline with Kafka key-based partitioning achieving 99% operation reduction (300 polling → 2 pub/sub events) for 10 connected clients",
        "Implemented exactly-once semantics using Flink with RocksDB checkpointing and PostgreSQL UPSERT idempotency",
        "Designed dual-storage architecture: Redis cache (<1ms latency) for real-time serving + TimescaleDB for historical time-series analysis",
        "Achieved sub-100ms end-to-end latency from Flink window close to dashboard update with WebSocket push",
        "Orchestrated 8 Docker services with real-time anomaly detection for 5%+ price spikes and OHLC aggregation across 1-min/5-min/15-min windows",
        "Engineered fault-tolerant recovery with Flink checkpoints (30s intervals), Kafka consumer group rebalancing, and p50/p95/p99 latency tracking",
      ],
      github:
        "https://github.com/DiazSk/Real-Time-Cryptocurrency-Market-Analyzer",
      category: "Stream Processing",
    },
  ],

  targetRole: {
    title: "Data Engineering Intern / Co-op",
    type: "Internship / Co-op",
    location: "Remote or Seattle, WA",
    availability: "Summer 2026 (April – September)",
    industries: [
      "FinTech",
      "E-Commerce",
      "Cloud Data Platforms",
      "Big Tech",
    ],
    pitch:
      "I am looking for Summer 2026 internship or co-op opportunities where I can contribute to high-impact data platforms, real-time analytics systems, and cloud-native data infrastructure. I bring hands-on experience building batch and streaming pipelines that process millions of records with production-grade testing and infrastructure as code.",
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
    "How did you implement exactly-once semantics in your streaming pipeline?",
    "What is your experience with infrastructure as code (Terraform)?",
    "How do you handle data modeling — star schema vs medallion architecture?",
    "What tools do you use for data visualization and dashboarding?",
  ],
};