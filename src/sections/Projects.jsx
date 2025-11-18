import { myProjects } from "../constants";
import { motion } from "framer-motion";
import SpotlightCard from "../components/SpotlightCard";
import TiltCard from "../components/TiltCard";

const Projects = () => {
  return (
    <section id="work" className="relative c-space section-spacing">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-heading mb-4">Featured Projects</h2>
        <p className="text-lg text-gray-400 mb-12 max-w-3xl">
          Production-grade data engineering systems with measurable impact
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
        {myProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
          >
            <SpotlightCard className="h-full">
              <TiltCard className="p-6 h-full">
                {/* Project Header */}
                <h3 className="text-2xl font-bold text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4">
                  {project.description}
                </p>

                {/* Architecture Preview */}
                {project.architecture && (
                  <div className="mb-6 bg-black/40 border border-cyan-500/20 rounded-lg p-4 overflow-x-auto">
                    <pre className="text-xs text-cyan-400/80 font-mono leading-relaxed whitespace-pre">
                      {project.architecture.split('\n').slice(0, 8).join('\n')}
                    </pre>
                    <p className="text-xs text-gray-500 mt-2">+ More in details...</p>
                  </div>
                )}

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {Object.entries(project.metrics).slice(0, 4).map(([key, value]) => (
                    <motion.div
                      key={key}
                      whileHover={{ scale: 1.05 }}
                      className="bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 rounded-lg p-3"
                    >
                      <div className="text-2xl font-bold text-cyan-400">
                        {value}
                      </div>
                      <div className="text-xs text-gray-400 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.slice(0, 6).map((tag) => (
                    <motion.div
                      key={tag.id}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="flex items-center gap-2 bg-gray-800/50 border border-gray-700/50 rounded-lg px-3 py-1.5"
                    >
                      <img 
                        src={tag.path} 
                        alt={tag.name} 
                        className="w-4 h-4"
                      />
                      <span className="text-xs text-gray-300">{tag.name}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Action Links */}
                <div className="flex gap-3">
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-medium py-3 px-6 rounded-lg text-center transition-all duration-300 shadow-lg shadow-cyan-500/20"
                  >
                    View Code
                  </motion.a>
                  
                  {project.href !== "#" && (
                    <motion.a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 border border-gray-700"
                    >
                      Details
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </motion.a>
                  )}
                </div>
              </TiltCard>
            </SpotlightCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
