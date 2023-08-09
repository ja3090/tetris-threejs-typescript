import type { WithCoordsField } from "../../../types/blockTypes";
import Block from "../block";
import MoveMixin from "./move";
import RotateMixin from "./rotateMixin";

/**
 * Code for the rotation was adapted from: https://github.com/JohnnyTurbo/LD43/tree/master
 *
 * And used his tutorial here: https://youtu.be/yIpk5TJ_uaI?si=Igr5VMb_T7NUfY1L
 *
 * Old way of rotating was just switching between two different shapes but this way is a better
 * version that is found in newer Tetris titles
 *
 */

export default class ActivePiece {
  public block: Block;
  private static instanceCount = 0;
  public rotator: RotateMixin;
  public mover: MoveMixin;

  constructor(newBlock: Block) {
    ActivePiece.instanceCount += 1;
    if (ActivePiece.instanceCount > 1) {
      throw new Error("Only one instance of ActivePiece allowed.");
    }

    this.block = newBlock;
    this.updatePosition(0, 10);
    this.rotator = new RotateMixin(this);
    this.mover = new MoveMixin(this);
  }

  get get() {
    return this.block;
  }

  set set(newBlock: Block) {
    this.block = newBlock;
  }

  public updatePosition(x: number, y: number) {
    const group = this.get;

    group.block.children.forEach(({ position }) => {
      position.set(position.x + x, position.y + y, 0);
    });
  }
}
