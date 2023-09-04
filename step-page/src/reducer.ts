import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import store, { RootState } from './store'

export const namespace = NAME_SPACE

const PAGE = 1
const SIZE = 10
/** 初始值 */
export const initialState = {
  items: [],
  page: {
    current: PAGE,
    pageSize: SIZE,
    total: 0,
  }
}

/**
 * 内部使用的是immer，并不是直接修改了state的值,
 * 也可以通过返回值的方式进行更新 @example return {...state, xx: yy}
 */
export const reducers = {
  savePage: (state: RootState, action: PayloadAction<any>) => {
    state.items = action.payload.items
    state.page = {
      current: action.payload.current,
      pageSize: action.payload.pageSize,
      total: action.payload.total,
    }
  }
}

/** 创建分片 */
export const slice = createSlice({
  name: namespace,
  initialState,
  reducers: reducers,
})

// 封装dispath调用reducer
const handleReducers = (obj: typeof reducers) => {
  const keys = Object.keys(obj);
  const reducer = {};
  keys.forEach(key => reducer[key] = data => store.dispatch(slice.actions[key](data)))
  return reducer as typeof slice.actions;
}

export const reducer = handleReducers(reducers)
