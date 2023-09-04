import { Button } from 'antd';
import React, { useEffect, useState, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import * as actions from '@/action';
import Toolbar from '@/components/Toolbar';
import DataTable from '@/components/DataTable';
import Panel from '@/components/Panel';
import useTableData from '@/hooks/useTableData';
import { locale } from '@/locales';
import TableOperation from '@/components/TableOperation';
import './index.less';

const ListView = (props) => {
  const navigate = useNavigate();
  const [tableData, setTableData] = useTableData();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    console.log(props, '=====')
  }, [])

  const columns = [

  ];

  return (
    <Panel footer={false}>
      <Toolbar>
        <Button type="primary" onClick={() => navigate('add')}>{locale("common.operations.new")}</Button>
      </Toolbar>
      <DataTable
        rowKey={'id'}
        dataSource={tableData.items}
        columns={columns}
        page={tableData.page}
        handler={{
          setSelectedRowKeys, 
          setSelectedRows
        }}
        rowSelection={null}
      />
    </Panel>
  )
}

export default ListView