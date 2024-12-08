import { metaEval } from "./eval";

export const evalSequence = (sequenceStatements, env) => {
  let output;

  for (const statement of sequenceStatements) {
    output = metaEval(statement, env);
  }

  return output;
};
