export const isOperatorCombination = (obj) => {
  return (
    obj.type === "ExpressionStatement" &&
    (obj.expression.type === "BinaryExpression" ||
      obj.expression.type === "UnaryExpression" ||
      obj.expression.type === "UpdateExpression")
  );
};

export const operatorCombinationOperator = (obj) => {
  return obj.expression.operator;
};

export const operatorCombinationArgs = (obj) => {
  return obj.expression.argument
    ? [obj.expression.argument]
    : [obj.expression.left, obj.expression.right];
};
