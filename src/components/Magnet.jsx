import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const Magnet = ({ children, strength = 0.3, className = "" }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;
    
    setPosition({ x: deltaX, y: deltaY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{
        type: "spring",
        stiffness: 150,
        damping: 15,
        mass: 0.1,
      }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
};

Magnet.propTypes = {
  children: PropTypes.node.isRequired,
  strength: PropTypes.number,
  className: PropTypes.string
};

export default Magnet;
