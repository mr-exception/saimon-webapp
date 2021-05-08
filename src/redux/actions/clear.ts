import { ActionType, CLEAR_ALL } from "redux/types/actions";

export const clearAll = (): ActionType => {
  return { type: CLEAR_ALL };
};
