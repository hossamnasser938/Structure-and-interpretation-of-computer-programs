export const PRIMITIVE_FUNCTION = "PRIMITIVE_FUNCTION";
export const COMPOUND_FUNCTION = "COMPOUND_FUNCTION";

export const isCompoundFunction = (obj) => obj.type === COMPOUND_FUNCTION;

export const isPrimitiveFunction = (obj) => obj.type === PRIMITIVE_FUNCTION;

export const makeFunction = (type, params, body, env) => {
  return {
    type,
    params,
    body,
    env,
  };
};

export const makeCompoundFunction = (params, body, env) => {
  return makeFunction(COMPOUND_FUNCTION, params, body, env);
};

export const makePrimitiveFunction = (params, body, env) => {
  return makeFunction(PRIMITIVE_FUNCTION, params, body, env);
};

export const functionParams = (func) => func.params;

export const functionBody = (func) => func.body;

export const functionEnv = (func) => func.env;
