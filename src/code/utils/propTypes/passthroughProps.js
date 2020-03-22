import PropTypes from "prop-types";
import invariant from "react-utils/invariant";
import createChainablePropType from "./createChainablePropType";
import getComponentName from "react-utils/getComponentName";

export default (component, propTypes = component.propTypes) => {
  if (process.env.NODE_ENV !== "production") {
    invariant(
      !!propTypes,
      `passthroughProps: expected propTypes object as second argument, got ${propTypes}`
    );
  }

  const [name, Component] =
    typeof component === "string"
      ? [component, undefined]
      : [getComponentName(component.CoreComponent || component), component];

  const validator = (...args) => PropTypes.object(...args);

  return createChainablePropType(validator, "passthroughProps", {
    Component,
    name,
    propTypes
  });
};
