# Zaid Shaikh — Portfolio

Portfolio site for Zaid Shaikh, a data engineer in Seattle. Six production-grade builds, each stated against the baseline it beat.

**Live:** [zaid-data.vercel.app](https://zaid-data.vercel.app)

## About

MS Computer Science at Northeastern University (Khoury College, Seattle), graduating December 2026. The site exists to answer the question a reader arrives with — "is this person real, and at what level?" — in a single sitting, usually on a phone.

Every measured number on the site is carried against the design it replaced, because a number on its own is a claim and a number against a baseline is evidence.

## Projects

| Project | Category | Measured |
|---|---|---|
| Medicare Reimbursement Gap Analyzer | Data Engineering | 9.66M rows queryable in-browser, no backend |
| NYC Taxi Data Lakehouse | Data Engineering | 2.8M clean records, 96.8% retention |
| E-Commerce Data Warehouse (Olist) | Analytics Engineering | 90% query latency reduction |
| Scalable E-Commerce Analytics Platform | Analytics Engineering | 146 automated dbt tests |
| Real-Time Cryptocurrency Market Analyzer | Systems Engineering | <100ms Kafka-to-browser, exactly-once |
| Chatflow Messaging System | Backend SWE | 21,091 msg/s, zero loss across 1M messages |

The Medicare analyzer has a [live dashboard](https://diazsk.github.io/healthcare-lakehouse-azure/) — DuckDB compiled to WebAssembly over tiered Parquet, so all 9.66M rows are queryable in the browser with no backend and nothing that can expire.

## Stack

- **React 19** + **Vite 7**
- **Tailwind CSS 4** — CSS-first `@theme` in `src/index.css`; there is no `tailwind.config.js`
- **GSAP** + ScrollTrigger — the pinned horizontal project track, the Stack timeline, the marquee and the counters. Entrance reveals are CSS scroll-driven animations rather than GSAP
- **Resend** — the contact notification serverless function

## Quick start

Node 20.19+ (Vite 7's floor).

```bash
git clone https://github.com/DiazSk/Portfolio.git
cd Portfolio
npm install
npm run dev
```

## Scripts

```bash
npm run dev      # Vite dev server on localhost:5173
npm run build    # production build
npm run preview  # serve the production build
npm run lint     # ESLint across the repo, including api/
```

```bash
node --test api/contact.test.mjs   # contact handler: escaping and validation
```

## Environment variables

`.env.local`, for the serverless function only. The front end needs none.

```bash
RESEND_API_KEY=your_resend_key_here
CONTACT_TO=where_contact_notifications_should_land
```

`CONTACT_TO` is optional and defaults to the published contact address. It exists because Resend's sandbox sender delivers only to the address the Resend account is registered under; set it until a sending domain is verified.

## API routes

`api/` holds Vercel-style serverless functions. There is one: `api/contact.js`, which sends a single notification email. **Nothing on the site calls it yet** — Contact is `mailto:` and a copy-email button. A real contact form is a planned capability that re-wires to this handler.

- Front end only: `npm run dev`
- Front end plus API routes: `npx vercel dev`

## Structure

```
Portfolio/
├── api/
│   ├── contact.js           # Resend notification handler
│   └── contact.test.mjs     # node --test, no dependency
├── src/
│   ├── components/          # ArchitectureDiagram, ProjectCard, DecisionLog, CopyEmailButton
│   ├── sections/            # Hero, About, Projects, Skills, Contact, Navbar
│   ├── constants/
│   │   ├── resumeData.js    # content source of truth
│   │   └── index.js         # social links
│   ├── lib/motion.js        # all GSAP; one file, deliberately
│   └── index.css            # the whole design system, Tailwind v4 @theme
├── public/assets/           # portrait.webp, logos
├── DESIGN.md                # the visual system
├── PRODUCT.md               # product truth: what may and may not be claimed
└── index.html               # SEO and Open Graph meta
```

## Editing content

`src/constants/resumeData.js` is the content source of truth — personal details, education, experience, projects, skills, and the decision log behind each project. Section components read from it. The hero's measurement rows are the one exception: they are hardcoded in `src/sections/Hero.jsx`.

**Read [PRODUCT.md](PRODUCT.md) and [DESIGN.md](DESIGN.md) before changing anything user-facing.** PRODUCT.md records what may and may not be claimed on this site, including several figures that were retracted and must not return. DESIGN.md records the visual system and the reasoning behind each rule — it describes what shipped rather than what was intended.

## Build output

Measured 2026-09-19:

| Asset | Raw | Gzipped |
|---|---|---|
| JS | 353.46 kB | 121.62 kB |
| CSS | 31.70 kB | 6.94 kB |
| HTML | 3.69 kB | 1.68 kB |

## License

[MIT](LICENSE).

## Contact

- **Email:** shaikh.zaid@northeastern.edu
- **LinkedIn:** [zaidshaikhengineer](https://www.linkedin.com/in/zaidshaikhengineer/)
- **GitHub:** [DiazSk](https://github.com/DiazSk)
