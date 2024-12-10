import { assignBinding } from "../../environment";
import { assignmentExpression, assignmentKey } from "../../parser";
import { metaEval } from "./eval";

export const evalAssignment = (input, env) => {
  assignBinding(
    assignmentKey(input),
    metaEval(assignmentExpression(input, env)),
    env
  );
};
