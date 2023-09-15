import { Container } from "./htmlelements/container";
import { Menu } from "./htmlelements/menu";
import { Text } from "./htmlelements/text";

export class StartScreen {
  container;

  constructor() {
    this.container = new Container().element;
    document.getElementById("app")?.appendChild(this.container);

    const menu = new Menu().element;

    this.container.appendChild(menu);

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
    grid.appendChild(new Text("Hard Drop").element);

    const space = this.createKey("Spacebar");

    grid.appendChild(space);
    grid.appendChild(new Text("Clockwise Rotate").element);

    const Z = this.createKey("Z");

    grid.appendChild(Z);
    grid.appendChild(new Text("Anti-clockwise Rotate").element);

    const arrowKeys = document.createElement("div");

    arrowKeys.style.display = "flex";

    const down = this.createKey("<p>&darr;</p>");
    const left = this.createKey("<p>&larr;</p>");
    const right = this.createKey("<p>&rarr;</p>");

    arrowKeys.appendChild(left);
    arrowKeys.appendChild(down);
    arrowKeys.appendChild(right);

    grid.appendChild(arrowKeys);
    grid.appendChild(new Text("Movement Keys").element);
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
}
