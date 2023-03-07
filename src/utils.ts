export const mergeKeys = (a: any, b: any): string[] => {
  return [...a, ...b.filter((i: any) => !a.includes(i) && !i.startsWith('_'))]
}
export const isNull = (a: any): any => {
  return typeof a === 'object' && !a
}

declare global {
  interface Number {
    countDecimals: () => number
  }
}
// eslint-disable-next-line no-extend-native
Number.prototype.countDecimals = function () {
  if (Math.floor(this.valueOf()) === this.valueOf()) return 0
  return this.toString().split('.')[1].length ?? 0
}

export function formatObject<T> (obj: T, keysToRemove: string[]): Partial<T> {
  const formatted = { ...obj }
  keysToRemove.forEach((key: string) => {
    delete formatted[key as keyof T]
  })
  return formatted
}
