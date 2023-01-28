import { Button, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as actions from '@/action';
import './index.module.less';
import Toolbar from '@/components/Toolbar';

export default () => {
  const navigate = useNavigate();
  const [tableData, setTableData] = useState([]);
  const [tablePage, setTablePage] = useState({
    current: 1,
    pageSize: 10,
    total: 0
  });
  useEffect(() => {
    actions.fetchDemo({}, (data: any) => {
      setTableData(data.items);
      setTablePage({
        current: data.current,
        pageSize: data.pageSize,
        total: data.total
      })
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
      <Table 
        dataSource={tableData}
        columns={columns}
      />
    </div>
  )
}