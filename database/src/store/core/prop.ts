import { createSelector } from '@reduxjs/toolkit'

/** Selector - fetchingReducer */
export const fetchingReducerSelector = (state: any) => state.fetchingReducer
/** Selector - appReducer */
export const appReducerSelector = (state: any) => state.appReducer

/** Selector - fetching */
export const fetchingSelector: any = createSelector(fetchingReducerSelector, (selector: any) => selector.fetching)

/** Selector - params */
export const paramsSelector: any = createSelector(fetchingReducerSelector, (selector: any) => selector.params)

/** Selector - dicts */
export const dictsSelector: any = createSelector(appReducerSelector, (selector: any) => selector.dicts)

export default (state: any) => {
  return {
    /** 获取页面actions请求状态 true or false */
    spins: (type: Function) => {
      return createSelector(fetchingSelector, (fetching: any) => {
        return fetching[type.toString()]
      })(state)
    },
    /** 获取页面actions请求参数 */
    querys: (type: Function) => {
      return createSelector(paramsSelector, (params: any) => {
        return params[type.toString()] || {}
      })(state)
    },
    /** 获取数据字典值 */
    dicts: (type: string, value?: string | number) => {
      return createSelector(dictsSelector, (dicts: any) => {
        if (typeof type !== 'string') {
          return []
        }
        if (value === undefined) {
          return dicts?.[type] || []
        } else {
          let label = ''
          const map = dicts?.[type] || []
          map.forEach((arr: any) => {
            if (arr.value === value) {
              label = arr.label
            }
          })
          return label
        }
      })(state)
    },
  }
}
