import { isBlock } from "./block";
import { makeReturnStatement } from "./return";

export const wrapInReturnStatementIfNeeded = (obj) => {
  if (!isBlock(obj)) {
    return makeReturnStatement(obj);
  }

  return obj;
};
