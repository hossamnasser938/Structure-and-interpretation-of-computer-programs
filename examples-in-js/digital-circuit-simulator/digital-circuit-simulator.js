/* __ Wire __ */
class Wire {
  static NO_SIGNAL = null;
  static SIGNAL_SOURCE = {
    USER: "USER",
    DERIVED: "DERIVED",
  };

  name = "";
  signal = Wire.NO_SIGNAL;
  listeners = [];

  constructor(name) {
    this.name = name;
    this.addPropListener();
  }

  addListener(listener) {
    this.listeners.push(listener);
  }

  addPropListener() {
    this.addListener((signalSource) => {
      if (signalSource === Wire.SIGNAL_SOURCE.USER) {
        return;
      }

      if (this.signal === Wire.NO_SIGNAL) {
        console.log(`Wire ${this.name} lost signal`);
      } else {
        console.log(`Wire ${this.name} got ${this.signal} signal`);
      }
    });
  }

  setSignal(signal, signalSource = Wire.SIGNAL_SOURCE.DERIVED) {
    if (signal === this.signal) {
      return;
    }

    this.signal = signal;

    this.listeners.forEach((listener) => listener(signalSource));
  }

  getSignal() {
    return this.signal;
  }
}
/* _____ */

/* __ inverter gate __ */
function inverterLogic({ inputWireSignal }) {
  if (inputWireSignal === Wire.NO_SIGNAL) {
    return Wire.NO_SIGNAL;
  }

  return !inputWireSignal;
}

function inverter({ inputWire, outputWire }) {
  const inverterListener = () => {
    const inputWireSignal = inputWire.getSignal();

    const outputWireSignal = inverterLogic({ inputWireSignal });

    outputWire.setSignal(outputWireSignal);
  };

  inputWire.addListener(inverterListener);
}
/* _____ */

/* __ and gate __ */
function andGateLogic({ firstInputWireSignal, secondInputWireSignal }) {
  if (
    firstInputWireSignal === Wire.NO_SIGNAL ||
    secondInputWireSignal === Wire.NO_SIGNAL
  ) {
    return Wire.NO_SIGNAL;
  }

  return firstInputWireSignal && secondInputWireSignal;
}

function andGate({ inputWires, outputWire }) {
  const firstInputWire = inputWires[0];
  const secondInputWire = inputWires[1];

  const andListener = () => {
    const firstInputWireSignal = firstInputWire.getSignal();
    const secondInputWireSignal = secondInputWire.getSignal();

    const outputWireSignal = andGateLogic({
      firstInputWireSignal,
      secondInputWireSignal,
    });

    outputWire.setSignal(outputWireSignal);
  };

  firstInputWire.addListener(andListener);
  secondInputWire.addListener(andListener);
}
/* _____ */

/* __ or gate __ */
function orGateLogic({ firstInputWireSignal, secondInputWireSignal }) {
  if (
    firstInputWireSignal === Wire.NO_SIGNAL ||
    secondInputWireSignal === Wire.NO_SIGNAL
  ) {
    return Wire.NO_SIGNAL;
  }

  return firstInputWireSignal || secondInputWireSignal;
}

function orGate({ inputWires, outputWire }) {
  const firstInputWire = inputWires[0];
  const secondInputWire = inputWires[1];

  const andListener = () => {
    const firstInputWireSignal = firstInputWire.getSignal();
    const secondInputWireSignal = secondInputWire.getSignal();

    const outputWireSignal = orGateLogic({
      firstInputWireSignal,
      secondInputWireSignal,
    });

    outputWire.setSignal(outputWireSignal);
  };

  firstInputWire.addListener(andListener);
  secondInputWire.addListener(andListener);
}
/* _____ */

/* composed circuits */
function halfAdder({ inputWireA, inputWireB, outputWireS, outputWireC }) {
  const intermediateWireD = new Wire("intermediateD");
  const intermediateWireE = new Wire("intermediateE");

  orGate({
    inputWires: [inputWireA, inputWireB],
    outputWire: intermediateWireD,
  });

  andGate({ inputWires: [inputWireA, inputWireB], outputWire: outputWireC });

  inverter({ inputWire: outputWireC, outputWire: intermediateWireE });

  andGate({
    inputWires: [intermediateWireD, intermediateWireE],
    outputWire: outputWireS,
  });
}

function fullAdder({
  inputWireA,
  inputWireB,
  inputWireCIn,
  outputWireS,
  outputWireCOut,
}) {
  const intermediateWireE = new Wire("intermediateE");
  const intermediateWireF = new Wire("intermediateF");
  const intermediateWireG = new Wire("intermediateG");

  halfAdder({
    inputWireA: inputWireCIn,
    inputWireB,
    outputWireS: intermediateWireE,
    outputWireC: intermediateWireF,
  });

  halfAdder({
    inputWireA,
    inputWireB: intermediateWireE,
    outputWireS,
    outputWireC: intermediateWireG,
  });

  orGate({
    inputWires: [intermediateWireG, intermediateWireF],
    outputWire: outputWireCOut,
  });
}
/* _____ */

function main() {
  // inverter
  //   const inputWire = new Wire("input");
  //   const outputWire = new Wire("output");
  //   inverter({ inputWire, outputWire });
  //   inputWire.setSignal(false, Wire.SIGNAL_SOURCE.USER);
  // and
  //   const inputWireA = new Wire("inputA");
  //   const inputWireB = new Wire("inputB");
  //   const outputWire = new Wire("output");
  //   andGate({ inputWires: [inputWireA, inputWireB], outputWire });
  //   inputWireA.setSignal(true, Wire.SIGNAL_SOURCE.USER);
  //   inputWireB.setSignal(true, Wire.SIGNAL_SOURCE.USER);
  //   inputWireB.setSignal(false, Wire.SIGNAL_SOURCE.USER);
  // or
  //   const inputWireA = new Wire("inputA");
  //   const inputWireB = new Wire("inputB");
  //   const outputWire = new Wire("output");
  //   orGate({ inputWires: [inputWireA, inputWireB], outputWire });
  //   inputWireA.setSignal(true, Wire.SIGNAL_SOURCE.USER);
  //   inputWireB.setSignal(true, Wire.SIGNAL_SOURCE.USER);
  //   inputWireA.setSignal(false, Wire.SIGNAL_SOURCE.USER);
  //   inputWireB.setSignal(false, Wire.SIGNAL_SOURCE.USER);
  // half-adder
  //   const inputWireA = new Wire("inputA");
  //   const inputWireB = new Wire("inputB");
  //   const outputWireS = new Wire("outputS");
  //   const outputWireC = new Wire("outputC");
  //   halfAdder({ inputWireA, inputWireB, outputWireS, outputWireC });
  //   inputWireA.setSignal(true, Wire.SIGNAL_SOURCE.USER);
  //   inputWireB.setSignal(false, Wire.SIGNAL_SOURCE.USER);

  // full-adder
  const inputWireA = new Wire("inputA");
  const inputWireB = new Wire("inputB");
  const inputWireCIn = new Wire("inputCIn");
  const outputWireS = new Wire("outputS");
  const outputWireCOut = new Wire("outputCOut");
  fullAdder({
    inputWireA,
    inputWireB,
    inputWireCIn,
    outputWireS,
    outputWireCOut,
  });

  inputWireA.setSignal(true, Wire.SIGNAL_SOURCE.USER);
  inputWireB.setSignal(true, Wire.SIGNAL_SOURCE.USER);
  inputWireCIn.setSignal(true, Wire.SIGNAL_SOURCE.USER);
}

main();
