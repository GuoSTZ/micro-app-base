import { AnimationMixer } from 'three';

export function createAnimationMixer(obj) {
  const mixer = new AnimationMixer(obj);
  return mixer;
}
