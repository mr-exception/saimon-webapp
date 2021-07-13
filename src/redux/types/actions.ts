import Contact from "Classes/Contact/Contact";
import Host from "Classes/Host/Host";
import Message from "Classes/Message/Message";
import Client from "core/Client/Client";
import {
  ConnectionStatus,
  IPacket,
  PacketSendStatus,
} from "core/Connection/def";
import Key from "core/Key/Key";

// profile
export const UPDATE_FIRST_NAME = "update_first_name";
export const UPDATE_LAST_NAME = "update_last_name";
export const UPDATE_PROFILE = "update_profile";
// modals
export const SHOW_ADD_CONTACT_MODAL = "show_add_contact_modal";
export const CLOSE_ADD_CONTACT_MODAL = "close_add_contact_modal";
export const SHOW_ADD_HOST_MODAL = "show_add_host_modal";
export const CLOSE_ADD_HOST_MODAL = "close_add_host_modal";
export const SHOW_CONFIRMATION_MODAL = "show_confirmation_modal";
export const CLOSE_CONFIRMATION_MODAL = "close_confirmation_modal";
export const SHOW_CONTACT_DETAILS_MODAL = "show_contact_details_modal";
export const CLOSE_CONTACT_DETAILS_MODAL = "close_contact_details_modal";
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
export const UPDATE_INCOMING_MESSAGE = "update_imcoming_message";
// conversations
export const SELECT_CONVERSATION = "select_conversation";
export const ADD_MESSAGE = "add_message";
export const ADD_MESSAGES = "add_messages";
export const RESET_MESSAGES = "reset_messages";
export const UPDATE_MESSAGE = "update_message";
// others
export const CLEAR_ALL = "clear_all";
export const SET_CONNECTION_STATUS = "set_connection_status";

export type ActionType = {
  type: string;

  is_online?: boolean;

  first_name?: string;
  last_name?: string;

  contact?: Contact;
  contacts?: Contact[];

  host?: Host;
  hosts?: Host[];

  message?: Message;
  messages?: Message[];

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

  packet_deliver_status?: {
    id: string;
    position: number;
    status: PacketSendStatus;
    count: number;
  };
};
export type DispatchType = (args: ActionType) => ActionType;
