import DBModel from "Classes/DBModel/DBModel";
import RelayHost from "Classes/Host/RelayHost";
import { ConnectionStatus } from "Classes/Connection/def";
import Key from "Classes/Key/Key";
import { updateContact } from "Redux/actions/contacts";
import store from "Redux/store";

export default class Contact extends DBModel<IContact> {
  public key: Key;
  public first_name: string;
  public last_name: string;
  public public_key: string;
  public advertiser_host_ids: number[];
  public relay_host_ids: number[];
  constructor(contact_record: IContact) {
    super("contacts", contact_record.id, store.getState().storage);
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
  public getAddress(): string {
    return this.key.getPublicKeyNormalized();
  }

  // status data
  private status_list: { host_id: number; status: ConnectionStatus }[] = [];
  public updateStatus(host_id: number, status: ConnectionStatus) {
    const state_record = this.status_list.find(
      (record) => record.host_id === host_id
    );
    if (state_record) {
      state_record.status = status;
    } else {
      this.status_list.push({ host_id, status });
    }
    store.dispatch(updateContact(this));
  }

  public getStatusStr(): string {
    if (this.status_list.length === 0) return "no connection found";
    const has_active_connection = !!this.status_list.find(
      (record) => record.status === "CONNECTED"
    );
    return has_active_connection ? "online" : "offline";
  }

  public getActiveRelays(): RelayHost[] {
    const ids = this.status_list
      .filter((record) => record.status === "CONNECTED")
      .map((record) => record.host_id);
    const hosts = store
      .getState()
      .hosts.filter((record) => ids.includes(record.id)) as RelayHost[];
    return hosts;
  }

  public get name(): string {
    return `${this.first_name} ${this.last_name}`;
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
