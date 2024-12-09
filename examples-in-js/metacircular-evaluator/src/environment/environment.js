class Binding {
  constructor(key, value) {
    this.key = key;
    this.value = value;
  }
}

class Env {
  constructor(bindings = [], enclosingEnv = null) {
    this.bindings = bindings;
    this.enclosingEnv = enclosingEnv;
  }

  findBinding(key) {
    const binding = this.bindings.find((binding) => binding.key === key);

    if (binding) {
      return binding;
    }

    if (!this.enclosingEnv) {
      return null;
    }

    return this.enclosingEnv.findBinding(key);
  }
}

export const setupEnvironment = () => {
  return new Env();
};

const findBinding = (key, env) => {
  if (!env) {
    throw new Error(`${key} not bound`);
  }

  const binding = env.findBinding(key);

  if (!binding) {
    throw new Error(`${key} not bound`);
  }

  return binding;
};

export const lookupEnv = (key, env) => {
  const binding = findBinding(key, env);

  return binding.value;
};

export const assignBinding = (key, value, env) => {
  const binding = findBinding(key, env);

  binding.value = value;
};

export const extendEnv = (keys, values, env) => {
  if (keys.length !== values.length) {
    throw new Error("keys and values different items count");
  }

  const bindings = keys.map((key, index) => {
    return new Binding(key, values[index]);
  });

  return new Env(bindings, env);
};

export const extendEnvWithUnassignedKeys = (keys, env) => {
  const values = keys.map(() => undefined);

  return extendEnv(keys, values, env);
};
