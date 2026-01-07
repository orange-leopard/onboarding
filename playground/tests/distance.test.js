import { test } from "node:test";
import { strictEqual } from "node:assert";
import { convertDistance } from "../src/lib/distance.js";

test("converts kilometers to meters", () => {
  strictEqual(convertDistance(1, "km", "m"), 1000);
  strictEqual(convertDistance(5, "km", "m"), 5000);
});

test("converts meters to kilometers", () => {
  strictEqual(convertDistance(1000, "m", "km"), 1);
  strictEqual(convertDistance(2500, "m", "km"), 2.5);
});

test("converts meters to miles", () => {
  const result = convertDistance(1609.344, "m", "mi");
  strictEqual(Math.round(result * 10) / 10, 1.0);
});

test("converts miles to meters", () => {
  const result = convertDistance(1, "mi", "m");
  strictEqual(Math.round(result), 1609);
});

test("existing km to mi conversion unchanged", () => {
  const result = convertDistance(5, "km", "mi");
  strictEqual(Math.round(result * 1000) / 1000, 3.107);
});

test("same-unit distance conversion returns unchanged", () => {
  strictEqual(convertDistance(100, "m", "m"), 100);
});
