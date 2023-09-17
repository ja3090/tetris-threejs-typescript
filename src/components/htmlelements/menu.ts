export class Menu {
  element;

  constructor() {
    this.element = document.createElement("div");

    this.element.style.height = "fit-content";
    this.element.style.width = "fit-content";
    this.element.style.position = "absolute";
    this.element.style.backgroundColor = "black";
    this.element.style.zIndex = "100";
    this.element.style.textAlign = "center";
    this.element.style.padding = "20px";
  }
}
