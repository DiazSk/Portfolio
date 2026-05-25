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
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => setExpandedIndex(isExpanded ? -1 : index)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setExpandedIndex(isExpanded ? -1 : index);
                      }
                    }}
                    className="w-full cursor-pointer rounded-xl border border-white/10 bg-white/5 p-5 text-left transition-all hover:border-purple-400/40 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400/60"
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

                        {project.github && (
                          <div className="mt-4 flex">
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-2 rounded-md border border-purple-400/30 bg-purple-500/10 px-3 py-1.5 text-xs font-medium text-purple-200 transition-colors hover:border-purple-400/60 hover:bg-purple-500/20 hover:text-white"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="h-4 w-4"
                                aria-hidden="true"
                              >
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z"
                                />
                              </svg>
                              View on GitHub
                            </a>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </div>
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
