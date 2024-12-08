import _prompt from "prompt";

export const prompt = async (message) => {
  _prompt.start();

  const output = await _prompt.get(message);
  return output[message];
};
