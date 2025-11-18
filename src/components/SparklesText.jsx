import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const SparklesText = ({
  text,
  className = '',
  sparklesCount = 10,
  colors = ['#4FC3F7', '#BA68C8', '#FFD54F']
}) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const sparks = [];

    const createSpark = () => {
      const spark = document.createElement('span');
      spark.className = 'absolute pointer-events-none';
      spark.style.left = `${Math.random() * 100}%`;
      spark.style.top = `${Math.random() * 100}%`;
      spark.style.width = `${Math.random() * 4 + 2}px`;
      spark.style.height = `${Math.random() * 4 + 2}px`;
      spark.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      spark.style.borderRadius = '50%';
      spark.style.boxShadow = `0 0 ${Math.random() * 10 + 5}px currentColor`;
      spark.style.animation = `sparkle ${Math.random() * 2 + 1}s ease-in-out infinite`;
      spark.style.animationDelay = `${Math.random() * 2}s`;
      spark.style.opacity = '0';
      
      container.appendChild(spark);
      sparks.push(spark);

      if (sparks.length > sparklesCount) {
        const oldSpark = sparks.shift();
        oldSpark?.remove();
      }
    };

    const interval = setInterval(createSpark, 200);

    return () => {
      clearInterval(interval);
      sparks.forEach(spark => spark?.remove());
    };
  }, [sparklesCount, colors]);

  return (
    <span ref={containerRef} className={`relative inline-block ${className}`}>
      {text}
    </span>
  );
};

SparklesText.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
  sparklesCount: PropTypes.number,
  colors: PropTypes.arrayOf(PropTypes.string)
};

export default SparklesText;
