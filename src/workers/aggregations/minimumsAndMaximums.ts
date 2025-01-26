import { CSVRowType } from "../../utils/types.ts";
import { maximum } from "../../utils/aggregations/maximum.ts";
import { minimum } from "../../utils/aggregations/minimum.ts";

export function minimumsAndMaximums(
  cache: {
    maximums: number[];
    minimums: number[];
    prevMin: number;
    prevMax: number;
  },
  addedData: CSVRowType[],
) {
  cache.maximums.splice(1);
  cache.minimums.splice(1);

  const values = addedData.map(([, v]) => v);

  const addedMaximum = maximum(values);
  const addedMinimum = minimum(values);

  cache.maximums.push(addedMaximum);
  cache.minimums.push(addedMinimum);

  const min =
    addedMinimum <= cache.prevMin ? addedMinimum : minimum(cache.minimums);

  const max =
    addedMaximum >= cache.prevMax ? addedMaximum : maximum(cache.maximums);

  return {
    minimums: cache.minimums,
    maximums: cache.maximums,
    min: min,
    max: max,
  };
}
