import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const GradientText = ({ children, className = "" }) => {
  return (
    <motion.span
      initial={{ backgroundPosition: "0% 50%" }}
      animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: "linear"
      }}
      className={`inline-block bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent bg-[length:200%_auto] ${className}`}
    >
      {children}
    </motion.span>
  );
};

GradientText.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

export default GradientText;
