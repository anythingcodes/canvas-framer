import React from "react";
import PropTypes from "prop-types";
import { IconProps } from "../base";

const Trello: React.FC<IconProps> = (props) => {
  const { color, size, ...otherProps } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...otherProps}
    >
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
      <rect x="7" y="7" width="3" height="9"></rect>
      <rect x="14" y="7" width="3" height="5"></rect>
    </svg>
  );
};

Trello.propTypes = {
  color: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

Trello.defaultProps = {
  color: "currentColor",
  size: "24",
};

export default Trello;
