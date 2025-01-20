import Papa, { ParseResult } from "papaparse";
import { ChangeEvent, useState } from "react";
import { useDataContext } from "../contexts/DataContext.tsx";
import { CSVRowType } from "../utils/types.ts";

export const FileUploader = () => {
  const { setData, move } = useDataContext();
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    setLoading(true);

    Papa.parse(file, {
      worker: true,
      fastMode: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: (results: ParseResult<CSVRowType>) => {
        const isValid = results.data.every((row) => {
          return typeof row[0] === "number" && typeof row[1] === "number";
        });
        if (isValid) {
          setData(results.data);
        } else {
          console.error("Invalid CSV data");
        }

        setLoading(false);
      },
    });
  };

  return (
    <fieldset>
      <legend>Upload CSV file</legend>
      <input
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        disabled={move}
      />
      {loading && "Loading..."}
    </fieldset>
  );
};
