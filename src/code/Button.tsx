import * as React from "react"
import styled, { css } from "styled-components"
import { Frame, addPropertyControls, ControlType } from "framer"

const StyledButton = styled.a`
    background-color: ${props => (props.disabled ? "grey" : "fuchsia")};
    color: black;
    cursor: pointer;

    ${props =>
        props.disabled &&
        css`
        opacity: 0.3;
        pointer-events: none;
    `}
`

export function Button(props) {
    const { textLabel, ...rest } = props

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
