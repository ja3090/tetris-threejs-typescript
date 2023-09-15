export class Text {
  element;
  constructor(text: string) {
    const el = document.createElement("p");

    el.textContent = text;

    this.element = el;
  }
}
