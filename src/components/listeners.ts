import World from "./world";

export default class Listeners {
  private world: World;
  private operating = false;

  constructor(world: World) {
    this.world = world;
    this.resize();
    this.initRotateCtrls();
  }

  public resize() {
    window.addEventListener("resize", () => {
      this.world.camera.aspect = window.innerWidth / window.innerHeight;
      this.world.camera.updateProjectionMatrix();
      this.world.renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }

  set setIsOperating(isOperating: boolean) {
    this.operating = isOperating;
  }

  private initRotateCtrls() {
    window.addEventListener("keydown", (e) => {
      if (this.operating) return;
      this.setIsOperating = true;
      if (e.key === " ") {
        console.log(this.world.audio.analyser);

        if (!this.world.audio.analyser) this.world.audio.createAudioContext();
        this.world.activePiece.rotator.rotatePiece(true);
      }
      if (e.key === "z") {
        this.world.activePiece.rotator.rotatePiece(false);
      }
      if (e.key === "ArrowRight") {
        this.world.activePiece.mover.move("right");
      }
      if (e.key === "ArrowLeft") {
        this.world.activePiece.mover.move("left");
      }
      if (e.key === "ArrowDown") {
        this.world.interval.changeTime(0);
      }
      this.setIsOperating = false;
    });
  }
}
