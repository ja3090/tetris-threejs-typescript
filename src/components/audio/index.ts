import { Speaker } from "./speaker";
import * as THREE from "three";

export class Speakers {
  speaker;
  speaker2;
  group;

  constructor() {
    this.speaker = new Speaker((2 * Math.PI) / 100);
    this.speaker2 = new Speaker(-(2 * Math.PI) / 100);
    this.speaker2.group.rotateZ(Math.PI);
    this.speaker.group.position.set(-35, 0, 0);
    this.speaker2.group.position.set(35, -13, 0);
    this.speaker.group.rotateY((2 * Math.PI) / 100);
    this.speaker2.group.rotateY((2 * Math.PI) / 100);

    this.group = new THREE.Group().add(this.speaker.group, this.speaker2.group);

    this.group.position.set(7.5, 15, -113);
  }
}
