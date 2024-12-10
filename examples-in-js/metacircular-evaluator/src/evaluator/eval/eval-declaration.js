import { assignBinding } from "../../environment";
import { metaEval } from "./eval";

export const evalDeclaration = (keys, expressions, env) => {
  if (keys.length !== expressions.length) {
    throw new Error("keys and expressions different items count");
  }

  keys.forEach((key, index) => {
    const expression = expressions[index];
    assignBinding(key, metaEval(expression, env), env);
  });
};
