import * as allBlocks from ".";
import { ObjectHelpers } from "../../utils/objToArr";

export class RandomBlock {
  private static instance: RandomBlock;
  public static allBlocks: typeof allBlocks;
  public static shuffledBlocks: (typeof allBlocks)[keyof typeof allBlocks][] =
    [];
  public static index = 0;

  constructor() {
    if (RandomBlock.instance) {
      throw new Error("Only one instance of RandomBlock allowed.");
    }

    RandomBlock.instance = this;
    RandomBlock.allBlocks = allBlocks;
    this.shuffle();
  }

  private randomNumber(max: number, min = 0) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  private shuffle() {
    const keys = ObjectHelpers.objKeys(RandomBlock.allBlocks);

    if (!keys.length) {
      RandomBlock.allBlocks = allBlocks;
      return;
    }

    const randomNum = this.randomNumber(keys.length);
    const randomKey = keys[randomNum];

    RandomBlock.shuffledBlocks.push(allBlocks[randomKey]);

    const { [randomKey]: _, ...rest } = RandomBlock.allBlocks;

    RandomBlock.allBlocks = rest as typeof allBlocks;

    this.shuffle();
  }

  public randomBlock() {
    const blockIndex = RandomBlock.index % RandomBlock.shuffledBlocks.length;
    const nextIndex = (blockIndex + 1) % RandomBlock.shuffledBlocks.length;

    const current = new RandomBlock.shuffledBlocks[blockIndex]();

    RandomBlock.index += 1;

    if (nextIndex === 0) {
      this.shuffle();
    }

    return {
      current,
      next: new RandomBlock.shuffledBlocks[nextIndex](),
    };
  }
}
