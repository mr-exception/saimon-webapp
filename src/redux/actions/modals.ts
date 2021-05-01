import {
  ActionType,
  CLOSE_ADD_CONTACT_MODAL,
  CLOSE_ADD_HOST_MODAL,
  SHOW_ADD_CONTACT_MODAL,
  SHOW_ADD_HOST_MODAL,
} from "redux/types/actions";

export const showAddContactModal = (): ActionType => {
  return { type: SHOW_ADD_CONTACT_MODAL };
};
export const closeAddContactModal = (): ActionType => {
  return { type: CLOSE_ADD_CONTACT_MODAL };
};

export const showAddHostModal = (): ActionType => {
  return { type: SHOW_ADD_HOST_MODAL };
};
export const clsoeAddHostModal = (): ActionType => {
  return { type: CLOSE_ADD_HOST_MODAL };
};
