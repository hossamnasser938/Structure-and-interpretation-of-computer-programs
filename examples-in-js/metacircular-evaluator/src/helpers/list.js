export const list = (...items) => {
  if (items.length === 0) {
    return null;
  }

  const first = items[0];
  const rest = items.slice(1);

  return [first, list(...rest)];
};

export const head = (list) => {
  return list[0];
};

export const tail = (list) => {
  return list[1];
};
