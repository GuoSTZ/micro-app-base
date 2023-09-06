import React, { forwardRef, useImperativeHandle } from 'react';
import { Descriptions } from 'antd';

export interface FourDescProps {
  /** 包含当前所有步骤的已保存数据 */
  stepsValue?: any;
}

const FourDesc = forwardRef<any, FourDescProps>((props, ref) => {
  const { stepsValue } = props;
  useImperativeHandle(ref, () => ({
    tick: () => {
      console.log("步骤完成")
    }
  }))
  return (
    <div>
      <div>
        <p>第一步的数据展示</p>
        <Descriptions>
          {
            stepsValue[0]?.map((item, idx: number) => (
              <Descriptions.Item key={idx} label={item.label}>{item.value}</Descriptions.Item>
            ))
          }
        </Descriptions>
      </div>
      <div>
        <p>第三步的数据展示</p>
        <Descriptions>
          {
            stepsValue[2]?.map((item, idx: number) => (
              <Descriptions.Item key={idx} label={item.label}>{item.value}</Descriptions.Item>
            ))
          }
        </Descriptions>
      </div>
    </div>
  )
})

export default FourDesc;