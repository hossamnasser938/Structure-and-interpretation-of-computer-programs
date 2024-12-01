// we need to model the relations between variables
// - z = constant
// - x = y        ==> a change in any variable derives(sets) the other one
// - x = a + b    ==> a change in 2 variables derives the third
// - y = c * d    ==> a change in 2 variables derives the third
// we need to define variable

/* __ Variable __ */
class Variable {
  static NO_VALUE = null;
  static CHANGE_SOURCE = {
    USER: "USER",
    DERIVED: "DERIVED",
  };

  name = "";
  value = Variable.NO_VALUE;
  listeners = [];

  constructor(name) {
    this.name = name;
    this.addPropListener();
  }

  addListener(listener) {
    this.listeners.push(listener);
  }

  addPropListener() {
    this.addListener((changeSource) => {
      if (changeSource === Variable.CHANGE_SOURCE.USER) {
        return;
      }

      if (this.value === Variable.NO_VALUE) {
        console.log(`Variable ${this.name} lost value`);
      } else {
        console.log(`Variable ${this.name} got ${this.value} value`);
      }
    });
  }

  setValue(value, changeSource = Variable.CHANGE_SOURCE.DERIVED) {
    if (value === this.value) {
      return;
    }

    if (this.value !== Variable.NO_VALUE) {
      throw new Error(
        `Variable already has a value = ${this.value} - new value = ${value}`
      );
    }

    this.value = value;
    this.listeners.forEach((listener) => listener(changeSource));
  }

  forgetValue() {
    this.value = Variable.NO_VALUE;
  }

  getValue() {
    return this.value;
  }
}
/* _____ */

/* __ relations __ */
function constant(variable, value) {
  variable.setValue(value);
}

function additionRelation({ firstAddend, secondAddend, sum }) {
  const deriveAddend = ({ oneAddendValue, sumValue }) => {
    return sumValue - oneAddendValue;
  };
  const deriveSum = ({ firstAddendValue, secondAddendValue }) => {
    return firstAddendValue + secondAddendValue;
  };

  const addRelationListener = () => {
    const firstAddendValue = firstAddend.getValue();
    const secondAddendValue = secondAddend.getValue();
    const sumValue = sum.getValue();

    if (
      firstAddendValue !== Variable.NO_VALUE &&
      secondAddendValue !== Variable.NO_VALUE
    ) {
      const derivedSum = deriveSum({ firstAddendValue, secondAddendValue });
      sum.setValue(derivedSum);
    } else if (
      firstAddendValue !== Variable.NO_VALUE &&
      sumValue !== Variable.NO_VALUE
    ) {
      const addendValue = deriveAddend({
        oneAddendValue: firstAddendValue,
        sumValue,
      });
      secondAddend.setValue(addendValue);
    } else if (
      secondAddendValue !== Variable.NO_VALUE &&
      sumValue !== Variable.NO_VALUE
    ) {
      const addendValue = deriveAddend({
        oneAddendValue: secondAddendValue,
        sumValue,
      });
      firstAddend.setValue(addendValue);
    }
  };

  firstAddend.addListener(addRelationListener);
  secondAddend.addListener(addRelationListener);
  sum.addListener(addRelationListener);
}

function productRelation({ firstFactor, secondFactor, product }) {
  const deriveFactor = ({ oneFactorValue, productValue }) => {
    return productValue / oneFactorValue;
  };
  const deriveProduct = ({ firstFactorValue, secondFactorValue }) => {
    return firstFactorValue * secondFactorValue;
  };

  const productRelationListener = () => {
    const firstFactorValue = firstFactor.getValue();
    const secondFactorValue = secondFactor.getValue();
    const productValue = product.getValue();

    if (
      firstFactorValue !== Variable.NO_VALUE &&
      secondFactorValue !== Variable.NO_VALUE
    ) {
      const derivedProduct = deriveProduct({
        firstFactorValue,
        secondFactorValue,
      });
      product.setValue(derivedProduct);
    } else if (
      firstFactorValue !== Variable.NO_VALUE &&
      productValue !== Variable.NO_VALUE
    ) {
      const derivedProduct = deriveFactor({
        oneFactorValue: firstFactorValue,
        productValue,
      });
      secondFactor.setValue(derivedProduct);
    } else if (
      secondFactorValue !== Variable.NO_VALUE &&
      productValue !== Variable.NO_VALUE
    ) {
      const factorValue = deriveFactor({
        oneFactorValue: secondFactorValue,
        productValue,
      });
      firstFactor.setValue(factorValue);
    }
  };

  firstFactor.addListener(productRelationListener);
  secondFactor.addListener(productRelationListener);
  product.addListener(productRelationListener);
}

function equality(leftHandSide, rightHandSide) {
  const equalityListener = () => {
    const leftHandSideValue = leftHandSide.getValue();
    const rightHandSideValue = rightHandSide.getValue();

    if (leftHandSideValue) {
      rightHandSide.setValue(leftHandSideValue);
    } else if (rightHandSideValue) {
      leftHandSide.setValue(rightHandSideValue);
    }
  };

  leftHandSide.addListener(equalityListener);
  rightHandSide.addListener(equalityListener);
}
/* _____ */

/* complex relations */
function celsiusFaherenheit({ c, f }) {
  // 9C = 5(F - 32)
  // B = F - 32
  // A = 5 * B
  // A = 9 * C

  const nine = new Variable("nine-const");
  constant(nine, 9);

  const five = new Variable("five-const");
  constant(five, 5);

  const thirtyTwo = new Variable("thirty-two-const");
  constant(thirtyTwo, 32);

  const b = new Variable("b");
  const a = new Variable("a");

  // B = F - 32
  additionRelation({ firstAddend: thirtyTwo, secondAddend: b, sum: f });

  // A = 5 * B
  productRelation({ firstFactor: five, secondFactor: b, product: a });

  // A = 9 * C
  productRelation({ firstFactor: nine, secondFactor: c, product: a });
}
/* _____ */

function main() {
  // add relation => z = x + y
  // const z = new Variable("z");
  // const x = new Variable("x");
  // const y = new Variable("y");
  // productRelation({ firstFactor: x, secondFactor: y, product: z });
  // x.setValue(3, Variable.CHANGE_SOURCE.USER);
  // y.setValue(4, Variable.CHANGE_SOURCE.USER);
  // z.setValue(12, Variable.CHANGE_SOURCE.USER);

  const c = new Variable("celsius");
  const f = new Variable("fahrenheit");

  celsiusFaherenheit({ c, f });

  // c.setValue(25, Variable.CHANGE_SOURCE.USER);
  f.setValue(77, Variable.CHANGE_SOURCE.USER);
}

main();
