const RETURN_STATEMENT = "ReturnStatement";

export const isReturnStatement = (obj) => {
  return obj.type === RETURN_STATEMENT;
};

export const returnStatementArgument = (obj) => {
  return obj.argument;
};

export const makeReturnStatement = (obj) => {
  return {
    type: RETURN_STATEMENT,
    argument: obj,
  };
};
