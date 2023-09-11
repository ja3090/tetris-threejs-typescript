import { Utils } from "../../utils/Utils";
import Board from "../board";
import Block from "./block";

export default class Rotator {
  private block: Block;

  constructor(block: Block) {
    this.block = block;
  }

  public rotatePiece(clockwise: boolean) {
    const block = this.block.get;
    const groupPosX = block.block[0].position.x;
    const groupPosY = block.block[0].position.y;
    const newRotIndex = Utils.trueMod(
      this.block.rotationIndex + (clockwise ? 1 : -1),
      this.block.rotationIndexes
    );
    const newBlockCoords: number[][] = [];

    let valid = true;

    for (const [x, y] of this.block.rotationStates[newRotIndex]) {
      const posX = x + groupPosX;
      const posY = y + groupPosY;

      const key = Board.keyGen(posX, posY);

      const passesChecks =
        this.block.tileHasJustStarted(posX, posY) ||
        Board.boardMap[key] === false;

      if (passesChecks) {
        newBlockCoords.push([posX, posY]);
      } else {
        valid = false;
        break;
      }
    }

    if (!valid) {
      return;
    }

    block.block.forEach((tile, ind) => {
      tile.position.set(newBlockCoords[ind][0], newBlockCoords[ind][1], 0);
    });
    this.block.rotationIndex = newRotIndex;
  }
}
