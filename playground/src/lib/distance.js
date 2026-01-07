function toMeters(value, from) {
  switch (from) {
    case "km":
      return value * 1000;
    case "mi":
      return value / 0.000621371;
    case "m":
      return value;
    default:
      throw new Error(`Unsupported distance unit: ${from}`);
  }
}

function fromMeters(value, to) {
  switch (to) {
    case "km":
      return value / 1000;
    case "mi":
      return value * 0.000621371;
    case "m":
      return value;
    default:
      throw new Error(`Unsupported distance unit: ${to}`);
  }
}

export function convertDistance(value, from, to) {
  if (from === to) {
    return value;
  }
  const meters = toMeters(value, from);
  return fromMeters(meters, to);
}
