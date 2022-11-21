import {HomeOutlined, MailOutlined, PhoneOutlined, CalendarOutlined} from '@ant-design/icons';
import React from 'react';
import { RoutesType } from '.';

const ModuleRoutes: RoutesType[] = [
  {
    path: "home/*",
    name: "首页",
    icon: <HomeOutlined />,
    element: <div>首页</div>
  },
  {
    path: "menuOne/*",
    name: "菜单一",
    icon: <MailOutlined />,
    children: [
      {
        path: "moduleA",
        id: "moduleA",
        name: "模块A",
        element: <div>模块A</div>,
      },
      {
        path: "moduleB",
        id: "moduleB",
        name: "模块B",
        element: <div>模块B</div>,
      }
    ]
  },
  {
    path: "menuTwo/*",
    name: "菜单二",
    icon: <PhoneOutlined />,
    children: [
      {
        path: "moduleC",
        id: "moduleC",
        name: "模块C",
        element: <div>模块C</div>,
      },
      {
        path: "moduleD",
        id: "moduleD",
        name: "模块D",
        element: <div>模块D</div>,
      },
      {
        path: "moduleE",
        id: "moduleE",
        name: "模块E",
        element: <div>模块E</div>,
      }
    ]
  },
  {
    path: "menuThree/*",
    name: "菜单三",
    icon: <CalendarOutlined />,
    children: [
      {
        path: "menuThreeOne/*",
        name: "菜单三一",
        children: [
          {
            path: "moduleF",
            id: "moduleF",
            name: "模块F",
            element: <div>模块F</div>,
          }
        ]
      },
      {
        path: "moduleG",
        id: "moduleG",
        name: "模块G",
        element: <div>模块G</div>,
      }
    ]
  }
]

export default ModuleRoutes;