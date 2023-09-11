export class Utils {
  public static objEntries<T extends {}>(obj: T) {
    return Object.entries(obj) as [keyof T, T[keyof T]][];
  }

  public static objKeys<T extends {}>(obj: T) {
    return Object.keys(obj) as (keyof T)[];
  }

  public static randomNumber(max: number, min = 0) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  public static trueMod(x: number, m: number) {
    return ((x % m) + m) % m;
  }
}
