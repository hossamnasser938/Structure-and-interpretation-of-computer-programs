export const isName = (obj) => {
  return (
    obj.type === "ExpressionStatement" && obj.expression.type === "Identifier"
  );
};

export const nameToken = (obj) => {
  return obj.expression.name;
};
