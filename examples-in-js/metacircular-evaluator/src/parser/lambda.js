export const isLambda = (obj) => {
  return obj.type === "ArrowFunctionExpression";
};

export const lambdaParams = (obj) => obj.params;

export const lambdaBody = (obj) => obj.body;
