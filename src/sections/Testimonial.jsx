// Updated Testimonial.jsx - Replace your existing file with this
import { twMerge } from "tailwind-merge";
import Marquee from "../components/Marquee";
import PropTypes from "prop-types";

// Replace reviews with project achievements
const projectAchievements = [
  {
    title: "Fraud Detection Excellence",
    metric: "99.2%",
    subtitle: "Accuracy Rate",
    description: "Preventing $1.6M+ in annual losses with 0.1% false positive rate",
    gradient: "from-green-400 to-emerald-600",
    icon: "🛡️"
  },
  {
    title: "Portfolio Optimization",
    metric: "$5M",
    subtitle: "ARR Capability",
    description: "Institutional-grade platform with 30% return improvement",
    gradient: "from-blue-400 to-indigo-600",
    icon: "📈"
  },
  {
    title: "Customer Intelligence",
    metric: "40%",
    subtitle: "Churn Reduction",
    description: "Saving $487K annually through predictive analytics",
    gradient: "from-purple-400 to-pink-600",
    icon: "📊"
  },
  {
    title: "Processing Power",
    metric: "100K+",
    subtitle: "Daily Predictions",
    description: "Real-time processing with <100ms latency",
    gradient: "from-yellow-400 to-orange-600",
    icon: "⚡"
  },
  {
    title: "Total Impact",
    metric: "$2M+",
    subtitle: "Annual Savings",
    description: "Measurable business value across all ML systems",
    gradient: "from-teal-400 to-cyan-600",
    icon: "💰"
  },
  {
    title: "System Reliability",
    metric: "99.9%",
    subtitle: "Uptime SLA",
    description: "Production-grade reliability across all deployments",
    gradient: "from-red-400 to-rose-600",
    icon: "🚀"
  }
];

const AchievementCard = ({ title, metric, subtitle, description, gradient, icon }) => {
  return (
    <figure
      className={twMerge(
        "relative h-full w-80 cursor-pointer overflow-hidden rounded-xl border p-6",
        "border-gray-50/[.1] bg-gradient-to-br from-indigo/20 to-storm/30",
        "hover:from-indigo/30 hover:to-storm/40 transition-all duration-300"
      )}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className={`text-5xl font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
            {metric}
          </div>
          <p className="text-sm text-gray-400 mt-1">{subtitle}</p>
        </div>
        <span className="text-3xl">{icon}</span>
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-sm text-gray-300">{description}</p>
    </figure>
  );
};

AchievementCard.propTypes = {
  title: PropTypes.string.isRequired,
  metric: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  gradient: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired
};

export default function Testimonial() {
  const firstRow = projectAchievements.slice(0, 3);
  const secondRow = projectAchievements.slice(3, 6);
  
  return (
    <div className="items-start mt-25 md:mt-35 c-space">
      <h2 className="text-heading">Proven Impact & Results</h2>
      <p className="text-lg text-gray-400 mt-3 mb-8 max-w-3xl">
        Building production ML systems that deliver measurable business value
      </p>
      <div className="relative flex flex-col items-center justify-center w-full mt-12 overflow-hidden">
        <Marquee pauseOnHover className="[--duration:30s] mb-6">
          {firstRow.map((achievement, idx) => (
            <AchievementCard key={`first-${idx}`} {...achievement} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:30s]">
          {secondRow.map((achievement, idx) => (
            <AchievementCard key={`second-${idx}`} {...achievement} />
          ))}
        </Marquee>
        <div className="absolute inset-y-0 left-0 w-1/3 pointer-events-none bg-gradient-to-r from-primary via-primary/50 to-transparent"></div>
        <div className="absolute inset-y-0 right-0 w-1/3 pointer-events-none bg-gradient-to-l from-primary via-primary/50 to-transparent"></div>
      </div>
    </div>
  );
}