import { useState } from "react";
import { myProjects } from "../constants";
import { motion, AnimatePresence } from "framer-motion";
import TerminalList from "../components/TerminalList";

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(myProjects[0]);

  return (
    <section id="work" className="c-space section-spacing min-h-screen flex flex-col justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <h2 className="text-heading mb-4">Selected Work</h2>
        <div className="text-lg text-gray-400 max-w-3xl font-mono">
          <p className="mb-2">{">"} Accessing project archives...</p>
          <p className="text-white">{">"} displaying_production_grade_systems.log</p>
        </div>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-8 h-[800px] w-full">
        {/* Left Panel: Terminal List */}
        <TerminalList
          projects={myProjects}
          activeId={selectedProject.id}
          onSelect={setSelectedProject}
        />

        {/* Right Panel: The Viewport */}
        <div className="flex-1 relative bg-black/40 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm flex flex-col">
          {/* Glass Reflection Effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none z-10" />

          {/* Scanline Effect */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-20 bg-[length:100%_4px,3px_100%] pointer-events-none opacity-20" />

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedProject.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col h-full p-6 relative z-30 overflow-y-auto custom-scrollbar"
            >
              {/* Header */}
              <div className="flex flex-col md:flex-row justify-between items-start mb-6 border-b border-white/10 pb-6 gap-6">
                <div className="flex-1">
                  <h3 className="text-3xl font-bold text-white mb-2">
                    {selectedProject.title}
                  </h3>
                  <p className="text-gray-400">
                    {selectedProject.description}
                  </p>
                </div>

                <div className="flex flex-col items-end gap-3 min-w-fit">
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 rounded text-xs font-mono text-cyan-400 transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
                  >
                    <span>[VIEW_SOURCE]</span>
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                  </a>

                  <div className="text-right font-mono text-xs text-gray-500 space-y-1 bg-black/40 p-3 rounded border border-white/5">
                    <div className="flex items-center justify-end gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                      <p>STATUS: DEPLOYED</p>
                    </div>
                    <p>UPTIME: 99.9%</p>
                    <p>REGION: US-EAST-1</p>
                  </div>
                </div>
              </div>

              {/* Architecture Blueprint */}
              <div className="relative mb-8 group">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-500" />
                <div className="relative bg-black/60 border border-white/10 rounded-lg p-4 overflow-hidden">
                  <div className="absolute top-2 right-2 text-[10px] font-mono text-cyan-500/50 border border-cyan-500/30 px-2 py-1 rounded">
                    SYSTEM_ARCHITECTURE_V1.0
                  </div>

                  {selectedProject.architectureImage ? (
                    <img
                      src={selectedProject.architectureImage}
                      alt="Architecture Diagram"
                      className="w-full h-auto object-contain rounded shadow-2xl"
                    />
                  ) : (
                    <pre className="text-xs text-cyan-400/80 font-mono leading-relaxed whitespace-pre overflow-x-auto">
                      {selectedProject.architecture}
                    </pre>
                  )}
                </div>
              </div>

              {/* System Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {Object.entries(selectedProject.metrics).map(([key, value]) => (
                  <div
                    key={key}
                    className="bg-white/5 border border-white/5 p-4 rounded-lg hover:border-cyan-500/30 transition-colors group"
                  >
                    <p className="text-xs text-gray-500 font-mono uppercase mb-1 group-hover:text-cyan-400 transition-colors">
                      {key.replace(/([A-Z])/g, " $1").trim()}
                    </p>
                    <p className="text-xl font-bold text-white">{value}</p>
                  </div>
                ))}
              </div>

              {/* Tech Stack Modules */}
              <div>
                <h4 className="text-sm font-mono text-gray-500 mb-4 uppercase">
                  // Loaded Modules
                </h4>
                <div className="flex flex-wrap gap-3">
                  {selectedProject.tags.map((tag) => (
                    <div
                      key={tag.id}
                      className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full hover:bg-white/10 transition-colors"
                    >
                      <img
                        src={tag.path}
                        alt={tag.name}
                        className="w-4 h-4"
                      />
                      <span className="text-sm text-gray-300">{tag.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Projects;
