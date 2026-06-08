import { motion } from "framer-motion";
import { resumeData } from "../constants/resumeData";
import ProjectCard from "../components/ProjectCard";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.06, ease: "easeOut" },
  }),
};

const Projects = () => {
  const deProjects      = resumeData.projects.filter(
    (p) => p.category !== "Backend SWE" && p.category !== "Systems Engineering"
  );
  const systemsProjects = resumeData.projects.filter(
    (p) => p.category === "Backend SWE" || p.category === "Systems Engineering"
  );

  return (
    <section id="projects" className="c-space section-spacing">
      <div className="mx-auto w-full max-w-7xl">
        {/* Section header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <p className="text-eyebrow mb-2">Work</p>
          <h2 className="text-heading">Selected Projects</h2>
        </motion.div>

        {/* ── Group 1: Data Engineering & Analytics ──────────── */}
        <p
          className="mb-6 text-xs font-semibold uppercase tracking-widest"
          style={{ color: "var(--color-ink-muted)" }}
        >
          Data Engineering &amp; Analytics
        </p>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {deProjects.map((project, i) => (
            <motion.div
              key={project.name}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              // Last card in odd-count list spans full width on md
              className={
                deProjects.length % 2 !== 0 && i === deProjects.length - 1
                  ? "md:col-span-2 md:max-w-[calc(50%-0.5rem)]"
                  : ""
              }
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>

        {/* ── Divider ─────────────────────────────────────────── */}
        <hr className="section-rule" />

        {/* ── Group 2: Systems Engineering (Backend SWE) ──────── */}
        <p
          className="mb-6 text-xs font-semibold uppercase tracking-widest"
          style={{ color: "var(--color-ink-muted)" }}
        >
          Systems Engineering
        </p>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {systemsProjects.map((project, i) => (
            <motion.div
              key={project.name}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
