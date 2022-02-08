import { IndexableType } from "dexie";

export interface IRecord<T> {
  value: T;
  id: IndexableType;
}
