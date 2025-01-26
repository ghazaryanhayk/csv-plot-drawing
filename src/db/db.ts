import { openDB } from "idb";
import { CSVRowType } from "../utils/types.ts";

const dbPromise = openDB("keyval-store", 1, {
  upgrade(db) {
    db.createObjectStore("keyval");
  },
});

const dbCache = new Map<IDBValidKey, CSVRowType[]>();

export async function get(key: IDBValidKey) {
  if (dbCache.has(key) && dbCache.get(key)) {
    return dbCache.get(key);
  }

  const val = await (await dbPromise).get("keyval", key);
  dbCache.set(key, val);
  return val;
}
export async function set(key: string, val: CSVRowType[]) {
  return (await dbPromise).put("keyval", val, key);
}
export async function del(key: string) {
  return (await dbPromise).delete("keyval", key);
}
export async function clear() {
  dbCache.clear();
  return (await dbPromise).clear("keyval");
}
export async function keys() {
  return (await dbPromise).getAllKeys("keyval");
}

export async function cacheData() {
  const allKeys = await keys();
  for (const key of allKeys) {
    get(key);
  }
}
