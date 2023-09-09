import { Clock } from "three";
import { Camera } from "./camera";
import { Scene } from "./scene";
import { Renderer } from "./renderer";

const clock = new Clock();

type WithTickMethod<T extends {}> = T & { tick: (delta: number) => void };

export default class Loop {
  camera;
  scene;
  renderer;
  updatables: WithTickMethod<{}>[] = [];

  constructor(
    camera: Camera["camera"],
    scene: Scene["scene"],
    renderer: Renderer["renderer"]
  ) {
    this.camera = camera;
    this.scene = scene;
    this.renderer = renderer;
  }

  start() {
    this.renderer.setAnimationLoop(() => {
      this.tick();

      this.renderer.render(this.scene, this.camera);
    });
  }

  stop() {
    this.renderer.setAnimationLoop(null);
  }

  addToUpdatables<T extends {}>(obj: WithTickMethod<T>) {
    this.updatables.push(obj);
  }

  tick() {
    const delta = clock.getDelta();

    for (const object of this.updatables) {
      if (!object.tick) {
        throw new Error(`All components need to have a tick method`);
      }
      object.tick(delta);
    }
  }
}
