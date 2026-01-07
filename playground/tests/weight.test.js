import { test } from "node:test";
import { strictEqual } from "node:assert";
import { convertWeight } from "../src/lib/weight.js";

test("converts pounds to grams", () => {
  const result = convertWeight(1, "lb", "g");
  strictEqual(Math.round(result * 100) / 100, 453.59);
});

test("converts grams to pounds", () => {
  const result = convertWeight(453.592, "g", "lb");
  strictEqual(Math.round(result), 1);
});

test("converts pounds to ounces", () => {
  strictEqual(convertWeight(1, "lb", "oz"), 16);
  strictEqual(convertWeight(2, "lb", "oz"), 32);
});

test("converts ounces to pounds", () => {
  strictEqual(convertWeight(16, "oz", "lb"), 1);
  strictEqual(convertWeight(32, "oz", "lb"), 2);
});

test("existing g to oz conversion unchanged", () => {
  const result = convertWeight(100, "g", "oz");
  strictEqual(Math.round(result * 100) / 100, 3.53);
});

test("same-unit weight conversion returns unchanged", () => {
  strictEqual(convertWeight(100, "g", "g"), 100);
});
