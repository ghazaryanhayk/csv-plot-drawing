import Papa from "papaparse";
import { ChangeEvent, useState } from "react";
import { CSVRowType } from "../utils/types.ts";

type FileUploaderProps = {
  onFileUpload(data: CSVRowType[]): void;
  disabled?: boolean;
};

export const FileUploader = ({
  onFileUpload,
  disabled = false,
}: FileUploaderProps) => {
  const [loading, setLoading] = useState(false);
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    setLoading(true);

    Papa.parse<CSVRowType>(file, {
      worker: true,
      fastMode: true,
      dynamicTyping: true,
      complete: (results) => {
        onFileUpload(results.data);
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
        disabled={disabled}
      />
      {loading && "Loading..."}
    </fieldset>
  );
};
