import { useRef, useState } from "react";
import { resumeData } from "../constants/resumeData";
import ProjectCard from "../components/ProjectCard";
import { useMotion, horizontalTrack } from "../lib/motion";

/*
 * The six systems as one horizontal track.
 *
 * The heading block stays in normal vertical flow; the track below it is
 * pinned and translated by GSAP as you scroll, which is the pattern behind
 * the horizontal work reels on sites like ondastudio.co — though theirs is a
 * true horizontal surface with no vertical scroll at all, where this keeps
 * the page's single scroll axis and borrows it for the track.
 *
 * Below 768px, or under reduced motion, no pin happens and the track is a
 * natively swipeable row. Nothing is hidden in either case.
 */
const Projects = () => {
  const root = useRef(null);
  const [progress, setProgress] = useState(0);

  useMotion(
    () => horizontalTrack(root, { onProgress: setProgress }),
    root
  );

  const groups = [
    { label: "Data Engineering & Analytics", test: (p) => p.category !== "Backend SWE" && p.category !== "Systems Engineering" },
    { label: "Systems Engineering", test: (p) => p.category === "Backend SWE" || p.category === "Systems Engineering" },
  ].map((g) => ({ ...g, count: resumeData.projects.filter(g.test).length }));

  return (
    <section
      id="projects"
      ref={root}
      className="border-t pt-24 md:pt-32"
      style={{ borderColor: "var(--color-border)" }}
    >
      <div className="c-space mx-auto w-full max-w-7xl">
        <h2 className="on-scroll text-heading mb-4">Selected systems</h2>
        <p
          className="mb-8 max-w-2xl text-base leading-relaxed"
          style={{ color: "var(--color-ink-secondary)" }}
        >
          Six production-grade builds, side by side. Open any one for its
          architecture and the decision behind it.
        </p>

        {/* Both group names stay legible even though the panels now run in
            one track; each panel repeats its own category. */}
        <div className="mb-5 flex flex-wrap items-baseline gap-x-8 gap-y-2">
          {groups.map((g) => (
            <span key={g.label} className="flex items-baseline gap-2">
              <span className="text-label">{g.label}</span>
              <span className="tabular text-xs" style={{ color: "var(--color-field)" }}>
                {String(g.count).padStart(2, "0")}
              </span>
            </span>
          ))}
        </div>

        <div className="h-progress mb-px" aria-hidden="true">
          <i style={{ transform: `scaleX(${progress})` }} />
        </div>
      </div>

      {/* ── The track ───────────────────────────────────────────── */}
      <div className="h-wrap">
        <div className="h-track">
          {resumeData.projects.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
