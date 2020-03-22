import PropTypes from "prop-types";
import React, { cloneElement } from "react";
import { isValidElementType } from "react-is";
import invariant from "react-utils/invariant";

const mergeTypes = {
  passive(originalProps, newProps) {
    return { ...newProps, ...originalProps };
  },
  aggressive(originalProps, newProps) {
    return newProps;
  },
  none() {
    return {};
  }
};

const defaultOpts = {
  mergeType: "passive"
};

export const render = (Renderer, props, opts = {}) => {
  const { mergeType } = { ...defaultOpts, ...opts };
  if (process.env.NODE_ENV !== "production") {
    invariant(
      mergeType === "passive" ||
        mergeType === "aggressive" ||
        mergeType === "none",
      `CustomRenderer: invalid merge type (expected aggressive|passive|none, got ${mergeType})`
    );
  }

  if (React.isValidElement(Renderer)) {
    return cloneElement(Renderer, mergeTypes[mergeType](Renderer.props, props));
  }

  if (isValidElementType(Renderer)) {
    return <Renderer {...props} />;
  }

  return Renderer;
};

export const propType = PropTypes.oneOfType([
  PropTypes.elementType,
  PropTypes.node
]);
