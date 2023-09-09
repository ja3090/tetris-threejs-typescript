import THREE from "../utils/three";

export class Grid {
  public grid;

  constructor() {
    const path = new THREE.Path();

    path.lineTo(0, 20);
    path.lineTo(0, 0);
    path.lineTo(10, 0);
    path.lineTo(10, 20);

    const points = path.getPoints();

    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({
      color: 0xffffff,
    });

    const mesh = new THREE.Line(geometry, material);

    this.grid = mesh;
  }
}
