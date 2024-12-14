export class Env {
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
