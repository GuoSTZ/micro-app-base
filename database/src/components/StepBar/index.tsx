import React, { useRef, useState, ReactNode, cloneElement, ReactElement } from 'react';
import { Steps, StepProps, StepsProps } from 'antd';
import StepsButton, { StepsButtonProps } from './StepsButton';
import styles from './index.module.less';

type ExtendButtonProps = Omit<StepsButtonProps, 'onClick'> & {
  onClick?: (e, ref, value?) => void;
}

export interface StepBarProps extends StepsProps {
  /** 
   * 底部按钮位置 
   * default - 默认位置
   * fixed - 固定在组件底部居中位置
   */
  btnPosition?: 'default' | 'fixed';
  /** 底部按钮属性透传 */
  btnProps?: {
    cancel?: ExtendButtonProps;
    finish?: ExtendButtonProps;
    prev?: ExtendButtonProps;
    next?: ExtendButtonProps;
  };
  /** 
   * 传入 content 为组件时，确保该组件支持接收 ref，底部按钮组将通过 ref 方式控制 content 组件 
   * 此外，要求组件在 ref 中支持 tick 函数，点击下一步时，会触发该方法
   */
  items: (StepProps & { content?: ReactNode; })[];
  /** 所有步骤的存储值 */
  stepsValue?: {
    [key: string]: any;
  }
  /** 底部按钮扩展 */
  footerRender?: (footer: ReactNode, current: number) => ReactNode;
}

type RefTick = {
  /** 上一步 */
  prev?: Function;
  /** 下一步 */
  next: Function;
  /** 自定义保存当前页面下需要存储的数据 */
  save: Function;
}

const StepBar = (props: StepBarProps) => {
  const {
    btnPosition = 'fixed',
    btnProps = {},
    className,
    current: _current,
    footerRender,
    items,
    stepsValue: _stepsValue,
    ...restProps
  } = props;
  const ref = useRef<{ tick: (fc: RefTick) => void }>();
  const [current, setCurrent] = useState(_current ?? 0);
  const [stepsValue, setStepsValue] = useState(_stepsValue ?? {});
  const {
    cancel: { onClick: _cancelClick, ...cancel } = {},
    finish: { onClick: _finishClick, ...finish } = {},
    prev: { onClick: _prevClick, ...prev } = {},
    next: { onClick: _nextClick, ...next } = {},
  } = btnProps;
  const mergedClassName = className ? `${styles['step-bar']} ${className}` : styles['step-bar'];

  const cloneChildren = (children: ReactNode) => {
    if (typeof children === 'object') {
      return cloneElement(children as ReactElement, {
        ref,
        stepsValue,
        stepValue: stepsValue[current]
      })
    } else {
      return children
    }
  }

  const prevStep = () => {
    if (current > 0) {
      setCurrent(current - 1);
    }
  }

  const nextStep = () => {
    if (current < items.length - 1) {
      setCurrent(current + 1)
    }
  }

  const save = (value: any) => {
    setStepsValue(Object.assign({}, stepsValue, { [current]: value }))
  }

  const extra = {
    prev: prevStep,
    next: nextStep,
    save
  }

  const cancelClick = e => {
    _cancelClick?.(e, ref);
  }

  const finishClick = e => {
    _finishClick?.(e, ref, stepsValue);
  }

  const prevClick = e => {
    _prevClick?.(e, ref);
    prevStep();
  }

  const nextClick = e => {
    _nextClick?.(e, ref);
    ref.current?.tick?.(extra)
  }

  const getRenderable = (value: unknown) => {
    if (typeof value === 'boolean') {
      return value;
    } else {
      return true
    }
  }

  const footer = (
    <>
      <StepsButton
        type="primary"
        renderable={getRenderable(next.renderable) && current < items.length - 1}
        {...next}
        onClick={nextClick}>
        下一步
      </StepsButton>
      <StepsButton
        type="primary"
        renderable={getRenderable(finish.renderable) && current === items.length - 1}
        {...finish}
        onClick={finishClick}>
        完成
      </StepsButton>
      <StepsButton
        renderable={getRenderable(prev.renderable) && current > 0}
        {...prev}
        onClick={prevClick}>
        上一步
      </StepsButton>
      <StepsButton
        {...cancel}
        renderable={getRenderable(cancel.renderable)}
        onClick={cancelClick}>
        取消
      </StepsButton>
    </>
  )

  const mergedFooterRender = footerRender ? footerRender : () => footer

  return (
    <div className={mergedClassName}>
      <Steps current={current} items={items} {...restProps}/>
      <div className={styles['step-bar-content']}>
        {cloneChildren(items[current].content)}
      </div>
      <div className={`${styles['step-bar-btns']} ${styles[`step-bar-btns-${btnPosition}`]}`}>
        {mergedFooterRender(footer, current)}
      </div>
    </div>
  );
}

export default StepBar;