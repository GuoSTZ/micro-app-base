import React from 'react'
import routesJson from '@/schema/routes.json'
import LoginView from './views/Login.view'

const Containers = {
  LoginView
}

const parseRouter = routes => {
  let Routes = []
  routes.map(item => {
    const Element = Containers[item['element']]
    const newRouter = {
      path: item.path,
      element: <Element />,
    }
    if (item.children) {
      newRouter.children = parseRouter(item.children)
    }
    Routes.push(newRouter)
  })
  return Routes
}

export default parseRouter(routesJson)
