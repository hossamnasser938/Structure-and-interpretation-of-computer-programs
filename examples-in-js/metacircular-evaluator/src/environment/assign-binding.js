import { findBinding } from "./find-binding";

export const assignBinding = (key, value, env) => {
  const binding = findBinding(key, env);

  binding.value = value;
};
