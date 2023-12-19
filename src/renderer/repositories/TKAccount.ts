import { ITKAccount } from '../../interfaces';
import { faker } from '@faker-js/faker';

const accounts: Array<ITKAccount> = [
  { id: 'hk1', account: 'leon-hk1.pu@outlook.com', password: 'Leon.pu199139!', language: 'zh-hans' },
  { id: 'hk2', account: 'leon-hk2.pu@outlook.com', password: 'Leon.pu199139!', language: 'zh-hans' },
  { id: 'th1', account: 'leon-th1.pu@outlook.com', password: 'Leon.pu199139!', language: 'th-TH' },
  { id: 'th2', account: 'leon-th2.pu@outlook.com', password: 'Leon.pu199139!', language: 'th-TH' },

];

const ACCOUNTS = new Map(accounts.map(ac => ([ac.id, ac])));

export async function add(account: ITKAccount): Promise<ITKAccount> {
  const acc: ITKAccount = { ...account, id: faker.string.uuid() };
  ACCOUNTS.set(acc.id,acc);
  return acc;
}

export async function update(account: ITKAccount): Promise<ITKAccount> {
  if (!account || !account.id) return account;
  ACCOUNTS.set(account.id,account);
  return account;
}

export async function query(): Promise<Array<ITKAccount>> {
  return [...ACCOUNTS.values()];
}
