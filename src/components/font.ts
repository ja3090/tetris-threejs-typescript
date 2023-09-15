import {
  FontLoader,
  Font as THREEFont,
} from "three/addons/loaders/FontLoader.js";

export class Font {
  constructor(callBack: (font: THREEFont) => void) {
    this.buildFont(callBack);
  }

  buildFont(callBack: (font: THREEFont) => void) {
    const loader = new FontLoader();
    loader.load("/press-start-font.json", callBack);
  }
}
