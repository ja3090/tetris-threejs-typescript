import ActivePiece from "./blocks/activePiece";
import { Camera } from "./camera";
import { Renderer } from "./renderer";

export default class Listeners {
  private camera: Camera["camera"];
  private renderer: Renderer["renderer"];
  private activePiece: ActivePiece;

  constructor(
    camera: Camera["camera"],
    renderer: Renderer["renderer"],
    activePiece: ActivePiece
  ) {
    this.camera = camera;
    this.renderer = renderer;
    this.activePiece = activePiece;
    this.registerListeners(this.initRotateCtrls, this.resize);
  }

  private registerListeners(...listeners: (() => void)[]) {
    listeners.forEach((listener) => {
      listener.bind(this).call(listener);
    });
  }

  private resize() {
    window.addEventListener("resize", () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }

  private initRotateCtrls() {
    window.addEventListener("keydown", (e) => {
      if (e.key === " ") this.activePiece.rotator.rotatePiece(true, true);
      if (e.key === "ArrowLeft") this.activePiece.mover.move("left");
      if (e.key === "ArrowRight") this.activePiece.mover.move("right");
      if (e.key === "ArrowDown") this.activePiece.mover.move("down");
    });
  }
}
