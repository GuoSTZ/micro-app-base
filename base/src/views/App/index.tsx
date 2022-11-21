import React from 'react';
import { useRoutes } from 'react-router-dom';
import LayoutWrapper from '@/components/LayoutWrapper';
import moduleRoutes from '@/routes/module';
import rootRoutes from '@/routes';
import './index.less';

export default () => {
  const routes = useRoutes(rootRoutes)
  return (
    <LayoutWrapper routes={moduleRoutes}>
      {routes}
    </LayoutWrapper>
  )
}