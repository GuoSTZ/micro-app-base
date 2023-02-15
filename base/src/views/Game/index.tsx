import { Tabs, TabsProps, Empty, Watermark} from 'antd';
import React from 'react';
import Linking from './Linking';
import linkingSvg from '/public/images/Game/linking.svg';
import developingSvg from '/public/images/Game/developing.svg';

import './index.less';

export default () => {
  const getItems = (): TabsProps['items'] => [
    {
      key: '1',
      label: (
        <div className="game-tab-item-label">
          <img src={linkingSvg} width={14} />
          连连看
        </div>
      ),
      children: <Watermark content={"Li XinYi"}><Linking /></Watermark>,
    },
    {
      key: '2',
      label: (
        <div className="game-tab-item-label">
          <img src={developingSvg} width={14} />
          开发中...
        </div>
      ),
      children: <Empty description={"暂无数据，快去开发吧"}/>,
    }
  ]

  return (
    <Tabs
      centered
      items={getItems()}
    />
  )
}