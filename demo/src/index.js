import './public-path';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import routes from './router';
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container);

global.API_PREFIX = 'http://localhost:3000';

const App= () => {
  const View = useRoutes(routes)
  return View
}

window.unmount = () => {
  root.unmount()
}

root.render(
  <React.StrictMode>
    <BrowserRouter basename={window.__MICRO_APP_BASE_ROUTE__ ?? '/demo'}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
