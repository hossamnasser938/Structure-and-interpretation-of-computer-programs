import { isLiteral } from "../../parser/literal/literal";
import { evalLiteral } from "./eval-literal";

export const metaEval = (input, env) => {
  if (isLiteral(input)) {
    return evalLiteral(input);
  } else {
    throw new Error("Unsupported syntax", input);
  }
};
