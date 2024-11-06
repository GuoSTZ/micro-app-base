import React from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';
import LayoutWrapper from '@/components/LayoutWrapper';
import MicroApp from '@/components/MicroApp';
import moduleRoutes from './module';
import { config } from './config';

export type RoutesType = {
  id?: string;
  key?: string;
  path: string;
  name?: string;
  icon?: JSX.Element;
  element?: JSX.Element;
  children?: Array<RoutesType>;
}

const Menu = () => {
  const view = useRoutes(moduleRoutes)
  return (
    <LayoutWrapper routes={moduleRoutes} basename={NAME_SPACE}>
      {view}
    </LayoutWrapper>
  )
}

const getConfig = (name: string) => {
  return {
    name,
    ...config[name]
  }
}

const rootRoutes: Array<RoutesType> = [
  {
    path: `/`,
    element: <Navigate to={`${`${NAME_SPACE}`}/home`} />
  },
  {
    path: `/login`,
    element: <MicroApp {...getConfig('login')}/>
  },
  {
    path: `${NAME_SPACE}`,
    element: <Navigate to={`home`} />
  },
  {
    path: `${NAME_SPACE}/*`,
    element: <Menu />
  }
]

export default rootRoutes;