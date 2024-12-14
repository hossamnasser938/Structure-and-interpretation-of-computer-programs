import { extendEnv } from "./extend-env";

export const extendEnvWithUnassignedKeys = (keys, env) => {
  const values = keys.map(() => undefined);

  return extendEnv(keys, values, env);
};
