import Contact from "Classes/Contact/Contact";
import Host from "Classes/Host/Host";
import Message from "Classes/Message/Message";
import Client from "core/Client/Client";
import { ConnectionStatus } from "core/Connection/def";

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
export const REMOVE_HOST = "remove_host";
export const EDIT_HOST = "edit_host";
export const CONNECT_HOST = "connect_host";
export const DISCONNECT_HOST = "disconnect_host";
// client
export const STORE_CLIENT = "store_client";
export const STORE_CONNECTION_STATE = "store_connection_state";
// conversations
export const SELECT_CONVERSATION = "select_conversation";
export const ADD_MESSAGE = "add_message";
export const ADD_MESSAGES = "add_messages";

export type ActionType = {
  type: string;

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

  host_connection_state?: {
    connection_id: string;
    address: string;
    state: ConnectionStatus;
  };

  conversation_index?: number;
};
export type DispatchType = (args: ActionType) => ActionType;
