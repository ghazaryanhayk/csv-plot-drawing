import { useDataContext } from "../contexts/DataContext.tsx";
import { Input } from "./Input.tsx";

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
  } = useDataContext();

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
          />
          <Input
            value={startingIndex}
            onValueChange={setStartingIndex}
            label="Starting Index (S)"
            placeholder="0"
          />
        </div>

        <div style={{ flex: "1 0 auto" }}>
          <Input
            value={timeInterval}
            onValueChange={setTimeInterval}
            label="Time interval in milliseconds (T)"
            placeholder="500"
            min={16}
          />

          <Input
            value={dataPointsShift}
            onValueChange={setDataPointsShift}
            label="Number of data points to shift (P)"
            placeholder="10"
          />

          <button onClick={() => setMove(!move)}>
            {!move ? "Start" : "Stop"}
          </button>
        </div>
      </div>
    </fieldset>
  );
};
