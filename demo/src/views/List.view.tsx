import { Button, Table } from 'antd';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as actions from '@/action';
import './index.module.less';
import Toolbar from '@/components/Toolbar';

export default () => {
  const navigate = useNavigate();
  useEffect(() => {
    actions.fetchDemo({})
  }, [])

  return (
    <div>
      <Toolbar>
        <Button onClick={() => navigate('add')}>新增页</Button>
        <Button onClick={() => navigate('edit/1')}>编辑页</Button>
        <Button onClick={() => navigate('detail/1')}>详情页</Button>
      </Toolbar>
      <Table />
    </div>
  )
}