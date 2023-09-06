import * as Action from './action'

const { actionStatus, ...restAction } = Action

export interface IPage {
  actions: typeof restAction;
  dicts: any;
  querys: any;
  spins: any;
}