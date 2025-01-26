import { collectDataFromIdb } from "../utils/helpers/collectDataFromIdb.ts";
import { initAggregations } from "./aggregations/initAggregations.ts";
import { cacheData, clearCache } from "../db/db.ts";
import { CSVRowType } from "../utils/types.ts";
import { updateAggregations } from "./aggregations/updateAggregations.ts";
import { minimumsAndMaximums } from "./aggregations/minimumsAndMaximums.ts";

export {};

export type AggregationCacheType = {
  count: number;
  sum: number;
  sumOfSquares: number;
  average: number;
  variance: number;
  min?: number;
  max?: number;
};

export type AggregationsCacheType = {
  aggregations: AggregationCacheType;
  data: CSVRowType[];
  minimums: number[];
  maximums: number[];
};

const cacheInitialValue: AggregationsCacheType = {
  aggregations: {
    count: 0,
    sum: 0,
    sumOfSquares: 0,
    average: 0,
    variance: 0,
  },
  data: [],
  minimums: [],
  maximums: [],
};

let _cache: AggregationsCacheType | null = null;

async function* nextAggregationsGenV2(
  startingIndex: number,
  dataPoints: number,
  dataPointsShift: number,
) {
  let additionalDataStart = startingIndex + dataPoints;

  while (_cache) {
    const addedData = await collectDataFromIdb(
      additionalDataStart,
      dataPointsShift,
    );

    const removedData = _cache.data.splice(0, addedData.length);

    if (addedData.length === 0) {
      return;
    }

    for (let i = 0; i < addedData.length; i++) {
      _cache.data.push(addedData[i]);
    }

    _cache.aggregations = updateAggregations(
      _cache.aggregations,
      addedData,
      removedData,
    );
    const { min, max, minimums, maximums } = minimumsAndMaximums(
      {
        minimums: _cache.minimums,
        maximums: _cache.maximums,
        prevMin: _cache.aggregations.min ?? Infinity,
        prevMax: _cache.aggregations.max ?? -Infinity,
      },
      addedData,
    );
    _cache.aggregations.min = min;
    _cache.aggregations.max = max;
    _cache.minimums = minimums;
    _cache.maximums = maximums;

    additionalDataStart += dataPointsShift;

    yield _cache.aggregations;
  }
}

let nextAggregationsV2: AsyncGenerator;

self.onmessage = async function (
  event: MessageEvent<{
    type: "init" | "cache" | "next" | "reset";
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
        dataPoints,
        startingIndex,
        dataPointsShift,
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
      _cache = cacheInitialValue;
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
    case "reset": {
      _cache = null;
      clearCache();
      self.postMessage({ type: "reset:complete" });
      break;
    }
    default: {
      throw new Error("Unknown message type");
    }
  }
};
