export const scanLocals = (ast) => {
  const variableDeclarations = ast.filter(
    (item) => item.type === "VariableDeclaration"
  );

  return variableDeclarations.reduce((acc, variableDeclaration) => {
    return acc.concat(
      variableDeclaration.declarations.map((declaration) => declaration.id.name)
    );
  }, []);
};
