import { getTKPartitionKey, IMessageHandler, IMessageHandlerContext, IMessageParam } from "./index";
import { BrowserWindow, Menu, MenuItemConstructorOptions, session } from "electron";
import { getExternalPreload, windowManager } from "../commons";
import { getTiktokScript } from "../externalScripts";
import { MessageTopic } from "../../enums";
import log from "electron-log";

const HOME_URL = `https://www.tiktok.com/`;

// const HOME_URL = `http://127.0.0.1:5500/`;

export class TkOpenWindowHandler implements IMessageHandler {

  constructor(protected context: IMessageHandlerContext) {
  }

  handle({ event, data }: IMessageParam & { data: { account: string } }): any {
    const windowKey = getTKPartitionKey(data.account);

    if (windowManager.getWindow(windowKey)) {
      return;
    }

    const currentSession = session.fromPartition(windowKey);

    const agent = {
      // userAgent: "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) leon-tk-toolkit-app/0.0.2 Chrome/116.0.5845.188 Electron/26.2.1 Safari/537.36",
      acceptLanguages: "th-TH"
    };

    // log.info('user agent',currentSession.getUserAgent());

    const childWin = new BrowserWindow({
      width: 1020,
      height: 780,
      // width: 360,
      // height: 640,
      title: data.account,
      // parent: this.context.mainWindow,
      webPreferences: {
        session: currentSession,
        preload: getExternalPreload("tiktokPreload.js"),
        // devTools: false,
        devTools: true
      }
    });

    const { webContents } = childWin;
    webContents.debugger.attach(); // You only need to call this once

    webContents.debugger.sendCommand("Emulation.setUserAgentOverride", {
      userAgent: agent.userAgent, // You could pass it to the main process from the renderer, or use your own
      acceptLanguage: data.language
    });

    TkOpenWindowHandler.createMenu({ win: childWin, currentSession });

    windowManager.setWindow(windowKey, childWin);

    childWin.loadURL(HOME_URL);

    childWin.on("page-title-updated", function(e) {
      e.preventDefault();
    });

    childWin.once("ready-to-show", () => {
      childWin.show();
      webContents.setAudioMuted(true);
    });

    // Once dom-ready
    childWin.webContents.once("dom-ready", () => {
      childWin.webContents.executeJavaScript(getTiktokScript());
    });

    childWin.once("closed", () => {
      windowManager.removeWindow(windowKey);
      this.context.mainWindow.webContents.send(MessageTopic.afterTKCloseWindow, data);
    });

  }

  private static createMenu(props: { win: BrowserWindow, currentSession: Electron.Session }) {
    const { win, currentSession } = props;
    const { webContents } = win;


    const template: Array<MenuItemConstructorOptions> = [
      {
        id: "audio",
        label: "音频",
        submenu: [
          {
            id: "audio__close",
            label: "关闭声音",
            click: () => {
              webContents.setAudioMuted(true);
            }
          },
          {
            id: "audio__open",
            label: "开启声音",
            click: () => {
              webContents.setAudioMuted(false);
            }
          }
        ]
      },
      {
        label: "开发调试",
        submenu: [
          {
            label: "刷新",
            // accelerator: "Ctrl+W",
            click: () => {
              webContents.reload();
            }
          },
          {
            label: "清除缓存",
            click: () => {
              currentSession.clearCache().then(() => {
                webContents.reload();
              });
            }
          }
        ]
      }
    ];

    const menu = Menu.buildFromTemplate(template);
    win.setMenu(menu);
  }

}
