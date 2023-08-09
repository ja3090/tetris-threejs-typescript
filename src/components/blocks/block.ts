import { CustomThreeGroup } from "../../types/blockTypes";
import THREE from "../../utils/three";
import Square from "../square";
import OffsetData from "./offsetData";

// type MapBlock = {
//   [k: string]: CustomThreeGroup["children"][number];
// };

export type BlockNames = "z" | "j" | "l" | "s" | "t" | "i" | "o";

/**
 * @param positions first element of the array will be the vectors of the centre of the block, at which the
 * rotations will move around from
 */

export default class Block {
  public blockName: BlockNames;
  public block: CustomThreeGroup;
  public rotationIndex = 0;
  public offsetData: number[][][];
  static readonly rotationIndexes = 4;
  private static groups: {
    [k: string]: Block;
  } = {};

  constructor(blockName: BlockNames, positions: number[][]) {
    this.blockName = blockName;

    if (Block.groups[blockName]) {
      this.block = Block.groups[blockName].block;
      this.offsetData = Block.groups[blockName].offsetData;
    } else {
      this.block = this.generateBlock(positions);
      this.offsetData = OffsetData.attachOffsetData(blockName);
    }
  }

  private generateBlock(positions: number[][]) {
    const squares = positions.map(([x, y]) => {
      const { square } = new Square();

      square.rotateY(-Math.PI / 2);

      square.position.set(x, y, 0);

      return square;
    });

    const block = new THREE.Group().add(...squares) as CustomThreeGroup;

    return block;
  }
}
