import { Form } from 'antd';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as actions from '@/action';
import Panel from '@/components/Panel';
import './index.module.less';

export default () => {
  const navigate = useNavigate();
  const params = useParams();
  useEffect(() => {
    // actions.fetchDemo({})
  }, [])

  return (
    <Panel handleCancel={() => navigate(-1)}>
      {params.id ? '编辑' : '新增'}
      <Form />
    </Panel>
  )
}