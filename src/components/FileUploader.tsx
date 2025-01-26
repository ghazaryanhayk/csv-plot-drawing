import { ChangeEvent } from "react";
import { useDataContext } from "../contexts/DataContext.tsx";
import { parseFileByRowCount } from "../utils/fileParser.ts";
import { clear } from "../db/db.ts";
import { DB_BATCH_SIZE } from "../utils/constants.ts";

export const FileUploader = () => {
  const { move, loading, setLoading } = useDataContext();

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    setLoading(true);
    await clear();
    await parseFileByRowCount(file, DB_BATCH_SIZE);
    setLoading(false);
  };

  return (
    <fieldset>
      <legend>Upload CSV file</legend>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          disabled={move}
        />
        {loading && "Loading..."}
      </div>
    </fieldset>
  );
};
