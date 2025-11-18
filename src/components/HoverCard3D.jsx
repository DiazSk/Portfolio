import { useRef, useState } from 'react';
import { motion } from 'motion/react';
import PropTypes from 'prop-types';

const HoverCard3D = ({
  children,
  className = '',
  glowColor = '132, 0, 255',
  tiltAmount = 10
}) => {
  const cardRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [glowPosition, setGlowPosition] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -tiltAmount;
    const rotateY = ((x - centerX) / centerX) * tiltAmount;

    setRotation({ x: rotateX, y: rotateY });
    setGlowPosition({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100
    });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
    setGlowPosition({ x: 50, y: 50 });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: rotation.x,
        rotateY: rotation.y
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
      className={`relative rounded-xl overflow-hidden ${className}`}
    >
      {/* Glow effect */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle 200px at ${glowPosition.x}% ${glowPosition.y}%, rgba(${glowColor}, 0.3), transparent 80%)`
        }}
      />
      
      {/* Border glow */}
      <div
        className="absolute inset-0 rounded-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
        style={{
          background: `radial-gradient(600px circle at ${glowPosition.x}% ${glowPosition.y}%, rgba(${glowColor}, 0.4), transparent 40%)`
        }}
      />
      
      {/* Content */}
      <div className="relative z-10" style={{ transform: 'translateZ(20px)' }}>
        {children}
      </div>
    </motion.div>
  );
};

HoverCard3D.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  glowColor: PropTypes.string,
  tiltAmount: PropTypes.number
};

export default HoverCard3D;
