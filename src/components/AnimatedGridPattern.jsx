import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const AnimatedGridPattern = ({
  width = 40,
  height = 40,
  className = '',
  strokeDasharray = '4 2',
  numSquares = 50,
  maxOpacity = 0.3,
  duration = 4
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size to window size for fixed positioning
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const squares = Array.from({ length: numSquares }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 60 + 20,
      opacity: 0,
      targetOpacity: Math.random() * maxOpacity,
      speed: Math.random() * 0.02 + 0.01
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);

      for (let x = 0; x < canvas.width; x += width) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      for (let y = 0; y < canvas.height; y += height) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Animate squares
      squares.forEach(square => {
        if (square.opacity < square.targetOpacity) {
          square.opacity += square.speed;
        } else if (square.opacity > square.targetOpacity) {
          square.opacity -= square.speed;
        }

        if (Math.abs(square.opacity - square.targetOpacity) < 0.01) {
          square.targetOpacity = Math.random() * maxOpacity;
        }

        ctx.fillStyle = `rgba(100, 149, 237, ${square.opacity})`;
        ctx.fillRect(square.x, square.y, square.size, square.size);
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [width, height, numSquares, maxOpacity, duration]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ 
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        opacity: 0.4,
        pointerEvents: 'none'
      }}
    />
  );
};

AnimatedGridPattern.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  className: PropTypes.string,
  strokeDasharray: PropTypes.string,
  numSquares: PropTypes.number,
  maxOpacity: PropTypes.number,
  duration: PropTypes.number
};

export default AnimatedGridPattern;
