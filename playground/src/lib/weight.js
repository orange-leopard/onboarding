function toGrams(value, from) {
  switch (from) {
    case "oz":
      return value * 28.3495;
    case "lb":
      return value * 453.592;
    case "g":
      return value;
    default:
      throw new Error(`Unsupported weight unit: ${from}`);
  }
}

function fromGrams(value, to) {
  switch (to) {
    case "oz":
      return value / 28.3495;
    case "lb":
      return value / 453.592;
    case "g":
      return value;
    default:
      throw new Error(`Unsupported weight unit: ${to}`);
  }
}

export function convertWeight(value, from, to) {
  if (from === to) {
    return value;
  }
  const grams = toGrams(value, from);
  return fromGrams(grams, to);
}
