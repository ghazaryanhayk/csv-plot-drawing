import { useDataContext } from "../contexts/DataContext.tsx";
import { Input } from "./Input.tsx";
import { useCallback, useEffect } from "react";
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

  const initWorkers = useCallback(() => {
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

  const handleStartClick = () => {
    if (move) {
      setMove(false);
    } else {
      initWorkers();
      setMove(true);
    }
  };

  useEffect(() => {
    initWorkers();
  }, [dataPoints, dataPointsShift, initWorkers, startingIndex]);

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

          <button onClick={handleStartClick} disabled={loading}>
            {!move ? "Start" : "Stop"}
          </button>

          <button onClick={initWorkers} disabled={loading}>
            Reset
          </button>
        </div>
      </div>
    </fieldset>
  );
};
