import PropTypes from "prop-types";

/**
 * Large typographic metric display - no card border, pure type hierarchy.
 * Used in the Hero section to surface the three headline numbers.
 */
const MetricStat = ({ value, label, context }) => {
  return (
    <div className="flex flex-col gap-1">
      <span
        className="metric-value"
        style={{ fontSize: "clamp(2.5rem, 4.5vw, 4rem)" }}
      >
        {value}
      </span>
      <span
        className="text-mono mt-1 text-xs uppercase"
        style={{ color: "var(--color-ink)", letterSpacing: "0.08em" }}
      >
        {label}
      </span>
      {context && (
        <span
          className="text-mono text-xs"
          style={{ color: "var(--color-ink-muted)", letterSpacing: "0.01em" }}
        >
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
