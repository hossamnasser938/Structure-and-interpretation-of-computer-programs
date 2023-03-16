const MATCH_FAILURE = "failed";

const emptyDictionary = () => ({});

const removeParentethesis = token => {
  let t = token

  do {
    if (t.startsWith("(")) {
      t = t.slice(1)
    }
    else if (t.endsWith(")")) {
      t = t.slice(0, -1)
    }
  }
  while(t.startsWith("(") || t.endsWith(")"))

  return t
}

const lookup = (dictionary, key) => dictionary[removeParentethesis(key)]
const insertKeyVal = (dictionary, key, val) => ({ ...dictionary, [removeParentethesis(key)]: removeParentethesis(val) });

const extendDictionary = (dictionary, key, val) => {
  const currenVal = lookup(dictionary, key);

  if (currenVal) {
    if (currenVal === removeParentethesis(val)) return dictionary;
    return MATCH_FAILURE;
  }

  return insertKeyVal(dictionary, key, val);
};

const constructRule = (pattern, skeleton) => ({pattern, skeleton})
const skeleton = (rule) => parse(rule.skeleton);
const pattern = (rule) => parse(rule.pattern);

const isCompound = (obj) => Array.isArray(obj);
const isAtomic = (obj) =>
  !isCompound(obj) && (typeof obj === "string" || typeof obj === "number");

patternVariable = (pat) => pat[1];
patternVal = (pat) => pat[0];

const isArbitraryExpression = (pat) => patternVal(pat).includes("?");
const isArbitraryVariable = (pat) => patternVal(pat).includes("?v");
const isArbitraryConstant = (pat) => patternVal(pat).includes("?c");

const isExpVariable = (exp) => typeof exp === "string";
const isExpConstant = (exp) => typeof exp === "number";

const shouldBeEvaluated = (sk) => sk[0].includes(":")

const evaluationExpression = (sk) => sk[1];

const next = (arr) => arr[0];
const rest = (arr) => (arr.length === 2 ? arr[1] : arr.slice(1));

const simplifier = (rules) => (expAsString) => {
  function simplify(exp) {
    const [rule, dictionary] = scanRoles(rules, exp);
    console.log('simplify rule, dictionary', rule, dictionary)

    if (!rule) return exp;

    const instantiatedExpression = instantiate(skeleton(rule), dictionary);
    if (instantiatedExpression !== expression)
      return simplify(instantiatedExpression);
    return instantiatedExpression;
  }

  const expression = parse(expAsString);
  return simplify(expression)
};

const scanRoles = (rules, exp) => {
  for (let rule of rules) {
    const pat = pattern(rule)
    const dictionary = match(pat, exp, emptyDictionary());
    console.log('scanRoles dictionary', dictionary)

    if (dictionary === MATCH_FAILURE) continue;

    return [rule, dictionary];
  }

  return [undefined, undefined];
};

const match = (pat, exp, dictionary) => {
  console.log('match pat, exp, dictionary', pat, exp, dictionary)
  if (dictionary === MATCH_FAILURE) return MATCH_FAILURE;

  if (isAtomic(pat)) {
    if (isAtomic(exp)) {
      if (pat === exp) return dictionary;
      return MATCH_FAILURE;
    }
    return MATCH_FAILURE;
  }

  if (isArbitraryExpression(pat)) {
    return extendDictionary(dictionary, patternVariable(pat), exp);
  }

  if (isArbitraryVariable(pat)) {
    if (isExpVariable(exp))
      return extendDictionary(dictionary, patternVariable(pat), exp);
    return MATCH_FAILURE;
  }

  if (isArbitraryConstant(pat)) {
    if (isExpConstant(exp))
      return extendDictionary(dictionary, patternVariable(pat), exp);
    return MATCH_FAILURE;
  }

  if (isCompound(pat)) {
    if (isCompound(exp)) {
      return match(
        rest(pat),
        rest(exp),
        match(next(pat), next(exp), dictionary)
      );
    }
    return MATCH_FAILURE;
  }
};

const isAtomicSkeleton = (sk) =>
  isAtomic(sk) && (typeof sk === "string" ? !sk.includes(":") : true);

const instantiate = (skeleton, dictionary) => {
  if (isAtomicSkeleton(skeleton)) return skeleton;

  if (shouldBeEvaluated(skeleton)) return lookup(dictionary, evaluationExpression(skeleton));

  if (isCompound(skeleton)) {
    return skeleton.reduce((acc, item) => acc.concat(instantiate(item, dictionary)), [])
  }
};

const derivativeRules = [
  // { pattern: "(dd (?c c) (? v))", skeleton: 0 },
  { pattern: "(dd (?v v) (? v))", skeleton: 1 },
  // { pattern: "(dd (?v u) (? v))", skeleton: 0 },
  {
    pattern: "(dd (+ (? x1) (? x2)) (? v))",
    skeleton: "(+ (dd (: x1) (: v)) (dd (: x2) (: v)))",
  },
  // {
  //   pattern: "(dd (* (? x1) (? x2)) (? v))",
  //   skeleton: "(+ (* (: x1) (dd (: x2) (: v))) (* (dd (: x1) (: v)) (: x2)))",
  // },
];

const spreadArr = (obj) => (Array.isArray(obj) ? obj : [obj]);

const parse = (str) => {
  function parseIter(tokens) {
    if (tokens.length === 0) return [];
    if (tokens.length === 1) return tokens[0];

    const item = tokens[0];
    const rest = tokens.slice(1);

    if (item.startsWith("(")) {
      const splitterIndex = getSplitterIndex(tokens);
      if (splitterIndex == tokens.length - 1) {
        return [[item, ...spreadArr(parseIter(rest))]];
      }

      const rest1 = tokens.slice(1, splitterIndex + 1);
      const rest2 = tokens.slice(splitterIndex + 1);

      return [
        [item, ...spreadArr(parseIter(rest1))],
        ...spreadArr(parseIter(rest2)),
      ];
    } else {
      return [item, ...spreadArr(parseIter(rest))];
    }
  }

  if (typeof str === 'string') {
    return parseIter(str.split(" "))[0];
  }
  return str
};

const getSplitterIndex = (tokens) => {
  const stack = [];

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    if (token.startsWith("(")) stack.push("(");
    else if (token.endsWith(")")) {
      let s = token
      do {
        stack.pop();
        s = s.slice(0, -1)
      }
      while(s.endsWith(")"))
    }

    if (stack.length === 0) return i;
  }

  throw new Error('not well formatted string')
};

const derive = simplifier(derivativeRules);

// console.log(derive("(dd (+ x y) x)"));
console.log(derive("(dd (+ (dd x x) (dd y x)))"));