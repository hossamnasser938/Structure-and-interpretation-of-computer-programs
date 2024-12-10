import { isTruthy } from "../definitions";
import { metaEval } from "./eval";

export const evalConditional = (predicate, consequent, alternate, env) => {
  const predicateValue = metaEval(predicate, env);

  if (isTruthy(predicateValue)) {
    return metaEval(consequent, env);
  } else {
    return metaEval(alternate, env);
  }
};
