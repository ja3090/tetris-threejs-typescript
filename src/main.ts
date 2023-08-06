import World from "./components/world";

const world = new World();

world.animate();

world.renderer.setAnimationLoop(world.animate.bind(world));
