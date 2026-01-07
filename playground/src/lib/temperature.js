function toKelvin(value, from) {
  switch (from) {
    case "C":
      return value + 273.15;
    case "F":
      return (value - 32) * (5 / 9) + 273.15;
    case "K":
      return value;
    default:
      throw new Error(`Unsupported temperature unit: ${from}`);
  }
}

function fromKelvin(value, to) {
  switch (to) {
    case "C":
      return value - 273.15;
    case "F":
      return (value - 273.15) * (9 / 5) + 32;
    case "K":
      return value;
    default:
      throw new Error(`Unsupported temperature unit: ${to}`);
  }
}

export function convertTemperature(value, from, to) {
  if (from === to) {
    return value;
  }
  const kelvin = toKelvin(value, from);
  return fromKelvin(kelvin, to);
}
