import {
  MathUtils,
  Group,
  Mesh,
} from 'three';

export interface MeshGroupProps {
  mesh: Array<Mesh|Group>
}

export function createMeshGroup(props: MeshGroupProps) {
  const { mesh } = props;
  const group = new Group();

  group.add(...mesh);

  // 物体旋转处理
  const radiansPerSecond = MathUtils.degToRad(30);
  (group as typeof group & { tick: Function }).tick = (delta) => {
    group.rotation.y += delta * radiansPerSecond;
  };

  return group;
}