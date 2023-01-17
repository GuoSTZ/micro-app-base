import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import Home from '@/views';

const container = document.getElementById('root');
const root = createRoot(container);

global.API_PREFIX = 'http://git.mchz.com.cn/api/v4';

const App = () => {
  return <Home />
}

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ConfigProvider locale={zhCN}>
        <App />
      </ConfigProvider>
    </BrowserRouter>
  </React.StrictMode>
)