import PropTypes from "prop-types";

/**
 * Large typographic metric display - no card border, pure type hierarchy.
 * Used in the Hero section to surface the three headline numbers.
 */
const MetricStat = ({ value, label, context }) => {
  return (
    <div className="flex flex-col gap-1">
      <span
        className="metric-value text-4xl font-semibold tracking-tight md:text-5xl"
      >
        {value}
      </span>
      <span className="text-sm font-medium" style={{ color: "var(--color-ink-secondary)" }}>
        {label}
      </span>
      {context && (
        <span className="text-xs" style={{ color: "var(--color-ink-muted)" }}>
          {context}
        </span>
      )}
    </div>
  );
};

MetricStat.propTypes = {
  value:   PropTypes.string.isRequired,
  label:   PropTypes.string.isRequired,
  context: PropTypes.string,
};

export default MetricStat;
