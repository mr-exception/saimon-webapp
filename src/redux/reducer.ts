import {
  ActionType,
  ADD_CONTACT,
  CLOSE_ADD_CONTACT_MODAL,
  SHOW_ADD_CONTACT_MODAL,
} from "./types/actions";
import { IInitialState } from "./types/states";

const initialState: IInitialState = {
  modals: {
    add_contact: { show: false },
  },
  contacts: [],
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
    // contacts
    case ADD_CONTACT:
      if (!action.contact) {
        return state;
      }
      state.contacts = [...state.contacts, action.contact];
      return state;
    default:
      return state;
  }
};

export default reducer;
