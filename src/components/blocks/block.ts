import THREE from "../../utils/three";
import Board from "../board";
import Square from "../square";
import Mover from "./move";
import Rotator from "./rotate";

export type BlockNames = "z" | "j" | "l" | "s" | "t" | "i" | "o";
type CachedBlocks = {
  [K in BlockNames]: THREE.Object3D[];
};

export default class Block {
  public blockName: BlockNames;
  public block: THREE.Object3D[];
  public rotationIndex = 0;
  public rotationStates: number[][][];
  public rotationIndexes: number;
  public rotator: Rotator;
  public mover: Mover;

  constructor(blockName: BlockNames, rotationStates: number[][][]) {
    this.blockName = blockName;
    this.rotationStates = rotationStates;
    this.block = this.createBlock(this.rotationIndex);
    this.rotationIndexes = rotationStates.length;
    this.rotator = new Rotator(this);
    this.mover = new Mover(this);
  }

  public createBlock(rotIndex: number, addX?: number, addY?: number) {
    const squares = this.rotationStates[rotIndex].map(([x, y]) => {
      const { square } = new Square();

      const finalX = addX ? x + addX : x;
      const finalY = addY ? y + addY : y;

      square.position.set(finalX, finalY, 0);

      return square;
    });

    return squares;
  }

  get get() {
    return this;
  }

  set setter({
    block,
    newRotIndex,
  }: {
    block: THREE.Object3D[];
    newRotIndex: number;
  }) {
    this.block = block;
    this.rotationIndex = newRotIndex;
  }

  public setPos(x: number, y: number) {
    this.block.forEach(({ position }) => {
      position.set(position.x + x, position.y + y, 0);
    });
  }

  public tileHasJustStarted(potentialX: number, potentialY: number) {
    return (
      potentialY >= Board.boardHeight &&
      potentialX > 0 &&
      potentialX < Board.boardWidth
    );
  }
}
