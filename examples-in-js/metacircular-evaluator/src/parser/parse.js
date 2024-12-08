import { makeLiteral } from "./literal/literal";

export const parse = (program) => {
  // relying on the parser provided by SICPJS

  if (!Number.isNaN(parseFloat(program))) {
    return makeLiteral(parseFloat(program));
  }
};
