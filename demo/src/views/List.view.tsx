import { Button } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as actions from '@/action';
import Toolbar from '@/components/Toolbar';
import DataTable from '@/components/DataTable';
import Panel from '@/components/Panel';
import useTableData from '@/hooks/useTableData';
import { locale } from '@/locales';
import TableOperation from '@/components/TableOperation';
import './index.less';

export default () => {
  const navigate = useNavigate();
  const [tableData, setTableData] = useTableData();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    actions.fetchPage({}, (data: any) => {
      setTableData(data);
    })
  }, [])

  const columns = [
    {
      title: locale("demo.list.table.name"),
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: locale("demo.list.table.age"),
      dataIndex: 'age', 
      key: 'age',
    },
    {
      title: locale("demo.list.table.address"),
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: locale("common.operations.operation"),
      key: 'operation',
      width: 200,
      render: (text: unknown, record) => {
        return (
          <TableOperation>
            <Button onClick={() => navigate(`edit/${record.id}`)}>{locale("common.operations.edit")}</Button>
            <Button onClick={() => navigate(`detail/${record.id}`)}>{locale("common.operations.detail")}</Button>
            <Button 
              onClick={() => actions.fetchDelete({ids: [record.id]}, () => {
                actions.fetchPage(tableData.page, (data: any) => {
                  setTableData(data);
                })
              })}>
              {locale("common.operations.delete")}
            </Button>
          </TableOperation>
        )
      }
    },
  ];

  return (
    <Panel footer={false}>
      <Toolbar>
        <Button type="primary" onClick={() => navigate('add')}>{locale("common.operations.new")}</Button>
        <Button type="primary" onClick={() => navigate('schema')}>{locale("demo.list.schema")}</Button>
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