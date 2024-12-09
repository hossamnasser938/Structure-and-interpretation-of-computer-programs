import { lookupEnv } from "../../environment";

export const evalName = (nameToken, env) => {
  return lookupEnv(nameToken, env);
};
