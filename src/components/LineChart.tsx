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
import { ChartProps, Line } from "react-chartjs-2";
import { LTTBReturnType } from "../utils/types.ts";

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

const initialData = {
  labels: [],
  gridLines: false,
  datasets: [
    {
      type: "line" as const,
      label: "CSV Data (Downsampled)",
      data: [],
      borderColor: "rgba(75,192,192,1)",
      borderWidth: 1,
      pointRadius: 1,
      backgroundColor: "rgba(75,192,192, 0.4)",
      tension: 0.4,
      fill: {},
    },
    {
      label: "Margin of Error (Upper Bound)",
      data: [],
      borderWidth: 1,
      pointRadius: 1,
      borderColor: "rgba(75,192,192, 0.2)",
      backgroundColor: "rgba(75,192,192, 0.2)",
      fill: "+1",
      tension: 0.4,
    },
    {
      label: "Margin of Error (Lower Bound)",
      data: [],
      borderWidth: 1,
      pointRadius: 1,
      borderColor: "rgba(75,192,192, 0.2)",
      backgroundColor: "transparent",
      tension: 0.4,
    },
  ],
};

const chartOptions: ChartProps<"line">["options"] = {
  animation: false,
  responsive: true,
  scales: {
    x: { grid: { display: false } },
    y: { grid: { display: false } },
  },
};

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
      chartRef.current && updateChartData(chartRef.current, event.data);
    };

    return () => {
      worker.terminate();
    };
  }, [worker]);

  return (
    <>
      <Line ref={chartRef} data={initialData} options={chartOptions} />
    </>
  );
};

const updateChartData = (chart: Chart<"line">, chartData: LTTBReturnType) => {
  if (!chart) {
    return;
  }

  chart.data.labels = chartData.sampledData.map(([x]) => x);
  chart.data.datasets[0].data = chartData.sampledData.map(([, y]) => y);
  chart.data.datasets[1].data = chartData.marginOfError.map(({ max }) => max);
  chart.data.datasets[2].data = chartData.marginOfError.map(({ min }) => min);

  chart.update();
};
