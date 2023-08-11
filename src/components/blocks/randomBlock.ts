import * as allBlocks from ".";
import { ObjectHelpers } from "../../utils/objToArr";
import Block from "./block";

export class RandomBlock {
  public static allBlocks: typeof allBlocks;

  constructor() {
    RandomBlock.allBlocks = allBlocks;
  }

  private randomNumber(max: number, min = 0) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  public pickRandomBlock(): Block {
    let keys = ObjectHelpers.objKeys(RandomBlock.allBlocks);

    if (!keys.length) {
      RandomBlock.allBlocks = allBlocks;
      keys = ObjectHelpers.objKeys(RandomBlock.allBlocks);
    }

    const randomNum = this.randomNumber(keys.length);
    const randomKey = keys[randomNum];

    const newAllBlocks = {} as typeof allBlocks;

    for (const key of keys) {
      if (key === randomKey) continue;
      newAllBlocks[key] = allBlocks[key];
    }

    RandomBlock.allBlocks = newAllBlocks;

    return new allBlocks[randomKey]();
  }
}
