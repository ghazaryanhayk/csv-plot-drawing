import { CSVRowType } from "../../utils/types.ts";
import { maximum } from "../../utils/aggregations/maximum.ts";
import { minimum } from "../../utils/aggregations/minimum.ts";

export function minimumsAndMaximums(
  cache: { maximums: number[]; minimums: number[] },
  addedData: CSVRowType[],
) {
  const maximums = cache.maximums.slice(1);
  const minimums = cache.minimums.slice(1);

  maximums.push(maximum(addedData));
  minimums.push(minimum(addedData));

  return {
    minimums,
    maximums,
    min: Math.min(...maximums),
    max: Math.max(...minimums),
  };
}
