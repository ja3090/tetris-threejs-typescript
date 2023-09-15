import * as THREE from "three";
import World from "../world";

export class AudioProcessor {
  world: World;
  analyser: THREE.AudioAnalyser | undefined;
  public static fftSize = 1024;
  public static uniforms = {
    u_fft_size: {
      type: "int",
      value: AudioProcessor.fftSize,
    },
  };
  public sound: THREE.Audio | undefined;

  constructor(world: World) {
    this.world = world;
  }

  public createAudioContext() {
    const listener = new THREE.AudioListener();
    this.world.camera.add(listener);

    this.sound = new THREE.Audio(listener);

    const audioLoader = new THREE.AudioLoader();
    audioLoader.load("/endurance.mp3", (buffer) => {
      this.sound!.setBuffer(buffer);
      this.sound!.setLoop(true);
      this.sound!.setVolume(0.5);
      this.sound!.play();
    });

    this.analyser = new THREE.AudioAnalyser(this.sound, AudioProcessor.fftSize);

    this.world.loop.updatables.push(this);
    this.world.start();
  }

  public tick() {
    if (!this.analyser) return;

    const data = this.analyser.getFrequencyData();

    this.world.uniformUData = data;
  }
}
