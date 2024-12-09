import { lookupEnv } from "../../environment/environment";

export const evalName = (nameToken, env) => {
  return lookupEnv(nameToken, env);
};
