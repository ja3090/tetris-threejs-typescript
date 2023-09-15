import { Score } from "./score";
import Square from "./square";
import World from "./world";

type BoardKey = `x${number}y${number}`;
type BoardMap = {
  [k: `x${number}y${number}`]: boolean | THREE.Object3D;
};

export default class Board {
  public static boardMap: BoardMap;
  public static readonly boardHeight = 20;
  public static readonly boardWidth = 10;
  private world: World;

  constructor(world: World) {
    Board.boardMap = Board.createBoard();
    this.world = world;
  }

  public static keyGen(x: number, y: number): BoardKey {
    return `x${x}y${y}`;
  }

  private static createBoard() {
    const board: {
      [k: BoardKey]: boolean;
    } = {};

    for (let y = 0; y < Board.boardHeight; y++) {
      for (let x = 0; x < Board.boardWidth; x++) {
        const key = Board.keyGen(x, y);
        board[key] = false;
      }
    }

    return board;
  }

  static get get(): BoardMap {
    return Board.boardMap;
  }

  static set set({ key, tile }: { key: BoardKey; tile: THREE.Object3D }) {
    Board.boardMap[key] = tile;
  }

  public updateBoard() {
    let newBoard: BoardMap = {};
    let arr = [];
    const emptyRow = Array.from({ length: Board.boardWidth }, () => false);

    for (let y = 0; y < Board.boardHeight; y++) {
      let fullTally = 0;
      const partiallyFilledRows = [];

      for (let x = 0; x < Board.boardWidth; x++) {
        const key = Board.keyGen(x, y);
        partiallyFilledRows.push(Board.boardMap[key]);

        if (typeof Board.boardMap[key] !== "boolean") {
          this.world.scene.remove(Board.boardMap[key] as THREE.Object3D);
          fullTally += 1;
        }
      }

      if (fullTally === Board.boardWidth) {
        Score.linesCleared += 1;
        Score.totalLinesCleared += 1;
        continue;
      } else {
        arr.push(partiallyFilledRows);
      }

      if (fullTally === 0) break;
    }

    arr = [
      ...arr,
      ...Array.from({ length: Board.boardHeight - arr.length }, () => emptyRow),
    ];

    for (let y = 0; y < Board.boardHeight; y++) {
      for (let x = 0; x < Board.boardWidth; x++) {
        const key = Board.keyGen(x, y);

        if (!arr[y][x]) {
          newBoard[key] = false;
        } else {
          const { square } = new Square();

          square.position.set(x, y, 0);

          newBoard[key] = square;

          this.world.scene.add(square);
        }
      }
    }

    Board.boardMap = newBoard;
  }
}
