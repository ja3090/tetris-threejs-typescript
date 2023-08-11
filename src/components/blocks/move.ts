import Board from "../board";
import Block from "./block";

export default class Mover {
  private block: Block;
  private readonly moves = {
    left: [-1, 0],
    down: [0, -1],
    right: [1, 0],
  };

  constructor(block: Block) {
    this.block = block;
  }

  public move(dir: keyof typeof this.moves) {
    const { length } = this.block.block.children;
    const { x: groupX, y: groupY } = this.block.block.position;

    const [moveX, moveY] = this.moves[dir];

    let moveOk = true;

    for (let index = 0; index < length; index++) {
      const { x, y } = this.block.block.children[index].position;

      const potX = x + this.block.block.position.x + moveX;
      const potY = y + this.block.block.position.y + moveY;

      const key = Board.keyGen(potX, potY);

      if (this.tileHasJustStarted(y + this.block.block.position.y, potX)) {
        continue;
      }

      if (Board.boardMap[key] !== false) {
        moveOk = false;
        break;
      }
    }

    if (moveOk) {
      this.block.block.position.set(groupX + moveX, groupY + moveY, 0);
    }

    return this.block.get;
  }

  public tileHasJustStarted(currY: number, potentialX: number) {
    return (
      currY >= 10 && potentialX >= Board.lowerX && potentialX < Board.higherX
    );
  }
}
