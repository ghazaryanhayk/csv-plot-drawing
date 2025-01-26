import { useEffect, useRef } from "react";
import { workerRegister } from "../workers/workerRegister.ts";
import { useDataContext } from "../contexts/DataContext.tsx";
import {
  chartOptions,
  initialData,
  updateChartData,
} from "../utils/chartConfig.ts";
import { Chart } from "chart.js";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import { Aggregations } from "./Aggregations.tsx";
import throttle from "lodash.throttle";

export const PreviewV2 = () => {
  const chartWorker = workerRegister("chart");
  const aggregationsWorker = workerRegister("aggregations");
  const chartRef = useRef<Chart<"line">>();
  const intervalRef = useRef<number>();

  const {
    startingIndex,
    dataPoints,
    dataPointsShift,
    timeInterval,
    move,
    setMove,
  } = useDataContext();

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

  // Set up the message handler for chartWorker and aggregationsWorker
  useEffect(() => {
    if (!chartWorker || !aggregationsWorker) {
      return;
    }

    chartWorker.onmessage = throttle((event: MessageEvent) => {
      if (!chartRef.current) {
        return;
      }

      if (event.data?.type === "cache:complete") {
        chartWorker?.postMessage({
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
        updateChartData(chartRef.current, event.data.data);
      }
    }, 50);
  }, [
    chartWorker,
    aggregationsWorker,
    setMove,
    startingIndex,
    dataPoints,
    dataPointsShift,
  ]);

  return (
    <fieldset>
      <legend>Test component</legend>
      <Line ref={chartRef} data={initialData} options={chartOptions} />
      <Aggregations worker={aggregationsWorker} />
    </fieldset>
  );
};
