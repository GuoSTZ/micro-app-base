import { WebGLRenderer } from 'three';

interface IProps {

}

export function createRenderer(props: IProps = {}) {
  const { ...restProps } = props;
  const renderer = new WebGLRenderer(restProps);
  return renderer;
}
