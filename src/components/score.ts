import * as THREE from "three";
import { CSS2DObject } from "three/examples/jsm/renderers/CSS2DRenderer.js";
import World from "./world";

export class Score {
  public static score = 0;
  public static level = 0;
  public static softDropTally = 0;
  public static hardDropTally = 0;
  public static linesCleared = 0;
  public static totalLinesCleared = 0;
  scoreHTMLElement;
  levelHTMLElement;
  labelPlacement;

  constructor() {
    const scoreLabel = document.createElement("div");
    scoreLabel.textContent = "Score";
    scoreLabel.style.backgroundColor = "transparent";
    scoreLabel.style.color = "white";
    scoreLabel.style.fontSize = "1.7rem";

    this.scoreHTMLElement = document.createElement("div");
    this.scoreHTMLElement.textContent = String(Score.score);
    this.scoreHTMLElement.style.backgroundColor = "transparent";
    this.scoreHTMLElement.style.color = "white";
    this.scoreHTMLElement.style.fontSize = "1.7rem";

    const levelLabel = document.createElement("div");
    levelLabel.textContent = "Level";
    levelLabel.style.backgroundColor = "transparent";
    levelLabel.style.color = "white";
    levelLabel.style.fontSize = "1.7rem";

    this.levelHTMLElement = document.createElement("div");
    this.levelHTMLElement.textContent = String(Score.level);
    this.levelHTMLElement.style.backgroundColor = "transparent";
    this.levelHTMLElement.style.color = "white";
    this.levelHTMLElement.style.fontSize = "1.7rem";

    this.labelPlacement = new THREE.Group();

    const scoreLabel2D = new CSS2DObject(scoreLabel);
    const score2D = new CSS2DObject(this.scoreHTMLElement);
    const levelLabel2D = new CSS2DObject(levelLabel);
    const level2D = new CSS2DObject(this.levelHTMLElement);

    scoreLabel2D.position.set(0, 4, 0);
    score2D.position.set(0, 2, 0);
    level2D.position.set(0, -2, 0);

    this.labelPlacement.add(scoreLabel2D, score2D, levelLabel2D, level2D);
    this.labelPlacement.position.set(-8.1, 4, 0);
  }

  calculateScore() {
    Score.score += Score.softDropTally;
    Score.score += Score.hardDropTally * 2;
    Score.score += this.linesClearedPoints(Score.linesCleared);

    this.scoreHTMLElement.textContent = String(Score.score);

    Score.hardDropTally = 0;
    Score.softDropTally = 0;
    Score.linesCleared = 0;

    const newLevel = Math.floor(Score.totalLinesCleared / 10);

    if (newLevel !== Score.level) {
      World.time -= 20;
      Score.level = newLevel;
    }

    this.levelHTMLElement.textContent = String(Score.level);
  }

  linesClearedPoints(linesCleared: number) {
    if (linesCleared === 1) return 100;
    if (linesCleared === 2) return 300;
    if (linesCleared === 3) return 500;
    if (linesCleared === 4) return 800;
    return 0;
  }
}
