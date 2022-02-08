import Dexie, { IndexableType, Table } from "dexie";
import { IContact } from "Structs/Contact";
import { IHost } from "Structs/Host";

export function initDB(): Dexie {
  const db = new Dexie("salimon");
  db.version(1).stores({
    hosts: "++id,url,name,commission_fee,subscription_fee,paid_subscription,rt,secret",
    contacts: "++id,name,address,public_key,hosts",
  });
  return db;
}

export function getHostsTable(): Table<IHost, IndexableType> {
  const db = initDB();
  return db.table<IHost>("hosts");
}

export async function getHostsFromDB(): Promise<{ value: IHost; id: IndexableType }[]> {
  const table = getHostsTable();
  const keys = await table.toCollection().primaryKeys();
  return await Promise.all(
    keys.map(
      (key) =>
        new Promise<{ value: IHost; id: IndexableType }>(async (resolve, reject) => {
          const record = await table.get(key);
          if (!record) return reject(`host with key ${key} not found`);
          resolve({ value: record, id: key });
        })
    )
  );
}

export async function insertHostInDB(value: IHost) {
  const table = getHostsTable();
  return table.add(value);
}

export async function deleteHostFromDB(id: IndexableType) {
  const table = getHostsTable();
  return table.delete(id);
}

export function getContactsTable(): Table<IContact, IndexableType> {
  const db = initDB();
  return db.table<IContact>("contacts");
}

export async function getContactsFromDB(): Promise<{ value: IContact; id: IndexableType }[]> {
  const table = getContactsTable();
  const keys = await table.toCollection().primaryKeys();
  return await Promise.all(
    keys.map(
      (key) =>
        new Promise<{ value: IContact; id: IndexableType }>(async (resolve, reject) => {
          const record = await table.get(key);
          if (!record) return reject(`host with key ${key} not found`);
          resolve({ value: record, id: key });
        })
    )
  );
}

export async function insertContactInDB(value: IContact) {
  const table = getContactsTable();
  return table.add(value);
}

export async function deleteContactFromDB(id: IndexableType) {
  const table = getContactsTable();
  return table.delete(id);
}

// export default class Storage {
//   private _db: Dexie;
//   private _hosts: Dexie.Table<IHost, number>;
//   private _contacts: Dexie.Table<IContact, number>;
//   private _messages: Dexie.Table<IMessage, number>;
//   constructor() {
//     this._db = new Dexie("salimon");
//     this._db.version(3).stores({
//       hosts: "++id,name,address,type,protocol,advertise_period,score",
//       contacts: "++id,first_name,last_name,public_key,Advertiser_host_ids,relay_host_ids",
//       messages: "++id,network_id,contact_id,content,public_key,box_type,date,packets,packet_count",
//     });
//     this._hosts = this._db.table("hosts");
//     this._contacts = this._db.table("contacts");
//     this._messages = this._db.table("messages");
//   }

//   public getTable<T>(name: string): Dexie.Table<T, number> {
//     return this._db.table(name);
//   }

//   // query in entities
//   public async getHosts(): Promise<IHost[]> {
//     const keys = await this._hosts.toCollection().primaryKeys();
//     return await Promise.all(
//       keys.map(
//         (key) =>
//           new Promise<IHost>(async (resolve, reject) => {
//             const record = await this._hosts.get(key);
//             if (!record) return reject(`host with key ${key} not found`);
//             record.id = key;
//             resolve(record);
//           })
//       )
//     );
//   }
//   public async getContacts(): Promise<IContact[]> {
//     const keys = await this._contacts.toCollection().primaryKeys();
//     return await Promise.all(
//       keys.map(
//         (key) =>
//           new Promise<IContact>(async (resolve, reject) => {
//             const record = await this._contacts.get(key);
//             if (!record) return reject(`contact with key ${key} not found`);
//             record.id = key;
//             resolve(record);
//           })
//       )
//     );
//   }
//   public async getMessages(contact_id?: number): Promise<IMessage[]> {
//     let keys: number[] = [];
//     if (!contact_id) keys = await this._messages.toCollection().primaryKeys();
//     else keys = await this._messages.where({ contact_id }).primaryKeys();
//     return await Promise.all(
//       keys.map(
//         (key) =>
//           new Promise<IMessage>(async (resolve, reject) => {
//             const record = await this._messages.get(key);
//             if (!record) return reject(`contact with key ${key} not found`);
//             record.id = key;
//             resolve(record);
//           })
//       )
//     );
//   }

//   public async getMessageByNetworkId(network_id: string) {
//     return await this._messages.get({ network_id });
//   }
// }
