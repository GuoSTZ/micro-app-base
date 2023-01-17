import { Form } from 'antd';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as actions from '@/action';
import SchemaDescriptions from '@/components/SchemaDescriptions';
import Panel from '@/components/Panel';
import schema from '@/schema/detail.json';
import './index.module.less';

export default () => {
  const navigate = useNavigate();
  useEffect(() => {
    // actions.fetchDemo({})
  }, [])

  return (
    <Panel handleCancel={() => navigate(-1)}>
      <SchemaDescriptions schema={schema} data={[]} />
    </Panel>
  )
}