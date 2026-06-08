# Council Verdict: Developer Portfolio Redesign

> **Context:** Zaid Shaikh is a Master's CS student at Northeastern (4.0 GPA, Dec 2026 graduation, Seattle) rebuilding his developer portfolio at https://zaid-data.vercel.app/ to land Data Engineer and Backend SWE roles at Big Tech, FinTech, and cloud platforms for Summer/Fall 2026.

---

## Current Site Summary

- **Stack:** Dark space-themed React/Three.js app
- **Hero:** Floating 3D astronaut, animated flip words — "Data Engineer Building [Scalable/Production-Ready/Real-Time/Optimized] Data Pipelines"
- **About:** Bento grid with orbiting tech cards (Airflow, Kafka, Flink, dbt+SQL, Terraform), 3D globe, "Looking for a Data Engineer?" CTA
- **Skills:** 6 category grids with pill tags
- **Projects:** Alternating timeline accordion cards — click to expand highlights + tech tags + GitHub link
- **Other:** AI Resume Chat section
- **Design:** Font Funnel Display; colors near-black (#030412), purple accents, glassmorphism cards

### 6 Featured Projects

1. **Healthcare Lakehouse on Azure** — 9.6M records, 80GB, ADF + Databricks + Medallion + Power BI
2. **NYC Taxi Lakehouse** — AWS, 2.8M records, Glue + Airflow + dbt
3. **E-Commerce Data Warehouse/Olist** — Medallion, 14 sources, 1.6M records, Snowflake, 90% query speedup
4. **Scalable Analytics Platform** — 146 dbt tests, 96.3% pass rate, SCD Type 2
5. **Real-Time Crypto Analyzer** — Kafka + Flink, sub-100ms, Redis/TimescaleDB, dual-path storage, exactly-once semantics
6. **Chatflow Messaging System** — 21,091 msg/s, CQRS, RabbitMQ + Redis + MySQL, Java

### Redesign Goals

Minimalist "quiet luxury" aesthetic (clean lines, whitespace, typography-first, high signal-to-noise ratio). Must impress both a non-technical recruiter (5-second skim) and a deeply technical Engineering Manager who will scrutinize the architecture. The hardest problem: making invisible backend/data engineering work feel tangible and impressive visually.

---

## Where the Council Agrees

- **Kill the space theme.** Every advisor reached this conclusion independently, from every angle. Dark glassmorphism + 3D astronaut signals "junior dev showing off Three.js" — the exact wrong message for Data Engineering and Backend SWE roles. This is the highest-confidence signal from the entire council.

- **The metrics are your strongest asset, and they're buried.** `21,091 msg/s`, `sub-100ms latency`, `9.6M records` — these are the only things cutting through to both audience types. They are currently hidden behind accordion clicks. They must be visible on the *collapsed* card, not discovered only after interaction.

- **The flip words are doing damage.** "Scalable / Production-Ready / Real-Time / Optimized" is exactly what 500 other DE candidates write. Not a neutral design choice — it actively signals junior-level framing.

- **The AI Resume Chat is a liability for target roles.** For Data Engineering and Backend SWE specifically, it signals LLM interest over infrastructure interest. A skeptical Engineering Manager reads it as: *"this person needed an AI to explain their own resume."* Remove it, or radically reframe it as "explore the technical architecture of any project."

---

## Where the Council Clashes

### Live embeds vs. static diagrams

The Expansionist says: embed a real-time Kafka feed — Engineering Managers will spend 10 minutes instead of 10 seconds. The Executor (and all 5 peer reviewers) counter: a dead embed during a recruiter's 6-second visit is *categorically worse* than a static diagram. A broken live feed signals unreliability — the one thing a DE candidate cannot afford.

**→ The council sides with the Executor.** Record a 15-second screen capture of your live system at peak load. Convert to an autoplay muted GIF. You get 90% of the credibility signal with zero availability risk.

### How much the visual redesign matters

First Principles says the redesign is a distraction — signal must come first. Executor says the space theme is so damaging it must go before anything else. These are not incompatible: the visual change is necessary but not sufficient. Removing the theme without fixing the signal is table stakes. Fixing the signal while keeping the theme is diluted. Do both, in that order.

### The 96.3% dbt pass rate

The Contrarian calls it a liability — 3.7% of tests fail. **The council sides with the Contrarian.** Remove this stat. Replace with "146 dbt tests across the full pipeline." Either fix the failing tests before republishing the percentage, or describe what they cover and why they're acceptable.

---

## Blind Spots the Council Caught

### Nobody solved the dual-audience structural problem

Every advisor wrote for one audience. The peer review surfaced what none of them proposed: a concrete page architecture that serves both the non-technical recruiter (6-second scan, needs to feel an outcome) and the Engineering Manager (needs decision quality and architectural depth). These audiences don't just prefer different things — they actively distrust content optimized for the other.

**The solution:** a two-layer information architecture on every project card.

- **Layer 1 (collapsed, always visible):** One plain-English outcome statement + one jaw-dropping metric
  - *Example: "Processed 9.6M hospital records across 3 quality layers with zero loss during ingestion failures — 35% compute cost reduction"*
- **Layer 2 (expanded, on click):** Architecture diagram + technology decision log + the trade-off that was made

This serves both audiences on the same page without forcing either to dig through content written for the other.

### The dual-role positioning problem

"Data Engineer and Backend SWE" have partially contradictory evaluation criteria. DE evaluates pipeline reliability, data modeling, and orchestration. Backend SWE evaluates system design, API architecture, and latency/throughput. The Chatflow Messaging System (CQRS, RabbitMQ, 21K msg/s) is your strongest Backend SWE signal — but it's currently presented identically to DE projects. Consider whether these projects need a structural separation or label to help EMs self-select the relevant depth.

---

## The Recommendation

### Keep

- The numbers (move them to the front of every card)
- The Chatflow project — it's your most technically defensible project under EM scrutiny
- The overall section structure
- The GitHub links

### Kill

- The space theme, 3D astronaut, orbiting cards, flip words, the 96.3% stat
- Seriously reconsider the AI Resume Chat

### Visual redesign direction

Off-white or `#FAFAF9` background, Inter or Geist typeface, one accent color. This is not minimalism for aesthetics — it's minimalism as a *forcing function*. White space makes the metrics the loudest thing on the page by default.

### How to present the Medallion Architecture

*(Healthcare Lakehouse, Olist, NYC Taxi)*

Don't draw three labeled boxes. Visualize the *decision* that made layering necessary. One clean diagram: raw schema on the left → transformation logic in the middle → Gold-layer business query on the right. Below it, one sentence of decision rationale:

> *"Bronze preserves raw source fidelity for reprocessing; Silver normalizes across 14 source schemas; Gold is pre-aggregated for the specific Power BI query patterns that were running 90% slower before the warehouse."*

That sentence is what an EM reads and thinks: *this person understood **why**, not just how.*

### How to present the Real-Time Crypto Analyzer

The current headline is wrong. "Sub-100ms latency" is a benchmark. "Exactly-once semantics under network partition via Kafka offset commits + Flink checkpointing" is a *decision* — lead with the decision, follow with the benchmark as evidence. Embed a 15-second GIF of your Flink metrics dashboard during a throughput spike (autoplay, muted). Surface the dual-path storage choice explicitly: one line explaining *why two stores instead of one* (Redis for hot-path sub-1ms reads, TimescaleDB for time-series analytics) — this is genuinely interesting architectural thinking.

### On decision logs

*(The strongest suggestion from the entire council)*

Implement for exactly *two* projects — the Crypto Analyzer and Healthcare Lakehouse. These have the most defensible, non-obvious architectural decisions. One visible sentence each: "I chose X over Y because Z." Don't apply it to all six — it reads as a template. Do it where the decision was genuinely hard.

---

## The One Thing to Do First

**Remove the space theme, the 3D astronaut, and the flip words — and replace the hero with a single declarative sentence followed by your three largest metrics displayed statically.**

Every other improvement — the architecture diagrams, decision logs, GIFs, dual-layer card structure — gets amplified on a clean foundation and is *partially wasted* on the current one. The current aesthetic is actively filtering out the technical credibility the rest of the site is trying to build. That is the one thing to fix first, before you touch anything else.
