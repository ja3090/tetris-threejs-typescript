import THREE from "../utils/three";

export class Camera {
  public camera;

  constructor(fov = 50, aspect = 1, near = 0.1, far = 2000) {
    this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

    this.camera.position.set(0, 0, 50);
  }
}
