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
import {
  chartOptions,
  initialData,
  updateChartData,
} from "../utils/chartConfig.ts";

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

  useEffect(() => {
    if (!worker) {
      return;
    }
    worker.onmessage = (event) => {
      if (!chartRef.current) {
        return;
      }
      updateChartData(chartRef.current, event.data);
    };

    return () => {
      worker.terminate();
    };
  }, [worker]);

  return <Line ref={chartRef} data={initialData} options={chartOptions} />;
};
