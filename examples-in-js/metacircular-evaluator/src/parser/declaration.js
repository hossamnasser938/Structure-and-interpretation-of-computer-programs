export const isDeclaration = (obj) => {
  return obj.type === "VariableDeclaration";
};

export const declarationVariablesKeys = (obj) =>
  obj.declarations.map((declaration) => declaration.id.name);

export const declarationVariablesExpressions = (obj) =>
  obj.declarations.map((declaration) => declaration.init);
