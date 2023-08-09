type BoardKey = `x${number}y${number}`;
type BoardMap = {
  [k: `x${number}y${number}`]: boolean;
};

export default class Board {
  public static boardMap: BoardMap;
  public static readonly boardHeight = 20;
  public static readonly boardWidth = 10;
  public static readonly lowerX = -(this.boardWidth / 2) + 1;
  public static readonly lowerY = -(this.boardHeight / 2);
  public static readonly higherX = this.lowerX * -1 + 2;
  public static readonly higherY = this.lowerY * -1;

  constructor() {
    Board.boardMap = Board.createBoard();
  }

  public static keyGen(x: number, y: number): BoardKey {
    return `x${x}y${y}`;
  }

  private static createBoard() {
    const board: {
      [k: BoardKey]: boolean;
    } = {};

    for (let x = this.lowerX; x < this.higherX; x++) {
      for (let y = this.lowerY; y < this.higherY; y++) {
        const key = Board.keyGen(x, y);
        board[key] = false;
      }
    }

    return board;
  }

  static get get(): BoardMap {
    return Board.boardMap;
  }

  static set set({ key, status }: { key: BoardKey; status: boolean }) {
    Board.boardMap[key] = status;
  }
}
