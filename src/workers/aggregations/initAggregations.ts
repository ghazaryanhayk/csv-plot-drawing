import { collectDataFromIdb } from "../../utils/helpers/collectDataFromIdb.ts";
import { AggregationsCacheType } from "../aggregationWorker.ts";
import { aggregations } from "./aggregations.ts";
import chunk from "lodash.chunk";
import { minimum } from "../../utils/aggregations/minimum.ts";
import { maximum } from "../../utils/aggregations/maximum.ts";

export async function initAggregations({
  dataPoints,
  startingIndex,
  dataPointsShift,
}: {
  dataPoints: number;
  startingIndex: number;
  dataPointsShift: number;
}): Promise<AggregationsCacheType> {
  const data = await collectDataFromIdb(startingIndex, dataPoints);

  const chunks = chunk(data, dataPointsShift);

  const minimums: number[] = [];
  const maximums: number[] = [];

  chunks.forEach((chunk) => {
    const values = chunk.map(([, v]) => v);
    minimums.push(minimum(values));
    maximums.push(maximum(values));
  });

  return {
    data: data,
    aggregations: {
      ...aggregations(data),
      min: minimum(minimums),
      max: maximum(maximums),
    },
    minimums,
    maximums,
  };
}
