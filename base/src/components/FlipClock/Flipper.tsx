import React, { useState } from 'react';
import './flipper.less';

interface FlipperProps {
  duration?: number;
  frontText?: number;
  backText?: number;
}

const Flipper = React.forwardRef<unknown, FlipperProps>((props, ref) => {
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipType, setFlipType] = useState('down');
  const [frontTextFromData, setFrontTextFromData] = useState(0);
  const [backTextFromData, setBackTextFromData] = useState(1);

  const { duration = 600, frontText = 0, backText = 1 } = props;

  React.useImperativeHandle(ref, () => {
    return {
      flipDown,
      flipUp,
      setFront,
      setBack
    }
  }, [ref]);

  const textClass = (num: number) => `number${num}`;

  const flip = (type: string, front: number, back: number) => {
    if (isFlipping) {
      return
    }
    setFrontTextFromData(front);
    setBackTextFromData(back);
    setFlipType(type);
    setIsFlipping(true)

    setTimeout(() => {
      setFrontTextFromData(back);
      setIsFlipping(false)
    }, duration)
  }

  // 下翻
  const flipDown = (front: number, back: number) => flip('down', front, back)

  // 上翻
  const flipUp = (front: number, back: number) => flip('up', front, back)

  // 设置前牌文字
  const setFront = (text: number) => setFrontTextFromData(text)

  // 设置后牌文字
  const setBack = (text: number) => setBackTextFromData(text);

  return (
    <div className={['M-Flipper', flipType, isFlipping ? 'go' : null].join(' ')}>
      <div className={'digital front ' + textClass(frontTextFromData)}></div>
      <div className={'digital back ' + textClass(backTextFromData)}></div>
    </div>
  )
})

export default Flipper;