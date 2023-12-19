import { getTKPartitionKey, IMessageHandler, IMessageParam } from './index';
import { windowManager } from '../commons';

export class TkCloseWindowHandler implements IMessageHandler {

  handle({ data }: IMessageParam & { data: { account: string } }): any {
    const windowKey = getTKPartitionKey(data.account);
    const win = windowManager.getWindow(windowKey);
    console.log('------------------------------------');
    if (!win) return;
    win.close();
  }

}
