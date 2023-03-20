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
  TextureLoader
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
    color: string;
  },
  animation?: {
    deg: number;
  }
}

export function createCube(props: cubeProps = {}) {
  const {
    geometry: geometryProps,
    material: materialProps,
    animation
  } = props;

  const geometry = new gemoetries[geometryProps.type](...geometryProps.size);
  const material = createMatetial(materialProps)
  const cube = new Mesh(geometry, material);
  cube.rotation.set(-0.5, -0.1, 0.8);

  const radiansPerSecond = MathUtils.degToRad(animation.deg);
  (cube as typeof cube & { tick: Function }).tick = (delta) => {
    // increase the cube's rotation each frame
    cube.rotation.z += radiansPerSecond * delta;
    cube.rotation.x += radiansPerSecond * delta;
    cube.rotation.y += radiansPerSecond * delta;
  };

  return cube;
}

const createMatetial = materialProps => {
  const textureLoader = new TextureLoader()
  const texture = textureLoader.load('/images/uv-test-bw.png')
  const material = new MeshStandardMaterial({
    // color: 'red',
    map: texture,
  })
  return material
}
