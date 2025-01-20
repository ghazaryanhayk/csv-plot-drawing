import { minimum } from "../utils/aggregations/minimum.ts";
import { maximum } from "../utils/aggregations/maximum.ts";
import { average } from "../utils/aggregations/average.ts";
import { variance } from "../utils/aggregations/variance.ts";
import { CSVRowType } from "../utils/types.ts";

export {};

self.onmessage = function (event: MessageEvent<CSVRowType[]>) {
  const { data } = event;

  const values = data?.map(([, y]) => y);

  const min = minimum(values);
  const max = maximum(values);
  const avg = average(values);
  const vrnc = variance(values, avg);

  self.postMessage({ min, max, average: avg, variance: vrnc });
};
