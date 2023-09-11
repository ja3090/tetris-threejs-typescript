import { Grid } from "../Grid";
import Block from "../blocks/block";
import Board from "../board";
import { Camera } from "../camera";
import Listeners from "../listeners";
import { Renderer } from "../renderer";
import { Scene } from "../scene";
import { RandomBlock } from "../blocks/randomBlock";
import { Interval } from "../interval";
import Loop from "../loop";
import { AudioProcessor } from "../audio/processor";
import { Speakers } from "../audio";
import { RainingBlocks } from "../rainingBlocks";
import { WorldUniforms } from "./worldUniforms";

export default class World {
  public camera;
  public scene;
  public renderer;
  public activePiece;
  public grid;
  public interval;
  public randomBlockPicker;
  public board;
  public loop;
  public audio;
  public speakers;
  public rainingBlocks;
  public uniforms;

  constructor() {
    this.camera = new Camera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    ).camera;
    this.scene = new Scene().scene;
    this.renderer = new Renderer().renderer;
    this.board = new Board(this);
    this.grid = new Grid().grid;
    this.randomBlockPicker = new RandomBlock();
    this.activePiece = this.randomBlockPicker.randomBlock().current;
    this.activePiece.setPos(4, 20);
    this.interval = new Interval(this.movePieceDown.bind(this), 500);
    new Listeners(this);
    this.loop = new Loop(this.camera, this.scene, this.renderer);
    this.audio = new AudioProcessor(this);
    this.speakers = new Speakers();
    this.rainingBlocks = new RainingBlocks(this);
    this.uniforms = new WorldUniforms();
    this.loop.updatables.push(this.uniforms);

    this.scene.add(
      this.camera,
      this.grid,
      this.speakers.group,
      ...this.activePiece.block
    );
    this.loop.start();
  }

  public animate() {
    this.renderer.render(this.scene, this.camera);
  }

  set activePieceSet(block: Block) {
    this.activePiece = block;
  }

  private movePieceDown() {
    const { blockFinished } = this.activePiece.mover.move("down");

    if (blockFinished) {
      this.interval.clearInterval();
      const randomBlock = this.randomBlockPicker.randomBlock().current;
      randomBlock.setPos(5, 20);
      this.activePieceSet = randomBlock;
      this.scene.add(...randomBlock.block);
      this.board.updateBoard();
      this.interval.changeTime(500);
    }
  }

  start() {
    this.loop.start();
  }

  set uniformUData(data: Uint8Array) {
    WorldUniforms.values.u_data_arr.value = data;
  }
}
