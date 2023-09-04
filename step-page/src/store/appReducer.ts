import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { RootState } from '.'

export const namespace = 'appReducer'

export const initialState = {
  auths: {},
  config: {
    apps: [],
    deploy: '',
    globalConfig: {},
    productType: undefined,
    userMenus: {},
  },
  dicts: {},
  user: {}
}

export const reducers = {
  init: () => {},
  saveConfig: (state: RootState, action: PayloadAction<any>) => {
    state.config = action.payload
  },
  saveDicts: (state: RootState, action: PayloadAction<any>) => {
    state.dicts = action.payload
  },
  saveUser: (state: RootState, action: PayloadAction<any>) => {
    state.user = action.payload
  },
}

/** 创建分片 */
const slice = createSlice({
  name: namespace,
  initialState,
  reducers: reducers,
})

export default slice
