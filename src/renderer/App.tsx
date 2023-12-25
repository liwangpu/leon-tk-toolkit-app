import { ExperimentFilled, ExperimentOutlined, IdcardFilled, IdcardOutlined, SettingFilled, SettingOutlined } from '@ant-design/icons';
import {Outlet} from 'react-router-dom';
import {AppSidebar, IMenu} from 'leon-rc-toolkit';
import {useEffect} from 'react';
import {addMiddleware} from 'mobx-state-tree';
import {toJS} from 'mobx';
import styles from './app.module.scss';
import {getAppStore} from './stores';
import {useMessageCenter} from './hooks';
import type {IEnvSetting, ITKAccount} from '../interfaces';
import {MessageTopic} from '../enums';

const appStore = getAppStore();
appStore.envStore.loadEnv();

if (window.electron) {
  window.electron.ipcRenderer.on(
    MessageTopic.afterTKCloseWindow,
    (account: ITKAccount) => {
      appStore.tiktokStore.shutDownAccounts([account.id]);
    },
  );
}

const routes: Array<IMenu> = [
  {
    title: '账号管理',
    url: '/app/account-manager',
    icon: <IdcardOutlined/>,
    activedIcon: <IdcardFilled/>,
  },
  {
    title: '环境设置',
    url: '/app/env-setting',
    icon: <SettingOutlined/>,
    activedIcon: <SettingFilled/>,
  },
  // {
  //   title: '检查DNS',
  //   url: '/app/dns-check',
  //   icon: <RadarChartOutlined />,
  //   // activedIcon: <ExperimentFilled />,
  // },
  // {
  //   title: '测试',
  //   url: '/app/test',
  //   icon: <ExperimentOutlined />,
  //   activedIcon: <ExperimentFilled />,
  // },
];

function App() {
  const message = useMessageCenter();
  useEffect(() => {
    addMiddleware(appStore.tiktokStore, (call, next) => {
      if (call.type === 'action' && call.name === 'toggleOnLine') {
        const onLine: boolean = call.args[0];
        const account: ITKAccount = toJS(call.context);
        if (onLine) {
          message.startupTiktokWindow(account);
        } else {
          message.shutDownTiktokWindow(account);
        }
      }
      next(call);
    });

    addMiddleware(appStore.envStore, (call, next) => {
      if (call.type === 'action' && call.name === 'setEnv') {
        const env: IEnvSetting = call.args[0];
        message.settingTiktokEnv(env);
      }
      next(call);
    });

    return () => {
    };
  }, []);

  return (
    <div className={styles['app']}>
      <div className={styles['app__navigation']}>
        <AppSidebar menus={routes}/>
      </div>
      <div className={styles['app__page']}>
        <Outlet/>
      </div>
    </div>
  );
}

export default App;
