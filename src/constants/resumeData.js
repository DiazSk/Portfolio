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
    bio:
      "I came to this work from Mumbai, where I took a BE in Computer Engineering at St. Francis Institute of Technology. I am finishing an MS in Computer Science at Northeastern in Seattle, and teaching the graduate Machine Learning course as a TA.",
    focus:
      "Day to day I work across the data stack: Medallion lakehouses on Azure and AWS, streaming pipelines on Kafka and Flink, and the backend systems that serve them. My research began as a group project in an NLP course and carried on under faculty advisement after the course ended, becoming The Laundering Effect \u2014 a formalization of cumulative semantic erosion under iterative LLM paraphrasing.",
    yearsOfExperience: 0,
    availability: "Full-Time from December 2026",
    phone: "+1(206) 843-6128",
    universityEmail: "shaikh.zaid@northeastern.edu",
  },

  /* Rendered by the About section. These are PRODUCT.md's Product Principles
     in first person; each one traces to real work, not to a slogan. Keep the
     two in step if either changes. */
  positions: [
    {
      claim: "Every architectural layer is a deliberate decision.",
      body: "Optimized for throughput, correctness, and the engineers who maintain it afterwards.",
    },
    {
      claim: "Decisions over tools.",
      body: "Any two candidates list Airflow and Kafka. The difference is why one was chosen over the other, and what it cost.",
    },
    {
      claim: "A measurement is only evidence if you can say how it was taken.",
      body: "A parity suite on the Medicare project caught one of my own panels reading 41% high \u2014 beneficiary-weighted where my query was service-weighted. It looked entirely plausible.",
    },
    {
      claim: "When a result does not hold up, say so.",
      body: "Two of five hypotheses in that analysis were refuted, and the published dashboard reports them as refuted.",
    },
  ],

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
      startDate: "2020",
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
        "Co-authoring The Laundering Effect under faculty advisement, formalizing cumulative semantic erosion under iterative LLM paraphrasing. Extended from an NLP course group project into a full research contribution.",
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
        "Built 6 production-grade data platforms processing 120M+ records across batch and streaming workloads using Airflow, dbt, Kafka, Flink, Databricks and AWS",
        "Designed Medallion lakehouse and star schema data models with incremental merge strategies, dimensional modeling, and automated data quality frameworks",
        "Delivered a real-time streaming pipeline with Apache Kafka and Flink handling every trade for 8 pairs with zero duplicates and zero missed, verified by trade-ID gap tracking, with exactly-once alert delivery",
        "Gated pipelines with automated data-quality suites — 13 hard assertions inside a 108-test suite on the Medicare lakehouse, dbt unit and singular tests for funnel monotonicity and mart grains, and CI running a full dbt build on synthetic fixtures with no cloud credentials",
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
      name: "Medicare Reimbursement Gap Analyzer",
      category: "Data Engineering",
      architecture: [
        { stage: "Ingest", items: ["CMS physician claims"] },
        { stage: "Bronze", items: ["ADLS Gen2 · Delta Lake"] },
        { stage: "Silver", items: ["Databricks PySpark"] },
        { stage: "Gold", items: ["Star schema · 5 marts", "13 quality assertions"] },
        { stage: "Serve", items: ["Tiered Parquet", "DuckDB-WASM · in-browser"] },
      ],
      outcomeStatement:
        "Made all 9.66M CMS Medicare claim rows queryable in the browser with no backend, and reported 2 of 5 original hypotheses as refuted — including a headline +2,223% premium that turned out to rest on 11 providers.",
      primaryMetric: { value: "9.66M", label: "rows queryable in-browser · no backend" },
      decisionLog: {
        chose: "DuckDB compiled to WebAssembly, with the browser as the query engine",
        over: "a hosted API and database behind the dashboard",
        because:
          "A served backend needs credentials and a subscription that can lapse — which is exactly what happened when my Azure subscription closed mid-project. Static hosting means the 3.7 MB first tier covers every panel and the 52 MB detail tier is read by HTTP range requests rather than downloaded, so the link cannot expire.",
      },
      tagline:
        "Medallion lakehouse over 9.66M CMS Medicare rows, served as a backend-free analytics app that runs SQL over all of them in the browser",
      description:
        "An end-to-end lakehouse over 9.66 million rows of CMS Medicare physician claims, surfacing five billing anomalies — three confirmed, two refuted — and published as an analytics app a reader can query themselves, with no sign-in and no backend. Bronze → Silver → Gold in PySpark on Delta Lake, Terraform-provisioned on Azure Databricks and ADLS Gen2, with the Gold layer compiled into a tiered Parquet surface behind DuckDB-WASM.",
      technologies: [
        "PySpark",
        "Delta Lake",
        "Azure Databricks",
        "ADLS Gen2",
        "Terraform",
        "DuckDB",
        "WebAssembly",
        "Azure Data Factory",
        "Azure Key Vault",
        "SQL",
        "Python",
        "marimo",
        "Power BI",
      ],
      highlights: [
        "Built a Medallion (Bronze/Silver/Gold) lakehouse processing 9.66M CMS Medicare claim rows in PySpark on Delta Lake, producing a 3-dimension star schema plus 5 purpose-built analytical marts; provisioned the Azure footprint (ADLS Gen2, Key Vault, Data Factory, Databricks) with Terraform",
        "Made all 9.66M rows queryable in the browser with no backend — DuckDB compiled to WebAssembly over a tiered Parquet layout (3.7 MB on first interaction; a 52 MB detail tier read by HTTP range requests rather than downloaded), plus a pivot builder and a SELECT-only SQL box over the full cube, so the analysis can be checked rather than just read",
        "Engineered environment-portable execution — one variable switches every Bronze/Silver/Gold path between ADLS Gen2 and local disk — keeping a single notebook codebase runnable on Databricks or a laptop after the Azure subscription closed mid-project; the rebuild matched the original run's filter delta exactly (395 rows), and removing a multiLine CSV option that made a 3 GB file non-splittable cut full-pipeline runtime to 231 seconds",
        "Gated the interactive layer with a 10-assertion parity suite proving the live SQL reproduces every published figure to the cent; it caught a 41% measurement error (service-weighted where the mart was beneficiary-weighted) and a markup ratio computed from the wrong aggregation grain, both of which produced plausible-looking numbers",
        "Gated the Gold layer with 13 hard data-quality assertions inside a 108-test automated suite, and fixed 3 latent defects found by re-running on different cluster topology, including a float-drift check whose absolute threshold was partition-dependent and two assertions rendered vacuous by a NULL inside isin()",
        "Refuted 2 of 5 original hypotheses and reported them as refuted: identified a \"+2,223% premium\" as an 11-provider denominator artifact, and traced a $2.9B site-of-service anomaly to the dataset excluding the OPPS practice-expense component; small cohorts now carry an automatic reliability badge rather than being silently dropped",
        "Eliminated the page's last single point of failure by vendoring a CDN-hosted charting library against its own published hash, taking first paint to zero external requests — the page renders completely from a local file with no network at all",
      ],
      liveUrl: "https://diazsk.github.io/healthcare-lakehouse-azure/",
      github: "https://github.com/DiazSk/healthcare-lakehouse-azure",
    },
    {
      name: "NYC Taxi Data Lakehouse",
      category: "Data Engineering",
      architecture: [
        { stage: "Land", items: ["S3 · raw Parquet"] },
        { stage: "ETL", items: ["AWS Glue · PySpark"] },
        { stage: "Curated", items: ["S3 · partitioned y/m"] },
        { stage: "Model", items: ["dbt · staging + 3 marts"] },
      ],
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
        "DuckDB",
        "marimo",
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
      architecture: [
        { stage: "Sources", items: ["11 CSV", "3 REST APIs"] },
        { stage: "Bronze", items: ["Raw load"] },
        { stage: "Silver", items: ["Cleaned · normalized"] },
        { stage: "Gold", items: ["Star schema · 5 dim / 2 fact"] },
        { stage: "Serve", items: ["Snowflake"] },
      ],
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
      name: "E-commerce Funnel Lakehouse",
      category: "Analytics Engineering",
      architecture: [
        { stage: "Ingest", items: ["Kaggle REES46 · 109.8M events"] },
        { stage: "Land", items: ["PySpark → Delta · replaceWhere"] },
        { stage: "Model", items: ["dbt · stg → int → fct"] },
        { stage: "Marts", items: ["Funnel daily", "Cart abandonment"] },
        { stage: "Serve", items: ["Static dashboard · GitHub Pages"] },
      ],
      outcomeStatement:
        "Measured Black Friday's effect on a 109.8M-event clickstream: cart reach rose from 9.2% to 11.7% of sessions. Found a four-day tracking gap that reversed every headline result, and excluded it.",
      primaryMetric: { value: "+2.5pp", label: "cart reach · 95% CI +2.46 to +2.55" },
      decisionLog: {
        chose: "Excluding Nov 14–17 from the baseline after finding a tracking gap",
        over: "Reporting the full two-month window as collected",
        because:
          "Nov 15 logged 468,262 carts and zero purchases. With those four days left in the baseline every headline reverses — cart reach reads −1.7 pp instead of +2.5 — and each version still looks statistically solid. A dbt test now warns on any day with carts but no purchases.",
      },
      tagline:
        "Funnel and cart-abandonment analytics on 109.8M real clickstream events, with every comparison carrying a confidence interval",
      description:
        "An end-to-end pipeline over 109.8M REES46 clickstream events from a real store, running entirely on Databricks Free Edition: Kaggle ingestion, PySpark into Delta Lake, dbt models and tests, and an analysis layer that reports effect sizes with 95% confidence intervals rather than bare percentages.",
      technologies: [
        "Databricks",
        "Delta Lake",
        "PySpark",
        "dbt",
        "Unity Catalog",
        "Databricks Asset Bundles",
        "GitHub Actions",
        "pytest",
        "Python",
        "SQL",
      ],
      highlights: [
        "Processed 109.8M REES46 clickstream events (Oct–Nov 2019) on Databricks Free Edition as a single Workflows job defined as code in a Databricks Asset Bundle, with Delta partitioned by event_date and month-scoped replaceWhere overwrites, so re-running a month replaces it and Delta rejects any row dated outside it",
        "Found a four-day tracking gap that reversed the analysis: Nov 15 logged 468,262 carts and zero purchases, and leaving Nov 14–17 in the baseline flips every headline result while still looking statistically solid; a dbt test now warns on any day with carts but no purchases",
        "Reported every comparison as a difference in proportions with a 95% Wald confidence interval — cart reach +2.5 pp (CI +2.46 to +2.55), purchase rate +0.36 pp (CI +0.32 to +0.39) — rather than as bare percentage changes",
        "Built incremental merge models in dbt with unit tests and singular tests for funnel monotonicity and unique mart grains; a from-scratch consistency test on fct_sessions caught a real property of the data, that REES46 session IDs can span weeks",
        "Ran CI with no cloud credentials — lint, pytest and a two-month dbt build on local Spark plus Delta over a synthetic fixture, because the dataset's licence does not permit redistributing rows",
        "Published a static dashboard with hand-built SVG charts whose explorer can put the excluded tracking gap back in, so a reader can see the reversal rather than taking the exclusion on trust",
      ],
      liveUrl: "https://diazsk.github.io/ecommerce-funnel-lakehouse/",
      github: "https://github.com/DiazSk/ecommerce-funnel-lakehouse",
    },
    {
      name: "Real-Time Cryptocurrency Market Analyzer",
      category: "Systems Engineering",
      architecture: [
        { stage: "Ingest", items: ["Coinbase WebSocket · 8 pairs"] },
        { stage: "Stream", items: ["Kafka · 4 partitions"] },
        { stage: "Process", items: ["Flink · event-time OHLCV", "EWMA z-score detector"] },
        { stage: "Store", items: ["TimescaleDB · rollups", "Redis · latest + pub/sub"] },
        { stage: "Serve", items: ["FastAPI · REST + WebSocket", "Next.js terminal"] },
        { stage: "Analyze", items: ["Airflow → dbt · 14 models"] },
      ],
      outcomeStatement:
        "Took every trade for 8 crypto pairs off Coinbase's live feed with zero duplicates and zero missed across 17,969 trades, verified by trade-ID gap tracking, and kept that record through a Flink crash, a Kafka restart and a 30-second Postgres outage.",
      primaryMetric: { value: "12.8ms", label: "p95 REST latency · 1,640 req/s · 0 errors" },
      decisionLog: {
        chose: "Effectively-once JDBC sinks with ON CONFLICT, and transactional Kafka only for alerts",
        over: "Exactly-once delivery everywhere",
        because:
          "A trade row and a candle are idempotent by primary key, so insert-or-skip gets the same end state as a transaction at a fraction of the coordination cost. Alerts are the one sink a downstream consumer reads as events rather than state, so those go through a transactional KafkaSink committed on each 30-second checkpoint.",
      },
      tagline:
        "Streaming pipeline from Coinbase to a Next.js terminal, chaos-tested for zero trade loss",
      description:
        "A streaming data pipeline that takes every trade for 8 crypto pairs from Coinbase's live feed, deduplicates it, rolls it into 1-minute OHLCV candles in event time with Apache Flink, flags unusual moves with an EWMA z-score detector, and serves the result to a Next.js market terminal over REST and WebSocket. An hourly Airflow DAG backfills candles, repairs trade gaps and builds a dbt analytics layer on top.",
      technologies: [
        "Apache Kafka",
        "Apache Flink (Java)",
        "TimescaleDB",
        "Redis",
        "dbt",
        "Apache Airflow",
        "FastAPI",
        "Next.js",
        "TypeScript",
        "Docker Compose",
      ],
      highlights: [
        "Ingested 17,969 trades with 0 duplicates and 0 missed, verified by trade-ID gap tracking, and produced 0 bad candles — every candle carrying trade_count > 0 and low ≤ VWAP ≤ high",
        "Chaos-tested the pipeline: a Flink TaskManager crash, a Kafka broker restart and a 30-second Postgres outage each cost 0 lost trades and 0 inconsistent candles; the Redis scenario surfaced a real bug, an API pub/sub listener that died on redis-py's own ConnectionError so live trades never resumed, now fixed and covered by a test",
        "Measured REST p95 at 12.8 ms across 10 concurrent clients (1,640 req/s, 0 errors) and fanned live updates out to 400 concurrent WebSocket clients at a 1.000 minimum delivery ratio, with p95 exchange-to-client lag of 166 ms",
        "Aggregated candles in event time on the exchange's own trade timestamp, with watermarks allowing 2 seconds of out-of-order data and a 30-second idle timeout, so a candle means the minute a trade happened rather than the minute it arrived",
        "Repaired 57 detected trade gaps, 43 of them exactly by trade ID (68,793 trades, 2,573 candles recomputed), and logged the 14 overnight outages above the 10,000-trade cap rather than silently skipping them",
        "Validated the pipeline against Coinbase's own candles as a mart rather than a test: BTC, ETH, SOL and XRP match the official close price for 99.5–100% of minutes, while thin pairs agree less and POL's close misses remain unexplained and are reported as such",
        "Built a dbt layer of 14 models, 30 data tests and 4 unit tests over ~911k one-minute candles, orchestrated hourly by Airflow through Astronomer Cosmos as 29 discrete tasks",
      ],
      github: "https://github.com/DiazSk/Real-Time-Cryptocurrency-Market-Analyzer",
    },
    {
      name: "Chatflow Messaging System",
      category: "Backend SWE",
      architecture: [
        { stage: "Ingest", items: ["RabbitMQ"] },
        { stage: "Buffer", items: ["In-memory queue"] },
        { stage: "Persist", items: ["Worker threads · JDBC batch"] },
        { stage: "Store", items: ["MySQL"] },
        { stage: "Read", items: ["L1 local + Redis L2", "Stampede guard"] },
      ],
      outcomeStatement:
        "Sustained 21,091 msg/s with zero data loss across 1M messages via write-behind persistence; CQRS isolation prevented write-side failures from starving read queries.",
      primaryMetric: { value: "21,091", label: "msg/s · zero data loss · 1M messages" },
      decisionLog: {
        chose: "Write-behind persistence with in-memory batching, adaptively sized 500/2K/3K by queue depth",
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
        "JMeter",
        "HikariCP",
      ],
      highlights: [
        "Engineered a write-behind persistence pipeline sustaining throughput of 21,091 msg/s with zero data loss across 1M messages by chaining an in-memory blocking queue to dedicated worker threads with adaptive JDBC batch sizing and multi-value insert rewriting",
        "Optimized read-path latency to 13ms at 1M-row scale against a 100ms SLO target by implementing a two-tier caching hierarchy (local memory and Redis with active invalidation) and a mutex-based stampede guard to strictly cap concurrent database queries",
        "Architected a CQRS-style read/write separation that survived a 60-minute endurance test at full load by partitioning HikariCP into isolated reader and writer pools (writer 10, reader 20) bound to a circuit breaker, preventing write-side failures from starving read queries",
        "Sustained 10k+ RPS under a 70/30 read/write JMeter mix with zero message loss across 7 EC2 instances, with Redis absorbing roughly 80% of read traffic through the cache-hit fast path and active DEL invalidation issued on each batch commit",
      ],
      github: "https://github.com/DiazSk/chatflow-messaging-system",
    },
  ],

  targetRole: {
    title: "Data Engineer | SWE/SDE Backend | Analytics Engineer | BI Engineer",
    type: "Full-Time",
    location: "Remote or Seattle, WA",
    availability: "Full-Time from December 2026",
    industries: [
      "FinTech",
      "E-Commerce",
      "Cloud Data Platforms",
      "Big Tech",
    ],
    pitch:
      "I am seeking Full-Time Data Engineering roles starting December 2026, on teams building high-impact distributed systems and cloud-native data infrastructure. I bring hands-on experience across both scalable software backends and complex data platforms, always prioritizing clean architecture, automated testing, and infrastructure as code.",
    strengths: [
      "End-to-end pipeline development (ingestion → transformation → serving)",
      "Both batch (Airflow + dbt) and streaming (Kafka + Flink) architectures",
      "Cloud infrastructure with Terraform and AWS",
      "Data quality engineering with automated testing frameworks",
      "SQL optimization and dimensional data modeling",
    ],
  },

};