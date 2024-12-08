const acorn = require("acorn");

export const parse = (program) => {
  const ast = acorn.parse(program, { ecmaVersion: 2020 });

  console.log(JSON.stringify(ast, null, 2));

  return ast.body;
};
