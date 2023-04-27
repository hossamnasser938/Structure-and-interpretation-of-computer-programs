class Wire {
  signal = 0
  subscribers = []

  subscribe(subscriber) {
    this.subscribers.push(subscriber)
    subscriber()
  }

  setSignal(signal) {
    this.signal = signal
    this.subscribers.forEach(subscriber => subscriber())
  }

  getSignal() {
    return this .signal
  }
}

function logicalNot(signal) {
  return signal === 0 ? 1 : 0
}

function logicalOr(inputSignal1, inputSignal2) {
  return inputSignal1 || inputSignal2
}

function logicalAnd(inputSignal1, inputSignal2) {
  return inputSignal1 && inputSignal2
}

function Inverter(inputWire, outputWire) {
  const inverter = () => {
    const inputSignal = inputWire.getSignal()
    const outputSignal = logicalNot(inputSignal)
    outputWire.setSignal(outputSignal)
  }
  
  inputWire.subscribe(inverter)
}

function OR(inputWire1, inputWire2, outputWire) {
  const or = () => {
    const inputSignal1 = inputWire1.getSignal()
    const inputSignal2 = inputWire2.getSignal()

    outputSignal = logicalOr(inputSignal1, inputSignal2)

    outputWire.setSignal(outputSignal)
  }

  inputWire1.subscribe(or)
  inputWire2.subscribe(or)
}

function AND(inputWire1, inputWire2, outputWire) {
  const and = () => {
    const inputSignal1 = inputWire1.getSignal()
    const inputSignal2 = inputWire2.getSignal()

    outputSignal = logicalAnd(inputSignal1, inputSignal2)

    outputWire.setSignal(outputSignal)
  }

  inputWire1.subscribe(and)
  inputWire2.subscribe(and)
}

function probe(wire, key) {
  wire.subscribe(() => {
    const wireSignal = wire.getSignal()
    console.log(`${key} = ${wireSignal}`)
  })
}

function HalfAdder(wire1, wire2, wire3, wire4) {
  const wire5 = new Wire()
  const wire6 = new Wire()

  OR(wire1, wire2, wire5)
  AND(wire1, wire2, wire4)
  Inverter(wire4, wire6)
  AND(wire6, wire5, wire3)
}

const wireA = new Wire()
const wireB = new Wire()
const wireS = new Wire()
const wireC = new Wire()

probe(wireS, "WireS")
probe(wireC, "WireC")

HalfAdder(wireA, wireB, wireS, wireC)


setTimeout(() => {
  wireB.setSignal(1)
}, 3000) 