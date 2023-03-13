import {HomeOutlined, MailOutlined, PhoneOutlined, CalendarOutlined} from '@ant-design/icons';
import React from 'react';
import MicroApp from '@/components/MicroApp';
import { RoutesType } from '.';
import { config } from './config';
import i18n, { locale } from '@/locales';
import Home from '@/views/Home';
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
    path: 'cli/*',
    name: i18n.t("base.menu.cli"),
    icon: <HomeOutlined />,
    element: <Outlet />,
    children: [
      {
        path: "reactApp/*",
        name: i18n.t("base.menu.reactApp"),
        icon: <HomeOutlined />,
        element: <MicroApp {...getConfig('reactApp')}/>
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
  {
    path: "game/*",
    name: i18n.t("base.menu.game"),
    icon: <HomeOutlined />,
    element: <MicroApp {...getConfig('game')}/>
  },
]

export default moduleRoutes;