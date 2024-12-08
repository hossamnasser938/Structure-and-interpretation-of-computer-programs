import { isLiteral } from "../../parser/literal";
import { isSequence, sequenceStatements } from "../../parser";
import { evalLiteral } from "./eval-literal";
import { evalSequence } from "./eval-sequence";

export const metaEval = (input, env) => {
  if (isLiteral(input)) {
    return evalLiteral(input);
  } else if (isSequence(input)) {
    return evalSequence(sequenceStatements(input));
  } else {
    throw new Error("Unsupported syntax", input);
  }
};
