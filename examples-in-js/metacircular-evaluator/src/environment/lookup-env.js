import { findBinding } from "./find-binding";

export const lookupEnv = (key, env) => {
  const binding = findBinding(key, env);

  return binding.value;
};
