import microApp from '@micro-zoe/micro-app'
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from '@/views/App';
import '@/locales';

const container = document.getElementById('root');
const root = createRoot(container);

microApp.start({
  'disable-memory-router': true, // 关闭虚拟路由系统
  'disable-patch-request': true, // 关闭对子应用请求的拦截
})

global.API_PREFIX = 'http://114.116.6.135:3000';

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)