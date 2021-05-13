import Host from "Classes/Host/Host";
import RelayHost from "Classes/Host/RelayHost";
import {
  ActionType,
  ADD_HOST,
  ADD_HOSTS,
  REMOVE_HOST,
  RESET_HOSTS,
} from "redux/types/actions";

export const addHost = (host: RelayHost): ActionType => {
  return { type: ADD_HOST, host };
};
export const addHosts = (hosts: RelayHost[]): ActionType => {
  return { type: ADD_HOSTS, hosts };
};
export const resetHosts = (hosts: RelayHost[]): ActionType => {
  return { type: RESET_HOSTS, hosts };
};
export const removeHost = (host: RelayHost): ActionType => {
  return { type: REMOVE_HOST, host };
};
