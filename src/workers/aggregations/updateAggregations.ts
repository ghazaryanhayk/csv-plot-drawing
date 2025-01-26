import { AggregationCacheType } from "../aggregationWorker.ts";
import { CSVRowType } from "../../utils/types.ts";
import { minimum } from "../../utils/aggregations/minimum.ts";
import { maximum } from "../../utils/aggregations/maximum.ts";
import { aggregations } from "./aggregations.ts";

export function updateAggregations(
  prev: AggregationCacheType,
  added: CSVRowType[],
  removed: CSVRowType[],
  newData: CSVRowType[],
) {
  const count = prev.count + added.length - removed.length;

  const {
    sum: addedSum,
    sumOfSquares: addedSumOfSquares,
    min: addedMin,
    max: addedMax,
  } = aggregations(added);

  const { sum: removedSum, sumOfSquares: removedSumOfSquares } =
    aggregations(removed);

  const sum = prev.sum + addedSum - removedSum;

  const sumOfSquares =
    prev.sumOfSquares + addedSumOfSquares - removedSumOfSquares;

  const average = sum / count;
  const variance = sumOfSquares / count - Math.pow(sum / count, 2);

  const min = addedMin <= prev.min ? addedMin : minimum(newData);
  const max = addedMax >= prev.max ? addedMax : maximum(newData);

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
