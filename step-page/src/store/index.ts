import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'

import { namespace, slice } from '@/reducer'
import { fetchSystemConfig } from './common'

import appSlice, { namespace as app_namespace } from './appReducer'
import promiseMiddleware from './fetchConfig'
import fetchingSlice, { namespace as fetching_namespace } from './fetching'

global.API_PREFIX = '/gs';
if(ENV === 'development') {
  const defaultApiPrefix = 'http://localhost:1446/gs';
  if (window.__MICRO_APP_ENVIRONMENT__) {
    global.API_PREFIX = window.microApp.getData()?.API_PREFIX ?? defaultApiPrefix;
  } else {
    global.API_PREFIX = defaultApiPrefix;
  }
}

// 模块全局数据管控
const systemConfigMiddleware = promiseMiddleware({
  systemConfig: () => {
    fetchSystemConfig(store)
  },
})

const store: any = configureStore({
  reducer: {
    [app_namespace]: appSlice.reducer,
    [fetching_namespace]: fetchingSlice.reducer,
    [namespace]: slice.reducer,
  },
  // 中间件配置
  middleware: (getDefaultMiddleware: any) => getDefaultMiddleware({}).concat(logger, systemConfigMiddleware),
})

// 触发 promiseMiddleware 中间件的初始化判断
store.dispatch(appSlice.actions.init())

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
