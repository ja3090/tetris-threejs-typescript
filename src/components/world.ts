import { Grid } from "./Grid";
import Block from "./blocks/block";
import Board from "./board";
import { Camera } from "./camera";
import Listeners from "./listeners";
import { Renderer } from "./renderer";
import { Scene } from "./scene";
import { RandomBlock } from "./blocks/randomBlock";
import { Interval } from "./interval";

export default class World {
  public camera;
  public scene;
  public renderer;
  public activePiece;
  public grid;
  public interval;
  public randomBlockPicker;

  constructor() {
    this.camera = new Camera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    ).camera;
    this.scene = new Scene().scene;
    this.renderer = new Renderer().renderer;
    new Board();
    this.grid = new Grid().grid;
    this.randomBlockPicker = new RandomBlock();
    this.activePiece = this.randomBlockPicker.randomBlock();
    this.activePiece.block.position.set(0, 10, 0);
    new Listeners(this);
    this.interval = new Interval(this.movePieceDown.bind(this), 500);

    this.scene.add(this.camera, this.grid, this.activePiece.block);
  }

  public animate() {
    this.renderer.render(this.scene, this.camera);
  }

  set activePieceSet(block: Block) {
    this.activePiece = block;
  }

  public movePieceDown() {
    const { blockFinished } = this.activePiece.mover.move("down");
    if (blockFinished) {
      const newBlock = this.randomBlockPicker.randomBlock();
      newBlock.block.position.set(0, 10, 0);
      this.scene.add(newBlock.block);
      this.activePieceSet = newBlock;
    }
  }
}
