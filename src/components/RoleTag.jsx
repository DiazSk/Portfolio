import PropTypes from "prop-types";

/**
 * Small pill badge categorising a project.
 * Backend SWE is inverted (dark on light) to signal it's categorically
 * different from the Data Engineering / Analytics group.
 */
const RoleTag = ({ category }) => {
  const inverted = category === "Backend SWE" || category === "Systems Engineering";

  return (
    <span className={`role-tag ${inverted ? "role-tag-inverted" : "role-tag-default"}`}>
      {category}
    </span>
  );
};

RoleTag.propTypes = {
  category: PropTypes.string.isRequired,
};

export default RoleTag;
