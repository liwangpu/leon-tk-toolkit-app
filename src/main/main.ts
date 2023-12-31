import path from "path";
import {app, BrowserWindow, ipcMain, shell} from 'electron';
import {autoUpdater} from "electron-updater";
import log from "electron-log";
import MenuBuilder from "./menu";
import {resolveHtmlPath} from "./util";
import {handleMessage} from "./messages";
import {MessageTopic} from "../enums";

class AppUpdater {
    constructor() {
        log.transports.file.level = "info";

        autoUpdater.logger = log;
        autoUpdater.checkForUpdatesAndNotify();
    }
}

let mainWindow: BrowserWindow | null = null;

if (process.env.NODE_ENV === "production") {
    // const sourceMapSupport = require('source-map-support');
    // sourceMapSupport.install();
}

const isDebug =
    process.env.NODE_ENV === "development" || process.env.DEBUG_PROD === "true";

if (isDebug) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require("electron-debug")();
}

const installExtensions = async () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const installer = require("electron-devtools-installer");
    const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
    const extensions = ["REACT_DEVELOPER_TOOLS"];

    return installer
        .default(
            extensions.map((name) => installer[name]),
            forceDownload
        )
        .catch(console.log);
};

const createWindow = async () => {
    if (isDebug) {
        await installExtensions();
    }

    const RESOURCES_PATH = app.isPackaged
        ? path.join(process.resourcesPath, "assets")
        : path.join(__dirname, "../../assets");

    const getAssetPath = (...paths: string[]): string => {
        return path.join(RESOURCES_PATH, ...paths);
    };

    mainWindow = new BrowserWindow({
        show: false,
        width: 1024,
        height: 860,
        icon: getAssetPath("icon.png"),
        title: `TK小工具  v${app.getVersion()}`,
        webPreferences: {
            devTools: false,
            preload: app.isPackaged
                ? path.join(__dirname, "preload.js")
                : path.join(__dirname, "../../.erb/dll/preload.js"),
        },
    });

    mainWindow.loadURL(resolveHtmlPath("index.html"));

    mainWindow.on("page-title-updated", e => {
        e.preventDefault();
    });

    mainWindow.on("ready-to-show", () => {
        if (!mainWindow) {
            throw new Error("'mainWindow' is not defined");
        }
        if (process.env.START_MINIMIZED) {
            mainWindow.minimize();
        } else {
            mainWindow.show();
        }
    });

    mainWindow.on("closed", () => {
        mainWindow = null;
    });

    const menuBuilder = new MenuBuilder(mainWindow);
    menuBuilder.buildMenu();

    // Open urls in the user's browser
    mainWindow.webContents.setWindowOpenHandler((edata) => {
        shell.openExternal(edata.url);
        return {action: "deny"};
    });

    // Remove this if your app does not use auto updates
    // eslint-disable-next-line
    new AppUpdater();
};

process.on("uncaughtException", error => {
    log.error(error);
});

/**
 * Add event listeners...
 */
app.on("window-all-closed", () => {
    // Respect the OSX convention of having the application in memory even
    // after all windows have been closed
    if (process.platform !== "darwin") {
        app.quit();
    }
});

// app.commandLine.appendSwitch('lang', 'en-US');
// app.commandLine.appendSwitch("lang", "th-TH");

const listenMessage = () => {
    const topics = Object.keys(MessageTopic);

    for (const topic of topics) {
        // eslint-disable-next-line no-loop-func
        ipcMain.on(topic, async (event, arg) => {
            handleMessage({mainWindow: mainWindow!, event, topic, data: arg} as any);
        });
    }
};

app
    .whenReady()
    .then(() => {
        createWindow();
        app.on("activate", () => {
            // On macOS it's common to re-create a window in the app when the
            // dock icon is clicked and there are no other windows open.
            if (mainWindow === null) createWindow();
        });

        listenMessage();
    })
    .catch(console.log);
