export type CSVRowType = [number, number];
export type LTTBReturnType = {
  sampledData: CSVRowType[];
  marginOfError: { x: number; min: number; max: number }[];
};
export type AggregationsType = {
  min: number;
  max: number;
  average: number;
  variance: number;
};
