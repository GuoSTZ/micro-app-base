import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export function createControls(camera, canvas) {
  const controls = new OrbitControls(camera, canvas);

  // 开启阻尼
  controls.enableDamping = true;
  // 禁用鼠标右键平移物体
  // controls.enablePan = false

  // 可以一键配置控件的启用/禁用
  // controls.enabled = false;
  // 也可以分开控制控件的旋转，平移，缩放等
  // controls.enableRotate = false;
  // controls.enableZoom = false;
  // controls.enablePan = false;

  // 控件自动旋转，已经自动渲染的速度
  // controls.autoRotate = true;
  // controls.autoRotateSpeed = 1;

  // 控制控件放大和缩小的距离
  // controls.minDistance = 5;
  // controls.maxDistance = 20;

  // 控制控件的水平旋转 - 弧度
  // controls.minAzimuthAngle = - Infinity; // default
  // controls.maxAzimuthAngle = Infinity; // default

  // 控制控件的垂直旋转 - 弧度
  // controls.minPolarAngle = 0; // default
  // controls.maxPolarAngle = Math.PI; // default

  (controls as typeof controls & { tick: Function }).tick = () => controls.update();

  return controls;
}
