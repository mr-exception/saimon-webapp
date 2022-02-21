import { IndexableType } from "dexie";

export interface IContact {
  address: string;
  name: string;
  public_key: string;
  shared_private_key: string;
  hosts: {
    hostId: IndexableType;
    active_at: number;
  }[];
}
