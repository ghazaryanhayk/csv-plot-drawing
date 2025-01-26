import { useDataContext } from "../contexts/DataContext.tsx";
import { Input } from "./Input.tsx";
import { useEffect } from "react";
import { workerRegister } from "../workers/workerRegister.ts";

const chartWorker = workerRegister("chart");
const aggregationsWorker = workerRegister("aggregations");

export const Tools = () => {
  const {
    dataPoints,
    setDataPoints,
    startingIndex,
    setStartingIndex,
    timeInterval,
    setTimeInterval,
    dataPointsShift,
    setDataPointsShift,
    move,
    setMove,
    loading,
  } = useDataContext();

  useEffect(() => {
    aggregationsWorker?.postMessage({
      type: "init",
      startingIndex,
      dataPoints,
      dataPointsShift,
    });
    chartWorker?.postMessage({
      type: "init",
      startingIndex,
      dataPoints,
      dataPointsShift,
    });
  }, [dataPoints, dataPointsShift, startingIndex]);

  return (
    <fieldset>
      <legend>Chart Settings</legend>
      <div style={{ display: "flex", flexDirection: "row", gap: 8 }}>
        <div style={{ flex: "1 0 auto" }}>
          <Input
            value={dataPoints}
            onValueChange={setDataPoints}
            label="Number of data points (N)"
            placeholder="100"
            disabled={loading}
          />
          <Input
            value={startingIndex}
            onValueChange={setStartingIndex}
            label="Starting Index (S)"
            placeholder="0"
            disabled={loading}
          />
        </div>

        <div style={{ flex: "1 0 auto" }}>
          <Input
            value={timeInterval}
            onValueChange={setTimeInterval}
            label="Time interval in milliseconds (T)"
            placeholder="500"
            min={16}
            disabled={loading}
          />

          <Input
            value={dataPointsShift}
            onValueChange={setDataPointsShift}
            label="Number of data points to shift (P)"
            placeholder="10"
            disabled={loading}
          />

          <button onClick={() => setMove(!move)} disabled={loading}>
            {!move ? "Start" : "Stop"}
          </button>
        </div>
      </div>
    </fieldset>
  );
};
