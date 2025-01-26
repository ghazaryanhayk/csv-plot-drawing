import { calculateKeys } from "./calculateKeys.ts";
import { getData } from "./getData.ts";
import { trimData } from "./trimData.ts";

export async function collectDataFromIdb(
  startingIndex: number,
  dataPoints: number,
) {
  const keys = calculateKeys(startingIndex, dataPoints);
  const data = await getData(keys);
  return trimData(data, startingIndex, dataPoints);
}
