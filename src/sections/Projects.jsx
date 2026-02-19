import { useState } from "react";
import { motion } from "framer-motion";
import { resumeData } from "../constants/resumeData";

const Projects = () => {
  const [expandedIndex, setExpandedIndex] = useState(0);

  return (
    <section id="projects" className="c-space py-12 md:py-16">
      <div className="mx-auto w-full max-w-4xl">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-heading">Project Experience</h2>
          <p className="mt-3 text-neutral-400">
            A timeline view of production-style data engineering projects and measurable outcomes.
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute bottom-0 left-[19px] top-0 w-px bg-white/10 md:left-1/2 md:-translate-x-px" />

          {resumeData.projects.map((project, index) => {
            const isExpanded = expandedIndex === index;
            const isLeft = index % 2 === 0;

            return (
              <motion.div
                key={project.name}
                className={`relative mb-8 flex items-start gap-6 last:mb-0 md:gap-0 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
              >
                <div className="absolute left-[12px] z-10 flex h-[15px] w-[15px] items-center justify-center rounded-full border-2 border-purple-400 bg-primary md:left-1/2 md:-translate-x-1/2">
                  <div className="h-2 w-2 rounded-full bg-purple-300" />
                </div>

                <div className={`ml-12 w-full md:ml-0 md:w-[calc(50%-2rem)] ${isLeft ? "md:mr-auto" : "md:ml-auto"}`}>
                  <button
                    onClick={() => setExpandedIndex(isExpanded ? -1 : index)}
                    className="w-full rounded-xl border border-white/10 bg-white/5 p-5 text-left transition-all hover:border-purple-400/40 hover:bg-white/10"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-lg font-semibold text-white">{project.name}</h3>
                        <p className="mt-1 text-xs uppercase tracking-wide text-purple-300">Project {String(index + 1).padStart(2, "0")}</p>
                      </div>
                      <span className={`mt-1 text-sm text-neutral-400 transition-transform ${isExpanded ? "rotate-180" : ""}`}>
                        ▼
                      </span>
                    </div>

                    <p className="mt-3 text-sm leading-relaxed text-neutral-300">{project.description}</p>

                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        transition={{ duration: 0.25 }}
                        className="mt-4"
                      >
                        <div>
                          <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-neutral-400">
                            Key Highlights
                          </h4>
                          <ul className="space-y-2">
                            {project.highlights.map((highlight) => (
                              <li key={highlight} className="flex gap-2 text-sm text-neutral-200">
                                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-300" />
                                {highlight}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {project.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="rounded-md bg-purple-500/15 px-2 py-0.5 text-xs text-purple-200"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;
