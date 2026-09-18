import PropTypes from "prop-types";
import { resumeData } from "../constants/resumeData";
import ProjectCard from "../components/ProjectCard";

const GroupLabel = ({ children, count }) => (
  <div className="mb-6 flex items-baseline gap-3">
    <h3
      className="text-xs font-bold uppercase tracking-[0.18em]"
      style={{ color: "var(--color-ink-muted)" }}
    >
      {children}
    </h3>
    <span
      className="tabular text-xs"
      style={{ color: "var(--color-field)" }}
    >
      {String(count).padStart(2, "0")}
    </span>
  </div>
);

GroupLabel.propTypes = {
  children: PropTypes.node.isRequired,
  count: PropTypes.number.isRequired,
};

const Projects = () => {
  const deProjects = resumeData.projects.filter(
    (p) => p.category !== "Backend SWE" && p.category !== "Systems Engineering"
  );
  const systemsProjects = resumeData.projects.filter(
    (p) => p.category === "Backend SWE" || p.category === "Systems Engineering"
  );

  return (
    <section
      id="projects"
      className="c-space section-spacing border-t"
      style={{ borderColor: "var(--color-border)" }}
    >
      <div className="mx-auto w-full max-w-7xl">
        <h2 className="on-scroll text-heading mb-4">Selected systems</h2>
        <p
          className="mb-12 max-w-2xl text-base leading-relaxed"
          style={{ color: "var(--color-ink-secondary)" }}
        >
          Six production-grade builds. Open any one for its architecture and the
          decision behind it.
        </p>

        {/* ── Data Engineering & Analytics ────────────────────── */}
        <GroupLabel count={deProjects.length}>
          Data Engineering &amp; Analytics
        </GroupLabel>

        <div className="project-grid grid grid-cols-1 gap-4 md:grid-cols-2">
          {deProjects.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </div>

        <hr className="section-rule" />

        {/* ── Systems Engineering ─────────────────────────────── */}
        <GroupLabel count={systemsProjects.length}>
          Systems Engineering
        </GroupLabel>

        <div className="project-grid grid grid-cols-1 gap-4 md:grid-cols-2">
          {systemsProjects.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
