import { largestTriangleThreeBuckets } from "./lttb";
import { describe, expect, test } from "vitest";
import { CSVRowType } from "../types.ts";

describe("LTTB Downsampling Algorithm with MoE Calculation", () => {
  test("should downsample to the specified number of points", () => {
    const data: CSVRowType[] = [
      [1, 10],
      [2, 15],
      [3, 8],
      [4, 12],
      [5, 7],
      [6, 18],
    ];
    const targetPoints = 3;
    const { sampledData } = largestTriangleThreeBuckets(data, targetPoints);

    expect(sampledData).toHaveLength(targetPoints);
    expect(sampledData[0]).toEqual(data[0]); // First point should remain
    expect(sampledData[sampledData.length - 1]).toEqual(data[data.length - 1]); // Last point should remain
  });

  test("should handle empty dataset", () => {
    const data: CSVRowType[] = [];
    const targetPoints = 3;
    const { sampledData } = largestTriangleThreeBuckets(data, targetPoints);

    expect(sampledData).toEqual([]);
  });

  test("should handle dataset smaller than target points", () => {
    const data: CSVRowType[] = [
      [1, 10],
      [2, 15],
    ];
    const targetPoints = 5;
    const { sampledData } = largestTriangleThreeBuckets(data, targetPoints);

    expect(sampledData).toEqual(data);
  });

  test("should maintain performance for large datasets", () => {
    const data: CSVRowType[] = Array.from({ length: 100000 }, (_, i) => [
      i,
      Math.sin(i),
    ]);
    const targetPoints = 1000;
    const start = performance.now();
    const { sampledData } = largestTriangleThreeBuckets(data, targetPoints);
    const end = performance.now();

    expect(sampledData).toHaveLength(targetPoints);
    expect(end - start).toBeLessThan(1000); // Algorithm should complete in under 1 second
  });
});
