import { test } from "node:test";
import { strictEqual } from "node:assert";
import { convertTemperature } from "../src/lib/temperature.js";

test("converts Celsius to Fahrenheit", () => {
  strictEqual(convertTemperature(0, "C", "F"), 32);
  strictEqual(convertTemperature(100, "C", "F"), 212);
});

test("converts Fahrenheit to Celsius", () => {
  strictEqual(convertTemperature(32, "F", "C"), 0);
  strictEqual(convertTemperature(212, "F", "C"), 100);
});

test("converts Celsius to Kelvin", () => {
  strictEqual(convertTemperature(0, "C", "K"), 273.15);
  strictEqual(convertTemperature(-273.15, "C", "K"), 0);
});

test("converts Kelvin to Celsius", () => {
  strictEqual(convertTemperature(273.15, "K", "C"), 0);
  strictEqual(convertTemperature(373.15, "K", "C"), 100);
});

test("converts Fahrenheit to Kelvin", () => {
  const result = convertTemperature(32, "F", "K");
  strictEqual(Math.round(result * 100) / 100, 273.15);
});

test("converts Kelvin to Fahrenheit", () => {
  const result = convertTemperature(273.15, "K", "F");
  strictEqual(Math.round(result), 32);
});

test("same-unit temperature conversion returns unchanged", () => {
  strictEqual(convertTemperature(100, "C", "C"), 100);
  strictEqual(convertTemperature(273.15, "K", "K"), 273.15);
});
