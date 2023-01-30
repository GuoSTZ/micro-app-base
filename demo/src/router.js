import React from 'react'
import routesJson from '@/schema/routes.json'
import ListView from '@/views/List.view';
import FormView from '@/views/Form.view';
import DetailView from '@/views/Detail.view';
import SchemaView from '@/views/Schema.view';
import SchemaModal from '@/views/Schema.modal'

const Containers = {
  ListView,
  FormView,
  DetailView,
  SchemaView,
  SchemaModal
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
