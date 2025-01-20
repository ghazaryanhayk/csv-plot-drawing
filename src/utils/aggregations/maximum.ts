export function maximum(values: number[]): number {
  return values.reduce((a, b) => Math.max(a, b), -Infinity);
}
