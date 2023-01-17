import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import ModuleRoutes from './module';

export type RoutesType = {
  id?: string;
  key?: string;
  path: string;
  name?: string;
  icon?: JSX.Element;
  element?: JSX.Element;
  children?: Array<RoutesType>;
}

const rootRoutes: Array<RoutesType> = [
  {
    path: "/",
    element: <Navigate to={`${NAME_SPACE}/demo`} />
  },
  {
    path: `${NAME_SPACE}/*`,
    element: <Outlet />,
    children: [
      ...ModuleRoutes,
      // {
      //   path: "*",
      //   element: <Navigate to={`${NAME_SPACE}`} />
      // }
    ]
  },
  {
    path: "*",
    element: <Navigate to={`${NAME_SPACE}/demo`} />
  },
]

export default rootRoutes;