import React from 'react';
import { useRoutes } from 'react-router-dom';
import rootRoutes from '@/routes';
import './index.less';

export default () => {
  const routes = useRoutes(rootRoutes)
  return routes
}