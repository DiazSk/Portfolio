import { motion } from "framer-motion";

const TerminalList = ({ projects, activeId, onSelect }) => {
    return (
        <div className="flex flex-col gap-4 w-full lg:w-1/3 h-full overflow-y-auto pr-2 custom-scrollbar">
            <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                <div className="w-3 h-3 rounded-full bg-yellow-500 animate-pulse delay-75" />
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse delay-150" />
                <span className="text-gray-400 font-mono text-sm ml-2">
          // SELECT_DATA_STREAM
                </span>
            </div>

            {projects.map((project, index) => (
                <motion.button
                    key={project.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => onSelect(project)}
                    className={`group relative p-4 rounded-lg text-left transition-all duration-300 border ${activeId === project.id
                            ? "bg-white/5 border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.2)]"
                            : "bg-transparent border-white/10 hover:bg-white/5 hover:border-white/20"
                        }`}
                >
                    {/* Active Indicator Line */}
                    {activeId === project.id && (
                        <motion.div
                            layoutId="activeIndicator"
                            className="absolute left-0 top-0 bottom-0 w-1 bg-cyan-400 rounded-l-lg"
                        />
                    )}

                    <div className="flex items-center justify-between mb-2">
                        <span
                            className={`font-mono text-xs ${activeId === project.id ? "text-cyan-400" : "text-gray-500"
                                }`}
                        >
                            ID_0{project.id}
                        </span>
                        {activeId === project.id && (
                            <span className="flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-cyan-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                            </span>
                        )}
                    </div>

                    <h3
                        className={`font-bold text-lg mb-1 transition-colors ${activeId === project.id ? "text-white" : "text-gray-400 group-hover:text-white"
                            }`}
                    >
                        {project.title}
                    </h3>

                    <p className="text-xs text-gray-500 font-mono truncate">
                        {project.tags.map((t) => t.name).join(" • ")}
                    </p>
                </motion.button>
            ))}
        </div>
    );
};

export default TerminalList;
