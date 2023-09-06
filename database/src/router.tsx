import React, {memo} from 'react'
import routesJson from '@/schema/routes.json'
import * as Containers from './container'

type RouterConfig = {
  path: string;
  element: React.ReactNode;
  children?: RouterConfig[];
}

const parseRouter = routes => {
  let Routes = []
  routes.map(item => {
    const Element = Containers[item['element']]
    
    const newRouter: RouterConfig = {
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
