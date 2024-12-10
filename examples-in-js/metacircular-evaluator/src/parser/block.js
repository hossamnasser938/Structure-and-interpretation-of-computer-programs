export const isBlock = (obj) => {
  return obj.type === "BlockStatement";
};

export const blockStatements = (obj) => obj.body;
