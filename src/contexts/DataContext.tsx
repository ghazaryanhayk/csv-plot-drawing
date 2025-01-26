import { createContext, useContext, useState, ReactNode } from "react";
import { CSVRowType } from "../utils/types.ts";

type DataContextType = {
  data: CSVRowType[];
  setData: (data: CSVRowType[]) => void;
  dataPoints: number;
  setDataPoints: (dataPoints: number) => void;
  startingIndex: number;
  setStartingIndex: (startingIndex: number) => void;
  timeInterval: number;
  setTimeInterval: (timeInterval: number) => void;
  dataPointsShift: number;
  setDataPointsShift: (dataPointsShift: number) => void;
  move: boolean;
  setMove: (move: boolean) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
};

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<CSVRowType[]>([]);
  const [dataPoints, setDataPoints] = useState(500);
  const [startingIndex, setStartingIndex] = useState(0);
  const [timeInterval, setTimeInterval] = useState(500);
  const [dataPointsShift, setDataPointsShift] = useState(10);
  const [move, setMove] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <DataContext.Provider
      value={{
        data,
        setData,
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
        setLoading,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useDataContext must be used within a DataProvider");
  }
  return context;
};
