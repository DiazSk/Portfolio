import HeroText from "../components/HeroText";
import Hyperspeed from "../components/Hyperspeed";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section id="home" className="relative flex items-center justify-center min-h-screen overflow-hidden">
      {/* Hyperspeed Background */}
      <Hyperspeed />
      
      {/* Gradient Overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50 pointer-events-none" />
      
      {/* Hero Content */}
      <div className="relative z-20 w-full">
        <HeroText />
      </div>

      {/* Floating Particles Accent */}
      <motion.div
        className="absolute top-20 right-20 w-4 h-4 bg-cyan-500 rounded-full blur-sm"
        animate={{
          y: [0, -20, 0],
          opacity: [0.3, 1, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-40 left-20 w-3 h-3 bg-purple-500 rounded-full blur-sm"
        animate={{
          y: [0, 20, 0],
          opacity: [0.3, 1, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
    </section>
  );
};

export default Hero;
