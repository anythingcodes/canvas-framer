import React from "react"
import PropTypes from "prop-types"
import { IconProps } from "../base"

const ArrowDown: React.FC<IconProps> = props => {
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
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <polyline points="19 12 12 19 5 12"></polyline>
        </svg>
    )
}

ArrowDown.propTypes = {
    color: PropTypes.string,
    size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

ArrowDown.defaultProps = {
    color: "currentColor",
    size: "24",
}

export default ArrowDown
