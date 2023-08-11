import { Grid } from "./Grid";
import { ZBlock } from "./blocks/index/zBlock";
import Block from "./blocks/block";
import Board from "./board";
import { Camera } from "./camera";
import Listeners from "./listeners";
import { Renderer } from "./renderer";
import { Scene } from "./scene";

export default class World {
  public camera;
  public scene;
  public renderer;
  public activePiece;
  public grid;

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
    this.activePiece = new ZBlock();
    new Listeners(this);

    this.scene.add(this.camera, this.grid, this.activePiece.block);
  }

  public animate() {
    this.renderer.render(this.scene, this.camera);
  }

  set activePieceSet(block: Block) {
    this.activePiece = block;
  }
}
