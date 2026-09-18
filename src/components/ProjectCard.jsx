import { useState } from "react";
import PropTypes from "prop-types";
import DecisionLog from "./DecisionLog";
import ArchitectureDiagram from "./ArchitectureDiagram";

const VISIBLE_TECH_COUNT = 4;

/**
 * A panel in the horizontal project track, with two faces.
 *
 * Face:  category · name · primary metric · outcome · top pills
 * Back:  architecture · decision log · highlights · full stack · links
 *
 * The two trade places rather than stacking. The old card expanded
 * downwards and measured 1192px against a 946px viewport, which a pinned
 * panel cannot show; swapping keeps both layers inside one fixed box. The
 * hidden face is `inert`, so neither its links nor its buttons are
 * reachable by keyboard while it is behind.
 */
const ProjectCard = ({ project }) => {
  const [isOpen, setIsOpen] = useState(false);

  const {
    name,
    category,
    outcomeStatement,
    primaryMetric,
    technologies,
    highlights,
    decisionLog,
    architecture,
    liveUrl,
    github,
  } = project;

  const visibleTech = technologies.slice(0, VISIBLE_TECH_COUNT);
  const remainingCount = technologies.length - VISIBLE_TECH_COUNT;

  const toggle = (
    <button
      onClick={() => setIsOpen(!isOpen)}
      className="-my-2 flex items-center gap-1.5 py-2 text-xs font-semibold uppercase tracking-wide transition-colors"
      style={{ color: isOpen ? "var(--color-ink)" : "var(--color-ink-muted)" }}
      aria-expanded={isOpen}
    >
      {isOpen ? "Back to summary" : "Architecture & details"}
      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        className="transition-transform duration-200"
        style={{ transform: isOpen ? "rotate(180deg)" : "none" }}
        aria-hidden="true"
      >
        <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );

  return (
    <article className={`h-panel${isOpen ? " is-open" : ""}`}>
      {/* ── Face ────────────────────────────────────────────── */}
      <div className="h-face h-full gap-5" inert={isOpen || undefined}>
        {category && <p className="micro">{category}</p>}

        <h4
          className="text-display text-2xl uppercase md:text-3xl"
          style={{ color: "var(--color-ink)" }}
        >
          {name}
        </h4>

        <div>
          <p className="metric-value" style={{ fontSize: "clamp(2.25rem, 3.4vw, 3rem)" }}>
            {primaryMetric.value}
          </p>
          <p className="mt-0.5 text-xs" style={{ color: "var(--color-ink-muted)" }}>
            {primaryMetric.label}
          </p>
        </div>

        <p className="text-sm leading-relaxed" style={{ color: "var(--color-ink-secondary)" }}>
          {outcomeStatement}
        </p>

        <div className="mt-auto flex flex-col gap-4">
          <div className="flex flex-wrap gap-1.5">
            {visibleTech.map((tech) => (
              <span key={tech} className="tech-pill">{tech}</span>
            ))}
            {remainingCount > 0 && <span className="tech-pill">+{remainingCount}</span>}
          </div>
          {toggle}
        </div>
      </div>

      {/* ── Back ────────────────────────────────────────────── */}
      <div className="h-back gap-6" inert={!isOpen || undefined}>
        <div className="flex items-baseline justify-between gap-4">
          <p className="micro">{name}</p>
          {toggle}
        </div>

        {architecture && <ArchitectureDiagram stages={architecture} projectName={name} />}

        {decisionLog && <DecisionLog decisionLog={decisionLog} />}

        <div>
          <p className="text-label mb-3">Key highlights</p>
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

        <div className="flex flex-wrap gap-1.5">
          {technologies.map((tech) => (
            <span key={tech} className="tech-pill">{tech}</span>
          ))}
        </div>

        {/* Links out. A live artifact leads; the repo follows. */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit items-center gap-1.5 py-1.5 text-sm font-medium transition-opacity hover:opacity-70"
              style={{ color: "var(--color-accent)" }}
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: "var(--color-accent)" }}
                aria-hidden="true"
              />
              Live dashboard →
            </a>
          )}
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit items-center gap-1.5 py-1.5 text-sm font-medium transition-opacity hover:opacity-70"
              style={{ color: "var(--color-ink)" }}
            >
              <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor" aria-hidden="true">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
              </svg>
              View on GitHub →
            </a>
          )}
        </div>
      </div>
    </article>
  );
};

ProjectCard.propTypes = {
  project: PropTypes.shape({
    name:            PropTypes.string.isRequired,
    category:        PropTypes.string,
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
    architecture: PropTypes.array,
    liveUrl: PropTypes.string,
    github: PropTypes.string,
  }).isRequired,
};

export default ProjectCard;
