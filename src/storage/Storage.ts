import Host, { IHost } from "Classes/Host/Host";
import Dexie from "dexie";
export default class Storage {
  private _db: Dexie;
  private _hosts: Dexie.Table<IHost, number>;
  constructor() {
    this._db = new Dexie("salimon");
    this._db.version(1).stores({
      hosts: "++id,name,address,type,protocl,advertise_period,score",
    });
    this._hosts = this._db.table("hosts");
  }

  public getTable<T>(name: string): Dexie.Table<T, number> {
    return this._db.table(name);
  }

  // query in entities
  public async getHosts(): Promise<Host[]> {
    const keys = await this._hosts.toCollection().primaryKeys();
    return await Promise.all(
      keys.map(
        (key) =>
          new Promise<Host>(async (resolve, reject) => {
            const record = await this._hosts.get(key);
            if (!record) return reject(`host with key ${key} not found`);
            const host = new Host(
              record.name,
              record.address,
              record.score,
              record.type,
              record.protocl,
              record.advertise_period,
              this
            );
            resolve(host);
          })
      )
    );
  }
}
