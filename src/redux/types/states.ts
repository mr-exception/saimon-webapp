import Contact from "Classes/Contact/Contact";
import Host from "Classes/Host/Host";
import Message, {
  IIncomingMessagePackets,
  IMessageState,
} from "Classes/Message/Message";
import Client from "core/Client/Client";
import {
  ConnectionStatus,
  IDeliverPacketStatus,
  IPacket,
  PacketSendStatus,
} from "core/Connection/def";
import Key from "core/Key/Key";
import Storage from "storage/Storage";
/**
 * this state is when user just has opened the webapp
 */
export interface IInitialState {
  app_key?: Key;
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

  incoming_messages_packets: IIncomingMessagePackets[];
  deliver_message_state: IMessageState[];
}
/**
 * this state is when user is logged into the account
 * and key pairs are loaded into store
 */
export interface ILogedState extends IInitialState {
  app_key: Key;
  client: Client;
}
