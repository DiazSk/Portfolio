import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CountUp = ({ end, duration = 2000, suffix = "", prefix = "" }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return (
    <span>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
};

const MetricsCounter = () => {
  const metrics = [
    { 
      value: 66000, 
      label: "Records Processed", 
      suffix: "+",
      icon: "📊",
      gradient: "from-blue-400 to-cyan-500"
    },
    { 
      value: 96.3, 
      label: "Test Pass Rate", 
      suffix: "%",
      icon: "✅",
      gradient: "from-green-400 to-emerald-500"
    },
    { 
      value: 67, 
      label: "Query Optimization", 
      suffix: "%",
      icon: "⚡",
      gradient: "from-yellow-400 to-orange-500"
    },
    { 
      value: 2297, 
      label: "Annual Savings", 
      prefix: "$",
      icon: "💰",
      gradient: "from-purple-400 to-pink-500"
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2, duration: 0.6 }}
      className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-8 max-w-4xl"
    >
      {metrics.map((metric, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.2 + idx * 0.1, duration: 0.4 }}
          whileHover={{ scale: 1.05, y: -5 }}
          className="relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300" />
          <div className="relative bg-gradient-to-br from-indigo-900/40 to-purple-900/40 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:border-white/20 transition-all duration-300">
            <div className="flex items-start justify-between mb-2">
              <span className="text-2xl">{metric.icon}</span>
            </div>
            <div className={`text-3xl lg:text-4xl font-bold bg-gradient-to-r ${metric.gradient} bg-clip-text text-transparent mb-1`}>
              <CountUp 
                end={metric.value} 
                prefix={metric.prefix} 
                suffix={metric.suffix}
                duration={2000}
              />
            </div>
            <div className="text-xs lg:text-sm text-gray-400 font-medium">
              {metric.label}
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default MetricsCounter;
