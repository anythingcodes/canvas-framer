import * as React from "react"
import { Frame, addPropertyControls, ControlType } from "framer"
import HeaderStyles from "./HeaderStyles"

export function Header(props) {
    const { title, headingLevel, ...rest } = props

    const HeadingComponent = HeaderStyles[headingLevel]

    return <HeadingComponent {...rest}>{title}</HeadingComponent>
}

Header.defaultProps = {
    height: 128,
    width: 240,
    title: "Canvas Design System",
    headingLevel: "h1",
}

// Learn more: https://framer.com/api/property-controls/

addPropertyControls(Header, {
    title: {
        title: "Text",
        type: ControlType.String,
        placeholder: "Header Title",
    },
    headingLevel: {
        type: ControlType.Enum,
        defaultValue: "h1",
        options: ["h1", "h2", "h3", "h4", "h5"],
    },
})
