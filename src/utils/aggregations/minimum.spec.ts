import { describe, expect, test } from "vitest";
import { minimum } from "./minimum";

describe("minimum function", () => {
  test("should return the minimum of an array of numbers", () => {
    const values = [1, 2, 3, 4, 5];
    const result = minimum(values);
    expect(result).toBe(1);
  });

  test("should return Infinity for an empty array", () => {
    const values: number[] = [];
    const result = minimum(values);
    expect(result).toBe(Infinity);
  });

  test("should handle an array with a single number", () => {
    const values = [42];
    const result = minimum(values);
    expect(result).toBe(42);
  });

  test("should handle an array with negative numbers", () => {
    const values = [-1, -2, -3, -4, -5];
    const result = minimum(values);
    expect(result).toBe(-5);
  });

  test("should handle an array with mixed positive and negative numbers", () => {
    const values = [-1, 2, -3, 4, -5];
    const result = minimum(values);
    expect(result).toBe(-5);
  });
});
