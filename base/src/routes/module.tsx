import {HomeOutlined, MailOutlined, PhoneOutlined, CalendarOutlined} from '@ant-design/icons';
import React from 'react';
import MicroApp from '@/components/MicroApp';
import { RoutesType } from '.';
import { config } from './config';
import i18n, { locale } from '@/locales';
import Home from '@/views/Home';

const getConfig = (name: string) => {
  return {
    name,
    ...config[name]
  }
}

const ModuleRoutes: RoutesType[] = [
  {
    path: "home/*",
    name: i18n.t("base.menu.homePage"),
    icon: <HomeOutlined />,
    element: <Home />
  },
  {
    path: "menuOne/*",
    name: i18n.t("base.menu.one"),
    icon: <MailOutlined />,
    children: [
      {
        path: "moduleA",
        id: "moduleA",
        name: i18n.t("base.menu.modules.A"),
        element: <div>模块A</div>,
      },
      {
        path: "moduleB",
        id: "moduleB",
        name: i18n.t("base.menu.modules.B"),
        element: <div>模块B</div>,
      }
    ]
  },
  {
    path: "menuTwo/*",
    name: i18n.t("base.menu.two"),
    icon: <PhoneOutlined />,
    children: [
      {
        path: "moduleC",
        id: "moduleC",
        name: i18n.t("base.menu.modules.C"),
        element: <div>模块C</div>,
      },
      {
        path: "moduleD",
        id: "moduleD",
        name: i18n.t("base.menu.modules.D"),
        element: <div>模块D</div>,
      },
      {
        path: "moduleE",
        id: "moduleE",
        name: i18n.t("base.menu.modules.E"),
        element: <div>模块E</div>,
      }
    ]
  },
  {
    path: "menuThree/*",
    name: i18n.t("base.menu.three"),
    icon: <CalendarOutlined />,
    children: [
      {
        path: "menuThreeOne/*",
        name: i18n.t("base.menu.threeOne"),
        children: [
          {
            path: "moduleF",
            id: "moduleF",
            name: i18n.t("base.menu.modules.F"),
            element: <div>模块F</div>,
          }
        ]
      },
      {
        path: "moduleG",
        id: "moduleG",
        name: i18n.t("base.menu.modules.G"),
        element: <div>模块G</div>,
      }
    ]
  },
  {
    path: "reactTestApp/*",
    name: i18n.t("base.menu.reactTestApp"),
    icon: <HomeOutlined />,
    element: <MicroApp {...getConfig('reactTestApp')}/>
  },
  {
    path: "demo/*",
    name: i18n.t("base.menu.demo"),
    icon: <HomeOutlined />,
    element: <MicroApp {...getConfig('demo')}/>
  },
  {
    path: "umiApp/*",
    name: i18n.t("base.menu.umiApp"),
    icon: <HomeOutlined />,
    element: <MicroApp {...getConfig('umiApp')}/>
  },
]

export default ModuleRoutes;