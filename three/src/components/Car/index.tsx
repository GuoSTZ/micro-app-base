import React, { useEffect, useMemo, useRef } from 'react';
import {
  createCamera,
  createCube,
  createMeshGroup, 
  createScene, 
  createLights, 
  createControls, 
  createRenderer
} from '../_utils/creators';
import { Resizer } from '../_utils/Resizer';
import { loop } from '../_utils/loop';
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

  const carBody = createCube({
    geometry: {
      type: 'CylinderGeometry',
      size: [0.75, 0.75, 3, 12]
    },
    material: {
      color: 'firebrick',
      flatShading: true,
    },
    rotation: [0, 0, Math.PI / 2],
    position: [-1, 1, 0]
  });

  const tire1 = createCube({
    geometry: {
      type: 'CylinderGeometry',
      size: [0.4, 0.4, 1.75, 16]
    },
    material: {
      color: 'darkslategray',
      flatShading: true,
    },
    animation: {
      deg: [0, 24, 0]
    },
    rotation: [Math.PI / 2, 0, 0],
    position: [0, 0.5, 0]
  })

  // 对于createCube的自定义属性，例如animation等，并不会拷贝成功，因此直接将tire2，3，4放入loop方法中时，会报错没有tick方法
  const tire2 = tire1.clone()
  tire2.position.x = -1

  const tire3 = tire1.clone()
  tire3.position.x = -2

  const tire4 = tire1.clone()
  tire4.position.set(1.5, 0.9, 0)
  tire4.scale.set(2, 1.25, 2)

  const carHead = createCube({
    geometry: {
      type: 'BoxGeometry',
      size: [2, 2.25, 1.8]
    },
    material: {
      color: 'firebrick',
      flatShading: true,
    },
    // rotation: [0, 0, Math.PI / 2]
    position: [1.5, 1.4, 0]
  });

  const chimney = createCube({
    geometry: {
      type: 'CylinderGeometry',
      size: [0.3, 0.1, 0.5]
    },
    material: {
      color: 'darkslategray',
      flatShading: true,
    },
    rotation: [0, 0, 0],
    position: [-2, 1.9, 0]
  });

  const meshGroup = createMeshGroup({
    mesh: [
      tire1,
      tire2,
      tire3,
      tire4,
      carBody,
      carHead,
      chimney
    ]
  });
  meshGroup.rotation.set(Math.PI / 4, Math.PI / 4, 0)

  const {mainLight, ambientLight} = createLights()
  const controls = createControls(camera, renderer.domElement)

  scene.add(mainLight, ambientLight, meshGroup)

  useEffect(() => {
    ref.current.appendChild(renderer.domElement)
    const resizer = new Resizer(ref.current, camera, renderer)
    controls.addEventListener('change', () => {
      render()
    });
    render()
  }, [])
  
  const {start, stop} = useMemo(() => {
    return loop(camera, scene, renderer, [controls, tire1])
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