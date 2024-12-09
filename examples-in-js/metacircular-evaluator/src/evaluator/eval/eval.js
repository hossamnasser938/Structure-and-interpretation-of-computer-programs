import {
  isLiteral,
  isSequence,
  sequenceStatements,
  declarationVariablesKeys,
  declarationVariablesValues,
  isDeclaration,
  isName,
  nameToken,
  isAssignment,
  assignmentKey,
  assignmentValue,
  literalVal,
} from "../../parser";
import { evalLiteral } from "./eval-literal";
import { evalSequence } from "./eval-sequence";
import { evalName } from "./eval-name";
import { evalDeclaration } from "./eval-declaration";
import { evalAssignment } from "./eval-assignment";

export const metaEval = (input, env) => {
  if (isLiteral(input)) {
    return evalLiteral(literalVal(input));
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
  } else if (isAssignment(input)) {
    return evalAssignment(assignmentKey(input), assignmentValue(input), env);
  } else {
    throw new Error("Unsupported syntax", input);
  }
};
