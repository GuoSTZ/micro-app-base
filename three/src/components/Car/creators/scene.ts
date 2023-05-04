import { Scene, Color } from 'three';

interface SceneProps {
  color?: string;
}

export function createScene(props: SceneProps = {}) {
  const { color } = props;

  const scene = new Scene();
  color && (scene.background =  new Color(color))
  return scene;
}
