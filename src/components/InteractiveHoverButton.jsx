import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const InteractiveHoverButton = ({
  children,
  className = '',
  variant = 'glow'
}) => {
  const buttonRef = useRef(null);
  const [ripples, setRipples] = useState([]);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

  const handleClick = (e) => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ripple = {
      x,
      y,
      id: Date.now()
    };

    setRipples(prev => [...prev, ripple]);

    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== ripple.id));
    }, 600);
  };

  const handleMouseMove = (e) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  const variants = {
    glow: 'relative overflow-hidden px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all',
    neon: 'relative overflow-hidden px-8 py-4 bg-transparent border-2 border-cyan-400 text-cyan-400 rounded-full font-semibold hover:bg-cyan-400 hover:text-black hover:shadow-[0_0_30px_rgba(34,211,238,0.6)] transition-all',
    gradient: 'relative overflow-hidden px-8 py-4 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white rounded-full font-semibold hover:scale-105 transition-transform'
  };

  return (
    <motion.button
      ref={buttonRef}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      className={`${variants[variant]} ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Background glow effect */}
      <div
        className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(255,255,255,0.2), transparent 50%)`
        }}
      />

      {/* Ripple effects */}
      {ripples.map(ripple => (
        <span
          key={ripple.id}
          className="absolute rounded-full bg-white opacity-50 pointer-events-none animate-ripple"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: 0,
            height: 0,
            transform: 'translate(-50%, -50%)'
          }}
        />
      ))}

      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};

InteractiveHoverButton.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['glow', 'neon', 'gradient'])
};

export default InteractiveHoverButton;
