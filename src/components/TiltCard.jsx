import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import PropTypes from 'prop-types';

const TiltCard = ({ children, className = "" }) => {
  const cardRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    const glow = glowRef.current;
    if (!card) return;

    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * 15;
      const rotateY = ((x - centerX) / centerX) * -15;

      gsap.to(card, {
        rotateX,
        rotateY,
        duration: 0.5,
        ease: 'power2.out',
        transformPerspective: 1000,
      });

      if (glow) {
        gsap.to(glow, {
          x: x - rect.width / 2,
          y: y - rect.height / 2,
          opacity: 0.6,
          duration: 0.3,
        });
      }
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.5,
        ease: 'power2.out',
      });

      if (glow) {
        gsap.to(glow, {
          opacity: 0,
          duration: 0.3,
        });
      }
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div 
      ref={cardRef}
      className={`relative rounded-2xl bg-gradient-to-br from-gray-900/80 to-gray-800/50 backdrop-blur-lg border border-gray-700/50 overflow-hidden transition-all duration-300 hover:border-cyan-500/50 ${className}`}
      style={{ 
        transformStyle: 'preserve-3d',
        transform: 'perspective(1000px)',
      }}
    >
      {/* Glow effect */}
      <div
        ref={glowRef}
        className="absolute w-64 h-64 rounded-full blur-3xl opacity-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.4) 0%, transparent 70%)',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />
      
      {/* Content */}
      <div className="relative z-10" style={{ transform: 'translateZ(50px)' }}>
        {children}
      </div>
    </div>
  );
};

TiltCard.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

export default TiltCard;
