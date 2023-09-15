import World from "./world";

export default class Listeners {
  private world: World;
  private operating = false;

  constructor(world: World) {
    this.world = world;
    this.initRotateCtrls();
  }

  set setIsOperating(isOperating: boolean) {
    this.operating = isOperating;
  }

  private initRotateCtrls() {
    window.addEventListener("keydown", (e) => {
      if (this.operating) return;
      this.setIsOperating = true;
      if (e.key === " ") {
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
        World.softDrop = true;
        this.world.activePiece.mover.move("down");
        World.softDrop = false;
      }
      if (e.key === "Control") {
        World.hardDrop = true;
        this.world.interval!.changeTime(0.1);
      }
      this.setIsOperating = false;
    });
  }
}
