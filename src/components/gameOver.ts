import { Container } from "./htmlelements/container";
import { Menu } from "./htmlelements/menu";
import { Text } from "./htmlelements/text";
import { Score } from "./score";

export class GameOver {
  container;
  menu;

  constructor() {
    this.container = new Container().element;
    this.menu = new Menu().element;

    document.getElementById("app")?.appendChild(this.container);

    const gameOver = new Text("GAME OVER").element;

    this.container.appendChild(this.menu);

    this.menu.appendChild(gameOver);

    this.menu.appendChild(new Text("Score: " + String(Score.score)).element);

    this.menu.appendChild(new Text("Press spacebar to play again!").element);
  }
}
