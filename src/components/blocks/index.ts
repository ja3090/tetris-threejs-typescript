import Block from "./block";
import OffsetData, { OffsetDataReturnType } from "./offsetData";

export class OBlock extends Block {
  public offsetData: OffsetDataReturnType;

  constructor() {
    super("o", [
      [
        [0, 0],
        [-1, 0],
        [-1, 1],
        [0, 1],
      ],
    ]);

    this.offsetData = OffsetData.offsetDataGen("o");
  }
}

export class SBlock extends Block {
  public offsetData: OffsetDataReturnType;

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

    this.offsetData = OffsetData.offsetDataGen("s");
  }
}

export class ZBlock extends Block {
  public offsetData: OffsetDataReturnType;

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

    this.offsetData = OffsetData.offsetDataGen("z");
  }
}

export class JBlock extends Block {
  public offsetData: OffsetDataReturnType;

  constructor() {
    super("z", [
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

    this.offsetData = OffsetData.offsetDataGen("z");
  }
}

export class LBlock extends Block {
  public offsetData: OffsetDataReturnType;

  constructor() {
    super("z", [
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

    this.offsetData = OffsetData.offsetDataGen("z");
  }
}

export class TBlock extends Block {
  public offsetData: OffsetDataReturnType;

  constructor() {
    super("z", [
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

    this.offsetData = OffsetData.offsetDataGen("z");
  }
}

export class IBlock extends Block {
  public offsetData: OffsetDataReturnType;

  constructor() {
    super("z", [
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

    this.offsetData = OffsetData.offsetDataGen("z");
  }
}
