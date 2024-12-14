import { Env } from "./env";
import { Binding } from "./binding";

export const extendEnv = (keys, values, env) => {
  if (keys.length !== values.length) {
    throw new Error("keys and values different items count");
  }

  const bindings = keys.map((key, index) => {
    return new Binding(key, values[index]);
  });

  return new Env(bindings, env);
};
