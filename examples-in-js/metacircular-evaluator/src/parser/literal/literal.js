import { head, tail } from "../../helpers";
import { attachTag, isTagged } from "../../helpers";

const LITERAL_TAG = "literal";

export const makeLiteral = (literalVal) => {
  return attachTag(literalVal, LITERAL_TAG);
};

export const isLiteral = (obj) => {
  return isTagged(obj, LITERAL_TAG);
};

export const literalVal = (obj) => {
  return head(tail(obj));
};
