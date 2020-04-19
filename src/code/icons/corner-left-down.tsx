import React from "react";
import PropTypes from "prop-types";
import { IconProps } from "../base";

const CornerLeftDown: React.FC<IconProps> = (props) => {
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
      <polyline points="14 15 9 20 4 15"></polyline>
      <path d="M20 4h-7a4 4 0 0 0-4 4v12"></path>
    </svg>
  );
};

CornerLeftDown.propTypes = {
  color: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

CornerLeftDown.defaultProps = {
  color: "currentColor",
  size: "24",
};

export default CornerLeftDown;
