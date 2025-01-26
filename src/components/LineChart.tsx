import { useEffect, useRef } from "react";
import {
  CategoryScale,
  Chart as ChartJS,
  Chart,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import {
  chartOptions,
  initialData,
  updateChartData,
} from "../utils/chartConfig.ts";
import throttle from "lodash.throttle";
import { useDataContext } from "../contexts/DataContext.tsx";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

type LineChartProps = {
  worker?: Worker;
};

export const LineChart = ({ worker }: LineChartProps) => {
  const chartRef = useRef<Chart<"line">>();

  const { startingIndex, dataPoints, dataPointsShift, setMove } =
    useDataContext();

  useEffect(() => {
    if (!worker) {
      return;
    }

    worker.onmessage = throttle((event: MessageEvent) => {
      if (!chartRef.current) {
        return;
      }

      if (event.data.type === "reset:complete") {
        worker.postMessage({ type: "cache" });
        return;
      }

      if (event.data?.type === "cache:complete") {
        worker?.postMessage({
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
  }, [worker, setMove, startingIndex, dataPoints, dataPointsShift]);

  return <Line ref={chartRef} data={initialData} options={chartOptions} />;
};
