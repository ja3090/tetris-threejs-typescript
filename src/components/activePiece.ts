import type { CustomThreeGroup, WithCoordsField } from "../types/blockTypes";

export default class ActivePiece {
  public static block: CustomThreeGroup;
  private static instanceCount = 0;

  constructor() {
    ActivePiece.instanceCount += 1;
    if (ActivePiece.instanceCount > 1) {
      throw new Error("Only one instance of ActivePiece allowed.");
    }
  }

  get get() {
    return ActivePiece.block;
  }

  set set(newBlock: CustomThreeGroup) {
    ActivePiece.block = newBlock;
  }

  public updatePosition(group: THREE.Group, x: number, y: number) {
    group.position.set(x, y, 0);
    (group.children as WithCoordsField[]).forEach((child) => {
      child.coords = {
        x: x + child.position.x,
        y: y + child.position.y,
      };
    });
  }
}
