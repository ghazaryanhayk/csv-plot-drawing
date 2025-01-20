export function minimum(values: number[]): number {
  return values.reduce((a, b) => Math.min(a, b), Infinity);
}
