import { CustomThreeGroup } from "../../types/blockTypes";
import Board from "../board";
import Block from "./block";

export default class Rotator {
  private block: Block;

  constructor(block: Block) {
    this.block = block;
  }

  public rotatePiece(clockwise: boolean): Block {
    const block = this.block.get;
    const groupPosX = block.block.position.x;
    const groupPosY = block.block.position.y;
    const newRotIndex = this.mod(
      this.block.rotationIndex + (clockwise ? 1 : -1),
      Block.rotationIndexes
    );
    const newBlock = this.block.createBlock(newRotIndex);
    newBlock.position.set(groupPosX, groupPosY, 0);

    let valid = true;

    for (const { position } of newBlock.children) {
      const { x, y } = position;
      if (this.block.tileHasJustStarted(x + groupPosX, y + groupPosY)) {
        continue;
      }

      const key = Board.keyGen(x + groupPosX, y + groupPosY);

      if (Board.boardMap[key] !== false) {
        valid = false;
        break;
      }
    }

    const { offsetOk, offsetBy } = this.offsetPiece(
      newBlock,
      newRotIndex,
      valid
    );

    if (!valid && !offsetOk) {
      return this.block.get;
    }

    newBlock.position.set(
      newBlock.position.x + offsetBy.x,
      newBlock.position.y + offsetBy.y,
      0
    );

    this.block.setter = {
      block: newBlock,
      newRotIndex,
    };

    return this.block.get;
  }

  private offsetPiece(
    newBlock: CustomThreeGroup,
    newRotIndex: number,
    valid: boolean
  ) {
    let offsetOk = false;
    let offsetBy = {
      x: 0,
      y: 0,
    };

    if (valid) return { offsetOk, offsetBy };

    const { rotationIndex, offsetData } = this.block;

    for (let index = 0; index < offsetData.length; index++) {
      const [offset1X, offset1Y] = offsetData[index][rotationIndex];
      const [offset2X, offset2Y] = offsetData[index][newRotIndex];
      const endOffset = {
        x: offset1X - offset2X,
        y: offset1Y - offset2Y,
      };

      const offsetTestPassed = newBlock.children.every(({ position }) => {
        const potX = position.x + endOffset.x + newBlock.position.x;
        const potY = position.y + endOffset.y + newBlock.position.y;

        const key = Board.keyGen(potX, potY);

        return Board.boardMap[key] === false;
      });

      if (offsetTestPassed) {
        offsetOk = true;
        offsetBy = endOffset;
        break;
      }
    }

    return { offsetOk, offsetBy };
  }

  private mod(x: number, m: number) {
    return ((x % m) + m) % m;
  }
}
