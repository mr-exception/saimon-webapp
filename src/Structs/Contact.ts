import { IndexableType } from "dexie";

export interface IContact {
  address: string;
  name: string;
  hosts: {
    hostId: IndexableType;
    public_key: string;
  }[];
}
