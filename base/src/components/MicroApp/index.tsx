import React from 'react';

export interface MicroAppProps {
  name: string;
  url: string;
}

export default function MicroApp(props: MicroAppProps) {
  const { name, url } = props;
  return (
    <div>
      <micro-app name={name} url={url}></micro-app>
    </div>
  )
}