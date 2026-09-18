import PropTypes from "prop-types";

/**
 * Renders a single architectural decision in a structured "Chose / Over / Because" format.
 * Only shown inside the expanded Layer 2 of a ProjectCard.
 */
const DecisionLog = ({ decisionLog }) => {
  const { chose, over, because } = decisionLog;

  const rows = [
    { label: "Chose", value: chose },
    { label: "Over", value: over },
    { label: "Because", value: because },
  ];

  return (
    <div className="decision-log">
      <p
        className="text-label mb-3"
      >
        Architecture Decision
      </p>

      <div className="flex flex-col gap-2.5">
        {rows.map(({ label, value }) => (
          <div key={label} className="flex gap-3 text-sm">
            <span
              className="text-mono w-16 shrink-0 text-xs uppercase"
              style={{ color: "var(--color-field)", letterSpacing: "0.06em" }}
            >
              {label}
            </span>
            <span style={{ color: "var(--color-ink-secondary)" }}>{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

DecisionLog.propTypes = {
  decisionLog: PropTypes.shape({
    chose:   PropTypes.string.isRequired,
    over:    PropTypes.string.isRequired,
    because: PropTypes.string.isRequired,
  }).isRequired,
};

export default DecisionLog;
