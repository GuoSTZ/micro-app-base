import { debounce, throttle } from "./tools";

const handlerSize = (container, camera, renderer) => {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
}

export class Resizer {
  constructor(container, camera, renderer) {
    handlerSize(container, camera, renderer)

    const debouncedHandlerSize = throttle(() => {
      handlerSize(container, camera, renderer)
      this.onResize()
    }, 250);

    window.addEventListener("resize", debouncedHandlerSize);
  }

  // 供外部定义
  onResize() {}
}