export const isConditional = (obj) => {
  return obj.type === "ConditionalExpression" || obj.type === "IfStatement";
};

export const conditionalPredicate = (obj) => obj.test;

export const conditionalConsequent = (obj) => obj.consequent;

export const conditionalAlternative = (obj) => obj.alternate;
