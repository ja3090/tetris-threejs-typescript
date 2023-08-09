import Board from "../../board";
import Block from "../block";
import ActivePiece from ".";

export default class RotateMixin {
  private activePiece: ActivePiece;

  constructor(activePiece: ActivePiece) {
    this.activePiece = activePiece;
  }

  public rotatePiece(clockwise: boolean, shouldOffset: boolean) {
    const oldRotIndex = this.activePiece.block.rotationIndex;
    this.activePiece.block.rotationIndex += clockwise ? 1 : -1;
    this.activePiece.block.rotationIndex = this.mod(
      this.activePiece.block.rotationIndex,
      Block.rotationIndexes
    );

    this.rotateTiles(this.activePiece.block.block.children, clockwise);

    if (!shouldOffset) return;

    const { moveOk, endOffset } = this.canOffset(
      this.activePiece.block.block.children,
      oldRotIndex,
      this.activePiece.block.rotationIndex
    );

    if (moveOk) {
      this.activePiece.updatePosition(endOffset!.x, endOffset!.y);
    } else {
      this.rotatePiece(false, false);
    }
  }

  private rotateTiles(
    children: Block["block"]["children"],
    clockwise: boolean
  ) {
    const rotMatrix = this.rotMatrix(clockwise);

    for (let i = 0; i < children.length; i++) {
      const { x, y } = children[i].position;
      const newXPos = rotMatrix[0][0] * x + rotMatrix[1][0] * y;
      const newYPos = rotMatrix[0][1] * x + rotMatrix[1][1] * y;

      children[i].position.x = newXPos;
      children[i].position.y = newYPos;
    }
  }

  private canOffset(
    children: Block["block"]["children"],
    oldRotIndex: number,
    newRotIndex: number
  ) {
    let moveOk = false;
    let endOffset: { x: number; y: number } | undefined;

    for (let ind = 0; ind < this.activePiece.block.offsetData.length; ind++) {
      const [x1, y1] = this.activePiece.block.offsetData[ind][oldRotIndex];
      const [x2, y2] = this.activePiece.block.offsetData[ind][newRotIndex];
      endOffset = { x: x1 - x2, y: y1 - y2 };

      const canMove = children.every(({ position }) => {
        const key = Board.keyGen(
          position.x + endOffset!.x,
          position.y + endOffset!.y
        );

        return Board.boardMap[key] === false;
      });

      if (canMove) {
        moveOk = true;
        break;
      }
    }

    return { moveOk, endOffset };
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
