import store from '@/store'
import fetchingSlice from '@/store/fetching'
import { namespace } from '@/reducer'

const dispatch = store.dispatch
const { fetchReq, fetchRes, fetchParams } = fetchingSlice.actions

/** action 记录loading状态 */
export const Loading = (action: Function, key: string) => {
  const type = `${namespace}/${key}`
  const newAction = async (...args: any) => {
    dispatch(fetchReq({ type, payload: true }))
    await action(...args)
    dispatch(fetchRes({ type, payload: false }))
  }
  newAction.prototype.constructor.toString = () => type
  return newAction
}

/** action 记录传参 */
export const Param = (action: Function, key: string) => {
  const type = `${namespace}/${key}`
  const newAction = async (...args: any) => {
    /** args的第一个值为传参值，其他不需要记录 */
    dispatch(fetchParams({ type, payload: args[0] }))
    await action(...args)
  }
  newAction.prototype.constructor.toString = () => type
  return newAction
}

/** 包裹 action 作处理 */
export const Inject = (func: Function) => {
  let newFunc = func
  return (decorators: Function[] = []) => {
    decorators.map((decorator: Function) => {
      newFunc = decorator(newFunc, func.name)
    })
    return newFunc
  }
}
