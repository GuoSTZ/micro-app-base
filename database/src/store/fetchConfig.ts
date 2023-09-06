/**
 * 中间件处理请求
 */
const promiseMiddleware =
  ({ systemConfig }) =>
  (store: any) =>
  (next: any) =>
  (action: any) => {
    if (action.type === 'appReducer/init') {
      systemConfig?.(store.dispatch, action.payload)
    }
    return next({ ...action })
  }

export default promiseMiddleware
