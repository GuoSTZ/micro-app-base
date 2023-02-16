import {HomeOutlined, MailOutlined, PhoneOutlined, CalendarOutlined} from '@ant-design/icons';
import React from 'react';
import MicroApp from '@/components/MicroApp';
import { RoutesType } from '.';
import { config } from './config';
import i18n, { locale } from '@/locales';
import Home from '@/views/Home';
import Login from '@/views/Login';
import Game from '@/views/Game';
import { Outlet } from 'react-router-dom';

const getConfig = (name: string) => {
  return {
    name,
    ...config[name]
  }
}

const moduleRoutes: RoutesType[] = [
  {
    path: "home/*",
    name: i18n.t("base.menu.homePage"),
    icon: <HomeOutlined />,
    element: <Home />
  },
  {
    path: "login/*",
    name: "登录页（临时）",
    icon: <HomeOutlined />,
    element: <Login />
  },
  {
    path: "game/*",
    name: "休闲",
    icon: <HomeOutlined />,
    element: <Game />
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
    path: 'cli/*',
    name: i18n.t("base.menu.cli"),
    icon: <HomeOutlined />,
    element: <Outlet />,
    children: [
      {
        path: "reactTestApp/*",
        name: i18n.t("base.menu.reactTestApp"),
        icon: <HomeOutlined />,
        element: <MicroApp {...getConfig('reactTestApp')}/>
      },
      {
        path: "vueApp/*",
        name: i18n.t("base.menu.vueApp"),
        icon: <HomeOutlined />,
        element: <MicroApp {...getConfig('vueApp')}/>
      },
    ]
  },
  {
    path: "demo/*",
    name: i18n.t("base.menu.demo"),
    icon: <HomeOutlined />,
    element: <MicroApp {...getConfig('demo')}/>
  },
  // {
  //   path: "umiApp/*",
  //   name: i18n.t("base.menu.umiApp"),
  //   icon: <HomeOutlined />,
  //   element: <MicroApp {...getConfig('umiApp')}/>
  // },
]

export default moduleRoutes;