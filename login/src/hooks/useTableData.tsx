import React, { useEffect, useState } from 'react'

type DataType = {
  items: object[]
  pageSize: number
  current: number
  total: number
}

type TableDataType = {
  items: object[]
  page: {
    pageSize: number
    current: number
    total: number
  }
}

type useTableDataProps<T> = [TableDataType, (newValue: T) => void]

function useTableData<T extends DataType>(): useTableDataProps<T> {
  const [items, setItems] = useState([] as any[])
  const [page, setPage] = useState({} as any)

  const setTableData = React.useCallback((data: T) => {
    setItems(data.items ?? [])
    setPage({
      current: data.current ?? 1,
      pageSize: data.pageSize ?? 10,
      total: data.total ?? 0,
    })
  }, [])

  const tableData: TableDataType = { items, page }

  return [tableData, setTableData]
}

export default useTableData
