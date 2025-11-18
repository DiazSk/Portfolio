import { motion } from "motion/react";
import PropTypes from "prop-types";

const ProjectDetails = ({
  title,
  description,
  subDescription,
  image,
  tags,
  href,
  architecture,
  closeModal,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full p-4 overflow-auto backdrop-blur-sm">
      <motion.div
        className="relative w-full max-w-3xl border shadow-sm rounded-2xl bg-gradient-to-l from-midnight to-navy border-white/10 my-8"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <button
          onClick={closeModal}
          className="absolute p-2 rounded-sm top-5 right-5 bg-midnight hover:bg-gray-500 z-10"
        >
          <img src="assets/close.svg" className="w-6 h-6" />
        </button>
        <img src={image} alt={title} className="w-full rounded-t-2xl" />
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          <h5 className="mb-2 text-2xl font-bold text-white">{title}</h5>
          <p className="mb-4 font-normal text-neutral-400">{description}</p>
          
          {/* Architecture Diagram */}
          {architecture && (
            <div className="mb-6">
              <h6 className="mb-3 text-lg font-semibold text-white flex items-center gap-2">
                <span>🏗️</span> System Architecture
              </h6>
              <div className="bg-black/40 border border-indigo-500/30 rounded-lg p-4 overflow-x-auto">
                <pre className="text-sm text-cyan-400 font-mono leading-relaxed whitespace-pre">
{architecture}
                </pre>
              </div>
            </div>
          )}

          {/* Key Features */}
          <h6 className="mb-3 text-lg font-semibold text-white flex items-center gap-2">
            <span>🎯</span> Key Features
          </h6>
          <ul className="space-y-2 mb-4">
            {subDescription.map((subDesc, index) => (
              <li key={index} className="flex items-start gap-2 font-normal text-neutral-400">
                <span className="text-green-400 mt-1">•</span>
                <span>{subDesc}</span>
              </li>
            ))}
          </ul>

          {/* Tech Stack & Actions */}
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/10">
            <div className="flex gap-3 flex-wrap">
              {tags.map((tag) => (
                <img
                  key={tag.id}
                  src={tag.path}
                  alt={tag.name}
                  className="rounded-lg size-10 hover-animation"
                  title={tag.name}
                />
              ))}
            </div>
            <a 
              href={href} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-1 px-4 py-2 font-medium cursor-pointer hover-animation bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white transition-colors"
            >
              View Project{" "}
              <img src="assets/arrow-up.svg" className="size-4" />
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

ProjectDetails.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  subDescription: PropTypes.arrayOf(PropTypes.string).isRequired,
  image: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.object).isRequired,
  href: PropTypes.string.isRequired,
  architecture: PropTypes.string,
  closeModal: PropTypes.func.isRequired
};

export default ProjectDetails;
