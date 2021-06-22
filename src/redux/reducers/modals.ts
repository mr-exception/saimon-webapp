import { ActionType } from "redux/types/actions";
import { IInitialState } from "redux/types/states";
import * as Actions from "redux/types/actions";

const reducer = (state: IInitialState, action: ActionType): IInitialState => {
  switch (action.type) {
    case Actions.SHOW_ADD_CONTACT_MODAL:
      state.modals.add_contact.show = true;
      return state;
    case Actions.CLOSE_ADD_CONTACT_MODAL:
      state.modals.add_contact.show = false;
      return state;
    case Actions.SHOW_CONTACT_DETAILS_MODAL:
      if (!!action.contact) {
        state.modals.contact_details = {
          show: true,
          contact: action.contact,
        };
      }
      return state;
    case Actions.CLOSE_CONTACT_DETAILS_MODAL:
      state.modals.contact_details = { show: false };
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
        ...(action.confirmation_dialog || { callback: () => {}, message: "" }),
      };
      return state;
    case Actions.CLOSE_CONFIRMATION_MODAL:
      state.modals.confirmation = {
        show: false,
        message: "",
        callback: () => {},
      };
      return state;
    default:
      return state;
  }
};

export default reducer;
