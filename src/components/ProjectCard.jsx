import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PropTypes from "prop-types";
import RoleTag from "./RoleTag";
import DecisionLog from "./DecisionLog";

const VISIBLE_TECH_COUNT = 4;

/**
 * Dual-layer project card.
 *
 * Layer 1 (always visible):
 *   RoleTag · Project name · Outcome statement · Primary metric · Top tech pills · Expand toggle
 *
 * Layer 2 (expanded on click):
 *   Decision log (if present) · Full highlights · All tech pills · GitHub link
 */
const ProjectCard = ({ project }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const {
    name,
    category,
    outcomeStatement,
    primaryMetric,
    technologies,
    highlights,
    decisionLog,
    github,
  } = project;

  const visibleTech = technologies.slice(0, VISIBLE_TECH_COUNT);
  const remainingCount = technologies.length - VISIBLE_TECH_COUNT;

  return (
    <article className="card-base flex flex-col">
      {/* ── Layer 1 ─────────────────────────────────────────── */}
      <div className="flex flex-col gap-4">
        {/* Header row */}
        <div className="flex w-full flex-col items-center gap-4 overflow-hidden md:items-start">
          {/* Title group - centered on mobile, left on md+ */}
          <div className="flex flex-col items-center gap-2 md:items-start">
            <RoleTag category={category} />
            <h3
              className="text-center text-lg font-semibold leading-snug md:text-left"
              style={{ color: "var(--color-ink)" }}
            >
              {name}
            </h3>
          </div>

          {/* Primary metric - centered on mobile, left on md+ */}
          <div className="flex flex-col items-center md:items-start">
            <p
              className="text-2xl font-semibold tabular-nums leading-none"
              style={{ color: "var(--color-ink)", fontVariantNumeric: "tabular-nums" }}
            >
              {primaryMetric.value}
            </p>
            <p className="mt-0.5 text-xs" style={{ color: "var(--color-ink-muted)" }}>
              {primaryMetric.label}
            </p>
          </div>
        </div>

        {/* Outcome statement */}
        <p className="text-sm leading-relaxed" style={{ color: "var(--color-ink-secondary)" }}>
          {outcomeStatement}
        </p>

        {/* Tech pills + expand toggle */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap gap-1.5">
            {visibleTech.map((tech) => (
              <span key={tech} className="tech-pill">{tech}</span>
            ))}
            {remainingCount > 0 && (
              <span className="tech-pill">+{remainingCount}</span>
            )}
          </div>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1 text-xs transition-colors"
            style={{ color: "var(--color-ink-muted)" }}
            aria-expanded={isExpanded}
            aria-label={isExpanded ? "Collapse details" : "View architecture & decision log"}
          >
            {isExpanded ? "Collapse" : "Architecture & details"}
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              className="transition-transform duration-200"
              style={{ transform: isExpanded ? "rotate(180deg)" : "none" }}
              aria-hidden="true"
            >
              <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* ── Layer 2 ─────────────────────────────────────────── */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            key="layer2"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div
              className="mt-5 flex flex-col gap-5 border-t pt-5"
              style={{ borderColor: "var(--color-border)" }}
            >
              {/* Decision log - only for Crypto Analyzer + Healthcare Lakehouse */}
              {decisionLog && <DecisionLog decisionLog={decisionLog} />}

              {/* Key highlights */}
              <div>
                <p
                  className="mb-3 text-xs font-semibold uppercase tracking-widest"
                  style={{ color: "var(--color-ink-muted)" }}
                >
                  Key Highlights
                </p>
                <ul className="flex flex-col gap-2">
                  {highlights.map((h) => (
                    <li
                      key={h}
                      className="flex gap-3 text-sm leading-relaxed"
                      style={{ color: "var(--color-ink-secondary)" }}
                    >
                      <span
                        className="mt-1.5 h-1 w-1 shrink-0 rounded-full"
                        style={{ background: "var(--color-border-strong)" }}
                        aria-hidden="true"
                      />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Full tech stack */}
              <div className="flex flex-wrap gap-1.5">
                {technologies.map((tech) => (
                  <span key={tech} className="tech-pill">{tech}</span>
                ))}
              </div>

              {/* GitHub link */}
              {github && (
                <a
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-fit items-center gap-1.5 text-sm font-medium transition-opacity hover:opacity-70"
                  style={{ color: "var(--color-ink)" }}
                >
                  <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor" aria-hidden="true">
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                  </svg>
                  View on GitHub →
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
};

ProjectCard.propTypes = {
  project: PropTypes.shape({
    name:            PropTypes.string.isRequired,
    category:        PropTypes.string.isRequired,
    outcomeStatement: PropTypes.string.isRequired,
    primaryMetric:   PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }).isRequired,
    technologies: PropTypes.arrayOf(PropTypes.string).isRequired,
    highlights:   PropTypes.arrayOf(PropTypes.string).isRequired,
    decisionLog:  PropTypes.shape({
      chose:   PropTypes.string.isRequired,
      over:    PropTypes.string.isRequired,
      because: PropTypes.string.isRequired,
    }),
    github: PropTypes.string,
  }).isRequired,
};

export default ProjectCard;
