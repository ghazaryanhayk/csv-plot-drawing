// LTTB Downsampling Algorithm with MoE Calculation
import { CSVRowType, LTTBReturnType } from "../types.ts";

export const largestTriangleThreeBuckets = (
  data: CSVRowType[],
  threshold: number,
): LTTBReturnType => {
  if (threshold >= data.length || threshold === 0) {
    return { sampledData: data, marginOfError: [] };
  }

  const sampled = [];
  const marginOfError = [];
  const bucketSize = (data.length - 2) / (threshold - 2);

  let a = 0; // Always add the first point
  sampled.push(data[a]);
  marginOfError.push({
    x: data[a][0],
    min: data[a][1],
    max: data[a][1],
  });

  for (let i = 0; i < threshold - 2; i++) {
    const rangeStart = Math.floor((i + 1) * bucketSize) + 1;
    const rangeEnd = Math.min(
      Math.floor((i + 2) * bucketSize) + 1,
      data.length - 1,
    );

    let maxArea = -1;
    let maxAreaPoint = rangeStart;

    const pointA = data[a];

    // Initialize rangeMin and rangeMax with the first value in the range
    let rangeMin = data[rangeStart][1];
    let rangeMax = data[rangeStart][1];

    for (let j = rangeStart; j < rangeEnd; j++) {
      const area = Math.abs(
        (pointA[0] - data[j][0]) * (data[rangeEnd][1] - pointA[1]) -
          (pointA[0] - data[rangeEnd][0]) * (data[j][1] - pointA[1]),
      );

      if (area > maxArea) {
        maxArea = area;
        maxAreaPoint = j;
      }

      // Track min and max values in the range for MoE
      rangeMin = Math.min(rangeMin, data[j][1]);
      rangeMax = Math.max(rangeMax, data[j][1]);
    }

    sampled.push(data[maxAreaPoint]);
    marginOfError.push({
      x: data[maxAreaPoint][0],
      min: rangeMin,
      max: rangeMax,
    });
    a = maxAreaPoint;
  }

  sampled.push(data[data.length - 1]); // Always add the last point
  marginOfError.push({
    x: data[data.length - 1][0],
    min: data[data.length - 1][1],
    max: data[data.length - 1][1],
  });

  return { sampledData: sampled, marginOfError };
};
