import * as temperature from "./lib/temperature.js";
import * as distance from "./lib/distance.js";
import * as weight from "./lib/weight.js";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const defaults = JSON.parse(
  readFileSync(join(__dirname, "../config/defaults.json"), "utf-8")
);

export function validateNumericValue(value) {
  // Convert string numbers to actual numbers
  const numValue = typeof value === 'string' ? parseFloat(value) : value;

  // Check if result is a valid number
  if (isNaN(numValue)) {
    throw new Error('Invalid numeric value');
  }

  return numValue;
}

function roundToPrecision(value, precision) {
  return Number.parseFloat(value.toFixed(precision));
}

export function convert(type, value, from, to) {
  // Validate the value parameter first
  const numericValue = validateNumericValue(value);
  let result;
  switch (type) {
    case "temperature":
      result = temperature.convertTemperature(
        numericValue,
        from || defaults.temperature.defaultFrom,
        to || defaults.temperature.defaultTo
      );
      break;
    case "distance":
      result = distance.convertDistance(numericValue, from, to);
      break;
    case "weight":
      result = weight.convertWeight(numericValue, from, to);
      break;
    default:
      throw new Error("Unknown type " + type);
  }
  return roundToPrecision(result, defaults.precision);
}
