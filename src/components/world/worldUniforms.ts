import World from ".";
import { Utils } from "../../utils/Utils";

export class WorldUniforms {
  colIndex = 0;
  colours;
  static readonly initialCols = [0.2, 0.48, 0.58];
  static readonly upperLimits = [0.4, 0.65, 0.9];
  public static values = {
    u_time: {
      type: "f",
      value: 2.0,
    },
    u_amplitude: {
      type: "f",
      value: 4.0,
    },
    u_data_arr: {
      type: "float[64]",
      value: new Uint8Array(),
    },
    u_delta: {
      type: "float",
      value: 0,
    },
    u_resolution_height: {
      type: "float",
      value: 0,
    },
    u_resolution_width: {
      type: "float",
      value: 0,
    },
    u_red: {
      type: "float",
      value: WorldUniforms.initialCols[0],
    },
    u_green: {
      type: "float",
      value: WorldUniforms.initialCols[1],
    },
    u_blue: {
      type: "float",
      value: WorldUniforms.initialCols[2],
    },
  };

  constructor() {
    const { u_red, u_blue, u_green } = WorldUniforms.values;
    this.colours = [u_red, u_green, u_blue];
  }

  tick() {
    const prevIndex = Utils.trueMod(this.colIndex - 1, this.colours.length);
    const index = Utils.trueMod(this.colIndex, this.colours.length);

    if (this.colours[index].value >= WorldUniforms.upperLimits[index]) {
      this.colIndex++;
      return;
    }

    this.colours[index].value += 0.0001;
    this.colours[prevIndex].value -= 0.0001;
  }
}
