import * as React from "react";
import {
  Icon as BaseIcon,
  IconProps,
  CircleIcon as BaseCircleIcon,
  CircleIconProps,
  themes,
} from "framer-base";
import { ControlType, addPropertyControls } from "framer";
import {
  intentControls,
  iconControls,
  patternControls,
  themeControls,
} from "../propertyControls";
import { OmitTheme } from "../utils";
import withHOC from "../utils/withHOC";

type Props = OmitTheme<IconProps> &
  OmitTheme<CircleIconProps> &
  Partial<{
    theme: string;
    themeContext: any;
    intent: string;
    pattern: string;
    canvasSize: boolean;
    size: number;
    circle: boolean;
    width: number;
    height: number;
  }> & {
    icon: string;
  };

const defaultProps: Props = {
  theme: "light",
  intent: "primary",
  pattern: "primary",
  icon: "Framer",
  canvasSize: true,
  size: 24,
  circle: true,
};

const InnerIcon: React.FC<Props> = (props) => {
  const {
    theme,
    themeContext,
    canvasSize,
    width,
    height,
    size,
    circle,
    ...rest
  } = props;
  const IconWrapper = circle ? BaseCircleIcon : BaseIcon;

  return (
    <IconWrapper
      {...rest}
      size={canvasSize ? Math.min(width, height) : size}
      theme={themeContext || themes[theme]}
    />
  );
};

export const Icon = withHOC(InnerIcon);

Icon.defaultProps = {
  ...defaultProps,
  height: defaultProps.size,
  width: defaultProps.size,
};

addPropertyControls(Icon, {
  ...themeControls(defaultProps.theme),
  ...intentControls(defaultProps.intent),
  ...patternControls(defaultProps.pattern, true, "circle"),
  canvasSize: {
    type: ControlType.Boolean,
    title: "Size",
    defaultValue: defaultProps.canvasSize,
    enabledTitle: "Canvas",
    disabledTitle: "Manual",
  },
  size: {
    type: ControlType.Number,
    title: " ",
    defaultValue: defaultProps.size,
    min: 0,
    hidden: (props: Props) => props.canvasSize,
  },
  circle: {
    type: ControlType.Boolean,
    title: "Circle",
    defaultValue: defaultProps.circle,
  },
  ...iconControls(defaultProps.icon),
});
