#!/usr/bin/env node
import { convert, validateNumericValue } from "../src/convert.js";

function detectType(unit) {
  const distanceUnits = ["km", "mi", "m"];
  const weightUnits = ["oz", "lb", "g"];
  const temperatureUnits = ["C", "F", "K"];

  if (distanceUnits.includes(unit)) {
    return "distance";
  }
  if (weightUnits.includes(unit)) {
    return "weight";
  }
  if (temperatureUnits.includes(unit)) {
    return "temperature";
  }
  throw new Error(`Unknown unit: ${unit}`);
}

function handleCompare(value1, unit1, value2, unit2) {
  const type1 = detectType(unit1);
  const type2 = detectType(unit2);

  if (type1 !== type2) {
    throw new Error(`Cannot compare ${type1} (${unit1}) with ${type2} (${unit2})`);
  }

  const numValue1 = validateNumericValue(value1);
  const numValue2 = validateNumericValue(value2);

  // Convert both values to a common base unit for comparison
  let baseUnit;
  switch (type1) {
    case "distance":
      baseUnit = "m";
      break;
    case "weight":
      baseUnit = "g";
      break;
    case "temperature":
      baseUnit = "K";
      break;
  }

  const value1InBase = convert(type1, numValue1, unit1, baseUnit);
  const value2InBase = convert(type1, numValue2, unit2, baseUnit);

  // Calculate difference in base unit, then convert back to unit1
  const differenceInBase = Math.abs(value1InBase - value2InBase);
  const difference = convert(type1, differenceInBase, baseUnit, unit1);

  const isLarger = value1InBase > value2InBase;
  const comparison = isLarger ? "larger" : "smaller";

  console.log(
    `${value1} ${unit1} is ${comparison} than ${value2} ${unit2} by ${difference} ${unit1}`
  );
}

const [,, command, ...args] = process.argv;

if (command === "compare") {
  if (args.length !== 4) {
    console.error("Usage: convert compare <value1> <unit1> <value2> <unit2>");
    process.exit(1);
  }
  const [value1, unit1, value2, unit2] = args;
  try {
    handleCompare(value1, unit1, value2, unit2);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
} else {
  // Original convert command
  const [type, value, from, to] = [command, ...args];
  if (!type || !value) {
    console.error("Usage: convert <type> <value> [from] [to]");
    console.error("       convert compare <value1> <unit1> <value2> <unit2>");
    process.exit(1);
  }

  try {
    const result = convert(type, Number(value), from, to);
    console.log(result);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}
