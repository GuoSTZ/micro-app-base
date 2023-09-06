import { Button } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Toolbar from '@/components/Toolbar';
import DataTable from '@/components/DataTable';
import Panel from '@/components/Panel';
import { locale } from '@/locales';
import TableOperation from '@/components/TableOperation';
import { IPage } from '@/interface';
import { useReducer } from '@/hooks';
import './index.less';

interface IListPage extends IPage { }

const ListView = (props: IListPage) => {
  const navigate = useNavigate();
  const { actions } = props;
  const reducer = useReducer();
  const { items, page } = reducer;

  useEffect(() => {
    actions.fetchPage({})
  }, [])

  const columns = [
    {
      key: 'id',
      dataIndex: 'id',
      title: 'id'
    },
    {
      key: 'name',
      dataIndex: 'name',
      title: '名称',
    },
    {
      key: 'age',
      dataIndex: 'age',
      title: '年龄',
    },
    {
      key: 'operation',
      title: "操作",
      render: (text: unknown, record) => {
        return (
          <TableOperation>
            <Button onClick={() => navigate(`edit/${record.id}`)}>{locale("common.operations.edit")}</Button>
            <Button onClick={() => navigate(`detail/${record.id}`)}>{locale("common.operations.detail")}</Button>
          </TableOperation>
        )
      }
    }
  ];

  return (
    <Panel footer={false}>
      <Toolbar>
        <Button type="primary" onClick={() => navigate('add')}>{locale("common.operations.new")}</Button>
      </Toolbar>
      <DataTable
        rowKey={'id'}
        dataSource={items}
        columns={columns}
        page={page}
        // rowSelection={null}
      />
    </Panel>
  )
}

export default ListView