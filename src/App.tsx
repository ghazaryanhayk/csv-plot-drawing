import { useState } from "react";
import { Tools } from "./components/Tools.tsx";
import { CSVRowType } from "./utils/types.ts";
import { Preview } from "./components/Preview.tsx";
import { FileUploader } from "./components/FileUploader.tsx";

function App() {
  const [data, setData] = useState<CSVRowType[]>([]);
  const [dataPoints, setDataPoints] = useState(500);
  const [startingIndex, setStartingIndex] = useState(0);
  const [timeInterval, setTimeInterval] = useState(500);
  const [dataPointsShift, setDataPointsShift] = useState(10);
  const [move, setMove] = useState(false);

  return (
    <div className="app">
      <FileUploader onFileUpload={setData} disabled={move} />
      <Tools
        dataPoints={dataPoints}
        startIndex={startingIndex}
        timeInterval={timeInterval}
        dataPointsShift={dataPointsShift}
        onDataPointsChange={setDataPoints}
        onStartIndexChange={setStartingIndex}
        onTimeIntervalChange={setTimeInterval}
        onDataPointsShiftChange={setDataPointsShift}
        move={move}
        onMoveChange={setMove}
      />
      <Preview
        data={data}
        dataPoints={dataPoints}
        startingIndex={startingIndex}
        move={move}
        timeInterval={timeInterval}
        dataPointsShift={dataPointsShift}
      />
    </div>
  );
}

export default App;
