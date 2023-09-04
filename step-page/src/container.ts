import React from 'react'

import { Inject } from '@/store/core/injectAction'

import * as Action from './action'
import store from './store'
import getSelectorProps from './store/core/prop'
import DetailView from './views/Detail.view'
import FormView from './views/Form.view'
import ListView from './views/List.view'

const injectActionStatus = () => {
  const keys = Object.keys(Action)
  const { actionStatus, ...restAction } = Action
  const actions = {}
  keys?.map((key: string) => {
    if (typeof restAction[key] === 'function') {
      actions[key] = Inject(restAction[key])(actionStatus[key])
    }
  })
  return actions
}

/** 属性注入 */
const injectProps = (Comp: React.FC<any>) => {
  return () =>
    Comp({
      actions: injectActionStatus(),
      ...getSelectorProps(store.getState()),
    })
}

export const ListContainer = injectProps(ListView)

export const FormContainer = injectProps(FormView)

export const DetailContainer = injectProps(DetailView)
