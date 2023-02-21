import './public-path';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN'
import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, useRoutes, useNavigate } from 'react-router-dom';
import { changeLanguage } from '@/locales';
import routes from './router';
import './index.css';

let root = createRoot(document.getElementById('root'));

global.API_PREFIX = '/gs';
if(ENV === 'development') {
  global.API_PREFIX = 'http://114.116.6.135:1446/gs';
}

const App = () => {
  const View = useRoutes(routes)
  const navigate = useNavigate()

  useEffect(() => {
    if(window.__MICRO_APP_ENVIRONMENT__) {
      window.microApp.addDataListener(data => {
        changeLanguage(data.lng)
        const newPath: string = data.path?.replace(window.__MICRO_APP_BASE_ROUTE__, "");
        // 非默认页下点击基座菜单，将页面切换至默认页
        if(newPath === data.modulePath && data.appName === window.__MICRO_APP_NAME__) {
          navigate('/', {replace: true})
        }
      }, true)
    }
    return () => {
      if(window.__MICRO_APP_ENVIRONMENT__) {
        window.microApp.clearDataListener()
      }
    }
  }, [])

  return View
}

const unmount = () => {
  console.log(`${window.__MICRO_APP_NAME__}子应用已经卸载`)
  root.unmount()
}

const mount = (data?: any) => {
  const mergedBaseName = window.__MICRO_APP_BASE_ROUTE__ ? `${window.__MICRO_APP_BASE_ROUTE__}/${window.__MICRO_APP_NAME__}` : ''
  if(!root['_internalRoot']) {
    root = createRoot(document.getElementById('root'));
  }

  root.render(
    <React.StrictMode>
      <BrowserRouter basename={mergedBaseName}>
        <ConfigProvider locale={zhCN}>
          <App />
        </ConfigProvider>
      </BrowserRouter>
    </React.StrictMode>
  )
  console.log(`${window.__MICRO_APP_NAME__}子应用已经渲染`, data)
}

// 微前端环境下，注册mount和unmount方法
if (window.__MICRO_APP_ENVIRONMENT__) {
  window[`micro-app-${window.__MICRO_APP_NAME__}`] = { mount, unmount }
} else {
  mount();
}
