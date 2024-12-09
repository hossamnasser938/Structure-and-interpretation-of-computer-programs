import { isLiteral } from "../../parser/literal";
import { isSequence, sequenceStatements } from "../../parser";
import { evalLiteral } from "./eval-literal";
import { evalSequence } from "./eval-sequence";
import { isName, nameToken } from "../../parser/name";
import { evalName } from "./eval-name";
import {
  declarationVariablesKeys,
  declarationVariablesValues,
  isDeclaration,
} from "../../parser/declaration";
import { evalDeclaration } from "./eval-declaration";

export const metaEval = (input, env) => {
  if (isLiteral(input)) {
    return evalLiteral(input);
  } else if (isSequence(input)) {
    return evalSequence(sequenceStatements(input), env);
  } else if (isName(input)) {
    return evalName(nameToken(input), env);
  } else if (isDeclaration(input)) {
    return evalDeclaration(
      declarationVariablesKeys(input),
      declarationVariablesValues(input),
      env
    );
  } else {
    throw new Error("Unsupported syntax", input);
  }
};
