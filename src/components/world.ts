import { Grid } from "./Grid";
import ActivePiece from "./activePiece";
import { ZBlock } from "./blocks";
import Board from "./board";
import { Camera } from "./camera";
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
    this.activePiece = new ActivePiece();
    new Board();
    this.grid = new Grid().grid;
    this.resize();
    this.rotateActivePiece();
    this.activePiece.set = new ZBlock();
    this.activePiece.get.block.children.forEach((child) =>
      console.log(child.coords)
    );

    this.scene.add(this.camera, this.grid, this.activePiece.get.block);
  }

  public animate() {
    this.renderer.render(this.scene, this.camera);
  }

  private resize() {
    window.addEventListener("resize", () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }

  private rotateActivePiece() {
    window.addEventListener("keydown", (e) => {
      if (e.key === " ") this.activePiece.rotatePiece(true, true);
    });
  }
}
