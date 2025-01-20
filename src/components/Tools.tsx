import { Input } from "./Input.tsx";

type ToolsProps = {
  dataPoints: number; // N
  startIndex: number; // S
  timeInterval: number; // T
  dataPointsShift: number; // P
  move: boolean;
  onDataPointsChange(value: number): void;
  onStartIndexChange(value: number): void;
  onTimeIntervalChange(value: number): void;
  onDataPointsShiftChange(value: number): void;
  onMoveChange(value: boolean): void;
};

export const Tools = ({
  dataPoints,
  onDataPointsChange,
  startIndex,
  onStartIndexChange,
  timeInterval,
  onTimeIntervalChange,
  dataPointsShift,
  onDataPointsShiftChange,
  move,
  onMoveChange,
}: ToolsProps) => {
  return (
    <fieldset>
      <legend>Chart Settings</legend>
      <div style={{ display: "flex", flexDirection: "row", gap: 8 }}>
        <div style={{ flex: "1 0 auto" }}>
          <Input
            value={dataPoints}
            onValueChange={onDataPointsChange}
            label="Number of data points (N)"
            placeholder="100"
          />
          <Input
            value={startIndex}
            onValueChange={onStartIndexChange}
            label="Starting Index (S)"
            placeholder="0"
          />
        </div>

        <div style={{ flex: "1 0 auto" }}>
          <Input
            value={timeInterval}
            onValueChange={onTimeIntervalChange}
            label="Time interval in milliseconds (T)"
            placeholder="500"
            min={16}
          />

          <Input
            value={dataPointsShift}
            onValueChange={onDataPointsShiftChange}
            label="Number of data points to shift (P)"
            placeholder="10"
          />

          <button onClick={() => onMoveChange(!move)}>
            {!move ? "Start" : "Stop"}
          </button>
        </div>
      </div>
    </fieldset>
  );
};
