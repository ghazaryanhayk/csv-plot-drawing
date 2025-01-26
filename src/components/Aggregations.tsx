import { AggregationCacheType } from "../workers/aggregationWorkerV2.ts";
import { useEffect, useState } from "react";
import throttle from "lodash.throttle";
import { useDataContext } from "../contexts/DataContext.tsx";

type AggregationsProps = {
  worker?: Worker;
};

export const Aggregations = ({ worker }: AggregationsProps) => {
  const [aggregations, setAggregations] = useState<AggregationCacheType>();
  const { setMove, startingIndex, dataPoints, dataPointsShift } =
    useDataContext();

  useEffect(() => {
    if (!worker) {
      return;
    }
    worker.onmessage = throttle((event) => {
      if (event.data.type === "cache:complete") {
        worker.postMessage({
          type: "init",
          startingIndex,
          dataPoints,
          dataPointsShift,
        });

        return;
      }

      if (event.data.data === null) {
        setMove(false);
      } else {
        setAggregations(event.data.data);
      }
    }, 50);
  }, [dataPoints, dataPointsShift, setMove, startingIndex, worker]);

  return (
    <>
      <div>
        <h4>Aggregations</h4>
        <div>Minimum: {aggregations?.min ?? "N/A"}</div>
        <div>Maximum: {aggregations?.max ?? "N/A"}</div>
        <div>Average: {aggregations?.average ?? "N/A"}</div>
        <div>Variance: {aggregations?.variance ?? "N/A"}</div>
      </div>
    </>
  );
};
