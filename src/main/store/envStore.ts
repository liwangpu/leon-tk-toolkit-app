import Store from 'electron-store';
import { IEnvSetting } from '../../interfaces';

const store = new Store();

// export function getStore() {
//   return store;
// }

// export function getLanguage() {
//   store.get();
// }

const ENV_STORE_KEY = 'env';

export function getEnv(): IEnvSetting {
  return store.get(ENV_STORE_KEY) as any || {};
}

export function setEnv(env: IEnvSetting) {
  store.set(ENV_STORE_KEY, env);
}
