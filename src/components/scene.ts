import THREE from "../utils/three";

export class Scene {
  public scene;

  constructor() {
    this.scene = new THREE.Scene();

    this.scene.background = new THREE.Color(0x000009);
  }
}
