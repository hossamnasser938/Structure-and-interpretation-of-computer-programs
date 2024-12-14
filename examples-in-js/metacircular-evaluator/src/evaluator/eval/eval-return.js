import { returnStatementArgument } from "../../parser";
import { metaEval } from "./eval";
import { makeReturnValue } from "./return-value-representation";

export const evalReturn = (input, env) => {
  const output = metaEval(returnStatementArgument(input), env);

  return makeReturnValue(output);
};
