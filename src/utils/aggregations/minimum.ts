export function minimum(values: number[]): number {
  let min = Infinity;

  for (let i = 0; i < values.length; i++) {
    if (values[i] < min) {
      min = values[i];
    }
  }

  return min;
}
