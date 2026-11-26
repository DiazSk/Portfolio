/* generated from src/constants/resumeData.js: every word below is copied, none written here */
export type Project = { name: string; short: string; category: string; tagline: string; metric: { value: string; label: string }; arch: { stage: string; items: string[] }[]; decision: { chose: string; over: string; because: string }; highlights: string[]; tech: string[]; github: string; live: string | null; photo?: string };
export const PROJECTS: Project[] = [
 {
  "name": "Medicare Reimbursement Gap Analyzer",
  "short": "Medicare Gap Analyzer",
  "category": "Data Engineering",
  "tagline": "Medallion lakehouse over 9.66M CMS Medicare rows, served as a backend-free analytics app that runs SQL over all of them in the browser",
  "metric": {
   "value": "9.66M",
   "label": "rows queryable in-browser · no backend"
  },
  "arch": [
   {
    "stage": "Ingest",
    "items": [
     "CMS physician claims"
    ]
   },
   {
    "stage": "Bronze",
    "items": [
     "ADLS Gen2 · Delta Lake"
    ]
   },
   {
    "stage": "Silver",
    "items": [
     "Databricks PySpark"
    ]
   },
   {
    "stage": "Gold",
    "items": [
     "Star schema · 5 marts",
     "13 quality assertions"
    ]
   },
   {
    "stage": "Serve",
    "items": [
     "Tiered Parquet",
     "DuckDB-WASM · in-browser"
    ]
   }
  ],
  "decision": {
   "chose": "DuckDB compiled to WebAssembly, with the browser as the query engine",
   "over": "a hosted API and database behind the dashboard",
   "because": "A served backend needs credentials and a subscription that can lapse — which is exactly what happened when my Azure subscription closed mid-project. Static hosting means the 3.7 MB first tier covers every panel and the 52 MB detail tier is read by HTTP range requests rather than downloaded, so the link cannot expire."
  },
  "highlights": [
   "Built a Medallion (Bronze/Silver/Gold) lakehouse processing 9.66M CMS Medicare provider-service rows in PySpark on Delta Lake, producing a 3-dimension star schema plus 5 purpose-built analytical marts; provisioned the Azure footprint (ADLS Gen2, Key Vault, Data Factory, Databricks) with Terraform",
   "Made all 9.66M rows queryable in the browser with no backend — DuckDB compiled to WebAssembly over a tiered Parquet layout (3.7 MB on first interaction; a 52 MB detail tier read by HTTP range requests rather than downloaded), plus a pivot builder and a SELECT-only SQL box over the full cube, so the analysis can be checked rather than just read",
   "Engineered environment-portable execution — one variable switches every Bronze/Silver/Gold path between ADLS Gen2 and local disk — keeping a single notebook codebase runnable on Databricks or a laptop after the Azure subscription closed mid-project; the rebuild matched the original run's filter delta exactly (395 rows), and removing a multiLine CSV option that made a 3 GB file non-splittable cut full-pipeline runtime to 231 seconds"
  ],
  "tech": [
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
   "marimo"
  ],
  "github": "https://github.com/DiazSk/medicare-reimbursement-gap-analyzer",
  "live": "https://diazsk.github.io/medicare-reimbursement-gap-analyzer/"
 },
 {
  "name": "NYC Taxi Data Lakehouse",
  "short": "NYC Taxi Lakehouse",
  "category": "Data Engineering",
  "tagline": "Cloud-native lakehouse processing 2.8M+ taxi records on AWS",
  "metric": {
   "value": "2.8M",
   "label": "clean records · 96.8% retention"
  },
  "arch": [
   {
    "stage": "Land",
    "items": [
     "S3 · raw Parquet"
    ]
   },
   {
    "stage": "ETL",
    "items": [
     "AWS Glue · PySpark"
    ]
   },
   {
    "stage": "Curated",
    "items": [
     "S3 · partitioned y/m"
    ]
   },
   {
    "stage": "Model",
    "items": [
     "dbt · staging + 3 marts"
    ]
   }
  ],
  "decision": {
   "chose": "AWS Glue (serverless managed Spark) for ETL",
   "over": "AWS Athena querying raw S3 Parquet directly with no ETL layer",
   "because": "Athena's $5/TB scan cost would compound across every dbt model run once the pipeline scales toward the full 100GB+ TLC catalog; Glue runs deduplication, schema normalization, and null-handling once at ingest, producing the 96.8% retention rate as a durable, guaranteed fact rather than a per-query assumption, at the cost of an explicit ETL step."
  },
  "highlights": [
   "Provisioned AWS cloud infrastructure (S3 data lake, Glue serverless Spark jobs, IAM roles) using Terraform IaC, enabling reproducible deployments across environments",
   "Processed 2,847,234 NYC taxi trip records (Parquet) through PySpark ETL on AWS Glue with null and quality filters, retaining 96.8% (2,756,432 clean records) partitioned by year/month",
   "Automated daily batch pipeline via Airflow DAG with GlueJobOperator; built dbt analytics layer (staging view + 3 mart tables) with data quality tests on distance, duration, and passenger ranges"
  ],
  "tech": [
   "Terraform",
   "AWS S3",
   "AWS Glue",
   "Apache Airflow",
   "PySpark",
   "dbt",
   "DuckDB",
   "marimo",
   "Docker"
  ],
  "github": "https://github.com/DiazSk/nyc-taxi-data-lakehouse",
  "live": null
 },
 {
  "name": "E-commerce Funnel Lakehouse",
  "short": "Funnel Lakehouse",
  "category": "Analytics Engineering",
  "tagline": "Funnel and cart-abandonment analytics on 109.8M real clickstream events, with every comparison carrying a confidence interval",
  "metric": {
   "value": "+2.5pp",
   "label": "cart reach · 95% CI +2.46 to +2.55"
  },
  "arch": [
   {
    "stage": "Ingest",
    "items": [
     "Kaggle REES46 · 109.8M events"
    ]
   },
   {
    "stage": "Land",
    "items": [
     "PySpark → Delta · replaceWhere"
    ]
   },
   {
    "stage": "Model",
    "items": [
     "dbt · stg → int → fct"
    ]
   },
   {
    "stage": "Marts",
    "items": [
     "Funnel daily",
     "Cart abandonment"
    ]
   },
   {
    "stage": "Serve",
    "items": [
     "Static dashboard · GitHub Pages"
    ]
   }
  ],
  "decision": {
   "chose": "Excluding Nov 14–17 from the baseline after finding a tracking gap",
   "over": "Reporting the full two-month window as collected",
   "because": "Nov 15 logged 468,262 carts and zero purchases. With those four days left in the baseline every headline reverses — cart reach reads −1.7 pp instead of +2.5 — and each version still looks statistically solid. A dbt test now warns on any day with carts but no purchases."
  },
  "highlights": [
   "Processed 109.8M REES46 clickstream events (Oct–Nov 2019) on Databricks Free Edition as a single Workflows job defined as code in a Databricks Asset Bundle, with Delta partitioned by event_date and month-scoped replaceWhere overwrites, so re-running a month replaces it and Delta rejects any row dated outside it",
   "Found a four-day tracking gap that reversed the analysis: Nov 15 logged 468,262 carts and zero purchases, and leaving Nov 14–17 in the baseline flips every headline result while still looking statistically solid; a dbt test now warns on any day with carts but no purchases",
   "Reported every comparison as a difference in proportions with a 95% Wald confidence interval — cart reach +2.5 pp (CI +2.46 to +2.55), purchase rate +0.36 pp (CI +0.32 to +0.39) — rather than as bare percentage changes"
  ],
  "tech": [
   "Databricks",
   "Delta Lake",
   "PySpark",
   "dbt",
   "Unity Catalog",
   "Databricks Asset Bundles",
   "GitHub Actions",
   "pytest",
   "Python",
   "SQL"
  ],
  "github": "https://github.com/DiazSk/ecommerce-funnel-lakehouse",
  "live": "https://diazsk.github.io/ecommerce-funnel-lakehouse/"
 },
 {
  "name": "E-Commerce Data Warehouse (Olist)",
  "short": "Olist Warehouse",
  "category": "Analytics Engineering",
  "tagline": "Medallion Architecture warehouse integrating 14 data sources with 1.6M records",
  "metric": {
   "value": "90%",
   "label": "query latency reduction"
  },
  "arch": [
   {
    "stage": "Sources",
    "items": [
     "11 CSV",
     "3 REST APIs"
    ]
   },
   {
    "stage": "Bronze",
    "items": [
     "Raw load"
    ]
   },
   {
    "stage": "Silver",
    "items": [
     "Cleaned · normalized"
    ]
   },
   {
    "stage": "Gold",
    "items": [
     "Star schema · 5 dim / 2 fact"
    ]
   },
   {
    "stage": "Serve",
    "items": [
     "Snowflake"
    ]
   }
  ],
  "decision": {
   "chose": "A strict star schema with two distinct grain-specific fact tables (orders vs. items)",
   "over": "A fully normalized snowflake schema or a single denormalized wide table",
   "because": "A snowflake schema would introduce excessive join latency for read-heavy OLAP queries, while combining grains into a single fact table would cause double-counting in aggregations. The star schema traded storage redundancy for a 90% query latency reduction."
  },
  "highlights": [
   "Designed a Medallion-architecture data warehouse (Bronze → Silver → Gold), centralizing 14 sources (11 CSVs, 3 APIs) for revenue analytics on 1.6M+ records with a star schema design of 5 dimensions, 2 facts, and 1 bridge table",
   "Reduced SQL query latency by 90% (5–10s to <1s) through query tuning, refactoring joins, and data normalization for wide tables from 30+ to 13 columns",
   "Migrated the full automated cloud data pipelines from PostgreSQL to Snowflake cloud DWH, leveraged AI-assisted coding tools for rapid development of Python-based data transformations and stored procedures"
  ],
  "tech": [
   "Python",
   "PostgreSQL",
   "Snowflake",
   "Apache Airflow",
   "Docker",
   "marimo"
  ],
  "github": "https://github.com/DiazSk/sql-data-warehouse-project",
  "live": null
 },
 {
  "name": "Real-Time Cryptocurrency Market Analyzer",
  "short": "Crypto Market Analyzer",
  "category": "Systems Engineering",
  "tagline": "Streaming pipeline from Coinbase to a Next.js terminal, chaos-tested for zero trade loss",
  "metric": {
   "value": "12.8ms",
   "label": "p95 REST latency · 1,640 req/s · 0 errors"
  },
  "arch": [
   {
    "stage": "Ingest",
    "items": [
     "Coinbase WebSocket · 8 pairs"
    ]
   },
   {
    "stage": "Stream",
    "items": [
     "Kafka · 4 partitions"
    ]
   },
   {
    "stage": "Process",
    "items": [
     "Flink · event-time OHLCV",
     "EWMA z-score detector"
    ]
   },
   {
    "stage": "Store",
    "items": [
     "TimescaleDB · rollups",
     "Redis · latest + pub/sub"
    ]
   },
   {
    "stage": "Serve",
    "items": [
     "FastAPI · REST + WebSocket",
     "Next.js terminal"
    ]
   },
   {
    "stage": "Analyze",
    "items": [
     "Airflow → dbt · 14 models"
    ]
   }
  ],
  "decision": {
   "chose": "Effectively-once JDBC sinks with ON CONFLICT, and transactional Kafka only for alerts",
   "over": "Exactly-once delivery everywhere",
   "because": "A trade row and a candle are idempotent by primary key, so insert-or-skip gets the same end state as a transaction at a fraction of the coordination cost. Alerts are the one sink a downstream consumer reads as events rather than state, so those go through a transactional KafkaSink committed on each 30-second checkpoint."
  },
  "highlights": [
   "Ingested 17,969 trades with 0 duplicates and 0 missed, verified by trade-ID gap tracking, and produced 0 bad candles — every candle carrying trade_count > 0 and low ≤ VWAP ≤ high",
   "Chaos-tested the pipeline: a Flink TaskManager crash, a Kafka broker restart and a 30-second Postgres outage each cost 0 lost trades and 0 inconsistent candles; the Redis scenario surfaced a real bug, an API pub/sub listener that died on redis-py's own ConnectionError so live trades never resumed, now fixed and covered by a test",
   "Measured REST p95 at 12.8 ms across 10 concurrent clients (1,640 req/s, 0 errors) and fanned live updates out to 400 concurrent WebSocket clients at a 1.000 minimum delivery ratio, with p95 exchange-to-client lag of 166 ms"
  ],
  "tech": [
   "Apache Kafka",
   "Apache Flink (Java)",
   "TimescaleDB",
   "Redis",
   "dbt",
   "Apache Airflow",
   "FastAPI",
   "Next.js",
   "TypeScript",
   "Docker Compose"
  ],
  "github": "https://github.com/DiazSk/Real-Time-Cryptocurrency-Market-Analyzer",
  "live": null
 },
 {
  "name": "Chatflow Messaging System",
  "short": "Chatflow",
  "category": "Backend SWE",
  "tagline": "High-throughput messaging architecture handling 21,091 msg/s with CQRS read/write separation",
  "metric": {
   "value": "21,091",
   "label": "msg/s · 99.98% persisted · 1M messages"
  },
  "arch": [
   {
    "stage": "Ingest",
    "items": [
     "RabbitMQ"
    ]
   },
   {
    "stage": "Buffer",
    "items": [
     "In-memory queue"
    ]
   },
   {
    "stage": "Persist",
    "items": [
     "Worker threads · JDBC batch"
    ]
   },
   {
    "stage": "Store",
    "items": [
     "MySQL"
    ]
   },
   {
    "stage": "Read",
    "items": [
     "L1 local + Redis L2",
     "Stampede guard"
    ]
   }
  ],
  "decision": {
   "chose": "Write-behind persistence with in-memory batching, adaptively sized 500/2K/3K by queue depth",
   "over": "Small fixed batches committed as messages arrive",
   "because": "A batch-size experiment showed per-commit overhead dominating: 100-row batches wrote ~2,000 msg/s and 5,000-row batches ~10,000 msg/s, a 5× gain. Production was capped at 3,000 rows after the OOM killer stopped 5,000-row runs on a t3.small, and write-behind accepted a mitigated crash-loss window in exchange."
  },
  "highlights": [
   "Engineered a write-behind persistence pipeline sustaining throughput of 21,091 msg/s with 99.98% persisted across 1M messages by chaining an in-memory blocking queue to dedicated worker threads with adaptive JDBC batch sizing and multi-value insert rewriting",
   "Optimized read-path latency to 13ms at 1M-row scale against a 100ms SLO target by implementing a two-tier caching hierarchy (local memory and Redis with active invalidation) and a mutex-based stampede guard to strictly cap concurrent database queries",
   "Architected a CQRS-style read/write separation that survived a 60-minute endurance test at full load by partitioning HikariCP into isolated reader and writer pools (a 20-connection read-only reader pool) bound to a circuit breaker, preventing write-side failures from starving read queries"
  ],
  "tech": [
   "Java",
   "RabbitMQ",
   "Redis",
   "MySQL",
   "WebSockets",
   "AWS EC2",
   "JMeter",
   "HikariCP"
  ],
  "github": "https://github.com/DiazSk/chatflow-messaging-system",
  "live": null
 },
 {
  "name": "TripMate",
  "short": "TripMate",
  "category": "Systems Engineering",
  "tagline": "AI trip planner that checks its plan against real forecast, holiday and opening-hours data",
  "metric": {
   "value": "41s",
   "label": "median story latency, from 108s · every model call traced"
  },
  "arch": [
   {
    "stage": "Clients",
    "items": [
     "Next.js web · 3D map",
     "Expo iPhone app"
    ]
   },
   {
    "stage": "API",
    "items": [
     "52 route handlers · REST + SSE"
    ]
   },
   {
    "stage": "Facts",
    "items": [
     "Forecast · holidays · OSM hours",
     "Fail-soft fetchers"
    ]
   },
   {
    "stage": "Model",
    "items": [
     "runClaude() · every call traced",
     "Evidence-id grounding"
    ]
   },
   {
    "stage": "Store",
    "items": [
     "SQLite / Turso · libsql"
    ]
   }
  ],
  "decision": {
   "chose": "Rendering places, months and sources only from the fetched evidence records the model's ids point at",
   "over": "Asking the model in the prompt to cite its sources",
   "because": "A prompt can ask for honesty but cannot enforce it. A model told to cite will still name a plausible restaurant that was never fetched. So the model returns ids, the page draws names from the records those ids resolve to, and a single id the evidence does not hold replaces the whole answer with an honest \"nothing checked\"."
  },
  "highlights": [
   "Routed every model call through one dispatcher that writes a trace row on every outcome (success, timeout, malformed reply) across two transports, the Claude CLI and the Anthropic API, with the same contract for callers",
   "Used those traces to find a background model call the CLI made on 87 of 88 requests, and removed it; a 2,048-token thinking budget then cut median story-script latency from 108s to 41s, with rule-breaks per script measured against the default before shipping",
   "Made the assistant unable to show an invented place: answers render only from evidence records the model's ids resolve to, and one unknown id replaces the answer with \"nothing checked\""
  ],
  "tech": [
   "Next.js 16",
   "React 19",
   "TypeScript",
   "Expo / React Native",
   "SQLite (libsql / Turso)",
   "Claude API",
   "MapLibre GL",
   "CesiumJS",
   "WebGPU",
   "Playwright"
  ],
  "github": "https://github.com/DiazSk/tripmate",
  "live": null
 }
];
