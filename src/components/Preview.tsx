import { useEffect, useRef } from "react";
import { Aggregations } from "./Aggregations.tsx";
import { LineChart } from "./LineChart.tsx";
import { useDataContext } from "../contexts/DataContext.tsx";
import { useWorkers } from "../hooks/useWorkers.ts";

export const Preview = () => {
  const {
    data,
    dataPoints,
    startingIndex,
    move,
    setMove,
    timeInterval,
    dataPointsShift,
  } = useDataContext();

  const { lttbWorkerRef, aggregationWorkerRef } = useWorkers();
  const intervalRef = useRef<number>();

  const processData = (startIndex: number) => {
    const result = data.slice(startIndex, startIndex + dataPoints);
    aggregationWorkerRef.current?.postMessage(result);
    lttbWorkerRef.current?.postMessage(result);
  };

  useEffect(() => {
    processData(startingIndex);
  }, [data, startingIndex, dataPoints, dataPointsShift, timeInterval]);

  useEffect(() => {
    if (move) {
      let increment = startingIndex;
      intervalRef.current = window.setInterval(() => {
        increment += dataPointsShift;

        if (increment + dataPoints > data.length) {
          window.clearInterval(intervalRef.current);
          setMove(false);
          intervalRef.current = undefined;
          return;
        }

        processData(increment);
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
