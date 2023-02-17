import './public-path'
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

const unmount = () => {
  console.log(`${window.__MICRO_APP_NAME__}子应用已经卸载`)
  root.unmount()
}

const mount = (data) => {
  root.render(
    <React.StrictMode>
      <App />
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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
