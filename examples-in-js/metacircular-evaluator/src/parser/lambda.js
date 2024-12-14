import { mapParamsToKeys } from "./shared";

export const isLambda = (obj) => {
  return (
    obj.type === "ArrowFunctionExpression" || obj.type === "FunctionExpression"
  );
};

export const lambdaParams = (obj) => mapParamsToKeys(obj.params);

export const lambdaBody = (obj) => obj.body;
