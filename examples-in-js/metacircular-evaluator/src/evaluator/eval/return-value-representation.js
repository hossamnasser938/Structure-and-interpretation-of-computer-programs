const RETURN_VALUE = "ReturnValue";

export const makeReturnValue = (value) => {
  return {
    type: RETURN_VALUE,
    value,
  };
};

export const isReturnValue = (obj) => {
  return obj.type === RETURN_VALUE;
};

export const returnValue = (obj) => {
  return obj.value;
};
