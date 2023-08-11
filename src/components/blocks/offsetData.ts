import { BlockNames } from "./block";

export type OffsetDataReturnType = ReturnType<typeof OffsetData.offsetDataGen>;

export default class OffsetData {
  public static offsetDataGen(blockName: BlockNames) {
    switch (blockName) {
      case "j":
      case "l":
      case "s":
      case "t":
      case "z": {
        return [
          [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
          ],
          [
            [0, 0],
            [1, 0],
            [0, 0],
            [-1, 0],
          ],
          [
            [0, 0],
            [1, -1],
            [0, 0],
            [-1, -1],
          ],
          [
            [0, 0],
            [0, 2],
            [0, 0],
            [0, 2],
          ],
          [
            [0, 0],
            [1, 2],
            [0, 0],
            [-1, 2],
          ],
        ];
      }
      case "i": {
        return [
          [
            [0, 0],
            [-1, 0],
            [-1, 1],
            [0, 1],
          ],
          [
            [-1, 0],
            [0, 0],
            [1, 1],
            [0, 1],
          ],
          [
            [2, 0],
            [0, 0],
            [-2, 1],
            [0, 1],
          ],
          [
            [-1, 0],
            [0, 1],
            [1, 0],
            [0, -1],
          ],
          [
            [2, 0],
            [0, -2],
            [-2, 0],
            [0, 2],
          ],
        ];
      }
      case "o": {
        return [
          [
            [0, 0],
            [0, -1],
            [-1, -1],
            [-1, 0],
          ],
        ];
      }
      default: {
        throw new Error(
          'Block names must be one of "z" | "j" | "l" | "s" | "t" | "i" | "o"'
        );
      }
    }
  }
}
