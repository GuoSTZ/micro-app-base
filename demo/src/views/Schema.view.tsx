import { Button } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
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

  useEffect(() => {
    actions.fetchSchemaList({}, (data: any) => {
      setTableData(data);
    })
  }, [])

  const columns = React.useMemo(() => {
    return [
      {
        title: locale("demo.schema.table.key"),
        dataIndex: 'schemaKey',
        key: 'schemaKey',
      },
      {
        title: locale("demo.schema.table.name"),
        dataIndex: 'schemaName', 
        key: 'schemaName',
      },
      {
        title: locale("common.updateTime"),
        dataIndex: 'updateTime', 
        key: 'updateTime',
        render: (text: string) => dayjs(text).format("YYYY-MM-DD HH:mm:ss")
      },
      // {
      //   title: locale("demo.schema.table.module"),
      //   dataIndex: 'module',
      //   key: 'module',
      // },
      {
        title: locale("common.operations.operation"),
        key: 'operation',
        width: 200,
        render: (text: unknown, record: any) => {
          return (
            <TableOperation>
              <Button onClick={() => navigate(`edit/${record.id}`)}>{locale("common.operations.edit")}</Button>
              <Button>{locale("common.operations.download")}</Button>
            </TableOperation>
          )
        }
      },
    ];
  }, [])

  return (
    <Panel handleCancel={() => navigate(-1)}>
      <Toolbar>
        <Button type="primary" onClick={() => navigate('add')}>{locale("common.operations.new")}</Button>
      </Toolbar>
      <DataTable
        rowKey={'id'}
        dataSource={tableData.items}
        columns={columns}
        page={tableData.page}
        rowSelection={null}
      />
      <Outlet />
    </Panel>
  )
}