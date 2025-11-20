// Testimonial.jsx - Technical Achievements Section
// Showcasing real Data Engineering project metrics

import { twMerge } from "tailwind-merge";
import Marquee from "../components/Marquee";
import PropTypes from "prop-types";
import GradientText from "../components/GradientText";
import DecryptedText from "../components/DecryptedText";

// Real Data Engineering achievements with verified metrics
const technicalHighlights = [
  {
    title: "Data Processing Scale",
    metric: "66K+",
    subtitle: "Records Processed",
    description: "End-to-end pipeline with Airflow orchestration and dbt transformations",
    gradient: "from-blue-400 to-indigo-600",
    icon: "🔄"
  },
  {
    title: "Data Quality Excellence",
    metric: "96.3%",
    subtitle: "Test Pass Rate",
    description: "146 dbt tests + 15 Great Expectations validation checks",
    gradient: "from-green-400 to-emerald-600",
    icon: "✅"
  },
  {
    title: "Query Optimization",
    metric: "67%",
    subtitle: "Performance Gain",
    description: "PostgreSQL query optimization reducing hours to seconds",
    gradient: "from-purple-400 to-pink-600",
    icon: "⚡"
  },
  {
    title: "API Latency",
    metric: "<100ms",
    subtitle: "Response Time",
    description: "FastAPI endpoints with Redis caching and WebSocket pub/sub",
    gradient: "from-yellow-400 to-orange-600",
    icon: "🚀"
  },
  {
    title: "Cost Optimization",
    metric: "$2,297",
    subtitle: "Annual Savings",
    description: "AWS S3 lifecycle policies and resource optimization",
    gradient: "from-teal-400 to-cyan-600",
    icon: "💰"
  },
  {
    title: "Infrastructure Scale",
    metric: "24",
    subtitle: "AWS Resources",
    description: "Terraform-managed infrastructure as code with monitoring",
    gradient: "from-red-400 to-rose-600",
    icon: "🏗️"
  }
];

const TechnicalCard = ({ title, metric, subtitle, description, gradient, icon }) => {
  return (
    <figure
      className={twMerge(
        "relative h-full w-80 cursor-pointer overflow-hidden rounded-xl border p-6",
        "border-gray-50/[.1] bg-gradient-to-br from-indigo/20 to-storm/30",
        "hover:from-indigo/30 hover:to-storm/40 hover:scale-105 transition-all duration-300"
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

TechnicalCard.propTypes = {
  title: PropTypes.string.isRequired,
  metric: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  gradient: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired
};

export default function Testimonial() {
  const firstRow = technicalHighlights.slice(0, 3);
  const secondRow = technicalHighlights.slice(3, 6);

  return (
    <div className="items-start mt-25 md:mt-35 c-space pb-20">
      <h2 className="text-heading">
        <GradientText
          colors={['#40ffaa', '#4079ff', '#ff6b6b', '#4079ff', '#40ffaa']}
          animationSpeed={6}
          className="text-5xl"
        >
          Technical Achievements
        </GradientText>
      </h2>
      <p className="text-lg text-gray-400 mt-3 mb-8 max-w-3xl">
        Real metrics from production data engineering systems with measurable impact
      </p>
      <div className="relative flex flex-col items-center justify-center w-full mt-12 overflow-hidden">
        <Marquee pauseOnHover className="[--duration:30s] mb-6">
          {firstRow.map((highlight, idx) => (
            <TechnicalCard key={`first-${idx}`} {...highlight} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:30s]">
          {secondRow.map((highlight, idx) => (
            <TechnicalCard key={`second-${idx}`} {...highlight} />
          ))}
        </Marquee>
        <div className="absolute inset-y-0 left-0 w-1/3 pointer-events-none bg-gradient-to-r from-primary via-primary/50 to-transparent"></div>
        <div className="absolute inset-y-0 right-0 w-1/3 pointer-events-none bg-gradient-to-l from-primary via-primary/50 to-transparent"></div>
      </div>
    </div>
  );
}
