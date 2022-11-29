import React from 'react';

export type RoutesType = {
  id?: string;
  key?: string;
  path: string;
  name?: string;
  icon?: JSX.Element;
  element?: JSX.Element;
  children?: Array<RoutesType>;
}

const routes: Array<RoutesType> = [
  {
    path: "/*",
    element: <div>首页</div>
  }
]

export default routes;