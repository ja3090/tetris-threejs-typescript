import { WithCoordsField } from "../types/blockTypes";
import THREE from "../utils/three";

export default class Square {
  public square: WithCoordsField;

  constructor() {
    this.square = this.createSquare();
  }

  private createSquare() {
    let allBlocks = [];

    let vertices1 = [];

    vertices1.push(0, 0, 0);
    vertices1.push(0, 1, 0);
    vertices1.push(0, 0, 1);

    allBlocks.push(this.createBlock(vertices1));

    let vertices2 = [];

    vertices2.push(0, 1, 0);
    vertices2.push(0, 1, 1);
    vertices2.push(0, 0, 1);

    allBlocks.push(this.createBlock(vertices2));

    const square = new THREE.Group();
    square.add(...allBlocks);

    return square;
  }

  private createBlock(vertices: number[]) {
    const geometry = new THREE.BufferGeometry();

    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(vertices, 3)
    );

    const material = new THREE.MeshBasicMaterial({
      color: 0xff0000,
      side: THREE.DoubleSide,
    });

    const mesh = new THREE.Mesh(geometry, material);

    return mesh;
  }
}
