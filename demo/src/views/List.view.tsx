import { Table } from 'antd';
import React, { useEffect } from 'react';
import * as actions from '@/action';
import './index.module.less';

export default () => {

  useEffect(() => {
    actions.fetchDemo({})
  }, [])

  return (
    <div>
      <Table />
    </div>
  )
}