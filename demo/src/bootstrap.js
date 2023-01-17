import './public-path';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import routes from './router';

const container = document.getElementById('root');
const root = createRoot(container);

global.API_PREFIX = 'http://git.mchz.com.cn/api/v4';

const App= () => {
  const View = useRoutes(routes)
  return <div>
          {View}
        </div>
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