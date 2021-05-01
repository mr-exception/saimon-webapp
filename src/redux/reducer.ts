import {
  ActionType,
  ADD_CONTACT,
  ADD_HOST,
  CLOSE_ADD_CONTACT_MODAL,
  CLOSE_ADD_HOST_MODAL,
  EDIT_CONTACT,
  EDIT_HOST,
  REMOVE_CONTACT,
  REMOVE_HOST,
  SHOW_ADD_CONTACT_MODAL,
  SHOW_ADD_HOST_MODAL,
} from "./types/actions";
import { IInitialState } from "./types/states";

const initialState: IInitialState = {
  modals: {
    add_contact: { show: false },
    add_host: { show: false },
  },
  contacts: [],
  hosts: [],
};

const reducer = (
  state: IInitialState = initialState,
  action: ActionType
): IInitialState => {
  switch (action.type) {
    // modals
    case SHOW_ADD_CONTACT_MODAL:
      state.modals.add_contact.show = true;
      return state;
    case CLOSE_ADD_CONTACT_MODAL:
      state.modals.add_contact.show = false;
      return state;
    case SHOW_ADD_HOST_MODAL:
      state.modals.add_host.show = true;
      return state;
    case CLOSE_ADD_HOST_MODAL:
      state.modals.add_host.show = false;
      return state;
    // contacts
    case ADD_CONTACT:
      if (!action.contact) {
        return state;
      }
      state.contacts = [...state.contacts, action.contact];
      return state;
    case REMOVE_CONTACT:
      state.contacts = state.contacts.filter((contact) => {
        if (action.contact) {
          if (contact.public_key === action.contact.public_key) return null;
          else return contact;
        } else {
          return contact;
        }
      });
      return state;
    case EDIT_CONTACT:
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
    case ADD_HOST:
      if (!action.host) {
        return state;
      }
      state.hosts = [...state.hosts, action.host];
      return state;
    case REMOVE_HOST:
      state.hosts = state.hosts.filter((host) => {
        if (action.host) {
          if (host.name === action.host.name) return null;
          else return host;
        } else {
          return host;
        }
      });
      return state;
    case EDIT_HOST:
      state.hosts = state.hosts.map((host) => {
        if (action.host) {
          if (host.name === action.host.name) return host;
          else return host;
        } else {
          return host;
        }
      });
      return state;
    default:
      return state;
  }
};

export default reducer;
