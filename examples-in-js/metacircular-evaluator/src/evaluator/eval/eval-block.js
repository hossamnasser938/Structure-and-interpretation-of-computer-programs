import { evalSequence } from "./eval-sequence";

export const evalBlock = (statements, env) => {
  return evalSequence(statements, env);
};
