import React from 'react';
import { Button, ButtonProps } from 'antd';

export interface StepsButtonProps extends ButtonProps {
  /** 自定义按钮文字 */
  text?: string;
  /** 是否渲染按钮 */
  renderable?: boolean;
}

const StepsButton = (props: StepsButtonProps) => {
  const { children, renderable = true, text, ...restProps } = props;

  if (!renderable) {
    return null;
  }

  return (
    <Button {...restProps}>
      {text ?? children}
    </Button>
  )
}

export default StepsButton;