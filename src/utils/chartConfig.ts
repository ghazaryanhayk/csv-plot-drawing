import { Chart as ChartJS } from "chart.js";
import { LTTBReturnType } from "./types.ts";
import { ChartProps } from "react-chartjs-2";

export const initialData = {
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

export const chartOptions: ChartProps<"line">["options"] = {
  animation: false,
  responsive: true,
  scales: {
    x: { grid: { display: false } },
    y: { grid: { display: false } },
  },
};

export const updateChartData = (
  chart: ChartJS<"line">,
  chartData: LTTBReturnType,
) => {
  if (!chart) {
    return;
  }

  chart.data.labels = chartData.sampledData.map(([x]) => x);
  chart.data.datasets[0].data = chartData.sampledData.map(([, y]) => y);
  chart.data.datasets[1].data = chartData.marginOfError.map(({ max }) => max);
  chart.data.datasets[2].data = chartData.marginOfError.map(({ min }) => min);

  chart.update();
};
