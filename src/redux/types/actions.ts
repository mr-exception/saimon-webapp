import Contact from "Classes/Contact/Contact";
import Host from "Classes/Host/Host";
import Message, {
  IIncomingMessagePackets,
  MessageSentState,
} from "Classes/Message/Message";
import Client from "core/Client/Client";
import {
  ConnectionStatus,
  IPacket,
  PacketSendStatus,
} from "core/Connection/def";
import Key from "core/Key/Key";

// modals
export const SHOW_ADD_CONTACT_MODAL = "show_add_contact_modal";
export const CLOSE_ADD_CONTACT_MODAL = "close_add_contact_modal";
export const SHOW_ADD_HOST_MODAL = "show_add_host_modal";
export const CLOSE_ADD_HOST_MODAL = "close_add_host_modal";
export const SHOW_CONFIRMATION_MODAL = "show_confirmation_modal";
export const CLOSE_CONFIRMATION_MODAL = "close_confirmation_modal";
// contacts
export const ADD_CONTACT = "add_contact";
export const ADD_CONTACTS = "add_contacts";
export const EDIT_CONTACT = "edit_contact";
export const REMOVE_CONTACT = "rmeove_contact";
// hosts
export const ADD_HOST = "add_host";
export const ADD_HOSTS = "add_hosts";
export const RESET_HOSTS = "reset_hosts";
export const REMOVE_HOST = "remove_host";
export const EDIT_HOST = "edit_host";
export const CONNECT_HOST = "connect_host";
export const DISCONNECT_HOST = "disconnect_host";
// client
export const STORE_CLIENT = "store_client";
export const STORE_CONNECTION_STATE = "store_connection_state";
export const STORE_APP_KEY = "store_app_key";
export const STORE_INCOMING_PACKET = "store_incoming_packet";
export const RESET_INCOMING_PACKETS = "reset_incoming_packets";
export const STORE_DELIVERING_PACKET_STATUS = "store_delivering_packet_status";
// conversations
export const SELECT_CONVERSATION = "select_conversation";
export const ADD_MESSAGE = "add_message";
export const ADD_MESSAGES = "add_messages";
export const RESET_MESSAGES = "reset_messages";
export const UPDATE_MESSAGE_STATUS = "update_message_status";
// others
export const CLEAR_ALL = "clear_all";

export type ActionType = {
  type: string;

  contact?: Contact;
  contacts?: Contact[];

  host?: Host;
  hosts?: Host[];

  message?: Message;
  messages?: Message[];
  message_status?: {
    message_id: string;
    status: MessageSentState;
  };

  confirmation_dialog?: {
    message: string;
    callback: (result: boolean) => void;
  };

  client?: Client;
  app_key?: Key;

  host_connection_state?: {
    connection_id: number;
    state: ConnectionStatus;
  };

  contact_id?: number;

  packet?: IPacket;
  incoming_messages?: IIncomingMessagePackets[];

  packet_deliver_status?: {
    id: string;
    position: number;
    status: PacketSendStatus;
    count: number;
  };
};
export type DispatchType = (args: ActionType) => ActionType;
