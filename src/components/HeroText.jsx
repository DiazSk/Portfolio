import { FlipWords } from "./FlipWords";
import { motion } from "framer-motion";

const HeroText = () => {
  const words = ["Scalable", "Production-Ready", "Real-Time", "Optimized"];
  
  const variants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  };
  
  return (
    <div className="z-10 mt-20 rounded-3xl bg-clip-text text-center md:mt-40 md:text-left">
      {/* Desktop View */}
      <div className="hidden flex-col md:-ml-8 md:flex md:max-w-[640px] lg:max-w-[720px]">
        <motion.h1
          className="text-base font-semibold uppercase tracking-[0.22em] text-neutral-300"
          variants={variants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1 }}
        >
          Hi I&apos;m Zaid
        </motion.h1>
        <div className="flex flex-col items-start">
          <motion.p
            className="text-5xl font-semibold leading-tight tracking-tight text-neutral-200"
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.2 }}
          >
            Data Engineer <br /> Building
          </motion.p>
          <motion.div
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.5 }}
          >
            <FlipWords
              words={words}
              className="text-8xl font-black leading-none tracking-tight text-white"
            />
          </motion.div>
          <motion.p
            className="mt-4 text-4xl font-medium tracking-wide text-neutral-300/90"
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.8 }}
          >
            Data Pipelines
          </motion.p>
        </div>
      </div>
      
      {/* Mobile View */}
      <div className="flex flex-col space-y-4 md:hidden">
        <motion.p
          className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400"
          variants={variants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1 }}
        >
          Hi, I&apos;m Zaid
        </motion.p>
        <div>
          <motion.p
            className="text-4xl font-semibold leading-tight tracking-tight text-neutral-200"
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.2 }}
          >
            Building
          </motion.p>
          <motion.div
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.5 }}
          >
            <FlipWords
              words={words}
              className="text-7xl font-black leading-none tracking-tight text-white"
            />
          </motion.div>
          <motion.p
            className="mt-2 text-3xl font-medium tracking-wide text-neutral-300/90"
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.8 }}
          >
            Data Pipelines
          </motion.p>
        </div>
      </div>
    </div>
  );
};

export default HeroText;
