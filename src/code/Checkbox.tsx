import * as React from "react"
import styled, { css } from "styled-components"
import { Frame, addPropertyControls, ControlType } from "framer"
import { IconCheck, colors } from "./canvas"
import utils from "./Utils"

const CheckboxLabel = styled.label`
    font-family: 'Avenir Next';
    border-radius: 3px;
    border-style: solid;
    color: ${colors.Obsidian}; 
    display: flex;
    align-items: center;
    display: flex;
    justify-content: center;
    cursor: pointer;
    width: 100%;
    min-height: 100%;
    border-width: ${({ checked }) => (checked ? "2px" : "1px")};
    background-color: ${({ checked }) =>
        checked ? colors["Calypso Light"] : colors.Olaf};
    border-color: ${({ checked }) =>
        checked ? colors.Calypso : colors["Calypso Medium"]}; 
    transition: all .15s ease-out;
    ${({ checked }) => css`
        box-shadow: 0 0 0 1px ${colors.Calypso};
    `}
    &:hover {
        box-shadow: 0 0 0 1px ${
            colors["Calypso Medium"]
        }, 0 0 12px 0 rgba(0,163,189,.3);
    }  
`

const CheckboxWrapper = styled.div`
        width: 20px;
        height: 20px;
        border-radius: 3px;
        border: 2px solid ${props =>
            props.checked ? colors.Calypso : colors.Battleship};
        color: ${colors.Battleship};
        position: relative;
        input[type="checkbox"] {
            ${utils.screenReaderStyles}
        }
    `

export function Checkbox(props) {
    const { checked, onValueChange, textLabel, ...rest } = props

    const [isChecked, setIsChecked] = React.useState(checked)

    /*
        Each time component updates, Readt will compare the
        value of every dep against thevalue from its last
        update. If it finds diffs, it will run this function.
    */
    React.useEffect(() => {
        onValueChange(checked)
        setIsChecked(checked)
    }, [checked])

    const toggleIsChecked = () => {
        onValueChange(!isChecked)
        setIsChecked(!isChecked)
    }

    return (
        <CheckboxLabel {...rest} checked={isChecked} onChange={toggleIsChecked}>
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
