import THREE from "../utils/three";
import { NormalShader } from "./normalShader";
import { WorldUniforms } from "./world/worldUniforms";

export class Grid {
  public grid;
  shader;

  height = 68;
  width = 39;
  uniforms = {
    ...WorldUniforms.values,
    u_plane_height: {
      type: "float",
      value: this.height,
    },
    u_plane_width: {
      type: "float",
      value: this.width,
    },
  };

  constructor() {
    this.shader = new NormalShader();

    const mesh = this.buildGrid();

    this.grid = mesh;
  }

  buildGrid() {
    const shader = () =>
      new THREE.ShaderMaterial({
        wireframe: true,
        uniforms: this.uniforms,
        vertexShader: this.shader.vertex,
        fragmentShader: this.shader.fragment,
      });
    const group = new THREE.Group();

    const shapeMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(2, this.height, 2, this.height),
      shader()
    );

    const shapeMesh1 = new THREE.Mesh(
      new THREE.PlaneGeometry(this.width, 2, this.width, 2),
      shader()
    );

    const shapeMesh2 = new THREE.Mesh(
      new THREE.PlaneGeometry(2, this.height, 2, this.height),
      shader()
    );

    shapeMesh.position.set(-(this.width / 2 - 1), 0, 0);
    shapeMesh1.position.set(0, -(this.height / 2) - 1, 0);
    shapeMesh2.position.set(this.width / 2 - 1, 0, 0);

    group.add(shapeMesh, shapeMesh1, shapeMesh2);
    group.position.set(7.5, 9.5, -120);

    return group;
  }
}
