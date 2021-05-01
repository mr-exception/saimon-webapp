import Key from "core/Key/Key";

export interface IContact {
  key: Key;
  first_name: string;
  last_name: string;
  public_key: string;
}
export interface IHost {
  address: string;
  type: HostType;
  protocl: HostProtocol;
  name: string;
  score: number;
  advertise_period: number;
}

export interface IInitialState {
  modals: {
    add_contact: {
      show: boolean;
    };
    add_host: {
      show: boolean;
    };
    confirmation: {
      show: boolean;
      message: string;
      callback: (result: boolean) => void;
    };
  };
  hosts: IHost[];
  contacts: IContact[];
}
