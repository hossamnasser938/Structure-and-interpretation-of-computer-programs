export const isFunctionDeclaration = (obj) => {
  return obj.type === "FunctionDeclaration";
};

export const functionDeclarationName = (obj) => obj.id.name;

export const functionDeclarationParams = (obj) => obj.params;

export const functionDeclarationBody = (obj) => obj.body;
