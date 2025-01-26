import { CSVRowType } from "../types.ts";
import { get } from "../../db/db.ts";

export async function getData(keys: IDBValidKey[]): Promise<CSVRowType[]> {
  // TODO: Make sure to have correct key ordering
  const result: CSVRowType[] = [];
  for (let i = 0; i < keys.length; i++) {
    const list = await get(keys[i]);

    if (!list) {
      break;
    }

    result.push(...list);
  }
  return result;
}
