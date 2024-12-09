import { assignBinding } from "../../environment";

export const evalAssignment = (key, value, env) => {
  assignBinding(key, value, env);
};
