import { Form } from 'antd';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as actions from '@/action';
import Panel from '@/components/Panel';
import { locale } from '@/locales';
import './index.module.less';

export default () => {
  const navigate = useNavigate();
  const params = useParams();
  useEffect(() => {
    // actions.fetchDemo({})
  }, [])

  return (
    <Panel 
      title={params.id ? locale("common.operations.edit") : locale("common.operations.new")}
      handleCancel={() => navigate(-1)}>
      <Form />
    </Panel>
  )
}