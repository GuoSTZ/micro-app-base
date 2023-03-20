import React, { useEffect, useMemo, useRef } from 'react';
import { createCamera } from './creators/camera';
import { createCube } from './creators/cube';
import { createScene } from './creators/scene';
import { createRenderer } from './creators/renderer';
import { createLights } from './creators/lights';
import { createControls } from './creators/controls';
import { Resizer } from './utils/Resizer';
import { loop } from './utils/loop';
import './index.less';

interface WorldProps {
  animation?: {
    start?: boolean;
  }
}

export default (props: WorldProps) => {
  const { animation } = props

  const ref = useRef<any>();
  const camera = createCamera();
  const scene = createScene({color: 'skyblue'});
  const renderer = createRenderer({
    antialias: true
  });
  const cube = createCube({
    geometry: {
      type: 'BoxGeometry',
      size: [2, 2, 2]
    },
    material: {
      color: 'purple'
    },
    animation: {
      deg: 30
    }
  });
  const {mainLight, ambientLight} = createLights()
  const controls = createControls(camera, renderer.domElement)

  scene.add(cube, mainLight, ambientLight)

  useEffect(() => {
    ref.current.appendChild(renderer.domElement)
    const resizer = new Resizer(ref.current, camera, renderer)
    controls.addEventListener('change', () => {
      render()
    });
    render()
  }, [])
  
  const {start, stop} = useMemo(() => {
    return loop(camera, scene, renderer, [controls])
  }, [])

  useEffect(() => {
    animation?.start ? start() : stop()
  }, [animation?.start])

  const render = () => {
    renderer.render(scene, camera);
  }

  return (
    <div ref={ref} className="container">
    </div>
  )
}