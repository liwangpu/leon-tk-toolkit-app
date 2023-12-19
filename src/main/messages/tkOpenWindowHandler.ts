import { getTKPartitionKey, IMessageHandler, IMessageHandlerContext, IMessageParam } from './index';
import { BrowserWindow, Menu, session } from 'electron';
import { getExternalPreload, windowManager } from '../commons';
import { getExternalScript } from '../externalScripts';
import { MessageTopic } from '../../enums';

const HOME_URL = `https://www.tiktok.com/`;

// const HOME_URL = `http://127.0.0.1:5500/`;

export class TkOpenWindowHandler implements IMessageHandler {

  constructor(protected context: IMessageHandlerContext) {
  }

  handle({ event, data }: IMessageParam & { data: { account: string } }): any {
    const windowKey = getTKPartitionKey(data.account);
    console.log(`------------------------:`);
    if (windowManager.getWindow(windowKey)) {
      return;
    }

    // const env = envStore.getEnv();
    //
    // if (env.language !== data.language) {
    //   console.log(`================ cannot open not same env lang window ================ `);
    //   return;
    // }

    const currentSession = session.fromPartition(windowKey);

    const agent = {
      userAgent: 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
      acceptLanguages: 'th-TH'
    };
    // currentSession.setUserAgent(agent.userAgent, agent.acceptLanguages);
    const childWin = new BrowserWindow({
      width: 360,
      height: 640,
      title: data.account,
      // parent: this.context.mainWindow,
      webPreferences: {
        session: currentSession,
        preload: getExternalPreload('tiktokPreload.js'),
        devTools: false
      }
    });

    const webContents = childWin.webContents;
    webContents.debugger.attach(); // You only need to call this once

// This can be run to change the locale code whenever needed
    webContents.debugger.sendCommand('Emulation.setUserAgentOverride', {
      userAgent: agent.userAgent, // You could pass it to the main process from the renderer, or use your own
      acceptLanguage: data.language
    });

    TkOpenWindowHandler.createMenu(childWin);

    windowManager.setWindow(windowKey, childWin);

    childWin.loadURL(HOME_URL);

    childWin.on('page-title-updated', function(e) {
      e.preventDefault();
    });

    childWin.once('ready-to-show', () => {
      childWin.show();
      // childWin.setTitle(data.account);
      // childWin.webContents.openDevTools();
    });

    // Once dom-ready
    childWin.webContents.once('dom-ready', () => {
      childWin.webContents.executeJavaScript(getExternalScript('tiktok.js'));
    });

    childWin.once('closed', () => {
      windowManager.removeWindow(windowKey);
      this.context.mainWindow.webContents.send(MessageTopic.afterTKCloseWindow, data);
    });

  }

  private static createMenu(win: BrowserWindow) {
    const template = [
      {
        label: '开发调试',
        submenu: [
          {
            label: '刷新',
            accelerator: 'Ctrl+W',
            click: () => {
              // this.mainWindow.close();
              win.webContents.reload();
            }
          }
        ]
      }
    ];

    const menu = Menu.buildFromTemplate(template);
    win.setMenu(menu);
  }

}
