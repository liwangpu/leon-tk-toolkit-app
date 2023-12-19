import { IMessageHandler, IMessageParam } from './index';
import { IEnvSetting } from '../../interfaces';
import { envStore } from '../store';

export class TkSettingEnvWindowHandler implements IMessageHandler {

  handle({ data }: { data: IEnvSetting } & IMessageParam): any {

    if (data.language) {
      envStore.setEnv(data);
    }
  }

}
