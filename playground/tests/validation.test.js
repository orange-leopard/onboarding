import { test } from "node:test";
import { strictEqual, throws } from "node:assert";
import { convert } from "../src/convert.js";

// Tests for input validation
// These tests should FAIL initially and pass after implementing validation

test("rejects non-numeric value", () => {
  throws(
    () => convert("temperature", "abc", "C", "F"),
    /invalid.*number|numeric/i,
    "Should throw error for non-numeric input"
  );
});

test("rejects NaN value", () => {
  throws(
    () => convert("temperature", NaN, "C", "F"),
    /invalid.*number|numeric/i,
    "Should throw error for NaN"
  );
});

test("rejects unknown conversion type", () => {
  throws(
    () => convert("volume", 100, "L", "gal"),
    /unknown.*type/i,
    "Should throw error for unsupported conversion type"
  );
});

test("accepts valid numeric strings", () => {
  // Should convert string to number and process
  const result = convert("temperature", "100", "C", "F");
  strictEqual(result, 212);
});

test("accepts negative values", () => {
  const result = convert("temperature", -40, "C", "F");
  strictEqual(result, -40); // -40°C = -40°F (special case!)
});

test("accepts zero", () => {
  const result = convert("temperature", 0, "C", "F");
  strictEqual(result, 32);
});

test("rejects unknown temperature 'from' unit code", () => {
  throws(
    () => convert("temperature", 100, "K", "F"),
    /unknown.*from.*unit|unknown.*unit.*code.*from/i,
    "Should throw error for unknown 'from' unit code"
  );
});

test("rejects unknown temperature 'to' unit code", () => {
  throws(
    () => convert("temperature", 100, "C", "K"),
    /unknown.*to.*unit|unknown.*unit.*code.*to/i,
    "Should throw error for unknown 'to' unit code"
  );
});

test("rejects unknown distance 'from' unit code", () => {
  throws(
    () => convert("distance", 5, "m", "mi"),
    /unknown.*from.*unit|unknown.*unit.*code.*from/i,
    "Should throw error for unknown distance 'from' unit code"
  );
});

test("rejects unknown distance 'to' unit code", () => {
  throws(
    () => convert("distance", 5, "km", "yd"),
    /unknown.*to.*unit|unknown.*unit.*code.*to/i,
    "Should throw error for unknown distance 'to' unit code"
  );
});

test("rejects unknown weight 'from' unit code", () => {
  throws(
    () => convert("weight", 100, "kg", "oz"),
    /unknown.*from.*unit|unknown.*unit.*code.*from/i,
    "Should throw error for unknown weight 'from' unit code"
  );
});

test("rejects unknown weight 'to' unit code", () => {
  throws(
    () => convert("weight", 100, "g", "lb"),
    /unknown.*to.*unit|unknown.*unit.*code.*to/i,
    "Should throw error for unknown weight 'to' unit code"
  );
});
