import { Button, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as actions from '@/action';
import Toolbar from '@/components/Toolbar';
import DataTable from '@/components/DataTable';
import useTableData from '@/hooks/useTableData';
import './index.module.less';

export default () => {
  const navigate = useNavigate();
  const [tableData, setTableData] = useTableData();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    actions.fetchDemo({}, (data: any) => {
      setTableData(data);
    })
  }, [])

  const columns = React.useMemo(() => {
    return [
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
      },
      {
        title: '住址',
        dataIndex: 'address',
        key: 'address',
      },
    ];
  }, [])

  return (
    <div>
      <Toolbar>
        <Button onClick={() => navigate('add')}>新增页</Button>
        <Button onClick={() => navigate('edit/1')}>编辑页</Button>
        <Button onClick={() => navigate('detail/1')}>详情页</Button>
      </Toolbar>
      <DataTable 
        dataSource={tableData.items}
        columns={columns}
        page={tableData.page}
        handler={{
          setSelectedRowKeys, 
          setSelectedRows
        }}
        rowSelection={null}
      />
    </div>
  )
}