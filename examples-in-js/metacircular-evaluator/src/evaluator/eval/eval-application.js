import {
  applicationArgsExpressions,
  applicationFunctionExpression,
} from "../../parser";
import { apply } from "../apply";
import { metaEval } from "./eval";

export const evalApplication = (input, env) => {
  const funcExp = applicationFunctionExpression(input);
  const funcArgs = applicationArgsExpressions(input);

  const evaluatedFuncExp = metaEval(funcExp, env);
  const evaluatedFuncArgs = funcArgs.map((arg) => metaEval(arg, env));

  return apply(evaluatedFuncExp, evaluatedFuncArgs);
};
