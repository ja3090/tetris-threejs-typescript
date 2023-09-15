import Board from "../board";
import { Score } from "../score";
import World from "../world";
import Block from "./block";

export default class Mover {
  public static readonly moves = {
    left: [-1, 0],
    down: [0, -1],
    right: [1, 0],
  };
  public block: Block;
  public hardDropFrom = 0;

  constructor(block: Block) {
    this.block = block;
  }

  public move(dir: keyof typeof Mover.moves) {
    const { length } = this.block.block;

    if (World.hardDrop) Score.hardDropTally += 1;
    if (World.softDrop) Score.softDropTally += 1;

    const [moveX, moveY] = Mover.moves[dir];

    let moveOk = true;
    let blockFinished = false;

    for (let index = 0; index < length; index++) {
      const { x, y } = this.block.get.block[index].position;

      const potX = x + moveX;
      const potY = y + moveY;

      const key = Board.keyGen(potX, potY);

      if (this.block.tileHasJustStarted(potX, potY)) {
        continue;
      }

      if (Board.boardMap[key] !== false) {
        moveOk = false;
        break;
      }
    }

    if (moveOk) {
      this.block.setPos(moveX, moveY);
    }

    if (!moveOk && dir === "down") {
      this.updateBoard();
      blockFinished = true;
      if (this.hardDropFrom) {
        Score.hardDropTally =
          this.hardDropFrom - this.block.block[0].position.y;
        this.hardDropFrom = 0;
      }
    }

    return { block: this.block.get, blockFinished };
  }

  private updateBoard() {
    for (const tile of this.block.block) {
      const { x, y } = tile.position;

      const key = Board.keyGen(x, y);

      Board.set = { key, tile };
    }
  }
}
