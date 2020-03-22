import PropTypes from "prop-types";
let usesIntrospection = PropTypes.any.__INTROSPECTION__;

/**
 * @return {boolean}
 */
export const isIntrospectionEnabled = () => {
  return usesIntrospection;
};

/**
 * Override for testing logic dependent on isIntrospectionEnabled()
 * @param {boolean} newUsesIntrospection
 */
export const setIntrospectionEnabled = newUsesIntrospection => {
  usesIntrospection = newUsesIntrospection;
};
