import { ActionType } from "Redux/types/actions";
import { IInitialState } from "Redux/types/states";
import * as Actions from "Redux/types/actions";

const reducer = (state: IInitialState, action: ActionType): IInitialState => {
  switch (action.type) {
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
          if (contact.id === action.contact.id) return null;
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
    default:
      return state;
  }
};

export default reducer;
