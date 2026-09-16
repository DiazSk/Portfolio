import PropTypes from "prop-types";

/**
 * Small pill badge categorising a project.
 * Systems / Backend work carries the accent so an engineering manager can
 * self-select a track. On a dark ground that emphasis is an accent hairline,
 * not the light theme's ink inversion.
 */
const RoleTag = ({ category }) => {
  const accented = category === "Backend SWE" || category === "Systems Engineering";

  return (
    <span className={`role-tag ${accented ? "role-tag-accent" : "role-tag-default"}`}>
      {category}
    </span>
  );
};

RoleTag.propTypes = {
  category: PropTypes.string.isRequired,
};

export default RoleTag;
