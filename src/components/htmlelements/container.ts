export class Container {
  element;

  constructor() {
    this.element = document.createElement("div");

    this.element.style.height = "100vh";
    this.element.style.width = "100vw";
    this.element.style.position = "absolute";
    this.element.style.top = "0";
    this.element.style.display = "flex";
    this.element.style.justifyContent = "center";
    this.element.style.alignItems = "center";
  }
}
