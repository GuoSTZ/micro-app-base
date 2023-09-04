/** 公共数据请求 */

import { RootState } from '.'
import appSlice from './appReducer'
// import fetchPage from '';

/** 全局配置 */
export const fetchGlobalConfig = async (store: RootState) => {
  
}

/** 统一处理公共数据请求 */
export const fetchSystemConfig = (store: RootState) => {
  return Promise.all([
    fetchGlobalConfig(store),
  ])
}
