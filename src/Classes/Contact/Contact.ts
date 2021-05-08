import Entity from "Classes/Entity/Entity";
import Key from "core/Key/Key";
import Storage from "storage/Storage";

export default class Contact extends Entity<IContact> {
  public key: Key;
  public first_name: string;
  public last_name: string;
  public public_key: string;
  constructor(contact_record: IContact, storage: Storage) {
    super(storage, "contacts", contact_record.id);
    this.first_name = contact_record.first_name;
    this.last_name = contact_record.last_name;
    this.public_key = contact_record.public_key;
    this.key = Key.generateKeyByPublicKey(
      `-----BEGIN PUBLIC KEY-----${this.public_key}-----END PUBLIC KEY-----`
    );
  }
  /**
   * returns the object of entity based on entity interface
   */
  public getFormattedObject(): IContact {
    return {
      id: this.id,
      first_name: this.first_name,
      last_name: this.last_name,
      public_key: this.public_key,
    };
  }
}

export interface IContact {
  id: number;
  first_name: string;
  last_name: string;
  public_key: string;
}
