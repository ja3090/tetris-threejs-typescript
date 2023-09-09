import { WithCoordsField } from "../types/blockTypes";
import THREE from "../utils/three";

export default class Square {
  public square: WithCoordsField;

  constructor() {
    this.square = this.createSquare();
  }

  private createSquare() {
    const block = this.createBlock();

    const square = new THREE.Group();

    square.add(block);

    square.position.y += 0.2;

    return square;
  }

  private createBlock() {
    const shape = new THREE.Shape();

    shape.lineTo(0, 0.6);
    shape.quadraticCurveTo(0, 0.8, 0.2, 0.8);
    // shape.lineTo(0.8, 0.8);
    shape.quadraticCurveTo(1, 0.8, 1, 0.6);
    // shape.lineTo(1, 0);
    shape.quadraticCurveTo(1, -0.2, 0.8, -0.2);
    // shape.lineTo(0.2, -0.2);
    // shape.quadraticCurveTo(0, -0.2, 0, 0);

    const geometry = new THREE.ShapeGeometry(shape);
    const material = new THREE.MeshBasicMaterial({
      color: "white",
    });

    const mesh = new THREE.Mesh(geometry, material);

    mesh.position.y += 0.2;

    return mesh;
  }
}
