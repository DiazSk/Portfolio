export const myProjects = [
  {
    id: 1,
    title: "Modern E-Commerce Analytics Platform",
    description:
      "Production-grade data engineering platform with Terraform IaC, Airflow orchestration, and dbt transformations. Processes 66,000+ records with 67% query optimization and $53K+ opportunity identification.",
    subDescription: [
      "Built end-to-end analytics infrastructure with Terraform managing 24 AWS resources (S3 data lake, CloudWatch, SNS)",
      "Orchestrated 3 production Airflow DAGs with automated FakeStore API ingestion and error handling",
      "Developed 13 dbt models (star schema with SCD Type 2) achieving 96.3% test pass rate across 146 tests",
      "Optimized PostgreSQL queries delivering 67% performance improvement (hours → seconds)",
      "Implemented Great Expectations data quality framework with 15 validation checkpoints",
      "Created 4 production Metabase dashboards with 19 visualizations analyzing $692K revenue",
      "Achieved $2,297 annual cost savings through lifecycle policies and resource optimization",
    ],
    href: "https://github.com/DiazSk/Modern-E-commerce-Analytics-Platform",
    github: "https://github.com/DiazSk/Modern-E-commerce-Analytics-Platform",
    logo: "",
    image: "/assets/projects/ecommerce-analytics.png",
    metrics: {
      recordsProcessed: "66,000+",
      testPassRate: "96.3%",
      queryOptimization: "67%",
      costSavings: "$2,297/year",
      businessValue: "$53K+ identified"
    },
    architecture: `┌─────────────┐
│ FakeStore   │
│    API      │
└──────┬──────┘
       │ Daily Ingestion
       ▼
┌─────────────┐
│  Apache     │
│  Airflow    │ (3 DAGs)
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  AWS S3     │
│ Data Lake   │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│     dbt     │ (13 models)
│ Transform   │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ PostgreSQL  │
│  Warehouse  │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Metabase   │
│ Dashboards  │
└─────────────┘`,
    tags: [
      {
        id: 1,
        name: "Apache Airflow",
        path: "/assets/logos/apache-airflow.svg",
      },
      {
        id: 2,
        name: "dbt",
        path: "/assets/logos/dbt.svg",
      },
      {
        id: 3,
        name: "PostgreSQL",
        path: "/assets/logos/postgresql.svg",
      },
      {
        id: 4,
        name: "AWS",
        path: "/assets/logos/aws.svg",
      },
      {
        id: 5,
        name: "Terraform",
        path: "/assets/logos/terraform.svg",
      },
      {
        id: 6,
        name: "Docker",
        path: "/assets/logos/docker.svg",
      },
    ],
  },
  {
    id: 2,
    title: "Real-Time Cryptocurrency Market Analyzer",
    description:
      "Event-driven streaming platform with Apache Kafka, Flink, and Redis. Implements exactly-once semantics, stateful anomaly detection, and WebSocket pub/sub achieving sub-100ms latency.",
    subDescription: [
      "Architected distributed streaming pipeline: Kafka (3 partitions) → Flink (tumbling windows: 1m, 5m, 15m) → Redis + PostgreSQL dual sink",
      "Implemented exactly-once processing semantics with Flink checkpointing (RocksDB backend) and PostgreSQL UPSERT",
      "Built FastAPI REST + WebSocket endpoints with Redis Pub/Sub achieving 99% reduction in database operations",
      "Developed stateful anomaly detection with Flink's ValueState preventing duplicate alerts on late-arriving data",
      "Created production Streamlit dashboard with OHLC candlestick charts and technical indicators (MA-20, MA-50)",
      "Optimized for low latency: 60-70s end-to-end processing, sub-100ms API response time",
      "Comprehensive testing suite with 96.3% pass rate validating stream processing correctness",
    ],
    href: "https://github.com/DiazSk/Real-Time-Cryptocurrency-Market-Analyzer",
    github: "https://github.com/DiazSk/Real-Time-Cryptocurrency-Market-Analyzer",
    logo: "",
    image: "/assets/projects/crypto-analyzer.png",
    metrics: {
      latency: "60-70s",
      apiResponse: "<100ms",
      testPassRate: "96.3%",
      throughput: "30s polling",
      redisOptimization: "99% reduction"
    },
    architecture: `┌─────────────┐
│ CoinGecko   │
│    API      │ (30s poll)
└──────┬──────┘
       │
       ▼
┌─────────────┐
│    Kafka    │ (3 partitions)
│   Stream    │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│    Flink    │ (1m, 5m, 15m windows)
│  Processing │
└──────┬──────┘
       │
   ┌───┴────┐
   │        │
   ▼        ▼
┌──────┐ ┌──────────┐
│Redis │ │PostgreSQL│
│Cache │ │ Storage  │
└───┬──┘ └────┬─────┘
    │         │
    └────┬────┘
         ▼
    ┌─────────┐
    │ FastAPI │
    │WebSocket│
    └────┬────┘
         │
         ▼
    ┌─────────┐
    │Streamlit│
    │Dashboard│
    └─────────┘`,
    tags: [
      {
        id: 1,
        name: "Apache Kafka",
        path: "/assets/logos/kafka.svg",
      },
      {
        id: 2,
        name: "Apache Flink",
        path: "/assets/logos/flink.svg",
      },
      {
        id: 3,
        name: "Redis",
        path: "/assets/logos/redis.svg",
      },
      {
        id: 4,
        name: "PostgreSQL",
        path: "/assets/logos/postgresql.svg",
      },
      {
        id: 5,
        name: "FastAPI",
        path: "/assets/logos/fastapi.svg",
      },
      {
        id: 6,
        name: "Docker",
        path: "/assets/logos/docker.svg",
      },
    ],
  },
  {
    id: 3,
    title: "PathCode: Database Design & Optimization",
    description:
      "Technical leadership role in CS5200 group project developing normalized database schema with 10+ tables. Mentored 3 students on SQL optimization and database design best practices.",
    subDescription: [
      "Led team of 4 in designing normalized relational schema (3NF) for PathCode learning platform",
      "Architected 10+ interconnected tables with foreign key constraints and referential integrity",
      "Mentored 3 junior students on SQL query optimization, indexing strategies, and ACID principles",
      "Implemented stored procedures for complex business logic and transaction management",
      "Achieved 40% query performance improvement through strategic index creation and query rewriting",
      "Delivered comprehensive ER diagrams, data dictionaries, and technical documentation",
      "Presented final design to class, demonstrating database normalization and scalability considerations",
    ],
    href: "#",
    github: "#",
    logo: "",
    image: "/assets/projects/pathcode.png",
    metrics: {
      teamSize: "4 members",
      mentored: "3 students",
      tables: "10+",
      optimization: "40%",
      normalization: "3NF"
    },
    architecture: `┌──────────────┐
│   Users      │
│   Table      │
└───────┬──────┘
        │
     ┌──┴──┐
     │  FK │
     └──┬──┘
        ▼
┌──────────────┐
│   Courses    │
│   Table      │
└───────┬──────┘
        │
     ┌──┴──┐
     │  FK │
     └──┬──┘
        ▼
┌──────────────┐
│ Enrollments  │
│   Table      │
└───────┬──────┘
        │
  ┌─────┴─────┐
  │           │
  ▼           ▼
┌─────┐   ┌─────┐
│Labs │   │Tests│
└─────┘   └─────┘

3NF Normalized Schema
10+ Interconnected Tables`,
    tags: [
      {
        id: 1,
        name: "PostgreSQL",
        path: "/assets/logos/postgresql.svg",
      },
      {
        id: 2,
        name: "SQL",
        path: "/assets/logos/sql.svg",
      },
      {
        id: 3,
        name: "Database Design",
        path: "/assets/logos/database.svg",
      },
    ],
  },
];

export const mySocials = [
  {
    name: "GitHub",
    href: "https://github.com/DiazSk",
    icon: "/assets/socials/github-white.svg",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/zaidshaikhscientist/",
    icon: "/assets/socials/linkedIn.svg",
  },
  {
    name: "Email",
    href: "mailto:zaid07sk@gmail.com",
    icon: "/assets/socials/email.svg",
  },
];

export const experiences = [
  {
    title: "MS Computer Science",
    job: "Northeastern University - Seattle",
    date: "Expected May 2027",
    contents: [
      "GPA: 4.0/4.0 - Specialization in Data Engineering and Database Systems",
      "Relevant Coursework: Database Management Systems (CS5200), Data Structures & Algorithms, Distributed Systems",
      "Teaching Assistant consideration for Database Management Systems (Spring 2026)",
      "Active in tech community - participating in career fairs and networking events",
    ],
  },
  {
    title: "PathCode Technical Lead",
    job: "CS5200 Database Project - Northeastern University",
    date: "Fall 2024",
    contents: [
      "Led team of 4 students in designing normalized database schema (3NF) for learning platform",
      "Mentored 3 junior team members on SQL optimization, indexing strategies, and query performance",
      "Architected 10+ interconnected tables with proper foreign key constraints and referential integrity",
      "Achieved 40% query performance improvement through strategic indexing and query optimization",
      "Presented final database design demonstrating normalization principles and scalability",
      "Delivered comprehensive technical documentation including ER diagrams and data dictionaries",
    ],
  },
  {
    title: "Data Engineering Portfolio",
    job: "Production-Grade Projects",
    date: "2024-2025",
    contents: [
      "Modern E-Commerce Analytics: Built end-to-end platform with Airflow, dbt, Terraform processing 66K+ records with 67% query optimization",
      "Real-Time Crypto Analyzer: Developed streaming pipeline with Kafka, Flink, Redis achieving sub-100ms latency and exactly-once semantics",
      "Infrastructure as Code: Managed 24 AWS resources with Terraform including S3 data lakes, CloudWatch monitoring, and SNS notifications",
      "Data Quality: Implemented Great Expectations framework with 96.3% test pass rate across 146+ tests",
      "Orchestration: Created 3 production Airflow DAGs with automated error handling and retry logic",
      "Cost Optimization: Achieved $2,297 annual savings through S3 lifecycle policies and resource optimization",
    ],
  },
  {
    title: "Technical Skills",
    job: "Data Engineering Stack",
    date: "2024-Current",
    contents: [
      "Data Pipelines: Apache Airflow, Apache Kafka, Apache Flink, dbt, Great Expectations",
      "Databases: PostgreSQL, Redis, TimescaleDB - expertise in query optimization and indexing",
      "Cloud & IaC: AWS (S3, CloudWatch, SNS), Terraform, Docker, Docker Compose",
      "Languages: Python (production-grade), SQL (advanced optimization), Java (Flink applications)",
      "Streaming: Event-driven architecture, exactly-once semantics, stateful processing, pub/sub patterns",
      "Data Modeling: Star schema, dimensional modeling, SCD Type 2, normalization (3NF)",
      "Daily Practice: SQL on DataLemur, StrataScratch, and HackerRank (6-7 AM routine)",
    ],
  },
];

export const certifications = [
  {
    name: "Oracle Cloud Infrastructure Data Science Professional",
    issuer: "Oracle",
    date: "2024",
    credentialId: "Verified",
  },
  {
    name: "IBM Data Engineering Professional Certificate",
    issuer: "Coursera/IBM",
    date: "In Progress - Expected Dec 2025",
    credentialId: "In Progress",
  },
  {
    name: "Google Cloud Data Engineering Certificate",
    issuer: "Google Cloud",
    date: "In Progress - Expected Dec 2025",
    credentialId: "In Progress",
  },
];

export const skills = {
  dataEngineering: ["Apache Airflow", "Apache Kafka", "Apache Flink", "dbt", "Great Expectations", "ETL/ELT"],
  databases: ["PostgreSQL", "Redis", "TimescaleDB", "MySQL", "MongoDB"],
  cloudAndInfra: ["AWS (S3, CloudWatch, SNS)", "Terraform", "Docker", "Kubernetes"],
  languages: ["Python", "SQL", "Java (Flink)", "Bash"],
  dataModeling: ["Star Schema", "Dimensional Modeling", "SCD Type 2", "Normalization (3NF)"],
  streaming: ["Kafka", "Flink", "Redis Pub/Sub", "WebSocket", "Event-Driven Architecture"],
  tools: ["Git", "Linux", "VS Code", "Jupyter", "DBeaver", "Metabase"],
  practices: ["CI/CD", "IaC", "Testing", "Documentation", "Cost Optimization"],
};

export const achievements = [
  {
    metric: "66K+",
    description: "Records processed daily",
  },
  {
    metric: "96.3%",
    description: "Data quality test pass rate",
  },
  {
    metric: "67%",
    description: "Query optimization improvement",
  },
  {
    metric: "3",
    description: "Production data pipelines",
  },
  {
    metric: "<100ms",
    description: "API response latency",
  },
  {
    metric: "$2.3K",
    description: "Annual cost savings",
  },
];

// Reviews section REMOVED - replaced with technical achievements
export const technicalHighlights = [
  {
    category: "Stream Processing",
    achievement: "Implemented exactly-once semantics with Flink checkpointing and PostgreSQL UPSERT",
  },
  {
    category: "Infrastructure",
    achievement: "Managed 24 AWS resources with Terraform IaC including lifecycle policies",
  },
  {
    category: "Data Quality",
    achievement: "96.3% test pass rate across 146 dbt tests + 15 Great Expectations checks",
  },
  {
    category: "Optimization",
    achievement: "67% query performance improvement and 99% reduction in Redis operations",
  },
  {
    category: "Architecture",
    achievement: "Star schema with SCD Type 2 + event-driven streaming with pub/sub",
  },
  {
    category: "Leadership",
    achievement: "Led CS5200 database project mentoring 3 students on SQL optimization",
  },
];
