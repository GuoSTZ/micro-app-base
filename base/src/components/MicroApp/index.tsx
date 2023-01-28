import React from 'react';
import { Outlet } from 'react-router-dom';
import './index.less';

export interface MicroAppProps {
  name: string;
  url: string;
}

export default function MicroApp(props: MicroAppProps) {
  const { name, url } = props;
  return (
    <React.Fragment>
      <micro-app 
        name={name} 
        url={url}
        baseroute={NAME_SPACE}
      />
      <Outlet />
    </React.Fragment>
  )
}