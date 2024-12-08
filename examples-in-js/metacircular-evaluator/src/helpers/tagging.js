import { head, list } from "./list";

export const attachTag = (obj, tag) => {
  return list(tag, obj);
};

export const isTagged = (obj, tag) => {
  return head(obj) === tag;
};
