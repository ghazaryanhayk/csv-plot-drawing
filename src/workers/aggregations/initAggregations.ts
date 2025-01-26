import { collectDataFromIdb } from "../../utils/helpers/collectDataFromIdb.ts";
import { AggregationsCacheType } from "../aggregationWorker.ts";
import { aggregations } from "./aggregations.ts";

export async function initAggregations({
  dataPoints,
  startingIndex,
}: {
  cache: AggregationsCacheType;
  dataPoints: number;
  startingIndex: number;
}): Promise<AggregationsCacheType> {
  const data = await collectDataFromIdb(startingIndex, dataPoints);

  return {
    data: data,
    aggregations: aggregations(data),
  };
}
