# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Primary: technical hiring managers and engineers** evaluating Zaid Shaikh for Data Engineering roles (full-time from December 2026, on graduation). They arrive from a résumé, LinkedIn, or a GitHub link, already skeptical, and are looking for evidence of architectural judgment — not just tool familiarity. They will click through to source code.

**Secondary: non-technical recruiters and sourcers** doing a 5–10 second skim to confirm role fit, location, and availability before passing the profile on. They cannot evaluate architecture and need an outcome and a number they can repeat to someone else.

These two audiences actively distrust content optimized for the other, and both land on the same page. Every surface has to serve the skim and the scrutiny without making either dig through the other's material.

## Product Purpose

A personal portfolio site that converts a cold link into a real conversation about a Data Engineering role. The live ask is **full-time from December 2026**; the Summer/Fall 2026 internship window has closed and must not reappear in copy. Success is a recruiter or hiring manager reaching out, or a technical reader spending long enough to open a repo. It is not a résumé mirror and not a blog; the résumé data is the substrate, the site is the argument.

## Positioning

**Data Engineer first.** When Data Engineering and Backend SWE evaluation criteria conflict, the site resolves in favor of Data Engineering: pipelines, lakehouses, orchestration, and data modeling lead. Backend and distributed-systems work (Chatflow, Crypto Analyzer) stays on the site as supporting evidence of systems depth at scale — it is never the lead claim.

The differentiating claim is **decision quality, not tool inventory**. Hundreds of candidates list Airflow, Kafka, dbt, and Terraform. The defensible position is showing *why* an architecture was chosen — exactly-once semantics under network partition, dual-path storage (Redis hot path vs. TimescaleDB time-series), Medallion layering driven by 14 conflicting source schemas. The claim a neighboring candidate cannot copy: measured throughput and latency numbers attached to a reader-inspectable repo and a stated trade-off.

## Operating Context

- Read in a single sitting, usually once, often on a phone between other candidate tabs.
- Reached from a résumé PDF, a LinkedIn profile, or a GitHub profile link — the reader arrives with partial context and a specific question ("is this person real, and at what level?").
- Deployed on Vercel. Domain to confirm (README names `zaidshaikh.dev`; prior council notes reference `zaid-data.vercel.app`).
- The reader's next action is either opening a GitHub repo in a new tab or copying the email address.

## Capabilities and Constraints

**Current surfaces:** single-page site — Hero, About, Projects (grouped Data Engineering & Analytics / Systems Engineering), Skills, Contact — with a fixed nav and anchor scroll.

**Content source of truth:** `src/constants/resumeData.js` holds personal details, education, experience, projects, and skills. Section components read from it. Hero metrics are currently hardcoded in `src/sections/Hero.jsx`, separate from resumeData.

**Contact:** currently `mailto:` and a copy-email button only. **A real contact form is a planned capability** and should re-wire to the existing Resend handler at `api/contact.js`.

**Retired permanently:** the AI Resume Chat. `api/chat.js` is orphaned dead code — it imports a deleted `src/lib/buildSystemPrompt.js` and nothing in `src/` calls it. It is not coming back in any form, including a reframed "architecture explorer." Do not reintroduce a conversational AI surface to this site.

**Also retired (prior redesign):** the dark space theme, 3D astronaut, orbiting tech cards, and animated flip words. These are anti-references, not dormant features.

**Architecture schematics:** each project carries an `architecture` array in `src/constants/resumeData.js`, rendered by `src/components/ArchitectureDiagram.jsx` inside the expanded project card. Every stage was derived from that project's own description and highlights. **These are pending Zaid's verification** — he agreed to check each before it ships.

**Open / undecided:** production domain; whether project architecture diagrams are republished (see Evidence); whether a résumé PDF is downloadable from the site.

## Brand Commitments

- Name and identity: **Zaid Shaikh**, Seattle, WA. Wordmark is currently the plain text "Zaid."
- Voice: declarative and specific. States what was built and what it measured; no aspiration language, no superlatives, no "passionate about." First person, past tense, numbers over adjectives.
- Real links only: GitHub `DiazSk`, LinkedIn `zaidshaikhengineer`, email `shaikh.zaid@northeastern.edu`.
- **Standing preference: the category standard.** Offered a derived visual world (an engineering-drawing-plate system) against the conventional developer-portfolio canon, Zaid chose the canon, with **linear.app** named as the craft bar. This is a standing preference, not a one-off: future surfaces execute the convention at full fidelity — precise grid, exact spacing, real state detail — rather than reaching for a distinctive world. Recorded 2026-09-16.

## Evidence on Hand

**Confirmed and usable:**

- **Public GitHub repositories** for all six featured projects — browsable source and READMEs. This is the primary and currently the *only* confirmed proof artifact.
- Measured metrics cited in résumé data: 21,091 msg/s sustained (Chatflow), sub-100ms end-to-end latency with exactly-once semantics (Crypto Analyzer), 9.6M records / 80GB (Healthcare Lakehouse on Azure), 2.8M records (NYC Taxi), 146 dbt tests, 4.0 GPA, COLM 2026 paper under review.
- Credentials: MS CS Northeastern (Dec 2026), Graduate TA for Machine Learning, Oracle Cloud Infrastructure Data Science Professional certification.

**Not confirmed — do not treat as evidence:**

- The architecture PNGs in `public/assets/projects/` were **not** confirmed as accurate or current. Do not publish them as authoritative diagrams without Zaid verifying each one.
- **No live dashboards, screen recordings, or GIFs exist** of these systems running. Do not design a surface that depends on one, and never imply a live feed.

**Must never be fabricated:** testimonials, references, employer names, customer logos, press mentions, user counts, revenue or cost-savings figures beyond those already in resumeData, or any claim of professional industry employment. All experience to date is academic, research, or self-directed project work.

**Flagged for review:** the "96.3% dbt test pass rate" still present in resumeData was previously judged a liability (3.7% failing). Confirm with Zaid before it appears on any surface; the safer form is "146 dbt tests across the full pipeline."

## Product Principles

1. **Decisions over tools.** Any surface that lists technologies without the reasoning behind one of them is doing the same thing every other candidate's site does. Lead with the choice and the trade-off; the stack list is a footnote.
2. **Two layers, one page.** Every project presents a plain-English outcome plus one large metric at rest, and architectural depth on demand. Neither audience should have to read past content written for the other.
3. **Numbers are the loudest element.** The measured metrics are the strongest asset. They are never hidden behind an interaction, and nothing decorative outranks them visually.
4. **Data Engineering resolves ties.** When ordering, emphasis, or framing is ambiguous, the Data Engineering reading wins.
5. **Nothing implied that isn't real.** No fake live feeds, no invented social proof, no unverified diagrams. A skeptical engineer catching one inflated claim discards the entire site.

## Accessibility & Inclusion

No product-specific standard has been established. Baseline expectations apply: full keyboard operability, visible focus states, real semantic landmarks, and text contrast that holds on the off-white surface — the current palette runs light (`--color-ink-muted: #A3A3A3` on `#FAFAF9` is below 4.5:1 for body text and must not carry meaning at small sizes).
