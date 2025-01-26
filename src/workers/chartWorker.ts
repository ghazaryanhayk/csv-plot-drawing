import { largestTriangleThreeBuckets } from "../utils/downsample/lttb.ts";
import { LTTBReturnType } from "../utils/types.ts";
import { collectDataFromIdb } from "../utils/helpers/collectDataFromIdb.ts";
import { cacheData, clearCache } from "../db/db.ts";

export {};

const cache = new Map<string, LTTBReturnType>();
let current: LTTBReturnType | undefined;

async function* nextChartGen(
  startingIndex: number,
  dataPoints: number,
  dataPointsShift: number,
) {
  let additionalDataStart = startingIndex + dataPoints;

  while (true) {
    const trimmedData = await collectDataFromIdb(
      additionalDataStart,
      dataPointsShift,
    );

    const threshold = Math.floor((dataPointsShift / dataPoints) * 100);

    const additionalChartData = largestTriangleThreeBuckets(
      trimmedData,
      threshold,
    );
    const next = {
      sampledData:
        current?.sampledData.slice(additionalChartData.sampledData.length) ??
        [],
      marginOfError:
        current?.marginOfError.slice(
          additionalChartData.marginOfError.length,
        ) ?? [],
    };

    next.sampledData.push(...additionalChartData.sampledData);
    next.marginOfError.push(...additionalChartData.marginOfError);

    additionalDataStart += dataPointsShift;
    current = next;
    yield next;
  }
}

let nextChart: AsyncGenerator;

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

  const cacheKey = `${startingIndex}_${dataPoints}`;

  switch (type) {
    case "init": {
      if (!cache.has(cacheKey)) {
        const trimmedData = await collectDataFromIdb(startingIndex, dataPoints);
        const chartData = largestTriangleThreeBuckets(trimmedData, 100);
        cache.set(cacheKey, chartData);
      }

      current = cache.get(cacheKey);
      nextChart = nextChartGen(startingIndex, dataPoints, dataPointsShift);

      self.postMessage({ type: "init:complete", data: current });
      break;
    }
    case "cache": {
      await cacheData();
      self.postMessage({ type: "cache:complete" });
      break;
    }
    case "next": {
      const result = await nextChart.next();

      self.postMessage({
        type: "next:complete",
        data: result.done ? null : result.value,
      });
      break;
    }
    case "reset": {
      clearCache();
      cache.clear();
      current = undefined;
      self.postMessage({ type: "reset:complete" });
      break;
    }
    default: {
      throw new Error("Unknown message type");
    }
  }
};
