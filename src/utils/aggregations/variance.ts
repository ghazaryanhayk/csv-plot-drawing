export function variance(values: number[], average: number): number {
  return (
    values.reduce((sum, value) => sum + Math.pow(value - average, 2), 0) /
    values.length
  );
}
