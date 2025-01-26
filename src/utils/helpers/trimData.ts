import { CSVRowType } from "../types.ts";
import { DB_BATCH_SIZE } from "../constants.ts";

export function trimData(
  data: CSVRowType[],
  startingIndex: number,
  count: number,
): CSVRowType[] {
  const start = startingIndex % DB_BATCH_SIZE; // Calculate offset within the first batch
  const end = start + count; // Calculate the end index within the data

  return data.slice(start, end);
}
