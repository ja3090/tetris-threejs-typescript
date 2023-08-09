import { Grid } from "./Grid";
import ActivePiece from "./blocks/activePiece";
import { OBlock, ZBlock } from "./blocks";
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
    this.activePiece = new ActivePiece(new ZBlock());
    new Board();
    this.grid = new Grid().grid;
    new Listeners(this.camera, this.renderer, this.activePiece);
    // this.activePiece.set = new OBlock();

    this.scene.add(this.camera, this.grid, this.activePiece.get.block);
  }

  public animate() {
    this.renderer.render(this.scene, this.camera);
  }
}
