import { CSVRowType } from "../types.ts";

export function minimum(values: CSVRowType[]): number {
  let min = Infinity;

  for (let i = 0; i < values.length; i++) {
    if (values[i][1] < min) {
      min = values[i][1];
    }
  }

  return min;
}
