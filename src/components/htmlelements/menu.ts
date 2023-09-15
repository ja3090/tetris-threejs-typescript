export class Menu {
  element;

  constructor() {
    this.element = document.createElement("div");

    this.element.style.height = "60vh";
    this.element.style.width = "60vw";
    this.element.style.position = "absolute";
    this.element.style.backgroundColor = "black";
    this.element.style.zIndex = "100";
    this.element.style.textAlign = "center";
  }
}
