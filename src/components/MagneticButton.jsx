import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const MagneticButton = ({
  children,
  className = '',
  strength = 0.4,
  ...props
}) => {
  const buttonRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!buttonRef.current) return;
    
    const button = buttonRef.current;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    setPosition({ x: x * strength, y: y * strength });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      className={`relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-medium transition-all bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg group hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50 ${className}`}
      {...props}
    >
      <span className="absolute inset-0 w-full h-full transition duration-300 ease-out opacity-0 bg-gradient-to-br from-pink-500 via-purple-600 to-blue-500 group-hover:opacity-90" />
      <span className="relative flex items-center gap-2 text-white font-semibold">
        {children}
      </span>
    </motion.button>
  );
};

MagneticButton.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  strength: PropTypes.number
};

export default MagneticButton;
