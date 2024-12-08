export const isLiteral = (obj) => {
  return (
    obj.type === "ExpressionStatement" && obj.expression.type === "Literal"
  );
};

export const literalVal = (obj) => {
  return obj.expression.value;
};
