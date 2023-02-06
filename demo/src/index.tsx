import './public-path';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN'
import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import { changeLanguage } from '@/locales';
import routes from './router';
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container);

global.API_PREFIX = 'http://114.116.6.135:3000';

const App = () => {
  const View = useRoutes(routes)

  useEffect(() => {
    window.microApp.addDataListener(data => {
      changeLanguage(data.lng)
    }, true)
    return () => {
      window.microApp.clearDataListener()
    }
  }, [])

  return View
}

window.unmount = () => {
  console.log(`${window.__MICRO_APP_NAME__}子应用已经卸载`)
  root.unmount()
}

window.onmount = (data) => {
  console.log(`${window.__MICRO_APP_NAME__}子应用已经渲染`, data)
}

const mergedBaseName = window.__MICRO_APP_BASE_ROUTE__ ? `${window.__MICRO_APP_BASE_ROUTE__}/${window.__MICRO_APP_NAME__}` : window.__MICRO_APP_NAME__

root.render(
  <React.StrictMode>
    <BrowserRouter basename={mergedBaseName}>
      <ConfigProvider locale={zhCN}>
        <App />
      </ConfigProvider>
    </BrowserRouter>
  </React.StrictMode>
)
