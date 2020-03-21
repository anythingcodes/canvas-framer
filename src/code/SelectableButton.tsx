import * as React from "react";
import styled, { css } from "styled-components";
import { Frame, addPropertyControls, ControlType } from "framer";
import { IconCheck } from "./canvas";

export function SelectableButton(props) {
  const handleChange = () => {
    console.log("yep");
  };

  const { textLabel, selected, ...rest } = props;

  const CheckboxTouchTarget = styled.div`
    border-radius: 3px;
    border-style: solid;
    color: #33475b;
    display: flex;
    align-items: center;
    display: flex;
    justify-content: center;
    width: 100%;
    min-height: 100%;
    border-width: ${selected ? "2px" : "1px"};
    background-color: ${selected ? "#F0F9FB" : "white"};
    border-color: ${selected ? "#00A4BD" : "#7FD1DE"};
  `;

  // TODO: Move screen-reader code to mixin
  const screenReaderOnly = css`
    position: absolute;
    top: 0;
    width: 1px;
    height: 1px;
    margin: -1px;
    padding: 0;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  `;

  const CheckboxWrapper = styled.div`
    background-color: red;
    width: 20px;
    height: 20px;
    position: relative;
    input[type="checkbox"] {
      ${screenReaderOnly}
    }
  `;

  return (
    <CheckboxTouchTarget
      {...rest}
      whileHover={{
        scale: 1.1
      }}
    >
      {/* TODO: Label/input for/id */}
      <CheckboxWrapper>
        {selected && <IconCheck />}
        <input type="checkbox" checked={selected} onChange={handleChange} />
      </CheckboxWrapper>
      <label>{textLabel}</label>
    </CheckboxTouchTarget>
  );
}

SelectableButton.defaultProps = {
  height: 56,
  width: 380,
  selected: false
  // Can add margin, padding, etc.
  // Force conversation & collaboration
};

// Learn more: https://framer.com/api/property-controls/
addPropertyControls(SelectableButton, {
  textLabel: {
    title: "Text Label",
    type: ControlType.String,
    defaultValue: "Option Label"
  },
  selected: {
    title: "Selected",
    type: ControlType.Boolean,
    defaultValue: false
  }
});
