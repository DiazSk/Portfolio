import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const SpotlightCard = ({ children, className = "" }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm border border-gray-700/50 ${className}`}
    >
      {/* Spotlight effect */}
      {isHovering && (
        <motion.div
          className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
          style={{
            opacity: isHovering ? 1 : 0,
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.15), transparent 40%)`,
          }}
        />
      )}
      
      {/* Glow border */}
      {isHovering && (
        <div
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300"
          style={{
            opacity: isHovering ? 1 : 0,
            background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.4), transparent 40%)`,
          }}
        />
      )}

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};

SpotlightCard.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

export default SpotlightCard;
