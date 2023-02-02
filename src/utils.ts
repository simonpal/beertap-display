export const mergeKeys = (a: any, b: any): string[] => {
  return [...a, ...b.filter((i: any) => !a.includes(i) && !i.startsWith("_"))];
};
export const isNull = (a: any) => {
  return typeof a === "object" && !a;
};

declare global {
  interface Number {
    countDecimals: () => number;
  }
}
Number.prototype.countDecimals = function () {
  if (Math.floor(this.valueOf()) === this.valueOf()) return 0;
  return this.toString().split(".")[1].length || 0;
};
