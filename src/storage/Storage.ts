import { IContact } from "Classes/Contact/Contact";
import { IHost } from "Classes/Host/Host";
import Dexie from "dexie";
export default class Storage {
  private _db: Dexie;
  private _hosts: Dexie.Table<IHost, number>;
  private _contacts: Dexie.Table<IContact, number>;
  constructor() {
    this._db = new Dexie("salimon");
    this._db.version(1).stores({
      hosts: "++id,name,address,type,protocl,advertise_period,score",
      contacts: "++id,first_name,last_name,public_key",
    });
    this._hosts = this._db.table("hosts");
    this._contacts = this._db.table("contacts");
  }

  public getTable<T>(name: string): Dexie.Table<T, number> {
    return this._db.table(name);
  }

  // query in entities
  public async getHosts(): Promise<IHost[]> {
    const keys = await this._hosts.toCollection().primaryKeys();
    return await Promise.all(
      keys.map(
        (key) =>
          new Promise<IHost>(async (resolve, reject) => {
            const record = await this._hosts.get(key);
            if (!record) return reject(`host with key ${key} not found`);
            record.id = key;
            resolve(record);
          })
      )
    );
  }
  public async getContacts(): Promise<IContact[]> {
    const keys = await this._contacts.toCollection().primaryKeys();
    return await Promise.all(
      keys.map(
        (key) =>
          new Promise<IContact>(async (resolve, reject) => {
            const record = await this._contacts.get(key);
            if (!record) return reject(`contact with key ${key} not found`);
            record.id = key;
            resolve(record);
          })
      )
    );
  }
}
