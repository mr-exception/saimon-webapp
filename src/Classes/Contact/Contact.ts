import Entity from "Classes/Entity/Entity";
import Key from "core/Key/Key";
import Storage from "storage/Storage";

export default class Contact extends Entity<IContact> {
  public key: Key;
  constructor(
    public first_name: string,
    public last_name: string,
    public public_key: string,
    storage: Storage
  ) {
    super(storage, "contacts");
    this.key = Key.generateKeyByPublicKey(public_key);
  }
  /**
   * returns the object of entity based on entity interface
   */
  public getFormattedObject(): IContact {
    return {
      first_name: this.first_name,
      last_name: this.last_name,
      public_key: this.public_key,
    };
  }
}

export interface IContact {
  first_name: string;
  last_name: string;
  public_key: string;
}
