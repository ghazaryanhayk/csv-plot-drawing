import { describe, expect, test } from "vitest";
import { average } from "./average";

describe("average function", () => {
  test("should return the average of an array of numbers", () => {
    const values = [1, 2, 3, 4, 5];
    const result = average(values);
    expect(result).toBe(3);
  });

  test("should return NaN for an empty array", () => {
    const values: number[] = [];
    const result = average(values);
    expect(result).toBeNaN();
  });

  test("should handle an array with a single number", () => {
    const values = [42];
    const result = average(values);
    expect(result).toBe(42);
  });

  test("should handle an array with negative numbers", () => {
    const values = [-1, -2, -3, -4, -5];
    const result = average(values);
    expect(result).toBe(-3);
  });

  test("should handle an array with mixed positive and negative numbers", () => {
    const values = [-1, 2, -3, 4, -5];
    const result = average(values);
    expect(result).toBe(-0.6);
  });
});
