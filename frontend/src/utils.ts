export const mergeKeys = (a: string[], b: string[]): string[] => {
  return [
    ...a,
    ...b.filter((i: string) => !a.includes(i) && !i.startsWith('_'))
  ]
}
export const isNull = (a: unknown): boolean => {
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
