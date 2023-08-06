export type WithCoordsField = THREE.Object3D & {
  coords?: { x: number; y: number };
};

export type XMost<T extends string> = {
  [K in `${T}Most`]?: WithCoordsField[];
};

export type CustomThreeGroup = Omit<THREE.Group, "children"> & {
  children: (THREE.Group["children"][number] & {
    coords: { x: number; y: number };
  })[];
} & XMost<"left" | "right" | "down">;
