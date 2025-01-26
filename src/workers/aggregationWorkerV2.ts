import { collectDataFromIdb } from "../utils/helpers/collectDataFromIdb.ts";
import { initAggregations } from "./aggregations/initAggregations.ts";
import { cacheData } from "../db/db.ts";
import { updateAggregations } from "./aggregations/aggregations.ts";
import { CSVRowType } from "../utils/types.ts";

export {};

export type AggregationCacheType = {
  count: number;
  sum: number;
  sumOfSquares: number;
  min: number;
  max: number;
  average: number;
  variance: number;
};

export type AggregationsCacheType = {
  aggregations: AggregationCacheType;
  data: CSVRowType[];
};

let _cache: AggregationsCacheType = {
  aggregations: {
    count: 0,
    sum: 0,
    sumOfSquares: 0,
    min: Infinity,
    max: -Infinity,
    average: 0,
    variance: 0,
  },
  data: [],
};

async function* nextAggregationsGenV2(
  startingIndex: number,
  dataPoints: number,
  dataPointsShift: number,
) {
  let additionalDataStart = startingIndex + dataPoints;

  while (true) {
    performance.mark("nextAggregationsGenV2:start");
    const addedData = await collectDataFromIdb(
      additionalDataStart,
      dataPointsShift,
    );

    const removedData = _cache.data.slice(0, addedData.length);

    if (addedData.length === 0) {
      return;
    }
    performance.mark("nextAggregationsGenV2:newData:start");
    _cache.data.slice(addedData.length);
    for (let i = 0; i < addedData.length; i++) {
      _cache.data.push(addedData[i]);
    }
    performance.mark("nextAggregationsGenV2:newData:end");
    performance.measure(
      "nextAggregationsGenV2:newData",
      "nextAggregationsGenV2:newData:start",
      "nextAggregationsGenV2:newData:end",
    );

    const newAggregations = updateAggregations(
      _cache.aggregations,
      addedData,
      removedData,
      _cache.data,
    );

    _cache.aggregations = newAggregations;

    additionalDataStart += dataPointsShift;
    performance.mark("nextAggregationsGenV2:end");
    performance.measure(
      "nextAggregationsGenV2",
      "nextAggregationsGenV2:start",
      "nextAggregationsGenV2:end",
    );
    yield newAggregations;
  }
}

let nextAggregationsV2: AsyncGenerator;

self.onmessage = async function (
  event: MessageEvent<{
    type: "init" | "cache" | "next";
    startingIndex: number;
    dataPoints: number;
    dataPointsShift: number;
  }>,
) {
  const {
    data: { type, startingIndex, dataPoints, dataPointsShift },
  } = event;

  switch (type) {
    case "init": {
      _cache = await initAggregations({
        cache: _cache,
        dataPoints,
        startingIndex,
      });

      nextAggregationsV2 = nextAggregationsGenV2(
        startingIndex,
        dataPoints,
        dataPointsShift,
      );

      self.postMessage({ type: "init:complete", data: _cache.aggregations });
      break;
    }
    case "cache": {
      await cacheData();
      self.postMessage({ type: "cache:complete" });
      break;
    }
    case "next": {
      const result = await nextAggregationsV2.next();

      self.postMessage({
        type: "next:complete",
        data: result.done ? null : result.value,
      });
      break;
    }
    default: {
      throw new Error("Unknown message type");
    }
  }
};
