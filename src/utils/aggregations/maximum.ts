import { CSVRowType } from "../types.ts";

export function maximum(values: CSVRowType[]): number {
  let max = -Infinity;

  for (let i = 0; i < values.length; i++) {
    if (values[i][1] > max) {
      max = values[i][1];
    }
  }
  return max;
}
