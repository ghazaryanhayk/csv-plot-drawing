import { CSVRowType } from "../utils/types.ts";
import { useEffect, useRef } from "react";
import { Aggregations } from "./Aggregations.tsx";
import { LineChart } from "./LineChart.tsx";

type PreviewProps = {
  data: CSVRowType[];
  startingIndex: number;
  dataPoints: number;
  timeInterval: number;
  dataPointsShift: number;
  move: boolean;
};

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

export const Preview = ({
  data,
  dataPoints,
  startingIndex,
  move,
  timeInterval,
  dataPointsShift,
}: PreviewProps) => {
  const intervalRef = useRef<any>();
  const aggregationWorkerRef = useRef<Worker>();
  const lttbWorkerRef = useRef<Worker>();

  useEffect(() => {
    aggregationWorkerRef.current = aggregationWorker;
    lttbWorkerRef.current = lttbWorker;
  }, []);

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    const result = data.slice(startingIndex, startingIndex + dataPoints);
    aggregationWorkerRef.current?.postMessage(result);
    lttbWorkerRef.current?.postMessage(result);
  }, [
    data,
    startingIndex,
    dataPoints,
    dataPointsShift,
    timeInterval,
    lttbWorkerRef.current,
    aggregationWorkerRef.current,
  ]);

  useEffect(() => {
    if (move) {
      let increment = startingIndex;
      intervalRef.current = setInterval(() => {
        increment += dataPointsShift;
        const result = data.slice(increment, increment + dataPoints);
        aggregationWorkerRef.current?.postMessage(result);
        lttbWorkerRef.current?.postMessage(result);
      }, timeInterval);
    } else {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, [
    move,
    data,
    dataPoints,
    timeInterval,
    startingIndex,
    dataPointsShift,
    lttbWorkerRef.current,
    aggregationWorkerRef.current,
  ]);

  return (
    <div className="chart-wrapper">
      <LineChart worker={lttbWorkerRef.current} />
      <Aggregations worker={aggregationWorkerRef.current} />
    </div>
  );
};
