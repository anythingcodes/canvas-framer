import createChainablePropType from "./createChainablePropType";

export default function createLazyPropType(rawPropType) {
  const propTypeWithFuncEval = (props, propName, ...rest) => {
    const value = props[propName];
    if (!value || typeof value === "function") {
      return null;
    }

    // If the value is not a function, check that it satisfies rawPropType
    return rawPropType(props, propName, ...rest);
  };

  // Name this propType "lazyX", where "X" is the name of the raw prop type
  const rawPropTypeName = rawPropType.__INTROSPECTION__
    ? rawPropType.__INTROSPECTION__.type
    : "value";
  const lazyPropTypeName = `lazy${rawPropTypeName.charAt(0).toUpperCase() +
    rawPropTypeName.slice(1)}`;
  const chainablePropType = createChainablePropType(
    propTypeWithFuncEval,
    lazyPropTypeName
  );

  return chainablePropType;
}
