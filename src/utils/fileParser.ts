import Papa, { ParseResult } from "papaparse";
import { CSVRowType } from "./types.ts";
import { set } from "../db/db.ts";
import { workerRegister } from "../workers/workerRegister.ts";

const aggregationsWorker = workerRegister("aggregations");
const chartWorker = workerRegister("chart");

export async function parseFileByRowCount(file: File, rowsPerChunk: number) {
  const rowBuffer: CSVRowType[] = []; // Buffer to hold rows until chunk size is met
  let chunkStart = 0;
  let chunkEnd: number;

  return new Promise((resolve) => {
    Papa.parse(file, {
      worker: true,
      fastMode: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      chunkSize: 10000,
      chunk: async function (results: ParseResult<CSVRowType>) {
        // Add rows to the buffer
        rowBuffer.push(...results.data);

        // TODO: Fix the bug on files with less than 10k rows

        // Process the buffer when it reaches the desired row count
        while (rowBuffer.length >= rowsPerChunk) {
          const chunk = rowBuffer.splice(0, rowsPerChunk); // Remove rows for this chunk

          chunkEnd = chunkStart + rowsPerChunk - 1;

          await set(`${chunkStart}_${chunkEnd}`, chunk);
          chunkStart = chunkEnd + 1;
        }
      },
      complete: async function () {
        if (rowBuffer.length) {
          chunkEnd = chunkStart + rowsPerChunk - 1;
          await set(`${chunkStart}_${chunkEnd}`, rowBuffer);
        }

        aggregationsWorker?.postMessage({ type: "reset" });
        chartWorker?.postMessage({ type: "reset" });

        console.log("Parsing complete.");
        resolve(true);
      },
      error: function (err) {
        console.error("Error parsing file:", err);
      },
    });
  });
}
