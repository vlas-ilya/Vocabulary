export function makeArray(n): number[] {
  return Array.from(Array(n).keys()).map((ignored, index) => index);
}
