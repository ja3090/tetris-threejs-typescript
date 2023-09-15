import { NormalShader } from "../normalShader";
import { WorldUniforms } from "../world/worldUniforms";
import { Subwoofer } from "./subwoofer";
import * as THREE from "three";

export class Speaker {
  top: Subwoofer;
  group: THREE.Group;
  shader;
  height = 72;
  width = 40;
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

  constructor(rotation: number) {
    this.top = new Subwoofer(30, rotation);
    this.top.mesh.position.set(-10, 10, -12);

    this.shader = new NormalShader();

    const speakerFrame = this.frame();

    speakerFrame.position.set(-10, -6.5, -12);

    this.group = new THREE.Group().add(this.top.mesh, speakerFrame);
  }

  frame() {
    const shader = () =>
      new THREE.ShaderMaterial({
        wireframe: true,
        uniforms: this.uniforms,
        vertexShader: this.shader.vertex,
        fragmentShader: this.shader.fragment,
      });

    const shapeMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(2, this.height, 2, this.height),
      shader()
    );
    const shapeMesh2 = new THREE.Mesh(
      new THREE.PlaneGeometry(this.width, 2, this.width, 2),
      shader()
    );
    const shapeMesh3 = new THREE.Mesh(
      new THREE.PlaneGeometry(2, this.height, 2, this.height),
      shader()
    );
    const shapeMesh4 = new THREE.Mesh(
      new THREE.PlaneGeometry(this.width, 2, this.width, 2),
      shader()
    );

    shapeMesh.position.set(-(this.width / 2 - 1), 0, 0);
    shapeMesh2.position.set(0, this.height / 2 - 1, 0);
    shapeMesh3.position.set(this.width / 2 - 1, 0, 0);
    shapeMesh4.position.set(0, -(this.height / 2 - 1), 0);

    const speakerFrame = new THREE.Group().add(
      shapeMesh,
      shapeMesh2,
      shapeMesh3,
      shapeMesh4
    );

    return new THREE.Group().add(this.top.mesh, speakerFrame);
  }
}
