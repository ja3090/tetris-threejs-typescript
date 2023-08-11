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
