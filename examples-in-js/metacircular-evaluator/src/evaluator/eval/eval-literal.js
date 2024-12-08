import { literalVal } from "../../parser/literal";

export const evalLiteral = (literalObj) => {
  return literalVal(literalObj);
};
