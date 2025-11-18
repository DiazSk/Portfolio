import { motion } from "framer-motion";
import GradientText from "./GradientText";
import MetricsCounter from "./MetricsCounter";

const HeroText = () => {
  const variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="z-10 mt-20 text-center md:mt-40 md:text-left">
      {/* Desktop View */}
      <div className="flex-col hidden md:flex c-space">
        <motion.h1
          className="text-4xl font-medium text-white/90"
          variants={variants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Hi I&apos;m Zaid
        </motion.h1>
        
        <motion.div
          className="mt-4"
          variants={variants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <p className="text-5xl font-medium text-neutral-200 mb-2">
            Data Engineer
          </p>
          <p className="text-5xl font-medium text-neutral-200 mb-4">
            Building
          </p>
          
          <div className="text-8xl font-black mb-4">
            <GradientText>
              Scalable
            </GradientText>
          </div>
          
          <p className="text-4xl font-medium text-neutral-200">
            Data Pipelines
          </p>
        </motion.div>

        {/* Metrics Counter - Desktop */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <MetricsCounter />
        </motion.div>
      </div>

      {/* Mobile View */}
      <div className="flex flex-col space-y-6 md:hidden">
        <motion.p
          className="text-4xl font-medium text-white/90"
          variants={variants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.5 }}
        >
          Hi, I&apos;m Zaid
        </motion.p>
        
        <motion.div
          variants={variants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.8 }}
        >
          <p className="text-4xl font-black text-neutral-200 mb-4">
            Building
          </p>
          
          <div className="text-6xl font-bold mb-4">
            <GradientText>
              Scalable
            </GradientText>
          </div>
          
          <p className="text-4xl font-black text-neutral-200">
            Data Pipelines
          </p>
        </motion.div>

        {/* Metrics Counter - Mobile */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <MetricsCounter />
        </motion.div>
      </div>
    </div>
  );
};

export default HeroText;
