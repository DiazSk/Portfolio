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

**Content source of truth:** `src/constants/resumeData.js` holds personal details, education, experience, projects, and skills. Section components read from it. Hero metrics are currently hardcoded in `src/sections/Hero.jsx`, separate from resumeData. As of 2026-09-18 that row sits **below the fold**, under the field viewport: the first viewport carries four blocks, and the one number left in it is the 9.66M inside the live-dashboard link, stated in a sentence rather than broken out. The metrics are still at rest and still the loudest row on the page, which is what "never hidden behind an interaction" requires — but a reader who never scrolls now sees no measured number. That trade was made deliberately; reversing it means putting the row back in the first viewport, not adding a fourth number somewhere else.

The measurement rows state each number against the baseline it beat, and every figure is lifted from the decision logs in resumeData: ~500 msg/s write-through vs 21,091 write-behind, the 3.7 MB first tier vs the 52 MB detail tier. **One figure is derived rather than quoted — "42x the design it replaced" is 21,091 / ~500.** It is arithmetic on two documented numbers from the same log, not a new claim, but it is the only number on the site that is computed rather than measured; drop it if that bothers you.

The first viewport is now the field itself — the name at full screen width, with role, location, availability, email and the live-dashboard link as small mono readings on the bottom edge. Everything a 5–10 second skim needs is still there; it is arranged as a frame instead of a stack.

**Contact:** currently `mailto:` and a copy-email button only. **A real contact form is a planned capability** and should re-wire to the existing Resend handler at `api/contact.js`.

**Retired permanently:** the AI Resume Chat. `api/chat.js` has been deleted (2026-09-16): it imported both a deleted `src/lib/buildSystemPrompt.js` and an `openai` package that was never in `package.json`, so it would have failed the Vercel function build. It is not coming back in any form, including a reframed "architecture explorer." Do not reintroduce a conversational AI surface to this site.

**Also retired (prior redesign):** the dark space theme, 3D astronaut, orbiting tech cards, and animated flip words. These are anti-references, not dormant features.

**Architecture schematics:** each project carries an `architecture` array in `src/constants/resumeData.js`, rendered by `src/components/ArchitectureDiagram.jsx` inside the expanded project card. Every stage was derived from that project's own description and highlights. **Five of the six are pending Zaid's verification** — he agreed to check each before it ships. The Medicare Gap Analyzer's stages are derived from his own verified `resume-bullets.md` and need no further check. They are the site's only architecture visuals now that the unverified PNGs are gone.

**No social preview image.** `index.html` declares no `og:image` or `twitter:image`, so shared links render without a thumbnail. Open decision, not an oversight to fix silently.

**Open / undecided:** production domain; whether project architecture diagrams are republished (see Evidence); whether a résumé PDF is downloadable from the site.

## Brand Commitments

- Name and identity: **Zaid Shaikh**, Seattle, WA. Wordmark is currently the plain text "Zaid."
- Voice: declarative and specific. States what was built and what it measured; no aspiration language, no superlatives, no "passionate about." First person, past tense, numbers over adjectives.
- Real links only: GitHub `DiazSk`, LinkedIn `zaidshaikhengineer`, email `shaikh.zaid@northeastern.edu`.
- **Standing preference: bold editorial, pinned from references (2026-09-17).** This replaces the earlier "category standard / linear.app" preference, which Zaid found boring. He supplied Dribbble references (Orbix Studio, Yucale Studio, CREATIQ, LAIN) and asked for premium, techy, bold, playful, strong, with modern motion and real typography pairings. His reasoning: he practises software engineering as well as data engineering, so demonstrated interface craft is legitimate signal.
  The world: near-black ground, **one signal vermilion `#FF3B14` held as a field** (whole regions, never scattered accents), **Bricolage Grotesque** at poster scale, **Azeret Mono** on every measurement, Inter for prose only. Vermilion was chosen against the competitive landscape, not by taste — teal-on-navy is brittanychiang's signature and the most-cloned engineer portfolio, violet is Linear's brand and the AI-generated cluster Zaid named as his failure mode. **Black type on the field, never white:** white measures 3.57:1 there and fails AA.

## Evidence on Hand

**Confirmed and usable:**

- **A live, interactive dashboard** for the Medicare Reimbursement Gap Analyzer: <https://diazsk.github.io/healthcare-lakehouse-azure/>. DuckDB-WASM over tiered Parquet, so a reader queries all 9.66M rows in their own browser — no backend, no sign-in, nothing that can expire. This is the strongest proof artifact on the site and the only one a reader can operate. Linked from the hero and from the project card.
- **Public GitHub repositories** for all six featured projects — browsable source and READMEs.
- Measured metrics cited in résumé data: 21,091 msg/s sustained (Chatflow), sub-100ms end-to-end latency with exactly-once semantics (Crypto Analyzer), 9.66M CMS rows (Medicare Gap Analyzer), 2.8M records (NYC Taxi), 146 dbt tests, 4.0 GPA.
- Credentials: MS CS Northeastern (Dec 2026, 4.0 GPA), Graduate TA for Machine Learning, BE Computer Engineering from St. Francis Institute of Technology, Mumbai (2020 — 2024). **The Oracle Cloud Infrastructure Data Science Professional certification was removed from the site on Zaid's instruction (2026-09-18)**, replaced in the credentials record by the bachelor's degree. The certification is still real; it is simply not shown.
- Research: co-authored *The Laundering Effect*, formalizing cumulative semantic erosion under iterative LLM paraphrasing across 36,800+ records. **Submitted to COLM 2026 and rejected (confirmed 2026-09-17).** The research contribution is real and stays on the site; the venue is never named. Do not describe it as under review, forthcoming, or published.

**Not confirmed — do not treat as evidence:**

- The architecture PNGs formerly in `public/assets/projects/` were never confirmed as accurate and have been deleted (2026-09-16) along with the rest of the retired space-theme assets — 28MB, of which only the favicon was referenced. They remain in git history if ever needed. The live architecture schematics are now rendered from data, not images.
- **No screen recordings or GIFs exist**, and no system other than the Medicare Gap Analyzer has a live surface. Do not imply a live feed for the other five.

**Awaited asset:** the About section has a portrait frame wired to `public/assets/portrait.jpg`. The file does not exist yet; the frame removes itself on error rather than showing a broken image or a stand-in avatar. Zaid said he will supply it.

**Must never be fabricated:** testimonials, references, employer names, customer logos, press mentions, user counts, revenue or cost-savings figures beyond those already in resumeData, or any claim of professional industry employment. All experience to date is academic, research, or self-directed project work.

**Retracted 2026-09-17**, on Zaid's instruction, after `azure-healthcare-platform/writing/resume-bullets.md` established verified figures for that project: the "80GB raw volume" and "35% Databricks compute cost reduction" claims, and the claim that a Microsoft Fabric + Power BI presentation layer was **built**. No `.pbix` was produced — Power BI Desktop is Windows-only and Zaid works on a Mac; the model was fully specified and a static dashboard shipped as the serving layer instead. Do not reinstate any of the three.

**Flagged for review:** the "96.3% dbt test pass rate" still present in resumeData was previously judged a liability (3.7% failing). Confirm with Zaid before it appears on any surface; the safer form is "146 dbt tests across the full pipeline."

## Product Principles

About's three stat panels restate facts already stated elsewhere on the site — the 4.0 GPA from the credentials record, the 36,800+ records from the research entry, and the 2-of-5 refuted hypotheses from position 04. They are a second rendering of the same facts, so they must not drift from their sources.

**These are rendered on the site.** The About section's "How I work" band shows four of these as first-person stances, sourced from `resumeData.positions`. The two must not drift: if a principle changes here, change it there, and every stance must stay traceable to real work rather than becoming a slogan.

1. **Decisions over tools.** Any surface that lists technologies without the reasoning behind one of them is doing the same thing every other candidate's site does. Lead with the choice and the trade-off; the stack list is a footnote.
2. **Two layers, one page.** Every project presents a plain-English outcome plus one large metric at rest, and architectural depth on demand. As of 2026-09-18 the second layer arrives by the panel swapping faces rather than expanding: an expanded card measured 1192px against a 946px viewport and could not live inside the pinned horizontal track. Both layers are still one click apart and still on one page. Neither audience should have to read past content written for the other.
3. **Numbers are the loudest element.** The measured metrics are the strongest asset. They are never hidden behind an interaction, and nothing decorative outranks them visually.
4. **Data Engineering resolves ties.** When ordering, emphasis, or framing is ambiguous, the Data Engineering reading wins.
5. **Nothing implied that isn't real.** No fake live feeds, no invented social proof, no unverified diagrams. A skeptical engineer catching one inflated claim discards the entire site.

## Accessibility & Inclusion

No product-specific standard has been established. Baseline expectations apply: full keyboard operability, visible focus states, real semantic landmarks, and text contrast that holds on the off-white surface — the current palette runs light (`--color-ink-muted: #A3A3A3` on `#FAFAF9` is below 4.5:1 for body text and must not carry meaning at small sizes).
