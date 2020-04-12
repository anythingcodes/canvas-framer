import React from "react"
import PropTypes from "prop-types"
import { IconProps } from "../base"

const Battery: React.FC<IconProps> = props => {
    const { color, size, ...otherProps } = props
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
            <rect x="1" y="6" width="18" height="12" rx="2" ry="2"></rect>
            <line x1="23" y1="13" x2="23" y2="11"></line>
        </svg>
    )
}

Battery.propTypes = {
    color: PropTypes.string,
    size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

Battery.defaultProps = {
    color: "currentColor",
    size: "24",
}

export default Battery
