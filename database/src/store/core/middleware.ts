// import { Navigate } from 'react-router-dom';
import getSelectorProps from './prop'
import store from '..'
import * as Action from '../../action'
import { Inject } from './injectAction'

const middleware = {
  refreshPage: (action: Function, resetParams?: boolean) => {
    const { querys } = getSelectorProps(store.getState())
    const { actionStatus, ...restAction } = Action
    const actionName = action.name;
    const newAction = Inject(restAction[actionName])(actionStatus[actionName])
    const params = querys(newAction)
    resetParams ? newAction({}) : newAction(params)
  },
  // goBack: () => {
  //   Navigate({to: "/"});
  // }
}

export default middleware
