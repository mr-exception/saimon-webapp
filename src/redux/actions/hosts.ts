import Host from "Classes/Host/Host";
import {
  ActionType,
  ADD_HOST,
  ADD_HOSTS,
  REMOVE_HOST,
  RESET_HOSTS,
} from "redux/types/actions";

export const addHost = (host: Host): ActionType => {
  return { type: ADD_HOST, host };
};
export const addHosts = (hosts: Host[]): ActionType => {
  return { type: ADD_HOSTS, hosts };
};
export const resetHosts = (hosts: Host[]): ActionType => {
  return { type: RESET_HOSTS, hosts };
};
export const removeHost = (host: Host): ActionType => {
  return { type: REMOVE_HOST, host };
};
