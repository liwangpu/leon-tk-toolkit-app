import { Instance, types } from 'mobx-state-tree';
import { AccountModel, TiktokStore, TiktokStoreModel } from './tiktokStore';
import { EnvStore, EnvStoreModel } from './envStore';

const AppStore = types.model({
  envStore: EnvStore,
  tiktokStore: TiktokStore
});

export type AppStoreModel = Instance<typeof AppStore>;

let store: AppStoreModel;

export function getAppStore(): AppStoreModel {
  if (!store) {
    store = AppStore.create({
      envStore: {},
      tiktokStore: {}
    });
  }
  return store;
}

export type { AccountModel, TiktokStoreModel, EnvStoreModel };
