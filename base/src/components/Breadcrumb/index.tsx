import React from 'react';
import { Breadcrumb } from 'antd';
import {useLocation} from 'react-router-dom';
import './index.less';

interface Props {
  data: string[];
}

export default (props: Props) => {
  const { data } = props;
  const location = useLocation();
  return (
    <Breadcrumb className='Breadcrumd'>
      {
        data.map((item: string, idx: number) => (
          <Breadcrumb.Item key={idx}>{item}</Breadcrumb.Item>
        ))
      }
    </Breadcrumb>
  )
}