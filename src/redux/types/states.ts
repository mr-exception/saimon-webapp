import Contact from "Classes/Contact/Contact";
import Host from "Classes/Host/Host";
import Storage from "storage/Storage";

export interface IInitialState {
  storage: Storage;
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
  hosts: Host[];
  contacts: Contact[];
}
