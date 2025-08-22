"use client";
import { useScroll, useTransform, motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

// Component for animated content items
const AnimatedContent = ({ children }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true, 
    margin: "-100px",
    amount: 0.3 
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ 
        duration: 0.6, 
        ease: "easeOut",
        delay: 0.1 
      }}
    >
      {children}
    </motion.div>
  );
};

AnimatedContent.propTypes = {
  children: PropTypes.node.isRequired
};

export const Timeline = ({ data }) => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div className="c-space section-spacing" ref={containerRef}>
      <motion.h2 
        className="text-heading"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        My Project Experience
      </motion.h2>
      
      <div ref={ref} className="relative pb-20">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-10 md:pt-40 md:gap-10"
          >
            {/* Left side - Timeline */}
            <motion.div 
              className="sticky z-40 flex flex-col items-center self-start max-w-xs md:flex-row top-40 lg:max-w-sm md:w-full"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                ease: "easeOut" 
              }}
            >
              <motion.div 
                className="absolute flex items-center justify-center w-10 h-10 rounded-full -left-[15px] bg-midnight"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.4, 
                  delay: index * 0.1 + 0.2,
                  type: "spring",
                  stiffness: 200
                }}
              >
                <div className="w-4 h-4 p-2 border rounded-full bg-neutral-800 border-neutral-700" />
              </motion.div>
              
              <motion.div 
                className="flex-col hidden gap-2 text-xl font-bold md:flex md:pl-20 md:text-4xl text-neutral-300"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1 + 0.3,
                  ease: "easeOut"
                }}
              >
                <h3>{item.date}</h3>
                <h3 className="text-3xl text-neutral-400">{item.title}</h3>
                <h3 className="text-3xl text-neutral-500">{item.job}</h3>
              </motion.div>
            </motion.div>

            {/* Right side - Content with animations */}
            <div className="relative w-full pl-20 pr-4 md:pl-4">
              {/* Mobile date/title */}
              <motion.div 
                className="block mb-4 text-2xl font-bold text-left text-neutral-300 md:hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 0.5,
                  delay: index * 0.1
                }}
              >
                <h3>{item.date}</h3>
                <h3>{item.job}</h3>
              </motion.div>
              
              {/* Content items with staggered animation */}
              {item.contents.map((content, contentIndex) => (
                <motion.p 
                  className="mb-3 font-normal text-neutral-400" 
                  key={contentIndex}
                  initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                  whileInView={{ 
                    opacity: 1, 
                    y: 0,
                    filter: "blur(0px)"
                  }}
                  viewport={{ 
                    once: true, 
                    margin: "-50px",
                    amount: 0.3
                  }}
                  transition={{ 
                    duration: 0.5,
                    delay: index * 0.1 + contentIndex * 0.08,
                    ease: "easeOut"
                  }}
                >
                  {content}
                </motion.p>
              ))}
            </div>
          </div>
        ))}
        
        {/* Animated timeline line */}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-1 left-1 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-700 to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0  w-[2px] bg-gradient-to-t from-purple-500 via-lavender/50 to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

Timeline.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired
};