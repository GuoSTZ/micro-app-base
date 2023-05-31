import { PerspectiveCamera } from 'three';

export function createCamera(
  fov: number = 35,
  aspect: number = 1,
  near: number = 0.1,
  far: number = 100
) {
  const camera = new PerspectiveCamera(fov, aspect, near, far);

  // 设置相机的默认位置
  camera.position.set(0, 0, 10);

  return camera;
}
