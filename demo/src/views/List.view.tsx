import { Button } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as actions from '@/action';
import Toolbar from '@/components/Toolbar';
import DataTable from '@/components/DataTable';
import useTableData from '@/hooks/useTableData';
import { locale } from '@/locales';
import TableOperation from '@/components/TableOperation';
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
        render: (text: unknown, record: any) => {
          return (
            <TableOperation>
              <Button onClick={() => navigate(`edit/${record.key}`)}>{locale("common.operations.edit")}</Button>
              <Button onClick={() => navigate(`detail/${record.key}`)}>{locale("common.operations.detail")}</Button>
              <Button>{locale("common.operations.delete")}</Button>
            </TableOperation>
          )
        }
      },
    ];
  }, [])

  return (
    <div>
      <Toolbar>
        <Button type="primary" onClick={() => navigate('add')}>{locale("common.operations.new")}</Button>
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