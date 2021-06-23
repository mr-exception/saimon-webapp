import Entity from "Classes/Entity/Entity";
import Key from "core/Key/Key";

export default class Contact extends Entity<IContact> {
  public key: Key;
  public first_name: string;
  public last_name: string;
  public public_key: string;
  public advertiser_host_ids: number[];
  public relay_host_ids: number[];
  constructor(contact_record: IContact) {
    super("contacts", contact_record.id);
    this.first_name = contact_record.first_name;
    this.last_name = contact_record.last_name;
    this.public_key = contact_record.public_key;
    this.advertiser_host_ids = contact_record.advertiser_host_ids;
    this.relay_host_ids = contact_record.relay_host_ids;
    this.key = Key.generateKeyByPublicKey(
      `-----BEGIN PUBLIC KEY-----${this.public_key}-----END PUBLIC KEY-----`
    );
  }
  public updateKey(): void {
    this.key = Key.generateKeyByPublicKey(
      `-----BEGIN PUBLIC KEY-----${this.public_key}-----END PUBLIC KEY-----`
    );
  }
  /**
   * returns the object of entity based on entity interface
   */
  public getFormattedObject(): any {
    return {
      first_name: this.first_name,
      last_name: this.last_name,
      public_key: this.public_key,
      advertiser_host_ids: this.advertiser_host_ids,
      relay_host_ids: this.relay_host_ids,
    };
  }
}

export interface IContact {
  id: number;
  first_name: string;
  last_name: string;
  public_key: string;
  advertiser_host_ids: number[];
  relay_host_ids: number[];
}
