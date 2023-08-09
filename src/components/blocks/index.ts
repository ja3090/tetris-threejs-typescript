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

export class OBlock extends Block {
  constructor() {
    super("o", [
      [0, 0],
      [1, 0],
      [1, 1],
      [0, 1],
    ]);
  }
}
