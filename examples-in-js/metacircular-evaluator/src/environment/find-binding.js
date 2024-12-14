export const findBinding = (key, env) => {
  if (!env) {
    throw new Error(`${key} not bound`);
  }

  const binding = env.findBinding(key);

  if (!binding) {
    throw new Error(`${key} not bound`);
  }

  return binding;
};
