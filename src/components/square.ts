import { WithCoordsField } from "../types/blockTypes";
import THREE from "../utils/three";
import { NormalShader } from "./normalShader";
import { WorldUniforms } from "./world/worldUniforms";

export default class Square {
  public square: WithCoordsField;
  public shader;
  uniforms = {
    ...WorldUniforms.values,
    u_plane_height: {
      type: "float",
      value: 2.0,
    },
    u_plane_width: {
      type: "float",
      value: 2.0,
    },
  };

  constructor() {
    this.shader = new NormalShader();
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
    shape.lineTo(0.8, 0.8);
    shape.quadraticCurveTo(1, 0.8, 1, 0.6);
    shape.lineTo(1, 0);
    shape.quadraticCurveTo(1, -0.2, 0.8, -0.2);
    shape.lineTo(0.2, -0.2);
    shape.quadraticCurveTo(0, -0.2, 0, 0);

    const geometry = new THREE.ShapeGeometry(shape);
    const material = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: this.shader.vertex,
      fragmentShader: this.shader.fragment,
    });

    const mesh = new THREE.Mesh(geometry, material);

    mesh.position.y += 0.2;

    return mesh;
  }
}
