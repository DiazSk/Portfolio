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
        className="mb-3 text-xs font-semibold uppercase tracking-widest"
        style={{ color: "var(--color-ink-muted)" }}
      >
        Architecture Decision
      </p>

      <div className="flex flex-col gap-2.5">
        {rows.map(({ label, value }) => (
          <div key={label} className="flex gap-3 text-sm">
            <span
              className="w-14 shrink-0 font-medium"
              style={{ color: "var(--color-ink-muted)", fontVariant: "small-caps" }}
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
