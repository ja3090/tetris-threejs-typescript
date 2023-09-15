import { CSS2DRenderer } from "three/examples/jsm/renderers/CSS2DRenderer.js";

export class LabelRenderer {
  labelRenderer;

  constructor() {
    this.labelRenderer = new CSS2DRenderer();
    this.labelRenderer.setSize(window.innerWidth, window.innerHeight);
    this.labelRenderer.domElement.style.position = "absolute";
    this.labelRenderer.domElement.style.top = "0px";
    document.getElementById("app")!.appendChild(this.labelRenderer.domElement);
  }
}
