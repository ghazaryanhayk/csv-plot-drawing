import { describe, expect, test } from "vitest";
import { variance } from "./variance";

describe("variance function", () => {
  test("should return the variance of an array of numbers", () => {
    const values = [1, 2, 3, 4, 5];
    const avg = 3;
    const result = variance(values, avg);
    expect(result).toBe(2);
  });

  test("should return 0 for an array with a single number", () => {
    const values = [42];
    const avg = 42;
    const result = variance(values, avg);
    expect(result).toBe(0);
  });

  test("should handle an array with negative numbers", () => {
    const values = [-1, -2, -3, -4, -5];
    const avg = -3;
    const result = variance(values, avg);
    expect(result).toBe(2);
  });

  test("should handle an array with mixed positive and negative numbers", () => {
    const values = [-1, 2, -3, 4, -5];
    const avg = -0.6;
    const result = variance(values, avg);
    expect(result).toBeCloseTo(10.64, 2);
  });

  test("should return NaN for an empty array", () => {
    const values: number[] = [];
    const avg = 0;
    const result = variance(values, avg);
    expect(result).toBeNaN();
  });
});
