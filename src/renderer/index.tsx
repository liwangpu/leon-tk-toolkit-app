import { createRoot } from 'react-dom/client';
import App from './App';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import React from 'react';
import './index.scss';
import Test from './pages/Test';
import EnvSetting from './pages/EnvSetting';
import AccountManager from './pages/AccountManager';
import { MessageTopic } from '../enums';


const router = createBrowserRouter([
  {
    path: 'app',
    element: <App />,
    children: [
      {
        path: 'env-setting',
        element: <EnvSetting />
      },
      {
        path: 'account-manager',
        element: <AccountManager />
      },
      {
        path: 'test',
        element: <Test />
      },
      {
        index: true,
        element: <Navigate to='env-setting' replace={true} />
      }
    ]
  },
  {
    index: true,
    element: <Navigate to='/app' replace={true} />
  },
  {
    path: '*',
    element: <Navigate to='/app' replace={true} />
  }
]);


const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
// root.render(<App />);

root.render(
  <RouterProvider router={router} />
);

// calling IPC exposed from preload script

// window.electron.ipcRenderer.sendMessage('ipc-example', ['ping']);
