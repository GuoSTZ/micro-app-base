import {
  SphereGeometry,
  Group,
  MathUtils,
  Mesh,
  MeshStandardMaterial,
} from 'three';

export function createMeshGroup() {
  const group = new Group();
  // 将widthSegments和heightSegments设置为16可以让我们在质量和性能之间取得不错的平衡，只要我们不要放大得太近。通过这些设置，每个球体将由480个小三角形组成
  const geometry = new SphereGeometry(0.25, 16, 16);
  const material = new MeshStandardMaterial({
    color: 'indigo',
  });

  const protoSphere = new Mesh(geometry, material);
  group.add(protoSphere);

  for (let i = 0; i < 1; i += 0.05) {
    const sphere = protoSphere.clone();
    sphere.position.x = Math.cos(2 * Math.PI * i);
    sphere.position.y = Math.sin(2 * Math.PI * i);
    // sphere.position.z = -i * 5;
    sphere.scale.multiplyScalar(0.01 + i);
    group.add(sphere);
  }

  group.scale.multiplyScalar(2);

  const radiansPerSecond = MathUtils.degToRad(30);
  (group as typeof group & { tick: Function }).tick = (delta) => {
    group.rotation.z += delta * radiansPerSecond;
  };

  return group;
}