export class ObjectHelpers {
  public static objEntries<T extends {}>(obj: T) {
    return Object.entries(obj) as [keyof T, T[keyof T]][];
  }

  public static objKeys<T extends {}>(obj: T) {
    return Object.keys(obj) as (keyof T)[];
  }
}
