/** 创建灯光 */
import { 
  AmbientLight,
  DirectionalLight,
  HemisphereLight,
  PointLight,
  SpotLight,
  RectAreaLight,
} from 'three';

export function createLights() {
  const ambientLight = new HemisphereLight('white', 'darkslategrey', 1);
  // 创建强度为8的白光
  const mainLight = new DirectionalLight('white', 1);
  mainLight.position.set(10, 13, 10);

  return {mainLight, ambientLight};
}