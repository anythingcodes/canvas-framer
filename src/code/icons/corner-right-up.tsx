import React from "react";
import PropTypes from "prop-types";
import { IconProps } from "../base";

const CornerRightUp: React.FC<IconProps> = (props) => {
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
      <polyline points="10 9 15 4 20 9"></polyline>
      <path d="M4 20h7a4 4 0 0 0 4-4V4"></path>
    </svg>
  );
};

CornerRightUp.propTypes = {
  color: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

CornerRightUp.defaultProps = {
  color: "currentColor",
  size: "24",
};

export default CornerRightUp;
