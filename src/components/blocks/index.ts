import Block from "./block";

export class OBlock extends Block {
  constructor() {
    super("o", [
      [
        [0, 0],
        [-1, 0],
        [-1, 1],
        [0, 1],
      ],
    ]);
  }
}

export class SBlock extends Block {
  constructor() {
    super("s", [
      [
        [0, 0],
        [-1, 0],
        [0, 1],
        [1, 1],
      ],
      [
        [0, 0],
        [0, 1],
        [1, 0],
        [1, -1],
      ],
      [
        [0, 0],
        [1, 0],
        [0, -1],
        [-1, -1],
      ],
      [
        [0, 0],
        [-1, 0],
        [-1, 1],
        [0, -1],
      ],
    ]);
  }
}

export class ZBlock extends Block {
  constructor() {
    super("z", [
      [
        [0, 0],
        [1, 0],
        [0, 1],
        [-1, 1],
      ],
      [
        [0, 0],
        [1, 0],
        [1, 1],
        [0, -1],
      ],
      [
        [0, 0],
        [0, -1],
        [1, -1],
        [-1, 0],
      ],
      [
        [0, 0],
        [-1, 0],
        [-1, -1],
        [0, 1],
      ],
    ]);
  }
}

export class JBlock extends Block {
  constructor() {
    super("j", [
      [
        [0, 0],
        [1, 0],
        [-1, 0],
        [-1, 1],
      ],
      [
        [0, 0],
        [0, -1],
        [0, 1],
        [1, 1],
      ],
      [
        [0, 0],
        [-1, 0],
        [1, 0],
        [1, -1],
      ],
      [
        [0, 0],
        [0, -1],
        [-1, -1],
        [0, 1],
      ],
    ]);
  }
}

export class LBlock extends Block {
  constructor() {
    super("l", [
      [
        [0, 0],
        [1, 0],
        [-1, 0],
        [1, 1],
      ],
      [
        [0, 0],
        [0, -1],
        [0, 1],
        [1, -1],
      ],
      [
        [0, 0],
        [-1, 0],
        [1, 0],
        [-1, -1],
      ],
      [
        [0, 0],
        [0, -1],
        [-1, 1],
        [0, 1],
      ],
    ]);
  }
}

export class TBlock extends Block {
  constructor() {
    super("t", [
      [
        [0, 0],
        [1, 0],
        [-1, 0],
        [0, 1],
      ],
      [
        [0, 0],
        [0, -1],
        [0, 1],
        [1, 0],
      ],
      [
        [0, 0],
        [-1, 0],
        [1, 0],
        [0, -1],
      ],
      [
        [0, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
      ],
    ]);
  }
}

export class IBlock extends Block {
  constructor() {
    super("i", [
      [
        [0, 0],
        [1, 0],
        [2, 0],
        [-1, 0],
      ],
      [
        [0, 0],
        [0, 1],
        [0, -1],
        [0, -2],
      ],
      [
        [0, 0],
        [1, 0],
        [-1, 0],
        [-2, 0],
      ],
      [
        [0, 0],
        [0, -1],
        [0, 1],
        [0, 2],
      ],
    ]);
  }
}