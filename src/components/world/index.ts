import { Grid } from "../Grid";
import Block from "../blocks/block";
import Board from "../board";
import { Camera } from "../camera";
import { Renderer } from "../renderer";
import { Scene } from "../scene";
import { RandomBlock } from "../blocks/randomBlock";
import { Interval } from "../interval";
import Loop from "../loop";
import { AudioProcessor } from "../audio/processor";
import { Speakers } from "../audio";
import { RainingBlocks } from "../rainingBlocks";
import { WorldUniforms } from "./worldUniforms";
import { NextBlock } from "./nextBlock";
import { LabelRenderer } from "../labelRenderer";
import { Score } from "../score";
import { StartScreen } from "../startScreen";
import { GameOver } from "../gameOver";

export default class World {
  public camera;
  public scene;
  public renderer;
  public labelRenderer;
  public activePiece;
  public grid;
  public interval: Interval | null;
  public randomBlockPicker;
  public board;
  public loop;
  public audio;
  public speakers;
  public rainingBlocks;
  public startScreen;
  public uniforms;
  public score;
  public nextBlock;
  public static hardDrop = false;
  public static softDrop = false;
  public static time = 800;
  public gameOver: GameOver | undefined;
  private operating = false;

  constructor() {
    this.camera = new Camera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    ).camera;
    this.scene = new Scene().scene;
    this.renderer = new Renderer().renderer;
    this.labelRenderer = new LabelRenderer().labelRenderer;
    this.board = new Board(this);
    this.grid = new Grid().grid;
    this.randomBlockPicker = new RandomBlock();
    const { current, next } = this.randomBlockPicker.randomBlock();
    this.activePiece = current;
    this.nextBlock = new NextBlock(this, next);
    this.activePiece.setPos(4, 20);
    this.interval = null;
    this.loop = new Loop(
      this.camera,
      this.scene,
      this.renderer,
      this.labelRenderer
    );
    this.audio = new AudioProcessor(this);
    this.speakers = new Speakers();
    this.rainingBlocks = new RainingBlocks(this);
    this.uniforms = new WorldUniforms();
    this.loop.updatables.push(this.uniforms);
    this.initWorld();
    this.resize();
    this.score = new Score();

    this.startScreen = new StartScreen();

    this.scene.add(
      this.camera,
      this.grid,
      this.speakers.group,
      // this.nextBlock.block,
      this.score.labelPlacement,
      ...this.activePiece.block
    );
  }

  public animate() {
    this.renderer.render(this.scene, this.camera);
    this.labelRenderer.render(this.scene, this.camera);
  }

  set activePieceSet(block: Block) {
    this.activePiece = block;
  }

  public initWorld() {
    const init = (e: KeyboardEvent) => {
      if (e.key === " ") {
        if (!this.audio.analyser && !this.interval) {
          this.audio.createAudioContext();
          this.interval = new Interval(
            this.movePieceDown.bind(this),
            World.time
          );
          this.initRotateCtrls();
          this.startScreen.container.remove();
          window.removeEventListener("keydown", init);
        }
      }
    };

    window.addEventListener("keydown", init);
  }

  public reinitGame() {
    const init = (e: KeyboardEvent) => {
      if (e.key === " ") {
        this.interval = new Interval(this.movePieceDown.bind(this), World.time);
        this.gameOver!.container.remove();
        this.audio.sound?.play();
        Score.totalLinesCleared = 0;
        Score.score = 0;
        Score.level = 0;
        const { current, next } = this.randomBlockPicker.randomBlock();
        this.activePiece = current;
        this.nextBlock = new NextBlock(this, next);
        this.activePiece.setPos(4, 20);
        this.scene.add(this.nextBlock.block, ...this.activePiece.block);
        window.removeEventListener("keydown", init);
      }
    };

    window.addEventListener("keydown", init);
  }

  private movePieceDown() {
    const { blockFinished, gameOver } = this.activePiece.mover.move("down");

    if (gameOver) {
      this.interval!.clearInterval();
      this.audio.sound?.stop();
      this.gameOver = new GameOver();
      World.time = 800;
      this.board.resetBoard();
      this.reinitGame();
      this.scene.remove(...this.activePiece.block);
      this.scene.remove(this.nextBlock.block);
      return;
    }

    if (blockFinished) {
      this.interval!.clearInterval();
      const { current, next } = this.randomBlockPicker.randomBlock();
      this.nextBlock.enterNext(next);
      current.setPos(5, 20);
      this.activePieceSet = current;
      this.scene.add(...current.block);
      this.board.updateBoard();
      this.score.calculateScore();
      World.hardDrop = false;
      this.interval?.changeTime(World.time);
    }
  }

  start() {
    this.loop.start();
  }

  set uniformUData(data: Uint8Array) {
    WorldUniforms.values.u_data_arr.value = data;
  }

  public resize() {
    window.addEventListener("resize", () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.labelRenderer.setSize(window.innerWidth, window.innerHeight);
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }

  set setIsOperating(isOperating: boolean) {
    this.operating = isOperating;
  }

  public initRotateCtrls() {
    window.addEventListener("keydown", this.ctrls.bind(this));
  }

  private ctrls(e: KeyboardEvent) {
    if (this.operating) return;
    this.setIsOperating = true;
    if (e.key === " ") {
      this.activePiece.rotator.rotatePiece(true);
    }
    if (e.key === "z") {
      this.activePiece.rotator.rotatePiece(false);
    }
    if (e.key === "ArrowRight") {
      this.activePiece.mover.move("right");
    }
    if (e.key === "ArrowLeft") {
      this.activePiece.mover.move("left");
    }
    if (e.key === "ArrowDown") {
      World.softDrop = true;
      this.activePiece.mover.move("down");
      World.softDrop = false;
    }
    if (e.key === "Control") {
      World.hardDrop = true;
      this.interval!.changeTime(0.1);
    }
    this.setIsOperating = false;
  }

  public removeCtrls() {
    window.removeEventListener("keydown", this.ctrls.bind(window));
  }
}
