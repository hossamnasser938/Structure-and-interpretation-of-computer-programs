import { assignBinding } from "../../environment";
import {
  functionDeclarationBody,
  functionDeclarationName,
  functionDeclarationParams,
} from "../../parser";
import { makeCompoundFunction } from "./function-representation";

export const evalFunctionDeclaration = (input, env) => {
  assignBinding(
    functionDeclarationName(input),
    makeCompoundFunction(
      functionDeclarationParams(input),
      functionDeclarationBody(input),
      env
    )
  );
};
