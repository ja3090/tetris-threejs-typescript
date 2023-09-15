import { Blocks } from "../blocks/blockPositions";
import { Shuffle } from "../shuffle";
import World from "../world";
import THREE from "../../utils/three";
import { Utils } from "../../utils/Utils";
import { Shader } from "./shaders";
import { WorldUniforms } from "../world/worldUniforms";

type WithTick = THREE.Group & { tick?: (delta: number) => void };

export class RainingBlocks extends Shuffle {
  world;
  shuffledBlocks;
  blockSize = 10;
  minTime = 3;
  maxTime = 9;
  startingHeight = 175;
  distanceAway = -150;
  shader;
  uniforms = {
    ...WorldUniforms.values,
    u_block_size: {
      type: "float",
      value: this.blockSize,
    },
  };

  constructor(world: World) {
    super();
    this.world = world;
    const { prototype, ...rest } = Blocks;
    const shuffled = this.shuffle(rest);
    this.shuffledBlocks = [...shuffled, ...shuffled, ...shuffled, ...shuffled];
    this.shader = new Shader();
    this.buildBlocks();
  }

  buildBlocks() {
    this.shuffledBlocks.forEach((block) => {
      const blockGroup: WithTick = new THREE.Group();

      const randomTime = Utils.randomNumber(50, 6);
      const randomRotationRate = Utils.randomNumber(8, -8);
      const uniforms = {
        u_data_arr: WorldUniforms.values.u_data_arr,
        u_block_size: {
          type: "float",
          value: this.blockSize,
        },
        u_red: {
          type: "float",
          value: Utils.randomNumber(6, 2) / 10,
        },
        u_green: {
          type: "float",
          value: Utils.randomNumber(8, 2) / 10,
        },
        u_blue: {
          type: "float",
          value: Utils.randomNumber(8, 2) / 10,
        },
      };

      for (const [x, y] of block[0]) {
        const geo = new THREE.BoxGeometry(
          this.blockSize,
          this.blockSize,
          this.blockSize
        );

        const mat = new THREE.ShaderMaterial({
          wireframe: true,
          fragmentShader: this.shader.fragment,
          vertexShader: this.shader.vertex,
          uniforms,
          transparent: true,
        });

        const mesh = new THREE.Mesh(geo, mat);
        const newXY = {
          x: x * this.blockSize,
          y: y * this.blockSize,
        };

        blockGroup.add(mesh);

        mesh.position.set(newXY.x, newXY.y, 0);
      }

      const startingHeight = Utils.randomNumber(
        this.startingHeight * 2.5,
        this.startingHeight * 1.5
      );

      blockGroup.position.set(
        Utils.randomNumber(-275, 275),
        startingHeight,
        Utils.randomNumber(this.distanceAway * 3, this.distanceAway)
      );

      blockGroup.tick = (delta: number) => {
        blockGroup.position.y -= randomTime * delta;
        blockGroup.rotation.z += Math.PI * (delta / randomRotationRate);

        if (blockGroup.position.y <= -startingHeight) {
          blockGroup.position.y = startingHeight;
        }
      };

      this.world.scene.add(blockGroup);
      this.world.loop.updatables.push(blockGroup);
    });
  }
}
