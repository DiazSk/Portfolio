import { useCallback, useRef, useState } from "react";
import PropTypes from "prop-types";
import { resumeData } from "../constants/resumeData";
import ProjectCard from "../components/ProjectCard";
import { useMotion, horizontalTrack } from "../lib/motion";

const Arrow = ({ back }) => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
    <path
      d={back ? "M8 2.5L4 6.5l4 4" : "M5 2.5l4 4-4 4"}
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

Arrow.propTypes = { back: PropTypes.bool };

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
const Track = ({ projects }) => {
  const root = useRef(null);
  const [pos, setPos] = useState(0);

  useMotion(() => horizontalTrack(root, { onProgress: setPos }), root);

  /*
   * The controls exist for keyboard and for anyone who would rather click
   * than scroll. A pinned band is driven by the page, so one panel of travel
   * is one panel of page scroll — the pin length equals the track's overhang,
   * which makes that mapping exactly 1:1. Unpinned, the track is a real
   * scroller and takes the step directly.
   */
  const step = useCallback((dir) => {
    const wrap = root.current?.querySelector(".h-wrap");
    const track = wrap?.querySelector(".h-track");
    const panel = track?.querySelector(".h-panel");
    if (!wrap || !track || !panel) return;
    const by = dir * panel.getBoundingClientRect().width;
    if (wrap.classList.contains("is-pinned")) {
      window.scrollBy({ top: by, behavior: "smooth" });
    } else {
      track.scrollBy({ left: by, behavior: "smooth" });
    }
  }, []);

  /*
   * Tab can still land on a panel that is off-screen, so focus brings its
   * own panel into line using the same page-scroll the controls use. An
   * earlier attempt at this lived in the motion module on a native focusin
   * listener with a deferred scrollBy and did nothing at all; doing it here,
   * through the path the buttons already prove works, is the difference.
   * "instant" rather than "smooth": during a Tab run the smooth scrolls
   * queue up and fight each other.
   */
  const onFocus = (e) => {
    const wrap = root.current?.querySelector(".h-wrap");
    if (!wrap?.classList.contains("is-pinned")) return;
    const panel = e.target.closest?.(".h-panel");
    if (!panel) return;
    const rest = wrap.querySelector(".h-panel").offsetLeft;
    const dx = panel.getBoundingClientRect().left - rest;
    if (Math.abs(dx) > 40) window.scrollBy({ top: dx, behavior: "instant" });
  };

  /* Unpinned the track is the scroller, so its own scroll drives the
     controls' disabled state; pinned, that comes from GSAP's progress. */
  const onTrackScroll = (e) => {
    const t = e.currentTarget;
    const max = t.scrollWidth - t.clientWidth;
    setPos(max > 0 ? t.scrollLeft / max : 0);
  };

  return (
    <div ref={root} className="pt-14 md:pt-20">
      <div className="c-space mx-auto w-full max-w-7xl">
        <div className="mb-4 flex items-center justify-between gap-6">
          {/* The groups stay legible as a legend even though the panels run
              as one queue; each panel repeats its own category. */}
          <div className="flex flex-wrap items-baseline gap-x-8 gap-y-2">
            {GROUPS.map((g) => (
              <span key={g.label} className="flex items-baseline gap-2">
                <span className="text-label">{g.label}</span>
                <span className="tabular text-xs" style={{ color: "var(--color-field)" }}>
                  {String(g.count).padStart(2, "0")}
                </span>
              </span>
            ))}
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              className="track-nav"
              onClick={() => step(-1)}
              disabled={pos <= 0.002}
              aria-label="Previous project"
            >
              <Arrow back />
            </button>
            <button
              type="button"
              className="track-nav"
              onClick={() => step(1)}
              disabled={pos >= 0.998}
              aria-label="Next project"
            >
              <Arrow />
            </button>
          </div>
        </div>

        <div className="h-progress" aria-hidden="true">
          <i style={{ transform: `scaleX(${pos})` }} />
        </div>
      </div>

      <div className="h-wrap mt-6" onFocus={onFocus}>
        <div className="h-track" onScroll={onTrackScroll}>
          {projects.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
};

Track.propTypes = {
  projects: PropTypes.array.isRequired,
};

const isSystems = (p) =>
  p.category === "Backend SWE" || p.category === "Systems Engineering";

/* Counts for the legend. resumeData's own order already leads with Data
   Engineering, which is the tie-break PRODUCT.md asks for, so the track
   runs in that order rather than being re-sorted. */
const GROUPS = [
  {
    label: "Data Engineering & Analytics",
    count: resumeData.projects.filter((p) => !isSystems(p)).length,
  },
  {
    label: "Systems Engineering",
    count: resumeData.projects.filter(isSystems).length,
  },
];

const Projects = () => (
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
        Six production-grade builds, side by side. Open any one for its
        architecture and the decision behind it.
      </p>
    </div>

    <Track projects={resumeData.projects} />
  </section>
);

export default Projects;
