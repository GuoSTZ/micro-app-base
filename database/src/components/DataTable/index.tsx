import React from 'react'
import { Button, Table, TableProps } from 'antd'
import { TableRowSelection, RowSelectMethod } from 'antd/lib/table/interface'
import styles from './index.module.less'

interface IPage {
  pageSize?: number
  current?: number
  total?: number
  enableMaxDsNumLimit?: boolean | undefined
  maxDsNum?: number | undefined
}

export interface DataTableProps extends TableProps<object> {
  /** 分页参数 */
  page?: IPage
  /** 传入行数据选中处理函数 */
  handler?: { setSelectedRowKeys: Function, setSelectedRows: Function };
}

const DataTable: React.FC<DataTableProps> = props => {
  const defaultHandler = {
    setSelectedRowKeys: () => {},
    setSelectedRows: () => {},
  }
  const { page, components, handler = defaultHandler, rowSelection, ...otherProps } = props
  const { setSelectedRowKeys, setSelectedRows } = handler;

  const mergedRowSelection: TableRowSelection<object> = rowSelection !== null ? Object.assign({}, rowSelection, {
    onChange: (selectedRowKeys: React.Key[], selectedRows: object[], info: { type: RowSelectMethod }) => {
      rowSelection?.onChange?.(selectedRowKeys, selectedRows, info)
      setSelectedRowKeys?.(selectedRowKeys);
      setSelectedRows?.(selectedRows);
    }
  }) : null;

  const clear = () => {
    setSelectedRowKeys?.([]);
    setSelectedRows?.([]);
  }

  const TableClear = () => {
    const selectedRowKeys = mergedRowSelection?.selectedRowKeys || []
    const len = selectedRowKeys.length
    if(!rowSelection) {
      return null;
    }
    return (
      <div className={styles['TableRender-DataTable-clear']}>
        <span>已选 {len} 项</span>
        <Button type="link" disabled={len === 0} onClick={clear}>
          <span style={len == 0 ? { color: '#afb5c7' } : { color: '#3385ff' }}>清空</span>
        </Button>
      </div>
    )
  }

  /** 分页默认配置 */
  const pagination = {
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: (total: number) => {
      return `共${total}条`
    },
    size: 'middle' as 'small' | 'default',
  }

  return (
    <div className={styles['TableRender-DataTable']}>
      <Table
        {...otherProps}
        size={'middle'}
        pagination={Object.assign({}, pagination, page)}
        rowSelection={mergedRowSelection}
      />
      <TableClear />
    </div>
  )
}

export default DataTable
