import Block from "./block";
import { Blocks } from "./blockPositions";

export class OBlock extends Block {
  constructor() {
    super("o", Blocks.OBlock);
  }
}

export class SBlock extends Block {
  constructor() {
    super("s", Blocks.SBlock);
  }
}

export class ZBlock extends Block {
  constructor() {
    super("z", Blocks.ZBlock);
  }
}

export class JBlock extends Block {
  constructor() {
    super("j", Blocks.JBlock);
  }
}

export class LBlock extends Block {
  constructor() {
    super("l", Blocks.LBlock);
  }
}

export class TBlock extends Block {
  constructor() {
    super("t", Blocks.TBlock);
  }
}

export class IBlock extends Block {
  constructor() {
    super("i", Blocks.IBlock);
  }
}
