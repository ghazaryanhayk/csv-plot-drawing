import { CSVRowType } from "../utils/types.ts";
import { useEffect, useRef } from "react";
import { Aggregations } from "./Aggregations.tsx";
import { LineChart } from "./LineChart.tsx";
import { useWorker } from "../hooks/useWorker.ts";

type PreviewProps = {
  data: CSVRowType[];
  startingIndex: number;
  dataPoints: number;
  timeInterval: number;
  dataPointsShift: number;
  move: boolean;
};

export const Preview = ({
  data,
  dataPoints,
  startingIndex,
  move,
  timeInterval,
  dataPointsShift,
}: PreviewProps) => {
  const intervalRef = useRef<number>();
  const aggregationWorkerRef = useWorker("../workers/aggregationWorker.ts"); // useRef<Worker>();
  const lttbWorkerRef = useWorker("../workers/lttbWorker.ts");

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = undefined;
    }

    const result = data.slice(startingIndex, startingIndex + dataPoints);
    aggregationWorkerRef?.postMessage(result);
    lttbWorkerRef?.postMessage(result);
  }, [
    data,
    startingIndex,
    dataPoints,
    dataPointsShift,
    timeInterval,
    lttbWorkerRef,
    aggregationWorkerRef,
  ]);

  useEffect(() => {
    if (move) {
      let increment = startingIndex;
      intervalRef.current = window.setInterval(() => {
        increment += dataPointsShift;
        const result = data.slice(increment, increment + dataPoints);
        aggregationWorkerRef?.postMessage(result);
        lttbWorkerRef?.postMessage(result);
      }, timeInterval);
    } else {
      window.clearInterval(intervalRef.current);
      intervalRef.current = undefined;
    }
  }, [
    move,
    data,
    dataPoints,
    timeInterval,
    startingIndex,
    dataPointsShift,
    lttbWorkerRef,
    aggregationWorkerRef,
  ]);

  return (
    <div className="chart-wrapper">
      <LineChart worker={lttbWorkerRef} />
      <Aggregations worker={aggregationWorkerRef} />
    </div>
  );
};
