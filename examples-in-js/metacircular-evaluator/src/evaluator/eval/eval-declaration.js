import { assignBinding } from "../../environment/environment";

export const evalDeclaration = (keys, values, env) => {
  if (keys.length !== values.length) {
    throw new Error("keys and values different items count");
  }

  keys.forEach((key, index) => {
    assignBinding(key, values[index], env);
  });
};
