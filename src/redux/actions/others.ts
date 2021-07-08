import {
  ActionType,
  CLEAR_ALL,
  SET_CONNECTION_STATUS,
} from "redux/types/actions";

export const clearAll = (): ActionType => {
  return { type: CLEAR_ALL };
};
export const setConnectionStatus = (state: boolean): ActionType => {
  return { type: SET_CONNECTION_STATUS, is_online: state };
};
