import { createRoot } from 'react-dom/client';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import React from 'react';
import App from './App';
import './index.scss';
import Test from './pages/Test';
import EnvSetting from './pages/EnvSetting';
import AccountManager from './pages/AccountManager';
import DNSCheck from './pages/DNSCheck';

const router = createBrowserRouter([
  {
    path: 'app',
    element: <App />,
    children: [
      {
        path: 'env-setting',
        element: <EnvSetting />,
      },
      {
        path: 'account-manager',
        element: <AccountManager />,
      },
      {
        path: 'dns-check',
        element: <DNSCheck />,
      },
      {
        path: 'test',
        element: <Test />,
      },
      {
        index: true,
        element: <Navigate to='account-manager' replace />,
      },
    ],
  },
  {
    index: true,
    element: <Navigate to='/app' replace />,
  },
  {
    path: '*',
    element: <Navigate to='/app' replace />,
  },
]);


const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

root.render(
  <RouterProvider router={router} />
);
