import THREE from "../utils/three";
import { NormalShader } from "./normalShader";
import { WorldUniforms } from "./world/worldUniforms";

export class Grid {
  public grid;
  shader;

  constructor() {
    this.shader = new NormalShader();

    const mesh = this.buildGrid();

    this.grid = mesh;
  }

  buildGrid() {
    const shader = () =>
      new THREE.ShaderMaterial({
        wireframe: true,
        uniforms: {
          ...WorldUniforms.values,
          u_plane_height: {
            type: "float",
            value: height,
          },
          u_plane_width: {
            type: "float",
            value: width,
          },
        },
        vertexShader: this.shader.vertex,
        fragmentShader: this.shader.fragment,
      });
    const group = new THREE.Group();

    const height = 68;
    const width = 39;
    const shapeMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(2, height, 2, height),
      shader()
    );

    const shapeMesh1 = new THREE.Mesh(
      new THREE.PlaneGeometry(width, 2, width, 2),
      shader()
    );

    const shapeMesh2 = new THREE.Mesh(
      new THREE.PlaneGeometry(2, height, 2, height),
      shader()
    );

    shapeMesh.position.set(-(width / 2 - 1), 0, 0);
    shapeMesh1.position.set(0, -(height / 2) - 1, 0);
    shapeMesh2.position.set(width / 2 - 1, 0, 0);

    group.add(shapeMesh, shapeMesh1, shapeMesh2);
    group.position.set(7.5, 9.5, -120);

    return group;
  }
}
