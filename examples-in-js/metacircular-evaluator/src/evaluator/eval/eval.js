import {
  isLiteral,
  isSequence,
  sequenceStatements,
  declarationVariablesKeys,
  isVariableDeclaration,
  isName,
  nameToken,
  isAssignment,
  literalVal,
  declarationVariablesExpressions,
  isBlock,
  blockStatements,
  isConditional,
  conditionalPredicate,
  conditionalConsequent,
  conditionalAlternative,
  isLambda,
  isFunctionDeclaration,
  isEmptyStatement,
  isApplication,
  isReturnStatement,
} from "../../parser";
import { evalLiteral } from "./eval-literal";
import { evalSequence } from "./eval-sequence";
import { evalName } from "./eval-name";
import { evalDeclaration } from "./eval-declaration";
import { evalAssignment } from "./eval-assignment";
import { evalBlock } from "./eval-block";
import { evalConditional } from "./eval-conditional";
import { evalLambda } from "./eval-lambda";
import { evalFunctionDeclaration } from "./eval-function-declaration";
import { evalApplication } from "./eval-application";
import { evalReturn } from "./eval-return";

export const metaEval = (input, env) => {
  if (isLiteral(input)) {
    return evalLiteral(literalVal(input));
  } else if (isSequence(input)) {
    return evalSequence(sequenceStatements(input), env);
  } else if (isBlock(input)) {
    return evalBlock(blockStatements(input), env);
  } else if (isName(input)) {
    return evalName(nameToken(input), env);
  } else if (isVariableDeclaration(input)) {
    return evalDeclaration(
      declarationVariablesKeys(input),
      declarationVariablesExpressions(input),
      env
    );
  } else if (isAssignment(input)) {
    return evalAssignment(input, env);
  } else if (isConditional(input)) {
    return evalConditional(
      conditionalPredicate(input),
      conditionalConsequent(input),
      conditionalAlternative(input),
      env
    );
  } else if (isLambda(input)) {
    return evalLambda(input, env);
  } else if (isFunctionDeclaration(input)) {
    return evalFunctionDeclaration(input, env);
  } else if (isEmptyStatement(input)) {
    return undefined;
  } else if (isApplication(input)) {
    return evalApplication(input, env);
  } else if (isReturnStatement(input)) {
    return evalReturn(input, env);
  } else {
    throw new Error(`Unsupported syntax ${JSON.stringify(input, null, 2)}`);
  }
};
