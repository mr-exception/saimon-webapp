import Storage from "storage/Storage";
import * as Actions from "./types/actions";
import { IInitialState, ILogedState } from "./types/states";

const initialState: IInitialState = {
  storage: new Storage(),
  modals: {
    add_contact: { show: false },
    add_host: { show: false },
    confirmation: { show: false, message: "", callback: (result) => {} },
  },
  contacts: [],
  hosts: [],

  host_connections: [],
  contact_connections: [],
};

const reducer = (
  state: IInitialState = initialState,
  action: Actions.ActionType
): IInitialState => {
  switch (action.type) {
    // modals
    case Actions.SHOW_ADD_CONTACT_MODAL:
      state.modals.add_contact.show = true;
      return state;
    case Actions.CLOSE_ADD_CONTACT_MODAL:
      state.modals.add_contact.show = false;
      return state;
    case Actions.SHOW_ADD_HOST_MODAL:
      state.modals.add_host.show = true;
      return state;
    case Actions.CLOSE_ADD_HOST_MODAL:
      state.modals.add_host.show = false;
      return state;
    case Actions.SHOW_CONFIRMATION_MODAL:
      state.modals.confirmation = {
        show: true,
        message: action.message ? action.message : "",
        callback: action.callback ? action.callback : () => {},
      };
      return state;
    case Actions.CLOSE_CONFIRMATION_MODAL:
      state.modals.confirmation = {
        show: false,
        message: "",
        callback: action.callback ? action.callback : () => {},
      };
      return state;
    // contacts
    case Actions.ADD_CONTACTS:
      state.contacts = [
        ...state.contacts,
        ...(action.contacts ? action.contacts : []),
      ];
      return state;
    case Actions.ADD_CONTACT:
      state.contacts = [
        ...state.contacts,
        ...(action.contact ? [action.contact] : []),
      ];
      return state;
    case Actions.REMOVE_CONTACT:
      state.contacts = state.contacts.filter((contact) => {
        if (action.contact) {
          if (contact.public_key === action.contact.public_key) return null;
          else return contact;
        } else {
          return contact;
        }
      });
      return state;
    case Actions.EDIT_CONTACT:
      state.contacts = state.contacts.map((contact) => {
        if (action.contact) {
          if (contact.public_key === action.contact.public_key) return contact;
          else return contact;
        } else {
          return contact;
        }
      });
      return state;
    // hosts
    case Actions.ADD_HOSTS:
      state.hosts = [...state.hosts, ...(action.hosts ? action.hosts : [])];
      return state;
    case Actions.ADD_HOST:
      if (!action.host) {
        return state;
      }
      state.hosts = [...state.hosts, action.host];
      return state;
    case Actions.REMOVE_HOST:
      state.hosts = state.hosts.filter((host) => {
        if (action.host) {
          if (host.isEqual(action.host)) return null;
          else return host;
        } else {
          return host;
        }
      });
      return state;
    case Actions.EDIT_HOST:
      state.hosts = state.hosts.map((host) => {
        if (action.host) {
          if (host.name === action.host.name) return host;
          else return host;
        } else {
          return host;
        }
      });
      return state;
    // client
    case Actions.STORE_CLIENT:
      if (!action.client) return state;
      const loged_state = state as ILogedState;
      loged_state.client = action.client;
      return state;
    case Actions.STORE_CONNECTION_STATE:
      if (!action.host_connection_state) return state;
      const host_connection_state = action.host_connection_state;
      let found = false;
      state.host_connections = state.host_connections.map((hc) => {
        if (hc.connection_id === host_connection_state.connection_id) {
          hc.state = host_connection_state.state;
          found = true;
        }
        return hc;
      });
      if (!found) {
        state.host_connections.push(host_connection_state);
      }
      return state;
    default:
      return state;
  }
};

export default reducer;
