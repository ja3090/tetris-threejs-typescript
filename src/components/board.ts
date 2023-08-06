type BoardKey = `x${number}y${number}`;
type BoardMap = ReturnType<Board["createBoard"]>;

export default class Board {
  public boardMap: BoardMap;

  constructor() {
    this.boardMap = this.createBoard();
  }

  public keyGen(x: number, y: number): BoardKey {
    return `x${x}y${y}`;
  }

  public createBoard() {
    const board: {
      [k: BoardKey]: boolean;
    } = {};

    for (let x = -4; x <= 5; x++) {
      for (let y = -10; y <= 9; y++) {
        const key = this.keyGen(x, y);
        board[key] = false;
      }
    }

    return board;
  }

  get board(): BoardMap {
    return this.boardMap;
  }

  set board({ key, status }: { key: BoardKey; status: boolean }) {
    this.boardMap[key] = status;
  }
}
