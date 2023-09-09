import { Subwoofer } from "./subwoofer";
import * as THREE from "three";

export class Speaker {
  bottom: Subwoofer;
  top: Subwoofer;
  group: THREE.Group;

  constructor(rotation: number) {
    this.bottom = new Subwoofer(30, rotation);
    this.bottom.mesh.position.set(-10, -23, -12);
    this.top = new Subwoofer(30, rotation);
    this.top.mesh.position.set(-10, 10, -12);

    const speakerFrame = this.frame(rotation);

    speakerFrame.position.set(-10, -6.5, -12);

    this.group = new THREE.Group().add(
      this.bottom.mesh,
      this.top.mesh,
      speakerFrame
    );
  }

  frame(rotation: number) {
    const height = 72;
    const width = 40;

    const color = 0x191932;

    const shader = () =>
      new THREE.MeshBasicMaterial({
        wireframe: true,
        color,
      });

    const shapeMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(2, height, 2, height),
      shader()
    );
    const shapeMesh2 = new THREE.Mesh(
      new THREE.PlaneGeometry(width, 2, width, 2),
      shader()
    );
    const shapeMesh3 = new THREE.Mesh(
      new THREE.PlaneGeometry(2, height, 2, height),
      shader()
    );
    const shapeMesh4 = new THREE.Mesh(
      new THREE.PlaneGeometry(width, 2, width, 2),
      shader()
    );

    shapeMesh.position.set(-(width / 2 - 1), 0, 0);
    shapeMesh2.position.set(0, height / 2 - 1, 0);
    shapeMesh3.position.set(width / 2 - 1, 0, 0);
    shapeMesh4.position.set(0, -(height / 2 - 1), 0);

    const speakerFrame = new THREE.Group().add(
      shapeMesh,
      shapeMesh2,
      shapeMesh3,
      shapeMesh4
    );

    return new THREE.Group().add(this.bottom.mesh, this.top.mesh, speakerFrame);
  }
}
