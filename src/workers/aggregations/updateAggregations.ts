import { AggregationCacheType } from "../aggregationWorker.ts";
import { CSVRowType } from "../../utils/types.ts";
import { aggregations } from "./aggregations.ts";

export function updateAggregations(
  prev: AggregationCacheType,
  added: CSVRowType[],
  removed: CSVRowType[],
) {
  const count = prev.count + added.length - removed.length;

  const { sum: addedSum, sumOfSquares: addedSumOfSquares } =
    aggregations(added);

  const { sum: removedSum, sumOfSquares: removedSumOfSquares } =
    aggregations(removed);

  const sum = prev.sum + addedSum - removedSum;

  const sumOfSquares =
    prev.sumOfSquares + addedSumOfSquares - removedSumOfSquares;

  const average = sum / count;
  const variance = sumOfSquares / count - Math.pow(sum / count, 2);

  return {
    count,
    sum,
    sumOfSquares,
    average,
    variance,
  };
}
