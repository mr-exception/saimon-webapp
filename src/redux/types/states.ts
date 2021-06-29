import Contact from "Classes/Contact/Contact";
import Host from "Classes/Host/Host";
import RelayHost from "Classes/Host/RelayHost";
import Message, {
  IIncomingMessagePackets,
  IMessageState,
} from "Classes/Message/Message";
import {
  IAdvertiserRequest,
  IPacketDeliverRequest,
  IRelayRequest,
  IReportRequest,
  IStorageRequest,
} from "Classes/Queue/def";
import Queue from "Classes/Queue/Queue";
import Client from "core/Client/Client";
import { ConnectionStatus } from "core/Connection/def";
import Key from "core/Key/Key";
import Storage from "storage/Storage";
/**
 * this state is when user just has opened the webapp
 */
export interface IInitialState {
  profile: {
    first_name: string;
    last_name: string;
  };

  app_key?: Key;
  storage: Storage;
  modals: {
    add_contact: {
      show: boolean;
    };
    contact_details: {
      show: boolean;
      contact?: Contact;
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

  selected_contact_id?: number;
  selected_conversation_messages: Message[];

  incoming_messages_packets: IIncomingMessagePackets[];
  deliver_message_state: IMessageState[];

  // request queues
  advertiser_queue: Queue<IAdvertiserRequest>;
  storage_queue: Queue<IStorageRequest>;
  relay_queue: Queue<IRelayRequest>;
  packet_queue: Queue<IPacketDeliverRequest>;
  report_queue: Queue<IReportRequest>;
}
/**
 * this state is when user is logged into the account
 * and key pairs are loaded into store
 */
export interface ILogedState extends IInitialState {
  app_key: Key;
  client: Client;
}
