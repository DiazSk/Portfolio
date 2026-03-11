# Zaid Shaikh - Data Engineer Portfolio

> Production-grade portfolio showcasing data engineering projects with Apache Airflow, Kafka, Flink, dbt, and Terraform.

## 🎯 Overview

Personal portfolio website for Zaid Shaikh - MS Computer Science student at Northeastern University (Seattle) specializing in Data Engineering. Targeting Summer 2026 Data Engineering internships at FAANG and fintech companies.

Now includes an AI Resume Chat section where recruiters can ask targeted questions about experience, projects, and role fit.

**Live Site:** [zaidshaikh.dev](https://zaidshaikh.dev) *(Update with your actual domain)*

## 🏗️ Featured Projects

### 1. Modern E-Commerce Analytics Platform
- **Tech Stack:** Apache Airflow, dbt, PostgreSQL, AWS S3, Terraform, Docker
- **Highlights:** 66K+ records processed, 96.3% test pass rate, 67% query optimization
- **Impact:** $2,297 annual cost savings, $53K+ opportunity identification

### 2. Real-Time Cryptocurrency Market Analyzer
- **Tech Stack:** Apache Kafka, Apache Flink (Java), Redis, PostgreSQL, FastAPI
- **Highlights:** Exactly-once semantics, sub-100ms latency, stateful stream processing
- **Impact:** 99% reduction in Redis operations, real-time OHLC candlestick charts

### 3. PathCode Database Design
- **Tech Stack:** PostgreSQL, SQL, Database Design (3NF)
- **Role:** Technical Lead mentoring 3 students on SQL optimization
- **Impact:** 40% query performance improvement, comprehensive ER modeling

## 💻 Tech Stack

**Portfolio Built With:**
- React 19 + Vite
- Tailwind CSS 4.1
- Framer Motion (animations)
- Three.js (3D astronaut model)
- EmailJS (contact form)

**Key Features:**
- Responsive design (mobile + desktop)
- Smooth scroll animations
- 3D interactive elements
- Fast load times with Vite
- Production-optimized build
- AI Resume Chat with streaming responses
- Suggested recruiter prompts and markdown answers
- Guardrails for safe, professional conversation flow

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
# Clone repository
git clone https://github.com/DiazSk/Portfolio.git
cd Portfolio

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Environment Variables

Create a `.env.local` file for API routes:

```bash
GEMINI_API_KEY=your_gemini_key_here
RESEND_API_KEY=your_resend_key_here
```

### Running with API Routes Locally

The project uses Vercel-style serverless APIs in `api/` (including `api/chat.js` and `api/contact.js`).

- Frontend only: `npm run dev`
- Frontend + API routes: `npx vercel dev`

## 📁 Project Structure

```
Portfolio/
├── src/
│   ├── components/      # Reusable UI components
│   │   ├── Astronaut.jsx
│   │   ├── FlipWords.jsx
│   │   └── ...
│   ├── sections/        # Page sections
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Projects.jsx
│   │   └── ...
│   ├── constants/       # Content data
│   │   └── index.js     # Projects, experiences, skills
│   └── index.css        # Global styles
├── public/
│   └── assets/          # Images, logos, 3D models
├── index.html           # Entry HTML with SEO meta tags
└── package.json
```

## 🎨 Customization

### Update Projects
Edit `src/constants/index.js` to modify:
- `myProjects` - Project showcases
- `experiences` - Work experience & education
- `skills` - Technical skills
- `certifications` - Credentials

### Update Contact Info
- Email: Modify `CopyEmailButton.jsx`
- Social links: Update `mySocials` in `constants/index.js`

### Styling
- Global styles: `src/index.css`
- Tailwind config: `tailwind.config.js`
- Component-specific: Inline Tailwind classes

## 📊 Performance

- **Lighthouse Score:** 95+ (Performance, Accessibility, Best Practices, SEO)
- **Load Time:** <2s on 4G
- **Bundle Size:** ~200KB (gzipped)
- **Core Web Vitals:** Optimized

## 🔧 Development Scripts

```bash
npm run dev      # Start dev server (localhost:5173)
npm run build    # Production build
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 📝 License

MIT License - feel free to use this template for your own portfolio!

## 🤝 Connect

- **Email:** zaid07sk@gmail.com
- **LinkedIn:** [linkedin.com/in/zaidshaikhscientist](https://www.linkedin.com/in/zaidshaikhscientist/)
- **GitHub:** [github.com/DiazSk](https://github.com/DiazSk)

---

**Built with React + Vite** | **Designed for Data Engineering Roles** | **Optimized for ATS & Recruiter Viewing**
