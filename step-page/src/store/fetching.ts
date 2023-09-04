import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '.'

export const namespace = 'fetchingReducer'

export const initialState = {
  fetching: {},
  params: {},
}

export const reducers = {
  fetchReq: (state: RootState, { type, payload }: PayloadAction<any>) => {
    state.fetching = { ...state.fetching, [payload.type]: true }
  },
  fetchRes: (state: RootState, { type, payload }: PayloadAction<any>) => {
    state.fetching = { ...state.fetching, [payload.type]: false }
  },
  fetchParams: (state: RootState, { type, payload }: PayloadAction<any>) => {
    state.params = { ...state.params, [payload.type]: payload.payload }
  },
  fetchReset: (state: RootState, action: PayloadAction) => {
    state.fetching = {}
    state.params = {}
  },
}

/** 创建分片 */
const slice = createSlice({
  name: namespace,
  initialState,
  reducers: reducers,
})

export default slice
