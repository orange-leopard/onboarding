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

// Valid unit codes for each conversion type
const VALID_UNITS = {
  temperature: ["C", "F"],
  distance: ["km", "mi"],
  weight: ["g", "oz"],
};

function validateNumericValue(value) {
  // Convert to number if it's a string
  const numValue = typeof value === "string" ? Number(value) : value;
  
  // Check if it's a valid number
  if (typeof numValue !== "number" || isNaN(numValue)) {
    throw new Error(`Invalid number: ${value} is not a valid numeric value`);
  }
  
  return numValue;
}

function validateUnitCode(type, unit, unitName) {
  if (unit && !VALID_UNITS[type].includes(unit)) {
    throw new Error(`Unknown ${unitName} unit code: ${unit}. Valid units for ${type} are: ${VALID_UNITS[type].join(", ")}`);
  }
}

export function convert(type, value, from, to) {
  // Validate numeric value
  const numericValue = validateNumericValue(value);
  
  // Validate unit codes
  switch (type) {
    case "temperature":
      validateUnitCode("temperature", from, "from");
      validateUnitCode("temperature", to, "to");
      return temperature.convertTemperature(
        numericValue,
        from || defaults.temperature.defaultFrom,
        to || defaults.temperature.defaultTo
      );
    case "distance":
      validateUnitCode("distance", from, "from");
      validateUnitCode("distance", to, "to");
      if (!from || !to) {
        throw new Error("Both 'from' and 'to' unit codes are required for distance conversion");
      }
      return distance.convertDistance(numericValue, from, to);
    case "weight":
      validateUnitCode("weight", from, "from");
      validateUnitCode("weight", to, "to");
      if (!from || !to) {
        throw new Error("Both 'from' and 'to' unit codes are required for weight conversion");
      }
      return weight.convertWeight(numericValue, from, to);
    default:
      throw new Error("Unknown type " + type);
  }
}
