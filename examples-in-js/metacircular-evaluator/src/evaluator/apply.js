import { extendEnv } from "../environment";
import { wrapInReturnStatementIfNeeded } from "../parser";
import { metaEval } from "./eval/eval";
import {
  functionBody,
  functionEnv,
  functionParams,
  isCompoundFunction,
  isPrimitiveFunction,
} from "./eval/function-representation";
import { isReturnValue, returnValue } from "./eval/return-value-representation";

const applyPrimitiveFunction = (func, args) => {};

const applyCompoundFunction = (func, args) => {
  const extendedEnv = extendEnv(functionParams(func), args, functionEnv(func));

  const body = wrapInReturnStatementIfNeeded(functionBody(func));

  const output = metaEval(body, extendedEnv);

  if (isReturnValue(output)) {
    return returnValue(output);
  }

  return undefined;
};

export const apply = (func, args) => {
  if (isPrimitiveFunction(func)) {
    applyPrimitiveFunction(func, args);
  } else if (isCompoundFunction(func)) {
    return applyCompoundFunction(func, args);
  } else {
    throw new Error(
      "Not supported application - neither compound nor primitive function",
      func
    );
  }
};
