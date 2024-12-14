import { mapParamsToKeys } from "./shared";

export const isFunctionDeclaration = (obj) => {
  return obj.type === "FunctionDeclaration";
};

export const functionDeclarationName = (obj) => obj.id.name;

export const functionDeclarationParams = (obj) => mapParamsToKeys(obj.params);

export const functionDeclarationBody = (obj) => obj.body;
