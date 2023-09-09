import { BlockNames } from "./block";

type CachedBlocks = {
  [K in BlockNames]: THREE.Object3D[];
};

export class Piece {
  public blockName: BlockNames;
  private cachedBlocks: CachedBlocks = {} as CachedBlocks;

  constructor(blockName: BlockNames) {}
}
