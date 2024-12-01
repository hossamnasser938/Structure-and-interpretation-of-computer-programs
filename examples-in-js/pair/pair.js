function isPair(z) {
  return Array.isArray(z);
}

function isNull(z) {
  return z === null || (isPair(z) && z.length === 0);
}

function cons(x, y) {
  return [x, () => y];
}

function car(z) {
  return z[0];
}

function cdr(z) {
  return z[1]();
}

const z = cons(1, 2);
console.log("🚀 ~ z:", z);

console.log("🚀 ~ car z:", car(z));
console.log("🚀 ~ cdr z:", cdr(z));
