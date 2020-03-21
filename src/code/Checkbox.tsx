import * as React from "react"
import styled, { css } from "styled-components"
import { Frame, addPropertyControls, ControlType } from "framer"
import { IconCheck } from "./canvas"

export function Checkbox(props) {
    const { checked, onValueChange, textLabel, ...rest } = props

    const [isChecked, setIsChecked] = React.useState(checked)

    /*
        Each time component updates, Readt will compare the
        value of every dep against thevalue from its last
        update. If it finds diffs, it will run this function.
    */
    React.useEffect(() => setIsChecked(checked), [checked])

    const CheckboxLabel = styled.label`
        font-family: 'Avenir Ne
        xt';
        border-radius: 3px;
        border-style: solid;
        color: #33475B; 
        display: flex;
        align-items: center;
        display: flex;
        justify-content: center;
        cursor: pointer;
        width: 100%;
        min-height: 100%;
        border-width: ${isChecked ? "2px" : "1px"};
        background-color: ${isChecked ? "#F0F9FB" : "white"};
        border-color: ${isChecked ? "#00A4BD" : "#7FD1DE"};   
    `

    // TODO: Move screen-reader code to mixin
    const screenReaderOnly = css`
        position: absolute;
        top: 0;
        width: 1px;
        height: 1px;
        margin: -1px;
        padding: 0;
        overflow: hidden;
        clip: rect(0,0,0,0);
        border: 0;
    `

    const CheckboxWrapper = styled.div`
        width: 20px;
        height: 20px;
        border-radius: 3px;
        border: 2px solid ${isChecked ? "#00a4bd" : "#cbd6e2"};
        color: #cbd6e2;
        position: relative;
        input[type="checkbox"] {
            ${screenReaderOnly}
        }
    `

    const toggleIsChecked = () => {
        onValueChange(!isChecked)
        setIsChecked(!isChecked)
    }

    return (
        <CheckboxLabel {...rest} onChange={toggleIsChecked}>
            {/* TODO: Label/input for/id */}
            <CheckboxWrapper>
                {isChecked && <IconCheck />}
                <input type="checkbox" />
            </CheckboxWrapper>
            {textLabel}
        </CheckboxLabel>
    )
}

Checkbox.defaultProps = {
    height: 56,
    width: 380,
    checked: false,
    onValueChange: (isChecked: boolean) => {},
    // Can add margin, padding, etc.
    // Force conversation & collaboration
}

addPropertyControls(Checkbox, {
    textLabel: {
        title: "Label",
        type: ControlType.String,
        placeholder: "Option description",
    },
    checked: {
        title: "Checked",
        type: ControlType.Boolean,
        defaultValue: true,
    },
})
