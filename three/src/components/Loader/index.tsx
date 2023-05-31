import React, { useEffect, useMemo, useRef, useState } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import {
  createAnimationMixer,
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

export interface ILoaderProps {
  animation?: {
    start?: boolean;
  }
}

export default (props) => {
  const { animation } = props;
  const ref = useRef(null);
  const loader = new GLTFLoader();
  const camera = createCamera();
  const scene = createScene({ color: 'skyblue' });
  const renderer = createRenderer({
    antialias: true
  });
  const { mainLight, ambientLight } = createLights()
  const controls = createControls(camera, renderer.domElement)
  controls.target.set(7.5, 0, -10)

  scene.add(mainLight, ambientLight)

  const setupModel = data => {
    const model = data?.scene?.children?.[0];
    const clip = data?.animations?.[0];
    const mixer = createAnimationMixer(model);
    const action = mixer.clipAction(clip);
    action.play();
  
    model.tick = (delta) => mixer.update(delta);

    return model;
  }

  const loaderModel = async (path: string[]) => {
    const data = await Promise.all(
      path.map(item => loader.loadAsync(item))
    )
    return data.map(item => {
      return setupModel(item)
    })
  }

  const init = async () => {
    const [flamingo, parrot, stork] = await loaderModel([
      '/assets/models/Flamingo.glb',
      '/assets/models/Parrot.glb',
      '/assets/models/Stork.glb'
    ])
    flamingo.position.set(7.5, 0, -10);
    parrot.position.set(0, 0, 2.5);
    stork.position.set(0, -2.5, -10);

    const mGroup = createMeshGroup({
      mesh: [flamingo, parrot, stork]
    })
    scene.add(mGroup)

    ref.current.appendChild(renderer.domElement)
    const resizer = new Resizer(ref.current, camera, renderer)

    controls.addEventListener('change', () => {
      render()
    });

    const { start } = loop(camera, scene, renderer, [flamingo, parrot, stork])
    start()

    render()
  }

  useEffect(() => {
    init()
  }, [])

  const { start, stop } = useMemo(() => {
    return loop(camera, scene, renderer, [])
  }, [])

  useEffect(() => {
    // animation?.start ? start() : stop()
  }, [animation?.start])

  const render = () => {
    renderer.render(scene, camera);
  }

  return (
    <div ref={ref} className="container">
    </div>
  )
}