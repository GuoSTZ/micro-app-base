/** @jsxRuntime classic */
/** @jsx jsxCustomEvent */
import jsxCustomEvent from '@micro-zoe/micro-app/polyfill/jsx-custom-event'
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import moduleRoutes from '@/routes/module';
import './index.less';

export interface MicroAppProps {
  name: string;
  url: string;
  path?: string;
}

export default function MicroApp(props: MicroAppProps) {
  const { name, url, ...resetProps } = props;
  const location = useLocation();

  const getPaths = (routes, name) => {
    const path = [''];
    if (!routes) return [];
    const forFn = function (routes, name) {
      for (let i = 0; i < routes.length; i++) {
        const route = routes[i];
        path.push(route.path.replace("/*", ""));
        if (route?.element?.props?.name === name) return path;
        if (route.children) {
          const findChildren = forFn(route.children, name);
          if (findChildren) return findChildren
        }
        path.pop()
      }
    }
    forFn(routes, name);
    return path;
  }

  const modulePath = getPaths(moduleRoutes, name).join("/")

  const data = React.useMemo(() => {
    return {
      lng: localStorage.i18nextLng,
      appName: name,
      path: location.pathname,
      modulePath
    }
  }, [name, location.pathname])

  return (
    <React.Fragment>
      <micro-app
        {...resetProps}
        data={data}
        name={name}
        url={url}
        baseroute={NAME_SPACE}
      />
      <Outlet />
    </React.Fragment>
  )
}