import { AggregationCacheType } from "../aggregationWorker.ts";
import { CSVRowType } from "../../utils/types.ts";

export function aggregations(values: CSVRowType[]): AggregationCacheType {
  const count = values.length;
  let sum = 0;
  let sumOfSquares = 0;
  let min = Infinity;
  let max = -Infinity;

  for (let i = 0; i < values.length; i++) {
    if (values[i][1] < min) {
      min = values[i][1];
    }
    if (values[i][1] > max) {
      max = values[i][1];
    }
    sum += values[i][1];
    sumOfSquares += Math.pow(values[i][1], 2);
  }

  const variance = sumOfSquares / count - Math.pow(sum / count, 2);
  const average = sum / count;

  return {
    count,
    sum,
    sumOfSquares,
    min,
    max,
    average,
    variance,
  };
}
