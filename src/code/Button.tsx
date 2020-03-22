import * as React from "react"
import styled, { css } from "styled-components"
import { Frame, addPropertyControls, ControlType } from "framer"
import { colors } from "./canvas"

const StyledButton = styled.button`
    font-family: 'AvenirNext-DemiBold';
    color: ${colors.Olaf};
    background-color: ${colors.Lorax};
    display: inline-block;
    border-radius: 3px;
    cursor: pointer;
    padding: 12px 24px;
    line-height: 1;
    font-size: 14px;
    white-space: nowrap;
    transition: all .15s ease-out;
    -webkit-appearance: button;
    border-radius: .1875rem;
    border: 1px solid ${colors.Lorax};
    -webkit-font-smoothing: auto;
    -moz-osx-font-smoothing: auto;
    font-smoothing: auto;
    text-shadow: 0 0 1px transparent;
    &:hover {
        background-color: ${colors.BUTTON_PRIMARY_HOVER_FILL};
    }
    &:active {
        background-color: ${colors["Lorax Dark"]};
        border-color: ${colors["Lorax Dark"]};
    }

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
    height: 44,
    width: 112,
    textLabel: "Continue",

    // Can add margin, padding, etc.
    // Force conversation & collaboration
}

// Learn more: https://framer.com/api/property-controls/
addPropertyControls(Button, {
    textLabel: {
        title: "Label",
        type: ControlType.String,
        defaultValue: "Next",
    },
    disabled: {
        title: "Disabled",
        type: ControlType.Boolean,
        defaultValue: false,
    },
})
