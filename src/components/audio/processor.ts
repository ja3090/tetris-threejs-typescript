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

  constructor(world: World) {
    this.world = world;
  }

  public createAudioContext() {
    const listener = new THREE.AudioListener();
    this.world.camera.add(listener);

    const sound = new THREE.Audio(listener);

    const audioLoader = new THREE.AudioLoader();
    audioLoader.load("/endurance.mp3", (buffer) => {
      sound.setBuffer(buffer);
      sound.setLoop(true);
      sound.setVolume(0.5);
      sound.play();
    });

    this.analyser = new THREE.AudioAnalyser(sound, AudioProcessor.fftSize);

    this.world.loop.updatables.push(this);
    this.world.start();
  }

  public tick(delta: number) {
    if (!this.analyser) return;

    const data = this.analyser.getFrequencyData();

    this.world.uniformUData = data;
  }
}
