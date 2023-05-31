import {
  BoxGeometry,
  BufferGeometry,
  CircleGeometry,
  ConeGeometry,
  CylinderGeometry,
  DodecahedronGeometry,
  EdgesGeometry,
  ExtrudeGeometry,
  IcosahedronGeometry,
  LatheGeometry,
  OctahedronGeometry,
  PlaneGeometry,
  PolyhedronGeometry,
  RingGeometry,
  ShapeGeometry,
  SphereGeometry,
  TetrahedronGeometry,
  TorusGeometry,
  TorusKnotGeometry,
  TubeGeometry,
  WireframeGeometry,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  MathUtils,
  TextureLoader,
  EulerOrder
} from 'three';

const gemoetries = {
  BoxGeometry,
  BufferGeometry,
  CircleGeometry,
  ConeGeometry,
  CylinderGeometry,
  DodecahedronGeometry,
  // EdgesGeometry,
  // ExtrudeGeometry,
  IcosahedronGeometry,
  // LatheGeometry,
  OctahedronGeometry,
  PlaneGeometry,
  // PolyhedronGeometry,
  RingGeometry,
  // ShapeGeometry,
  SphereGeometry,
  TetrahedronGeometry,
  TorusGeometry,
  TorusKnotGeometry,
  // TubeGeometry,
  // WireframeGeometry,
}

interface cubeProps {
  geometry?: {
    type?: keyof typeof gemoetries,
    size: number[];
  };
  material?: {
    color?: string;
    flatShading?: boolean,
  },
  animation?: {
    deg: [number, number, number];
  },
  rotation?: [number, number, number, EulerOrder?];
  position?: [number, number, number]
}

export function createCube(props: cubeProps = {}) {
  const {
    geometry: geometryProps,
    material: materialProps,
    animation,
    rotation,
    position
  } = props;

  const geometry = new gemoetries[geometryProps.type](...geometryProps.size);
  const material = createMatetial(materialProps)
  const cube = new Mesh(geometry, material);
  rotation && cube.rotation.set(...rotation);
  position && cube.position.set(...position);

  // 动画效果处理
  if(animation) {
    const radiansPerSecondX = MathUtils.degToRad(animation.deg[0] || 0);
    const radiansPerSecondY = MathUtils.degToRad(animation.deg[1] || 0);
    const radiansPerSecondZ = MathUtils.degToRad(animation.deg[2] || 0);

    (cube as typeof cube & { tick: Function }).tick = (delta) => {
      // increase the cube's rotation each frame
      cube.rotation.x += radiansPerSecondX * delta;
      cube.rotation.y += radiansPerSecondY * delta;
      cube.rotation.z += radiansPerSecondZ * delta;
    };
  }

  return cube;
}

const createMatetial = materialProps => {
  // 材质加载，目前还未放出属性
  const textureLoader = new TextureLoader()
  // const texture = textureLoader.load('/images/uv-test-bw.png')
  const material = new MeshStandardMaterial({
    // map: texture,
    ...materialProps
  })
  return material
}
