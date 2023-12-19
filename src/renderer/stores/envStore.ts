import { Instance, types } from 'mobx-state-tree';
import { IEnvSetting } from '../../interfaces';

const ENV_STORE_KEY = 'env-setting';

const getEnvSetting = () => {
  const envStr = localStorage.getItem(ENV_STORE_KEY);
  const envSetting: IEnvSetting = envStr ? JSON.parse(envStr) : {
    language: 'zh-hans'
  };
  return envSetting;
};

const saveEnvSetting = (setting: IEnvSetting) => {
  localStorage.setItem(ENV_STORE_KEY, JSON.stringify(setting));
};

export const EnvStore = types.model({
  language: types.maybeNull(types.string)
})
  .actions(self => {
    return {
      setEnv: (setting: IEnvSetting) => {
        self.language = setting.language;
        saveEnvSetting(self);
      },
      loadEnv: () => {
        const setting = getEnvSetting();
        self.language = setting.language;
      }
    };
  });

export type EnvStoreModel = Instance<typeof EnvStore>;
