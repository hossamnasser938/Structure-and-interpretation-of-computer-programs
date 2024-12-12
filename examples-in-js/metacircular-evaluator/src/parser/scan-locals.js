import { declarationVariablesKeys, isVariableDeclaration } from "./declaration";
import {
  functionDeclarationName,
  isFunctionDeclaration,
} from "./function-declaration";

export const scanLocals = (ast) => {
  const variableDeclarations = ast.filter(isVariableDeclaration);

  const functionDeclarations = ast.filter(isFunctionDeclaration);

  const variableDeclarationLocals = variableDeclarations.reduce(
    (acc, variableDeclaration) => {
      return acc.concat(declarationVariablesKeys(variableDeclaration));
    },
    []
  );

  const functionDeclarationLocals = functionDeclarations.map(
    functionDeclarationName
  );

  const locals = variableDeclarationLocals.concat(functionDeclarationLocals);

  return locals;
};
