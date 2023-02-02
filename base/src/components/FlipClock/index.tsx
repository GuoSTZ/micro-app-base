import React, { useEffect, useRef } from 'react'
import dayjs from 'dayjs'
import Flipper from './Flipper'
import './index.less'

const FlipClock = () => {
  let timer = null;
  let flipObjs = [];
  const flipperHour1 = useRef<any>();
  const flipperHour2 = useRef<any>();
  const flipperMinute1 = useRef<any>();
  const flipperMinute2 = useRef<any>();
  const flipperSecond1 = useRef<any>();
  const flipperSecond2 = useRef<any>();

  useEffect(() => {
    flipObjs = [
      flipperHour1,
      flipperHour2,
      flipperMinute1,
      flipperMinute2,
      flipperSecond1,
      flipperSecond2
    ]
    init()
    run()
    return () => {
      timer && clearInterval(timer)
    }
  }, [])

  const init = () => {
    let now = new Date()
    // 加上动画的时间
    let nowTimeStr = dayjs(new Date(now.getTime() + 600)).format('HHmmss')
    for (let i = 0; i < flipObjs.length; i++) {
      flipObjs[i].current.setFront(nowTimeStr[i])
    }
  }

  const run = () => {
    timer = setInterval(() => {
      let now = new Date()
      let nowTimeStr = dayjs(new Date(now.getTime() + 600)).format('HHmmss')
      let nextTimeStr = dayjs(new Date(now.getTime() + 1600)).format('HHmmss')
      console.log(nowTimeStr, nextTimeStr, '===')
      for (let i = 0; i < flipObjs.length; i++) {
        if (nowTimeStr[i] === nextTimeStr[i]) {
          continue
        }
        flipObjs[i].current.flipDown(
          nowTimeStr[i],
          nextTimeStr[i]
        )
      }
    }, 1000)
  }

  return (
    <div className="FlipClock">
      <Flipper ref={flipperHour1} />
      <Flipper ref={flipperHour2} />
      <em>:</em>
      <Flipper ref={flipperMinute1} />
      <Flipper ref={flipperMinute2} />
      <em>:</em>
      <Flipper ref={flipperSecond1} />
      <Flipper ref={flipperSecond2} />
    </div>
  )
}

export default FlipClock;