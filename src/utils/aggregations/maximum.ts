export function maximum(values: number[]): number {
  let max = -Infinity;

  for (let i = 0; i < values.length; i++) {
    if (values[i] > max) {
      max = values[i];
    }
  }
  return max;
}
