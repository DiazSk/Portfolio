import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const PipelineFlow = () => {
  const [activeStep, setActiveStep] = useState(0);
  
  const steps = [
    { name: "API Source", icon: "🔌", color: "from-blue-500 to-cyan-500" },
    { name: "Kafka Stream", icon: "📨", color: "from-purple-500 to-pink-500" },
    { name: "Flink Process", icon: "⚡", color: "from-yellow-500 to-orange-500" },
    { name: "Transform", icon: "🔄", color: "from-green-500 to-emerald-500" },
    { name: "Storage", icon: "🗄️", color: "from-indigo-500 to-purple-500" },
    { name: "Dashboard", icon: "📊", color: "from-pink-500 to-rose-500" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [steps.length]);

  return (
    <div className="w-full py-8">
      <div className="flex items-center justify-between gap-2 relative">
        {steps.map((step, idx) => (
          <div key={idx} className="flex items-center flex-1">
            {/* Step Node */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0.5 }}
              animate={{
                scale: activeStep === idx ? 1.2 : 0.9,
                opacity: activeStep === idx ? 1 : 0.6
              }}
              transition={{ duration: 0.3 }}
              className="relative flex flex-col items-center"
            >
              <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center text-3xl shadow-lg`}>
                {step.icon}
              </div>
              <span className="text-xs mt-2 text-gray-400 font-medium text-center">
                {step.name}
              </span>
              
              {/* Pulse Animation on Active */}
              {activeStep === idx && (
                <motion.div
                  className={`absolute inset-0 rounded-full bg-gradient-to-br ${step.color}`}
                  initial={{ scale: 1, opacity: 0.6 }}
                  animate={{ scale: 1.5, opacity: 0 }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              )}
            </motion.div>

            {/* Connector Arrow */}
            {idx < steps.length - 1 && (
              <div className="flex-1 flex items-center px-2">
                <motion.div
                  className="h-0.5 w-full bg-gradient-to-r from-gray-600 to-gray-700 relative overflow-hidden"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  {/* Animated data packet */}
                  {activeStep === idx && (
                    <motion.div
                      className="absolute top-0 left-0 h-full w-8 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
                      initial={{ x: '-100%' }}
                      animate={{ x: '300%' }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
                  )}
                </motion.div>
                <div className="text-gray-500 ml-1">→</div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Stats Bar */}
      <div className="mt-8 grid grid-cols-3 gap-4 text-center">
        <div className="bg-indigo-900/20 border border-indigo-500/30 rounded-lg p-3">
          <div className="text-2xl font-bold text-cyan-400">66K+</div>
          <div className="text-xs text-gray-400">Records/Day</div>
        </div>
        <div className="bg-indigo-900/20 border border-indigo-500/30 rounded-lg p-3">
          <div className="text-2xl font-bold text-green-400">&lt;100ms</div>
          <div className="text-xs text-gray-400">Latency</div>
        </div>
        <div className="bg-indigo-900/20 border border-indigo-500/30 rounded-lg p-3">
          <div className="text-2xl font-bold text-purple-400">96.3%</div>
          <div className="text-xs text-gray-400">Data Quality</div>
        </div>
      </div>
    </div>
  );
};

export default PipelineFlow;
