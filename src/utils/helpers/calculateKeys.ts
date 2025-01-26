import { DB_BATCH_SIZE } from "../constants.ts";

export function calculateKeys(startingIndex: number, count: number): string[] {
  const batchSize = DB_BATCH_SIZE; // Size of each batch
  const keys = [];

  // Calculate the first and last batch indices
  const startBatch = Math.floor(startingIndex / batchSize) * batchSize;
  const endBatch =
    Math.floor((startingIndex + count - 1) / batchSize) * batchSize;

  // Generate all batch keys
  for (
    let batchStart = startBatch;
    batchStart <= endBatch;
    batchStart += batchSize
  ) {
    const batchEnd = batchStart + batchSize - 1;
    keys.push(`${batchStart}_${batchEnd}`);
  }

  return keys;
}
