import { Utils } from "../utils/Utils";

export class Shuffle {
  public shuffle<T extends { [k: string]: any }>(
    initObj: T,
    shuffled: T[keyof T][] = [],
    keys = Utils.objKeys(initObj)
  ): typeof shuffled {
    if (!keys.length) {
      return shuffled;
    }

    const randomNum = Utils.randomNumber(keys.length);
    const randomKey = keys[randomNum];

    shuffled.push(initObj[randomKey]);

    const { [randomKey]: _, ...rest } = initObj;

    return this.shuffle(rest as T, shuffled);
  }
}
