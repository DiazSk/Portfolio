import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PropTypes from 'prop-types';

gsap.registerPlugin(ScrollTrigger);

const ScrollReveal = ({ 
  children, 
  direction = 'up', 
  delay = 0,
  duration = 1,
  className = "" 
}) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const directions = {
      up: { y: 100, x: 0 },
      down: { y: -100, x: 0 },
      left: { y: 0, x: 100 },
      right: { y: 0, x: -100 },
    };

    const { x, y } = directions[direction] || directions.up;

    gsap.fromTo(
      element,
      {
        opacity: 0,
        x,
        y,
      },
      {
        opacity: 1,
        x: 0,
        y: 0,
        duration,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [direction, delay, duration]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
};

ScrollReveal.propTypes = {
  children: PropTypes.node.isRequired,
  direction: PropTypes.oneOf(['up', 'down', 'left', 'right']),
  delay: PropTypes.number,
  duration: PropTypes.number,
  className: PropTypes.string
};

export default ScrollReveal;
