import { literalVal } from "../../parser/literal/literal";

export const evalLiteral = (literalObj) => {
  return literalVal(literalObj);
};
