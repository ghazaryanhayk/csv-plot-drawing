import { useEffect, useRef } from "react";
import { LineChart } from "./LineChart.tsx";
import { Aggregations } from "./Aggregations.tsx";
import { workerRegister } from "../workers/workerRegister.ts";
import { useDataContext } from "../contexts/DataContext.tsx";

export const Preview = () => {
  const chartWorker = workerRegister("chart");
  const aggregationsWorker = workerRegister("aggregations");
  const intervalRef = useRef<number>();

  const { timeInterval, move } = useDataContext();

  const cleanupInterval = () => {
    window.clearInterval(intervalRef.current);
    intervalRef.current = undefined;
  };

  useEffect(() => {
    if (move) {
      intervalRef.current = window.setInterval(() => {
        // Get the next data points
        aggregationsWorker?.postMessage({
          type: "next",
        });
        chartWorker?.postMessage({
          type: "next",
        });
      }, timeInterval);
    } else {
      cleanupInterval();
    }
  }, [aggregationsWorker, chartWorker, move, timeInterval]);

  return (
    <fieldset>
      <legend>Preview</legend>
      <LineChart worker={chartWorker} />
      <Aggregations worker={aggregationsWorker} />
    </fieldset>
  );
};
