import * as React from "react";
import { Frame, addPropertyControls, ControlType } from "framer"

export enum EnumTypes {
  enum = "red",
  green = "green",
  blue = "blue",
  yellow = "yellow"
}

// Define type of property
interface Props {
  /* Component prop definitions go here */
  boolean: boolean;
  color: string;
  enum: EnumTypes;
  fusedNumber: number;
  number: number;
  segmentedEnum: string;
  title: string;

  /* fusedNumber example declarations */
  padding: number;
  paddingPerSide: boolean;
  paddingTop: number;
  paddingRight: number;
  paddingBottom: number;
  paddingLeft: number;

  /* Framer-specific props to set the frame around the component */
  width: number;
  height: number;
}

/* Make sure you name your component and add export to the beginning of the
   declaration below. and remove this comment. This was done so the template component
   is not displayed on the components panel.
*/

export function Template(props) {
  // Set default properties
  const { text, tint, ...rest } = props;
  return (
    <Frame
        {...rest}
        background={tint}
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

Template.defaultProps = {
  boolean: false,
  color: "#FAFAFA",
  image: "",
  fusedNumber: 4,
  number: 50,
  string: "",
  size: "md",
  type: "red",

  /* Initialize the width and height of the component */
  width: 100,
  height: 40
};

// Items shown in property panel
// Learn more: https://framer.com/api/property-controls/
addPropertyControls(Template, {
  string: { type: ControlType.String, title: "String" },
  enum: {
    type: ControlType.Enum,
    options: ["blue", "red", "green", "yellow"],
    optionTitles: ["Blue", "Red", "Green"],
    title: "Style"
  },
  segmentedEnum: {
    type: ControlType.SegmentedEnum,
    options: ["xs", "sm", "md", "lg"],
    optionTitles: ["XS", "SM", "MD", "LG"],
    title: "Segmented Enum"
  },
  boolean: { type: ControlType.Boolean, title: "Boolean" },
  number: { type: ControlType.Number, title: "Number" },
  fusedNumber: {
    type: ControlType.FusedNumber,
    toggleKey: "paddingPerSide",
    toggleTitles: ["Padding", "Padding per Side"],
    valueKeys: ["paddingTop", "paddingRight", "paddingBottom", "paddingLeft"],
    valueLabels: ["T", "R", "B", "L"],
    min: 0,
    title: "Fused Number"
  },
  color: { type: ControlType.Color, title: "Tint" }
})
