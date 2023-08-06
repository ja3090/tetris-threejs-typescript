import THREE from "../utils/three";

export class Grid {
  public grid;

  constructor() {
    const gridHelper = () => new THREE.GridHelper(10, 10);

    const grid1 = gridHelper();
    const grid2 = gridHelper();

    grid1.position.z = -5;
    grid2.position.z = 5;

    const grid = new THREE.Group().add(grid1, grid2);

    grid.rotation.set(Math.PI / 2, Math.PI, 0);

    this.grid = grid;
  }
}
