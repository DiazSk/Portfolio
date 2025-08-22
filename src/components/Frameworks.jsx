import { OrbitingCircles } from "./OrbitingCircles";
import PropTypes from "prop-types";

export function Frameworks() {
  // ML/Data Science tech stack based on your actual projects
  const skills = [
    "python",           // Core language
    "xgboost",         // ML library (fraud detection, churn prediction)
    "sklearn",         // ML library
    "fastapi",         // API framework
    "streamlit",       // Dashboard framework
    "pandas",          // Data processing
    "numpy",           // Numerical computing
    "docker",          // Containerization
    "postgresql",      // Database
    "tensorflow",      // Deep learning
    "pytorch",         // Deep learning
    "matplotlib",      // Visualization
    "github",         // Version control
    "amazonwebservices", // Cloud platform
    "railway",        // Deployment platform
    "jupyter",       // Development environment
  ];
  
  return (
    <div className="relative flex h-[15rem] w-full flex-col items-center justify-center">
      <OrbitingCircles iconSize={40}>
        {skills.map((skill, index) => (
          <Icon key={index} src={`assets/logos/${skill}.svg`} />
        ))}
      </OrbitingCircles>
      <OrbitingCircles iconSize={25} radius={100} reverse speed={2}>
        {skills.reverse().map((skill, index) => (
          <Icon key={index} src={`assets/logos/${skill}.svg`} />
        ))}
      </OrbitingCircles>
    </div>
  );
}

const Icon = ({ src }) => (
  <img src={src} className="duration-200 rounded-sm hover:scale-110" />
);

Icon.propTypes = {
  src: PropTypes.string.isRequired
};