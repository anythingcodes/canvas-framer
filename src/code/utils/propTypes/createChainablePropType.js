import { isIntrospectionEnabled } from "./internal/introspection";

// Factory for the .required version of the propType function.
// See https://www.ian-thomas.net/custom-proptype-validation-with-react/
export default function createChainablePropType(
  validate,
  propTypeName,
  args = []
) {
  function checkType(isRequired, props, propName, componentName, ...rest) {
    if (props[propName] == null) {
      if (isRequired) {
        return new Error(
          `Required prop \`${propName}\` was not specified in \`${componentName}\`.`
        );
      }
      return null;
    }
    return validate(props, propName, componentName, ...rest);
  }

  const chainedCheckType = checkType.bind(null, false);
  chainedCheckType.isRequired = checkType.bind(null, true);

  if (isIntrospectionEnabled()) {
    const introspectionObj = {
      args,
      type: propTypeName
    };

    chainedCheckType.__INTROSPECTION__ = introspectionObj;
    chainedCheckType.isRequired.__INTROSPECTION__ = {
      ...introspectionObj,
      isRequired: true
    };
  }

  return chainedCheckType;
}
