import { lookupEnv } from "../../environment";
import {
  operatorCombinationOperator,
  operatorCombinationArgs,
} from "../../parser";
import { apply } from "../apply";
import { metaEval } from "./eval";

export const evalOperatorCombination = (input, env) => {
  const operator = operatorCombinationOperator(input);
  const args = operatorCombinationArgs(input);

  const func = lookupEnv(operator, env);
  const evaluatedArgs = args.map((arg) => metaEval(arg, env));

  return apply(func, evaluatedArgs);
};
