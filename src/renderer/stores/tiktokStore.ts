import { flow, getParent, Instance, types } from 'mobx-state-tree';
import { ITKAccount } from '../../interfaces';
import { tkAccountRepository } from '../repositories';
import { translateLanguageCodeToDisplayName } from '../utils';
import type { AppStoreModel } from './index';

const Account = types.model({
  id: types.string,
  account: types.string,
  password: types.string,
  language: types.optional(types.string, ''),
  onLine: types.optional(types.boolean, false)
})
  .views(self => {
    return {
      get key() {
        return self.id;
      },
      get languageDisplayName() {
        if (!self.language) return null;
        return translateLanguageCodeToDisplayName(self.language);
      }
    };
  })
  .actions(self => {
    return {
      toggleOnLine: flow(function* (onLine: boolean) {
        self.onLine = onLine;
      })
    };
  });

export type AccountModel = Instance<typeof Account>;

export const TiktokStore = types.model({
  accounts: types.map(Account)
})
  .views(self => {
    return {
      getAccount: (id: string) => {
        if (!id) return null;
        return self.accounts.get(id);
      }
    };
  })
  .actions(self => {
    return {
      addAccount: flow(function* (ac: ITKAccount) {
        if (!ac) {
          return;
        }

        const account = yield  tkAccountRepository.add(ac);
        self.accounts.set(account.id, account);
        return account;
      }),
      updateAccount: flow(function* (ac: ITKAccount) {
        if (!ac || !ac.id) {
          return;
        }

        const account = yield tkAccountRepository.update(ac);
        self.accounts.set(account.id, account);
        return account;
      }),
      queryAccounts: flow(function* () {
        const accounts = yield tkAccountRepository.query();
        self.accounts.clear();
        accounts.forEach(ac => {
          self.accounts.set(ac.id, ac);
        });
      }),
      launchAccounts: flow(function* (ids: Array<string>) {
        if (!ids || !ids.length) {
          return;
        }
        const {envStore} = getParent<AppStoreModel>(self);
        for (const id of ids) {
          const account = self.accounts.get(id);
          if (!account || envStore.language !== account.language) return;
          yield account.toggleOnLine(true);
        }
      }),
      shutDownAccounts: flow(function* (ids: Array<string>) {
        if (!ids || !ids.length) return;
        for (const id of ids) {
          const account = self.accounts.get(id);
          if (account) {
            yield  account.toggleOnLine(false);
          }
        }
      })
    };
  });

export type TiktokStoreModel = Instance<typeof TiktokStore>;
