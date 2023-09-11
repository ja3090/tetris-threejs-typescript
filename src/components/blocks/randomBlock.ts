import * as allBlocks from ".";
import { Shuffle } from "../shuffle";

export class RandomBlock extends Shuffle {
  private static instance: RandomBlock;
  public static allBlocks: typeof allBlocks;
  public static shuffledBlocks: (typeof allBlocks)[keyof typeof allBlocks][] =
    [];
  public static index = 0;

  constructor() {
    if (RandomBlock.instance) {
      throw new Error("Only one instance of RandomBlock allowed.");
    }

    super();

    RandomBlock.instance = this;
    RandomBlock.allBlocks = allBlocks;
    RandomBlock.shuffledBlocks = this.shuffle(allBlocks);
  }

  public randomBlock() {
    const blockIndex = RandomBlock.index % RandomBlock.shuffledBlocks.length;
    const nextIndex = (blockIndex + 1) % RandomBlock.shuffledBlocks.length;

    const current = new RandomBlock.shuffledBlocks[blockIndex]();

    RandomBlock.index += 1;

    if (nextIndex === 0) {
      RandomBlock.shuffledBlocks = this.shuffle(allBlocks);
    }

    return {
      current,
      next: new RandomBlock.shuffledBlocks[nextIndex](),
    };
  }
}
