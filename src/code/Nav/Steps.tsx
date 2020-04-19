import * as React from "react"
import { Frame, addPropertyControls, ControlType } from "framer"

// Open Preview: Command + P
// Learn more: https://framer.com/api

export function Steps(props) {
    const { text, tint, onTap, ...rest } = props

    return (
        <Frame
            {...rest}
            background={tint}
            onTap={onTap}
            whileHover={{
                scale: 1.1,
            }}
            style={{
                color: "#fff",
                fontSize: 16,
                fontWeight: 600,
            }}
        >
            {text}
        </Frame>
    )
}

Steps.defaultProps = {
    height: 105,
    width: 1440,
    text: "Steps",
    tint: "#0099ff",
}

// Learn more: https://framer.com/api/property-controls/
addPropertyControls(Steps, {
    text: {
        title: "Text",
        type: ControlType.String,
    },
    tint: {
        title: "Tint",
        type: ControlType.Color,
        defaultValue: "#0099ff",
    },
    onTap: {
        type: ControlType.EventHandler,
    },
})
