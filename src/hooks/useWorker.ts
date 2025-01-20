import { useEffect, useRef } from "react";

export const useWorker = (workerPath: string) => {
  const workerRef = useRef<Worker>();

  useEffect(() => {
    workerRef.current = new Worker(new URL(workerPath, import.meta.url), {
      type: "module",
    });

    return () => {
      workerRef.current?.terminate();
    };
  }, [workerPath]);

  return workerRef.current!;
};
