export type CSVRowType = [number, number];
export type LTTBReturnType = {
  sampledData: CSVRowType[];
  marginOfError: { x: number; min: number; max: number }[];
};
