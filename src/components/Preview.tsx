import { useEffect, useRef } from "react";
import { Aggregations } from "./Aggregations.tsx";
import { LineChart } from "./LineChart.tsx";
import { useDataContext } from "../contexts/DataContext.tsx";

const aggregationWorker = new Worker(
  new URL("../workers/aggregationWorker.ts", import.meta.url),
  {
    type: "module",
  },
);

const lttbWorker = new Worker(
  new URL("../workers/lttbWorker.ts", import.meta.url),
  {
    type: "module",
  },
);

export const Preview = () => {
  const {
    data,
    dataPoints,
    startingIndex,
    move,
    timeInterval,
    dataPointsShift,
  } = useDataContext();

  const intervalRef = useRef<number>();
  const aggregationWorkerRef = useRef<Worker>();
  const lttbWorkerRef = useRef<Worker>();

  useEffect(() => {
    aggregationWorkerRef.current = aggregationWorker;
    lttbWorkerRef.current = lttbWorker;
  }, []);

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = undefined;
    }

    const result = data.slice(startingIndex, startingIndex + dataPoints);
    aggregationWorkerRef.current?.postMessage(result);
    lttbWorkerRef.current?.postMessage(result);
  }, [data, startingIndex, dataPoints, dataPointsShift, timeInterval]);

  useEffect(() => {
    if (move) {
      let increment = startingIndex;
      intervalRef.current = window.setInterval(() => {
        increment += dataPointsShift;
        const result = data.slice(increment, increment + dataPoints);
        aggregationWorkerRef.current?.postMessage(result);
        lttbWorkerRef.current?.postMessage(result);
      }, timeInterval);
    } else {
      window.clearInterval(intervalRef.current);
      intervalRef.current = undefined;
    }
  }, [move, data, dataPoints, timeInterval, startingIndex, dataPointsShift]);

  return (
    <div className="chart-wrapper">
      <LineChart worker={lttbWorkerRef.current} />
      <Aggregations worker={aggregationWorkerRef.current} />
    </div>
  );
};
