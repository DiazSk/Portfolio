/* The kit at the end of Work. The locked stack (2026-11-26): 15 data-engineering tools + 6 software & AI tools, each joined to the builds
   that used it. Every decision, reason and number below is quoted from the project data (W1Data); nothing estimated. */
export type Group = "de" | "swe";
/* each logo in its original colours: Devicon where it has the mark, gilbarbara/logos (pinned commit) where it doesn't */
export type Tool = { name: string; group: Group; used: string[]; logos: string[]; sym: string };
const DI = "https://cdn.jsdelivr.net/npm/devicon@2.16.0/icons/";
const GB = "https://cdn.jsdelivr.net/gh/gilbarbara/logos@875d71c5a8e4aa90a33f8b3ea15b8945de9cc183/logos/";
const di = (n: string, v = "original") => `${DI}${n}/${n}-${v}.svg`;
const gb = (n: string) => `${GB}${n}.svg`;
const t = (name: string, group: Group, used: string[], sym: string, ...logos: string[]): Tool => ({ name, group, used, sym, logos });

export const BUILDS: Record<string, string> = {
  MED: "Medicare Reimbursement Gap Analyzer", NYC: "NYC Taxi Data Lakehouse", FUN: "E-commerce Funnel Lakehouse",
  OLI: "E-Commerce Data Warehouse (Olist)", CRY: "Real-Time Cryptocurrency Market Analyzer", CHA: "Chatflow Messaging System", TRI: "TripMate",
};
export const SHORT: Record<string, string> = { MED: "Medicare", NYC: "NYC Taxi", FUN: "Funnel", OLI: "Olist", CRY: "Crypto", CHA: "Chatflow", TRI: "TripMate" };

export const TOOLS: Tool[] = [
  t("Python", "de", ["MED", "FUN", "OLI"], "Py", di("python")),
  t("Java", "de", ["CRY", "CHA"], "Ja", di("java")),
  t("SQL", "de", ["MED", "FUN"], "SQL"),
  t("Spark", "de", ["MED", "NYC", "FUN"], "Sp", di("apachespark")),
  t("Databricks + Delta Lake", "de", ["MED", "FUN"], "Db", gb("databricks-icon")),
  t("Kafka", "de", ["CRY"], "Kf", di("apachekafka")),
  t("Flink", "de", ["CRY"], "Fl", gb("apache-flink-icon")),
  t("Airflow", "de", ["NYC", "OLI", "CRY"], "Af", di("apacheairflow")),
  t("dbt", "de", ["NYC", "FUN", "CRY"], "dbt", gb("dbt-icon")),
  t("Snowflake", "de", ["OLI"], "Sf", gb("snowflake-icon")),
  t("PostgreSQL", "de", ["OLI"], "Pg", di("postgresql")),
  t("DuckDB", "de", ["MED", "NYC"], "Dk", gb("duckdb-icon")),
  t("AWS · Azure", "de", ["MED", "NYC", "CHA"], "☁", di("amazonwebservices", "original-wordmark"), di("azure")),
  t("Docker", "de", ["NYC", "OLI", "CRY"], "Dc", di("docker")),
  t("Terraform", "de", ["MED", "NYC"], "Tf", di("terraform")),
  t("TypeScript", "swe", ["CRY", "TRI"], "TS", di("typescript")),
  t("Next.js", "swe", ["CRY", "TRI"], "Nx", di("nextjs")),
  t("Claude API", "swe", ["TRI"], "AI", gb("claude-icon")),
  t("RabbitMQ", "swe", ["CHA"], "Rq", di("rabbitmq")),
  t("MySQL", "swe", ["CHA"], "My", di("mysql")),
  t("WebSockets", "swe", ["CHA"], "WS", gb("websocket")),
];
export const tool = (n: string) => TOOLS.find(x => x.name === n)!;

/* the 21 tools grouped by system layer, never alphabetically (each tool sits in exactly one layer) */
export const LAYERS: { k: string; name: string; tools: string[] }[] = [
  { k: "lang", name: "Languages", tools: ["Python", "Java", "SQL", "TypeScript"] },
  { k: "stream", name: "Streaming & messaging", tools: ["Kafka", "Flink", "RabbitMQ", "WebSockets"] },
  { k: "compute", name: "Compute & transform", tools: ["Spark", "Databricks + Delta Lake", "dbt"] },
  { k: "store", name: "Storage & warehouse", tools: ["Snowflake", "PostgreSQL", "DuckDB", "MySQL"] },
  { k: "ship", name: "Orchestration & infra", tools: ["Airflow", "Docker", "Terraform", "AWS · Azure"] },
  { k: "apps", name: "Apps & AI", tools: ["Next.js", "Claude API"] },
];
export const KEYS = Object.keys(SHORT);
export const pad2 = (n: number) => String(n).padStart(2, "0");
export const plural = (n: number, w: string) => `${n} ${w}${n === 1 ? "" : "s"}`;
