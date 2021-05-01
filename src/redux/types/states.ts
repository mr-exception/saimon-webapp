import Key from "core/Key/Key";

export interface IContact {
  key: Key;
  first_name: string;
  last_name: string;
  public_key: string;
}

export interface IInitialState {
  modals: {
    add_contact: {
      show: boolean;
    };
  };
  contacts: IContact[];
}
