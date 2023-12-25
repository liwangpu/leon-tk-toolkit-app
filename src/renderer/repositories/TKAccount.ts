import Dexie from 'dexie';
import type {ITKAccount} from '../../interfaces';

const db = new Dexie('tk_account');

db.version(1).stores({
  account: '++id,account,password,language',
});

const table = db.table('account');

export async function add(account: ITKAccount): Promise<ITKAccount> {
  const id = await table.add(account);
  return {...account, id: id.toString()};
}

export async function update(account: ITKAccount): Promise<ITKAccount> {
  const nid = Number.parseInt(account.id, 10);
  await table.update(nid, {...account, id: nid});
  return account;
}

export async function query(): Promise<Array<ITKAccount>> {
  let acc = await table.toArray();
  acc = acc || [];
  return acc.map(m => ({...m, id: m.id.toString()}));
}
