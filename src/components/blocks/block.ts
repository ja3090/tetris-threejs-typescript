import { CustomThreeGroup } from "../../types/blockTypes";
import THREE from "../../utils/three";
import Board from "../board";
import Square from "../square";
import Mover from "./move";
import { OffsetDataReturnType } from "./offsetData";
import Rotator from "./rotate";

export type BlockNames = "z" | "j" | "l" | "s" | "t" | "i" | "o";

export default abstract class Block {
  public blockName: BlockNames;
  public block: CustomThreeGroup;
  public rotationIndex = 0;
  public rotationStates: number[][][];
  public rotationIndexes: number;
  public rotator: Rotator;
  public mover: Mover;
  public abstract offsetData: OffsetDataReturnType;

  constructor(blockName: BlockNames, rotationStates: number[][][]) {
    this.blockName = blockName;
    this.rotationStates = rotationStates;
    this.block = this.createBlock(this.rotationIndex);
    this.rotator = new Rotator(this);
    this.mover = new Mover(this);
    this.rotationIndexes = rotationStates.length;
  }

  public createBlock(rotIndex: number) {
    const squares = this.rotationStates[rotIndex].map(([x, y]) => {
      const { square } = new Square();

      square.rotateY(-Math.PI / 2);

      square.position.set(x, y, 0);

      return square;
    });

    const block = new THREE.Group().add(...squares) as CustomThreeGroup;

    return block;
  }

  get get() {
    return this;
  }

  set setter({
    block,
    newRotIndex,
  }: {
    block: CustomThreeGroup;
    newRotIndex: number;
  }) {
    this.block = block;
    this.rotationIndex = newRotIndex;
  }

  public tileHasJustStarted(potentialX: number, potentialY: number) {
    return (
      potentialY >= 10 &&
      potentialX >= Board.lowerX &&
      potentialX < Board.higherX
    );
  }
}
