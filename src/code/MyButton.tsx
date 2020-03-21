import * as React from "react"
import styled, { css } from "styled-components"
import { addPropertyControls, ControlType } from "framer"

// Open Preview: Command + P
// Learn more: https://framer.com/api

export function Button(props) {
    const { text, ...rest } = props

    const StyledFrame = styled.div`
        background-color: fuchsia;
        color: black;
        ${props =>
            props.primary &&
            css`
            color: white;
            background-color: green;
        `}
        ${props =>
            props.secondary &&
            css`
            color: white;
            background-color: blue;
        `}
    `

    return (
        <StyledFrame
            {...rest}
            whileHover={{
                scale: 1.1,
            }}
        >
            {text}
        </StyledFrame>
    )
}

Button.defaultProps = {
    height: 128,
    width: 240,
}

// Learn more: https://framer.com/api/property-controls/
addPropertyControls(Button, {
    // Text-wrapping L10N, width limits, think about multi-line
    // Enum for BG themes & font color
    text: {
        title: "Text",
        type: ControlType.String,
        defaultValue: "Hello Framer!",
    },
})
