import World from "./world";

export default class Listeners {
  private world: World;

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

  private initRotateCtrls() {
    window.addEventListener("keydown", (e) => {
      if (e.key === " ") {
        this.world.scene.remove(this.world.activePiece.block);
        const block = this.world.activePiece.rotator.rotatePiece(true);
        this.world.scene.add(block.block);

        this.world.activePieceSet = block;
      }
      if (e.key === "z") {
        this.world.scene.remove(this.world.activePiece.block);
        const block = this.world.activePiece.rotator.rotatePiece(false);
        this.world.scene.add(block.block);

        this.world.activePieceSet = block;
      }
      if (e.key === "ArrowRight") {
        this.world.activePiece.mover.move("right");
      }
      if (e.key === "ArrowLeft") {
        this.world.activePiece.mover.move("left");
      }
      if (e.key === "ArrowDown") {
        this.world.activePiece.mover.move("down");
      }
    });
  }
}
