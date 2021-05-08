import Contact from "Classes/Contact/Contact";
import Host from "Classes/Host/Host";
import Message from "Classes/Message/Message";
import Client from "core/Client/Client";
import { ConnectionStatus } from "core/Connection/def";
import Key from "core/Key/Key";
import Storage from "storage/Storage";
/**
 * this state is when user just has opened the webapp
 */
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

  host_connections: {
    connection_id: number;
    state: ConnectionStatus;
  }[];
  contact_connections: {
    contact_id: number;
    online: boolean;
    last_online: number;
  }[];

  selected_conversation?: number;
  selected_conversation_messages: Message[];
}
/**
 * this state is when user is logged into the account
 * and key pairs are loaded into store
 */
export interface ILogedState extends IInitialState {
  app_key: Key;
  client: Client;
}
