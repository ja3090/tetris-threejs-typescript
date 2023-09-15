export class StartScreen {
  container;

  constructor() {
    const container = document.createElement("div");
    this.container = container;

    container.style.height = "100vh";
    container.style.width = "100vw";
    container.style.position = "absolute";
    container.style.top = "0";
    container.style.display = "flex";
    container.style.justifyContent = "center";
    container.style.alignItems = "center";
    document.getElementById("app")?.appendChild(container);

    const menu = document.createElement("div");

    menu.style.height = "60vh";
    menu.style.width = "60vw";
    menu.style.position = "absolute";
    menu.style.backgroundColor = "black";
    menu.style.zIndex = "100";
    menu.style.textAlign = "center";

    container.appendChild(menu);

    const pressSpaceToStart = document.createElement("p");

    pressSpaceToStart.textContent = "Press Space to Start!";
    menu.appendChild(pressSpaceToStart);

    const grid = document.createElement("div");

    grid.style.display = "grid";
    grid.style.gridTemplateColumns = "4";
    grid.style.justifyItems = "center";

    menu.appendChild(grid);

    const ctrl = this.createKey("ctrl");

    grid.appendChild(ctrl);
    grid.appendChild(this.text("Hard Drop"));

    const space = this.createKey("Spacebar");

    grid.appendChild(space);
    grid.appendChild(this.text("Clockwise Rotate"));

    const Z = this.createKey("Z");

    grid.appendChild(Z);
    grid.appendChild(this.text("Anti-clockwise Rotate"));

    const arrowKeys = document.createElement("div");

    arrowKeys.style.display = "flex";

    const down = this.createKey("<p>&darr;</p>");
    const left = this.createKey("<p>&larr;</p>");
    const right = this.createKey("<p>&rarr;</p>");

    arrowKeys.appendChild(left);
    arrowKeys.appendChild(down);
    arrowKeys.appendChild(right);

    grid.appendChild(arrowKeys);
    grid.appendChild(this.text("Movement Keys"));
  }

  createKey(text: string) {
    const domNode = document.createElement("div");

    domNode.style.width = "fit-content";
    domNode.style.height = "fit-content";
    domNode.style.padding = "5px";
    domNode.style.margin = "2px";
    domNode.style.marginTop = "30px";
    domNode.style.borderRadius = "4px";
    domNode.style.backgroundColor = "darkgray";
    domNode.style.justifyContent = "center";
    domNode.style.alignItems = "center";
    domNode.innerHTML = text;

    return domNode;
  }

  text(text: string) {
    const el = document.createElement("p");

    el.textContent = text;

    return el;
  }
}
