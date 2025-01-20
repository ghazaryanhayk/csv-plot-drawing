import { useEffect, useRef } from "react";

export const useWorkers = () => {
  const aggregationWorkerRef = useRef<Worker>();
  const lttbWorkerRef = useRef<Worker>();

  useEffect(() => {
    const aggregationWorker = new Worker(
      new URL("../workers/aggregationWorker.ts", import.meta.url),
      { type: "module" },
    );
    const lttbWorker = new Worker(
      new URL("../workers/lttbWorker.ts", import.meta.url),
      { type: "module" },
    );

    aggregationWorkerRef.current = aggregationWorker;
    lttbWorkerRef.current = lttbWorker;

    return () => {
      aggregationWorker.terminate();
      lttbWorker.terminate();
    };
  }, []);

  return { aggregationWorkerRef, lttbWorkerRef };
};
