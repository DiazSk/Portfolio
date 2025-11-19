import { useRef, useEffect, useCallback, useState } from 'react';
import { gsap } from 'gsap';


const DEFAULT_PARTICLE_COUNT = 12;
const DEFAULT_SPOTLIGHT_RADIUS = 300;
const DEFAULT_GLOW_COLOR = '132, 0, 255';
const MOBILE_BREAKPOINT = 768;

const MagicBento = ({
    items = [],
    textAutoHide = true,
    enableStars = true,
    enableSpotlight = true,
    enableBorderGlow = true,
    enableTilt = false,
    enableMagnetism = false,
    clickEffect = true,
    spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
    particleCount = DEFAULT_PARTICLE_COUNT,
    glowColor = DEFAULT_GLOW_COLOR,
}) => {
    const containerRef = useRef(null);
    const cardsRef = useRef([]);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const handleMouseMove = useCallback(
        (e) => {
            if (isMobile) return;

            const container = containerRef.current;
            if (!container) return;

            const rect = container.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;

            if (enableSpotlight) {
                container.style.setProperty('--spotlight-x', `${mouseX}px`);
                container.style.setProperty('--spotlight-y', `${mouseY}px`);
                container.style.setProperty('--spotlight-radius', `${spotlightRadius}px`);
            }

            cardsRef.current.forEach((card) => {
                if (!card) return;
                const cardRect = card.getBoundingClientRect();
                const cardCenterX = cardRect.left + cardRect.width / 2 - rect.left;
                const cardCenterY = cardRect.top + cardRect.height / 2 - rect.top;

                if (enableTilt) {
                    const rotateX = (mouseY - cardCenterY) / 20;
                    const rotateY = (cardCenterX - mouseX) / 20;
                    gsap.to(card, {
                        rotationX: rotateX,
                        rotationY: rotateY,
                        scale: 1.02,
                        duration: 0.3,
                        ease: 'power2.out',
                    });
                }

                if (enableMagnetism) {
                    const dx = mouseX - cardCenterX;
                    const dy = mouseY - cardCenterY;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    const force = Math.max(0, 1 - distance / 200);
                    gsap.to(card, {
                        x: dx * force * 0.1,
                        y: dy * force * 0.1,
                        duration: 0.3,
                        ease: 'power2.out',
                    });
                }
            });
        },
        [enableSpotlight, enableTilt, enableMagnetism, spotlightRadius, isMobile]
    );

    const handleMouseLeave = useCallback(() => {
        if (isMobile) return;

        if (enableSpotlight) {
            const container = containerRef.current;
            if (container) {
                container.style.setProperty('--spotlight-radius', `0px`);
            }
        }

        cardsRef.current.forEach((card) => {
            if (!card) return;
            gsap.to(card, {
                rotationX: 0,
                rotationY: 0,
                scale: 1,
                x: 0,
                y: 0,
                duration: 0.5,
                ease: 'elastic.out(1, 0.3)',
            });
        });
    }, [enableSpotlight, isMobile]);

    const handleClick = useCallback(
        (e) => {
            if (isMobile || !clickEffect) return;

            const container = containerRef.current;
            if (!container) return;

            const rect = container.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const clickY = e.clientY - rect.top;

            if (enableStars) {
                for (let i = 0; i < particleCount; i++) {
                    const particle = document.createElement('div');
                    particle.classList.add('particle');
                    particle.style.setProperty('--glow-color', glowColor);
                    container.appendChild(particle);

                    const angle = Math.random() * Math.PI * 2;
                    const distance = Math.random() * 50 + 50;
                    const startX = clickX;
                    const startY = clickY;
                    const endX = clickX + Math.cos(angle) * distance;
                    const endY = clickY + Math.sin(angle) * distance;

                    gsap.fromTo(
                        particle,
                        { x: startX, y: startY, opacity: 1, scale: Math.random() * 0.5 + 0.5 },
                        {
                            x: endX,
                            y: endY,
                            opacity: 0,
                            scale: 0,
                            duration: Math.random() * 0.5 + 0.5,
                            ease: 'power2.out',
                            onComplete: () => particle.remove(),
                        }
                    );
                }
            }
        },
        [enableStars, particleCount, glowColor, clickEffect, isMobile]
    );

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        container.addEventListener('mousemove', handleMouseMove);
        container.addEventListener('mouseleave', handleMouseLeave);
        container.addEventListener('click', handleClick);

        if (enableBorderGlow) {
            container.style.setProperty('--glow-color', glowColor);
            container.classList.add('border-glow-effect');
        }

        return () => {
            container.removeEventListener('mousemove', handleMouseMove);
            container.removeEventListener('mouseleave', handleMouseLeave);
            container.removeEventListener('click', handleClick);
        };
    }, [handleMouseMove, handleMouseLeave, handleClick, enableBorderGlow, glowColor]);

    return (
        <div
            ref={containerRef}
            className={`magic-bento-container ${textAutoHide ? 'text-auto-hide' : ''} ${enableSpotlight ? 'spotlight-effect' : ''}`}
        >
            {items.map((item, index) => (
                <div
                    key={index}
                    ref={(el) => (cardsRef.current[index] = el)}
                    className={`magic-bento-card ${item.className || ''}`}
                    style={{ backgroundColor: item.color || '#060010' }}
                >
                    {item.content}
                </div>
            ))}
        </div>
    );
};

export default MagicBento;
