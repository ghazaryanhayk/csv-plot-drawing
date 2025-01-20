import { useEffect, useState } from "react";
import throttle from "lodash.throttle";

type AggregationsProps = {
  worker?: Worker;
};

export const Aggregations = ({ worker }: AggregationsProps) => {
  const [aggregations, setAggregations] = useState<any>();

  useEffect(() => {
    if (!worker) {
      return;
    }
    worker.onmessage = throttle((event) => {
      setAggregations(event.data);
    }, 100);

    return () => {
      worker.terminate();
    };
  }, [worker]);

  return (
    <>
      <div>
        <h4>Aggregations</h4>
        <div>Minimum: {aggregations?.min ?? "N/A"}</div>
        <div>Maximum: {aggregations?.max ?? "N/A"}</div>
        <div>Average: {aggregations?.average ?? "N/A"}</div>
        <div>Variance: {aggregations?.variance ?? "N/A"}</div>
      </div>
    </>
  );
};
