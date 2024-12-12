import { lambdaBody, lambdaParams } from "../../parser";
import { makeCompoundFunction } from "./function-representation";

export const evalLambda = (input, env) => {
  return makeCompoundFunction(lambdaParams(input), lambdaBody(input), env);
};
