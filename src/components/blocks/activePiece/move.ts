import ActivePiece from ".";
import Board from "../../board";

export default class MoveMixin {
  public activePiece: ActivePiece;
  private readonly moves = {
    left: [-1, 0],
    down: [0, -1],
    right: [1, 0],
  };

  constructor(activePiece: ActivePiece) {
    this.activePiece = activePiece;
  }

  public move(dir: keyof typeof this.moves) {
    const { children } = this.activePiece.get.block;

    let moveOk = true;

    for (let i = 0; i < children.length; i++) {
      const { x, y } = children[i].position;
      const potX = x + this.moves[dir][0];
      const potY = y + this.moves[dir][1];

      const key = Board.keyGen(potX, potY);

      if (this.tileHasJustStarted(y, potX)) {
        continue;
      }

      if (Board.boardMap[key] !== false) {
        moveOk = false;
        break;
      }
    }

    if (moveOk) {
      this.activePiece.updatePosition(this.moves[dir][0], this.moves[dir][1]);
    }
  }

  public tileHasJustStarted(currY: number, potentialX: number) {
    return (
      currY >= 10 && potentialX >= Board.lowerX && potentialX < Board.higherX
    );
  }
}
