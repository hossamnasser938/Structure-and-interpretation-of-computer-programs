import { extendEnvWithUnassignedKeys } from "../environment";
import { metaEval } from "../evaluator";
import { prompt } from "../helpers";
import { parse } from "../parser";
import { scanLocals } from "../parser";

const promptUserForInput = () => {
  return prompt("Input: ");
};

const printForUser = (message) => {
  console.log("Output: " + message);
};

export const driverLoop = async (env) => {
  const userInput = await promptUserForInput();
  const parsedInput = parse(userInput);

  const locals = scanLocals(parsedInput);
  const programEnv = extendEnvWithUnassignedKeys(locals, env);

  const evaluationRes = metaEval(parsedInput, programEnv);
  printForUser(evaluationRes);
  driverLoop(programEnv);
};
