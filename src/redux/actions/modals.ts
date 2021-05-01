import {
  ActionType,
  CLOSE_ADD_CONTACT_MODAL,
  SHOW_ADD_CONTACT_MODAL,
} from "redux/types/actions";

export const showAddContactModal = (): ActionType => {
  return { type: SHOW_ADD_CONTACT_MODAL };
};
export const closeAddContactModal = (): ActionType => {
  return { type: CLOSE_ADD_CONTACT_MODAL };
};
