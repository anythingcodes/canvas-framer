import pick from "../utils/underscore/pick";
import PropTypes from "prop-types";
import React from "react";
import createReactClass from "create-react-class";
import {
  getDefaultPropName,
  getOnChangeName,
  getPropFromDefaultName
} from "../core/PropNames";
import getComponentName from "react-utils/getComponentName";
import invariant from "react-utils/invariant";
import { attachWrappedComponent, makeDecoratorRefCallback } from "./utils";
import { notRequired } from "../utils/propTypes/decorators";

const DEFAULT_FIELDS = ["value"];

/**
 * @param  {React.Component}
 * @param  {Array<string>}
 * @return {Object}
 */
function getDefaultProps(component, fields) {
  // shallow copy of defaultProps to use as the initial value to prevent mutation
  const defaultProps = { ...component.defaultProps };

  return fields.reduce((defaults, field) => {
    if (defaults.hasOwnProperty(field)) {
      defaults[getDefaultPropName(field)] = defaults[field];
      delete defaults[field];
    }
    return defaults;
  }, defaultProps);
}

/**
 * @param  {Object}
 * @param  {Array<string>}
 * @return {Object}
 */
function getDefaultPropTypes(originalPropTypes, fields) {
  return fields.reduce(
    (propTypes, field) => {
      let originalPropType = propTypes[field];
      if (typeof originalPropType !== "function") {
        originalPropType = PropTypes.any;
      }
      const notRequiredPropType = notRequired(originalPropType);
      propTypes[getDefaultPropName(field)] = notRequiredPropType;
      propTypes[field] = notRequiredPropType;
      return propTypes;
    },
    { ...originalPropTypes }
  );
}

/**
 * @param  {Array<string>}
 * @return {Object}
 */
function getHandlerPropTypes(fields) {
  return fields.reduce((propTypes, field) => {
    propTypes[getOnChangeName(field)] = PropTypes.func;
    return propTypes;
  }, {});
}

/**
 * @param  {ReactElement} instance
 * @param  {string} field
 * @param  {Object} event
 * @return {void}
 */
function handleChange(instance, field, evt) {
  if (process.env.NODE_ENV !== "production") {
    invariant(
      evt && evt.target != null,
      `${getComponentName(instance.constructor)} handleChange: expected ` +
        "argument in shape of SyntheticEvent ({target: value})"
    );
  }

  instance.setState({
    [field]: evt.target.value
  });
  const onChange = instance.props[getOnChangeName(field)];
  if (typeof onChange === "function") {
    onChange(evt);
  }
}

/**
 * @param  {React.Component}
 * @param  {Array<string>}
 * @return {React.Component}
 */
export default function Controllable(InputComponent, fields = DEFAULT_FIELDS) {
  const onChangeKeys = fields.map(getOnChangeName);
  const defaultProps = fields.map(getDefaultPropName);

  const controlledComponent = createReactClass({
    displayName: `Controllable(${getComponentName(InputComponent)})`,

    propTypes: {
      ...getDefaultPropTypes(InputComponent.propTypes, fields),
      ...getHandlerPropTypes(fields)
    },

    /**
     * @return {Object}
     */
    getDefaultProps() {
      return getDefaultProps(InputComponent, fields);
    },

    /**
     * @return {Object}
     */
    getInitialState() {
      const defaults = pick(this.props, defaultProps);
      const initialState = {};
      Object.keys(defaults).forEach(defaultKey => {
        initialState[getPropFromDefaultName(defaultKey)] = defaults[defaultKey];
      });

      return initialState;
    },

    /**
     * @return {void}
     */
    UNSAFE_componentWillMount() {
      const handlers = {};
      onChangeKeys.forEach((onChangeKey, i) => {
        handlers[onChangeKey] = (...args) =>
          handleChange(this, fields[i], ...args);
      });
      this.handlers = handlers;
      this._refCallback = makeDecoratorRefCallback(InputComponent, this);
    },

    /**
     * @return {void}
     */
    UNSAFE_componentWillReceiveProps(nextProps) {
      fields.forEach(field => {
        if (this.props[field] !== undefined && nextProps[field] === undefined) {
          this.setState({ [field]: nextProps[getDefaultPropName(field)] });
        }
      });
    },

    /**
     * @return {Object}
     */
    getProps() {
      const applicableProps = {};
      Object.keys(this.props).forEach(key => {
        if (defaultProps.indexOf(key) === -1 && this.props[key] !== undefined)
          applicableProps[key] = this.props[key];
      });

      return {
        ...this.state,
        ...applicableProps,
        ...this.handlers
      };
    },

    /**
     * @return {React.Element}
     */
    render() {
      return <InputComponent {...this.getProps()} ref={this._refCallback} />;
    }
  });

  attachWrappedComponent(controlledComponent, InputComponent);

  return controlledComponent;
}
