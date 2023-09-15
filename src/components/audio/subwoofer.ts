import * as THREE from "three";
import { Shader } from "./audioShaders";
import { AudioProcessor as Audio } from "./processor";
import { WorldUniforms } from "../world/worldUniforms";

export class Subwoofer {
  mesh: THREE.Mesh;
  shader: Shader;
  height = 35;
  width = 35;
  rotation: number;

  constructor(height: number, rotation: number) {
    this.height = height;
    this.width = height;
    this.shader = new Shader();
    this.rotation = rotation;
    this.mesh = this.buildShape();
  }

  buildShape() {
    const planeGeo = new THREE.PlaneGeometry(
      this.width,
      this.height,
      this.width,
      this.height
    );
    const options = {
      vertexShader: this.shader.vertex,
      fragmentShader: this.shader.fragment,
      uniforms: {
        ...WorldUniforms.values,
        ...Audio.uniforms,
        u_plane_height: {
          type: "int",
          value: this.height,
        },
        u_plane_width: {
          type: "int",
          value: this.width,
        },
        u_rotation: {
          type: "float",
          value: this.rotation,
        },
      },
      wireframe: true,
    };
    const planeMat = new THREE.ShaderMaterial(options);

    return new THREE.Mesh(planeGeo, planeMat);
  }

  //   tick(delta: number) {
  //     this.mesh.rotateY((Math.PI * delta) / 16);
  //     this.mesh.rotateX((Math.PI * delta) / 10);
  //   }
}
