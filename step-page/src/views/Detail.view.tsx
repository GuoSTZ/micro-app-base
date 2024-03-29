import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as actions from '@/action';
import SchemaDescriptions from '@/components/SchemaDescriptions';
import Panel from '@/components/Panel';
import './index.less';

export default () => {
  const navigate = useNavigate();
  const params = useParams();
  const [detailSchema, setDetailSchema] = useState({});
  const [dataSource, setDataSource] = useState({});
  useEffect(() => {
    
  }, [])

  return (
    <Panel handleCancel={() => navigate(-1)}>
      <SchemaDescriptions schema={detailSchema} data={dataSource} />
    </Panel>
  )
}