import { makePrimitiveFunction } from "../evaluator/eval/function-representation";
import { Env } from "./env";
import { extendEnv } from "./extend-env";

const theGlobalEnv = new Env();

const primitives = {
  "+": makePrimitiveFunction((x, y) => x + y),
  "-": makePrimitiveFunction((x, y) => x - y),
  "*": makePrimitiveFunction((x, y) => x * y),
  "/": makePrimitiveFunction((x, y) => x / y),
  "++": makePrimitiveFunction((x) => ++x),
  "--": makePrimitiveFunction((x) => --x),
  AND: makePrimitiveFunction((x, y) => x && y),
  OR: makePrimitiveFunction((x, y) => x || y),
  NOT: makePrimitiveFunction((x) => !x),
  yes: true,
  no: false,
};

export const setupGlobalEnvironment = () => {
  const primitiveKeys = Object.keys(primitives);
  const primitiveValues = Object.values(primitives);

  return extendEnv(primitiveKeys, primitiveValues, theGlobalEnv);
};
