import { useRef, useState } from "react";
import PropTypes from "prop-types";
import { resumeData } from "../constants/resumeData";
import ProjectCard from "../components/ProjectCard";
import { useMotion, horizontalTrack } from "../lib/motion";

/*
 * One horizontal band per category, the way rauno.me frames its strips: a
 * ~620px band centred in the viewport with the next card peeking past the
 * right edge, and the page keeping its own rhythm above and below it. The
 * band pins and translates as you scroll through it, then releases and the
 * next category's band takes over — so Data Engineering finishes before
 * Systems Engineering starts, rather than six panels running as one queue.
 *
 * Each band owns its own ScrollTrigger and its own progress, which is why
 * this is a component rather than an index into a shared one.
 */
const Track = ({ label, projects, wide }) => {
  const root = useRef(null);
  const [progress, setProgress] = useState(0);

  useMotion(() => horizontalTrack(root, { onProgress: setProgress }), root);

  return (
    <div ref={root} className="pt-14 md:pt-20">
      <div className="c-space mx-auto w-full max-w-7xl">
        <div className="mb-4 flex items-baseline gap-3">
          <span className="text-label">{label}</span>
          <span className="tabular text-xs" style={{ color: "var(--color-field)" }}>
            {String(projects.length).padStart(2, "0")}
          </span>
        </div>

        <div className="h-progress" aria-hidden="true">
          <i style={{ transform: `scaleX(${progress})` }} />
        </div>
      </div>

      <div className={`h-wrap mt-6${wide ? " h-wrap-wide" : ""}`}>
        <div className="h-track">
          {projects.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
};

Track.propTypes = {
  label: PropTypes.string.isRequired,
  projects: PropTypes.array.isRequired,
  wide: PropTypes.bool,
};

const isSystems = (p) =>
  p.category === "Backend SWE" || p.category === "Systems Engineering";

const Projects = () => {
  const systems = resumeData.projects.filter(isSystems);
  const data = resumeData.projects.filter((p) => !isSystems(p));

  return (
    <section
      id="projects"
      className="border-t pt-24 md:pt-32"
      style={{ borderColor: "var(--color-border)" }}
    >
      <div className="c-space mx-auto w-full max-w-7xl">
        <h2 className="on-scroll text-heading mb-4">Selected systems</h2>
        <p
          className="max-w-2xl text-base leading-relaxed"
          style={{ color: "var(--color-ink-secondary)" }}
        >
          Six production-grade builds, a category at a time. Open any one for
          its architecture and the decision behind it.
        </p>
      </div>

      <Track label="Data Engineering & Analytics" projects={data} />
      <Track label="Systems Engineering" projects={systems} wide />
    </section>
  );
};

export default Projects;
