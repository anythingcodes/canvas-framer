import * as React from "react"
import styled, { css } from "styled-components"
import { Frame, addPropertyControls, ControlType } from "framer"

export function Button(props) {
    const { textLabel, disabled, theme, ...rest } = props

    const StyledButton = styled.a`
        background-color: ${disabled ? "grey" : "fuchsia"};
        color: black;
        cursor: pointer;

        ${disabled &&
            css`
            opacity: 0.3;
            pointer-events: none;
        `}

        ${theme === "primary" &&
            css`
            color: white;
            background-color: green;
        `}
        ${theme === "secondary" &&
            css`
            color: white;
            background-color: blue;
        `}
    `

    return (
        <StyledButton
            {...rest}
            whileHover={{
                scale: 1.1,
            }}
            // style={{
            //     color: "#fff",
            //     fontSize: 16,
            //     fontWeight: 600,
            // }}
        >
            {textLabel}
        </StyledButton>
    )
}

Button.defaultProps = {
    height: 128,
    width: 240,
    textLabel: "Read More",

    // Can add margin, padding, etc.
    // Force conversation & collaboration
}

// Learn more: https://framer.com/api/property-controls/
addPropertyControls(Button, {
    textLabel: {
        title: "Label",
        type: ControlType.String,
        defaultValue: "Hello Framer!",
    },
    disabled: {
        title: "Disabled",
        type: ControlType.Boolean,
        defaultValue: false,
    },
})
