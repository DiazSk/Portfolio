import { useState, useEffect, useRef } from 'react';

export default function DecryptedText({
  text,
  speed = 50,
  maxIterations = 10,
  sequential = false,
  revealDirection = 'start',
  useOriginalCharsOnly = false,
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+',
  className = '',
  parentClassName = '',
  encryptedClassName = '',
  animateOn = 'hover',
  ...props
}) {
  const [displayText, setDisplayText] = useState(text);
  const [isHovering, setIsHovering] = useState(false);
  const [isScrambling, setIsScrambling] = useState(false);
  const [revealedIndices, setRevealedIndices] = useState(new Set());
  const [hasAnimated, setHasAnimated] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    let interval;
    let currentIteration = 0;

    const shouldAnimate =
      (animateOn === 'view' && !hasAnimated) ||
      (animateOn === 'hover' && isHovering) ||
      (animateOn === 'both' && (isHovering || !hasAnimated));

    if (shouldAnimate && !isScrambling) {
      setIsScrambling(true);
      const revealOrder = [];

      if (sequential) {
        for (let i = 0; i < text.length; i++) {
          revealOrder.push(revealDirection === 'start' ? i : text.length - 1 - i);
        }
      } else {
        revealOrder.push(...Array.from({ length: text.length }, (_, i) => i));
        for (let i = revealOrder.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [revealOrder[i], revealOrder[j]] = [revealOrder[j], revealOrder[i]];
        }
      }

      interval = setInterval(() => {
        if (currentIteration < maxIterations * text.length) {
          setDisplayText(() => {
            return text
              .split('')
              .map((char, index) => {
                const iterationsForChar = Math.floor(currentIteration / text.length);
                const currentRevealIndex = sequential
                  ? Math.min(Math.floor(currentIteration / maxIterations), text.length - 1)
                  : revealOrder.findIndex((i) => i === index);

                if (
                  (sequential && index <= currentRevealIndex) ||
                  (!sequential && currentIteration >= currentRevealIndex * maxIterations + maxIterations)
                ) {
                  setRevealedIndices((prev) => new Set([...prev, index]));
                  return char;
                }

                if (useOriginalCharsOnly) {
                  return text[Math.floor(Math.random() * text.length)];
                }

                return characters[Math.floor(Math.random() * characters.length)];
              })
              .join('');
          });
          currentIteration++;
        } else {
          setDisplayText(text);
          setIsScrambling(false);
          if (animateOn === 'view') {
            setHasAnimated(true);
          }
          clearInterval(interval);
        }
      }, speed);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [
    text,
    isHovering,
    isScrambling,
    speed,
    maxIterations,
    sequential,
    revealDirection,
    useOriginalCharsOnly,
    characters,
    animateOn,
    hasAnimated
  ]);

  useEffect(() => {
    if (animateOn === 'view' && containerRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !hasAnimated) {
              setIsScrambling(true);
            }
          });
        },
        { threshold: 0.1 }
      );

      observer.observe(containerRef.current);

      return () => {
        if (containerRef.current) {
          observer.unobserve(containerRef.current);
        }
      };
    }
  }, [animateOn, hasAnimated]);

  return (
    <span
      ref={containerRef}
      className={`inline-block ${parentClassName}`}
      onMouseEnter={() => (animateOn === 'hover' || animateOn === 'both') && setIsHovering(true)}
      onMouseLeave={() => (animateOn === 'hover' || animateOn === 'both') && setIsHovering(false)}
      {...props}
    >
      {displayText.split('').map((char, index) => (
        <span
          key={index}
          className={`${className} ${revealedIndices.has(index) ? '' : encryptedClassName}`}
        >
          {char}
        </span>
      ))}
    </span>
  );
}
