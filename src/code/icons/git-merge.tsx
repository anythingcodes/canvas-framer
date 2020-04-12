import React from "react";
import PropTypes from "prop-types";
import { IconProps } from "../base";

const GitMerge: React.FC<IconProps> = (props) => {
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
      <circle cx="18" cy="18" r="3"></circle>
      <circle cx="6" cy="6" r="3"></circle>
      <path d="M6 21V9a9 9 0 0 0 9 9"></path>
    </svg>
  );
};

GitMerge.propTypes = {
  color: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

GitMerge.defaultProps = {
  color: "currentColor",
  size: "24",
};

export default GitMerge;
