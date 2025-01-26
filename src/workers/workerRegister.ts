import TestWorker from "./chartWorker.ts?worker";
import AggregationsWorker from "./aggregationWorker.ts?worker";

type WorkerTypes = "test" | "chart" | "aggregations";

const workers = new Map<WorkerTypes, Worker>();

export function workerRegister(key: WorkerTypes) {
  if (!workers.has(key)) {
    switch (key) {
      case "chart": {
        workers.set(key, new TestWorker());
        break;
      }
      case "aggregations": {
        workers.set(key, new AggregationsWorker());
        break;
      }
    }
  }

  return workers.get(key);
}
