import { ActionType, ADD_HOST } from "redux/types/actions";
import { IHost } from "redux/types/states";

export const addHost = (host: IHost): ActionType => {
  return { type: ADD_HOST, host };
};
