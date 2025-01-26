import { AggregationCacheType } from "../aggregationWorkerV2.ts";
import { minimum } from "../../utils/aggregations/minimum.ts";
import { maximum } from "../../utils/aggregations/maximum.ts";
import { CSVRowType } from "../../utils/types.ts";

export function aggregations(values: CSVRowType[]): AggregationCacheType {
  performance.mark("start:aggregations");
  const aggregations = aggregationHelper(values);
  performance.mark("end:aggregations");
  performance.measure("aggregations", "start:aggregations", "end:aggregations");
  return aggregations;
}

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

function aggregationHelper(values: CSVRowType[]) {
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

  const variance =
    sumOfSquares / values.length - Math.pow(sum / values.length, 2);
  const average = sum / values.length;

  return {
    count: values.length,
    sum: sum,
    sumOfSquares: sumOfSquares,
    min: min,
    max: max,
    average: average,
    variance: variance,
  };
}
