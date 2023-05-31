// 设置tick
import { Clock } from "three";

const clock = new Clock();

export const loop = (camera, scene, renderer, update) => {
  const updatables = Array.isArray(update) ? update : []

  const injectTick = () => {
    const delta = clock.getDelta()

    for (const object of updatables) {
      object.tick(delta)
    }
  }
  
  const start = () => {
    renderer.setAnimationLoop(() => {
      injectTick()
      renderer.render(scene, camera)
    });
  }

  const stop = () => {
    renderer.setAnimationLoop(null)
  }

  return {
    start,
    stop
  }
}
