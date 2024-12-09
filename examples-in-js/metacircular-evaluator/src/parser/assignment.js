export const isAssignment = (obj) => {
  return (
    obj.type === "ExpressionStatement" &&
    obj.expression.type === "AssignmentExpression"
  );
};

export const assignmentKey = (obj) => {
  return obj.expression.left.name;
};

export const assignmentValue = (obj) => {
  return obj.expression.right.value;
};
