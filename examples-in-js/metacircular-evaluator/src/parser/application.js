export const isApplication = (obj) => {
  return (
    obj.type === "ExpressionStatement" &&
    obj.expression.type === "CallExpression"
  );
};

export const applicationFunctionExpression = (obj) => {
  return obj.expression.callee;
};

export const applicationArgsExpressions = (obj) => {
  return obj.expression.arguments;
};
