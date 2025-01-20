import { CSVRowType } from "../utils/types.ts";
import { largestTriangleThreeBuckets } from "../utils/downsample/lttb.ts";

export {};

self.onmessage = function (event: MessageEvent<CSVRowType[]>) {
  const { data } = event;

  const response = largestTriangleThreeBuckets(data, 100);

  self.postMessage(response);
};
