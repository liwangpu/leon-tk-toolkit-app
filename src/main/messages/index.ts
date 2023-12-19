import { IMessage } from '../../interfaces';
import { MessageTopic } from '../../enums';
import { OpenHtmlFileHandler } from './openHtmlFileHandler';
import { TkOpenWindowHandler } from './tkOpenWindowHandler';
import { BrowserWindow } from 'electron';
import { TkGotoLoginHandler } from './tkGotoLoginHandler';
import { TkCloseWindowHandler } from './tkCloseWindowHandler';
import { TkSettingEnvWindowHandler } from './tkSettingEnvHandler';

export interface IMessageParam {
  event: any;
  topic: MessageTopic | string;
  data?: any;
}

export interface IMessageHandlerContext {
  mainWindow: BrowserWindow;
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
    default:
      return null;
  }
}

export async function handleMessage(params: IMessageParam & IMessageHandlerContext) {
  const { mainWindow, event, topic, data } = params;
  const Handler = getActionHandler(topic as any);
  // console.log(`params:`, params);
  // console.log(`Handler:`, Handler);
  // console.log(`----------------------------------`,);
  // console.log(`topic:`,topic,typeof Handler);
  if (Handler) {
    const handler = new Handler({ mainWindow });
    return handler.handle({ event, topic, data });
  }

}

export function getTKPartitionKey(account: string) {
  return `persist:tiktok@${account}`;
}
