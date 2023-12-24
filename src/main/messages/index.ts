import { IMessage } from "../../interfaces";
import { MessageTopic } from "../../enums";
import { OpenHtmlFileHandler } from "./openHtmlFileHandler";
import { TkOpenWindowHandler } from "./tkOpenWindowHandler";
import { BrowserWindow } from "electron";
import { TkGotoLoginHandler } from "./tkGotoLoginHandler";
import { TkCloseWindowHandler } from "./tkCloseWindowHandler";
import { TkSettingEnvWindowHandler } from "./tkSettingEnvHandler";
import { TkDomReadyHandler } from "./tkDomReadyHandler";
import { TkGotoRegisterHandler } from "./tkGotoRegisterHandler";

export interface IMessageParam {
  event: any;
  topic: MessageTopic | string;
  data?: any;
}

export interface IMessageHandlerContext {
  mainWindow: BrowserWindow;
  handler: (params: IMessageParam) => any;
}

export interface IMessageHandler {
  handle(params: IMessageParam): Promise<any> | any;
}

export interface MessageHandlerConstructor {
  new(context: IMessageHandlerContext): IMessageHandler;
}

function getActionHandler(topic: MessageTopic): MessageHandlerConstructor | null {
  switch (topic) {
    case MessageTopic.openHtmlFile:
      return OpenHtmlFileHandler;
    case MessageTopic.settingEnv:
      return TkSettingEnvWindowHandler;
    case MessageTopic.tkOpenWindow:
      return TkOpenWindowHandler;
    case MessageTopic.tkCloseWindow:
      return TkCloseWindowHandler;
    case MessageTopic.tkGotoLogin:
      return TkGotoLoginHandler;
    case MessageTopic.tkGotoRegister:
      return TkGotoRegisterHandler;
    case MessageTopic.tkDomReady:
      return TkDomReadyHandler;
    default:
      return null;
  }
}

export async function handleMessage(params: IMessageParam & IMessageHandlerContext) {
  const { mainWindow, event, topic, data } = params;

  const handler = (props: IMessageParam) => {
    const Handler = getActionHandler(props.topic as any);
    if (Handler) {
      const h = new Handler({ mainWindow, handler });
      return h.handle(props);
    }
  };

  return handler({ event, topic, data });
}

export function getTKPartitionKey(account: string) {
  return `persist:tiktok_1@${account}`;
}
