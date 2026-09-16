import { Fragment } from "react";
import PropTypes from "prop-types";

/**
 * Data-driven architecture schematic.
 *
 * Rendered as HTML rather than SVG on purpose: it reflows from a horizontal
 * flow to a vertical stack at small widths, the labels stay selectable and
 * screen-readable, and the type never scales below legibility the way SVG
 * <text> inside a fixed viewBox does.
 *
 * Every stage is derived from the project's own description and highlights.
 * Nothing here is inferred beyond what the repo documents.
 */
const ArchitectureDiagram = ({ stages, projectName }) => (
  <figure className="schematic" aria-label={`${projectName} architecture`}>
    <ol className="schematic-flow">
      {stages.map((stage, i) => (
        <Fragment key={stage.stage}>
          {i > 0 && <li className="edge" style={{ "--i": i }} aria-hidden="true" />}
          <li className="node" style={{ "--i": i }}>
            <span className="node-stage">{stage.stage}</span>
            <span className="node-items">
              {stage.items.map((item) => (
                <span key={item} className="node-item">
                  {item}
                </span>
              ))}
            </span>
          </li>
        </Fragment>
      ))}
    </ol>
  </figure>
);

ArchitectureDiagram.propTypes = {
  projectName: PropTypes.string.isRequired,
  stages: PropTypes.arrayOf(
    PropTypes.shape({
      stage: PropTypes.string.isRequired,
      items: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  ).isRequired,
};

export default ArchitectureDiagram;
