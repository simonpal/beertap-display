export const mergeKeys = (a: any, b: any): string[] => {
  return [...a, ...b.filter((i: any) => !a.includes(i) && !i.startsWith("_"))];
};
export const isNull = (a: any) => {
  return typeof a === "object" && !a;
};
