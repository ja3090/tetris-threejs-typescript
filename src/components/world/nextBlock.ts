import { RandomBlock } from "../blocks/randomBlock";
import * as THREE from "three";
import World from ".";
import { CSS2DObject } from "three/examples/jsm/renderers/CSS2DRenderer.js";

type RandomBlockReturn = ReturnType<RandomBlock["randomBlock"]>;

export class NextBlock {
  block: THREE.Group;
  world;
  labelPlacement;

  constructor(world: World, next: RandomBlockReturn["next"]) {
    this.world = world;
    const group = new THREE.Group().add(...next.block);
    this.block = group;
    this.block.position.set(17.5, 13.5, 0);

    this.labelPlacement = new THREE.Group();
    this.world.scene.add(this.block, this.labelPlacement);

    this.labelPlacement.position.set(17.5, 13.5, 0);

    const label = document.createElement("div");
    label.textContent = "Next";
    label.style.backgroundColor = "transparent";
    label.style.color = "white";
    label.style.fontSize = "1.7rem";

    const label2D = new CSS2DObject(label);
    label2D.position.set(0.6, 4, 0);
    this.labelPlacement.add(label2D);
  }

  enterNext(next: RandomBlockReturn["next"]) {
    this.world.scene.remove(this.block);

    const group = new THREE.Group().add(...next.block);
    this.block = group;
    this.block.position.set(17.5, 13.5, 0);
    this.world.scene.add(this.block);
  }
}
