import Block from "./block";

export class ZBlock extends Block {
  constructor() {
    super("z", [
      [0, 0],
      [1, 0],
      [0, 1],
      [-1, 1],
    ]);
  }
}
