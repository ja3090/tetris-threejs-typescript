import THREE from "../utils/three";

export class Renderer {
  public renderer;

  constructor() {
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    const app = document.getElementById("app");
    app!.appendChild(this.renderer.domElement);
  }
}
