import * as React from "react"
import { useEffect, createElement, memo } from "react"
import styled, { css } from "styled-components"
import { Frame, addPropertyControls, ControlType, RenderTarget } from "framer"
import { colors } from "./canvas"
import { omit } from "./utils/omit"
import {
    eventTriggerProps,
    keyEventTriggerProps,
    automaticEventTriggerProps,
    eventTriggerPropertyControls,
} from "./controls"
import { sanitizePropName } from "./utils/propNameHelpers"
import { actions } from "./store/globalStore"
import { extractEventHandlersFromProps } from "./utils/extractEventHandlersFromProps"

// TODO: Use `a` if `link`; otherwise, `button`
// https://github.com/styled-components/styled-components/issues/1616
const StyledButton = styled.button`
    font-family: 'AvenirNext-DemiBold';
    cursor: pointer;
    line-height: 1;
    font-size: 14px;
    transition: all .15s ease-out;
    font-smoothing: auto;
    display: inline-block;

    // Buttons
    ${({ use }) =>
        use &&
        !use.includes("link") &&
        css`
                -webkit-appearance: button;
                border-radius: 3px;
                padding: 12px 24px;
                white-space: nowrap;
                border-radius: .1875rem;
                border: 1px solid ${colors.Lorax};
                text-shadow: 0 0 1px transparent;
            `}
    
    // Links
    ${({ use }) =>
        use &&
        use.includes("link") &&
        css`
            -webkit-appearance: none;
            font-weight: normal;
        `}

    // Primary button
    ${({ use }) =>
        use === "primary" &&
        css`
            color: ${colors.Olaf};
            background-color: ${colors.Lorax};
            &:hover {
                background-color: ${colors.BUTTON_PRIMARY_HOVER_FILL};
            }
            &:active {
                background-color: ${colors["Lorax Dark"]};
                border-color: ${colors["Lorax Dark"]};
            }
        `}
    
    // TODO: replace
    &.hidden {
        opacity: 0;
    }
    
    ${({ use }) =>
        use === "secondary" &&
        css`
            background-color: ${colors.Olaf};
            border-color: ${colors.Lorax};
            color: ${colors.Lorax};
        `}
    ${({ disabled }) =>
        disabled &&
        css`
        opacity: 0.3;
        pointer-events: none;
    `}
`

function _Button(props) {
    const {
        textLabel,
        use,
        leadingIcon,
        trailingIcon,
        additionalClassName,
        children,
        target,
        ...rest
    } = props
    const sanitizedTarget = sanitizePropName(target)
    console.log(sanitizedTarget)

    if (RenderTarget.current() === RenderTarget.thumbnail) {
        return <ButtonActionThumbnail />
    }

    const {
        getSwitchStateIndex,
        setSwitchStateIndex,
        registerSwitchStates,
        getAllSwitchStates,
    } = actions

    // Extract event handlers from props
    let [
        eventHandlers,
        keyEvents,
        automaticEvents,
    ] = extractEventHandlersFromProps(
        props,
        {
            getSwitchStateIndex,
            setSwitchStateIndex,
            registerSwitchStates,
            getAllSwitchStates,
        },
        sanitizedTarget
    )

    const automaticEventProps = Object.keys(props)
        .filter(prop => automaticEventTriggerProps.indexOf(prop) !== -1)
        .map(prop => props[prop])

    // execute automatic (delay) event triggers
    useEffect(() => {
        if (RenderTarget.current() !== RenderTarget.preview) {
            return
        }

        const timeouts = automaticEvents.map(({ handler }) => handler())

        return () => {
            timeouts.forEach(clearTimeout)
        }
    }, [...automaticEventProps, sanitizedTarget, props.id])

    const child = children && React.Children.toArray(children)[0]

    return (
        <StyledButton
            use={use}
            {...eventHandlers}
            {...omit(rest, eventTriggerProps)}
            // TODO: Rethink className as prop
            className={additionalClassName}
            //{...rest}
            // style={{
            //     color: "#fff",
            //     fontSize: 16,
            //     fontWeight: 600,
            // }}
        >
            {leadingIcon} {textLabel} {trailingIcon}
        </StyledButton>
    )
}

_Button.displayName = "Button"

const __Button = memo(_Button)

export const Button = props => <__Button {...props} />

Button.defaultProps = {
    height: 44,
    width: 112,
    textLabel: "Continue",
    target: "sharedSwitch",
    isInteractive: true,
    // Can add margin, padding, etc.
    // Force conversation & collaboration
}

addPropertyControls(Button, {
    textLabel: {
        title: "Label",
        type: ControlType.String,
        defaultValue: "Next",
    },
    use: {
        type: ControlType.Enum,
        defaultValue: "primary",
        options: [
            "link",
            "link-dark",
            "primary",
            "secondary",
            "tertiary",
            "tertiary-light",
            "destructive",
        ],
        optionTitles: [
            "Link to another page",
            "Link to another page (on dark)",
            "Primary, most frequent page action",
            "Alternate action",
            "Tertiary action",
            "Tertiary action (light)",
            "Deleting, disconnecting, or other unrevertable actions",
        ],
    },
    size: {
        type: ControlType.Enum,
        defaultValue: "default",
        options: ["default", "small", "extra-small"],
        optionTitles: ["Default", "Small", "Extra Small"],
    },
    // TODO: Appearance instead of disabled
    disabled: {
        title: "Disabled",
        type: ControlType.Boolean,
        defaultValue: false,
    },
    leadingIcon: {
        type: ControlType.ComponentInstance,
    },
    trailingIcon: {
        type: ControlType.ComponentInstance,
    },
    children: {
        type: ControlType.ComponentInstance,
        title: "Appearance",
    },
    target: {
        type: ControlType.String,
        title: "Switch",
        defaultValue: "sharedSwitch",
    },
    ...eventTriggerPropertyControls,
})

// ---------------------- Thumbnail -----------------------

function ButtonActionThumbnail() {
    return <Button textLabel="My Button" />
}
