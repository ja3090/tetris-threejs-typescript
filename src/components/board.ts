type BoardKey = `x${number}y${number}`;
type BoardMap = {
  [k: `x${number}y${number}`]: boolean;
};

export default class Board {
  public static boardMap: BoardMap;
  public static boardHeight = 20;
  public static boardWidth = 10;

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

    const lowerX = -(this.boardWidth / 2);
    const lowerY = -(this.boardHeight / 2);
    const higherX = lowerX * -1;
    const higherY = lowerY * -1;

    for (let x = lowerX; x < higherX; x++) {
      for (let y = lowerY; y < higherY; y++) {
        const key = Board.keyGen(x, y);
        board[key] = false;
      }
    }

    console.log(Object.keys(board).length);

    return board;
  }

  static get get(): BoardMap {
    return Board.boardMap;
  }

  static set set({ key, status }: { key: BoardKey; status: boolean }) {
    Board.boardMap[key] = status;
  }
}
