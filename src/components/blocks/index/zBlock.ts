import Block from "../block";
import OffsetData, { OffsetDataReturnType } from "../offsetData";

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
