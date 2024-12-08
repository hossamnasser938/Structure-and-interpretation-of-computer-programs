import { metaEval } from "../evaluator";
import { prompt } from "../helpers";
import { parse } from "../parser";

const promptUserForInput = () => {
  return prompt("Input: ");
};

const printForUser = (message) => {
  console.log("Output: " + message);
};

export const driverLoop = async (env) => {
  const userInput = await promptUserForInput();
  const parsedInput = parse(userInput);
  // TODO: scan locals
  const evaluationRes = metaEval(parsedInput, env);
  printForUser(evaluationRes);
  driverLoop(env);
};
