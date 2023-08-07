import type { WithCoordsField } from "../types/blockTypes";
import Block from "./blocks/block";
import Board from "./board";

/**
 * Code for the rotation was adapted from: https://github.com/JohnnyTurbo/LD43/tree/master
 *
 * And used his tutorial here: https://youtu.be/yIpk5TJ_uaI?si=Igr5VMb_T7NUfY1L
 *
 * Old way of rotating was just switching between two different shapes but this way is a more
 * sophisticated version that is found in newer Tetris titles
 *
 */

export default class ActivePiece {
  public static block: Block;
  private static instanceCount = 0;

  constructor() {
    ActivePiece.instanceCount += 1;
    if (ActivePiece.instanceCount > 1) {
      throw new Error("Only one instance of ActivePiece allowed.");
    }
  }

  get get() {
    return ActivePiece.block;
  }

  set set(newBlock: Block) {
    console.log(newBlock.block.position);

    this.updatePosition(newBlock.block, 0, 0);
    ActivePiece.block = newBlock;
  }

  public updatePosition(group: THREE.Group, x: number, y: number) {
    group.position.set(x, y, 0);
    (group.children as WithCoordsField[]).forEach((child) => {
      child.coords = {
        x: x + child.position.x,
        y: y + child.position.y,
      };
    });
  }

  public rotatePiece(clockwise: boolean, shouldOffset: boolean) {
    const oldRotIndex = ActivePiece.block.rotationIndex;
    ActivePiece.block.rotationIndex += clockwise ? 1 : -1;
    ActivePiece.block.rotationIndex = this.mod(
      ActivePiece.block.rotationIndex,
      Block.rotationIndexes
    );

    this.rotateTiles(ActivePiece.block.block.children, clockwise);

    if (!shouldOffset) return;

    const canOffset = this.canOffset(
      ActivePiece.block.block.children,
      oldRotIndex,
      ActivePiece.block.rotationIndex
    );

    if (canOffset) {
      this.updatePosition(
        ActivePiece.block.block,
        ActivePiece.block.block.position.x,
        ActivePiece.block.block.position.y
      );
    } else {
      this.rotatePiece(false, false);
    }
  }

  private rotateTiles(rest: Block["block"]["children"], clockwise: boolean) {
    const rotMatrix = this.rotMatrix(clockwise);

    [
      [0, -1],
      [1, 0],
    ];

    for (let i = 0; i < rest.length; i++) {
      const { x, y } = rest[i].position;
      const newXPos = rotMatrix[0][0] * x + rotMatrix[1][0] * y;
      const newYPos = rotMatrix[0][1] * x + rotMatrix[1][1] * y;

      rest[i].position.x = newXPos;
      rest[i].position.y = newYPos;
    }
  }

  private canOffset(
    rest: Block["block"]["children"],
    oldRotIndex: number,
    newRotIndex: number
  ) {
    let moveOk = false;

    for (let ind = 0; ind < ActivePiece.block.offsetData.length; ind++) {
      const [x1, y1] = ActivePiece.block.offsetData[ind][oldRotIndex];
      const [x2, y2] = ActivePiece.block.offsetData[ind][newRotIndex];
      const endOffset = { x: x1 - x2, y: y1 - y2 };

      const canMove = rest.every(({ coords }) => {
        const key = Board.keyGen(
          coords.x + endOffset.x,
          coords.y + endOffset.y
        );

        return Board.boardMap[key] === false;
      });

      if (canMove) {
        moveOk = true;
        break;
      }
    }

    return moveOk;
  }

  private mod(x: number, m: number) {
    return ((x % m) + m) % m;
  }

  private rotMatrix(clockwise: boolean) {
    return clockwise
      ? [
          [0, -1],
          [1, 0],
        ]
      : [
          [0, 1],
          [-1, 0],
        ];
  }
}
